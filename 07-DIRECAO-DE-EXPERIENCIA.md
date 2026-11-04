# Direção de experiência — o site sendo construído

**Estado:** direção vigente em 03/11/2026. Esta revisão substitui a página plana de desktop descrita na versão anterior. O pedido atual combina uma abertura editorial, uma sequência de construção guiada pela rolagem e um portfólio navegável dentro do mesmo computador.

## Ideia central

A pessoa chega a uma frase clara sobre o trabalho de Henrique e vê um monitor aberto numa IDE. Ao rolar, código-fonte público e a prévia do portfólio avançam juntos. O último trecho leva ao navegador dentro do computador, já com os projetos acessíveis.

A referência Tabasco inspira apenas o uso da rolagem como narrativa visual contínua. A direção, o texto, as cores, as interfaces e os projetos são próprios. Não reproduzir os objetos, a animação, os modelos ou a identidade da referência.

O computador é desenhado com CSS como um monitor único, com moldura e base gráficas. Não incluir segunda tela, luminária, mesa, teclado, mouse ou textura que tente passar por fotografia. O fundo cartográfico, a luz, a tipografia e a marca HS dão personalidade sem competir com a interface.

## Construção e rolagem

- A IDE aparece desde o primeiro quadro, ao lado da primeira versão do site.
- Os arquivos exibidos vêm do código real do repositório. A rolagem revela o restante do arquivo atual; voltar recolhe as linhas.
- A prévia usa o conteúdo real de `src/content.ts`. O primeiro projeto em destaque é Quarta é Dia de Amstel; os projetos e seus estados continuam selecionáveis.
- Conforme a rolagem avança, entram os projetos, os links e as demais partes do portfólio.
- No último trecho, o navegador do sistema abre o site final no mesmo monitor.
- A rolagem da página permanece nativa. O visitante pode voltar, avançar ou usar controles a qualquer momento.
- Depois de uma escolha manual de app, a progressão deixa de trocar a janela escolhida.

## IDE e navegação

O atalho **Código** abre os arquivos TypeScript completos usados pelo site. A pessoa pode selecionar cada arquivo, copiar seu conteúdo, abrir a versão correspondente no GitHub e executar a prévia do portfólio.

O atalho **Portfólio** abre o Explorador de Arquivos. A raiz lista os projetos e suas pastas. Cada pasta mostra o resumo e apenas os destinos públicos disponíveis: case, produto ou repositório. O atalho **Site** abre o navegador final.

Menu Iniciar, barra de tarefas, minimizar, maximizar, restaurar, fechar, busca, links e controles de som precisam responder a uma ação real. Som fica desligado até uma escolha explícita.

## Telas estreitas

Em telas estreitas, manter a sequência e o mesmo conteúdo num espaço de software responsivo. Não desenhar carcaça, notch, horário, sinal ou bateria fictícios. O fim continua abrindo o portfólio navegável, com links públicos e controles acessíveis ao toque.

## Direção visual e movimento

- Usar a marca HS existente e sua paleta de azul e amarelo como assinatura.
- Criar profundidade com o desenho cartográfico, o fundo escuro e a moldura do monitor; não usar objetos 3D genéricos nem reflexos fotográficos.
- Manter a IDE escura e o site em papel claro, para distinguir fonte e produto.
- Dar destaque a títulos, frases e projetos. Metadados pequenos aparecem somente quando ajudam a localizar ou usar algo.
- Respeitar `prefers-reduced-motion`, foco visível, navegação por teclado e links diretos.

## Arquivos principais

- `src/SoftwareFilm.tsx` e `src/software-film.css`: narrativa, progresso de rolagem e monitor.
- `src/DesktopOS.tsx` e `src/desktop-os.css`: IDE, navegador, Explorador de Arquivos, atalhos e janelas.
- `src/PortfolioBrowser.tsx` e `src/portfolio-browser.css`: prévia que evolui e portfólio final no navegador.
- `src/MobilePortfolio.tsx` e `src/mobile-portfolio.css`: adaptação estreita.
- `src/ide-source.ts`: fonte real apresentada na IDE.
- `src/content.ts`: projetos, descrições, estados e links públicos.

## Critérios de revisão

- A abertura mostra marca, frase principal, IDE e primeira versão do site dentro de um único monitor.
- Rolagem para baixo e para cima avança e recolhe a construção sem prender a página.
- Arquivos, busca, links, janelas e aplicações executam ações verificáveis.
- O navegador final permite escolher projetos e abrir seus cases, produtos e repositórios reais.
- Celular e desktop mantêm leitura, foco, uso por teclado ou toque e ausência de overflow horizontal.
