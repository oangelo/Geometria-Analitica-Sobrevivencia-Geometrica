# Guia para Agentes de IA

Este repositório é o material didático do curso **Geometria Analítica: Sobrevivência Geométrica**, desenvolvido pelo Prof. Angelo Mondaini Calvão para os cursos de Engenharia do IPRJ/UERJ.

Todo o material segue uma **temática pós-apocalíptica** inspirada em jogos de sobrevivência, com tom educativo sério e humor sutil.

---

## Como o material é organizado

| Pasta | Conteúdo | Regra ativa |
|---|---|---|
| `exercicios/` | Listas de exercícios em HTML interativo | `.cursor/rules/exercicios.mdc` |
| `slide-decks/` | Apresentações Reveal.js por capítulo | `.cursor/rules/slides.mdc` |
| `provas/` | Provas, gabaritos e folhas de resposta | `.cursor/rules/provas.mdc` |
| `visualizacoes/` | Visualizações interativas avulsas | — |
| `games/` | Jogos educativos temáticos | — |
| `notas/` | Boletim dos alunos por semestre | — |

---

## Regras do Cursor (`.cursor/rules/`)

As regras são aplicadas automaticamente pelo agente ao editar arquivos das pastas correspondentes. Elas contêm as diretrizes essenciais de cada tipo de material.

Os arquivos `prompt.md` originais em cada pasta continuam como **referência detalhada** (progressão do curso, lista completa de classes CSS, exemplos). As regras do Cursor são o ponto de entrada — os prompts são o aprofundamento.

---

## Convenções gerais

> Ver **[ESTILO.md](ESTILO.md)** para o guia completo de notação matemática, paleta de cores e critérios de qualidade dos enunciados.

- **Nomenclatura de arquivos**: kebab-case minúsculo (ex: `p1-2025-1.html`)
- **Fórmulas**: sempre MathJax com a classe `formula`
- **Sem cálculo**: todo o material usa apenas álgebra, geometria e trigonometria básica
- **Livro adotado**: MACHADO, A. S. *Álgebra linear e geometria analítica*. 2. ed. Atual, 1982.
- **Exercícios em dois blocos obrigatórios**:
  - `manual-contexto` (`data-context="manual-sobrevivencia"`) para teoria, fórmulas-base e dicas gerais.
  - `enunciados-exercicios` (`data-context="exercicios-enunciados"`) para missões, enunciados e soluções.
- **Exercícios em três arquivos por tópico (obrigatório)**:
  - `<topico>-manual.html` com o bloco `manual-contexto`.
  - `<topico>-enunciados.html` com o bloco `enunciados-exercicios`.
  - `<topico>.html` como loader agregador que carrega manual + enunciados.
