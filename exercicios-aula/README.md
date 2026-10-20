# Exercícios de Aula

Exercícios para resolver durante a aula, com acompanhamento do professor.

## Estrutura

Cada capítulo tem um `index.html` que funciona como índice de navegação e uma
pasta por folha, nomeada no padrão `folha-N-topico/`:

```
exercicios-aula/
├── sala-styles.css              # CSS compartilhado (único)
├── capitulo-0-preparacao/
│   ├── index.html               # índice do capítulo
│   └── folha-1-algebra/
│       ├── index.html           # monta a folha (carrega os exercícios)
│       └── exercicio-1.html     # fragmento HTML
├── Cap 1/
│   ├── index.html
│   └── folha-1-pontos-no-plano/
│       └── ...
└── ...
```

- Cada `folha-N-topico/index.html` carrega seus exercícios via `fetch()`
- Cada exercício é um fragmento HTML (sem `<html>`, `<head>`, `<body>`)
- O CSS é único: todas as folhas usam `../../sala-styles.css`

## Como usar

1. Abra o `index.html` do capítulo no navegador
2. Escolha a folha desejada
3. Resolva os exercícios durante a aula

## Organização por Capítulo

| Capítulo | Conteúdo |
|----------|----------|
| `capitulo-0-preparacao/` | Preparação: álgebra, frações, sistemas, trigonometria e geometria |
| `Cap 1/` | O Espaço Vetorial R² |
| `Cap 2/` | Produto Interno no R² |
| `Cap 3/` | Estudo da Reta no R² |
| `Cap 4/` | A Circunferência no R² |
| `Cap 5/` | Lugares Geométricos: As Cônicas |
| `Cap 6/` | R³ e Geometria no Espaço |
