# Turbo Design System

Guia para os desenvolvedores sobre como utilizar o design system do Turbo Starter.

## O que e?

O design system e um conjunto de **tokens visuais** (cores, tamanhos, espacamentos, etc.) definidos em um unico lugar e disponiveis como CSS variables em todo o tema. Quando o lojista muda uma cor nas configuracoes do tema, todas as secoes que usam esse token atualizam automaticamente.

## Onde fica?

| Arquivo | Funcao |
|---------|--------|
| `config/settings_schema.json` | Settings editaveis no Theme Editor (bloco "Turbo - Design System") |
| `snippets/tp-design-tokens.liquid` | Converte settings em CSS variables (`:root`) |
| `layout/theme.liquid` | Injeta o snippet globalmente |

## Como usar

Use `var(--tp-nome-do-token)` no CSS em vez de valores fixos.

### Cores

```css
/* Cores da marca */
color: var(--tp-color-primary);        /* Cor primaria (botoes, destaques) */
color: var(--tp-color-secondary);      /* Cor secundaria */
color: var(--tp-color-accent);         /* Cor de destaque (CTAs, badges) */

/* Texto */
color: var(--tp-color-text-primary);   /* Texto principal - #2B2B2B */
color: var(--tp-color-text-secondary); /* Texto secundario - #667085 */
color: var(--tp-color-text-light);     /* Texto claro (sobre fundo escuro) */

/* Fundos */
background: var(--tp-color-bg-primary);   /* Fundo branco */
background: var(--tp-color-bg-secondary); /* Fundo cinza claro */
background: var(--tp-color-bg-dark);      /* Fundo escuro */

/* Status */
color: var(--tp-color-success);  /* Verde - sucesso */
color: var(--tp-color-warning);  /* Amarelo - aviso */
color: var(--tp-color-error);    /* Vermelho - erro */

/* Bordas */
border-color: var(--tp-color-border);      /* Borda padrao */
border-color: var(--tp-color-border-dark); /* Borda com mais contraste */
```

### Border Radius

```css
border-radius: var(--tp-radius-sm);   /* 4px - inputs, badges */
border-radius: var(--tp-radius-md);   /* 8px - cards pequenos */
border-radius: var(--tp-radius-lg);   /* 16px - cards, secoes mobile */
border-radius: var(--tp-radius-xl);   /* 24px - containers, secoes desktop */
border-radius: var(--tp-radius-full); /* 100px - botoes pill */
```

### Espacamento

Todos sao multiplos da unidade base (default 4px). Configuravel pelo lojista.

```css
gap: var(--tp-space-1);   /*  4px */
gap: var(--tp-space-2);   /*  8px */
gap: var(--tp-space-3);   /* 12px */
gap: var(--tp-space-4);   /* 16px */
gap: var(--tp-space-5);   /* 20px */
gap: var(--tp-space-6);   /* 24px */
gap: var(--tp-space-8);   /* 32px */
gap: var(--tp-space-10);  /* 40px */
gap: var(--tp-space-12);  /* 48px */
gap: var(--tp-space-16);  /* 64px */
```

### Fontes

As fontes sao selecionadas em **Configuracoes do tema > Turbo - Design System > Tipografia - Fontes** usando `font_picker`. Settings: `tp_font_heading` (titulos) e `tp_font_body` (corpo).

```css
/* Familias */
font-family: var(--tp-font-heading);  /* fonte de headings */
font-family: var(--tp-font-body);     /* fonte do corpo */

/* Propriedades da fonte selecionada */
font-weight: var(--tp-font-heading-weight);
font-style: var(--tp-font-heading-style);
font-weight: var(--tp-font-body-weight);
font-style: var(--tp-font-body-style);
```

As fontes sao carregadas automaticamente com `font_face` filter, `font-display: swap` e preload. Variantes bold, italic e bold-italic sao incluidas. Fontes system nao geram preload nem `@font-face` (verificado com `font.system?`).

#### Fontes customizadas (CDN Shopify)

Cada elemento tipografico (global heading, global body, Corpo, H1-H6) possui checkbox **"Fonte customizada"** no Theme Editor com dois campos:

- **Nome da fonte** — nome CSS da familia (ex: `Playfair Display`)
- **URL da fonte (.woff2)** — URL do arquivo no CDN da Shopify

**Como usar:**
1. Faça upload do `.woff2` em **Conteudo > Arquivos** no admin da Shopify
2. Copie a URL gerada
3. No Theme Editor, ative "Fonte customizada" no elemento desejado
4. Cole a URL no campo "URL da fonte" e informe o nome no campo "Nome da fonte"

O `tp-design-tokens.liquid` gera `@font-face` automaticamente e atualiza a CSS variable correspondente (`--tp-h1-font`, `--tp-body-font`, etc.).

### Tipografia — Headings (Padrao Elementor)

Cada heading tem settings **independentes** no Design System (Turbo - Design System > Tipografia - H1 ate H6). O merchant controla tamanho desktop, tamanho mobile, peso, altura de linha e letter-spacing por nivel.

```css
/* CSS variables por heading */
var(--tp-h1-font)  var(--tp-h1-size)  var(--tp-h1-weight)  var(--tp-h1-leading)  var(--tp-h1-tracking)
var(--tp-h2-font)  var(--tp-h2-size)  var(--tp-h2-weight)  var(--tp-h2-leading)  var(--tp-h2-tracking)
/* ... ate H6 */
```

O tamanho mobile e aplicado via `@media (max-width: 767px)` automaticamente. Cada heading pode ter fonte propria via `--tp-h*-font` (default: `--tp-font-heading`).

| Tag | Classe | Desktop | Mobile | Peso | Line-height | Letter-spacing |
|-----|--------|---------|--------|------|-------------|----------------|
| `h1` | `.tp-h1` | 48px | 36px | Bold (700) | 1.2 | -0.025em |
| `h2` | `.tp-h2` | 36px | 28px | Bold (700) | 1.2 | -0.025em |
| `h3` | `.tp-h3` | 30px | 24px | Semi Bold (600) | 1.3 | normal |
| `h4` | `.tp-h4` | 24px | 20px | Semi Bold (600) | 1.4 | normal |
| `h5` | `.tp-h5` | 20px | 18px | Medium (500) | 1.4 | normal |
| `h6` | `.tp-h6` | 18px | 16px | Medium (500) | 1.4 | normal |

Para estilo de heading sem a tag semantica, use a classe (`.tp-h1`, `.tp-h2`, etc.).

### Tipografia — Corpo (body)

```css
var(--tp-body-font)      /* familia (default: --tp-font-body) */
var(--tp-body-size)      /* default 16px */
var(--tp-body-weight)    /* default 400 */
var(--tp-body-leading)   /* default 1.5 */
var(--tp-body-tracking)  /* default normal */
```

Todo texto (`<p>`, `<span>`, etc.) herda do `body`. Nao ha settings separados para `<p>` ou `<span>`.

### Tipografia — Escala Auxiliar

A escala e derivada dos headings para uso em secoes que precisam de tamanhos sem tag semantica:

```css
font-size: var(--tp-font-size-xs);   /* 12px - labels, badges */
font-size: var(--tp-font-size-sm);   /* 14px - texto pequeno */
font-size: var(--tp-font-size-base); /* = body size */
font-size: var(--tp-font-size-lg);   /* = H6 size */
font-size: var(--tp-font-size-xl);   /* = H5 size */
font-size: var(--tp-font-size-2xl);  /* = H4 size */
font-size: var(--tp-font-size-3xl);  /* = H3 size */
font-size: var(--tp-font-size-4xl);  /* = H2 size */
font-size: var(--tp-font-size-5xl);  /* = H1 size */
```

**Line Height** (utilitarios fixos para uso em secoes):
```css
line-height: var(--tp-leading-tight);   /* 1.2 */
line-height: var(--tp-leading-normal);  /* 1.4 */
line-height: var(--tp-leading-relaxed); /* 1.6 */
```

**Font Weight:**
```css
font-weight: var(--tp-font-regular);  /* 400 */
font-weight: var(--tp-font-medium);   /* 500 */
font-weight: var(--tp-font-semibold); /* 600 */
font-weight: var(--tp-font-bold);     /* 700 */
```

### Sombras

```css
box-shadow: var(--tp-shadow-sm);  /* Sutil - hover de cards */
box-shadow: var(--tp-shadow-md);  /* Media - cards elevados */
box-shadow: var(--tp-shadow-lg);  /* Grande - modais, popovers */
box-shadow: var(--tp-shadow-xl);  /* Destaque - dropdowns, drawers */
```

### Transicoes

```css
transition: opacity var(--tp-transition-fast);  /* 150ms - hover rapido */
transition: opacity var(--tp-transition-base);  /* 300ms - padrao */
transition: opacity var(--tp-transition-slow);  /* 500ms - animacoes suaves */
```

## Exemplo pratico: Antes vs Depois

### ERRADO (valores hardcoded)
```css
.tp-minha-secao__titulo {
  color: #2B2B2B;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
}

.tp-minha-secao__card {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  padding: 32px;
}

.tp-minha-secao__botao {
  background: #443FD2;
  color: #FFFFFF;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  transition: opacity 0.3s ease;
}
```

### CORRETO (com tokens)
```css
.tp-minha-secao__titulo {
  color: var(--tp-color-text-primary);
  font-size: var(--tp-font-size-5xl);
  font-weight: var(--tp-font-bold);
  line-height: var(--tp-leading-tight);
  margin-bottom: var(--tp-space-4);
}

.tp-minha-secao__card {
  background: var(--tp-color-bg-primary);
  border-radius: var(--tp-radius-lg);
  box-shadow: var(--tp-shadow-md);
  padding: var(--tp-space-8);
}

.tp-minha-secao__botao {
  background: var(--tp-color-primary);
  color: var(--tp-color-text-light);
  border-radius: var(--tp-radius-full);
  font-size: var(--tp-font-size-base);
  font-weight: var(--tp-font-semibold);
  transition: opacity var(--tp-transition-base);
}
```

## Integracao com o Schema da Secao

Os campos do schema ja vem pre-preenchidos com os valores do design system. O lojista ve o valor atual e edita diretamente se quiser. Sem checkboxes, sem complexidade.

### Como funciona

1. **CSS (`.css`)** — usa tokens como base (`var(--tp-color-primary)`, etc.)
2. **Schema** — defaults dos campos alinham com os valores do design system
3. **`{% style %}`** — aplica `{{ section.settings.X }}` que ja carrega o valor do design system

### Exemplo no Schema

```json
{
  "type": "color",
  "id": "title_color",
  "label": "Cor do titulo",
  "default": "#2B2B2B"
},
{
  "type": "range",
  "id": "title_font_size_desktop",
  "label": "Tamanho do titulo (desktop)",
  "min": 16,
  "max": 72,
  "step": 2,
  "default": 48,
  "unit": "px"
}
```

Os defaults devem sempre coincidir com os valores do design system. Assim o campo ja vem preenchido com o valor correto e o lojista edita diretamente se precisar.

## Regras

1. **Nunca use cores hardcoded** (#2B2B2B, #667085, etc.) — sempre use um token ou `settings.tp_*`
2. **Nunca use px fixo para spacing** — use `var(--tp-space-*)`
3. **Nunca use border-radius fixo** — use `var(--tp-radius-*)`
4. **Nunca use transition timing fixo** — use `var(--tp-transition-*)`
5. **Nunca use font-weight numerico** — use `var(--tp-font-*)`
6. Valores de layout/posicionamento (width, height, position, flex) nao precisam de token
7. Defaults do schema devem sempre alinhar com os valores do design system
8. Nao poluir o schema com `info` repetitivas — o default do campo ja comunica o valor
9. Secao de referencia: `sections/tp-e-banner-cta-v1.liquid`
