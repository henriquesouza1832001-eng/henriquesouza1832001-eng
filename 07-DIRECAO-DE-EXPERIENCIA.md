# Direção de experiência — uma ideia vira produto

## Princípio

A pessoa rola uma única página e acompanha um aplicativo tomando forma. O fluxo é briefing, IDE, protótipo e produto final. Esses nomes aparecem no texto editorial; não existem abas, menu ou controles para pular entre etapas. A própria rolagem conduz a história.

Esta abordagem parte do princípio de transformação de objeto do [Tabasco, de Hilo Studio e Abdurrahim Ali](https://tabasco.abdurrahimali.com/). O objeto de Henrique é uma bancada de desenvolvimento: uma folha, um computador e a interface que está sendo construída. A cena, o conteúdo, a identidade e a animação são próprios deste portfólio.

## O que a visita mostra

### Abertura — briefing

A página abre com o briefing visível no papel e na tela. O exemplo é uma solicitação sem contexto; os campos identificam a entrada, quem assume e como se confirma o resultado. O título e o texto apresentam Henrique como desenvolvedor full stack e explicam por que a interface ainda não vem primeiro.

### IDE

Ao rolar, a câmera se aproxima. O briefing sai de cena e o monitor abre o editor linha a linha. A passagem usa a própria tela: o briefing recua, o editor entra, depois a prévia desliza para dentro e o produto ocupa o monitor. A tecla física acompanha a sequência do código; as legendas aparecem no teclado e uma tecla baixa a cada caractere simulado.

Na mesma leitura, a pessoa pode abrir a bancada para mexer no exemplo. É um editor leve de JavaScript e CSS, sem Monaco ou servidor. Permite criar arquivos e pastas virtuais; o estado usa `sessionStorage` da guia atual e não é enviado. `src/App.js` e `src/styles.css` alimentam a prévia; imports só podem referenciar caminhos locais do projeto. `app.setScreen(...)` e `app.setOutput(...)` atualizam a prévia com texto seguro, enquanto `console.log`, avisos e erros aparecem ao lado.

O JavaScript roda num Web Worker temporário dentro de um `iframe sandbox="allow-scripts"`, sem `allow-same-origin`. O sandbox não expõe o DOM, arquivos físicos, armazenamento, formulários, navegação da página, Cloudflare ou rede. A CSP permite scripts em Blob apenas para o editor, bloqueia conexões e conteúdo externo; o Worker também bloqueia as APIs de rede conhecidas. Cada execução termina ao concluir ou após 1,5 s, e aceita no máximo 60 KB de código. O limite reduz travamentos por loops, mas este exemplo não é uma fronteira para executar código hostil de desconhecidos; é um editor demonstrativo para visitantes.

### Protótipo

O código permanece relacionado à interface: a prévia local cresce ao lado do editor. Campos, texto, ação, validação e confirmação entram conforme a leitura avança. O exemplo responde no navegador e não envia nem persiste dados.

### Produto final

A interface ocupa o monitor. Ela reúne pedido, responsável e situação para mostrar o que uma entrega pronta precisa esclarecer a quem usa. A rolagem chega então a um computador navegável: projetos aparecem como aplicativos próprios na janela de navegador, com descrição, autoria, stack e links. A tela de contato fica na mesma interface.

## Identidade visual

- Campo de tinta escura, papel quente e um único acento óxido.
- Barlow Condensed para títulos; DM Sans para leitura e interfaces; DM Mono para informação técnica.
- Hierarquia controlada por escala, peso, espaço e cor. As duas linhas dos títulos usam a mesma família.
- Texturas físicas de mesa, papel e parede vêm da cena Three.js. Não há imagem gerada para fingir uma fotografia.
- As reconstruções de projeto preservam cores próprias apenas dentro das interfaces demonstrativas; a moldura editorial permanece comum.

## Movimento e som

- O scroll nativo controla câmera, folha, tela e linha fina de progresso.
- O mouse 3D acompanha o ponteiro; uma tecla abaixa durante a escrita simulada. As teclas físicas têm legendas, o monitor tem moldura com cantos arredondados, câmera, suporte, base e cabo visível.
- A bancada de edição é carregada apenas quando solicitada. O código de demonstração roda num Worker com tempo limitado, dentro de um iframe sandbox e CSP sem rede; os arquivos virtuais ficam apenas na sessão da guia.
- Não há loop em repouso. A câmera, o cursor e a tela ficam parados quando não há interação.
- Sons locais de tecla e clique são opcionais, sempre desligados ao abrir, e usam um único controle global **SOM**.
- Com `prefers-reduced-motion`, a câmera não avança por animação; o conteúdo e a rolagem continuam disponíveis.

## Implementação

- `src/SoftwareFilm.tsx`: quatro blocos editoriais contínuos e indicação de rolagem.
- `src/SoftwareScene.tsx`: bancada Three.js e canvas que desenha briefing, IDE, protótipo e produto.
- `src/InteractiveWorkbench.tsx` e `src/interactive-workbench.css`: editor local opcional, arquivos e pastas, console e prévia isolada.
- `src/software-film.css`: composição da cena, escala tipográfica e adaptação a telas estreitas.
- `src/continuous-process.css`: paleta do site, tipografia editorial, projetos e rodapé.
- `src/sound.ts` e `src/App.tsx`: áudio opt-in e controle global.
- `src/PortfolioComputer.tsx` e `src/portfolio-computer.css`: tela final com os projetos e contato.
- `src/ProjectRenderers.tsx` e `src/content.ts`: interfaces demonstrativas e dados documentados por projeto.

## Limites e validação

O fluxo principal no monitor é uma demonstração original do processo de desenvolvimento, separada dos projetos reais. A bancada opcional executa JavaScript comum em sandbox e guarda arquivos apenas naquele navegador. Ela não transpila React/JSX, não carrega dependências externas, não chama serviços e não envia arquivos.

TypeScript, build de produção, pós-build e resposta HTTP da prévia local são verificáveis por comando. A inspeção visual do navegador não foi feita nesta rodada. Henrique pediu que não se use seu computador; composição renderizada, leitura em mobile, fallback WebGL e desempenho continuam para a validação dele. O envio ao Cloudflare é manual.
