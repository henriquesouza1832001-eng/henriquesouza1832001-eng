import { useState } from 'react';

export function RotaDemo({ onDone }: { onDone?: () => void } = {}) {
  const bars = [
    { name: 'Bar da esquina', region: 'Centro', x: 28, y: 48 },
    { name: 'Mesa na praça', region: 'Leste', x: 65, y: 31 },
    { name: 'Cozinha do bairro', region: 'Sul', x: 54, y: 72 },
  ];
  const [bar, setBar] = useState(0);
  const [visits, setVisits] = useState<number[]>([]);
  const selected = bars[bar];
  const visited = visits.includes(bar);
  return <div className="demo-grid rota-demo"><div className="demo-map"><div className="demo-map-label">BH / MAPA ESQUEMÁTICO</div><svg viewBox="0 0 600 420" preserveAspectRatio="none" aria-hidden="true"><path d="M40 320 C135 260 100 100 235 145 S326 342 406 265 S490 120 570 90"/></svg>{bars.map((item, i) => <button key={item.name} className={`demo-pin ${bar === i ? 'selected' : ''} ${visits.includes(i) ? 'visited' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => setBar(i)} aria-label={`Selecionar ${item.name}`} type="button">{i + 1}</button>)}<span className="map-disclaimer">POSIÇÕES ILUSTRATIVAS · NÃO É O MAPA REAL</span></div><div className="demo-control"><span className="demo-label">DEMONSTRAÇÃO / DADOS FICTÍCIOS</span><h3>{selected.name}</h3><p>{selected.region} · Um ponto de parada para mostrar como uma visita alimentava a experiência do grupo.</p><button className="demo-action" disabled={visited} onClick={() => { setVisits(prev => [...prev, bar]); onDone?.(); }}>{visited ? 'Visita registrada ✓' : 'Simular check-in ↗'}</button><div className="demo-results"><div><small>SEU PLACAR</small><strong>{visits.length}<span> / 3</span></strong><p>bares no exemplo</p></div><div><small>FEED DO GRUPO</small><p>{visits.length ? `Você visitou ${bars[visits[visits.length - 1]].name}. O grupo veria a atualização em tempo real.` : 'Aguardando primeira visita.'}</p></div></div><button className="demo-reset" onClick={() => setVisits([])}>Reiniciar demonstração ↺</button></div></div>;
}

type Scope = 'bar' | 'cidade' | 'estado' | 'nacional';
export function QuartaDemo({ onDone }: { onDone?: () => void } = {}) {
  const [available, setAvailable] = useState<Record<Scope, boolean>>({ bar: false, cidade: true, estado: true, nacional: true });
  const scopes: { key: Scope; label: string; detail: string }[] = [
    { key: 'bar', label: '01 / BAR', detail: 'Campanha específica do estabelecimento' },
    { key: 'cidade', label: '02 / CIDADE', detail: 'Campanha da cidade' },
    { key: 'estado', label: '03 / ESTADO', detail: 'Campanha estadual' },
    { key: 'nacional', label: '04 / NACIONAL', detail: 'Campanha geral' },
  ];
  const winner = scopes.find(s => available[s.key]);
  return <div className="demo-grid quarta-demo"><div className="campaign-stack"><span className="demo-label">PRIORIDADE DA REGRA NO WORKER</span>{scopes.map(scope => <button key={scope.key} type="button" className={`campaign-rule ${winner?.key === scope.key ? 'winner' : ''}`} aria-pressed={available[scope.key]} onClick={() => { setAvailable({ ...available, [scope.key]: !available[scope.key] }); onDone?.(); }}><span>{scope.label}</span><strong>{scope.detail}</strong><em>{available[scope.key] ? 'ATIVA' : 'INATIVA'}</em></button>)}</div><div className="demo-control campaign-result"><span className="demo-label">SIMULAÇÃO / CAMPANHAS FICTÍCIAS</span><div className="campaign-orbit" aria-hidden="true"><span>◎</span></div><small>RESULTADO PARA UM BAR DE EXEMPLO</small><h3>{winner ? winner.label.split(' / ')[1] : 'SEM CAMPANHA'}</h3><p>{winner ? `A primeira regra ativa na prioridade do Worker é ${winner.detail.toLowerCase()}. Desative-a para ver o fallback.` : 'Nenhuma regra está ativa. O resultado é ausência de campanha.'}</p><span className="demo-note">Toque nas camadas para alterar a disponibilidade. O conteúdo é fictício; a ordem foi extraída do código público.</span></div></div>;
}

type ModuleKey = 'obras' | 'chamados' | 'conforto' | 'capex' | 'acesso';
export function CondrioDemo({ onDone }: { onDone?: () => void } = {}) {
  const modules: { key: ModuleKey; title: string; problem: string; flow: string[]; result: string }[] = [
    { key: 'obras', title: 'Obras', problem: 'Uma obra precisa ser decomposta antes de medir avanço.', flow: ['Obra', 'Etapa', 'Subtarefa', 'Checklist'], result: 'O avanço considera a duração planejada dos itens, não apenas a quantidade concluída.' },
    { key: 'chamados', title: 'Chamados', problem: 'Uma demanda precisa de prioridade, prazo e histórico.', flow: ['Abertura', 'Prioridade', 'SLA', 'Histórico'], result: 'O estado e o prazo acompanham a resolução do chamado.' },
    { key: 'conforto', title: 'Conforto', problem: 'Cada equipamento pede manutenção adequada ao seu tipo.', flow: ['Equipamento', 'Checklist', 'Preventiva', 'Peças'], result: 'O checklist pode seguir a unidade, o tipo ou o padrão global.' },
    { key: 'capex', title: 'CAPEX', problem: 'Documentos e valores exigem fluxo rastreável.', flow: ['Entrada', 'Arquivo', 'Análise', 'Painel'], result: 'Arquivos ficam em volume; metadados e caminho, nas tabelas do sistema.' },
    { key: 'acesso', title: 'Acesso', problem: 'Controle de entrada envolve pessoas e pontos físicos.', flow: ['Pessoa', 'Ponto', 'Regra', 'Registro'], result: 'A solicitação passa por um fluxo explícito dentro do ERP.' },
  ];
  const [active, setActive] = useState<ModuleKey>('obras');
  const [showArchitecture, setShowArchitecture] = useState(false);
  const selected = modules.find(m => m.key === active)!;
  return <div className="condrio-demo"><div className="module-selector" aria-label="Módulos do Condrio">{modules.map(m => <button key={m.key} type="button" className={active === m.key ? 'active' : ''} aria-pressed={active === m.key} onClick={() => { setActive(m.key); onDone?.(); }}>{m.title}<span>↗</span></button>)}</div><div className="module-panel"><span className="demo-label">FLUXO ILUSTRATIVO · SEM DADOS INTERNOS</span><h3>{selected.title}</h3><p>{selected.problem}</p><div className="module-flow">{selected.flow.map((step,i) => <div key={step}><small>0{i+1}</small><strong>{step}</strong></div>)}</div><p className="module-result">{selected.result}</p><button className="demo-reset" onClick={() => { setShowArchitecture(!showArchitecture); onDone?.(); }}>{showArchitecture ? 'Ocultar caminhos de arquitetura −' : 'Ver caminhos de arquitetura +'}</button>{showArchitecture && <div className="architecture"><strong>README / DATABRICKS APPS</strong><span>HTML + CSS + JS → FastAPI → cache em memória ↔ SQL Warehouse → Delta Lake</span><p>O README descreve este caminho e sua estratégia de cache. A relação com a implementação Worker abaixo não está confirmada.</p><strong>BRANCH DEV / SYSTEM-WORKER</strong><span>Hono → D1 + KV + R2</span><p>Implementação de API também presente na branch; o repositório não documenta se substitui ou complementa o caminho do README.</p></div>}</div></div>;
}

export function MnemeDemo({ onDone }: { onDone?: () => void } = {}) {
  const [signal, setSignal] = useState<'majority' | 'split'>('majority');
  const majority = signal === 'majority';
  const choose = (next: 'majority' | 'split') => { setSignal(next); onDone?.(); };
  const steps = [
    { title: 'Operações recentes', detail: 'amostra fictícia' },
    { title: 'Janela configurada', detail: 'parâmetro demonstrativo' },
      { title: 'Direção da maioria', detail: majority ? 'compra / exemplo' : 'sem maioria / exemplo' },
    { title: 'Modo', detail: majority ? 'entrada simulada' : 'sem entrada' },
  ];
  return <div className="mneme-demo"><div className="signal-picker"><span className="demo-label">CENÁRIOS DE DEMONSTRAÇÃO</span><button type="button" className={majority ? 'active' : ''} aria-pressed={majority} onClick={() => choose('majority')}><span>CENÁRIO A</span><strong>Maioria de alto acerto comprando</strong></button><button type="button" className={!majority ? 'active' : ''} aria-pressed={!majority} onClick={() => choose('split')}><span>CENÁRIO B</span><strong>Sem maioria de compra</strong></button><p>Operações, traders e janela são inventados. Não exibimos score, carteira, preço ou resultado do MNEME.</p></div><div className="signal-flow"><span className="demo-label">LEITURA RESUMIDA DA REGRA PÚBLICA</span>{steps.map((step,i) => <div key={step.title} className={`signal-step ${i === 2 && !majority ? 'muted' : ''}`}><small>0{i+1}</small><strong>{step.title}</strong><span>{step.detail}</span></div>)}<div className={`signal-verdict ${!majority ? 'reject' : ''}`}><small>RESULTADO FICTÍCIO</small><strong>{majority ? 'Condição de entrada atendida.' : 'Sem entrada nesta janela.'}</strong><p>{majority ? 'O fluxo para em simulação; nenhuma ordem é enviada.' : 'O exemplo não encontrou maioria na direção de compra.'} O projeto documenta execução simulada hoje e execução real como etapa futura.</p></div></div></div>;
}

export function MnemeVoteDemo({ onDone }: { onDone?: () => void } = {}) {
  const [buys, setBuys] = useState([true, true, false]);
  const buyCount = buys.filter(Boolean).length;
  const majority = buyCount > buys.length / 2;
  return <div className="mneme-vote-demo">
    <div className="mneme-voters" role="group" aria-label="Votos fictícios de traders de alto acerto">
      <span className="demo-label">PROTÓTIPO ALTERNATIVO · PARTICIPANTES FICTÍCIOS</span>
      {buys.map((buy, index) => <div className="mneme-voter" key={index}>
        <span>TRADER {String(index + 1).padStart(2, '0')} · EXEMPLO</span>
        <div>
          <button type="button" aria-pressed={buy} onClick={() => { setBuys(prev => prev.map((value, i) => i === index ? true : value)); onDone?.(); }}>COMPRA</button>
          <button type="button" aria-pressed={!buy} onClick={() => { setBuys(prev => prev.map((value, i) => i === index ? false : value)); onDone?.(); }}>VENDA</button>
        </div>
      </div>)}
      <p>Os três participantes e seus votos são inventados; a demonstração não mostra taxa, score, token nem desempenho real.</p>
    </div>
    <div className={`mneme-vote-result ${majority ? 'has-majority' : ''}`} aria-live="polite">
      <span className="demo-label">RESUMO DO EXEMPLO</span>
      <strong>{buyCount} de {buys.length}</strong>
      <p>{majority ? 'Maioria comprando · entrada simulada.' : 'Sem maioria de compra · nenhuma entrada.'}</p>
      <small>A regra pública descreve execução simulada hoje; nenhuma ordem é enviada por esta página.</small>
    </div>
  </div>;
}
