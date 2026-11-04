# Revisão da estação interativa — 03/11/2026

## Estado desta rodada

- A home foi consolidada numa única estação 3D. A IDE aparece ao abrir; a rolagem mostra prévia e revisão dentro do mesmo monitor e termina no sistema de projetos, sem outro computador abaixo.
- O monitor tem abas clicáveis para código, trabalhos, sobre e contato. Os links do projeto selecionado apontam ao case, ao produto quando existe e ao repositório associado.
- O enquadramento inicial agora mostra o monitor inteiro. Reduzi o pontilhado da parede e aumentei a tipografia da IDE e dos controles dentro da tela.
- `pnpm build` passou; TypeScript, Vite e o pós-build geraram as quatro páginas de projeto, sitemap e 404.
- Revisão em Chrome local: 1440×900 e 390×844. As quatro etapas foram verificadas por scroll; as abas Sobre e Contato abriram; links de contato e do case Rota foram inspecionados. Nenhum erro de JavaScript. No celular, a página ficou com 390 px de largura sem overflow horizontal.
- Capturas locais: `preview-initial.png`, `preview-prototype-final.png`, `preview-review-final.png`, `preview-desktop-final.png` e `preview-mobile-final.png`.
- Otimização atual: os renderers carregam por uma fachada de exports nomeados em `src/three-runtime.ts`. O chunk caiu de 753,31 kB para 568,58 kB minificado e de 192,54 kB para 143,19 kB gzip, redução de 25,6% no tamanho transferido. A cena continua sendo carregada sob demanda quando entra perto da viewport.
- Revisão após a otimização: Three.js inicializou no Chrome sem fallback; IDE, prévia, revisão e área de projetos foram conferidas. Sobre, seleção de projeto e três links do case responderam; nenhum erro de JavaScript.
- Limitação conhecida: o chunk Three.js permanece acima do aviso padrão de 500 kB do Vite.
- Publicação desta rodada: esta revisão segue para o branch de trabalho no GitHub e para o Cloudflare Pages Production; os endereços estão no README e no registro do release.

> As seções seguintes preservam verificações de versões anteriores. Quando divergirem da revisão atual, vale o estado desta seção.

---

# Histórico de validação — 03/11/2026

> **Registro mais recente — 03/11/2026:** a superfície de plástico e tecido foi refinada para 512 px; o mouse agora tem carcaça ergonômica em camadas, botões hemisféricos, roda com sulcos, junção central e sensor ajustado ao mousepad. A IDE guarda arquivos na sessão da guia e executa o JavaScript num Worker dentro de iframe sem origem compartilhada, com CSP sem rede, tempo máximo de 1,5 s e limite de 60 KB. A pessoa consegue alterar a prévia por `app.setScreen`, `app.setOutput` e ver o console. TypeScript, Vite e pós-build passaram; a inspeção visual e o deploy permanecem manuais.

## Isolamento do editor e materiais — 03/11/2026

- O estado da bancada usa `sessionStorage` na guia atual. Não cria arquivos no disco nem envia código ou dados ao servidor.
- O iframe usa apenas `sandbox="allow-scripts"` sem `allow-same-origin`; a CSP bloqueia conexões, formulários, frames, objetos e recursos externos. A execução principal ocorre num Web Worker separado da interface, sem DOM, arquivos físicos, clipboard, storage ou rede.
- `fetch`, XHR, WebSocket, EventSource, workers aninhados, BroadcastChannel e importScripts são bloqueados no Worker; imports de projeto precisam ser relativos e apontar para arquivos JavaScript virtuais. Uma execução que conclui é encerrada; loops são interrompidos após 1,5 s. Cada entrada aceita até 60 KB.
- Preview seguro de tela expõe `app.setScreen(title, detail)` e `app.setOutput(text)`; a saída usa `textContent`, nunca interpreta HTML do editor. Logs são limitados a 3.000 caracteres e 80 entradas.
- Limites restantes: browser não oferece um quota de memória rígido para este Worker; código arbitrário ainda pode pressionar memória antes do timeout. A ferramenta é para experimentação de visitantes, não para executar código deliberadamente hostil. Ela não compila JSX/React, não acessa rede, clipboard, arquivos físicos, serviços ou Cloudflare.
- A textura procedural do teclado, mouse e carcaça usa mapas de 512 px. O mouse acompanha o ponteiro e foi refeito com perfil ergonômico; a cena é um modelo 3D manual, não uma captura fotorrealista.
- TypeScript (`node node_modules/typescript/bin/tsc -b`): passou.
- Vite (`node node_modules/vite/bin/vite.js build`): passou, 48 módulos. O aviso existente de chunk Three.js acima de 500 kB permanece: 753,31 kB bruto / 192,54 kB gzip.
- Pós-build (`node scripts/postbuild.mjs`): passou; quatro páginas de projeto, sitemap e 404 gerados.
- `dist/` e o ZIP de deploy manual têm 19 arquivos, dentro do limite de 1.000 do painel. O ZIP-fonte contém 82 arquivos; as cópias em `public/` e `dist/` têm SHA-256 idêntico ao arquivo-fonte.
- `pnpm build` tentou registrar o projeto por symlink no armazenamento global e recebeu `EPERM` do sandbox; executar os binários já instalados diretamente contornou essa restrição sem alteração externa.
- A inspeção do WebGL e da IDE no navegador segue pendente. Não usei o computador de Henrique e não fiz deploy no Cloudflare.

## Bancada e computador — 03/11/2026

- O computador recebeu corpo e moldura com cantos arredondados, câmera frontal, indicador, eixo e pé metálicos. Um cabo liga a traseira do monitor à mesa. A cena permanece procedural em Three.js e não requer Blender nem um renderer adicional.
- O teclado foi ampliado, separado da mesa por uma base arredondada e recebeu fileiras escalonadas, legendas, barra de espaço e indicador. A sequência física acompanha letras e espaços da linha que aparece no editor; uma tecla afunda e retorna durante a rolagem.
- A troca de conteúdo usa a tela contínua: o briefing recua, o editor revela o código e a janela de prévia desliza da direita para dentro do monitor. O produto ocupa a tela ao final. Não há loop quando a pessoa para de rolar.
- Registro anterior à mudança para `sessionStorage` e Worker. Os detalhes de segurança e limites atuais estão em **Isolamento do editor e materiais** acima.
- Escopo conhecido: não há compilação de JSX/React, resolução de dependências npm, envio, sincronização entre navegadores ou publicação automática. O editor demonstra JavaScript padrão no browser.
- TypeScript (`tsc -b`): passou. Build Vite: passou, 47 módulos; o chunk Three.js permanece em 753,31 kB bruto / 192,54 kB gzip e gera aviso de tamanho. Pós-build: passou; cases, sitemap e 404 foram gerados.
- O pacote-fonte tem 80 arquivos; as cópias para download em `public/` e `dist/` conferem por SHA-256. `dist/` e o ZIP de deploy manual têm 19 arquivos, abaixo do limite de 1.000 do painel. O ZIP de direção visual e QA contém os 11 documentos do projeto.
- A porta local 4173 já estava ocupada, então o processo existente foi mantido. A requisição HTTP de conferência não passou pelo bloqueio de soquete do ambiente isolado; a URL de prévia permanece `http://127.0.0.1:4173/` para Henrique abrir.
- A checagem visual automatizada do WebGL e do iframe não foi feita; a composição e o comportamento em hardware móvel precisam de avaliação visual. Henrique pediu para não controlar o computador dele. Deploy no Cloudflare continua manual.

## Revisão de apresentação e tipografia — 03/11/2026

- A visita usa quatro trechos contínuos — briefing, IDE, protótipo e produto final — sem abas, menu ou controles de etapa. A rolagem permanece nativa; uma indicação inicial e uma linha fina mostram como avançar.
- O monitor abre com o briefing legível. Trechos de um componente React aparecem linha a linha; campos, texto, ação e validação do protótipo entram no mesmo progresso. A tela final mostra o pedido, responsável e estado.
- A página usa Barlow Condensed nos títulos, DM Sans na leitura e DM Mono nos rótulos. Os títulos mantêm a mesma família e escala; tinta, papel quente e óxido formam a paleta editorial. O acento único substitui os destaques verde e lilás da revisão anterior.
- O cursor se desloca junto com o avanço e passa a seguir o ponteiro real quando ele se move. O mouse 3D acompanha no mousepad e uma tecla baixa durante a escrita.
- Sons curtos de tecla e clique são gerados pela Web Audio API, ativados somente pelo controle global **SOM**. Nenhum som toca antes da escolha da pessoa.
- A bancada ganhou parede com textura de reboco, veios menos regulares na madeira, luminária articulada com luz local, sombra, mousepad e mouse. O ruído de tela sobreposto foi retirado; os materiais vêm da própria cena em Three.js.
- O app é uma ilustração editorial local. Não compila código de verdade, não envia dados e não representa um dos projetos reais.
- TypeScript: **passou**. Vite: **passou**, 44 módulos; CSS 164,15 kB, JavaScript principal 299,17 kB e Three.js 753,31 kB (192,54 kB gzip), carregado sob demanda. Postbuild: **passou**, quatro páginas de projeto, sitemap e 404.
- Prévia local `http://127.0.0.1:4173/`: HTML, JavaScript e CSS responderam HTTP 200 após o build.
- `dist/` contém 17 arquivos; o ZIP de deploy tem 17 arquivos, e a cópia do pacote-fonte no site responde HTTP 200. O pacote-fonte contém 76 arquivos sem ZIP recursivo. Cópias dos pacotes conferidas por SHA-256.
- A versão foi recompilada em `dist`. Inspeção visual do canvas, som, mobile, contraste e performance em hardware: **pendente da conferência manual de Henrique**. Não usei o navegador nem o computador dele. Deploy Cloudflare: **não realizado**.

## Percurso do briefing ao produto — 03/11/2026

> Registro anterior à revisão de apresentação acima; a direção visual e a composição atuais estão descritas no registro mais recente.

- A primeira tela apresenta Henrique como desenvolvedor full stack em Belo Horizonte e usa “Do mapa ao ERP” para indicar a amplitude dos trabalhos.
- A cena presa à viewport muda continuamente com a rolagem: a folha se reduz e desliza, o editor aparece, as linhas de código são reveladas, a prévia entra ao lado e cresce até ocupar o espaço. Não há loop automático.
- A demonstração valida resumo e resultado esperado. Envio vazio explica os campos pendentes; envio válido mostra a confirmação local. Não cria registro persistente, não chama backend e não representa um projeto publicado.
- A preferência `prefers-reduced-motion` desativa as transições e revela o código completo; os mesmos estados continuam acessíveis.
- Os quatro renderers próprios de Rota, Quarta, Condrio e MNEME agora aparecem na apresentação principal. Rota tem maior presença; Condrio está marcado como repositório público e sistema interno; o crédito do MNEME continua explícito. PULSO e TrilhaBH permanecem com estados corretos.
- Atualizados `README.md`, `02-SISTEMA-VISUAL.md`, `07-DIRECAO-DE-EXPERIENCIA.md` e `REGRAS-DO-PORTFOLIO.md` para registrar esta direção e substituir as instruções antigas de terminal, abas, ledger e índice lateral.
- TypeScript (`tsc -b`): passou.
- Build Vite: passou; 40 módulos transformados.
- Pós-build: passou; quatro páginas de projeto, `404.html` e `sitemap.xml` gerados.
- `dist/` ficou com 16 arquivos. O ZIP para deploy manual e o release têm os mesmos 16 arquivos na raiz, abaixo do limite de mil arquivos.
- O pacote-fonte foi refeito com 72 arquivos e copiado para `public/henrique-portfolio-completo.zip`; não inclui dependências, caches nem ZIP recursivo.
- A inspeção visual em navegador não foi feita. Henrique pediu explicitamente para não usar o computador dele; telas estreitas, composição e contraste renderizado permanecem para conferência visual.
- Nenhum deploy foi feito. Henrique mantém o deploy manual pelo painel Cloudflare. O ZIP pronto está em `../portfolio-cloudflare-deploy.zip` e o diretório é `dist/`.

## Revisão editorial, bancada e segurança — 03/11/2026

- A abertura passou do mapa para uma composição tipográfica com terminal editorial. O comando digita letra a letra, apresenta notas reais de percurso, não executa processos e não bloqueia o título; movimento reduzido remove a animação.
- A bancada tem abas acessíveis por clique, setas, Home e End. Cada projeto ganha um renderer SVG diferente e uma demonstração local. Check-ins, campanhas, módulos e operações não chamam o backend real.
- O caderno de segurança aponta documentos públicos e separa o que o código documenta, limites reconhecidos e estados não verificados. Não se apresenta como auditoria.
- O Rota mostra a regra global do Firestore, que permite leitura/escrita autenticada e o limite do feed, reconhecido no README. A Quarta mostra os elementos presentes no Worker e secrets definidos fora do código. O Controler descreve JWT/bcrypt/secrets e áreas para revisão em `SECURITY.md`. O MNEME declara `git-crypt` e execução simulada no README.
- O índice lateral antecede quatro capítulos editoriais longos. No desktop, a prancha Three.js acompanha a leitura; em mobile, cada capítulo mostra seu desenho vetorial no fluxo vertical.
- `.\\node_modules\\.bin\\tsc.cmd -b`: passou.
- `.\\node_modules\\.bin\\vite.cmd build`: passou com 44 módulos. CSS: 117,28 kB; JS principal: 299,51 kB; Three.js: 753,31 kB (192,54 kB gzip), acima do aviso padrão de 500 kB.
- `node scripts/postbuild.mjs`: passou e gerou quatro páginas de case, `404.html` e `sitemap.xml`.
- Checagem estática pós-build: 17 arquivos em `dist`, abaixo do limite de 1.000; referências de JS/CSS existem, as quatro rotas têm title/canonical próprios e o bundle contém as novas seções.
- Pacote fonte portátil recriado com 57 entradas, sem dependências instaladas, caches ou ZIP recursivo. A cópia para download foi colocada em `public/henrique-portfolio-completo.zip` e entrou no `dist` após novo build.
- ZIP de direção/QA recriado com 12 arquivos. O ZIP manual para Cloudflare foi criado a partir do conteúdo de `dist`, com 17 entradas na raiz; o release ZIP é uma cópia equivalente.
- Visualização e interação no navegador não foram verificadas. Henrique pediu explicitamente para não usar seu computador; a inspeção em viewport real, toque, leitor de tela e contraste renderizado fica para validação dele.
- Os arquivos estão preparados para envio manual. Cloudflare não foi atualizado e nenhum deploy foi realizado nesta revisão.

> Os registros abaixo descrevem etapas anteriores e ficam como histórico. Para estado atual, use esta seção e os documentos de direção atualizados.

## Revisão de identidade e percurso — 03/11/2026

- A paleta marinho/lima/coral foi retirada como decisão vigente após Henrique apontar que parecia genérica e cansativa. A aplicação agora usa tinta `#111512`, giz `#e7e0ce`, oliva `#b9c472`, óxido `#d18a61`, aço e lilás. Contraste numérico está em `02-SISTEMA-VISUAL.md`; a inspeção renderizada ainda falta.
- A abertura começa pelo mapa esquemático da Rota. A faixa dos cases conserva a navegação horizontal e o loop também em tela estreita.
- Os capítulos verticais continuam com scroll nativo. A cena Three.js não se move em repouso: troca com o capítulo e o marcador acompanha o progresso. A Quarta agora usa perímetros concêntricos para mostrar a busca de regra do bar para fora.
- Corrigida a detecção de arrasto para comparar a posição total do ponteiro desde o início do gesto, evitando que um giro curto pareça clique.
- `node node_modules/typescript/bin/tsc -b`: passou.
- `node node_modules/typescript/bin/tsc -b`: passou.
- Build Vite: passou com 40 módulos; Three.js segue em chunk separado de 753,31 kB minificado (192,54 kB gzip), acima do aviso padrão de 500 kB.
- `node scripts/postbuild.mjs`: passou e gerou quatro cases, sitemap e 404.
- Checagem estática em `dist`: 17 arquivos; referências de assets presentes, quatro titles/canonicals próprios e 404 sem canonical com `noindex`.
- Pacote fonte portátil: 54 arquivos, inclui código, documentação e compilação, sem `node_modules`, caches ou ZIP recursivo.
- `dist` contém 17 arquivos. O ZIP de produção preserva `dist` na raiz e inclui o pacote fonte para download; o ZIP de direção/QA reúne os 12 documentos atuais.
- Os três pacotes ficam locais para deploy manual. Nenhum upload será feito.
- Revisão visual no navegador não foi feita. Henrique pediu que não se use seu computador; responsividade renderizada, toque, teclado, canvas/fallback e movimento reduzido seguem para inspeção manual.
- Deploy não foi feito. O próximo pacote é para envio manual de Henrique pelo Cloudflare.

> **Estado vigente em 03/11/2026:** a revisão Three.js abaixo prevalece sobre os registros anteriores desta página. Alguns descrevem fases e visuais já superados.

## Implementação anterior do percurso 3D — 03/11/2026

- Reabri os seis endereços escolhidos: [Wodniack](https://wodniack.dev/), [Bruno Simon](https://bruno-simon.com/), [Bisous — 07](https://bisous-production.com/work/), [seocubo — 09](https://seocubo.com/), [Tabasco Hilo](https://hilostudiolab.com/en/projects/tabasco) e [Heron AI](https://heronaiapp.com/). A síntese e as decisões estão em `07-DIRECAO-DE-EXPERIENCIA.md`.
- Tabasco descreve o scroll como linha do tempo 3D, feita com Three.js/R3F, GSAP ScrollTrigger e Lenis. A execução deste portfólio usa Three.js direto, capítulos observados e rolagem nativa; não replica a marca, o conteúdo ou o modelo de scroll do case.
- Heron combina desenho técnico e interação contextual; aqui, quatro modelos respondem ao conteúdo. O marcador acompanha o scroll dentro de cada capítulo: percorre as paradas da Rota, a prioridade da Quarta, cada arquitetura Condrio em sua própria coluna e a janela documentada do MNEME.
- `src/ScrollWorld.tsx` cria as formas no browser. Three.js é necessário como renderer; Blender não é necessário porque não há modelo orgânico ou asset GLB. O desktop recebe a cena arrastável e clicável; mobile e falha de WebGL usam os diagramas SVG.
- O import do Three.js é acionado quando a bancada chega perto da viewport. O build deixa um chunk dedicado de 753,31 kB minificado (192,54 kB gzip); o aviso do Vite sobre 500 kB permanece registrado. A contagem de arquivos Cloudflare é baixa; o custo relevante é bytes, não quantidade de assets.
- A faixa dos quatro projetos mantém loop horizontal; a narrativa vertical acompanha o progresso da seção e troca o modelo pelo capítulo ativo. A Oficina de sistemas permanece como minijogo exploratório opcional.
- `src/ScrollJourney.tsx`, `src/ProjectGraphic.tsx`, `src/ScrollWorld.tsx` e `src/three.d.ts` correspondem à implementação desta rodada.
- TypeScript, Vite e `scripts/postbuild.mjs` passaram nesta revisão; Vite transformou 40 módulos e gerou os quatro cases, sitemap e 404.
- A pasta `dist` tem 17 arquivos contando páginas, assets e ZIP público; o upload fica abaixo do limite de 1.000 arquivos. O ZIP de deploy preserva os caminhos de `dist` na raiz; o pacote completo e o ZIP de documentação são artefatos separados.
- **Aceite visual pendente:** não abri navegador nem controlei a interface do computador. A aparência do 3D, performance em hardware real, mobile, toque, teclado, leitor de tela, contraste, fallback WebGL e movimento reduzido ainda precisam de avaliação manual.
- Cloudflare não foi publicado nesta rodada. O pacote local é preparado para o upload manual de Henrique; produção só muda após confirmação no painel.

## Registro da versão anterior — 03/11/2026

### Paleta anterior (superada)

- A paleta publicada em marinho/lima/coral foi tratada como aprovada na versão anterior do documento, mas Henrique depois a rejeitou por parecer genérica e cansativa.
- Os valores provisórios, contraste e estado atual estão em `02-SISTEMA-VISUAL.md`.
- `estudos/direcoes-visuais.html` permanece histórico e não determina a direção vigente.

### Conteúdo e Oficina

- Rota, Quarta e Condrio exibem o campo **PAPEL** explícito. O MNEME mantém crédito de colaboração a Thiago Antunes.
- A URL da Rota respondeu HTTP 200; o evento 2026 está encerrado. A URL da Quarta respondeu HTTP 200 e apresenta gate de confirmação 18–80; nenhuma data de nascimento foi enviada.
- O Condrio está público no GitHub, mas README/Databricks e Worker/Hono permanecem como caminhos diferentes, sem relação de implantação confirmada.
- A Oficina tem quatro estações. Sua arquitetura está configurada em `src/Workshop.tsx`; o MNEME compara A (cenários prontos) com B (votos fictícios editáveis). `/?explorar=1` abre a Oficina.
- A Oficina e a inspeção de responsividade estão reabertas. A existência de uma implementação não equivale à validação de uso.

### Verificação técnica desta revisão

- `node node_modules/typescript/bin/tsc -b`: passou.
- `node node_modules/vite/bin/vite.js build`: passou; o build incluiu a Oficina em chunk separado.
- `node scripts/postbuild.mjs`: passou; gerou quatro páginas de case, sitemap e 404.
- Checagem estática confirmou title, description, Open Graph title/description/URL e canonical próprios para os quatro cases; o 404 tem `noindex` e não herda canonical/og:url; robots aponta para o sitemap.
- OG image não está configurada. Não inventei um ativo de marca para preencher essa lacuna.
- ZIPs locais atualizados: pacote fonte portátil, pacote estático para Cloudflare Pages e arquivo separado com os documentos de direção/QA. As listas foram verificadas; o pacote fonte não inclui node_modules, cache, segredos nem ZIP recursivo. A cópia do ZIP fonte está em `public/` para distribuição no próximo deploy.
- Nenhum desses arquivos foi enviado à hospedagem nesta revisão.
- Nenhum navegador ou interface do computador de Henrique foi controlado nesta revisão, conforme pedido explícito.

### Ainda pendente antes do aceite visual

- Inspecionar 320, 375, 768, 390 e desktop amplo; validar toque, teclado, leitor de tela, foco do diálogo e `prefers-reduced-motion`.
- Checar visualmente composição, monograma, tipografia e contraste depois da renderização.
- Não publicar este build até a validação manual e sincronização explícita com a hospedagem. O domínio pode continuar na versão publicada anterior.

## Atualização — Fase B, 03/11/2026

> Registro anterior à ratificação da paleta acima; manter apenas como histórico técnico do protótipo comparativo.

**Estado: protótipo revisado; aceite visual pendente.** `estudos/direcoes-visuais.html` foi refeito para distinguir composição e voz de Atlas de campo, Arquivo de rua e Mesa de percurso. Cada proposta apresenta o mesmo conteúdo da Rota, controles de enquadramento 1440 × 900 e 390 × 844, marca monocromática vetorial, amostras com papel definido e ação demonstrativa fictícia.

- Registrei os três esquemas de cor e calculei o contraste das cores base: texto/fundo (12,97:1, 13,05:1 e 12,91:1); texto escuro/botão de ação (4,79:1, 4,71:1 e 6,91:1); detalhe/fundo (6,40:1, 6,80:1 e 4,44:1). Isso não valida texto pequeno, estados interativos nem a composição inteira.
- A Mesa evita 3D e dependências de cena; as três alternativas usam SVG local e não capturam nem movem o cursor. O movimento reduzido está previsto em CSS.
- A pontuação preliminar e os riscos específicos estão em `02-SISTEMA-VISUAL.md`; ainda não houve escolha nem rejeição final.
- O script embutido passou por compilação sintática com Node.js; a checagem estática confirmou os dois tamanhos, a regra de movimento reduzido, o botão demonstrativo, os seletores por direção no mobile, três abas/um painel, IDs sem repetição e âncoras locais válidas. Os contrastes numéricos foram recalculados e conferidos.
- `tsc -b`, Vite e `scripts/postbuild.mjs` passaram; o build gerou as quatro páginas de projeto. O backup local foi recriado com 47 entradas e 216 kB, sem `node_modules`, cache, ZIPs recursivos, `.env` ou `.keystore`; a lista do arquivo foi aberta e conferida.
- **Pendente:** o navegador integrado não alcançou o servidor local nesta rodada. Não registrei inspeção visual real, navegação por teclado, layout final ou funcionamento da interação após renderização. A Fase B permanece em andamento; o app publicado permanece sem alterações.
- **Publicação do estudo e ZIP:** tentei enviar a pasta `dist` e, depois, o pacote estático ZIP pelo painel Pages. Em ambos os casos o Cloudflare parou em `1/16 files uploaded` e mostrou apenas “Failed to upload”, sem motivo por arquivo. Não cliquei em “Save and deploy”; removi a fila incompleta. Nenhum deploy novo foi criado, então a produção e a URL de download continuam na versão previamente publicada. O arquivo local mais recente está em `../henrique-portfolio-completo.zip`.
- **Ainda antes de fechar a Fase B:** verificar a renderização no navegador, além de clicar/usar teclado na simulação. A atualização do download público depende de o painel Pages aceitar o pacote estático completo.

## Distribuição do backup portátil

**Publicado em Cloudflare Pages.** `README.md` recebeu instruções para recuperar o projeto em outra máquina e foi copiado para `public/README.md`. O pacote fonte completo fica em `public/henrique-portfolio-completo.zip`, sem dependências instaladas, caches ou o próprio ZIP. A publicação usa o projeto Pages `portfolio-henrique-souza`, no ambiente Production.

- TypeScript, Vite e `scripts/postbuild.mjs` concluíram a compilação. O ambiente não tem `npm` disponível; executei os mesmos comandos pelos binários Node já instalados no projeto.
- O Cloudflare confirmou `15/15` arquivos e exibiu `Success!` depois do deploy de produção.
- A home `https://henriquesouzas.com/` continuou abrindo depois do deploy.
- O navegador integrado bloqueou a abertura direta dos arquivos `.md` e `.zip`; por isso, não registrei um teste HTTP direto do download. O painel confirmou que o arquivo está entre os assets publicados.

**Endereço do ZIP:** `https://henriquesouzas.com/henrique-portfolio-completo.zip`.

## Fase 7 — revisão da direção visual

**Em andamento; identidade final não aprovada.** A auditoria das três direções originais foi registrada em `02-SISTEMA-VISUAL.md`. Foram preparadas três alternativas escurecidas com diferenças de composição e narrativa — Atlas de campo, Arquivo de operação e Tabuleiro de percursos — usando a mesma abertura e o mesmo case Rota. O estudo navegável está em `estudos/direcoes-visuais.html`.

- A chamada “Explorar os projetos” aponta para a Rota no estudo.
- O check-in do protótipo altera um marcador visual e informa que a ação é local, fictícia e não consulta serviços reais.
- As abas aceitam clique e setas esquerda/direita; o foco fica na aba ativa.
- `README.md`, `REGRAS-DO-PORTFOLIO.md`, `00-FASE-0.md`, `01-CONTEUDO-E-PROJETOS.md`, `03-WIREFRAMES-E-JOGO.md` e `04-EXECUCAO-E-ACEITE.md` foram alinhados à comparação, aos critérios de prova e ao corte da Oficina se os protótipos não demonstrarem ligação clara com os projetos.
- O código do site publicado não foi alterado nesta fase, e não foi feito deploy.

**Validação pendente:** não foi possível abrir o HTML local no navegador integrado desta sessão. A revisão visual em 1440 × 900 e 390 × 844, a comparação de contraste e a verificação dos conceitos de marca em monocromia continuam pendentes. Por isso, as três propostas permanecem estudos, não uma identidade escolhida ou fase visual validada.

## Fase 0 — direção e conteúdo

**Concluída.** Diretório antigo limpo; cinco documentos novos definem hierarquia dos projetos, voz, limites de apresentação, identidade, wireframes e critério de aceite. Conteúdo confrontado com READMEs e arquivos públicos de Rota, Quarta, Condrio, MNEME, PULSO e TrilhaBH.

## Fase 1 — identidade aplicada e estrutura

**Concluída e validada por build.** React/TypeScript/Vite, wordmark, favicon, paleta, tipografia, home e índice. TypeScript e build de produção passaram após a implementação da base.

## Fase 2 — quatro cases

**Concluída e validada.** Quatro URLs e quatro interações. TypeScript/build passaram. Na inspeção do navegador, Rota alterou placar/feed após check-in; Quarta mudou prioridade ao ativar regra de bar; Condrio trocou para o fluxo de Chamados; MNEME mudou o resultado do sinal B para sugestão simulada.

## Fase 3 — laboratório e navegação

**Concluída e validada.** PULSO está em desenvolvimento e TrilhaBH em pré-beta. Home, cases, laboratório, sobre, contato, 404 e URLs diretas compilaram. `dist/_redirects` foi gerado. O carregamento direto de `/#trabalhos` foi testado após correção de scroll inicial.

## Fase 4 — Oficina

**Concluída e validada.** Quatro estações, controles de teclado/toque, resultado, retorno ao mapa e link para o case. A Oficina é um chunk separado do JS inicial. Teste de navegador: abriu, ativou a estação Rota, registrou 01/04 no progresso e navegou ao case. A planta e a estação foram revisadas em viewport de celular.

## Fase 5 — acabamento e publicação

**Concluída e publicada no Cloudflare Pages.**

- A primeira inspeção revelou uma tela em branco na home; a seleção da rota foi corrigida e a home reapareceu.
- Excesso de largura no celular foi corrigido na grade do laboratório e no título do case.
- Símbolos genéricos foram substituídos por quatro SVGs próprios, ligados às mecânicas reais dos projetos.
- O índice agora possui faixa lateral em loop, com swipe, arrasto, botões e scroll vertical livre.
- Rota e Quarta externas responderam com HTTP 200 no teste do ambiente.
- Home e rota direta de case responderam com HTTP 200 na prévia local.
- Inspeção de console no navegador após as correções: nenhum erro reportado.
- Build de produção, HTML por case, 404 e sitemap verificados.

**Publicação:** o pacote `henrique-portfolio-release.zip`, gerado de `dist/`, foi enviado ao projeto Pages `portfolio-henrique-souza` em Production. O painel confirmou 13/13 arquivos enviados e exibiu `Success!` após o deploy.

**Verificação no domínio:** `https://henriquesouzas.com/` abriu com o novo título e conteúdo. As quatro rotas diretas abriram com seus H1 corretos; o navegador não registrou erros de console nos cases. A Oficina abriu como diálogo na home publicada.

## Fase 6 — hierarquia do hero e navegação mobile

**Concluída, compilada e publicada em 29/10/2026.** O nome do hero agora ocupa a largura de composição prevista, com espaçamento maior em relação ao kicker e à cartografia. Barlow Condensed, DM Sans e DM Mono passaram a ser carregadas explicitamente; o navegador confirmou Barlow Condensed disponível e nenhum erro de console após o deploy. A chamada do hero e o título do índice foram reescritos para ligar a apresentação ao trabalho de campo e à operação.

O índice mobile escondia o conjunto ativo de projetos por causa do seletor de duplicatas da faixa. Agora mantém somente o conjunto acessível, com os quatro projetos reais, miniaturas dos diagramas e texto em uma composição compacta. TypeScript, build Vite, páginas por projeto e pacote Cloudflare passaram. O painel confirmou `Success!` em Production e a versão nova abriu em `https://henriquesouzas.com/`.

As quatro rotas publicadas também foram abertas diretamente e mostraram os títulos esperados: Rota di Buteco, Quarta é Dia de Amstel, Condrio e MNEME. A âncora `#trabalhos` posicionou a seção sob o cabeçalho fixo.

**Limite desta rodada:** confirmei visualmente o hero publicado em desktop e verifiquei tipografia carregada, DOM e console. O navegador integrado não ofereceu controle de viewport e não alcançou a prévia local nesta sessão; a composição mobile foi conferida no CSS compilado, mas ainda precisa de inspeção visual em aparelho ou viewport estreito.

## Revisão editorial futura

O texto de apresentação de Henrique e o crédito de colaboração no MNEME podem ser refinados com feedback direto dele, sem bloquear esta entrega.

## Continuidade — Fases C e D, 03/11/2026

**Objetivo da rodada:** fechar narrativa e mecânicas baseadas em evidência para iniciar a revisão visual. A identidade global segue em estudo; nenhuma cor, marca ou tipografia foi escolhida.

### Fase C — arquitetura editorial

- Criado `06-ARQUITETURA-EDITORIAL.md` com ângulo, sequência narrativa, prova, autoria, demonstração e limites para Rota, Quarta, Condrio, MNEME, PULSO e TrilhaBH.
- Mantida a ordem: Rota, Quarta, Condrio, MNEME; PULSO em desenvolvimento e TrilhaBH em pré-beta.
- Condrio agora separa o caminho Databricks/FastAPI/Delta Lake descrito no README da API Hono/Workers/D1/KV/R2 presente no mesmo branch. O repositório não explica a relação nem confirma o deploy atual.
- MNEME agora segue o README: janela de acerto de 30 dias, maioria para entrada/saída, limites diários, pausa até meia-noite de Brasília e execução simulada com preço, taxa e slippage. Removidas referências a score 0–100 e regras não sustentadas.
- Removidos os links de produto não validados da Rota e da Quarta. Os repositórios continuam como provas acessíveis.
- Atualizados `01-CONTEUDO-E-PROJETOS.md`, `src/CasePage.tsx` e metadados de case gerados pelo postbuild.

### Fase D — Oficina

- Reduzida de quatro estações genéricas a duas ações específicas: check-in fictício que atualiza contagem/feed da Rota; camadas de campanha que demonstram a prioridade da Quarta.
- As estações reutilizam as mesmas demos dos cases, identificam dados fictícios, oferecem link direto ao case e não chamam serviços externos.
- Mapa mantém teclado, toque, saída por Escape, foco no mapa e retorno de foco ao fechar a estação. Ajustado o cartão para usar toda a largura disponível da Oficina.
- Condrio e MNEME não são mecânicas de jogo; ficam nos cases onde sua evidência pode ser explicada com os limites necessários.

### Verificação desta rodada

- TypeScript/Vite/postbuild: **pendente de execução nesta rodada**.
- Inspeção visual e interação no navegador a 1440 × 900 e 390 × 844: **pendente**; esta é a próxima etapa.
- Cloudflare Production e URL pública do ZIP: **sem atualização nesta rodada**. O último upload registrado parou em `1/16 files uploaded`; o pacote atualizado deve ser tratado como local até um deploy posterior confirmar sucesso.
- Pendências factuais que não impedem a revisão visual: relação atual entre arquiteturas do Condrio; acessibilidade da experiência externa da Quarta/Rota; material real autorizado para ilustrar esses projetos.

## Continuidade — interfaces editoriais e pacote local, 03/11/2026

**Esta atualização substitui os diagramas antigos e a proposta de bancada 3D descritos em entradas anteriores.** O percurso segue briefing → IDE → protótipo junto do código → produto, na rolagem vertical do navegador. Não há navegação por etapas nem loop de fundo.

- `src/ProjectRenderers.tsx` agora monta quatro reconstruções HTML específicas, ligadas aos READMEs: mapa e interação de grupo na Rota; ordem de prioridade da campanha na Quarta; módulos operacionais documentados no Condrio; regras do período observado e execução simulada no MNEME.
- A Rota conserva a maior composição. O mapa é explicitamente esquemático, sem endereços reais. A Quarta mostra o gate 18+. Condrio não apresenta dados internos e mantém as arquiteturas documentadas separadas. MNEME preserva o crédito de Thiago Antunes e a colaboração de Henrique.
- Reconstruções são avisadas como conteúdo editorial; não se apresentam como captura real nem como estado de produção. Componentes e CSS foram preparados para telas menores.
- TypeScript (`tsc -b`): **passou**.
- Build Vite: **passou**; 40 módulos transformados.
- `scripts/postbuild.mjs`: **passou**; quatro páginas de case, sitemap e 404 gerados.
- ZIPs locais foram regenerados e conferidos: pacote-fonte com 72 arquivos, pacote de documentos com 12, pacote de deploy com 16. As cópias do ZIP-fonte e do ZIP de deploy têm hashes idênticos entre os locais correspondentes; o ZIP de deploy contém as quatro rotas de case e não inclui dependências.
- Inspeção visual no browser: **pendente**. Não usei o computador ou o navegador de Henrique. Deploy: **não realizado**; Henrique publica manualmente pelo conteúdo de `dist/`.

## Continuidade — cena de software em tela cheia, 03/11/2026

**Esta revisão substitui a composição 2D empilhada e a antiga bancada de sete estações.** A referência é a relação entre scroll e transformação de objeto de [Tabasco](https://tabasco.abdurrahimali.com/); o portfólio usa uma cena procedural própria de mesa, briefing, teclado e monitor.

- `src/SoftwareFilm.tsx` organiza quatro passagens de texto curto, em quatro viewports, sem numeração, tabs, menu de etapas ou card sobre a cena.
- `src/SoftwareScene.tsx` carrega Three.js sob demanda e renderiza uma única bancada. A câmera acompanha o scroll; o papel desliza; o monitor revela editor, protótipo junto do código e produto final.
- Texturas de tela são ilustrações locais de um fluxo de exemplo. Não submetem dados, não chamam serviços e não representam os projetos reais. Os projetos aparecem depois, em seus próprios renderers HTML.
- Sem loop em repouso. Com movimento reduzido, a câmera fica fixa; a tela ainda muda conforme a rolagem.
- Fallback CSS da bancada aparece enquanto WebGL carrega ou se não estiver disponível.
- TypeScript: **passou**. Vite: **passou**, 44 módulos. Postbuild: **passou**, quatro páginas de case, sitemap e 404.
- O bundle 3D é carregado sob demanda: 753,31 kB bruto / 192,54 kB gzip. O build reporta o chunk acima de 500 kB; a performance real ainda precisa de teste no dispositivo.
- Prévia local `http://127.0.0.1:4173/`: HTML, CSS, JS principal e módulo Three.js responderam HTTP 200 após o build.
- Pacotes regenerados e verificados: fonte completo com 76 entradas, documentos com 12, deploy Cloudflare com 17. `dist` também contém 17 arquivos; as quatro rotas de case estão presentes. Hashes das cópias fonte e deploy conferem; ZIP-fonte não contém dependências, cache nem ZIP recursivo.
- Inspeção visual em browser: **pendente**; não fiz captura nem navegação visual. O link está ativo para Henrique avaliar. Deploy Cloudflare: **não realizado**; publicação continua manual.

## Iteração — computador como home, editor guiado pelo scroll, 03/11/2026

- Direção formalizada em `REGRAS-DO-PORTFOLIO.md` e `07-DIRECAO-DE-EXPERIENCIA.md`: o computador passa a ser a própria home, sem um jogo à parte; atalhos de trabalhos, sobre, contato e ajustes ficam no monitor desde a abertura.
- A IDE inicia sem linhas e revela o trecho de `src/content.ts` segundo a posição real do scroll. Subir recolhe as linhas; pular o percurso mostra o estado correspondente. As teclas físicas e o som opt-in usam a mesma faixa de progresso.
- O aplicativo Ajustes agora contém o controle de som funcional, acessível por teclado. O som continua desligado por padrão. O contador decorativo dos projetos foi removido.
- O chunk Three.js permaneceu em 568,58 KB minificado / 143,19 KB gzip. Não foram adicionados novos renderers ou dependências.
- `npm run build`: **passou**; TypeScript, Vite e geração de quatro cases, sitemap e 404. `git diff --check`: **passou**.
- Rotas da home, quatro cases, 404, sitemap e pacote fonte responderam HTTP 200 na prévia de produção local. Rota di Buteco e Quarta Amstel responderam HTTP 200 nos endereços públicos.
- Cloudflare Pages Production: **publicado** no projeto `portfolio-henrique-souza`; o deployment retornou sucesso em `https://d4339b1c.portfolio-henrique-souza.pages.dev`. O domínio `henriquesouzas.com` permanece vinculado ao projeto.
- Inspeção visual e medição de frames em navegador: **pendentes**. A política local bloqueou a abertura do Edge em segundo plano para a tentativa de perfil; não há medição de FPS ou de fluidez declarada nesta revisão. O tamanho do bundle, sozinho, não comprova desempenho do scroll.

## Iteração — entrada por apps e interface mobile, 03/11/2026

- A tela inicial desktop agora oferece ícones funcionais para Projetos, Código, Sobre, Contato e Ajustes. O primeiro scroll abre a IDE se a pessoa ainda não escolheu um app; a navegação continua disponível no topo do monitor.
- Em telas de até 760 px, a bancada WebGL é substituída por um celular em retrato com os mesmos apps. Projetos, repositórios e links de contato continuam disponíveis por toque.
- A auditoria do caminho principal não encontrou listeners de `wheel`/`touchmove` nem `preventDefault` aplicados ao scroll. O documento continua com a bancada sticky por quatro alturas de viewport. A causa provável de sensação de lentidão é o custo da cena desktop 3D; isso é uma hipótese baseada no código, não um perfil de frames medido.
- O pixel ratio máximo do renderizador desktop foi reduzido de 1,45 para 1,15. A versão mobile não inicializa Three.js.
- `npm run build`: **passou**; TypeScript, Vite (51 módulos), quatro páginas de case, sitemap e 404. Chunk principal: 331,67 kB / 102,98 kB gzip; Three.js: 568,58 kB / 143,19 kB gzip; o aviso de chunk acima de 500 kB permanece.
- `git diff --check`: **passou**.
- Prévia de produção local: **HTTP 200** para home, quatro cases, 404 e ZIP público.
- Pacote-fonte público regenerado com **91 arquivos**, incluindo a interface mobile e o QA; sem dependências, `dist` ou ZIP recursivo.
- Inspeção visual do novo estado, teste de gesto em dispositivo real e perfil de FPS: **pendentes**. A compilação e a inspeção estática não comprovam fluidez visual.
- Cloudflare Pages Production: **publicado** no projeto `portfolio-henrique-souza`. A home, quatro cases e o ZIP responderam HTTP 200 em `henriquesouzas.com` após o deploy.

## Correção — desktop de software e Explorador funcional, 03/11/2026

- Removida a cena física de Three.js: bancada, monitor, segunda tela, lâmpada, teclado, mouse, sombras e fallback de hardware. O desktop agora é uma interface própria em React/CSS.
- A IDE abre desde a entrada. O scroll nativo revela e recolhe trechos reais do código do portfólio; perto do fim, o Explorador abre automaticamente apenas se a pessoa não escolheu outro app.
- O atalho **Portfólio** abre o Explorador. A raiz lista o README e as pastas dos seis projetos; abrir uma pasta mostra o resumo e os atalhos que existem publicamente: case, produto e repositório. Busca, breadcrumb, acessos laterais, menu Iniciar, barra de tarefas e controles de janela têm ações reais.
- Removidos do projeto os componentes de cena e o pacote Three.js. A versão estreita não desenha carcaça de telefone, notch ou status fictício.
- Captura headless do estado inicial: IDE e atalhos visíveis; ajustada a posição do nome no papel de parede para que não fique por trás da janela.
- `npm run build`: **passou**; TypeScript, Vite e postbuild. 46 módulos; JavaScript principal de 303,32 kB / 91,93 kB gzip. Não há chunk de Three.js.
- `git diff --check`: **passou**. A prévia local respondeu HTTP 200 na home.
- Conferência manual de cliques do Explorador e inspeção em dispositivo físico: **pendentes**. O build confirma compilação e geração de rotas, não substitui esses passos.
- Cloudflare Pages Production: **publicado** em `https://c825d708.portfolio-henrique-souza.pages.dev` para o commit `2fdc18b2f1b6d9061d54ed1aa461b0002a323051`; `henriquesouzas.com` continua vinculado ao projeto.
- HTTP 200 confirmado no domínio e na URL do deploy para home, quatro cases e `henrique-portfolio-completo.zip`. O ZIP está sendo regenerado para incluir este registro de publicação.

## Correção: cliques na área de trabalho, 03/11/2026

- Causa encontrada: a camada transparente da janela ativa cobria a área de trabalho inteira e recebia os cliques fora da janela. A camada agora deixa o evento alcançar os atalhos da área de trabalho; a janela continua recebendo os próprios cliques.
- Navegador Edge local, viewport de 1600 × 900, entrada real de mouse via Chrome DevTools Protocol: Portfólio abriu o Explorador; a pasta Quarta é Dia de Amstel abriu; PRODUTO.url exibiu o endereço publicado; o atalho Código abriu a IDE e permitiu selecionar arquivo; minimizar/restaurar pela barra de tarefas, menu Iniciar, Ajustes, maximizar/restaurar e fechar responderam.
- npm run build: passou; TypeScript, Vite e postbuild.
- Cloudflare Pages Production: publicado no projeto `portfolio-henrique-souza` em `https://da347ac9.portfolio-henrique-souza.pages.dev`; `henriquesouzas.com` e o deploy responderam HTTP 200 para home, quatro cases e ZIP-fonte. No Edge local e no site publicado, cliques reais abriram o Explorador, o projeto Amstel e o link `https://quarta-amstel.pages.dev/`.
