# Guia de Trabalho para Agentes - Slide Decks

Este documento descreve o processo obrigatório para criar e revisar slides no projeto **Geometria Analítica: Sobrevivência Geométrica**.

---

## 1. Regras Críticas (Verificação Obrigatória)

Antes de qualquer commit, execute **todas** as verificações abaixo. Se qualquer uma falhar, corrija antes de prosseguir.

### 1.1 CSS — NENHUM estilo inline

```
REGRA: ZERO atributos style="..." nos arquivos HTML de seção.
       ZERO blocos <style> nos arquivos HTML de seção.
       USE APENAS classes de slide-decks/styles.css.
```

**Verificação obrigatória (rodar para cada arquivo alterado):**

```bash
grep -n 'style=' slide-decks/capitulo-N/*.html
# Resultado esperado: VAZIO. Qualquer hit é VIOLAÇÃO.
```

**Se encontrar inline styles:** Mova o estilo para `styles.css` com uma classe semântica, ou substitua por uma classe existente.

**Exceções (apenas no loader principal, não nas seções):** O `capitulo-N.html` principal pode conter `<style>` no `<head>` se for absolutamente necessário para inicialização — mas prefira sempre `styles.css`.

### 1.2 LaTeX — Delimitadores com UMA barra

```
REGRA: No arquivo HTML, delimitadores MathJax usam UMA barra:
       Inline:  \( ... \)       (NÃO: \\( ... \\))
       Display: \[ ... \]       (NÃO: \\[ ... \\])
       Comandos: \vec{v}         (NÃO: \\vec{v})
```

**Verificação obrigatória:**

```bash
# Procure barras duplas em LaTeX (fora de <script> e bmatrix)
grep -n '\\\\(' slide-decks/capitulo-N/*.html | grep -v 'inlineMath\|displayMath\|script'
grep -n '\\\\[' slide-decks/capitulo-N/*.html | grep -v 'inlineMath\|displayMath\|script'
grep -n '\\\\vec\|\\\\frac\|\\\\sqrt\|\\\\left\|\\\\right' slide-decks/capitulo-N/*.html | grep -v 'script'
# Resultado esperado: VAZIO. Qualquer hit é LaTeX quebrado.
```

**Correção em massa:**

```bash
sed -i '/inlineMath\|displayMath/!{s/\\\\(/\\(/g; s/\\\\)/\\)/g; s/\\\\\[/\\[/g; s/\\\\\]/\\]/g; s/\\\\\([a-zA-Z]\)/\\\1/g}' arquivo.html
```

**Atenção:** Dentro de `<script>` (config do MathJax), `\\` é correto — é JavaScript. Dentro de `bmatrix`, `\\` também é correto (separador de linha). O `sed` acima preserva ambos.

### 1.3 Notação Matemática

| Elemento | Correto | Errado |
|----------|---------|--------|
| Pontos | `\(A\)`, `\(P(x_0, y_0)\)` | `\(a\)`, `\(b\)` (minúscula) |
| Vetores | `\vec{v}` | `**v**` ou `\mathbf{v}` |
| Índices de vetor | `\vec{v}_1` | `\vec{v_1}` |
| Vetores canônicos | `\vec{e}_1, \vec{e}_2` ou `\vec{i}, \vec{j}` | Nunca reusar i, j, k como variáveis |
| Separador decimal | `\(0{,}5\)` (vírgula) | `\(0.5\)` (ponto) |
| Focos (cônicas) | `\(F_1\)`, `\(F_2\)` (LaTeX) | F₁, F₂ (Unicode) |

### 1.4 Escopo — Conceitos de capítulos posteriores

Capítulo N pode usar tudo de Cap 0 a N-1, mais os conceitos próprios de Cap N. **NADA de Cap N+1 em diante.**

Ao revisar slides, verificar se algum conceito fora do escopo aparece. Exemplo: slides do Cap I (R²) não devem mencionar produto vetorial ou espaço R³.

---

## 2. Princípios de Narrativa para Slides

Slides não são enciclopédia — são **aula narrada**. Cada stack vertical conta uma história com começo, meio e fim.

> **Specs complementares:** leia `narrative-spec.md` (inserts no V1 + fragmentos, temas BR/RJ), `pedagogical-spec.md` (dissonância cognitiva), `template-spec.md` (fluxo pedagógico) e `visual-design-spec.md` (design visual) antes de planejar ou implementar slides.

### 2.1 Necessidade antes de definição

Antes de apresentar um conceito ou fórmula, o slide deve mostrar **por que** ele é necessário. Qual problema cria a demanda? Qual foi a motivação histórica ou prática?

**Ruim:**
> "Um vetor \(\vec{v}\) no plano é um par ordenado \((x,y)\) com magnitude e direção."

**Bom:**
> "Coordenadas dizem *onde* você está. Mas para ir do Abrigo Alpha ao Posto Bravo, precisamos saber não só a distância, mas a *direção*. Precisamos de uma ferramenta que capture direção **e** magnitude."
>
> *(só agora vem a definição formal)*

**Tipos de motivação que funcionam:**
- Aplicação temática (navegação, defesa, recursos)
- Limitação de uma ferramenta anterior ("sabemos calcular X, mas e quando Y?")
- Pergunta provocadora ("como determinar se duas retas são paralelas só com as equações?")
- Conexão histórica (quem precisou disso e por quê)

### 2.2 Slide como narrativa, não como enciclopédia

Cada stack vertical (os slides que você navega para baixo dentro de um tópico) deve ter uma progressão lógica:

```
Motivação → Conceito → Visualização/Exemplo → Prática → Fechamento
```

Nem todo tópico precisa de todos os tipos de slide. O scaffold serve como guia, não como molde rígido:

| Tipo | Classe | Propósito |
|------|--------|-----------|
| Briefing | `mission-briefing` | Apresentar o problema/motivação |
| Conceito | `mission-briefing` | Definição formal (após motivação) |
| Relatório de campo | `field-report` | Aplicações e contexto |
| Simulador | `simulator` | Visualização interativa |
| Treinamento | `survival-training` | Exercício prático |
| Debriefing | `debriefing` | Síntese e conexão com próximo tópico |

### 2.3 Construir sobre o já sabido

Slides devem retomar conceitos de capítulos/tópicos anteriores e mostrar como o novo conceito nasce deles ou os generaliza. O aluno não começa do zero a cada tópico.

**Exemplo:** Antes de introduzir produto escalar, retomar que vetores representam deslocamentos — "já sabemos somar vetores e multiplicar por escalar. Mas como comparar a *direção* de dois vetores?"

Referências devem ser por **conceito**, nunca por número de slide.

### 2.4 Uma ideia por slide vertical

Não entupir um slide com múltiplos conceitos. Se o slide tem mais que: uma definição + um exemplo, ou uma motivação + uma fórmula, provavelmente deve ser dividido em dois slides verticais.

### 2.5 Visualização quando didaticamente útil

Nem todo conceito precisa de canvas interativo. Visualizações devem ser adicionadas quando:
- O conceito é inerentemente geométrico (vetores, retas, cônicas)
- A animação ajuda a entender algo que texto estático não captura
- O aluno precisa ver a consequence de mudar parâmetros

Quando não houver visualização, não forçar — um `field-report` bom supre a necessidade.

### 2.6 Três camadas da narrativa

A narrativa crítica (temas sociais BR/RJ — ver issue #46 e `narrative-spec.md`) entra nos slides em três níveis:

1. **`01-narrativa.html`** — slide dedicado após a capa. Apresenta o tema social do capítulo (3-5 frases, sem fórmulas).
2. **Insert no V1 de cada tópico** — parágrafo final do slide de abertura (motivação), 1-2 frases, tom seco. **OBRIGATÓRIO em toda seção de conteúdo (02–NN).** Se não houver conexão natural, criar por analogia, contraste ou ironia.
3. **Fragmento ao lado de exemplos** — nos slides de APLICAÇÃO (V5+), o exemplo pode usar painel duplo: esquerda = matemática, direita = fragmento narrativo (2-4 frases). O fragmento NÃO precisa ter relação lógica com o exemplo — a justaposição emocional ancora a memória técnica.

**Regras obrigatórias:**
- **Fatos verificáveis:** todo dado numérico com fonte (IBGE, IPEA, ONU, dados oficiais). Nunca inventar números.
- **Sem partidarismo:** crítica sistêmica, nunca nomes de políticos ou campanhas.
- **Tom seco:** o impacto vem dos fatos, não da retórica.
- **Conteúdo técnico é prioridade:** se a inserção não ajuda a reter/entender a matemática, cortar.
- Inserts e fragmentos não repetem os mesmos fatos — cada beat é único.

---

## 3. Estrutura Horizontal/Vertical e Coerência com Exercícios

### 3.1 Mapeamento com as listas de exercício

Os slides de cada capítulo devem cobrir **os mesmos tópicos** das listas de exercício correspondentes. A correspondência é:

```
Capítulo N (slides)           Capítulo N (exercícios)
─────────────────            ──────────────────────────
Tópico 1 (seção horiz.)   ↔   Tópico 1 (pasta de exercícios)
Tópico 2 (seção horiz.)   ↔   Tópico 2 (pasta de exercícios)
...
```

Cada tópico da lista de exercícios vira uma **seção horizontal** no Reveal.js. Os slides verticais dessa seção aprofundam o tópico.

### 3.2 Ordem das seções

A ordem das seções horizontais deve seguir a mesma progressão das listas de exercício. Consulte `exercicios/capitulo-N/` para verificar os tópicos existentes e sua ordem.

**Atenção:** nem todo tópico de exercício precisa de slides com mesmo nível de detalhe. Alguns são mais extensos (produto escalar, cônicas) e pedem mais slides verticais; outros são mais diretos (notação) e podem ter apenas 2-3 slides.

### 3.3 O que os slides preparam, os exercícios praticam

Os slides introduzem o conceito com motivação e definição. Os exercícios partem daí para a prática. Se um exercício pressupõe conhecimento que não aparece nos slides, ou os slides estão incompletos, ou o exercício está fora do escopo.

Ao revisar slides, o Agente Revisor DEVE mapear explicitamente a correspondência:

```
Tópico X (slides):
  - Slide 1: Motivação (por que medir ângulos?)
  - Slide 2: Definição (produto escalar)
  - Slide 3: Propriedades
  - Slide 4: Aplicação (cálculo de ângulos)
  
Tópico X (exercícios):
  - Exercícios 1-3: Cálculo direto de produto escalar
  - Exercícios 4-6: Aplicação para ângulos
  - Exercícios 7+: Combinações
  
Lacuna: Slides não cobrem "projeção vetorial", mas exercício 5 pressupõe esse conhecimento.
Ação: Adicionar slide de projeção ou sinalizar no RTC.
```

---

## 4. Formato dos Arquivos de Seção

### 4.1 Estrutura de pastas

Cada capítulo tem sua pasta com seções modulares carregadas via `fetch()`:

```
slide-decks/
├── styles.css
├── capitulo-i.html          ← Loader principal (configura Reveal + MathJax)
├── capitulo-i/
│   ├── 1-conjunto-r2.html
│   ├── 2-notacao.html
│   ├── 3-vetores.html
│   ├── 4-aplicacoes.html
│   └── ...
├── svg/                     ← SVGs estáticos compartilhados
└── capitulo-ii.html         ← Próximo capítulo
```

### 4.2 Loader principal (`capitulo-N.html`)

O loader carrega seções dinamicamente e inicializa Reveal + MathJax:

```javascript
const SECTIONS = [
  'capitulo-i/1-conjunto-r2.html',
  'capitulo-i/2-notacao.html',
  'capitulo-i/3-vetores.html',
  // ...
];
```

Ao adicionar/remover seções, atualize este array. A ordem define a navegação horizontal.

### 4.3 Arquivo de seção (`capitulo-N/topico.html`)

Cada seção é um HTML **fragmento** (não um documento completo). Estrutura:

```html
<!-- SEÇÃO: Vetores no Plano -->
<div class="slides">
  <!-- Necessidade -->
  <section class="field-report">
    <h2>Vetores: Por Que Precisamos?</h2>
    <!-- Motivação: coordenadas dizem onde, vetores dizem para onde -->
  </section>

  <!-- Definição formal -->
  <section class="mission-briefing">
    <h2>Vetores no Plano</h2>
    <!-- Definição com definition-box -->
  </section>

  <!-- Visualização -->
  <section class="simulator">
    <h3>Simulador: Vetores</h3>
    <div class="canvas-container">
      <canvas id="vetores-canvas" width="800" height="400"></canvas>
    </div>
  </section>

  <!-- Debriefing -->
  <section class="debriefing">
    <h3>Síntese: Vetores</h3>
    <!-- Conexão com próximo tópico -->
  </section>
</div>
```

**Regras obrigatórias:**
- IDs de canvas: prefixo do tópico (ex: `vetores-canvas`, `r2Canvas`)
- JavaScript: SEMPRE em IIFE para evitar vazamento de escopo
- NENHUM `<style>` inline ou bloco `<style>` no arquivo de seção
- NENHUM `<script src="mathjax">` no arquivo de seção (já está no loader)
- Classes: APENAS as definidas em `styles.css`

### 4.4 JavaScript para visualizações

Padrão IIFE obrigatório:

```javascript
(function() {
  function init() {
    const canvas = document.getElementById('topico-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // ... lógica de desenho
  }
  document.addEventListener('DOMContentLoaded', init);
  // Re-resize ao mudar de slide (Reveal)
  if (window.Reveal) {
    Reveal.on('slidechanged', function() {
      if (document.getElementById('topico-canvas')) init();
    });
  }
})();
```

---

## 5. Pipeline de Revisão (4 Agentes)

O pipeline tem 4 etapas com 4 agentes distintos. Entre cada etapa, o professor revisa e aprova antes de prosseguir.

```
Agente 1 — Revisor (diagnóstico → RTC)
         ↓ Revisão humana (professor comenta aprovação/ajustes)
Agente 2 — Planejador (PDI em 4 camadas, independentes)
         ↓ Revisão humana (professor comenta aprovação/ajustes)
Agente 3 — Implementador (executa o PDI final)
Agente 4 — Verificador (confere implementação contra specs e checklist)
```

**Modelo de referência:** o pipeline em 4 camadas foi adaptado do curso de Cálculo Vetorial (ver `slide-decks/AGENTS.md` daquele repo).

### Agente 1 — Revisor (gera RTC)

**Propósito:** Diagnóstico. Identificar o que está errado e o que falta. NÃO é plano de ação — é levantamento de problemas.

**Entrada:** Slide atual + exercícios do mesmo capítulo

**Processo:**
1. Ler os slides do capítulo em revisão
2. Ler as listas de exercício do mesmo capítulo (`exercicios/capitulo-N/`)
3. Verificar regras críticas (inline styles, LaTeX, notação, escopo)
4. Mapear correspondência slides↔exercícios
5. Avaliar princípios de narrativa (necessidade antes de definição, progressão, uma ideia por slide)
6. Gerar RTC como comentário no issue do GitHub

**Saída (RTC):**
- **Erros críticos:** inline styles, LaTeX quebrado, notação incorreta, conceitos fora de escopo
- **Correspondência slides↔exercícios:** mapear tópicos e identificar lacunas
- **Análise narrativa:** cada stack vertical tem motivação? Conceitos constroem sobre anteriores?
- **Sugestões:** reordenação, adições, remoções (direções gerais, não plano detalhado)

**Como invocar:**

> Execute o Agente Revisor no issue #N (NOME DO CAPÍTULO).
>
> ANTES de começar:
> 1. Leia `slide-decks/AGENTS.md` — regras críticas, LaTeX, notação, narrativa
> 2. Leia `slide-decks/prompt.md` — referência de classes CSS e estrutura
> 3. Leia os slides em `slide-decks/capitulo-N/`
> 4. Leia os exercícios em `exercicios/capitulo-N/`
>
> Depois:
> - Execute as verificações obrigatórias (grep para style=, grep para \\\\ LaTeX, notação)
> - Mapeie a correspondência slides↔exercícios
> - Avalie se cada stack vertical segue "necessidade → conceito → visualização → prática → fechamento"
> - Gere um RTC como comentário no issue

**Formato do RTC:**

```markdown
## RTC: Capítulo N — [NOME]

### 1. Erros Críticos

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| 3-vetores.html:47 | CSS | inline style="color: #ffd700" |
| 5-vetores-posicao.html:73 | LaTeX | \\( não vai renderizar (barra dupla) |

### 2. Correspondência Slides ↔ Exercícios

| Tópico Exercícios | Slides Correspondentes | Lacunas |
|-------------------|----------------------|---------|
| 1-conjunto-r2 | 1-conjunto-r2.html | OK |
| 2-igualdade-e-operacoes | 2-notacao.html + 2-operacoes.html | Slides não cobrem igualdade de pares |
| 3-vetores-no-plano | 3-vetores.html | OK |
| 4-aplicacoes | 4-aplicacoes.html | Faltam slides sobre baricentro |

### 3. Análise Narrativa

- **3-vetores.html**: Stack começa com definição formal sem motivação. Propor slide de "por que vetores?" antes da definição.
- **5-vetores-posicao-deslocamento.html**: Boa progressão, mas debriefing não conecta com próximo tópico.

### 4. Sugestões

1. Adicionar slide de motivação antes de "Vetores: As Setas da Sobrevivência"
2. Mover slide sobre norma para depois da motivação (necessidade → ferramenta)
3. Adicionar slide de projeção vetorial (exercício 5 pressupõe conhecimento)
```

### Agente 2 — Planejador (gera PDI em 4 camadas)

**Propósito:** Transformar o diagnóstico (RTC + aprovação do professor) em Plano Detalhado de Implementação (PDI) em **4 camadas independentes**. Cada camada é publicada separadamente e exige aprovação antes de avançar.

**Por que em camadas:** a narrativa não pode ser "tempero" da matemática — é um arco que vale por si mesmo. Matemática e narrativa são planejadas de forma independente e só depois integradas. A integração pode resultar em conexões naturais (analogias) ou em separação limpa (lado a lado). Nem todo slide precisa de insert — forçar conexões artificiais é pior que não ter.

**Entrada:** RTC + comentários de aprovação do professor no issue

**Processo:**
1. Ler o RTC nos comentários do issue
2. Ler a aprovação/ajustes do professor
3. Ler os slides atuais e exercícios para referência
4. Ler `narrative-spec.md` e `pedagogical-spec.md`
5. Gerar as 4 camadas, cada uma como comentário separado

**Como invocar:**

> Execute o Agente Planejador no issue #N.
>
> ANTES de começar:
> 1. Leia `slide-decks/AGENTS.md` — especialmente §2 (narrativa) e §9 (classes CSS)
> 2. Leia `slide-decks/prompt.md` — referência de classes CSS
> 3. Leia o RTC nos comentários da issue (`gh issue view N --comments`)
> 4. Leia a aprovação/ajustes do professor nos comentários
> 5. Leia os slides atuais em `slide-decks/capitulo-N/`
> 6. Leia os exercícios em `exercicios/capitulo-N/`
>
> Gere o PDI em 4 camadas como comentários no issue, seguindo o formato abaixo.

**Formato do PDI — Camada 1: Núcleo Matemático (independente)**

Para cada seção de conteúdo (02–NN), mapear:
- Quais conceitos dos exercícios viram slides verticais (um conceito por slide)
- Ordem de progressão
- O que fica para os exercícios (nem tudo precisa estar nos slides)

**Requisitos obrigatórios:**
- Cada seção deve incluir **1 a 3 exemplos clássicos** (usar `training-problem`/`problem-section`, sem solução — a decidir na issue #45). Exemplos clássicos do tópico, calculáveis em aula.
- Cada seção deve seguir o **fluxo pedagógico** (ver `template-spec.md`): motivação → conceito → formalização → interpretação → exemplos → visualização.

Publicado como primeiro comentário. Aprovação humana antes de seguir.

**Formato do PDI — Camada 2: Narrativa (independente)**

Qual arco este capítulo conta (tema social BR/RJ — ver issue #46)?
- **Abertura** (01-narrativa): o que apresenta — sistema, território, evento, pergunta
- **Desenvolvimento**: beats narrativos ao longo dos tópicos
- **Fechamento** (N+2-reflexao): dissonância final, pergunta sem resposta
- **Tipo(s) de crítica**: que variedade este capítulo traz (territorial, social, ambiental, política, econômica, filosófica)

A narrativa é planejada **sem referência à matemática**. É uma narrativa com coerência própria.

Publicado como segundo comentário. Aprovação humana antes de seguir.

**Formato do PDI — Camada 3: Integração**

Onde Camada 1 e Camada 2 se encontram — dois mecanismos:

- **Inserts no V1 (obrigatório):** todo tópico de conteúdo (02–NN) recebe insert no V1. Se não houver conexão natural, usar analogia, contraste ou ironia. Inserts são 1-2 frases, parágrafo final, tom seco.
- **Fragmentos junto a exemplos (dinâmico):** exemplos podem usar painel duplo: esquerda = matemática, direita = fragmento narrativo. O fragmento NÃO precisa ter relação lógica com o exemplo — justaposição emocional é válida. 1 ou mais exemplos por seção recebem fragmento. Fragmentos distribuem beats que não couberam nos inserts.

**Regras gerais:**
- A história flui coerentemente APESAR da matemática
- Tipos variados (justaposição, ironia, pergunta aberta, fato impactante, contraste)
- Inserts e fragmentos não repetem os mesmos fatos — cada beat é único
- Todo dado numérico com fonte verificável (IBGE, IPEA, ONU, dados oficiais)

Publicado como terceiro comentário. Aprovação humana antes de seguir.

**Formato do PDI — Camada 4: PDI Final (slide a slide)**

Para cada slide de cada seção:
- Conteúdo matemático (se houver) — texto, fórmulas, classes CSS
- Conteúdo narrativo (se houver) — textos prontos para implementação
- Layout (painel duplo, canvas, etc.)
- Marcação: NOVO / REESCREVER / MANTER
- Para exemplos com fragmento: indicar tipo de fragmento e texto

Publicado como quarto comentário. Aprovação humana antes de implementar.

**Variedade de críticas por capítulo:** para evitar repetição ao longo do curso, cada capítulo traz tipo(s) diferente(s) de crítica. O mapeamento é definido na issue #46. Tipos possíveis: territorial, social (periferia/raça), social (gênero), econômica, infraestrutura, ambiental, política, filosófica. Nenhum tipo deve aparecer em mais de 2-3 capítulos.

### Agente 3 — Implementador

**Propósito:** Executar o PDI final (Camada 4 aprovada). Seguir o PDI na ordem definida.

**Entrada:** PDI final (Camada 4) + aprovação do professor no issue

**Processo:**
1. Ler o PDI nos comentários do issue
2. Ler `slide-decks/AGENTS.md`, `slide-decks/prompt.md` e `template-spec.md`
3. Seguir o PDI na ordem definida
4. Após cada arquivo: executar verificações obrigatórias (grep)
5. Após todos os arquivos: subir servidor e verificar visualmente (screenshot)
6. Se correto, oferecer URL + screenshot ao usuário

**Como invocar:**

> Execute o Agente Implementador no issue #N.
>
> Leia o PDI nos comentários da issue (`gh issue view N --comments`).
> Leia `slide-decks/AGENTS.md` e `slide-decks/prompt.md`.
> Siga o PDI na ordem definida.
> Após cada arquivo, execute as verificações obrigatórias:
> - `grep -n 'style=' slide-decks/capitulo-N/*.html` (zero inline styles)
> - `grep -n '\\\\(' slide-decks/capitulo-N/*.html | grep -v script` (zero LaTeX quebrado)
> Suba servidor web e tire screenshot dos slides alterados.

### Agente 4 — Verificador

**Propósito:** Conferir se a implementação seguiu o PDI aprovado, os specs e o checklist por seção.

**Entrada:** Implementação + PDI final aprovado

**Processo:**
1. Ler o PDI nos comentários do issue
2. Verificar cada seção contra `section-checklist.md`
3. Executar as verificações técnicas (grep style=, LaTeX, notação, escopo)
4. Gerar relatório de verificação como comentário no issue

**Saída (relatório de verificação):**

| Verificação | Critério |
| --- | --- |
| Estrutura | Segue `template-spec.md`? (capa, narrativa, tópicos, resumo, reflexão) |
| Fluxo pedagógico | Cada seção segue V1→V2→V3→... conforme template-spec? |
| Exemplos | Cada seção tem 1-3 exemplos clássicos (sem solução — a decidir na issue #45)? |
| Fragmentos | Exemplos com fragmento usam painel duplo? Fragmento gera emoção? Dado tem fonte? |
| Navegação | H = seções, V = aprofundamento? |
| CSS | Zero inline? Classes corretas? |
| MathJax | `\(` e `\[` sem barra dupla? |
| Inserts | Todo tópico (02–NN) tem insert no V1? |
| Narrativa | Arco coerente? Variedade de inserts e fragmentos? Sem repetição de fatos? |
| Coerência | Alinha com exercícios revisados? |
| narrative-spec | Segue pelo menos 1 diretriz? |
| pedagogical-spec | Dissonância sem resolução? |
| Variedade | Tipo de crítica diferente de capítulos adjacentes? |
| Fontes | Nenhum dado inventado — números com fonte verificável? |
| Partidarismo | Nenhuma crítica partidária? |

Ver também `section-checklist.md` para checklist completo por seção.

---

## 6. Convenções de LaTeX nos Slides

### Delimitadores

No arquivo HTML, os delimitadores MathJax usam **uma barra**:

```
CORRETO:  \( fórmula \)       inline
CORRETO:  \[ fórmula \]       display
ERRADO:   \\( fórmula \\)     barra dupla quebra MathJax
ERRADO:   \\[ fórmula \\]     barra dupla quebra MathJax
```

### Exceções (barra dupla é correto)

1. **Config do MathJax** dentro de `<script>` — JavaScript requer `\\`:
   ```javascript
   inlineMath: [['\\(', '\\)']],
   displayMath: [['\\[', '\\]']],
   ```
2. **Separadores de linha em matrizes** — LaTeX `\\` dentro de `bmatrix`:
   ```html
   \begin{bmatrix} 3 & 1 \\ 4 & 2 \end{bmatrix}
   ```

### Comandos sed para correção

```bash
# Corrige barras duplas em LaTeX, preservando config do MathJax e bmatrix
sed -i '/inlineMath\|displayMath/!{s/\\\\(/\\(/g; s/\\\\)/\\)/g; s/\\\\\[/\\[/g; s/\\\\\]/\\]/g; s/\\\\\([a-zA-Z]\)/\\\1/g}' arquivo.html
```

**NUNCA use `write_file` ou ferramenta similar para corrigir backslashes** — a ferramenta pode duplicá-los. Use `sed` sempre.

---

## 7. Verificação Visual Obrigatória

Após fazer qualquer alteração em arquivos HTML/CSS de slides, você DEVE verificar visualmente.

> ⚠️ **IMPORTANTE — Capacidade de Visão do Modelo:** Nem todos os modelos de LLM conseguem analisar imagens. Antes de prosseguir, teste sua capacidade tentando ler uma imagem qualquer. Se receber um erro como "Cannot read image (this model does not support image input)", siga o protocolo para modelos sem visão abaixo.

### 7.1 Protocolo para Modelos SEM Visão

Se você não consegue ver imagens, siga este protocolo rigorosamente:

1. **AVISE explicitamente o professor:**
   > ⚠️ **Modelo sem capacidade de visão — verificação visual não realizada.** Screenshots foram capturados e salvos em `/tmp/` para validação manual.

2. **Tire os screenshots mesmo assim** (via Playwright/Firefox local, veja §7.3) e salve em `/tmp/` com nomes descritivos (ex: `/tmp/cap-v-parabola-canvas.png`).

3. **Informe os caminhos dos arquivos** ao professor para que ele possa abrir e verificar manualmente.

4. **Faça verificação indireta via código:**
   - Verifique se os elementos esperados existem no DOM (canvas, containers, etc.)
   - Verifique se os scripts de inicialização executam sem erro (console do browser)
   - Verifique se MathJax foi processado (presença de elementos `.mjx-chtml` ou similar no DOM)
   - Use `page.evaluate()` para extrair estado do canvas ou verificar propriedades computadas

5. **NUNCA finja que viu a imagem.** Descreva apenas o que pode inferir do código HTML/CSS lido, e deixe claro que é inferência, não observação visual.

### 7.2 Protocolo para Modelos COM Visão

Se você consegue ver imagens, siga o workflow padrão:

```
Fazer alteração no código
         ↓
Subir servidor: python3 -m http.server 8080 (em slide-decks/)
         ↓
Navegar até o slide: http://localhost:8080/capitulo-N.html#/secao
         ↓
CAPTURAR SCREENSHOT
         ↓
ANALISAR: elementos corretos? fórmulas renderizam? layout OK?
         ↓
   ├─ Sim → Oferecer URL + screenshot ao usuário
   └─ Não → Corrigir → Repetir
```

### 7.3 Casos que exigem verificação visual

- [ ] Centralização de elementos (canvas, textos, listas)
- [ ] Alinhamento de listas
- [ ] Renderização de fórmulas MathJax
- [ ] Espaçamento entre elementos
- [ ] Tamanho e escala de elementos visuais
- [ ] Quebra de linha em textos longos
- [ ] Canvas interativos (testar controles)

### 7.4 Ferramenta Recomendada: Playwright Local

Para tirar screenshots localmente (independente do CamoFox, que roda em outra máquina):

```bash
# Instalar (só uma vez)
npm install @playwright/test
npx playwright install firefox

# Tirar screenshot de um slide
npx playwright screenshot --browser=firefox --wait-for-timeout=8000 \
  --viewport-size=1280,720 \
  "http://localhost:8080/capitulo-N.html" \
  /tmp/cap-N-slide.png

# Script para múltiplos slides (navegar com ArrowDown/ArrowRight)
NODE_PATH=./node_modules node script.js
```

Exemplo de script para navegar entre slides:
```javascript
const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('http://localhost:8080/capitulo-N.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  // Navegar com teclas
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/cap-N-slide.png' });
  await browser.close();
})();
```

### 7.5 Dicas

- **Cache**: O navegador pode cachear CSS. Use `?v=2` ou reinicie o servidor.
- **Reveal.js**: Slides aninhados usam formato `#/slide/secao` na URL.
- **Resolução**: Padrão do Reveal.js é 1366×768.
- **MathJax**: Fórmulas podem demorar a renderizar — aguarde antes do screenshot.

---

## 8. Checklist antes de Commit

- [ ] **Nenhum inline style**: `grep -r 'style=' slide-decks/capitulo-N/*.html` retorna vazio
- [ ] **LaTeX correto**: `grep -n '\\\\(' slide-decks/capitulo-N/*.html | grep -v script` retorna vazio
- [ ] **Notação**: Pontos maiúsculos, `\vec{}`, vírgula decimal
- [ ] **Escopo**: Nenhum conceito de capítulo posterior
- [ ] **Inserts**: Todo tópico (02–NN) tem insert narrativo no V1 (se aplicável ao capítulo)
- [ ] **Fontes**: Nenhum dado inventado — números com fonte verificável (IBGE, IPEA, ONU)
- [ ] **Sem partidarismo**: Crítica sistêmica, sem nomes de políticos/campanhas
- [ ] **Verificação visual**: Screenshot tirado e analisado (ou ⚠️ aviso de modelo sem visão enviado ao professor com caminhos dos arquivos)
- [ ] **URL fornecida ao usuário** para validação
- [ ] **Sem regressões**: Slides adjacentes não quebraram

---

## 9. Referência Rápida

### Arquivos de referência

| Arquivo | Conteúdo |
|---------|----------|
| `slide-decks/AGENTS.md` | Este arquivo — regras, pipeline, verificações |
| `slide-decks/prompt.md` | Classes CSS disponíveis, estrutura de slides, exemplos |
| `slide-decks/template-spec.md` | Template canônico, fluxo pedagógico V1→V7, limites (issue #45) |
| `slide-decks/narrative-spec.md` | Narrativa crítica (inserts V1, fragmentos, temas BR/RJ — issue #46) |
| `slide-decks/pedagogical-spec.md` | Abordagem pedagógica (dissonância cognitiva) |
| `slide-decks/visual-design-spec.md` | Princípios de design visual (hierarquia, enquadramento, opacidade) |
| `slide-decks/section-checklist.md` | Checklist por seção (implementador/verificador) |
| `slide-decks/styles.css` | Estilos — NÃO criar novos, usar apenas estes |
| `slide-decks/template.html` | Template base para novos slides |
| `exercicios/capitulo-N/` | Exercícios do capítulo N — referência para coerência |
| `AGENTS.md` (raiz) | Regras gerais do repositório, notação, paleta de cores |
| `ESTILO.md` | Guia completo de notação matemática |

### Issues de referência

- **#45** — Definir template canônico dos slides (decisões de estrutura/classes pendentes)
- **#46** — Definir arco narrativo do curso (tema social BR/RJ, críticas por capítulo)
- **#18** — Pipeline completo aplicado no Capítulo I (modelo de referência)

### Exemplo de referência (pipeline completo aplicado)

O Capítulo I é o modelo de referência para todo o pipeline. Para ver como ficou na prática:

- **RTC (diagnóstico):** `gh issue view 18 --comments` — primeiro comentário
- **Aprovação do professor:** segundo comentário
- **Planejamento fino detalhado:** terceiro comentário
- **Arquivos implementados:** `slide-decks/capitulo-i/`

### Classes CSS principais

| Classe | Uso |
|--------|-----|
| `mission-briefing` | Definição formal, introdução de conceito |
| `field-report` | Contextualização, aplicações, nível básico/intermediário |
| `simulator` | Visualização interativa com canvas |
| `survival-training` | Exercícios práticos |
| `debriefing` | Síntese, fechamento, conexão com próximo tópico |
| `level-basic` | Nível básico (com `field-report`) |
| `level-intermediate` | Nível intermediário |
| `level-advanced` | Nível avançado |
| `definition-box` | Caixa de definição formal |
| `formula` | Destaque de fórmula |
| `survival-tip` | Dica contextual |
| `mnemonic` | Mnemônico temático |
| `canvas-container` | Container para canvas |
| `info-panel` / `info-screen` | Painel de informações |
| `training-problem` | Problema prático |
| `problem-context` | Contexto de problema |
| `summary-box` | Caixa de resumo |
| `next-mission` | Conexão com próximo tópico |
| `narrative-text` | Texto narrativo temático |
| `concept-definition` | Definição de conceito (nos slides existentes) |

### Níveis de complexidade

Combine `field-report` com níveis:
```html
<section class="field-report level-basic">...</section>
<section class="field-report level-intermediate">...</section>
<section class="field-report level-advanced">...</section>
```

---

## 10. Status Atual (retomada)

> **Última atualização:** 2026-08-07 — issues #45 (template canônico) e #46 (arco narrativo) criadas e aguardando decisões do professor. **Resolver as issues ANTES de rodar o próximo pipeline.**

- **#45** — Definir template canônico dos slides: 5 decisões pendentes (formato de fragmento, soluções nos exemplos, nomenclatura, loader, paleta) — ver comentário de status na issue
- **#46** — Definir arco narrativo do curso (temas BR/RJ): tese e mapeamento por capítulo aguardando aprovação; decidir sub-issues por capítulo vs. PDI Camada 2
- Specs (`template-spec.md`, `narrative-spec.md`, `pedagogical-spec.md`, `visual-design-spec.md`, `section-checklist.md`) criados no commit `8b593b8` e aguardando as decisões das issues para serem consolidados
- Próximos passos após as issues: atualizar specs + `styles.css` com as decisões → escolher capítulo piloto → rodar pipeline completo (RTC → PDI 4 camadas → implementação → verificação)