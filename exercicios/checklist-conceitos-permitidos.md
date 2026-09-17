# Checklist de Conceitos e Progressão por Capítulo

Use este checklist ao criar exercícios. Ele define:
1. **O que PODE e NÃO PODE usar** (conceitos permitidos por capítulo)
2. **Como deve ser a progressão narrativa** (sequência pedagógica obrigatória)

Antes de gerar qualquer exercício, leia também `diretrizes-listas-de-exercicios.md`
para entender os 8 princípios de design de listas.

**MathJax:** Use `$...$` para inline e `$$...$$` para bloco. Verifique não ter barra dupla quebrada após escrever cada arquivo.

---

## Cap 0 — Preparação para a Wasteland

### Álgebra

**Permitido:**

- Propriedades distributiva, comutativa, associativa
- Produtos notáveis: $(a+b)^2$, $(a-b)^2$, $(a+b)(a-b)$
- Potências e raízes
- Fatoração simples
- Equações lineares e sistemas 2x2

**NÃO usar:** equações de segundo grau com contexto de cônicas, sistemas 3x3 (Cap VI)

**Progressão sugerida:**

```
OPERAÇÕES BÁSICAS → PRODUTOS NOTÁVEIS → FATORAÇÃO
  ↓
EQUAÇÕES LINEARES → SISTEMAS 2x2
  ↓
APLICAÇÕES PRÁTICAS (proporções, cálculos de recursos)
```

---

### Frações

**Permitido:**

- Operações com frações (soma, subtração, multiplicação, divisão)
- Proporções e regra de três
- Conversões entre frações, decimais e porcentagens

**Progressão sugerida:**

```
OPERAÇÕES BÁSICAS → SIMPLIFICAÇÃO
  ↓
PROPORÇÕES → REGRA DE TRÊS
  ↓
APLICAÇÕES (diluição, misturas, distribuição de recursos)
```

---

### Sistemas de Equações Lineares

**Permitido:**

- Sistemas 2x2 (substituição, eliminação, gráfico)
- Interpretação geométrica (interseção de retas)
- Sistemas sem solução ou com infinitas soluções

**NÃO usar:** sistemas 3x3 (Cap VI), determinantes como ferramenta (Cap VI)

**Progressão sugerida:**

```
REVISÃO DE EQUAÇÕES LINEARES
  ↓
SISTEMA 2x2 POR SUBSTITUIÇÃO → POR ELIMINAÇÃO
  ↓
INTERPRETAÇÃO GEOMÉTRICA (duas retas se cruzam, são paralelas, coincidem)
  ↓
APLICAÇÕES (misturas, movimento, produção)
```

---

### Trigonometria

**Permitido:**

- Razões trigonométricas no triângulo retângulo (seno, cosseno, tangente)
- Ângulos notáveis (30°, 45°, 60°)
- Relações fundamentais: $\sin^2\theta + \cos^2\theta = 1$
- Lei dos Senos e Lei dos Cossenos
- Radianos (conversão básica)

**NÃO usar:** identidades trigonométricas avançadas, equações trigonométricas gerais

**Progressão sugerida:**

```
TRIÂNGULO RETÂNGULO → SEN, COS, TAN
  ↓
ÂNGULOS NOTÁVEIS → CÁLCULOS DIRETOS
  ↓
LEI DOS SENOS → LEI DOS COSSENOS (triângulos quaisquer)
  ↓
APLICAÇÕES (altura, distância, ângulo de elevação/depressão)
```

---

### Revisão

**Permitido:** todos os conceitos dos tópicos anteriores de Cap 0.

**Objetivo:** exercícios que combinem álgebra, frações, sistemas e trigonometria em problemas integrados.

---

## Cap I — O Espaço Vetorial R²

**Permitido:** tudo do Cap 0 +

- Pares ordenados como pontos no plano
- Quadrantes do plano cartesiano
- Igualdade de pares ordenados
- Operações com pares ordenados (soma, subtração, multiplicação por escalar)
- Vetores no plano: representação, componentes
- Operações vetoriais: soma, subtração, escalar
- Ponto médio
- Baricentro de um triângulo

**NÃO usar:** produto escalar (Cap II), módulo/norma (Cap II), distância entre pontos (Cap II)

**Progressão sugerida:**

```
PARES ORDENADOS → PONTOS NO PLANO → QUADRANTES
  ↓
IGUALDADE → OPERAÇÕES COM PARES ORDENADOS
  ↓
VETORES (diferença entre ponto e vetor) → OPERAÇÕES VETORIAIS
  ↓
PONTO MÉDIO → BARICENTRO
```

Cada exercício deve explicitar sua conexão com o anterior.
Ex: "Agora que sabemos operar com vetores, vamos encontrar o ponto equidistantes entre dois abrigos."

---

## Cap II — Produto Interno no R²

**Permitido:** tudo do Cap 0-I +

- Produto escalar de dois vetores (definição algébrica e propriedades)
- Módulo (norma) de um vetor
- Distância entre dois pontos
- Ângulo entre dois vetores (via produto escalar)
- Paralelismo e ortogonalidade
- Área de triângulo (produto vetorial em R²)
- Alinhamento de três pontos

**NÃO usar:** equações de reta (Cap III), equações de circunferência (Cap IV)

**Progressão sugerida:**

```
PRODUTO ESCALAR (definição, propriedades: comutativa, distributiva, associativa escalar)
  ↓
MÓDULO DO VETOR → DISTÂNCIA ENTRE DOIS PONTOS
  ↓
ÂNGULO ENTRE VETORES ($\cos\theta = \frac{\vec{u}\cdot\vec{v}}{|\vec{u}||\vec{v}|}$)
  ↓
PARALELISMO ($\vec{u} = k\vec{v}$) → ORTOGONALIDADE ($\vec{u}\cdot\vec{v} = 0$)
  ↓
ÁREA DE TRIÂNGULO → ALINHAMENTO DE TRÊS PONTOS
```

**Não começar com:** "calcule o produto escalar de dois vetores dados". Começar pelo significado: "como saber se dois deslocamentos são perpendiculares?"

---

## Cap III — Estudo da Reta no R²

**Permitido:** tudo do Cap 0-II +

- Equação geral da reta: $ax + by + c = 0$
- Equação reduzida: $y = mx + n$
- Equação paramétrica
- Equação segmentária (dois interceptos)
- Coeficiente angular (inclinação)
- Posições relativas de duas retas (paralelas, concorrentes, coincidentes)
- Interseção de retas
- Perpendicularidade de retas ($m_1 \cdot m_2 = -1$)
- Distância de um ponto a uma reta
- Inequações lineares e semiplanos

**NÃO usar:** equações de circunferência (Cap IV), cônicas (Cap V)

**Progressão sugerida:**

```
EQUAÇÃO DA RETA (por que precisamos de mais que dois pontos?)
  ↓
DIFERENTES FORMAS: geral → reduzida → paramétrica → segmentária
  ↓
COEFICIENTE ANGULAR → INCLINAÇÃO → CONVERSÕES
  ↓
POSIÇÕES RELATIVAS: paralelas/concorrentes/coincidentes → INTERSEÇÃO
  ↓
PERPENDICULARIDADE
  ↓
DISTÂNCIA PONTO-RETA → INEQUAÇÕES → SEMIPLANOS
```

**Não começar com:** "dada a equação geral, encontre o coeficiente angular". Começar pela interpretação geométrica: "dois pontos definem uma reta — como escrever sua equação?"

---

## Cap IV — A Circunferência no R²

**Permitido:** tudo do Cap 0-III +

- Equação da circunferência: $(x-a)^2 + (y-b)^2 = r^2$
- Forma geral: $x^2 + y^2 + Dx + Ey + F = 0$
- Circunferência por três pontos (sistema de equações)
- Posições relativas reta-circunferência (externa, tangente, secante)
- Posições de pontos em relação à circunferência (dentro, sobre, fora)
- Coordenadas polares (conceitual, $r$ e $\theta$)
- Equação paramétrica da circunferência

**NÃO usar:** cônicas (Cap V — elipse, parábola, hipérbole são generalizações)

**Progressão sugerida:**

```
EQUAÇÃO POR DEFINIÇÃO (pontos equidistantes de um centro)
  ↓
FORMA CANÔNICA → FORMA GERAL → COMPLETAR QUADRADOS
  ↓
CIRCUNFERÊNCIA POR TRÊS PONTOS (sistema 3x3 simplificado)
  ↓
POSIÇÕES RELATIVAS: reta e circunferência (distância centro-reta vs raio)
  ↓
PONTOS: dentro, sobre, fora da circunferência
  ↓
COORDENADAS POLARES (conceitual) → EQUAÇÃO PARAMÉTRICA
```

**Não começar com:** "dada a equação geral, encontre centro e raio". Começar pela definição de lugar geométrico.

---

## Cap V — Lugares Geométricos: As Cônicas

**Permitido:** tudo do Cap 0-IV +

- Lugar geométrico (definição e exemplos)
- Mediatriz, bissetriz
- Parábola: definição (PF = PD), equação canônica, vértice, foco, diretriz, eixo de simetria
- Elipse: definição (PF₁ + PF₂ = 2a), equação canônica, focos, vértices, semieixos, excentricidade
- Hipérbole: definição (|PF₁ - PF₂| = 2a), equação canônica, focos, vértices, assíntotas, excentricidade
- Formas canônicas translacionadas (completar quadrados)
- Classificação de cônicas por discriminante ($B^2 - 4AC$)

**NÃO usar:** coordenadas polares focais de cônicas (fora do escopo do curso)

**Progressão sugerida (obrigatório seguir):**

```
LUGAR GEOMÉTRICO (conceito geral: mediatriz, bissetriz, circunferência revisitada)
  ↓
PARÁBOLA: construir pela definição PF=PD → equação canônica → elementos
  ↓
ELIPSE: construir pela definição PF₁+PF₂=2a → equação canônica → elementos
  ↓
HIPÉRBOLE: construir pela definição |PF₁-PF₂|=2a → equação canônica → assíntotas
  ↓
CLASSIFICAÇÃO POR DISCRIMINANTE ($B^2 - 4AC$)
  ↓
FORMAS TRANSLACIONADAS (completar quadrados, centro fora da origem)
```

**NÃO começar com:** "dada a equação, encontre foco e diretriz". Começar pela **construção/definição** — guiar o aluno a deduzir a equação a partir da propriedade geométrica.

---

## Cap VI — O R³ e a Geometria Analítica no Espaço

**Permitido:** tudo do Cap 0-V +

- Pontos e vetores em R³
- Operações vetoriais em R³
- Produto interno no R³ (ângulo, ortogonalidade)
- Produto vetorial ($\vec{u} \times \vec{v}$): definição, propriedades, área
- Produto misto ($[\vec{u}, \vec{v}, \vec{w}]$): volume
- Equação do plano (geral, com ponto e normal, por três pontos)
- Equações da reta no espaço (vetorial, paramétrica, simétrica)
- Posições relativas (plano-plano, reta-plano, reta-reta)
- Sistemas de equações lineares a três incógnitas
- Superfície esférica: $(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$

**Progressão sugerida:**

```
R³: PONTOS E VETORES → OPERAÇÕES → MÓDULO E DISTÂNCIA
  ↓
PRODUTO INTERNO NO R³ (extensão natural do R²)
  ↓
PRODUTO VETORIAL (vetor perpendicular, área) → PRODUTO MISTO (volume, coplanaridade)
  ↓
ÁREAS (triângulo via vetorial) → VOLUMES (paralelepípedo via misto)
  ↓
EQUAÇÃO DO PLANO (vetor normal, três pontos) → POSIÇÕES RELATIVAS DE PLANOS
  ↓
EQUAÇÕES DA RETA NO ESPAÇO → POSIÇÕES RELATIVAS (reta-plano, reta-reta)
  ↓
SISTEMAS 3x3 (motivados por interseções no espaço)
  ↓
SUPERFÍCIE ESFÉRICA
```

---

## Referência Rápida: O que NÃO usar por capítulo

| Capítulo | Proibido |
|----------|----------|
| 0 | Conceitos vetoriais, produto escalar, reta, circunferência, cônicas, R³ |
| I | Produto escalar, módulo, distância, ângulo, reta |
| II | Reta, circunferência, cônicas, R³ |
| III | Circunferência, cônicas, R³ |
| IV | Cônicas, R³ |
| V | R³ (vetorial, produto misto, plano, esfera) |
| VI | Cálculo diferencial e integral |
