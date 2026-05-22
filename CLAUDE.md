# Turbo Starter

Tema base (Dawn) da Turbo para desenvolvimento e integracoes de componentes personalizados em Shopify.

## Estrutura do Projeto

- `sections/` — Secoes do tema (Dawn nativas + custom `tp-*`)
- `snippets/` — Snippets reutilizaveis (ex: `tp-section-padding`, `tp-product-card`)
- `assets/` — CSS e JS (ex: `tp-feat-col.css`, `tp-button-prev.svg`)
- `templates/` — Templates de pagina
- `layout/` — Layout base do tema

## Design System (Turbo Tokens)

O tema possui um design system centralizado em `settings_schema.json` > "Turbo - Design System", injetado globalmente via `snippets/tp-design-tokens.liquid` no `theme.liquid`. Todas as secoes custom devem usar esses tokens em vez de valores hardcoded.

### Cores

| Token | Variavel CSS | Uso |
|-------|-------------|-----|
| Primaria | `--tp-color-primary` | Botoes, links, destaques |
| Secundaria | `--tp-color-secondary` | Elementos secundarios |
| Destaque | `--tp-color-accent` | CTAs, badges, alertas |
| Texto Principal | `--tp-color-text-primary` | Corpo de texto |
| Texto Secundario | `--tp-color-text-secondary` | Legendas, subtitulos |
| Texto Claro | `--tp-color-text-light` | Texto sobre fundo escuro |
| Fundo Principal | `--tp-color-bg-primary` | Background padrao |
| Fundo Secundario | `--tp-color-bg-secondary` | Background alternado |
| Fundo Escuro | `--tp-color-bg-dark` | Secoes escuras |
| Sucesso | `--tp-color-success` | Mensagens de sucesso |
| Aviso | `--tp-color-warning` | Alertas |
| Erro | `--tp-color-error` | Erros, validacao |
| Borda | `--tp-color-border` | Bordas padrao |
| Borda Escura | `--tp-color-border-dark` | Bordas com mais contraste |

### Border Radius

`--tp-radius-sm` | `--tp-radius-md` | `--tp-radius-lg` | `--tp-radius-xl` | `--tp-radius-full`

### Espacamento

Multiplos da unidade base (configuravel, default 4px):
`--tp-space-1` (4px) ate `--tp-space-16` (64px)

### Fontes

As fontes são selecionadas em Configurações do tema > Turbo - Design System > Tipografia - Fontes (`font_picker`). Settings: `tp_font_heading` e `tp_font_body`. O Design System expõe como CSS variables via `tp-design-tokens.liquid`:

```css
--tp-font-heading: /* família selecionada para headings */
--tp-font-body: /* família selecionada para corpo */
--tp-font-heading-weight: /* peso base do heading */
--tp-font-heading-style: /* estilo do heading (normal/italic) */
--tp-font-body-weight: /* peso base do body */
--tp-font-body-style: /* estilo do body */
```

As fontes são carregadas automaticamente com `font_face` filter e `font-display: swap`. Variantes (bold, italic, bold-italic) são pré-carregadas. Fontes system não geram preload nem @font-face (verificado com `font.system?`).

**Fontes customizadas (CDN Shopify)**: Cada elemento (global heading, global body, Corpo, H1-H6) possui checkbox "Fonte customizada" com dois campos:
- **Nome da fonte** — nome CSS da família (ex: `Playfair Display`)
- **URL da fonte (.woff2)** — URL do arquivo no CDN da Shopify (Conteúdo > Arquivos)

O `tp-design-tokens.liquid` gera `@font-face` automaticamente quando nome + URL estão preenchidos. A CSS variable correspondente (`--tp-h1-font`, `--tp-body-font`, etc.) é atualizada para usar a fonte customizada.

### Tipografia — Headings (Padrão Elementor)

Cada heading (H1-H6) tem settings independentes no Design System: tamanho desktop, tamanho mobile, peso, altura de linha e letter-spacing. CSS variables por heading:

```css
--tp-h1-font | --tp-h1-size | --tp-h1-weight | --tp-h1-leading | --tp-h1-tracking
/* ... até H6 */
--tp-body-font | --tp-body-size | --tp-body-weight | --tp-body-leading | --tp-body-tracking
```

O tamanho mobile dos headings é aplicado automaticamente via `@media (max-width: 767px)`. Cada heading pode ter fonte própria via `--tp-h*-font` (default: `--tp-font-heading`). Body usa `--tp-body-font` (default: `--tp-font-body`).

| Elemento | Classe | Desktop | Mobile | Peso | Line-height | Tracking |
|----------|--------|---------|--------|------|-------------|----------|
| `h1` | `.tp-h1` | 48px | 36px | 700 | 1.2 | -0.025em |
| `h2` | `.tp-h2` | 36px | 28px | 700 | 1.2 | -0.025em |
| `h3` | `.tp-h3` | 30px | 24px | 600 | 1.3 | normal |
| `h4` | `.tp-h4` | 24px | 20px | 600 | 1.4 | normal |
| `h5` | `.tp-h5` | 20px | 18px | 500 | 1.4 | normal |
| `h6` | `.tp-h6` | 18px | 16px | 500 | 1.4 | normal |
| `body` | `.tp-body` | 16px | — | 400 | 1.5 | normal |

Todo texto (`<p>`, `<span>`, etc.) herda do `body`. Não há settings separados para `<p>` ou `<span>`.

### Tipografia — Escala Auxiliar

Escala derivada dos headings: `--tp-font-size-xs` (12px) | `sm` (14px) | `base` (= body) | `lg` (= H6) | `xl` (= H5) | `2xl` (= H4) | `3xl` (= H3) | `4xl` (= H2) | `5xl` (= H1)
Utilitários fixos: `--tp-leading-tight` (1.2) | `--tp-leading-normal` (1.4) | `--tp-leading-relaxed` (1.6)
Pesos: `--tp-font-regular` (400) | `--tp-font-medium` (500) | `--tp-font-semibold` (600) | `--tp-font-bold` (700)

### Sombras

`--tp-shadow-sm` | `--tp-shadow-md` | `--tp-shadow-lg` | `--tp-shadow-xl`

### Transicoes

`--tp-transition-fast` (150ms) | `--tp-transition-base` (300ms) | `--tp-transition-slow` (500ms)

### Regra: sempre usar tokens

```css
/* Correto */
.tp-secao__titulo { color: var(--tp-color-text-primary); font-size: var(--tp-font-size-3xl); }
.tp-secao__card { border-radius: var(--tp-radius-lg); box-shadow: var(--tp-shadow-md); }
.tp-secao__botao { background: var(--tp-color-primary); transition: opacity var(--tp-transition-base); }

/* Errado — valores hardcoded */
.tp-secao__titulo { color: #2B2B2B; font-size: 30px; }
.tp-secao__card { border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
```

## Nomenclatura de Sections

### Nome do Arquivo

Padrao com nome completo (sem abreviacoes): `[PREFIXO]__[FUNCAO_COMPLETA]__[VERSAO].liquid`

Exemplos:
- `E__FEATURED_COLLECTION__V1.liquid`
- `E__HERO_BANNER__V1.liquid`
- `E__PRODUCT_GRID__V2.liquid`
- `E__IMAGE_BENEFITS__V2.liquid`

Na pratica, os arquivos usam o prefixo `tp-e-` em lowercase (ex: `tp-e-featured-collection-V1.liquid`, `tp-e-image-benefits-v2.liquid`).

### Schema — name e presets

- `"name"` no schema: nome amigavel para o usuario (ate 30 caracteres, limite Shopify). Ex: `"Coleção em Destaque"`
- `"class"` no schema: nome tecnico da secao (ex: `"E__FEATURED_COLLECTION__V1"`)
- `"presets"` devem ter `"name"` amigavel (igual ao `"name"` do schema) e `"category"` usando uma categoria nativa do Shopify

### Schema — Labels sem redundancia

Labels dos campos devem ser **concisos e sem repetir o contexto do header**. O header ja agrupa os campos, entao o label nao precisa reafirmar a que pertence.

```json
/* Errado — redundante (ja esta dentro do header "Botao") */
{ "label": "Texto do Botao" }
{ "label": "Link do Botao" }
{ "label": "Cor de fundo do Botao" }

/* Correto — limpo e direto */
{ "label": "Texto" }
{ "label": "Link" }
{ "label": "Cor de fundo" }
```

Mesma regra para tipografia:
```json
/* Errado — dentro do header "Tipografia - Titulo" */
{ "label": "Cor do titulo" }
{ "label": "Tamanho do titulo (mobile)" }

/* Correto */
{ "label": "Cor" }
{ "label": "Tamanho (mobile)" }
```

```json
{
  "name": "Coleção em Destaque",
  "class": "E__FEATURED_COLLECTION__V1",
  "presets": [
    {
      "name": "Coleção em Destaque",
      "category": "Coleção"
    }
  ]
}
```

Categorias disponiveis para `"category"` (em portugues): Coleção, Imagem, Texto, Banner, Vídeo, Personalizado, Newsletter, Produto em Destaque, Blog, Carrinho.

### Schema — Acentuação

Todos os labels, headers e nomes no schema devem usar **acentuação correta** em português. O Theme Editor suporta UTF-8.

```json
/* Errado */
{ "content": "Conteudo" }
{ "label": "Titulo" }
{ "label": "Descricao" }
{ "content": "Botao" }

/* Correto */
{ "content": "Conteúdo" }
{ "label": "Título" }
{ "label": "Descrição" }
{ "content": "Botão" }
```

## CSS

### BEM Naming

Usar BEM (Block Element Modifier). **Nao usar CSS aninhado.**

```css
/* Correto */
.tp-featured-collection { }
.tp-featured-collection__title { }
.tp-featured-collection__title--highlight { }

/* Errado - nao aninhar */
.tp-featured-collection .title { }
.tp-featured-collection { .title { } }
```

### Arquivo CSS

Cada secao tem seu proprio arquivo CSS em `assets/`, carregado no topo do `.liquid`:

```liquid
{{ 'tp-nome-da-secao.css' | asset_url | stylesheet_tag }}
```

## Organização do Schema (Padrão Elementor)

O schema segue uma hierarquia inspirada no Elementor: **Conteúdo → Estilo → Avançado**. O principio é mostrar o minimo necessário e expandir sob demanda com `checkbox` + `visible_if`.

### Hierarquia dos headers

```
📝 Conteúdo      — textos, imagens, links (o essencial)
🔘 Botão         — texto, link, animação, [ ] Personalizar
🎨 Aparência     — background, arredondamento
✏️ Tipografia    — [ ] Personalizar título, [ ] Personalizar descrição
📐 Espaçamento   — padding base, [ ] Personalizar por dispositivo
```

### Princípio: herdar do Design System, personalizar sob demanda

Por padrão, todos os estilos (cores, tipografia, botões) herdam do Design System. O lojista só vê campos de customização quando ativa "Personalizar". Isso reduz ruído visual e mantém consistência.

```json
/* Padrão — checkbox + visible_if */
{
  "type": "checkbox",
  "id": "button_custom",
  "label": "Personalizar",
  "default": false
},
{
  "type": "color",
  "id": "button_bg_color",
  "label": "Cor de fundo",
  "visible_if": "{{ section.settings.button_custom }}"
}
```

### CSS: defaults com tokens, overrides com `{% style %}`

O arquivo CSS usa tokens do Design System como base. O `{% style %}` só aplica overrides quando o checkbox está ativo.

```css
/* CSS — defaults do Design System */
.tp-secao__titulo {
  color: var(--tp-color-text-primary);
  font-size: var(--tp-font-size-4xl);
  font-weight: var(--tp-font-bold);
}

.tp-secao__botao {
  background: var(--tp-btn-primary-bg);
  color: var(--tp-btn-primary-color);
  border-radius: var(--tp-btn-primary-radius);
  font-size: var(--tp-btn-primary-font-size);
  font-weight: var(--tp-btn-primary-font-weight);
}
```

```liquid
/* {% style %} — só quando personalizado */
{% if section.settings.title_custom %}
  .{{ section.id }} .tp-secao__titulo {
    color: {{ section.settings.title_color }};
    font-size: {{ section.settings.title_font_size_mobile }}px;
  }
{% endif %}
```

### Botão: mesmas opções do Design System

Quando "Personalizar" está ativo, expor as mesmas configurações do botão primário do DS:
- Cor de fundo, Cor do texto
- Arredondamento (select com tokens: Nenhum, Pequeno, Médio, Grande, Extra Grande, Completo)
- Tamanho do texto (range px)
- Peso do texto (select)

### Aparência (Background)

Sempre incluir opções de background com `visible_if` condicional:
- Tipo: `color`, `gradient` ou `image`
- Cor (`color`), Gradiente (`color_background`), Imagem mobile/desktop (`image_picker`)
- Arredondamento do card (select com tokens do DS)

### Posicionamento

Opções de alinhamento quando aplicável: `left`, `center`, `right` — aplicado ao conteúdo da seção.

### Cores

Settings para cor do texto e cor do background conforme necessidade da seção. Quando possível, herdar do Design System e permitir override via checkbox "Personalizar".

### Tipografia

Font-size e font-weight customizáveis separados para **desktop** e **mobile**. Escondidos por padrão atrás de `[ ] Personalizar título` / `[ ] Personalizar descrição`. CSS deve ter defaults usando tokens do DS (`var(--tp-color-text-primary)`, `var(--tp-font-size-*)`, etc.).

### Espaçamento (Spacing)

Usar o snippet `tp-section-padding` renderizando no topo da seção. Incluir os settings de padding no schema:
- `pad_top_min`, `pad_top_max`, `pad_bottom_min`, `pad_bottom_max` (ranges, max 200px)
- `[ ] Personalizar por dispositivo` → overrides opcionais por dispositivo com `visible_if`

### Animações

- **Seção**: Usar classes nativas do Dawn para scroll animations: `class="scroll-trigger animate--slide-in"` (ou `animate--fade-in`).
- **Botões**: 3 animações possíveis: Zoom, Troca de background e Translate Y.

## JavaScript e Web Components

Quando houver funcionalidade que altere o DOM, usar **Web Components sem Shadow DOM**. Isso garante referencia ao elemento apos reinsercao no DOM (ex: ao trocar secoes no Theme Editor).

```javascript
class TpMinhaSecao extends HTMLElement {
  connectedCallback() {
    // inicializacao
  }
}
customElements.define('tp-minha-secao', TpMinhaSecao);
```

## Preview no Theme Editor

Sempre incluir `"presets"` no schema para que a seção apareça na lista "Adicionar seção" do Theme Editor e tenha preview funcional.

O preset deve incluir `"settings"` com valores default para **todos os campos que afetam a renderização** (textos, URLs, cores de fundo, etc.). Sem isso, elementos condicionais (ex: botão com `{% if url != blank %}`) não aparecem no preview.

```json
"presets": [
  {
    "name": "Nome da Seção",
    "category": "Categoria",
    "settings": {
      "title": "Texto padrão",
      "button_text": "CTA",
      "button_url": "/",
      "section_bg_color": "#F5F5F5",
      "card_bg_color": "#FFFFFF"
    }
  }
]
```

## Boas Praticas de Desenvolvimento

### Liquid

- Preferir `{% liquid %}` para blocos de logica com multiplas atribuicoes/condicionais
- Usar `{% render %}` em vez de `{% include %}` (escopo isolado, melhor performance)
- Evitar logica complexa no template — extrair para snippets quando reutilizavel
- Usar filtros nativos do Liquid (`| image_url`, `| money`, `| escape`) em vez de manipulacao manual

### CSS

- BEM naming sem aninhamento (conforme secao CSS acima)
- Usar unidades responsivas (`clamp()`, `rem`, `%`) em vez de valores fixos em `px`
- Mobile-first: estilos base para mobile, `@media` para desktop
- Evitar `!important` — resolver especificidade pela estrutura BEM
- Preferir custom properties (CSS variables) para valores reutilizaveis

### JavaScript

- Carregar scripts com `defer` para nao bloquear renderizacao
- Usar event delegation quando possivel em vez de listeners individuais
- Evitar manipulacao desnecessaria do DOM — agrupar leituras e escritas
- Nao usar bibliotecas externas quando JS nativo resolve

### Imagens

Sempre usar `image_tag` para renderizar imagens. Ele gera automaticamente `srcset`, `width`, `height` e previne layout shift (CLS).

```liquid
{{ imagem | image_url: width: 1200 | image_tag:
  loading: 'lazy',
  sizes: '(min-width: 750px) 50vw, 100vw',
  widths: '375, 750, 1100, 1500, 1780, 2000'
}}
```

- Sempre passar `widths` com resolucoes suficientes para nao perder qualidade em telas grandes
- Usar a maior largura necessaria no `image_url: width:` para garantir que a imagem original de alta qualidade seja servida como fallback do `src`
- Imagens acima da dobra (hero, banner): `loading: 'eager'` e `fetchpriority: 'high'`
- Imagens abaixo da dobra: `loading: 'lazy'`

### Performance

- Minimizar uso de `{% style %}` inline — preferir arquivo CSS quando os estilos sao estaticos
- Evitar JS sincrono e render-blocking

### Seguranca

- Sempre escapar output de usuario com `| escape` para prevenir XSS
- Nao expor dados sensiveis em metafields ou settings acessiveis pelo front-end
- Sanitizar URLs geradas dinamicamente

### SEO

- Usar hierarquia semantica de headings (`h1` > `h2` > `h3`) — apenas um `h1` por pagina
- Incluir `alt` descritivo em todas as imagens
- Usar tags semanticas (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- Estruturar dados com schema.org/JSON-LD quando aplicavel

### Acessibilidade

- **Nunca criar campos no Theme Editor para acessibilidade** — atributos como `alt`, `aria-label`, `role` devem ser tratados automaticamente no codigo
- Garantir contraste adequado entre texto e fundo
- Elementos interativos devem ser focaveis e navegaveis por teclado
- Usar `aria-label`, `aria-hidden`, `role` onde necessario diretamente no markup
- Imagens decorativas: `alt=""` e `aria-hidden="true"`

### Clean Code e DRY

- Extrair logica e markup repetido para snippets reutilizaveis
- Nomes descritivos para variaveis, IDs e classes
- Nao duplicar codigo — se algo aparece mais de uma vez, criar um snippet
- Manter secoes focadas em uma unica responsabilidade
- Remover codigo comentado e dead code

## Estrutura Padrao de uma Secao

```liquid
{{ 'tp-nome-secao.css' | asset_url | stylesheet_tag }}

{% render 'tp-section-padding',
  pad_top_min: section.settings.pad_top_min,
  pad_top_max: section.settings.pad_top_max,
  pad_bottom_min: section.settings.pad_bottom_min,
  pad_bottom_max: section.settings.pad_bottom_max,
  enable_pad_top_mobile: section.settings.enable_pad_top_mobile,
  pad_top_mobile: section.settings.pad_top_mobile,
  enable_pad_bottom_mobile: section.settings.enable_pad_bottom_mobile,
  pad_bottom_mobile: section.settings.pad_bottom_mobile,
  enable_pad_top_desktop: section.settings.enable_pad_top_desktop,
  pad_top_desktop: section.settings.pad_top_desktop,
  enable_pad_bottom_desktop: section.settings.enable_pad_bottom_desktop,
  pad_bottom_desktop: section.settings.pad_bottom_desktop
%}

{% style %}
.{{ section.id }} {
  /* estilos dinamicos com Liquid */
}
{% endstyle %}

<section class="tp-nome-secao {{ section.id }}">
  <div class="tp-wrapper">
    <!-- conteudo -->
  </div>
</section>

{% schema %}
{
  "name": "Nome Amigavel da Secao",
  "class": "E__NOME_COMPLETO__V1",
  "settings": [ ... ],
  "presets": [
    {
      "name": "Nome Amigavel da Secao",
      "category": "Categoria em Portugues"
    }
  ]
}
{% endschema %}
```
