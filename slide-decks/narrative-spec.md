# Spec: Narrativa Crítica — Geometria Analítica: Sobrevivência Geométrica

**Versão:** 1.0 (adaptado do Cálculo Vetorial — pendente de aprovação na issue #46)
**Curso:** Geometria Analítica — Sobrevivência Geométrica (pós-apocalíptico)
**Destinatário:** Agente de implementação de slides

> **ATENÇÃO:** O arco narrativo global e o mapeamento de temas por capítulo são definidos na **issue #46** (Definir arco narrativo do curso). Este spec contém **apenas diretrizes gerais**. Nomes, datas e fatos específicos não devem ser inventados — consultar a issue e fontes verificáveis (IBGE, IPEA, ONU, dados oficiais).

---

## Tese central

O cenário pós-apocalíptico dos jogos de sobrevivência — cidades partidas, territórios abandonados, infraestrutura de espetáculo, muros invisíveis — não é ficção distante: é um **espelho distópico do presente brasileiro**. A pergunta que o curso planta e nunca responde:

> **Será que já não vivemos numa realidade distópica de cinema?**

A geometria que o aluno aprende é a mesma usada para planejar abrigos **e** exclusões: o mesmo plano cartesiano mapeia o condomínio fechado e a comunidade sem saneamento. A pergunta técnica carrega sempre a pergunta social — quem decide, quem fica de fora, quem é apagado.

---

## Diretrizes narrativas

### Diretriz 1 — Regra da Cidade que se Esconde

**Princípio:** Toda imagem de cidade próspera deve ser confrontada com a parte dela que é sistematicamente invisibilizada.

**Aplicação:** Ao mostrar uma conquista urbana (obra, bairro, infraestrutura), mostrar no mesmo slide ou no seguinte quem foi deslocado, ignorado ou apagado para que ela existisse.

### Diretriz 2 — Regra da Ironia Sistêmica

**Princípio:** Todo discurso de "ordem e progresso", "cidade maravilhosa" ou "planejamento" deve ser confrontado com o que o sistema fazia simultaneamente.

**Aplicação:** Usar justaposição — o mesmo ano, a mesma cidade, duas realidades incompatíveis: o estádio novo e a escola sem manutenção; o mapa turístico e o mapa de áreas de risco.

### Diretriz 3 — Regra do Apagamento Ativo

**Princípio:** A omissão de periferias, povos originários, quilombos e comunidades não foi acidente — foi decisão ativa de quem planeja.

**Aplicação:** Nomear o mecanismo de exclusão, não apenas a ausência. A matemática sabe mapear tudo; a política decide o que entra no mapa.

### Diretriz 4 — Regra da Performance dos Dois Lados

**Princípio:** Poder público e privado cooptam narrativas de inclusão quando servem à imagem, e as abandonam quando não há mais utilidade.

**Aplicação:** Para cada gesto de "inclusão" (obra social, projeto de revitalização, discurso), mostrar o que veio depois — ou o que existia antes.

### Diretriz 5 — Regra do Herói como Produto de Marketing

**Princípio:** Os "rostos" do progresso (o empreendedor, o engenheiro-celebridade, o gestor salvador) foram construídos como produtos de relações públicas, não apenas por mérito.

**Aplicação:** Questionar quem assina e quem executa — o trabalho invisível que sustenta a fama individual.

### Diretriz 6 — Regra da Matemática Neutra, Sistema Não

**Princípio:** A geometria analítica não discrimina. Os sistemas que decidiram quem planeja, quem é deslocado, quem recebe crédito e quem é contratado — esses discriminaram ativamente.

**Aplicação:** Usar como fio condutor filosófico ao longo do curso. A equação não tem classe, raça ou território. As pessoas que a ensinam e aplicam vivem sob sistemas que classificam e excluem.

### Diretriz 7 — Regra da Obra como Distração

**Princípio:** Infraestrutura de espetáculo não implica progresso social. Obras monumentais financiadas com dinheiro público que não resolvem saneamento, moradia ou mobilidade são uma falácia deliberada — o apocalipse não precisa ser cinema para ser real.

**Aplicação:** Ao apresentar marcos de infraestrutura, questionar explicitamente: _para quem, de fato, isso foi bom?_ Mostrar o que não avançou no mesmo período.

**A pergunta que o agente deve plantar nos slides:**

> _"Se somos capazes de construir estádios, túneis e sistemas de transporte desta magnitude, por que escolhemos não resolver o esgoto a céu aberto a três quilômetros do centro?" A resposta não é técnica — é política._

**Conexão com o ensino técnico:**

O engenheiro, o matemático, o cientista são frequentemente vendidos a si mesmos como figuras neutras — resolvem problemas que outros definem. Essa neutralidade é uma ilusão conveniente para quem define os problemas. Compreender o contexto social do trabalho técnico não é "politizar a ciência" — é entender onde o trabalho técnico realmente existe.

---

## Três camadas onde a narrativa aparece

A narrativa entra nos slides em três níveis de profundidade, do mais ao menos explícito:

1. **`01-narrativa.html`** — slide dedicado após a capa. Apresenta o tema social do capítulo (ver issue #46). Conteúdo varia por capítulo.

2. **Insert no V1 de cada tópico** — slide de abertura (motivação) das seções de conteúdo (02, 03, etc.). Parágrafo final do V1, 1-2 frases, tom seco. **Todo tópico de conteúdo recebe insert no V1.** Se não houver conexão natural com a matemática, criar uma por analogia, contraste ou ironia. Inserts NÃO são opcionais — são parte do arco narrativo do capítulo.

3. **Fragmento junto a exemplos matemáticos** — nos slides de APLICAÇÃO (V5+), exemplos podem usar `dual-panel`: esquerda = problema, direita = fragmento narrativo/social. O fragmento NÃO precisa ter relação lógica com o exemplo. A justaposição em si é o mecanismo pedagógico.

---

## Fragmento — mecanismo e regras

### O que é um fragmento

Um fragmento é um bloco de texto curto (2-4 frases) que aparece ao lado de um exemplo matemático, sem relação lógica obrigatória com ele. O objetivo é **ancorar a memória técnica numa experiência emocional** — o aluno lembra do cálculo porque lembra do que sentiu ao ler o fragmento.

### Por que funciona

O cérebro arquiva experiências com carga emocional, não informação neutra (Damasio). A justaposição de matemática fria com um fato que gera desconforto, ironia ou curiosidade cria uma memória composta — o conteúdo técnico e o impacto emocional ficam gravados juntos, mesmo que não tenham conexão racional.

### O fragmento NÃO precisa

- Explicar o exemplo ao lado
- Ter relação lógica com o conteúdo matemático
- Ser "relevante" no sentido tradicional
- Resolver ou comentar a matemática

### O fragmento PODE

- Ser um fato social brutal e seco
- Gerar dissonância cognitiva (dois fatos incompatíveis lado a lado)
- Distribuir um beat narrativo que não coube nos inserts de V1
- Criar ironia, desconforto, curiosidade ou surpresa
- Ser uma pergunta sem resposta
- Ser um dado verificável que gera impacto emocional

### Formato

- **Layout:** `dual-panel` (esquerda: problema; direita: fragmento em `<p>` simples)
- **Extensão:** 2-4 frases
- **Classes CSS:** nenhuma classe especial no fragmento. Parágrafo `<p>` simples dentro do painel direito
- **Tom:** seco, factual, sem adjetivos dramáticos. O impacto vem do conteúdo, não da retórica
- **Frequência:** dinâmico — 1 ou mais exemplos por seção recebem fragmento. Nem todos precisam. A decisão é do PDI (Camada 3: integração), que indica quais exemplos recebem fragmento e quais ficam em matemática pura

### Tipos de fragmento

| Tipo | Descrição | Exemplo (temática BR/RJ) |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Fato brutal | Dado verificável que gera desconforto | "O Rio de Janeiro tem [dado de falta de saneamento] enquanto [dado de investimento em obra]." |
| Ironia sistêmica | Sistema diz X, faz Y | "A cidade se anuncia 'maravilhosa' nos postais. Os moradores de [região] esperam [serviço básico] há décadas." |
| Justaposição territorial | Mesmo município, duas realidades | "A distância entre [bairro A] e [bairro B] é de X km. A distância social é incalculável." |
| Pergunta aberta | Questão sem resposta, plantada para o futuro | "Quem decide o que entra no mapa?" |
| Contraste emocional | Beleza técnica vs. custo humano | "A ponte é elegante. Quem foi deslocado para construí-la não aparece na foto de inauguração." |
| Beat narrativo | Trecho do arco narrativo que não coube no V1 | Distribuição dos beats do capítulo entre inserts e fragmentos |

> **Fatos verificáveis:** todo fragmento com dado deve ter fonte confiável (IBGE, IPEA, ONU, dados oficiais do RJ). Nada de números inventados. Em caso de dúvida, preferir fragmento qualitativo a dado sem fonte.

### Relação com o arco narrativo

Os fragmentos são uma **segunda via** para distribuir o arco narrativo do capítulo. Os inserts de V1 ancoram o tópico; os fragmentos distribuem os beats restantes e fatos complementares. O PDI (Camada 3) mapeia quais beats vão em inserts e quais vão em fragmentos, garantindo que o arco seja coerente e sem repetição.

---

## Regras de conteúdo

- **Sem partidarismo:** crítica sistêmica, nunca nomes de políticos partidários ou campanhas
- **Sem revisionismo sem base:** fatos com fonte verificável, nada de achismo
- **Sem moralismo:** tom seco, o impacto vem dos fatos e das perguntas, não da dramatização
- **Humor sutil coexiste:** o sarcasmo da temática de sobrevivência é bem-vindo; o deboche moralizante, não
- **Conteúdo técnico é prioridade:** a inserção fica se ancorar memória, contextualizar uso ou gerar dissonância; cortar se for apenas "interessante"

---

## Instrução geral para o agente

- Cada inserção narrativa não deve ultrapassar **1 slide** ou **30 segundos de narração**
- O conteúdo matemático é prioridade; a narrativa é dissonância cognitiva, não contexto decorativo
- Inserts no V1 são obrigatórios em toda seção de conteúdo (02–NN). Formato: 1-2 frases, parágrafo final, tom seco
- Fragmentos junto a exemplos são dinâmicos (1 ou mais por seção). Decisão fica no PDI Camada 3
- Fontes prioritárias: IBGE, IPEA, ONU, Datafolha, dados oficiais do estado do RJ
- Se houver dúvida sobre qual fato usar: escolher o que gera mais dissonância ou impacto emocional
- Fragmentos não precisam ter relação lógica com o exemplo — justaposição emocional é válida
