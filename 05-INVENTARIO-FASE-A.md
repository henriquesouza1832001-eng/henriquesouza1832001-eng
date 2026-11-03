# Inventário factual — seis projetos

**Revisão de conteúdo:** 03/11/2026. Repositórios públicos foram confrontados com README e arquivos de código relevantes. O inventário registra o que a fonte demonstra e separa isso de implantação, uso e autoria não confirmados. Não controla navegador nem declara validação visual desta versão.

## Como ler

- **Fonte:** README, código ou documentação pública consultada.
- **Fato:** o que essa fonte descreve ou implementa.
- **Apresentação segura:** o que o portfólio pode mostrar sem inventar resultado ou revelar dado interno.
- **Limite:** o que ainda não está comprovado e não deve ser afirmado.

## 01 — Rota di Buteco · projeto principal

**Fontes:** [README](https://github.com/henriquesouza1832001-eng/rotadibuteco/blob/master/README.md), [visitas](https://github.com/henriquesouza1832001-eng/rotadibuteco/blob/master/rotadibuteco/js/visitas.js), [ranking](https://github.com/henriquesouza1832001-eng/rotadibuteco/blob/master/rotadibuteco/js/ranking.js), [regras Firestore](https://github.com/henriquesouza1832001-eng/rotadibuteco/blob/master/firestore.rules).

- **Produto e stack:** PWA em HTML/CSS/JavaScript, Firebase Auth, Firestore, Storage, Hosting, Leaflet e Service Worker.
- **Mecânica:** mapa de 128 bares em sete regiões; check-in com foto, nota, distância, gasto e comentário; feed, categorias de ranking, grupos por código e roteiro colaborativo. O README registra uso por um grupo de amigos durante o evento.
- **Estado:** projeto de Comida di Buteco BH 2026, evento de 12/04 a 10/05/2026 já encerrado.
- **URL:** `https://rotadibuteco.web.app/` respondeu HTTP 200 e serviu uma página cujo título identifica Rota di Buteco 2026. Isso verifica disponibilidade HTTP, não uso atual nem todos os fluxos.
- **Apresentação:** manter como primeiro case; mostrar visita → Firestore/listeners → feed e grupo. Toda interação do portfólio usa dados inventados, sem conexão com Firebase real.
- **Limites:** não afirmar usuários, crescimento, adoção atual, prêmio ou impacto. Não usar foto ou dado de amigos sem autorização. O repositório contém um arquivo relacionado à assinatura de Android; não copiá-lo para o portfólio/ZIP e revisar a credencial antes de reutilizá-la.

## 02 — Quarta é Dia de Amstel

**Fontes:** [Worker](https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/worker/index.js), [schema D1](https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/worker/schema.sql), [Wrangler](https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/wrangler.toml), [interface](https://github.com/henriquesouza1832001-eng/quarta-amstel/tree/main/www), [lógica de localização](https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/www/js/location-state.js).

- **Produto e stack:** interface pública e painel administrativo; Cloudflare Worker e D1; endpoints de bares/campanhas e administração, inscrições Web Push, autenticação e permissões no código.
- **Mecânica:** `GET /bares` recebe coordenadas válidas, calcula distância e escolhe campanha conforme prioridade bar → cidade/estado → estado → nacional.
- **Estado:** repositório público. `https://quarta-amstel.pages.dev/` respondeu HTTP 200 e apresenta confirmação de idade 18–80. A checagem não enviou data de nascimento nem avançou pelo gate.
- **Apresentação:** demonstrar a prioridade com estabelecimento e campanhas inventados; explicar por que a regra específica vence. O link externo informa que exige confirmação 18+.
- **Limites:** comentários de cron não provam agendamento ativo. Não alegar que push ou painel estão em operação pública sem confirmar implantação. Não sugerir parceria oficial com a marca.

## 03 — Condrio / Controler · ERP

**Fontes:** [README na branch `dev`](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/readme.md), [Worker Hono](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/System/worker/src/index.ts), [autenticação](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/System/worker/src/auth.ts), [rotas de obras](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/System/worker/src/routes/obras.ts), [rotas de chamados](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/System/worker/src/routes/chamados.ts), [configuração Worker](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/System/worker/wrangler.jsonc), [cliente API](https://github.com/henriquesouza1832001-eng/condrio/blob/dev/System/resources/hub/api.js).

- **README / caminho Databricks:** o próprio README descreve Databricks Apps, Python/FastAPI, SQL Warehouse/Delta Lake e interface HTML/CSS/JavaScript sem framework. Também descreve cache em memória para leituras, módulos operacionais e avanço de obra ponderado pela duração planejada.
- **Código / caminho Worker:** a mesma branch contém API Hono em Cloudflare Workers, com D1, KV e R2, autenticação, tenants, permissões, auditoria e rotas de módulos. O cliente de API aponta para o Worker.
- **Relação:** documentação não esclarece se são gerações, caminhos complementares ou migração. Não os fundir numa arquitetura única nem afirmar qual está implantada hoje.
- **Apresentação:** papel visível: desenvolvimento do ERP, fluxos operacionais e integração full stack. Demonstrar avanço ponderado de obra ou chamado → prioridade/SLA → histórico com dados sintéticos. Apresentar cada arquitetura em bloco identificado.
- **Limites:** sistema interno; sem captura de usuários, endereços, obras, chamados, anexos ou valores. `condrio.pages.dev` não foi confirmado como produto disponível; não há link de produto no case.

## 04 — MNEME · colaboração

**Fontes:** [README](https://github.com/th1agx/MNEME/blob/main/README.md), [package.json](https://github.com/th1agx/MNEME/blob/main/package.json), [aplicação](https://github.com/th1agx/MNEME/tree/main/src/application), [documentação](https://github.com/th1agx/MNEME/tree/main/docs).

- **Autoria:** projeto de Thiago Antunes; Henrique informou que colaborou no desenvolvimento. Nenhum módulo específico foi atribuído publicamente a Henrique.
- **Sistema:** bot de copy trading em Solana, em TypeScript/Node.js. Lê traders, considera acerto em operações fechadas na janela dos últimos 30 dias e busca uma maioria para entrada/saída.
- **Regra descrita:** entrada pela maioria de traders elegíveis comprando na janela configurada; saída pela maioria dos participantes que formaram a entrada vendendo. Limite de lucro/perda diário pausa novas compras até meia-noite de Brasília. O README descreve alertas via Telegram.
- **Execução:** hoje é simulada com preço de mercado, taxas e slippage; execução real está descrita como etapa futura.
- **Apresentação:** mostrar operações → janela → maioria → simulação. A Oficina inclui cenário A/B e alternativa que deixa votos fictícios editáveis.
- **Limites:** não inventar score, saldo, taxa de lucro, preço, carteira, resultado ou ordem real. Toda operação e participante visual é fictício. Manter crédito junto ao resumo e à demonstração.

## 05 — PULSO · em desenvolvimento

**Fontes:** [README](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/README.md), [arquitetura](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/docs/architecture/ARCHITECTURE.md), [scoring](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/docs/SCORING.md), [Worker](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/apps/worker/src/index.ts), [mapa](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/apps/web/src/components/map/BrazilMap.tsx), [configuração](https://github.com/henriquesouza1832001-eng/Pulso/blob/main/apps/worker/wrangler.jsonc).

- **Sistema:** monorepo com web React/TypeScript/Vite, Cloudflare Worker e motor Python; dados e arquitetura mudaram ao longo dos documentos do projeto.
- **Mecânica:** fontes → normalização → agrupamento de eventos → severidade/confiança/frescor → apresentação contextual. O código separa essas dimensões e usa flags em regras de ruído/contradição.
- **Estado:** em desenvolvimento, conforme orientação de Henrique.
- **Apresentação:** manter abaixo dos quatro cases principais. Usar diagrama ou dados estáticos identificados com fonte e horário; explicitar que detecção não é confirmação.
- **Limites:** não publicar contagem de fontes, escala, métricas de execução ou estado de produção sem evidência atual revisada. Não transformar score em “risco do país” sem contexto.

## 06 — TrilhaBH · pré-beta

**Fontes:** [README](https://github.com/henriquesouza1832001-eng/trilhaBH/blob/main/README.md), [roteiros](https://github.com/henriquesouza1832001-eng/trilhaBH/blob/main/www/js/roteiro.js), [feed/ranking](https://github.com/henriquesouza1832001-eng/trilhaBH/blob/main/www/js/app.js), [mapa](https://github.com/henriquesouza1832001-eng/trilhaBH/blob/main/www/js/mapa.js).

- **Sistema:** README marca Pré-Beta 1.0; PWA e app Android/Capacitor em HTML/CSS/JS com Firebase e Leaflet.
- **Mecânica:** descoberta de lugares, roteiro em grupo, sugestões com estados pendente/aprovado/recusado, mapa, feed e ranking.
- **Apresentação:** quatro paradas fictícias; mostrar descoberta → sugestão → aprovação → ordem do roteiro. Usar como continuidade dos produtos de exploração local, não como produto completo.
- **Limites:** não exibir localização de usuário nem alegar lançamento público acabado. Link de produto não confirmado.

## Estado dos links e revisão

- Rota: HTTP 200; evento encerrado. A resposta não confirma autenticação nem fluxo de usuário.
- Quarta: HTTP 200; gate 18–80 visível; nenhuma data enviada.
- Condrio: sem link de produto confirmado.
- MNEME, PULSO e TrilhaBH: prova principal é código/README público; não alegar produto ao vivo sem checar a URL e os limites de acesso.
- A revisão visual de 30/10 citada no histórico do `QA.md` é evidência daquele build. A implementação mudou desde então e a inspeção de 320, 375, 768 px e acessibilidade está reaberta.

## Aceite factual

Os seis repositórios foram checados por README e arquivos relevantes. O texto atual mantém autoria e estados separados, não introduz métrica de resultado e explicita as limitações de Condrio e MNEME. A inspeção visual e a confirmação manual dos fluxos de produção permanecem separadas desse aceite factual.
