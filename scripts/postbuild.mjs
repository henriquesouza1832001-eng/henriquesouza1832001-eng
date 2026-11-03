import { readFile, mkdir, writeFile } from 'node:fs/promises';

const root = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const pages = [
  ['rota-di-buteco', 'Rota di Buteco', 'Um bar visitado mudava o mapa, o feed e a disputa do grupo. Uma PWA criada para acompanhar o Comida di Buteco BH 2026.'],
  ['quarta-amstel', 'Quarta é Dia de Amstel', 'Uma experiência de descoberta de bares sustentada por regras de campanha, Cloudflare Worker e D1.'],
  ['condrio', 'Condrio', 'ERP interno para obras, chamados, conforto, acesso e CAPEX. O repositório documenta duas linhas de arquitetura; a implantação atual não está confirmada.'],
  ['mneme', 'MNEME', 'Projeto de Thiago Antunes. Colaborei no desenvolvimento de um bot de copy trading para Solana; a execução documentada hoje é simulada.'],
];

function withCaseMetadata(source, slug, title, description) {
  const canonicalUrl = `https://henriquesouzas.com/projetos/${slug}/`;
  return source
    .replace(/<title>[^<]*<\/title>/, `<title>${title} — Henrique Souza</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title} — Henrique Souza" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
}

for (const [slug, title, description] of pages) {
  const folder = new URL(`projetos/${slug}/`, root);
  await mkdir(folder, { recursive: true });
  await writeFile(new URL('index.html', folder), withCaseMetadata(html, slug, title, description));
}

const notFound = html
  .replace(/<title>[^<]*<\/title>/, '<title>Página não encontrada — Henrique Souza</title>')
  .replace(/<meta name="description" content="[^"]*" \/>/, '<meta name="description" content="Esta rota não existe. Volte aos projetos de Henrique Souza." />')
  .replace(/<meta property="og:title" content="[^"]*" \/>/, '<meta property="og:title" content="Página não encontrada — Henrique Souza" />')
  .replace(/<meta property="og:description" content="[^"]*" \/>/, '<meta property="og:description" content="Esta rota não existe. Volte aos projetos de Henrique Souza." />')
  .replace(/\s*<meta property="og:url" content="[^"]*" \/>/, '')
  .replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '')
  .replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
await writeFile(new URL('404.html', root), notFound);

await writeFile(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://henriquesouzas.com/</loc></url>\n${pages.map(([slug]) => `  <url><loc>https://henriquesouzas.com/projetos/${slug}/</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Geradas ${pages.length} páginas de projeto com title, description, Open Graph e canonical próprios; sitemap e 404 também foram atualizados.`);
