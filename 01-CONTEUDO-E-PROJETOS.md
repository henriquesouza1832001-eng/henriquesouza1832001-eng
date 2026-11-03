# Conteúdo editorial e prova dos projetos

## Regra editorial

Cada case responde: **situação → pessoa/uso → sistema → decisão técnica → estado atual → prova**. Captura real, diagrama e simulação têm legendas distintas. Demos do portfólio usam dados fictícios e não acessam a base original dos projetos.

As respostas devem ser verificáveis no repositório real; informação não confirmada fica marcada como **não verificada** ou é removida. Cada projeto precisa de pelo menos uma prova própria que não seja reaproveitada de outro case: link funcional, vídeo/GIF de uso real ou diagrama específico. Antes de escrever, registrar em uma frase o ângulo que diferencia o projeto do case anterior. Cobrir o nome do projeto: se a narrativa continuar servindo a qualquer case, ela ainda está genérica.

## Abertura

**Título:** Henrique Souza.  
**Linha de apoio:** Construo produtos para gente sair pela cidade, equipes tirarem trabalho da planilha e dados virarem decisões explicáveis.  
**Ações:** Ver trabalhos · Entrar na oficina.  
**Rodapé da primeira tela:** Belo Horizonte / Brasil · Produto, frontend, backend e dados.

O texto será revisto com Henrique para refletir sua voz. Evitar “apaixonado por tecnologia”, “soluções inovadoras” e outras frases intercambiáveis.

## 01 — Rota di Buteco

**Título do capítulo:** A cidade virou um jogo entre amigos.  
**Linha de abertura:** Um bar visitado mudava o mapa, o feed e a disputa do grupo.  
**Estado:** projeto do Comida di Buteco BH 2026; evento encerrado.  
**Papel no case:** desenvolvimento full stack · PWA, Firebase e mapa.  
**Produto:** `https://rotadibuteco.web.app/` respondeu HTTP 200 nesta checagem. O evento encerrou; o link fica rotulado como aplicação de evento encerrado.  
**Fonte:** [README](https://github.com/henriquesouza1832001-eng/rotadibuteco/blob/master/README.md).

### Fatos para usar

- PWA de HTML/CSS/JS, Firebase Auth, Firestore, Storage, Hosting e Leaflet.
- 128 bares em sete regiões de Belo Horizonte.
- Check-in com foto tirada na hora, nota, distância, gasto e comentário.
- Feed e nove categorias de ranking em tempo real, grupos por código e roteiro colaborativo.
- O README diz que foi usado por um grupo de amigos durante o evento.
- Leitura por `onSnapshot`; o feed em um documento/array foi uma escolha adequada à escala do grupo, com limite de escalabilidade reconhecido no próprio README.

### Sequência visual do case

1. **Problema:** evento com lugares espalhados e grupo querendo acompanhar visitas.
2. **Produto:** mapa esquemático de sete regiões; abrir uma região, escolher um bar de exemplo.
3. **Ação:** botão “Simular visita” coloca um registro fictício no feed e muda a posição do ranking de exemplo. Mostrar claramente “demonstração”.
4. **Sistema:** diagrama visita → Firestore → listeners → feed/ranking dos amigos.
5. **Decisão:** explicar por que tempo real importou e onde a modelagem do feed teria de evoluir para escala maior.
6. **Saída:** repositório e aplicação com rótulo explícito de evento encerrado; a checagem HTTP 200 não prova todos os fluxos internos.

**Não fazer:** afirmar número de usuários, crescimento, prêmios ou uso atual que o README não sustenta; usar fotos de amigos sem autorização.

## 02 — Quarta é Dia de Amstel

**Título:** A campanha encontra o lugar certo.  
**Linha de abertura:** O que a pessoa vê no mapa depende de uma regra aplicada por trás.  
**Estado:** repositório público; site respondeu HTTP 200 e começa por uma confirmação de idade 18+. Não enviar data de nascimento durante a validação.  
**Papel no case:** desenvolvimento full stack · interface, Worker e D1.  
**Produto:** `https://quarta-amstel.pages.dev/` — link rotulado para informar o gate 18+.  
**Fontes:** [Worker](https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/worker/index.js), [Wrangler](https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/wrangler.toml), [site no repositório](https://github.com/henriquesouza1832001-eng/quarta-amstel/tree/main/www).

### Fatos para usar

- Site público e painel `admin.html` no diretório `www`.
- Cloudflare Worker e banco D1 configurado.
- Rotas públicas para listar bares e obter um bar; rotas administrativas de cadastro/edição; inscrição para push.
- A seleção de campanha no Worker considera bar, cidade, estado e campanha nacional.
- Comentários no `wrangler.toml` sobre horários não provam que o cron esteja ativo; não apresentá-lo como funcionalidade publicada sem confirmar a implantação.

### Sequência visual do case

1. **Problema:** campanhas locais precisam aparecer para o estabelecimento e período adequados.
2. **Produto:** cartão de bar e campanha, com localização e estado demonstrativos.
3. **Ação:** trocar bar/cidade/estado e observar a prioridade de campanha. Dados são fictícios, regra é inspirada no código.
4. **Sistema:** interface → Worker → D1 → resposta com campanha elegível; notificações aparecem como recurso do projeto, com estado verificado.
5. **Decisão:** mostrar prioridade e fallback da regra em uma tabela curta.
6. **Saída:** código e aplicação externa; a página inicial pede confirmação de idade, então o case identifica essa barreira antes do link.

**Não fazer:** sugerir vínculo oficial de Henrique com a marca além do nome/projeto; dar como ativo algo que só aparece no código.

## 03 — Condrio / Controler

**Título:** A operação precisava de um lugar só.  
**Linha de abertura:** Planilhas, mensagens e memória viraram fluxos com estado, responsável e histórico.  
**Estado:** sistema interno; conteúdo público do README, sem dados da operação.  
**Papel no case:** desenvolvimento do ERP · fluxos operacionais e integração full stack.  
**Fonte:** [README público](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/readme.md).

### Fatos para usar

- O README da branch `dev` afirma que o sistema atual usa Databricks Apps, Python/FastAPI, SQL Warehouse/Delta Lake e frontend HTML/CSS/JS sem framework.
- A mesma branch contém uma API Hono para Cloudflare Workers com D1, KV e R2, além de um cliente que chama essa API. README e código descrevem caminhos diferentes; o estado de implantação e a relação temporal/complementar não estão confirmados. Não fundir os dois em um único diagrama nem declarar qual está em produção.
- Hub, KPI, Obras, Chamados, Conforto, portal QR, CODIN/acesso, CAPEX e Atividades documentados.
- No caminho descrito pelo README, cache em memória atende leituras e escritas atualizam registros afetados para evitar latência repetida do warehouse. Não atribuir essa estratégia ao Worker sem prova.
- Obras têm avanço físico ponderado pela duração planejada de itens, subtarefas e etapas.
- Chamados trazem prioridade, SLA, status, histórico e anexos; Conforto traz equipamentos, preventivas, corretivas, checklist e peças.

### Sequência visual do case

1. **Problema:** fluxos fragmentados; peça editorial mostrando entradas dispersas convergindo.
2. **Produto:** seletor de módulos. Cada módulo abre um fluxo sintético diferente: obra, chamado, conforto, CAPEX ou acesso.
3. **Ação:** em Obras, três itens demonstrativos com durações 1, 2 e 5 revelam como o peso muda o avanço; em Chamados, prioridade afeta prazo fictício; em Conforto, tipo de equipamento muda checklist; CAPEX e Acesso mostram estados de processo.
4. **Sistema:** apresentar em blocos separados o caminho descrito no README e a API Worker presente na branch `dev`; nomear arquivos e fonte de cada um.
5. **Decisão:** explicar o cache apenas no caminho FastAPI/warehouse; sem benchmark numérico e sem alegar deploy atual.
6. **Saída:** README e documentação pública; sem botão de produto interno. A URL antiga `condrio.pages.dev` não foi confirmada e não aparece como link de produto.

**Não fazer:** capturar sistema real, nomes, plantas, chamados ou valores financeiros sem material anonimizado e autorização explícita. Se não houver captura, o diagrama editorial já é a peça final prevista.

## 04 — MNEME

**Título:** A maioria aponta uma direção; a execução ainda é simulada.  
**Linha de abertura:** Operações recentes viram uma regra de entrada e saída que pode ser explicada sem expor carteira ou resultado.  
**Crédito visível:** Projeto de Thiago Antunes; Henrique Souza colaborou no desenvolvimento.  
**Fonte:** [README](https://github.com/th1agx/MNEME/blob/main/README.md).

### Fatos para usar

- O README descreve um bot de copy trading em Solana que acompanha traders e mede taxa de acerto em operações fechadas nos últimos 30 dias.
- A entrada considera a maioria de traders elegíveis comprando dentro da janela configurada; a saída considera a maioria dos traders que formaram a entrada vendendo.
- Meta diária de lucro e limite de perda pausam compras até a meia-noite de Brasília; o README também descreve alertas por Telegram.
- A execução documentada hoje é simulada, usando preço de mercado, taxas e slippage reais. Execução real aparece como etapa futura.
- A contribuição exata de Henrique não foi descrita. Não atribuir a ele um módulo específico.

### Sequência visual do case

1. **Problema:** observar vários traders só é útil se a regra de entrada ou saída ficar legível.
2. **Produto:** fluxo de operações → janela de acerto → maioria → simulação, com crédito antes da interação.
3. **Ação:** comparar dois cenários fictícios: maioria comprando e ausência de maioria. A resposta é entrada simulada ou nenhuma entrada.
4. **Sistema:** explicar separadamente os critérios da entrada, da saída e a execução simulada documentada.
5. **Decisão:** mostrar onde metas e limite diário interrompem novas compras, sem sugerir que o mecanismo prevê lucro.
6. **Saída:** repositório original e créditos.

**Não fazer:** prometer retorno, exibir operação financeira real, usar números fictícios como métricas do projeto.

## 05 — PULSO

**Título:** Fontes públicas, sinais com contexto.  
**Estado:** em desenvolvimento.  
**Fonte:** [README](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/README.md).

Monorepo com React/TypeScript, Cloudflare Worker/Hono, motor Python e banco SQLite/Turso conforme README. Apresentar fonte → normalização → evento → severidade/confiança → interface. Uma peça visual mostra que severidade e confiança são eixos diferentes. A prévia pública, se usada, deve ser testada. Não afirmar que um sinal é confirmação de fato.

## 06 — TrilhaBH

**Título:** A exploração continua.  
**Estado:** pré-beta 1.0.  
**Fonte:** [README](https://github.com/henriquesouza1832001-eng/trilhaBH/blob/main/README.md).

PWA e Android/Capacitor com Firebase e Leaflet; descoberta, mapa, feed, roteiros, ranking, grupos e trilhas temáticas. Mostrar como evolução da linha de exploração local, com um roteiro ilustrativo e link para código. Não vender como lançamento acabado.

## Sobre e contato

**Sobre, versão de trabalho:** “Sou Henrique, desenvolvedor em Belo Horizonte. Gosto de acompanhar uma ideia desde o primeiro gesto da pessoa até as regras, dados e infraestrutura que fazem o produto responder.”

**Provas visíveis:** [GitHub](https://github.com/henriquesouza1832001-eng) e [LinkedIn](https://www.linkedin.com/in/henrique-s-4080b9139/). Canal direto de contato fica pendente de confirmação; até lá, LinkedIn é a ação principal. Não inventar e-mail, cargo atual ou disponibilidade.

## Inventário de material

| Projeto | Material que já podemos construir | Material real opcional | Alternativa fechada |
|---|---|---|---|
| Rota | Mapa esquemático, feed/ranking de exemplo, arquitetura | Capturas do app e fotos autorizadas | Diagrama editorial completo |
| Quarta | Regra de campanha, interface sintética, arquitetura Worker/D1 | Captura apenas se a barreira puder ser atravessada com autorização e sem enviar dado pessoal | Simulação com dados fictícios e link rotulado 18+ |
| Condrio | Módulos e fluxos sintéticos, diagrama de cache | Capturas internas aprovadas | Diagrama sem captura |
| MNEME | Pipeline e dois sinais sintéticos | Assets públicos do README | Pipeline redesenhado com crédito |
| PULSO | Diagrama de proveniência | Captura atual do frontend | Diagrama conceitual |
| TrilhaBH | Roteiro ilustrativo | Captura da pré-beta | Peça gráfica de roteiro |
