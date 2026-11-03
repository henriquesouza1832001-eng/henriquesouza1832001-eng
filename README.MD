# Henrique Souza — portfólio

Portfólio em React, TypeScript, Vite e Three.js. A página inicial acompanha uma única estação de trabalho durante toda a rolagem: a IDE aparece no monitor desde a abertura, o conteúdo passa por uma prévia e revisão e termina num sistema navegável com projetos, perfil e contato.

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

O build fica em `dist/`. O script `scripts/postbuild.mjs` gera páginas individuais de projeto, sitemap e página 404. Para publicar no Cloudflare Pages, envie o conteúdo de `dist/`.

## Como a experiência funciona

- `src/SoftwareFilm.tsx` acompanha a rolagem e troca as etapas da tela.
- `src/SoftwareScene.tsx` monta a estação 3D, os dois monitores, o teclado mecânico RGB, o mouse iluminado e o mousepad. O movimento do cursor é refletido no mouse.
- `src/WorkstationScreen.tsx` mantém a interface interativa dentro do monitor. As abas abrem código, trabalhos, sobre e contato.
- `src/content.ts` concentra descrições, autoria, estado atual, tecnologias e links públicos dos projetos.
- As prévias e demonstrações locais são identificadas como estudos. Não se conectam aos serviços dos projetos nem se apresentam como capturas de produção.

Na área de projetos, cada item pode apontar ao case, ao produto publicado e ao repositório correspondente. Os cases ficam em `/projetos/<slug>/`.

## Publicação

O site público é [henriquesouzas.com](https://henriquesouzas.com/). O projeto do Cloudflare Pages é `portfolio-henrique-souza`.

## Pacote fonte

`public/henrique-portfolio-completo.zip` é uma cópia do código e da documentação, sem dependências instaladas, cache, build ou arquivos de prévia. Depois de extrair, use Node.js e pnpm, rode `pnpm install` e inicie com `pnpm dev`.
