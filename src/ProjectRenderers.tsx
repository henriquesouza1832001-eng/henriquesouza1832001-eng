import type { JSX } from 'react';
import type { ProjectKey } from './content';

function RotaRenderer() {
  return <div className="preview-ui rota-preview">
    <header className="preview-ui-head rota-head">
      <div className="preview-product-name"><strong>ROTA</strong><span>COMIDA DI BUTECO / BH 2026</span></div>
      <nav aria-hidden="true"><span className="is-current">MAPA</span><span>FEED</span><span>RANKING</span></nav>
      <span className="preview-user-mark" aria-hidden="true">GR</span>
    </header>
    <div className="rota-layout">
      <aside className="rota-sidebar">
        <span className="preview-eyebrow">ROTEIRO COMPARTILHADO</span>
        <h4>Rota do grupo</h4>
        <p>Escolha uma parada; a visita aparece para o grupo.</p>
        <div className="rota-counts"><div><strong>128</strong><span>BARES</span></div><div><strong>07</strong><span>REGIÕES</span></div><div><strong>09</strong><span>CATEGORIAS</span></div></div>
        <div className="rota-next-stop"><span>PRÓXIMA PARADA · EXEMPLO</span><strong>Bar selecionado</strong><small>Posição apenas ilustrativa</small></div>
        <div className="rota-feed-preview"><span>FEED DO GRUPO</span><strong>Uma visita muda o roteiro.</strong><small>Prévia editorial, sem atividade real.</small></div>
      </aside>
      <div className="rota-map-preview" aria-hidden="true">
        <span className="rota-map-label">BELO HORIZONTE / MAPA ESQUEMÁTICO</span>
        <span className="rota-district district-one">CENTRO</span><span className="rota-district district-two">LESTE</span><span className="rota-district district-three">SUL</span>
        <svg viewBox="0 0 600 360" preserveAspectRatio="none"><path className="route-map-street" d="M-20 58 156 115 302 58 433 110 624 48M-20 150 123 193 287 142 445 195 620 140M-20 280 170 225 297 300 458 250 620 302M106 -20 148 108 124 205 177 380M286 -20 300 72 285 157 317 270 292 380M475 -20 430 103 467 199 442 287 487 380"/><path className="route-map-path" d="M67 258C143 258 120 125 235 125s105 129 207 129 63-104 112-104"/></svg>
        <i className="rota-map-pin pin-a"/><i className="rota-map-pin pin-b"/><i className="rota-map-pin pin-c"/><i className="rota-map-pin pin-d"/>
        <span className="rota-map-scale">PONTOS ESQUEMÁTICOS · SEM ENDEREÇOS REAIS</span>
      </div>
    </div>
    <footer className="preview-ui-foot"><span>PWA</span><i/> <span>LEAFLET</span><i/> <span>FIRESTORE EM TEMPO REAL</span></footer>
  </div>;
}

function QuartaRenderer() {
  return <div className="preview-ui quarta-preview">
    <header className="preview-ui-head quarta-head">
      <div className="preview-product-name"><strong>QUARTA</strong><span>DESCOBERTA DE BARES</span></div>
      <span className="quarta-age-mark">18+</span>
    </header>
    <div className="quarta-interface">
      <aside className="quarta-search-panel">
        <span className="preview-eyebrow">LOCALIZAR CAMPANHA</span>
        <h4>Comece pelo bar.</h4>
        <p>O Worker procura a regra mais específica disponível para o contexto.</p>
        <div className="quarta-search-field"><span>⌕</span> Bar ou localização <i>⌄</i></div>
        <div className="quarta-context-note"><small>CONTEXTO DE BUSCA</small><strong>Estabelecimento → cidade</strong><span>Exemplo de interface · sem consulta ao serviço</span></div>
      </aside>
      <section className="quarta-rule-panel">
        <div className="quarta-rule-title"><span className="preview-eyebrow">WORKER / D1</span><small>ORDEM DE RESOLUÇÃO</small></div>
        <h4>A primeira regra aplicável vence.</h4>
        <ol className="quarta-rule-list">
          <li><span><strong>Bar</strong><small>Regra do estabelecimento</small></span><i>MAIS ESPECÍFICA</i></li>
          <li><span><strong>Cidade</strong><small>Regra municipal</small></span></li>
          <li><span><strong>Estado</strong><small>Regra estadual</small></span></li>
          <li><span><strong>Nacional</strong><small>Regra geral</small></span></li>
        </ol>
        <div className="quarta-rule-foot"><i aria-hidden="true"/><span>A campanha depende da disponibilidade configurada.</span></div>
      </section>
    </div>
    <footer className="preview-ui-foot"><span>CLOUDFLARE WORKERS</span><i/> <span>D1</span><i/> <span>PRIORIDADE CONFORME CÓDIGO PÚBLICO</span></footer>
  </div>;
}

function CondrioRenderer() {
  const modules = [
    { name: 'Obras', detail: 'Etapas · checklist · avanço por duração planejada', key: 'work' },
    { name: 'Chamados', detail: 'Prioridade · SLA · estado · histórico', key: 'calls' },
    { name: 'Conforto', detail: 'Equipamentos · preventiva · peças', key: 'comfort' },
    { name: 'CAPEX', detail: 'Documentos · análise · painel', key: 'capex' },
    { name: 'Acesso', detail: 'Pessoas · pontos · registros', key: 'access' },
  ];
  return <div className="preview-ui condrio-preview">
    <header className="preview-ui-head condrio-head">
      <div className="preview-product-name"><strong>CONDRIO</strong><span>CONTROLER / SISTEMA INTERNO</span></div>
      <span className="condrio-repo-label">REPOSITÓRIO PÚBLICO</span>
    </header>
    <div className="condrio-interface">
      <aside className="condrio-sidebar"><span className="preview-eyebrow">OPERAÇÃO</span><strong>Áreas</strong><ul><li className="selected">Visão geral</li><li>Obras</li><li>Chamados</li><li>Conforto</li><li>CAPEX</li><li>Acesso</li></ul></aside>
      <section className="condrio-modules"><div className="condrio-modules-head"><div><span className="preview-eyebrow">FLUXOS DOCUMENTADOS</span><h4>Uma operação, módulos ligados.</h4></div><span className="condrio-demo-tag">SEM DADOS INTERNOS</span></div>
        <div className="condrio-module-list">{modules.map(module => <div className={`condrio-module module-${module.key}`} key={module.key}><strong>{module.name}</strong><small>{module.detail}</small><i aria-hidden="true">↗</i></div>)}</div>
      </section>
    </div>
    <footer className="preview-ui-foot"><span>README / FASTAPI · DATABRICKS · DELTA LAKE</span><i/> <span>LINHA WORKER DOCUMENTADA EM SEPARADO</span></footer>
  </div>;
}

function MnemeRenderer() {
  return <div className="preview-ui mneme-preview">
    <header className="preview-ui-head mneme-head">
      <div className="preview-product-name"><strong>MNEME</strong><span>DECISÃO / SOLANA</span></div>
      <span className="mneme-sim-status"><i aria-hidden="true"/> MODO SIMULADO</span>
    </header>
    <div className="mneme-interface">
      <div className="mneme-window"><span className="preview-eyebrow">JANELA OBSERVADA</span><strong>30 <small>DIAS</small></strong><p>Operações encerradas dos traders elegíveis.</p><div className="mneme-window-line"><i/></div></div>
      <div className="mneme-rule-flow">
        <span className="preview-eyebrow">REGRA DOCUMENTADA NO README</span>
        <div className="mneme-flow-row"><b>ENTRADA</b><span>Maioria de compra</span><strong>→</strong><em>Simulada</em></div>
        <div className="mneme-flow-row"><b>SAÍDA</b><span>Maioria de venda entre os formadores da entrada</span><strong>→</strong><em>Simulada</em></div>
        <div className="mneme-limits"><span>LIMITES DIÁRIOS</span><strong>Novas compras pausam até meia-noite de Brasília.</strong></div>
      </div>
    </div>
    <footer className="preview-ui-foot"><span>PROJETO DE THIAGO ANTUNES</span><i/> <span>HENRIQUE / COLABORAÇÃO</span><i/> <span>SEM ORDEM REAL</span></footer>
  </div>;
}

const rendererLabels: Record<RenderedProjectKey, string> = {
  rota: 'Reconstrução da interface da Rota di Buteco com mapa esquemático, feed de grupo e dados documentados.',
  quarta: 'Reconstrução da interface da Quarta com a ordem pública de prioridade de campanha.',
  condrio: 'Reconstrução editorial do índice de módulos operacionais documentados no Condrio.',
  mneme: 'Reconstrução editorial das regras documentadas do MNEME e de seu modo simulado.',
};

type RenderedProjectKey = Extract<ProjectKey, 'rota' | 'quarta' | 'condrio' | 'mneme'>;
const renderers: Record<RenderedProjectKey, () => JSX.Element> = {
  rota: RotaRenderer,
  quarta: QuartaRenderer,
  condrio: CondrioRenderer,
  mneme: MnemeRenderer,
};

export default function ProjectRenderer({ kind }: { kind: RenderedProjectKey }) {
  const Renderer = renderers[kind];
  return <div className={`app-renderer app-ui-renderer renderer-${kind}`} role="img" aria-label={rendererLabels[kind]}><Renderer/></div>;
}
