# Sistema visual — direção de trabalho

**Estado:** aplicada em 03/11/2026 para avaliação visual de Henrique. A identidade ainda não está aprovada. Esta revisão usa Tabasco como referência de ritmo e de objeto que evolui com o scroll; não copia o site, os modelos, a arte ou a identidade dele.

## Ideia visual

Uma oficina de software em funcionamento. O primeiro quadro já mostra um briefing legível sobre a mesa e no monitor. Conforme a pessoa rola, a folha cede lugar ao editor; o código e a prévia aparecem juntos; a mesma interface termina como produto. A história é contada numa única rolagem contínua, sem menu, abas ou navegação por etapas.

O caso mostrado é um exemplo original de fluxo de solicitação, usado para explicar como uma aplicação é construída. Os projetos de Henrique começam depois, como trabalhos próprios, cada um apresentado pelo problema e pelas decisões documentadas.

## Paleta de trabalho

| Token | Valor | Uso |
|---|---|---|
| Tinta | `#11100f` | Fundo principal. |
| Painel | `#191715` | Superfícies escuras e cabeçalho. |
| Papel | `#eee9de` | Briefing, interface demonstrativa e texto principal. |
| Texto auxiliar | `#b8b1a5` | Leitura secundária e metadados. |
| Óxido | `#d66a4a` | Único acento editorial do portfólio. |

Madeira, papel, luminária e metais mantêm tons materiais próprios da cena. As reconstruções dos produtos usam as cores necessárias para que cada interface continue reconhecível; a moldura editorial, os títulos, os links e os estados do site usam a mesma tinta, papel e óxido.

## Tipografia

- **Barlow Condensed**: uma família de títulos, sempre com o mesmo tratamento; o destaque muda pela cor e pela composição, não por uma segunda fonte de display.
- **DM Sans**: leitura, explicação e interface de produto.
- **DM Mono**: rótulos, arquivos, estado e informação técnica.

Títulos seguem uma escala responsiva única. O corpo editorial começa em 14–15 px; rótulos e metadados têm tamanho mínimo de 8–10 px. As interfaces internas podem usar escala menor porque representam janelas de produto dentro da cena, sem substituir o texto editorial acessível em HTML.

## Aplicação

1. A bancada ocupa a tela com briefing, monitor, teclado, mouse, mousepad, luminária, mesa de madeira e parede texturizada. Modelos e materiais são construídos na cena Three.js com superfícies procedurais; não é uma fotografia nem imagem gerada.
2. A abertura apresenta “O pedido sem contexto.” e deixa claro o problema do fluxo demonstrativo.
3. O scroll transforma a mesma cena: briefing, editor com linhas de código, prévia construída ao lado dele e produto final com pedido, responsável e situação.
4. O cursor acompanha a posição do visitante, o mouse 3D segue o ponteiro e teclas com legendas pressionam uma sequência curta de código. O monitor tem moldura, câmera, suporte e cabo. Não há movimento em loop quando a pessoa para.
5. Sons de tecla e clique são opcionais e compartilham o controle global **SOM**; o padrão é desligado.
6. Texto e títulos ficam em HTML. O fluxo do monitor é uma demonstração editorial. A bancada abre um editor JavaScript/CSS: os arquivos vivem na sessão da guia; a prévia executa num Web Worker dentro de `iframe sandbox="allow-scripts"`, sem acesso ao DOM ou à rede. O escopo é limitado a 60 KB por execução e 1,5 s; não publica nem representa um projeto real.
7. No fim da narrativa, o computador funciona como navegador local para explorar Rota, Quarta, Condrio, MNEME, PULSO e TrilhaBH e acessar os contatos.

## Regras para manter autoria e leitura

- Usar a referência de scroll como princípio narrativo: um objeto muda porque o produto está sendo construído.
- Manter uma família de títulos, uma de leitura e uma técnica; não alternar famílias para criar destaque.
- Reservar o óxido ao acento editorial. Cores próprias dos projetos aparecem dentro das reconstruções, sem colorir cada seção do portfólio.
- Fazer cada mudança visível corresponder a uma ação: entender, codificar, conferir e entregar.
- Evitar texto empilhado sobre a cena, cartões sobre o monitor, métricas decorativas, terminal falso e animação sem relação com o processo.
- Respeitar scroll nativo, movimento reduzido, foco visível e a preferência explícita de som desligado.

## Arquivos e validação

- Narrativa e textos: `src/SoftwareFilm.tsx`.
- Bancada 3D, tela e cursor: `src/SoftwareScene.tsx`.
- Editor de exploração: `src/InteractiveWorkbench.tsx` e `src/interactive-workbench.css`.
- Paleta, escala e composição: `src/continuous-process.css` e `src/software-film.css`.
- Projetos: `src/ProjectIndex.tsx`, `src/ProjectRenderers.tsx` e `src/content.ts`.
- QA e estado da publicação: `QA.md`.

TypeScript, build Vite, pós-build e resposta HTTP 200 da prévia local passaram nesta revisão. Não foi feita inspeção visual no navegador; proporções em aparelhos e desempenho do 3D seguem para validação de Henrique. O deploy continua manual.
