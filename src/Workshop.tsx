import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { featured, type ProjectKey } from './content';
import { CondrioDemo, MnemeDemo, MnemeVoteDemo, QuartaDemo, RotaDemo } from './Demos';

type StationKey = Extract<ProjectKey, 'rota' | 'quarta' | 'condrio' | 'mneme'>;
type DemoChoice = { id: string; label: string; render: (onDone: () => void) => ReactNode };
type Station = { key: StationKey; x: number; y: number; name: string; label: string; prompt: string; demos: DemoChoice[] };

const stationContent: Record<StationKey, Pick<Station, 'name' | 'label' | 'prompt' | 'demos'>> = {
  rota: {
    name: 'MAPA SOCIAL', label: '01 / ROTA DI BUTECO', prompt: 'Faça uma visita aparecer para o grupo.',
    demos: [{ id: 'checkin', label: 'CHECK-IN', render: onDone => <RotaDemo onDone={onDone} /> }],
  },
  quarta: {
    name: 'CHAVE DE CAMPANHA', label: '02 / QUARTA É DIA DE AMSTEL', prompt: 'Descubra qual regra de campanha vence.',
    demos: [{ id: 'prioridade', label: 'PRIORIDADE', render: onDone => <QuartaDemo onDone={onDone} /> }],
  },
  condrio: {
    name: 'MESA DE OPERAÇÃO', label: '03 / CONDRIO', prompt: 'Leve uma demanda a um fluxo do ERP.',
    demos: [{ id: 'fluxo', label: 'FLUXO DO ERP', render: onDone => <CondrioDemo onDone={onDone} /> }],
  },
  mneme: {
    name: 'SALA DE DECISÃO', label: '04 / MNEME', prompt: 'Veja como uma maioria vira uma simulação.',
    demos: [
      { id: 'scenarios', label: 'A · CENÁRIOS', render: onDone => <MnemeDemo onDone={onDone} /> },
      { id: 'votes', label: 'B · MONTAR A MAIORIA', render: onDone => <MnemeVoteDemo onDone={onDone} /> },
    ],
  },
};

const stations: Station[] = [
  { key: 'rota', x: 22, y: 52, ...stationContent.rota },
  { key: 'quarta', x: 78, y: 52, ...stationContent.quarta },
  { key: 'mneme', x: 50, y: 18, ...stationContent.mneme },
  { key: 'condrio', x: 50, y: 84, ...stationContent.condrio },
];

function StationActivity({ station, onDone }: { station: Station; onDone: () => void }) {
  const [demoId, setDemoId] = useState(station.demos[0].id);
  const selected = station.demos.find(demo => demo.id === demoId) ?? station.demos[0];
  return <div className={`station-activity activity-${station.key}`}>
    <p className="demo-label">AÇÃO OPCIONAL · DADOS FICTÍCIOS · SEM CONEXÃO AO PRODUTO</p>
    {station.demos.length > 1 && <div className="station-demo-options" role="group" aria-label="Compare duas formas de demonstrar a regra do MNEME">
      {station.demos.map(demo => <button type="button" key={demo.id} aria-pressed={selected.id === demo.id} onClick={() => setDemoId(demo.id)}>{demo.label}</button>)}
    </div>}
    {selected.render(onDone)}
  </div>;
}

export default function Workshop({ onClose }: { onClose: () => void }) {
  const [position, setPosition] = useState({ x: 50, y: 52 });
  const [active, setActive] = useState<StationKey | null>(null);
  const [visited, setVisited] = useState<StationKey[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stationBackRef = useRef<HTMLButtonElement>(null);
  const returnToMap = useCallback(() => {
    setActive(null);
    window.requestAnimationFrame(() => mapRef.current?.focus());
  }, []);

  useEffect(() => { closeRef.current?.focus(); }, []);
  useEffect(() => { if (active) stationBackRef.current?.focus(); }, [active]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { if (active) returnToMap(); else onClose(); return; }
      if (active || event.altKey || event.ctrlKey || event.metaKey) return;
      const key = event.key.toLowerCase();
      const delta = key === 'arrowleft' || key === 'a' ? [-5, 0] : key === 'arrowright' || key === 'd' ? [5, 0] : key === 'arrowup' || key === 'w' ? [0, -5] : key === 'arrowdown' || key === 's' ? [0, 5] : null;
      if (delta) { event.preventDefault(); setPosition(previous => ({ x: Math.max(7, Math.min(93, previous.x + delta[0])), y: Math.max(8, Math.min(91, previous.y + delta[1])) })); }
      const focusedMap = dialogRef.current?.querySelector('.workshop-field');
      if (event.key === 'Enter' && event.target === focusedMap) {
        const nearest = [...stations].sort((a, b) => Math.hypot(a.x - position.x, a.y - position.y) - Math.hypot(b.x - position.x, b.y - position.y))[0];
        if (nearest && Math.hypot(nearest.x - position.x, nearest.y - position.y) < 16) setActive(nearest.key);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, onClose, position, returnToMap]);
  useEffect(() => {
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const scope = active ? dialogRef.current.querySelector('.station-overlay') : dialogRef.current;
      const focusables = [...(scope?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]') || [])];
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [active]);

  const station = stations.find(item => item.key === active);
  const project = featured.find(item => item.key === active);
  return <div className="workshop-shell" role="dialog" aria-modal="true" aria-label="Oficina de sistemas" ref={dialogRef} tabIndex={-1}>
    <div className="workshop-bar">
      <div className="workshop-title"><span className="workshop-dot" /> HS / OFICINA DE SISTEMAS <span className="workshop-version">v.03</span></div>
      <div className="workshop-bar-actions"><a href="/#trabalhos" onClick={onClose}>Ver lista de projetos ↗</a><button ref={closeRef} onClick={onClose} type="button">Sair ×</button></div>
    </div>
    <div className="workshop-body">
      <div className="workshop-sidebar">
        <span>PERCURSO / 01—04</span>
        <h2>Entre.<br />Mexa.<br /><em>Entenda.</em></h2>
        <p>Quatro mecânicas ligadas aos projetos em destaque. Use as setas ou escolha uma estação.</p>
        <div className="workshop-progress"><span>ESTAÇÕES EXPLORADAS</span><strong>{String(visited.length).padStart(2, '0')} <small>/ 04</small></strong></div>
        <div className="workshop-legend"><span><i /> DISPONÍVEL</span><span><i /> EXPLORADA</span></div>
      </div>
      <div className="workshop-field" ref={mapRef} role="group" tabIndex={0} aria-label="Mapa interativo. Use as setas ou WASD para mover o marcador e Enter para abrir a estação próxima.">
        <div className="field-grid" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="field-routes" aria-hidden="true">
          <path d="M50 18 C50 31 50 40 50 52 M22 52 C34 52 41 52 50 52 M50 52 C62 52 69 52 78 52 M50 52 C50 65 50 74 50 84" />
          <circle cx="50" cy="52" r="2.5" />
        </svg>
        {stations.map(item => <button type="button" key={item.key} className={`station-node station-${item.key} ${visited.includes(item.key) ? 'visited' : ''} ${active === item.key ? 'current' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => { setPosition({ x: item.x, y: item.y }); setActive(item.key); }} aria-label={`${item.label}: ${item.prompt}`}>
          <span className="node-circle">{item.label.slice(0, 2)}</span><span className="node-name">{item.name}</span>
        </button>)}
        <div className="player-marker" style={{ left: `${position.x}%`, top: `${position.y}%` }} aria-hidden="true"><span>HS</span></div>
        <div className="field-bottom"><span>↑ ↓ ← → / WASD PARA MOVER · ENTER ABRE</span><span>TOQUE NUMA ESTAÇÃO · ESC SAI</span></div>
      </div>
    </div>
    {station && project && <div className="station-overlay"><div className="station-card">
      <div className="station-card-head"><span>{station.label}</span><button ref={stationBackRef} onClick={returnToMap} type="button">Voltar ao mapa ×</button></div>
      <div className="station-card-title"><span>{station.name}</span><h2>{station.prompt}</h2></div>
      <StationActivity key={station.key} station={station} onDone={() => setVisited(previous => previous.includes(station.key) ? previous : [...previous, station.key])} />
      <div className="station-card-foot"><span>PROJETO: {project.title} · SIMULAÇÃO LOCAL</span><a href={`/projetos/${project.slug}`}>Abrir case completo ↗</a></div>
    </div></div>}
  </div>;
}