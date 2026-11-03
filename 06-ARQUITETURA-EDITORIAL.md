# Arquitetura editorial e narrativa dos cases

**Versão:** 1.0 — revisão factual de 03/11/2026  
**Objetivo:** definir o que cada parte do portfólio precisa provar e como apresentar os seis projetos. A paleta marinho/lima/coral registrada antes foi rejeitada por Henrique como genérica e cansativa. O protótipo tinta/giz/oliva/óxido está em revisão em `02-SISTEMA-VISUAL.md`; marca e revisão visual seguem pendentes.

## A ideia central

O portfólio mostra Henrique construindo sistemas que conectam a ação de uma pessoa a uma resposta do produto: uma visita aparece para o grupo, uma campanha certa chega ao lugar, uma operação vira fluxo rastreável, ou operações de traders alimentam uma decisão simulada. O trabalho deve ser legível para quem usa a interface e para quem quer entender o que acontece atrás dela.

“Full stack” aparece em evidências encadeadas — interface, regra, serviço, dados e limite operacional — em vez de uma lista de tecnologias solta. Cada case escolhe um único mecanismo central e mostra suas consequências.

## Ordem e função na home

1. **Rota di Buteco — entrada principal.** Experiência local e social que dá rosto à abertura. O evento de 2026 encerrou; apresentar como projeto concluído, não como produto ativo.
2. **Quarta é Dia de Amstel — regra por contexto.** Contrasta com a Rota: o foco sai do grupo e passa para a prioridade resolvida no backend.
3. **Condrio — operação e ERP.** Mostra profundidade de sistema e integrações, com duas arquiteturas documentadas separadamente até confirmar a relação entre elas.
4. **MNEME — colaboração e decisão automatizada.** Mostra uma regra distribuída entre sinais, maioria e modo de execução, com crédito e limite explícitos.
5. **PULSO — laboratório em desenvolvimento.** Visibilidade menor que os projetos concluídos; mostrar proveniência e explicabilidade, sem números de operação desatualizados.
6. **TrilhaBH — laboratório pré-beta.** Continuação da exploração urbana; nunca apresentar como lançamento completo.

O título de abertura em revisão é: **“Construo produtos para gente sair pela cidade, equipes tirarem trabalho da planilha e dados virarem decisões explicáveis.”** Ele aponta para a variedade real dos projetos; não substitui um retrato mais pessoal quando Henrique revisar a voz.

## Estrutura que cada case precisa cumprir

1. **Situação:** qual atrito ou necessidade motivou o sistema.
2. **Mecanismo próprio:** o comportamento que diferencia aquele projeto.
3. **Demonstração:** uma ação curta, resultado claro e conteúdo inventado explicitamente rotulado.
4. **Sistema:** interface → regra/serviço → armazenamento ou integração, conforme evidência.
5. **Decisão e custo:** por que uma escolha foi feita e qual limite ela cria.
6. **Estado, autoria e prova:** encerrado, interno, colaboração ou desenvolvimento; link de código/documentação; produto só se estiver realmente acessível.

Não repetir o mesmo cartão de “problema / solução / tecnologia” em quatro páginas. A ordem das seções pode mudar para que cada case revele seu sistema do jeito que ele funciona.

## Case 01 — Rota di Buteco

**Ângulo:** um registro pessoal muda a experiência coletiva da cidade.  
**Título de trabalho:** “A cidade virou um jogo entre amigos.”  
**Estado:** projeto do Comida di Buteco BH 2026; evento encerrado.
**Papel visível:** desenvolvimento full stack · PWA, Firebase e mapa.

### Narrativa

Abrir pela situação: grupo quer descobrir os bares e acompanhar o roteiro durante um evento finito. Em seguida, mostrar o mapa de Belo Horizonte dividido em sete regiões; a pessoa escolhe um bar, registra uma visita e percebe a consequência no feed e no ranking do grupo. Só depois explicar que listeners do Firestore distribuíam as mudanças sem recarregar a página.

### Sistema e decisão

PWA em JavaScript com Firebase Auth, Firestore, Storage e Leaflet. O README registra 128 bares, sete regiões, check-in com foto, nove categorias de ranking, grupos por código e roteiro colaborativo. O feed em array num documento atendia ao grupo pequeno descrito; é um limite de escala, não uma otimização universal.

### Prova e limites

Prova específica: README e diagrama próprio. `https://rotadibuteco.web.app/` respondeu HTTP 200 nesta verificação. Rotular o link como produto de evento encerrado. Não inventar número de usuários, adoção, prêmio, crescimento ou uso atual. Não usar fotos de participantes sem autorização.

## Case 02 — Quarta é Dia de Amstel

**Ângulo:** uma regra geográfica escolhe qual campanha aparece.  
**Título de trabalho:** “A campanha encontra o lugar certo.”  
**Estado:** repositório público; site respondeu HTTP 200 e apresenta confirmação 18+. Não foi enviada data de nascimento.
**Papel visível:** desenvolvimento full stack · interface, Worker e D1.

### Narrativa

Começar pelo conflito de regra: campanhas podem valer para um bar, cidade, estado ou país. A pessoa ativa e desativa as camadas demonstrativas e vê a primeira regra disponível vencer. Explicar depois como o Worker centraliza essa prioridade, em vez de cada tela decidir isoladamente.

### Sistema e decisão

O código público mostra interface e painel administrativo, Cloudflare Worker e D1. A prioridade examinada no Worker é bar → cidade → estado → nacional. O comentário de cron no Wrangler não comprova agendamento ativo; notificações não devem ser chamadas de operação publicada sem confirmação.

### Prova e limites

Prova específica: trecho do Worker com a resolução de prioridade. `https://quarta-amstel.pages.dev/` respondeu HTTP 200, porém começa pelo gate de idade; o link deve dizer que há confirmação 18+. A interação do portfólio usa campanhas fictícias, anuncia que é demonstração e não chama o Worker real. Não sugerir vínculo oficial com Amstel além do próprio projeto.

## Case 03 — Condrio / Controler

**Ângulo:** fluxos de operação ganham estado, responsável e histórico; a arquitetura precisa ser descrita sem esconder a divergência do repositório.  
**Título de trabalho:** “A operação precisava de um lugar só.”  
**Estado:** sistema interno; usar apenas informação pública e dados sintéticos.
**Papel visível:** desenvolvimento do ERP · fluxos operacionais e integração full stack.

### Narrativa

Entrar pela operação entre obras, chamados, conforto, acesso e CAPEX. Demonstrar um fluxo (obra ponderada por duração ou chamado com prioridade/SLA) sem reproduzir telas internas. Depois apresentar o caminho técnico documentado no README e, em bloco próprio, registrar a API Worker encontrada no mesmo branch.

### Duas descrições verificadas, relação não confirmada

- **README / Databricks:** frontend HTML/CSS/JS, Python/FastAPI em Databricks Apps, SQL Warehouse/Delta Lake e cache em memória para leituras; escritas atualizam registros afetados. O README também documenta módulos do ERP e cálculo de avanço de obras ponderado pela duração planejada.
- **Branch `dev` / `System/worker`:** API Hono para Cloudflare Workers, D1, KV e R2, com autenticação e rotas de módulos; o cliente em `System/resources/hub/api.js` chama essa API.
- **Desconhecido:** o repositório não declara se os caminhos são etapas de migração, sistemas complementares ou se um substituiu o outro. Não apresentar ambos como uma arquitetura única, nem afirmar qual está implantado hoje.

### Prova e limites

Provas: README para o caminho Databricks; arquivos `System/worker` e cliente da API para o caminho Worker. A demonstração atual é sintética e editorial, não liga a bases ou serviços. Não expor usuários, endereços, obras, chamados, anexos ou valores. Não usar capturas reais sem saneamento e autorização.

## Case 04 — MNEME

**Ângulo:** a maioria dos traders define a direção da simulação; o sistema ainda não envia ordens reais.  
**Título de trabalho:** “A maioria aponta uma direção; a execução ainda é simulada.”  
**Crédito:** projeto de Thiago Antunes; Henrique colaborou no desenvolvimento. Não atribuir a Henrique um módulo específico sem comprovação.

### Narrativa

Apresentar o crédito antes da interação. Mostrar operações observadas, janela de taxa de acerto, maioria comprando e resultado fictício. Um segundo cenário sem maioria deixa claro por que não ocorre entrada. Explicar em texto que a saída segue os traders que formaram a entrada e que limites diários podem pausar compras. Encerrar com o estado da execução.

### Fatos e limites

O README descreve um bot de copy trading em Solana; mede taxa de acerto sobre operações fechadas nos últimos 30 dias; entrada depende da maioria de traders de alto acerto comprando na janela configurada; saída depende da maioria dos traders que formaram a entrada vendendo. Meta diária de lucro e limite de perda pausam compras até a meia-noite de Brasília. Há alertas por Telegram. A execução documentada usa preço de mercado, taxas e slippage reais, mas é simulada; execução real é etapa futura.

Prova específica: README público, com o crédito mantido. Não inventar score, porcentagem, carteira, lucro, taxa de retorno, execução real ou recomendação. A demonstração atual simula apenas dois cenários qualitativos; nenhum valor representa o desempenho do projeto.

## Laboratório

### PULSO — em desenvolvimento

**Ângulo:** transformar fonte pública em evento contextualizado, distinguindo severidade e confiança. Mostrar proveniência e horário da fonte quando dados atuais forem usados. Dado sintético deve ser rotulado; “detecção” não significa confirmação. Não elevar PULSO acima da Rota e não reutilizar contagens/estados de commits ou documentos sem captura atual.

### TrilhaBH — pré-beta

**Ângulo:** organizar uma saída em grupo como roteiro que se descobre, sugere, aprova e ordena. A demo pode ilustrar quatro paradas e o fluxo de aprovação com lugares fictícios. Apresentar como pré-beta 1.0, não lançamento completo; não mostrar posição de pessoas.

## Regras de autoria, links e demonstrações

- Rota, Quarta, Condrio, PULSO e TrilhaBH são apresentados como trabalhos de Henrique conforme a descrição do próprio portfólio e contexto fornecido por ele; não inventar percentual de contribuição ou papel formal que o repositório não declare.
- MNEME é de Thiago Antunes; Henrique colaborou. A página deve manter esse crédito próximo da demonstração e do link de repositório.
- Repositório pode ser publicado quando público. Link de produto informa o estado de acesso: a Rota é um evento encerrado; a Quarta começa com confirmação 18+. A checagem HTTP não equivale a validar o fluxo interno dos produtos.
- Cada demonstração deve conter instrução, resposta visível, botão de reinício quando houver estado e uma nota de que os dados são fictícios. Nenhuma demo do portfólio chama base ou API dos projetos.
- Uma peça de evidência pode ser captura real autorizada, diagrama que cita os arquivos fonte ou interação sintética explicitamente separada do produto. Um layout repetido não conta como prova própria.

## Checklist para a validação visual

- A Rota é reconhecida primeiro e a Quarta se distingue pela regra, não por outro mapa genérico.
- Condrio tem hierarquia legível para as duas linhas de arquitetura e deixa a incerteza explícita sem parecer um único diagrama confuso.
- MNEME não mostra score, resultados, carteira ou qualquer número fictício com aparência de dado real.
- Em cada case, a demonstração aparece depois de uma explicação curta e antes da decisão técnica; o visitante entende a ação sem narração oral.
- Os estados “encerrado”, “interno”, “em desenvolvimento”, “pré-beta” e “colaboração” são visíveis e não escondidos em rodapé.
- Desktop e mobile mantêm prova, crédito e link de código sem depender de hover.
- Revisar composição, símbolo, tipografia e a paleta provisória junto desta sequência editorial. A direção visual só fecha após a inspeção de Henrique.

## Pendências restantes

1. Confirmar com Henrique qual dos caminhos do Condrio representa o produto atualmente implantado.
2. Inspecionar visualmente a abertura e os cases em desktop, 320, 375 e 768 px; a revisão manual ainda não foi feita nesta rodada.
3. Receber material real autorizado para Rota/Quarta, se houver; os diagramas sintéticos já permitem revisar hierarquia e narrativa.
4. Henrique revisar a voz do texto de abertura e, se quiser, detalhar sua contribuição no MNEME; até lá, o crédito permanece geral.
