# Sistema visual — área de trabalho de software

**Estado:** direção vigente em 03/11/2026, em revisão visual. Substitui a bancada 3D, os objetos físicos e os mockups de computador descritos em versões anteriores.

## Ideia visual

O portfólio se apresenta como um desktop interativo. A área de trabalho usa um mapa abstrato de Belo Horizonte como papel de parede; as janelas mostram código, arquivos e caminhos públicos dos projetos. A metáfora serve à navegação e ao conteúdo, sem tentar simular uma fotografia de hardware.

O Explorador de Arquivos usa fundo claro e hierarquia familiar para facilitar leitura e descoberta. A IDE fica em tema escuro, com arquivos TypeScript reais do repositório. O desktop continua legível sem depender de ícones decorativos, reflexos, iluminação simulada ou texto minúsculo.

## Cores e tipografia

O desktop combina verde profundo, papel quente e oliva. O editor mantém a paleta escura da própria interface. Os projetos preservam as cores internas das demonstrações quando isso ajuda a reconhecer sua lógica.

- `--display`: Barlow Condensed para títulos de janela e chamadas curtas;
- `--reading`: DM Sans para descrições, leitura e controles;
- `--mono`: DM Mono para nomes de arquivo, linguagem e estados técnicos.

Priorizar corpo de texto entre 12 e 15 px em painéis internos e não reduzir informação útil a metadados de 8 px. Evitar sequências de números decorativos e indicadores sem função.

## Uso da interface

1. A IDE aparece aberta desde o início; a rolagem nativa revela os trechos de código público, linha a linha.
2. O atalho Portfólio abre uma pasta raiz com o README e os diretórios dos projetos públicos.
3. Cada pasta contém resumo e somente os atalhos que existem: case, produto público e repositório.
4. Menu, busca, barra de tarefas, minimizar, maximizar e fechar precisam responder de verdade.
5. Depois da primeira ação manual, o scroll não troca a janela que a pessoa escolheu.
6. Em telas estreitas, os mesmos aplicativos se reorganizam sem carcaça, notch ou status fictício de telefone.

## Autoria e movimento

- Mapas e desenhos são feitos em SVG/CSS e devem descrever uma relação de produto ou navegação.
- Os arquivos exibidos na IDE vêm do código público, sem digitação independente do scroll.
- O scroll permanece nativo e pode ser revertido. Não interceptar a roda, criar avanço automático ou prender o visitante em uma janela interna.
- Som desligado por padrão e ativado apenas por escolha explícita.
- Foco visível, controles nomeados e respeito a `prefers-reduced-motion`.
- Nenhuma imagem gerada ou mockup genérico substitui a evidência real do projeto.

## Arquivos de implementação

- `src/DesktopOS.tsx` e `src/desktop-os.css`: desktop e aplicativos.
- `src/SoftwareFilm.tsx` e `src/software-film.css`: scroll e etapas da home.
- `src/MobilePortfolio.tsx` e `src/mobile-portfolio.css`: composição responsiva estreita.
- `src/ide-source.ts`: trechos públicos de código.
- `src/content.ts`, `src/CasePage.tsx` e `src/ProjectRenderers.tsx`: conteúdo e demonstrações dos projetos.
- `QA.md`: histórico das decisões e verificações realizadas.
