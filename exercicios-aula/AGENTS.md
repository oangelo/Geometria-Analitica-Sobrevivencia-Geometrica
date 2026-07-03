# Guia para Agentes de IA - Exercícios de Sala de Aula

> **Workflow:** Consulte `/AGENTS.md` para regras de commits, visualização e fluxo de entrega.

## Visão Geral

**Exercícios de sala** são folhas A4 coluna dupla para resolução em aula, com:

- Diálogo guiado (baby steps)
- Lacunas para preencher
- Sem tema narrativo (diferente dos exercícios de casa)
- Objetivo e direto
- Foco em reforço do conteúdo apresentado em aula

**Características:**

- Perguntas que levam o aluno a pensar
- Checkpoints de verificação
- Foco em aplicação imediata do conteúdo
- Não explicar conceitos do zero (aluno já viu em aula)

---

## Estrutura de Arquivos

```
exercicios-aula/
├── AGENTS.md                    # Este guia
├── sala-styles.css              # CSS compartilhado para impressão
├── capitulo-i-o-espaco-vetorial-r2/
│   ├── index.html               # Monta a folha final
│   ├── exercicio-1.html         # Fragmento HTML
│   ├── exercicio-2.html
│   └── ...
├── capitulo-ii-vetores/
│   ├── index.html
│   └── exercicio-*.html
└── ...
```

### Organização por Capítulo

| Capítulo | Conteúdo | Exercícios |
|----------|----------|------------|
| I | O Espaço Vetorial R² | 4-6 |
| II | Vetores e Operações | 4-6 |
| III | Produto Escalar | 4-6 |
| IV | Vetores em R³ e Produto Vetorial | 4-6 |
| V | Retas no Plano | 4-6 |
| VI | Circunferências | 4-6 |
| VII | Cônicas | 4-6 |

---

## Como Funciona

### Montagem (index.html)

O arquivo `index.html` usa JavaScript `fetch()` para carregar os exercícios:

```javascript
const EXERCICIOS = [
  'exercicio-1.html',
  'exercicio-2.html',
  // ... na ordem desejada
];

async function carregarExercicios() {
  const container = document.getElementById('exercicios-container');

  for (const arquivo of EXERCICIOS) {
    const response = await fetch(arquivo);
    const html = await response.text();
    container.insertAdjacentHTML('beforeend', html);
  }

  // Renderiza matemática após carregar todos
  renderMathInElement(document.body, {...});
}
```

**Vantagens:**

- Reordenar exercícios = mudar a lista
- Remover exercício = tirar da lista
- Editar exercício = modificar apenas aquele arquivo

### Exercício Individual (exercicio-N.html)

Cada exercício é um **fragmento HTML** (sem `<html>`, `<head>`, `<body>`):

```html
<section class="exercicio" data-topico="retas" data-dificuldade="medio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Enunciado do exercício.
  </p>

  <p class="questao">Pergunta principal.</p>
  <p class="dialogo">Texto explicativo que guia o aluno.</p>
  <p class="subitem">a) Item: <span class="lacuna"></span></p>
  <p class="subitem">b) Item: <span class="lacuna"></span></p>
  <p class="dica">Dica opcional.</p>
  <p class="checkpoint">
    <span class="checkmark"></span>
    Verificação.
  </p>
</section>
```

---

## Metadados (data-attributes)

Atributos opcionais no `<section>`:

| Atributo           | Valores                                              | Descrição            |
| ------------------ | ---------------------------------------------------- | -------------------- |
| `data-topico`      | `pontos`, `vetores`, `retas`, `circulos`, `conicas`  | Tópico matemático    |
| `data-dificuldade` | `facil`, `medio`, `dificil`                          | Nível de dificuldade |

---

## Classes CSS Disponíveis

### Exercício

```html
<section class="exercicio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">N.</span>
    Texto do enunciado.
  </p>
</section>
```

### Questão

```html
<p class="questao">Pergunta que o aluno deve responder.</p>
```

### Diálogo

```html
<p class="dialogo">Texto explicativo que guia o aluno passo a passo.</p>
```

### Subitens

```html
<p class="subitem">a) Passo: <span class="lacuna"></span></p>
<p class="subitem">b) Passo: <span class="lacuna"></span></p>
```

### Lacunas

```html
<!-- Inline (para respostas curtas) -->
<span class="lacuna"></span>

<!-- Bloco (linha inteira, para cálculos) -->
<span class="lacuna-grande"></span>
```

### Fórmula Destacada

```html
<p class="formula">$$d(A,B) = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$</p>
```

**IMPORTANTE:** Não coloque `<span class="lacuna">` dentro de equações LaTeX. Use texto simples para fórmulas com lacunas.

### Dica

```html
<p class="dica">Texto de ajuda para o aluno.</p>
```

### Checkpoint

```html
<p class="checkpoint">
  <span class="checkmark"></span>
  Verificação: o resultado faz sentido?
</p>
```

### Espaço de Trabalho

```html
<div class="workspace"></div>
```

---

## Notação Matemática

### KaTeX (não MathJax)

- Inline: `$...$`
- Bloco: `$$...$$`

### Convenções de Notação

| Elemento | LaTeX | Exemplo renderizado |
|----------|-------|---------------------|
| Ponto | `$A(x_0, y_0)$` | A(x₀, y₀) |
| Vetor | `$\vec{v}$` | v⃗ |
| Vetor com componentes | `$\vec{v} = (a, b)$` | v⃗ = (a, b) |
| Distância | `$d(A,B)$` | d(A,B) |
| Módulo | `$\|\vec{v}\|$` | ‖v⃗‖ |
| Produto escalar | `$\vec{u} \cdot \vec{v}$` | u⃗ · v⃗ |
| Ângulo | `$\theta$` | θ |

### Variáveis Simples

Use `<strong>` em vez de LaTeX para variáveis simples:

- `<strong>x</strong>` em vez de `$x$`
- `<strong>v⃗</strong>` em vez de `$\vec{v}$`

Isso melhora performance e evita problemas com lacunas.

---

## Quantidade de Exercícios

- **4-6 exercícios por folha**
- **2-4 questões por exercício**
- **2-4 subitens por questão**
- **Total: ~15-25 interações por folha**

---

## Nível de Dificuldade

**Reforço:** aluno já viu o conteúdo em aula.

- ❌ Não explicar conceitos do zero
- ✅ Focar em aplicação
- ✅ Fazer perguntas que levam ao raciocínio
- ✅ Checkpoints para auto-verificação
- ✅ Baby steps para guiar o pensamento

---

## Estilo de Diálogo

**Objetivo:** Guiar o aluno sem dar a resposta diretamente.

### Exemplo Errado (muito óbvio)

> O vetor perpendicular a (a, b) é (-b, a). Escreva o vetor perpendicular.

### Exemplo Certo (guia o pensamento)

> O produto escalar de dois vetores perpendiculares é zero. Como escolher as coordenadas de um vetor para que o produto escalar seja zero?

### Padrões de Diálogo

1. **Contextualizar:** "Considere os pontos A(1, 2) e B(4, 8)."
2. **Questionar:** "Qual é o vetor diretor que vai de A até B?"
3. **Guiar:** "Para encontrar o deslocamento em cada direção..."
4. **Verificar:** "Some os componentes. O resultado faz sentido?"

---

## Fluxo de Criação

### Criar Novo Capítulo

1. Criar pasta: `exercicios-aula/capitulo-N-nome/`
2. Criar `index.html` (copiar de capítulo existente ou template)
3. Criar `exercicio-1.html` a `exercicio-6.html`
4. Atualizar lista `EXERCICIOS` no `index.html`
5. Testar no navegador

### Criar/Editar Exercício

1. Abrir `exercicio-N.html`
2. Seguir a estrutura de classes CSS
3. Usar `<strong>` para variáveis simples
4. Usar LaTeX apenas para fórmulas complexas
5. Incluir `data-topico` e `data-dificuldade`

### Reordenar Exercícios

Basta mudar a ordem no array `EXERCICIOS` em `index.html`:

```javascript
const EXERCICIOS = [
  'exercicio-3.html', // Mudou ordem
  'exercicio-1.html',
  'exercicio-2.html',
  // ...
];
```

---

## Template index.html

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Capítulo N - Nome do Capítulo</title>

    <!-- KaTeX para matemática -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    />
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
    ></script>
    <script
      defer
      src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    ></script>

    <!-- Estilos -->
    <link rel="stylesheet" href="../sala-styles.css" />
  </head>
  <body>
    <div class="page">
      <!-- CABEÇALHO -->
      <header class="header">
        <div class="header-left">
          <h1 class="title">Capítulo N: Nome do Capítulo</h1>
          <p class="subtitle">Geometria Analítica</p>
        </div>
        <div class="header-right">
          <p class="course-info">Geometria Analítica - 2026/1</p>
          <p class="course-info">Nome: _______________________</p>
          <p class="course-info">Data: ___/___/___</p>
        </div>
      </header>

      <!-- INSTRUÇÕES -->
      <div class="instructions">
        <p>
          Resolva os exercícios seguindo o raciocínio proposto. Preencha as
          lacunas.
        </p>
      </div>

      <!-- EXERCÍCIOS (carregados dinamicamente) -->
      <main class="columns" id="exercicios-container">
        <!-- Os exercícios são injetados aqui via JavaScript -->
      </main>

      <!-- RODAPÉ -->
      <footer class="footer">
        <p>Geometria Analítica - Exercícios de Sala | Capítulo N: Nome</p>
      </footer>
    </div>

    <script>
      const EXERCICIOS = [
        'exercicio-1.html',
        'exercicio-2.html',
        'exercicio-3.html',
        'exercicio-4.html',
        'exercicio-5.html',
        'exercicio-6.html',
      ];

      async function carregarExercicios() {
        const container = document.getElementById('exercicios-container');

        for (const arquivo of EXERCICIOS) {
          try {
            const response = await fetch(arquivo);
            if (!response.ok) throw new Error(`Falha ao carregar ${arquivo}`);
            const html = await response.text();
            container.insertAdjacentHTML('beforeend', html);
          } catch (erro) {
            console.error(`Erro ao carregar ${arquivo}:`, erro);
            container.insertAdjacentHTML(
              'beforeend',
              `<p style="color: red;">Erro ao carregar ${arquivo}</p>`
            );
          }
        }

        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      }

      document.addEventListener('DOMContentLoaded', carregarExercicios);
    </script>
  </body>
</html>
```

---

## Teste

```bash
# Navegar para a pasta do capítulo
cd exercicios-aula/capitulo-N-nome/

# Iniciar servidor local
python3 -m http.server 8080

# Abrir no navegador
firefox http://localhost:8080

# Testar impressão (Ctrl+P ou Cmd+P)
```

---

## Exemplo Completo de Exercício

```html
<!-- exercicio-1.html -->
<section class="exercicio" data-topico="vetores" data-dificuldade="medio">
  <p class="exercicio-enunciado">
    <span class="exercicio-numero">1.</span>
    Considere os pontos A(1, 2) e B(4, 8).
  </p>

  <p class="questao">
    Encontre o vetor que vai de A até B.
  </p>

  <p class="dialogo">
    Para ir do ponto A até o ponto B, precisamos saber quanto nos deslocamos em
    cada direção.
  </p>

  <p class="subitem">
    a) O deslocamento em <strong>x</strong> é: <strong>Δx</strong> =
    <span class="lacuna"></span>
  </p>
  <p class="subitem">
    b) O deslocamento em <strong>y</strong> é: <strong>Δy</strong> =
    <span class="lacuna"></span>
  </p>
  <p class="subitem">
    c) O vetor <strong>AB⃗</strong> = (<span class="lacuna"></span>,
    <span class="lacuna"></span>)
  </p>

  <p class="checkpoint">
    <span class="checkmark"></span>
    Verifique: o vetor aponta de A para B?
  </p>

  <p class="questao">Qual é o módulo desse vetor?</p>

  <p class="dialogo">
    O módulo é a distância entre os pontos. Use o teorema de Pitágoras.
  </p>

  <p class="subitem">
    a) <strong>|AB⃗|</strong> = √( <span class="lacuna"></span>² + <span class="lacuna"></span>² )
  </p>
  <p class="subitem">
    b) <strong>|AB⃗|</strong> = <span class="lacuna"></span>
  </p>

  <p class="dica">Calcule primeiro Δx e Δy, depois some os quadrados.</p>
</section>
```

---

## Qualidade Checklist

Antes de criar um exercício, verifique:

- [ ] Enunciado claro e direto
- [ ] Diálogo guia o raciocínio (não dá a resposta)
- [ ] Lacunas estão nos pontos certos
- [ ] Checkpoints para auto-verificação
- [ ] Notação matemática correta
- [ ] Data-topico e data-dificuldade preenchidos
- [ ] 4-6 exercícios por folha
- [ ] Testado no navegador
- [ ] Impressão funciona (coluna dupla A4)
