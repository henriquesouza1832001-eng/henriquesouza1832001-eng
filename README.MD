# Henrique Souza — portfólio

Portfólio em React, TypeScript e Vite. A rolagem conduz seis momentos do trabalho dentro de um único monitor: a IDE revela arquivos reais linha a linha enquanto a prévia ganha estrutura, conteúdo e navegação. No fim, o navegador abre o portfólio pronto no mesmo computador.

## Rodar localmente

```bash
pnpm install
pnpm dev
```

Para gerar a versão estática:

```bash
pnpm build
pnpm preview
```

O build fica em `dist/`. O script `scripts/postbuild.mjs` gera os cases, sitemap e página 404. Para publicar no Cloudflare Pages, envie o conteúdo de `dist/`.

## Como a experiência funciona

- `src/SoftwareFilm.tsx` acompanha a rolagem nativa e conduz a narrativa do problema ao site pronto.
- `src/software-film.css` cria a composição editorial, o fundo cartográfico e a moldura do monitor em CSS. Há um único monitor, sem cenário 3D ou acessórios cenográficos.
- `src/DesktopOS.tsx` contém o sistema navegável, a IDE, o Explorador de Arquivos, o menu Iniciar e as janelas de sobre, contato e ajustes.
- `src/ide-source.ts` carrega arquivos-fonte públicos completos. Na IDE, é possível selecionar um arquivo, copiá-lo, abri-lo no GitHub e abrir a prévia do site.
- `src/PortfolioBrowser.tsx` mostra o portfólio final dentro do monitor. A lista de projetos usa `src/content.ts`; os cases, produtos e repositórios abrem seus destinos reais.
- `src/MobilePortfolio.tsx` adapta a mesma sequência para telas estreitas, sem moldura ou status fictícios de telefone.
- `src/content.ts` concentra descrições, tecnologias, situação e links públicos dos projetos.

Os projetos são apresentados por diagramas de fluxo baseados nas descrições públicas, em vez de capturas ou mockups dos aplicativos. Cada diagrama mostra o problema e a lógica principal do produto; os links levam aos cases, repositórios e produtos reais quando disponíveis.

## Publicação

O site público é [henriquesouzas.com](https://henriquesouzas.com/). O projeto do Cloudflare Pages é `portfolio-henrique-souza`.

O repositório público está em [github.com/henriquesouza1832001-eng](https://github.com/henriquesouza1832001-eng).
