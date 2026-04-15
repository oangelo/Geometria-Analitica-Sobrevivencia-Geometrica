# Diretrizes para Listas de Exercícios

## Princípios Gerais

### 1. Listas como narrativa
A sequência de exercícios deve contar uma história com progressão lógica. Nada de itens aleatórios ou "sorteados de um banco". Cada exercício prepara o terreno para o seguinte.

### 2. Transparência na progressão (estilo Netflix)
Cada exercício deve explicitar por que está ali e qual é sua conexão com os anteriores. Exemplo: *"No exercício anterior você encontrou o produto escalar de dois vetores. Agora vamos ver como esse resultado revela se dois deslocamentos são perpendiculares."* O aluno enxerga o fio condutor.

### 3. Construir sobre o já sabido
Quando fizer sentido, a lista deve retomar conceitos de tópicos já estudados e mostrar como o novo assunto nasce deles ou os generaliza. O aluno não começa do zero a cada lista — ele reconhece ferramentas que já usou e vê o novo conceito como uma extensão natural. Exemplos: pedir para calcular o baricentro usando ponto médio (retomando Cap I); usar o produto escalar para verificar perpendicularidade de retas (conectando Cap II e III). A lista não é uma ilha — ela é um elo na corrente.

### 4. Scaffolding com subitens
Exercícios complexos que exigem vários passos devem ser quebrados em itens (a, b, c...) que guiem o aluno na decomposição do problema. O objetivo é ensinar a habilidade de quebrar problemas grandes em partes menores.

**Formato:** Sem `<ul><li>` (gera bullet points). Usar `<p><strong>(a)</strong> texto...</p>`:
```html
<p><strong>(a)</strong> Primeira parte...</p>
<p><strong>(b)</strong> Segunda parte...</p>
```

### 5. Significado antes da álgebra
Sempre começar pelo conceito e pela interpretação (geométrica, física, visual) antes de entrar nas manipulações algébricas. Exercícios puramente algébricos são importantes, mas não podem ser o único tipo. O aluno precisa entender *por que* o produto escalar mede projeção antes de decorar a fórmula.

### 6. Notação como conteúdo
Trabalhar explicitamente a notação em exercícios dedicados. Alunos se perdem em símbolos ($\vec{v}$ vs. $\overrightarrow{AB}$, coordenadas de ponto vs. componente de vetor), e isso raramente é tratado como conteúdo. Dedicar exercícios para: converter entre notações, interpretar o que cada símbolo significa, praticar a escrita correta.

### 7. Desenhar e esquematizar
Os exercícios devem pedir que o aluno faça esboços e diagramas, conectando equações com geometria. "Esboce o triângulo e localize o baricentro" é tão importante quanto calcular suas coordenadas. A matemática analítica nasceu da geometria — os exercícios devem manter essa conexão viva.

### 8. Autonomia sobre decoreba
O objetivo é que, com as definições básicas, o aluno consiga derivar resultados sozinho, sem depender de fórmulas memorizadas. Em vez de "aplique a fórmula da distância", prefira "use a definição de produto escalar para encontrar a distância". A fórmula é consequência, não ponto de partida.

### 9. Narrativa por exercício (OBRIGATÓRIO)
Cada exercício deve começar com um **parágrafo narrativo** que conecta o exercício ao anterior e explica a história da matemática. Este parágrafo vem ANTES do enunciado e responde três perguntas:

- **POR QUE** este exercício existe? (motivação matemática ou científica)
- **O QUE** mudou em relação ao anterior? (o incremento de dificuldade ou conceito)
- **COMO** se conecta ao que já sabemos? (a ponte com exercícios anteriores)

O aluno nunca deve se perguntar "por que estou fazendo isso?". A narrativa torna explícito o fio condutor.

**Formato:** Um `<p>` antes do enunciado, em *itálico*:

```html
<p><em>Em engenharia e ciência, é comum conhecermos algumas grandezas e
desconhecermos outras. Quando traduzimos essa situação para equações,
o princípio fundamental é: mesma operação dos dois lados mantém a
relação válida. Vamos praticar com a equação mais simples possível.</em></p>

<p>Resolva a equação $x + 3 = 7$.</p>
```

**Regras:**
- Referenciar o exercício anterior pelo **conceito**, nunca pelo número
- A narrativa conta a "história da matemática" — como o conceito nasce de uma necessidade
- Cada parágrafo deve deixar claro qual é o **incremento** em relação ao exercício anterior

---

## Progressão Pedagógica — Padrão Geral

A progressão de cada tópico deve seguir este padrão de 4 fases. O agente deve gerar a progressão pedagógica específica para cada tópico, seguindo os exemplos da seção "Exemplos de Progressão Pedagógica".

```
FASE 1: CASO MAIS SIMPLES com números
  O aluno aprende o "movimento" mecânico com números concretos.
  Não há incógnitas — o foco é entender o padrão.

FASE 2: NOVA FERRAMENTA isolada
  Cada passo adiciona UMA complicação.
  Uma nova propriedade ou técnica é introduzida sozinha.

FASE 3: COMBINAR com incógnitas
  Juntar ferramentas aprendidas, agora com variáveis.
  O aluno reconhece padrões e aplica múltiplas técnicas.

FASE 4: APLICAR em contexto
  O aluno precisa montar o problema, não só resolver.
  Traduzir uma situação real em equação e resolver.
```

**Regra:** O aluno nunca deve ver uma fórmula sem entender de onde ela vem. Cada conceito é construído, não imposto.

---

## Exemplos de Progressão Pedagógica

Os exemplos abaixo mostram como aplicar os princípios acima. Use-os como modelo ao gerar progressões para outros tópicos.

### Exemplo 1: Álgebra

#### Fase 1 — Isolamento de x (equação linear pura)

**Q1** — $x + 3 = 7$
> *Em engenharia e ciência, é comum conhecermos algumas grandezas e descrevermos outras. Quando traduzimos essa situação para a linguagem matemática, caímos numa equação. O princípio fundamental é este: se fizermos a mesma operação dos dois lados da equação, a relação entre as grandezas continua válida — e podemos isolar a quantidade desconhecida. Vamos praticar com a equação mais simples possível.*

**Q2** — $2x = 10$
> *No exercício anterior, a incógnita estava somada a um número. Agora a incógnita está multiplicada por um número. O princípio é o mesmo — mesma operação dos dois lados — mas a operação inversa agora é a divisão. Note como o raciocínio não mudou, apenas a ferramenta.*

**Q3** — $2x + 3 = 11$
> *Situações reais raramente são tão simples. Aqui temos duas operações envolvendo x: ele é multiplicado por 2 E somado a 3. Para isolar x, precisamos desfazer essas operações na ordem inversa — primeiro a soma, depois a multiplicação. Este é o início de um método que funcionará para equações cada vez mais complexas.*

**Q4** — $\frac{x}{4} + 2 = 5$
> *Agora x aparece no denominador de uma fração. O princípio é o mesmo — mesma operação dos dois lados — mas o aluno precisa reconhecer que dividir por 4 é o mesmo que multiplicar por $\frac{1}{4}$, e que a operação inversa é multiplicar por 4. A fração não muda o raciocínio, apenas disfarça a operação.*

#### Fase 2 — Propriedades algébricas

**Q5** — Expandir $(3 + 4)^2$ e comparar com $3^2 + 2 \cdot 3 \cdot 4 + 4^2$
> *Até agora, resolvíamos equações isolando x. Mas e quando a incógnita aparece elevada ao quadrado? Precisamos de uma nova ferramenta: os produtos notáveis. Antes de usá-los com incógnitas, vamos entender o que acontece quando multiplicamos $(a + b)$ por ele mesmo, usando números concretos. O aluno deve verificar que $(a+b)^2 \neq a^2 + b^2$ — o termo $2ab$ que aparece é geometricamente a área de dois retângulos que ficam "de fora".*

**Q6** — Expandir $(5 + 2)(5 - 2)$ e descobrir o padrão
> *No exercício anterior, vimos que $(a+b)^2$ gera três termos. Agora vamos multiplicar $(a+b)$ por $(a-b)$. O resultado surpreende: os termos intermediários se cancelam, e sobra apenas $a^2 - b^2$. Este padrão — a diferença de quadrados — aparecerá com frequência e nos permitirá fatorar expressões que pareciam complicadas.*

**Q7** — Calcular $2^3 \cdot 2^4$ e descobrir a regra $a^m \cdot a^n = a^{m+n}$
> *Potências representam multiplicações repetidas. $2^3$ é $2 \cdot 2 \cdot 2$, e $2^4$ é $2 \cdot 2 \cdot 2 \cdot 2$. Quando multiplicamos, estamos juntando as multiplicações — o total de fatores é a soma dos expoentes. O mesmo raciocínio vale para a divisão: $a^m \div a^n = a^{m-n}$. Não são regras decoradas — são consequências diretas do significado de potência.*

#### Fase 3 — Combinar ferramentas com incógnitas

**Q8** — Expandir $(x + 3)^2$ e depois resolver $(x + 3)^2 = 25$
> *Agora juntamos duas ferramentas: o produto notável do Q5 e o isolamento de x dos Q1-Q4. Primeiro expandimos $(x+3)^2$ usando o padrão que descobrimos. Depois, a equação resultante é resolvível com o método que já dominamos. A matemática avança combinando o que já sabemos.*

**Q9** — Simplificar $\frac{x^5}{x^2}$ e depois resolver $x^3 = 27$
> *A regra de potências do Q7 agora aparece com incógnitas. $\frac{x^5}{x^2} = x^3$ — reduzimos uma expressão complicada para algo simples. E quando temos $x^3 = 27$, o isolamento de x exige uma operação que ainda não usamos: a raiz cúbica. Cada novo tipo de equação nos ensina uma nova operação inversa.*

**Q10** — Resolver $(x + 1)^2 - (x - 1)^2 = 8$
> *Este exercício combina tudo: a diferença de quadrados do Q6 simplifica $(x+1)^2 - (x-1)^2$ para $4x$. O resultado é uma equação linear — que sabemos resolver desde o Q1. A matemática frequentemente nos surpreende: algo que parece complexo se reduz ao básico quando usamos as ferramentas certas.*

#### Fase 4 — Aplicação

**Q11-Q12** — Problemas onde o aluno precisa montar a equação a partir de uma situação
> *Nos exercícios anteriores, a equação era dada. Agora cabe a você traduzir uma situação real em equação — e depois resolvê-la com todas as ferramentas que construímos. Este é o passo final: o aluno não apenas resolve equações, mas as cria.*

---

### Exemplo 2: Frações e Proporções

#### Fase 1 — Frações com números

**Q1** — $\frac{2}{5} + \frac{1}{5}$
> *Uma fração representa uma divisão: $\frac{2}{5}$ são 2 partes de algo dividido em 5. Quando os denominadores são iguais, somar é trivial — somamos os numeradores e mantemos o denominador. O denominador comum nos diz que estamos falando das mesmas partes.*

**Q2** — $\frac{1}{3} + \frac{1}{4}$
> *Mas e quando as partes são de tamanhos diferentes? Não podemos simplesmente somar numeradores — seriam como somar terços com quartos. Precisamos converter ambos para "partes do mesmo tamanho". O mínimo múltiplo comum nos dá esse denominador comum. $\frac{1}{3} = \frac{4}{12}$ e $\frac{1}{4} = \frac{3}{12}$ — agora são partes comparáveis.*

**Q3** — $3 \times \frac{2}{7}$
> *Multiplicar uma fração por um inteiro é repetir a fração. $3 \times \frac{2}{7}$ são três grupos de $\frac{2}{7}$, ou seja, $\frac{6}{7}$. Em termos de grandezas: se cada membro do grupo consome $\frac{2}{7}$ de uma reserva, 3 membros consomem $\frac{6}{7}$.*

**Q4** — $\frac{3}{4} \div 2$
> *Dividir uma fração por um inteiro é reparti-la. $\frac{3}{4} \div 2$ significa: pegue $\frac{3}{4}$ e divida em 2 partes iguais. Cada parte é $\frac{3}{8}$. Note que dividir por 2 é o mesmo que multiplicar por $\frac{1}{2}$ — a operação inversa da multiplicação.*

**Q5** — $\frac{3}{4} \div \frac{2}{5}$
> *Dividir por uma fração não é intuitivo. $\frac{3}{4} \div \frac{2}{5}$ significa: quantas vezes $\frac{2}{5}$ cabe em $\frac{3}{4}$? A regra — inverter e multiplicar — vem do fato de que dividir por $\frac{2}{5}$ é o mesmo que multiplicar por $\frac{5}{2}$. Vamos verificar numericamente que faz sentido.*

**Q6** — $\frac{2}{3} \times \frac{4}{5} + \frac{1}{6}$
> *Agora combinamos: multiplicação de frações E soma com denominadores diferentes. A ordem das operações importa — primeiro multiplicação, depois soma. A fração resultante da multiplicação precisa ter seu denominador compatível com $\frac{1}{6}$ para somarmos.*

#### Fase 2 — Frações com incógnitas

**Q7** — $\frac{x}{3} + \frac{x}{4} = 7$
> *Até agora, as frações continham números. Agora a incógnita está no numerador. O raciocínio é o mesmo do Q2 — precisamos de um denominador comum — mas agora o denominador comum nos permite "limpar" as frações e transformar o problema numa equação linear que sabemos resolver.*

**Q8** — $\frac{2}{x} + \frac{3}{x} = 5$
> *Aqui a incógnita está no denominador. A situação é ainda mais simples que o Q7: os denominadores já são iguais (ambos são $x$), então somamos os numeradores como no Q1. Mas o passo seguinte — isolar x — exige multiplicar os dois lados por $x$, o que nos leva a uma equação linear.*

**Q9** — $\frac{1}{x+1} + \frac{1}{x-1} = \frac{2x}{x^2-1}$
> *Este exercício combina tudo que vimos: denominadores diferentes (Q2), incógnitas nas frações (Q7-Q8) e a identidade $x^2 - 1 = (x+1)(x-1)$ que reconhecemos da diferença de quadrados (Álgebra, Q6). A matemática é uma rede — conceitos de seções diferentes se conectam.*

#### Fase 3 — Proporções

**Q10** — $\frac{a}{b} = \frac{c}{d}$, descobrir a relação
> *Quando duas frações são iguais, dizemos que há uma proporção. "Para cada 3 unidades de a, temos 5 de b; para cada 6 unidades de c, temos 10 de d." A proporção $\frac{3}{5} = \frac{6}{10}$ expressa que as razões são as mesmas. Multiplicando em cruz: $3 \times 10 = 5 \times 6$. Esta não é uma regra decorada — é consequência direta de que as duas frações são iguais.*

**Q11** — Problema de contexto com proporção (diluição, escala, receita)
> *Na prática, proporções resolvem problemas de escala e diluição. Se 2 mL de RemoveRad precisam de 500 mL de água, quanto RemoveRad para 2 litros? O aluno monta a proporção, resolve usando o produto cruzado, e interpreta o resultado no contexto.*

#### Fase 4 — Porcentagens

**Q12** — Calcular 15% de 200
> *Porcentagem é uma fração com denominador 100 — literalmente "por cento". 15% significa $\frac{15}{100}$. Calcular 15% de 200 é simplesmente $\frac{15}{100} \times 200$. Não existe nada de novo aqui — é apenas uma fração disfarçada de linguagem cotidiana.*

**Q13** — Problema combinando porcentagem + fração + contexto
> *Nos exercícios anteriores, calculamos porcentagens isoladas. Agora vamos combiná-las com tudo que aprendemos: se 40% dos suprimentos são combustível, e $\frac{2}{3}$ do combustível é destinado à expedição, qual fração do total vai para a expedição? O aluno precisa converter, operar com frações e interpretar o resultado.*

---

## Fundamentação Teórica (manual)

A fundamentação teórica (arquivos `*-manual.html`) é uma **mini-aula passiva** — diferente dos exercícios ativos. O aluno lê para rever o panorama antes de resolver.

**Estrutura obrigatória do bloco `manual-contexto`:**

1. **CONTEXTUALIZAÇÃO** — 1-2 parágrafos motivando o tópico no cenário pós-apocalíptico. "Por que precisamos disso na Zona Devastada? Para onde leva?" O aluno vê o mapa antes dos detalhes.

2. **CONCEITOS PRINCIPAIS** — Cada conceito explicado com:
   - O que é e por que importa
   - Fórmula principal em `<div class="formula">` (bloco destacado)
   - Fórmulas secundárias inline `$...$` dentro do texto
   - Parâmetros explicados logo após a fórmula
   - Conexão para o próximo conceito ("com isso, podemos agora...")

3. **TÉCNICAS/MÉTODOS** — Lista das principais técnicas para resolver problemas deste tipo, contextualizadas como ferramentas de sobrevivência.

**Regras de formatação:**
- Texto corrido com `<p>` e `<strong>` para ênfase
- Fórmulas principais: `<div class="formula">$$...$$</div>`
- Fórmulas secundárias: inline `$...$` dentro de `<p>`
- CSS: usar apenas classes existentes do template (`.formula`, `.terminal-border`, etc.)

---

## Formato do Enunciado

O enunciado deve ser **texto corrido** — parágrafos `<p>` puros.

**Permitido:**
- Múltiplos `<p>` para separar parágrafos
- `<strong>` ou `<em>` para ênfase ocasional (destacar um dado, uma condição importante)

**NÃO incluir:**
- `<div>` wrapper dentro do exercício (nada de `.narrative`, `.mission-context`)
- `<ul><li>` — usar `<p><strong>(a)</strong>...</p>` para sub-itens
- `<strong>Solicitação:</strong>` ou labels extras antes dos sub-itens
- Qualquer tag estrutural além de `<p>`, `<strong>`, `<em>`

**Referências a outros exercícios:**
- Sempre pelo **conceito**, nunca pelo número/nome do exercício
- ✅ "No exercício anterior, você calculou o produto escalar..."
- ✅ "Agora que sabemos calcular ângulos entre vetores, vamos usar isso para..."
- ❌ "Na MISSÃO 3, você calculou..." — quebra se reordenar
- ❌ "Conforme feito no exercício 7..." — frágil

---

## Regra Crítica: MathJax no HTML

**Delimitadores (convenção GA):**
- Inline: `$fórmula$`
- Bloco: `$$fórmula$$` (dentro de `<div class="formula">`)
- Comandos LaTeX: `\frac`, `\partial`, `\vec`, `\left`, `\right`, etc.

**Verificação após cada arquivo:**
```bash
grep -c '\\\\' exercicios/capitulo-N/pasta/arquivo.html
```
Se encontrar barras duplas acidentais (que não sejam dentro de comandos LaTeX válidos), corrija antes de continuar.

**Nota:** Diferente do projeto de Cálculo Vetorial (que usa `\(...\)` / `\[...\]`), este projeto usa `$...$` / `$$...$$` com configuração MathJax explícita no template.

---

## Exemplos por Conteúdo

### Produto Escalar (Cap II)

A lista não deve começar com "calcule $\vec{u} \cdot \vec{v}$". A progressão deve ser:

1. **Significado do produto escalar** — o que o número resultante representa? Quando é positivo, negativo, zero?
2. **Propriedades** — comutatividade, distributividade, verificadas numericamente
3. **Módulo via produto escalar** — $|\vec{v}| = \sqrt{\vec{v} \cdot \vec{v}}$, conexão com o que o aluno já sabe (Teorema de Pitágoras)
4. **Ângulo entre vetores** — a fórmula $\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}||\vec{v}|}$ aparece naturalmente
5. **Perpendicularidade** — quando $\vec{u} \cdot \vec{v} = 0$
6. **Aplicações combinadas** — problemas que usam múltiplos conceitos

### Cônicas (Cap V)

A lista não deve começar dando a equação e pedindo parâmetros. A progressão deve ser:

1. **Lugar geométrico** — definir o conceito com exemplos simples (reta como lugar geométrico, circunferência revisitada como lugar dos pontos equidistantes).
2. **Parábola pela definição** — guiar o aluno a construir a equação da parábola a partir da definição (pontos equidistantes do foco e da diretriz), item por item.
3. **Elipse pela definição** — mesma abordagem: soma das distâncias constante, manipular algebricamente até chegar na equação canônica.
4. **Extrair informações da equação** — a partir da equação, fazer $y=0$, $x=0$, interpretar o que aparece. O aluno descobre os vértices e semieixos por raciocínio, não por fórmula decorada.
5. **Desenhar e esquematizar** — para cada cônica, o aluno deve fazer esboços e localizar os elementos no desenho.
6. **Hipérbole e casos gerais** — mesma filosofia, estendendo para as demais cônicas.

### Reta no R² (Cap III)

A lista não deve começar com "dada a equação geral, encontre o coeficiente angular". A progressão deve ser:

1. **Dois pontos → uma reta** — retomar a ideia de que dois pontos definem uma reta. Como escrever isso algebricamente?
2. **Diferentes formas** — por que precisamos de mais de uma representação? Quando cada forma é útil?
3. **Interpretação geométrica** — o que o coeficiente angular significa? Como a reta se comporta?
4. **Posições relativas** — quando duas retas se cruzam? São paralelas? Coincidem?
5. **Distância** — a menor distância de um ponto a uma reta. Significado geométrico antes da fórmula.
6. **Inequações** — semiplanos como "zonas seguras/perigosas".
