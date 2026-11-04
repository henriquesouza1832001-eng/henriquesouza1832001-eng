# Direção de experiência — um computador em funcionamento

**Estado:** direção ativa para a home em 03/11/2026. Este documento formaliza o computador como apresentação principal no desktop e a adaptação para celular em retrato. A navegação pelos aplicativos continua direta e não exige terminar a narrativa.

## Decisão central

A página inicial é uma bancada de desenvolvimento vista como ambiente físico, com um computador navegável dentro do monitor. A metáfora tem relação direta com o trabalho de Henrique: a pessoa acompanha código e interface tomando forma e depois usa a mesma tela para abrir projetos, autoria e contato.

O computador não é um jogo nem uma porta escondida. A tela inicial oferece ícones para entrar em qualquer app; a navegação do monitor também permanece disponível. O scroll nativo conduz a narrativa; os aplicativos levam a conteúdo e links reais.

## Percurso

### Abertura — desktop

A cena abre num desktop com ícones funcionais para Projetos, Código, Sobre, Contato e Ajustes. Um clique abre o app escolhido. O primeiro movimento de scroll abre a IDE se a pessoa ainda não escolheu um app; o painel começa sem linhas preenchidas e revela código real linha a linha. O trecho inicial vem dos dados públicos de `src/content.ts`, com os projetos e estados atuais. Rolando para cima, as linhas recolhem. Um avanço rápido vai diretamente ao ponto correspondente, sem animação de digitação independente.

### Adaptação mobile — celular

Em telas estreitas, a bancada desktop dá lugar a um celular em retrato, com tela inicial própria e os mesmos apps. A pessoa pode tocar em projetos, código, sobre, contato ou ajustes. O scroll do navegador continua nativo e conduz a revelação de código e a tela de projetos; a versão mobile não carrega a cena WebGL da bancada.

### Código, protótipo e entrega

A bancada permanece na tela durante toda a rolagem. A câmera aproxima o monitor, a prévia da interface se forma ao lado do editor e o produto demonstrativo ocupa a tela no final. A passagem tem quatro estados; eles representam uma construção e não são controles que a pessoa precisa abrir ou selecionar.

A prévia de solicitação é uma demonstração editorial deste portfólio. Não representa um produto nem dados de um cliente. Os cases de Henrique aparecem depois dentro do aplicativo de trabalhos, com autoria, estado e provas próprios.

### Aplicativos do monitor

Os controles ficam visíveis na barra superior do monitor:

- **Início:** ícones funcionais para abrir os aplicativos.
- **Código:** arquivos-fonte selecionáveis; linhas aparecem com o scroll.
- **Trabalhos:** lista de projetos, estado, papel, tecnologias e links diretos para produto, case ou repositório.
- **Sobre:** contexto profissional e link para acompanhar o código.
- **Contato:** GitHub e LinkedIn.
- **Ajustes:** controle de som real. O padrão é desligado; a preferência vale enquanto a página estiver aberta.

Ao chegar ao final do percurso, o computador abre Trabalhos. A pessoa pode escolher outro aplicativo a qualquer momento. Cases continuam com URLs diretas e compartilháveis.

## Direção visual

- A cena é modelada em Three.js com geometria e mapas procedurais próprios; não usa fotografia gerada ou mockup de banco.
- O ambiente representa uma bancada usada: monitor principal inclinado, segunda tela acesa, luminária, mesa de madeira, folha, teclado mecânico, mouse e mousepad.
- A parede tem textura de reboco mineral irregular (`plasterTexture()`), em tinta oliva quente. A luz da luminária e o reflexo discreto no vidro respeitam a cena existente.
- A moldura do monitor, a base, o suporte, o cabo e as superfícies com diferentes rugosidades dão espessura aos objetos. As telas usam interface HTML projetada sobre a geometria, o que mantém links, foco e controles navegáveis.
- A identidade do site usa tinta, papel quente e óxido, conforme `02-SISTEMA-VISUAL.md`. Marinho/lima/coral está superada e não deve voltar por causa do prompt de referência.
- Os trabalhos mantêm sinais visuais próprios dentro de suas demonstrações. Não adicionar letras, números, painéis ou movimento sem função narrativa.

## Movimento, som e desempenho

- O scroll nativo atualiza câmera, folha, código, prévia e produto por `requestAnimationFrame`.
- O renderizador não roda em loop quando a página está parada. O cursor e o mouse só acompanham movimento recente do ponteiro.
- As teclas físicas acompanham a revelação do código; o áudio continua desligado por padrão e é controlado em Ajustes.
- `prefers-reduced-motion` mantém a câmera estável. O conteúdo, os aplicativos e a rolagem continuam disponíveis.
- Usar a cena Three.js já existente; não adicionar reflexos calculados, pós-processamento ou outra biblioteca sem medição que mostre necessidade.
- Build de referência nesta revisão: Three.js em chunk dinâmico de 568,58 KB minificado / 143,19 KB gzip. A página ainda pode se beneficiar da inspeção de frames em navegador; não inferir desempenho de scroll só pelo tamanho do arquivo.

## Implementação

- `src/SoftwareFilm.tsx`: progresso do scroll, estados da narrativa e revelação por etapas.
- `src/SoftwareScene.tsx`: bancada Three.js, luz, sombras, projeção do monitor e canvas de fundo.
- `src/WorkstationScreen.tsx`: aplicativos funcionais exibidos na tela física.
- `src/MobilePortfolio.tsx` e `src/mobile-portfolio.css`: sistema de apps para celular, sem WebGL.
- `src/ide-source.ts`: trechos apresentados pelo editor.
- `src/workstation-screen.css` e `src/software-film.css`: interface do sistema e composição do monitor.
- `src/content.ts`, `src/CasePage.tsx` e `src/ProjectRenderers.tsx`: dados, páginas de case e demonstrações dos projetos.
- `src/sound.ts` e `src/App.tsx`: áudio opt-in e controle global.

## Critérios para cada revisão

- No desktop, a tela inicial mostra apps funcionais; o scroll abre a IDE, que começa sem código pronto e revela linhas nos dois sentidos. No mobile, a tela inicial do celular mostra os mesmos apps.
- A tela final permanece dentro do mesmo monitor e oferece acesso claro aos trabalhos e contato.
- Cada controle responde a clique, teclado e toque; o som pode ser ligado e desligado nos Ajustes.
- O scroll vertical permanece nativo, sem gesto sequestrado. A versão mobile não inicializa Three.js.
- O texto legível está no DOM, o foco é visível e movimento reduzido é respeitado.
- Confirmar build, rotas, links, responsividade e funcionamento da cena antes de atualizar o registro de QA e publicar.
