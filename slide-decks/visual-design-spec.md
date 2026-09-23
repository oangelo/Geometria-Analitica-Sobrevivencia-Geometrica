# Visual Design Spec — Princípios de Design Visual

**Curso:** Geometria Analítica — Sobrevivência Geométrica
**Referência:** adaptado do Cálculo Vetorial; classes do `styles.css` da geometria.

> Referência para slides de conteúdo. A capa (`00-capa`) já aplica estes princípios via `title-screen` + componentes temáticos.

## Os 3 Princípios

### 1. Hierarquia Tipográfica

Variação de tamanho, peso e cor para guiar o olho. Sem hierarquia, tudo compete por atenção e o slide fica "plano".

**Níveis em slides de conteúdo:**

| Nível | Elemento | Uso |
|---|---|---|
| Título da seção | h2 | Nome do tópico (1 por seção H) |
| Subtítulo do slide | h3 | Título de cada slide V |
| Fórmula destaque | `.formula` (ou `formula-spotlight` aprovado na issue #45) | Fórmula principal do slide |
| Corpo | p | Texto descritivo |
| Label/metadata | monospace pequeno | Headers, footers, códigos |

**Regra:** Nunca ter mais de 2 elementos consecutivos no mesmo nível sem um contraste (tamanho, cor, ou separador visual).

**Anti-pattern:** Sequências de `<p>` sem variação. Alternar com h3, `.formula`, `.definition-box`, ou mudanças de layout (`two-column`, dual-panel, canvas).

### 2. Enquadramento (Framing)

Barras horizontais no topo e base do slide que delimitam o espaço visual, criando a sensação de "documento" ou "janela" — profundidade por contorno.

**Na capa (referência):**

- `.title-screen` — título centralizado + subtítulo
- `.warning-text` — faixa de aviso temático
- Bordas temáticas do tema pós-apocalíptico

**Em slides de conteúdo:**

- Classes propostas (issue #45): `.slide-header` e `.slide-footer`

```html
<div class="slide-header">SEÇÃO 02 · CONJUNTO R²</div>
<!-- conteúdo do slide -->
<div class="slide-footer">GA-CH1 · CAPÍTULO I</div>
```

**Regras:**

- Todo slide de conteúdo (02–NN) usa header + footer (após aprovação da issue #45)
- Capa (`00-capa`) usa os componentes de capa
- Narrativa (`01-narrativa`) pode usar os componentes de capa quando apropriado
- Resumo e reflexão usam header/footer

**Efeito visual:** As barras "puxam" o olho para as bordas, criando sensação de volume e profundidade — como molduras em design de interiores.

### 3. Profundidade por Opacidade

Camadas de informação com opacidades diferentes simulam profundidade física — como se elementos estivessem em diferentes distâncias do observador.

**Camadas de opacidade:**

| Camada | Opacidade | Elementos | Analogia |
|---|---|---|---|
| Fundo profundo | 0.02-0.04 | Marcas d'água, texturas | Parede distante |
| Moldura | 0.08-0.15 | Bordas decorativas | Sancas, rodapés |
| Informação secundária | 0.2-0.4 | Footers, labels, metadata | Mobília de fundo |
| Contexto | 0.5-0.7 | Blocos de contexto em slide math | Objeto lateral |
| Conteúdo principal | 0.8-1.0 | Títulos, fórmulas, texto-chave | Ponto focal |

**Aplicação em slides de conteúdo:**

- Headers/footers: opacidade reduzida
- Labels dentro de componentes: opacidade 0.4
- Fórmulas principais: opacidade total + destaque (`.formula`, glow `radiation-glow`)
- Elementos com `.fragment`: podem usar opacidade progressiva

**Regra:** Nunca ter tudo em opacidade 1.0. Pelo menos 2 camadas de profundidade por slide.

---

## Paleta (styles.css — não criar cores novas)

| Cor | Hex | Uso |
|---|---|---|
| Terminal green | `#4caf50` | Bordas, títulos, elementos principais |
| Dark background | `#0c0c0c` | Fundo da página |
| Light text | `#e6e6e6` | Texto do corpo |
| Yellow | `#ffeb3b` | `<code>` e destaques |
| Orange | `#ff9800` | `.warning` |
| Red | `#f44336` | `.danger` |
| Light green | `#8bc34a` | `.success` |
| Internal background | `#1c1c1c` | `<details>`, blocos internos |

**Visualizações (canvas):** usar a paleta do tema, com verde terminal como cor principal e amarelo/vermelho para destaques (posição/força). Nunca introduzir cores fora da paleta.

---

## Aplicação Prática — Checklist por Slide

Antes de finalizar um slide de conteúdo, verificar:

- [ ] **Header/Footer:** slide tem `.slide-header` e `.slide-footer`? (após issue #45)
- [ ] **Hierarquia:** há variação de tamanho entre elementos? (não é tudo `<p>`)
- [ ] **Profundidade:** há pelo menos 2 níveis de opacidade?
- [ ] **Contraste:** algum separador visual entre blocos? (`.h-bar`, `.v-bar`, componente com background)
- [ ] **Ponto focal:** é claro qual é o elemento mais importante do slide?
- [ ] **Paleta:** apenas cores da paleta do tema?

## Relação com outros Specs

- **template-spec.md** — estrutura e classes CSS disponíveis
- **narrative-spec.md** — conteúdo narrativo (inserts, fragmentos)
- **pedagogical-spec.md** — abordagem pedagógica (dissonância)
- **visual-design-spec.md** (este) — como os elementos VISUAIS se organizam no slide

Este spec não define *o que* dizer, mas *como apresentar visualmente* o que os outros specs definem.
