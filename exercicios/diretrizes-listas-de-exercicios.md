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
Os exercícios devem pedir que o aluno faça esboços e diagramas, conectando equações com geometria. A matemática analítica nasceu da geometria — os exercícios devem manter essa conexão viva.

**Regras operacionais:**

1. **NUNCA** pedir "desenhe mentalmente", "visualize", "construa mentalmente" ou "imagine" para operações geométricas. O ser humano é péssimo em visualização mental — usamos papel e rascunhamos, ilustramos. Os exercícios devem refletir isso.

2. **Como pedir esboço:** usar frases como:
   - "No papel, esboce os vetores..."
   - "Desenhe no papel os pontos e os vetores entre eles..."
   - "Rascunhe o triângulo e marque os lados com as distâncias calculadas..."
   - "Desenhe no papel os pontos $A$, $B$ e $C$, construa os vetores $\overrightarrow{AB}$ e $\overrightarrow{AC}$, e..."
   - "Faça um esboço no papel da situação: marque os pontos, trace os vetores..."

3. **Em quais exercícios pedir esboço:**
   - **FASE 1 (caso simples):** SEMPRE pedir esboço — o aluno precisa ver a geometria antes de calcular
   - **FASE 2 (nova ferramenta):** pedir esboço quando a ferramenta tem interpretação geométrica (ortogonalidade, ângulo, área, perpendicularidade)
   - **FASE 3 (combinar):** opcional — pedir quando o problema envolve classificação (tipo de triângulo, alinhamento, forma geométrica)
   - **FASE 4 (aplicar):** SEMPRE pedir esboço — o aluno precisa montar o problema visualmente antes de traduzir em equações

4. **Como integrar ao texto:** o pedido de esboço deve estar integrado ao enunciado, não como instrução separada ou parêntese:
   - ✅ "Desenhe no papel os pontos $A(1,2)$ e $B(4,5)$, construa o triângulo retângulo e calcule a distância."
   - ❌ "Calcule a distância. (Dica: desenhe.)"
   - ❌ "Desenhe mentalmente o triângulo retângulo formado pelas coordenadas."

### 8. Autonomia sobre decoreba
O objetivo é que, com as definições básicas, o aluno consiga derivar resultados sozinho, sem depender de fórmulas memorizadas. Em vez de "aplique a fórmula da distância", prefira "use a definição de produto escalar para encontrar a distância". A fórmula é consequência, não ponto de partida.

### 9. Texto integrado (OBRIGATÓRIO)
O enunciado de cada exercício deve ser um **texto integrado** — não dois parágrafos separados (narrativa + enunciado), mas um único fluxo onde a história motiva o problema e o problema nasce da história.

**Estrutura do texto integrado:**

1. **Situação** — descreve o cenário concreto (o que está acontecendo na Zona Devastada)
2. **Problema** — o que o aluno precisa descobrir, nascendo naturalmente da situação
3. **Ferramenta** — o conceito ou técnica que o aluno vai usar (mas NÃO a aplicação dela)
4. **Deixar para o aluno** — o que o aluno deve descobrir/calcular sozinho

**Regra de ouro:** A ferramenta diz O QUE o aluno pode fazer. O aluno descobre COM aplicar e QUAL resultado.

**Formato:** Um único `<p>` (ou dois no máximo, se o texto for longo):

```html
<p>Seu abrigo possui dois reservatórios parciais de água. O primeiro
contém $\frac{2}{5}$ de um tanque, o segundo $\frac{1}{5}$ do mesmo
tanque — ambas falam de "quintos", as mesmas partes. Se combinar os
dois, que fração do tanque total ficará disponível?</p>
```

**O que NÃO fazer:**
- ❌ Dar a solução junto com a ferramenta ("use o MMC 12, que dá 4/12 + 3/12 = 7/12")
- ❌ Separar em "parágrafo narrativo" + "parágrafo enunciado" como blocos distintos
- ❌ Repetir o cenário no enunciado depois de já ter descrito na narrativa
- ❌ Dar spoiler da resposta no texto ("a operação é simples, basta somar")

**O que fazer:**
- ✅ Dar a ferramenta sem aplicá-la ("multiplicar em cima e em baixo pelo mesmo número não muda a fração, pois equivale a multiplicar por 1")
- ✅ Deixar o aluno descobrir o MMC, fazer as conversões e calcular
- ✅ Integrar narrativa e problema num fluxo contínuo
- ✅ Referenciar o exercício anterior pelo conceito, nunca pelo número

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

Os exemplos abaixo mostram como aplicar os princípios acima no formato **texto integrado** — narrativa, problema e ferramenta num único fluxo. O aluno descobre COM aplicar e QUAL resultado.

### Exemplo 1: Álgebra

#### Fase 1 — Isolamento de x (equação linear pura)

**Q1** — $x + 3 = 7$
> Em engenharia e ciência, é comum conhecermos algumas grandezas e descrevermos outras. Quando traduzimos essa situação para equações, o princípio fundamental é: se fizermos a mesma operação dos dois lados, a relação entre as grandezas continua válida. Dado $x + 3 = 7$, descubra o valor de $x$ aplicando esse princípio.

**Q2** — $2x = 10$
> No exercício anterior, a incógnita estava somada a um número. Agora ela está multiplicada por 2. O raciocínio é o mesmo — mesma operação dos dois lados — mas a operação inversa mudou. Qual é a operação inversa da multiplicação? Use-a para descobrir o valor de $x$.

**Q3** — $2x + 3 = 11$
> Na prática, raramente temos uma única operação envolvendo $x$. Aqui, ele é multiplicado por 2 e depois somado a 3. Para isolar $x$, precisamos desfazer essas operações na ordem inversa. Descubra a sequência correta e encontre $x$.

**Q4** — $\frac{x}{4} + 2 = 5$
> Agora $x$ aparece dividido por 4, o que é o mesmo que multiplicado por $\frac{1}{4}$. O princípio não mudou — mesma operação dos dois lados — mas a fração pode confundir. Lembre-se: dividir por 4 e multiplicar por 4 são operações inversas. Use essa ideia para isolar $x$.

#### Fase 2 — Propriedades algébricas

**Q5** — Expandir $(3 + 4)^2$ e comparar com $3^2 + 2 \cdot 3 \cdot 4 + 4^2$
> O que acontece quando multiplicamos $(a + b)$ por ele mesmo? Vamos descobrir com números: calcule $(3 + 4)^2$ diretamente e depois calcule $3^2 + 2 \cdot 3 \cdot 4 + 4^2$. Os dois resultados são iguais? O que o termo $2 \cdot 3 \cdot 4$ representa geometricamente? (Dica: pense em um quadrado de lado $a+b$ e veja quais áreas ficam "de fora" de $a^2$ e $b^2$.)

**Q6** — Expandir $(5 + 2)(5 - 2)$ e descobrir o padrão
> Agora vamos multiplicar $(a+b)$ por $(a-b)$. Calcule $(5+2)(5-2)$ expandindo os parênteses. O que acontece com os termos intermediários? Escreva o padrão geral que você descobriu — ele aparecerá com frequência e nos permitirá simplificar expressões que parecem complicadas.

**Q7** — Calcular $2^3 \cdot 2^4$ e descobrir a regra $a^m \cdot a^n = a^{m+n}$
> $2^3$ é $2 \cdot 2 \cdot 2$, e $2^4$ é $2 \cdot 2 \cdot 2 \cdot 2$. Quando multiplicamos, juntamos todas as multiplicações. Quantos fatores de 2 temos ao todo? Generalize: se $a^m$ tem $m$ fatores e $a^n$ tem $n$ fatores, qual é a regra para $a^m \cdot a^n$? E para $a^m \div a^n$?

#### Fase 3 — Combinar ferramentas com incógnitas

**Q8** — Resolver $(x + 3)^2 = 25$
> Nos exercícios anteriores, expandimos produtos notáveis com números. Agora o padrão aparece com incógnita: $(x+3)^2 = 25$. Use o produto notável que você descobriu para expandir o lado esquerdo. A equação resultante será resolvível com o método dos primeiros exercícios. Combine as ferramentas e encontre $x$.

**Q9** — Simplificar $\frac{x^5}{x^2}$ e depois resolver $x^3 = 27$
> A regra de potências que você descobriu agora aparece com incógnitas. Simplifique $\frac{x^5}{x^2}$ usando a propriedade da divisão de potências. Depois, resolva $x^3 = 27$. Para essa última equação, você precisará de uma operação inversa que ainda não usamos — pense no "oposto" de elevar ao cubo.

**Q10** — Resolver $(x + 1)^2 - (x - 1)^2 = 8$
> Aqui temos uma diferença de dois quadrados — o padrão do exercício Q6. Reconheça a estrutura, aplique a simplificação e resolva a equação resultante. Você vai descobrir que algo aparentemente complexo se reduz ao básico.

#### Fase 4 — Aplicação

**Q11-Q12** — Problemas onde o aluno precisa montar a equação
> Nos exercícios anteriores, a equação era dada. Agora a situação é descrita em palavras — cabe a você identificar a incógnita, montar a equação e resolver. Use tudo que construímos até aqui.

---

### Exemplo 2: Frações e Proporções

#### Fase 1 — Frações com números

**Q1** — $\frac{2}{5} + \frac{1}{5}$
> Seu abrigo possui dois reservatórios parciais de água. O primeiro contém $\frac{2}{5}$ de um tanque, o segundo $\frac{1}{5}$ do mesmo tanque — ambas falam de "quintos", as mesmas partes. Se combinar os dois, que fração do tanque total ficará disponível?

**Q2** — $\frac{1}{3} + \frac{1}{4}$
> No exercício anterior, os denominadores eram iguais — partes do mesmo tamanho. Mas a expedição retornou com dois frascos de RemoveRad: um contém $\frac{1}{3}$ de dose, o outro $\frac{1}{4}$. São "terços" e "quartos" — partes diferentes. Para somar, precisamos convertê-las em partes do mesmo tamanho. Lembre-se: multiplicar o numerador e o denominador pelo mesmo número não muda a fração, pois equivale a multiplicar por 1. Encontre um denominador comum, converta e some.

**Q3** — $3 \times \frac{2}{7}$
> Se cada membro do grupo consome $\frac{2}{7}$ de uma reserva de RemoveRad, quanto 3 membros consomem? Multiplicar uma fração por um inteiro significa repetir aquela fração. Calcule o total.

**Q4** — $\frac{3}{4} \div 2$
> Você tem $\frac{3}{4}$ de um tanque de combustível e precisa dividi-lo igualmente entre 2 expedições. Quanto cada uma recebe? Note que dividir por 2 é equivalente a multiplicar por $\frac{1}{2}$ — a operação inversa. Use essa ideia para encontrar a resposta.

**Q5** — $\frac{3}{4} \div \frac{2}{5}$
> Quantas vezes $\frac{2}{5}$ cabe em $\frac{3}{4}$? Essa é a pergunta que a divisão por fração responde. A regra geral: dividir por uma fração é o mesmo que multiplicar pela fração invertida. Aplique essa regra e verifique se o resultado faz sentido.

**Q6** — $\frac{2}{3} \times \frac{4}{5} + \frac{1}{6}$
> Primeiro multiplicamos, depois somamos — a ordem das operações vale para frações também. Calcule $\frac{2}{3} \times \frac{4}{5}$, depois some com $\frac{1}{6}$. Para somar, você precisará de um denominador comum entre o resultado da multiplicação e $\frac{1}{6}$.

#### Fase 2 — Frações com incógnitas

**Q7** — $\frac{x}{3} + \frac{x}{4} = 7$
> Até agora, as frações continham números. Agora a incógnita está no numerador. A técnica é a mesma do Q2 — encontrar um denominador comum — mas agora o denominador comum nos permite "limpar" as frações e transformar o problema numa equação linear. Multiplique tudo pelo denominador comum e resolva.

**Q8** — $\frac{2}{x} + \frac{3}{x} = 5$
> Aqui a incógnita está no denominador. Os denominadores já são iguais (ambos são $x$), então a soma funciona como no Q1. Mas o que fazer em seguida para isolar $x$? Pense: qual operação "limpa" o $x$ do denominador?

**Q9** — $\frac{1}{x+1} + \frac{1}{x-1} = \frac{2x}{x^2-1}$
> Este exercício conecta tudo que vimos. Os denominadores são $(x+1)$ e $(x-1)$ — diferentes. Para achar o denominador comum, observe o lado direito: $x^2 - 1$. Você reconhece esse padrão? Ele é o resultado de uma operação que já vimos em Álgebra. Use essa reconhecimento para encontrar o denominador comum e resolver.

#### Fase 3 — Proporções

**Q10** — Se $\frac{3}{5} = \frac{6}{10}$, o que vale para $\frac{a}{b} = \frac{c}{d}$?
> "Para cada 3 unidades de a, temos 5 de b; para cada 6 de c, temos 10 de d." As razões são iguais. Multiplique em cruz na igualdade $\frac{3}{5} = \frac{6}{10}$ e veja o que acontece. Agora generalize: se $\frac{a}{b} = \frac{c}{d}$, qual relação vale entre os quatro números? Esta não é uma regra decorada — é consequência de que as frações são iguais.

**Q11** — Problema de contexto com proporção
> A fórmula de diluição do RemoveRad diz: 2 mL de concentrado para cada 500 mL de água. Se você tem apenas 2 litros de água, quanto concentrado precisa? Monte a proporção, resolva e interprete o resultado.

#### Fase 4 — Porcentagens

**Q12** — Calcular 15% de 200
> "Por cento" literalmente significa "dividido por 100". Então 15% é simplesmente a fração $\frac{15}{100}$. Calcular 15% de 200 é multiplicar: $\frac{15}{100} \times 200$. Não existe nada de novo — é uma fração disfarçada de linguagem cotidiana. Calcule o resultado.

**Q13** — Problema combinando porcentagem + fração
> Do suprimento total do abrigo, 40% é combustível. Do combustível, $\frac{2}{3}$ é destinado à expedição. Qual fração do suprimento total vai para a expedição? Converta, opere e interprete.

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
