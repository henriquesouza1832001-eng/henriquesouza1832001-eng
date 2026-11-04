# Direção de experiência — área de trabalho navegável

**Estado:** direção vigente em 03/11/2026. Esta decisão substitui a bancada 3D e os mockups de computador e telefone descritos em registros anteriores.

## Ideia central

A home se comporta como uma área de trabalho de software, feita de interfaces e arquivos. A metáfora fala diretamente do trabalho de engenharia: código, produto, estrutura e autoria ficam acessíveis na mesma navegação.

O desktop não tenta parecer uma fotografia de hardware. Não tem monitor físico, segunda tela, luminária, mesa ou teclado cenográfico. O visual vem do papel de parede cartográfico, da tipografia e das janelas do sistema; cada controle precisa levar a uma ação real.

## Abertura e rolagem

- A IDE aparece aberta desde o primeiro quadro, com arquivos reais do portfólio e sem linhas reveladas.
- A rolagem nativa mostra o código público linha a linha. Rolar para cima recolhe as linhas; pular pelo percurso revela o trecho correspondente.
- No fim do percurso, o Explorador de Arquivos entra em foco se a pessoa não tiver assumido a navegação manualmente.
- Abrir qualquer atalho, selecionar um app no menu ou usar a barra de tarefas transfere o controle para a pessoa. O progresso do scroll não deve trocar apps depois disso.
- O navegador não captura gestos, não avança sozinho e não mantém a página presa depois da área interativa.

## Portfólio como arquivos

O atalho **Portfólio** abre o Explorador de Arquivos. Na pasta raiz aparecem o `LEIA-ME.md` e as pastas correspondentes aos projetos públicos. Ao abrir uma pasta, o painel mostra:

- `LEIA-ME.md` com resumo, papel de Henrique e tecnologias confirmadas;
- `CASE.url` quando há case publicado no próprio portfólio;
- `PRODUTO.url` quando existe produto público com link;
- `REPOSITÓRIO.url` para o código-fonte público.

Selecionar um arquivo mostra seu conteúdo ou destino no painel de leitura. Os atalhos externos abrem o destino real. A busca filtra a pasta atual, a trilha de navegação volta à raiz, e os links laterais abrem pastas ou o perfil público no GitHub. Não exibir controles inertes.

As janelas de Código, Sobre e Contato também abrem pelos atalhos do desktop e pelo menu. Minimizar, maximizar, restaurar e fechar têm comportamento funcional. A barra de tarefas troca entre janelas abertas. Ajustes contém o controle real de som, desligado por padrão.

## Telas estreitas

Em telas estreitas, a mesma ideia vira uma interface responsiva de software. Não desenhar carcaça de telefone, notch, sinal, bateria ou relógio fictício. Manter os atalhos de Portfólio, Código, Sobre, Contato e Ajustes legíveis e acessíveis ao toque; preservar o scroll nativo e os mesmos links públicos.

## Direção visual e movimento

- Fundo cartográfico próprio, sem textura fotográfica ou ilustração genérica.
- Janelas com hierarquia clara, área de conteúdo ampla, tipografia legível e contraste funcional.
- O Explorador usa superfície clara para leitura de arquivos; o editor mantém tema escuro próprio.
- Movimento breve entre janelas, sem câmera, parallax, cursor customizado ou renderização contínua.
- Respeitar `prefers-reduced-motion`; manter foco visível e navegação por teclado.

## Arquivos principais

- `src/SoftwareFilm.tsx`: progresso nativo do scroll e atualização da IDE.
- `src/DesktopOS.tsx` e `src/desktop-os.css`: desktop, Explorador de Arquivos, janelas, barra de tarefas e atalhos.
- `src/MobilePortfolio.tsx` e `src/mobile-portfolio.css`: composição responsiva para telas estreitas.
- `src/ide-source.ts`: trechos públicos apresentados na IDE.
- `src/content.ts`, `src/CasePage.tsx` e `src/ProjectRenderers.tsx`: conteúdo, cases e demonstrações.
- `src/sound.ts`: sons opcionais da interface.

## Critérios de revisão

- Clicar em Portfólio abre a raiz do Explorador com arquivos e pastas selecionáveis.
- Abrir cada pasta mostra somente destinos e conteúdo comprovadamente públicos.
- Busca, navegação de pasta, atalhos, janela, menu e barra de tarefas funcionam.
- A IDE aparece desde a abertura e o scroll revela código real sem prender a página.
- Desktop e 320, 375, 768 px preservam leitura, foco, navegação e ausência de overflow horizontal.
- Teclado, toque, som, movimento reduzido, links diretos e cases são conferidos antes da publicação.
