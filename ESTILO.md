# Guia de Estilo — Sobrevivência Geométrica

Referência de notação, formatação e critérios de qualidade para todos os materiais do curso.
Este documento é a fonte da verdade. Em caso de dúvida, consulte aqui.

---

## 1. Pontos e Coordenadas

| Objeto | Notação correta | Exemplos |
|---|---|---|
| Ponto genérico | Letra **maiúscula** | $A$, $B$, $P$, $Q$ |
| Ponto com coordenadas 2D | $A(x_0, y_0)$ | $A(2, -3)$, $P(0, 1)$ |
| Ponto com coordenadas 3D | $A(x_0, y_0, z_0)$ | $A(1, 2, -1)$ |
| Ponto genérico na reta/plano | $P(x, y)$ ou $P(x, y, z)$ | — |
| Origem | $O$ ou $O(0,0)$ | — |

**Proibido:** usar letras minúsculas para pontos (`p`, `a`, `b`). Letras minúsculas são reservadas para escalares.

---

## 2. Escalares e Parâmetros

| Objeto | Notação |
|---|---|
| Coordenadas genéricas | $x$, $y$, $z$ |
| Parâmetros de equação de reta (2D) | $a$, $b$, $c$ na forma geral $ax + by + c = 0$ |
| Coeficiente angular | $m$ (forma reduzida $y = mx + n$) |
| Coeficiente linear | $n$ |
| Parâmetro das cônicas | $p$ (distância focal na parábola) |
| Semi-eixos | $a$ (maior), $b$ (menor), com $a > b > 0$ |
| Distância focal | $c$ |
| Excentricidade | $e$ |
| Raio de circunferência | $r$ |
| Parâmetro livre (reta paramétrica) | $t$ ou $\lambda$ |
| Separador decimal | **vírgula** — escrever $0{,}6$, não $0.6$ |

---

## 3. Vetores

### 3.1 Notação geral

| Objeto | Notação correta | Proibido |
|---|---|---|
| Vetor genérico | `\vec{v}` → $\vec{v}$ | negrito $\mathbf{v}$ |
| Vetor definido por dois pontos | `\vec{AB}` → $\vec{AB}$ | $AB$, $\overrightarrow{ab}$ |
| Coordenadas de vetor | $(v_1, v_2)$ ou $(v_1, v_2, v_3)$ | — |
| Módulo/norma | `|\vec{v}|` → $|\vec{v}|$ | $\|\vec{v}\|$ |

> **Por quê `\vec`?** Alunos não conseguem escrever negrito no caderno. A seta é reproduzível à mão.

### 3.2 Vetores com índice

Subscrito **fora** do `\vec`:

```latex
\vec{v}_1   →  vetor v sub 1  ✓
\vec{v_1}   →  evitar (renderização inconsistente)
```

Exemplos: $\vec{n}_1$, $\vec{n}_2$, $\vec{r}_0$, $\vec{d}_1$

### 3.3 Vetores canônicos

Usar $\vec{e}_1$, $\vec{e}_2$, $\vec{e}_3$ **ou** $\vec{i}$, $\vec{j}$, $\vec{k}$ — mas nunca misturar nos dois estilos no mesmo arquivo.

> **Atenção crítica:** NUNCA usar $\vec{i}$, $\vec{j}$ como nomes de variáveis (ex: interceptores, iteradores). Se os vetores canônicos forem $\vec{i}$, $\vec{j}$, $\vec{k}$, qualquer outro vetor do problema deve usar letras diferentes ($\vec{u}$, $\vec{v}$, $\vec{w}$, $\vec{d}$, $\vec{n}$, etc.).

### 3.4 Operações vetoriais

| Operação | Notação |
|---|---|
| Produto escalar | $\vec{u} \cdot \vec{v}$ |
| Produto vetorial | $\vec{u} \times \vec{v}$ |
| Produto misto | $[\vec{u}, \vec{v}, \vec{w}]$ (forma compacta) ou $\vec{u} \cdot (\vec{v} \times \vec{w})$ (forma explícita) |
| Vetor nulo | $\vec{0}$ |

---

## 4. Elementos das Cônicas (Capítulo V)

### 4.1 Parábola

| Elemento | Notação |
|---|---|
| Vértice | $V$ ou $V(h, k)$ |
| Foco | $F$ ou $F(x_F, y_F)$ |
| Parâmetro (distância focal) | $p$ |
| Diretriz | equação da reta, ex: $y = -p$ |
| Eixo de simetria | equação da reta, ex: $x = h$ |

Formas canônicas (vértice na origem):

$$x^2 = 4py \quad \text{(eixo vertical)} \qquad y^2 = 4px \quad \text{(eixo horizontal)}$$

### 4.2 Elipse

| Elemento | Notação |
|---|---|
| Focos | $F_1$ e $F_2$ — **sempre LaTeX**, nunca Unicode "F₁" |
| Semi-eixo maior | $a$ |
| Semi-eixo menor | $b$ |
| Distância focal (centro ao foco) | $c$ |
| Relação fundamental | $c^2 = a^2 - b^2$ |
| Excentricidade | $e = c/a$, com $0 < e < 1$ |

Formas canônicas (centro na origem):

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \; (a > b) \quad \text{eixo maior horizontal}$$
$$\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1 \; (a > b) \quad \text{eixo maior vertical}$$

### 4.3 Hipérbole

| Elemento | Notação |
|---|---|
| Focos | $F_1$ e $F_2$ |
| Semi-eixo real | $a$ |
| Semi-eixo imaginário | $b$ |
| Distância focal | $c$ |
| Relação fundamental | $c^2 = a^2 + b^2$ |
| Excentricidade | $e = c/a$, com $e > 1$ |
| Assíntotas | $y = \pm \frac{b}{a} x$ (hipérbole horizontal) |

---

## 5. Geometria no Espaço (Capítulo VI)

### 5.1 Planos

| Elemento | Notação |
|---|---|
| Equação geral | $ax + by + cz + d = 0$ |
| Vetor normal | $\vec{n} = (a, b, c)$ |
| Planos paralelos | $\alpha \parallel \beta$ |
| Equação com ponto e normal | $a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$ |

### 5.2 Retas no espaço

| Forma | Notação |
|---|---|
| Paramétrica | $\vec{r} = \vec{r}_0 + t\,\vec{d}$, onde $\vec{r}_0$ é ponto e $\vec{d}$ é direção |
| Coordenadas paramétricas | $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$ |
| Simétrica | $\dfrac{x - x_0}{a} = \dfrac{y - y_0}{b} = \dfrac{z - z_0}{c}$ |

### 5.3 Produto vetorial com determinante

```latex
\vec{u} \times \vec{v} = \begin{vmatrix}
  \vec{e}_1 & \vec{e}_2 & \vec{e}_3 \\
  u_1 & u_2 & u_3 \\
  v_1 & v_2 & v_3
\end{vmatrix}
```

Usar $\vec{e}_1, \vec{e}_2, \vec{e}_3$ (ou $\vec{i}, \vec{j}, \vec{k}$) de forma consistente dentro do arquivo.

---

## 6. Paleta de Cores (CSS)

Todos os arquivos usam o mesmo esquema de cores. Não criar novas cores.

| Cor | Hex | Uso |
|---|---|---|
| Verde terminal | `#4caf50` | bordas, títulos, elementos principais |
| Fundo escuro | `#0c0c0c` | fundo da página |
| Texto claro | `#e6e6e6` | texto corrido |
| Amarelo | `#ffeb3b` | destaque de `<code>` |
| Laranja | `#ff9800` | classe `.warning` — avisos moderados |
| Vermelho | `#f44336` | classe `.danger` — perigo, erros críticos |
| Verde claro | `#8bc34a` | classe `.success` — confirmação, sucesso |
| Fundo interno | `#1c1c1c` | fundo de `<details>`, blocos internos |

**Uso nas classes semânticas:**
- Resultados corretos → classe `.success`
- Alertas matemáticos → classe `.warning`
- Erros ou condições críticas → classe `.danger`

---

## 7. Critérios de Qualidade dos Enunciados

### Proibido
- **Resposta no enunciado:** "Calcule $x$, sabendo que $x = 3$..."
- **Pergunta que se responde sozinha:** "Verifique que a área é $12$."  
  → Correto: "Calcule a área do triângulo."
- **Notação mista no mesmo exercício:** usar $\vec{AB}$ e $\overrightarrow{AB}$ no mesmo arquivo
- **Unicode matemático no texto:** "F₁ e F₂" → usar sempre LaTeX: `$F_1$ e $F_2$`
- **Números com ponto decimal:** "0.6" → usar vírgula: "$0{,}6$"
- **Conceitos do capítulo seguinte:** um exercício do cap. I não pode usar produto escalar (cap. II)

### Obrigatório
- Enunciado tem dados suficientes para resolver, sem dados redundantes
- A pergunta é clara sobre o que deve ser entregue como resposta
- Unidades são mencionadas quando o problema tem contexto físico
- Cada exercício é resolvível com os conceitos do tópico atual e anteriores

---

## 8. Formatação MathJax

| Tipo | Sintaxe no HTML |
|---|---|
| Fórmula inline | `$...$` ou `\(...\)` |
| Fórmula em destaque (bloco) | `$$...$$` dentro de `<div class="formula">` |
| Vírgula decimal | `$0{,}6$` (chaves evitam espaço extra) |
| Texto dentro de fórmula | `\text{Foco: }` |
| Sistemas | `\begin{cases} ... \end{cases}` |
| Determinante | `\begin{vmatrix} ... \end{vmatrix}` |

---

## 9. Diretrizes Visuais (SVGs)

### 9.1 Limpeza e Simplicidade
- **Minimalismo Matemático:** SVGs devem focar nas *formas geométricas* (retângulos, ângulos, triângulos).
- **Sem poluição de texto:** **Evite** colocar fórmulas longas, equações detalhadas ou blocos de texto denso *dentro do próprio SVG* (como "Área = $\pi r^2$"). Coloque as fórmulas e cálculos no *HTML do slide* adjacente à imagem, onde o MathJax pode renderizá-las nativamente.
- **Limpeza do Código SVG:** Se usar softwares externos (como Inkscape), limpe o código antes de usar. Remova metadados (`<sodipodi>`, `<inkscape>`) para manter o arquivo leve e editável.

### 9.2 Estilo Fallout (Terminal)
- **Cores Oficiais:** Utilize a paleta de cores definida na Seção 6. O fundo padrão pode ser um `#0A0A0A` com opacidade, linhas principais no verde-terminal `#ADFF2F` e destaques em dourado `#FFD700`.
- **Tipografia:** Quando precisar usar texto no SVG (como rótulos de ângulos ou medidas simples como `r` ou `30°`), defina explicitamente o atributo `font-family="monospace"` para combinar com a temática do terminal Pip-Boy.
- **Espessura de Linhas (Legibilidade):** Use `stroke-width="3"` ou `4` para os contornos principais de polígonos/triângulos/eixos e `stroke-width="1"` ou `2` para grades, linhas pontilhadas de referência e auxiliares. Lembre-se de que a imagem será projetada, então linhas muito finas (`width="1"`) desaparecem.
