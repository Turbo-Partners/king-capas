// quantity-bundle.js — versão nova e compatível com o novo snippet Liquid

class QuantityBundle {
  constructor(container) {
    this.container = container;

    // Dados essenciais vindos do Liquid
    this.productId = container.dataset.productId;
    this.variantId = container.dataset.variantId;
    this.variantAvailable = container.dataset.variantAvailable === "true";
    this.productHandle = container.dataset.productHandle;

    // Elementos importantes
    this.radioButtons = container.querySelectorAll(
      ".quantity-bundle__radio-input",
    );
    this.buyButton = container.querySelector(".quantity-bundle__buy-button");
    this.unitPriceEl = container.querySelector(".quantity-bundle__price-unit");
    this.comparePriceEl = container.querySelector(
      ".quantity-bundle__compare-price",
    );
    this.currentPriceEl = container.querySelector(
      ".quantity-bundle__current-price",
    );
    this.pixPriceEl = container.querySelector(".quantity-bundle__pix-price");
    this.parcelsPriceEl = container.querySelector(
      ".quantity-bundle__price-parcels",
    );
    this.tagDiscountEl = container.querySelector(
      ".quantity-bundle__discount-tag",
    );

    // === NOVO: valores vindos prontos do Liquid ===
    this.parcelas = parseFloat(this.parcelsPriceEl.dataset.parcelas || 1);

    // === NOVO: processar descontos enviados via data-discounts ===
    const discountStr = container.dataset.discounts || "0";
    this.discounts = discountStr.split("/").map((v) => parseFloat(v));

    // === NOVO: capturar quantidades diretamente do HTML ===
    this.quantities = [
      ...container.querySelectorAll(".quantity-bundle__option"),
    ].map((opt) => parseInt(opt.dataset.quantity));

    // Preço base do produto (centavos → reais)
    this.basePrice = parseFloat(this.currentPriceEl.dataset.currentPrice) / 100;

    // Desconto PIX (%)
    this.pixDiscount = parseFloat(this.pixPriceEl.dataset.pixDiscount || 0);

    // Estado inicial
    const { value, position } = this.getSelectedQuantityAndPosition();

    this.selectedQuantity = value;
    this.position = position;

    this.init();
  }

  init() {
    this.bindEvents();
    this.updatePrices();
    this.setupButton();
  }

  setupButton() {
    this.originalButtonText = this.buyButton.textContent;
  }

  bindEvents() {
    this.radioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
        this.selectedQuantity = parseInt(radio.value);
        this.position = parseInt(radio.dataset.position);
        this.updatePrices();
        this.updateVisualSelection();
      });
    });

    this.container
      .querySelectorAll(".quantity-bundle__option")
      .forEach((option) => {
        option.addEventListener("click", (e) => {
          if (e.target.type !== "radio") {
            const radio = option.querySelector(".quantity-bundle__radio-input");
            if (radio) {
              radio.checked = true;
              radio.dispatchEvent(new Event("change"));
            }
          }
        });
      });

    this.buyButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.addToCart();
    });
  }

  getSelectedQuantityAndPosition() {
    const checked = this.container.querySelector(
      ".quantity-bundle__radio-input:checked",
    );
    const position = checked.dataset.position;

    return checked
      ? {
          value: parseInt(checked.value),
          position: position,
        }
      : this.quantities[0];
  }

  updatePrices() {
    const qtySelected = this.selectedQuantity;
    const positionSelected = this.position;

    // const index = this.quantities.indexOf(positionSelected);
    // const discountPercentRaw = this.discounts[index] || 0;

    // O index agora é a posição em que aparecem as opções ao invés de acessar o index com base na quantidade

    const index = positionSelected - 1;
    const discountPercentRaw = this.discounts[index] || 0;

    // Arredondar o desconto para inteiro
    const discountPercent = Math.round(discountPercentRaw);

    const discountDecimal = (100 - discountPercentRaw) / 100;

    // Preço total com desconto
    const totalCurrent = this.basePrice * qtySelected * discountDecimal;

    // Comparação (sem desconto)
    const totalCompare = this.basePrice * qtySelected;

    // Preço unidade
    const priceUnit = totalCurrent / qtySelected;

    // Pix
    const pixDecimal = (100 - this.pixDiscount) / 100;
    const pixPrice = totalCurrent * pixDecimal;

    // Parcelado
    const parcelasValue = totalCurrent / this.parcelas;

    // Atualizar preços no DOM
    this.unitPriceEl.textContent = `${this.formatPrice(priceUnit)} cada`;
    this.currentPriceEl.textContent = this.formatPrice(totalCurrent);
    this.parcelsPriceEl.textContent = `ou ${
      this.parcelas
    }x de ${this.formatPrice(parcelasValue)}`;
    this.pixPriceEl.innerHTML = `${this.formatPrice(
      pixPrice,
    )} ${this.pixPriceEl.textContent.split(" ").slice(-2).join(" ")}`;

    // Aplicar valor arredondado na tag
    this.tagDiscountEl.textContent = `${discountPercent}% OFF`;

    // === NOVO: mostrar ou esconder elementos ===
    if (discountPercent <= 0) {
      this.comparePriceEl.style.display = "none";
      this.tagDiscountEl.style.display = "none";
    } else {
      this.comparePriceEl.style.display = "";
      this.tagDiscountEl.style.display = "";
      this.comparePriceEl.textContent = this.formatPrice(totalCompare);
    }
  }

  updateComparePriceVisibility(index) {
    if (index === 0) {
      this.comparePriceEl.style.display = "none";
    } else {
      this.comparePriceEl.style.display = "";
    }
  }

  updateVisualSelection() {
    this.container
      .querySelectorAll(".quantity-bundle__option")
      .forEach((opt) =>
        opt.classList.remove("quantity-bundle__option--selected"),
      );

    const selected = this.container.querySelector(
      ".quantity-bundle__radio-input:checked",
    );
    if (selected) {
      selected
        .closest(".quantity-bundle__option")
        .classList.add("quantity-bundle__option--selected");
    }
  }

  formatPrice(price) {
    return "R$ " + price.toFixed(2).replace(".", ",");
  }

  async addToCart() {
    if (this.buyButton.disabled) return;

    try {
      this.buyButton.disabled = true;
      this.buyButton.textContent = "Adicionando...";

      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.variantId,
          quantity: this.selectedQuantity,
        }),
      });

      if (!response.ok) throw new Error("Erro ao adicionar ao carrinho");

      this.showSuccessFeedback();
      setTimeout(() => this.openCartDrawer(), 300);
    } catch (err) {
      console.error(err);
      this.showErrorFeedback();
    }
  }

  showSuccessFeedback() {
    this.buyButton.textContent = "✓ Adicionado!";
    setTimeout(() => this.restoreButton(), 2000);
  }

  showErrorFeedback() {
    this.buyButton.textContent = "Erro - tente novamente";
    setTimeout(() => this.restoreButton(), 2500);
  }

  restoreButton() {
    this.buyButton.disabled = false;
    this.buyButton.textContent = this.originalButtonText;
  }

  async openCartDrawer() {
    const response = await fetch("/?sections=cart-drawer,cart-icon-bubble");
    const sections = await response.json();
    const parsedState = { sections };

    const drawer = document.querySelector("cart-drawer");
    if (!drawer) return;

    drawer.classList.remove("is-empty");
    drawer.renderContents(parsedState);

    requestAnimationFrame(() => {
      drawer.classList.add("animate", "active");
      document.body.classList.add("overflow-hidden");
    });
  }
}

// AUTO INIT
function initQuantityBundles() {
  document.querySelectorAll(".quantity-bundle").forEach((bundle) => {
    new QuantityBundle(bundle);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuantityBundles);
} else {
  initQuantityBundles();
}

document.addEventListener("shopify:section:load", (e) => {
  e.target
    .querySelectorAll(".quantity-bundle")
    .forEach((bundle) => new QuantityBundle(bundle));
});
