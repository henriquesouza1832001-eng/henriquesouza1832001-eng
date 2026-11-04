# Sistema visual — oficina de software

**Estado:** direção vigente em 03/11/2026. Um monitor, uma sequência de construção e um portfólio navegável na tela.

## Assinatura

A marca HS existente define os acentos de azul e amarelo. O fundo combina azul-noite e verde profundo com linhas cartográficas desenhadas para o portfólio. A moldura do monitor usa grafite. Dentro dele, a IDE tem superfície escura e o site usa papel claro.

O contraste entre o código e a prévia ajuda a entender o trabalho. A interface do computador dá acesso a arquivos e projetos; cada detalhe visual também orienta a navegação.

## Tipografia

- `--display`: Barlow Condensed para a frase principal, nomes de projeto e títulos.
- `--reading`: DM Sans para explicações, interfaces e leitura.
- `--mono`: DM Mono para código, caminhos de arquivo e controles técnicos.

Usar títulos fortes para hierarquia. Manter texto corrido entre 12 e 15 px no monitor em escala normal. Rótulos técnicos podem ser menores quando necessários; não construir a composição a partir de microtexto ou sequências de números.

## Construção visual

1. A abertura apresenta a marca e a frase “Software para o mundo real” ao lado da IDE.
2. O código-fonte e a prévia evoluem em paralelo conforme a rolagem nativa.
3. A interface final ganha projetos, links, sobre e contato.
4. O navegador dentro do computador recebe o controle para explorar o portfólio.

O conteúdo dos projetos vem de `src/content.ts`. Só usar capturas que existam e pertençam ao produto indicado. Quando não há imagem pública adequada, apresentar o nome e o resumo como composição tipográfica, sem sugerir que seja uma captura do produto.

## Autoria e interação

- O mapa, o fundo e a moldura são feitos com SVG e CSS.
- A marca é o arquivo existente `public/assets/logo-hs.png`.
- A IDE apresenta arquivos reais completos e permite selecionar, copiar, abrir no GitHub e abrir a prévia.
- As ações da área de trabalho, do Explorador e do navegador levam a destinos reais.
- Som desligado por padrão; foco visível; navegação por teclado; movimento reduzido respeitado.
- Não capturar a roda do mouse, não autoavançar e não prender a página.
