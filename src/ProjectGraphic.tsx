import { useId } from 'react';
import type { ProjectKey } from './content';

const labels: Record<ProjectKey, string> = {
  rota: 'Percurso de bares com visita, grupo, feed e ranking',
  quarta: 'Regra de prioridade de campanha por bar, cidade, estado e país',
  condrio: 'Duas arquiteturas descritas separadamente no repositório Condrio',
  mneme: 'Janela de operações, maioria, limites diários e simulação',
  pulso: 'Sinais de fontes públicas passam por normalização e contexto',
  trilha: 'Roteiro de descoberta por lugares de Belo Horizonte',
};

export default function ProjectGraphic({ kind, compact = false }: { kind: ProjectKey; compact?: boolean }) {
  const patternId = `route-grid-${useId().replaceAll(':', '')}`;
  const common = {
    className: `project-drawing drawing-${kind} ${compact ? 'compact' : ''}`,
    viewBox: '0 0 600 500',
    role: 'img' as const,
    'aria-label': labels[kind],
  };

  if (kind === 'rota') return <svg {...common}>
    <defs><pattern id={patternId} width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="currentColor" opacity=".09"/></pattern></defs>
    <rect width="600" height="500" fill={`url(#${patternId})`}/>
    <path className="drawing-secondary" d="M58 355C110 339 127 273 185 272S263 330 314 255s63-141 126-128 70 71 101 11" fill="none" strokeWidth="1.5" strokeDasharray="4 8" pathLength="1"/>
    <path className="drawing-main" d="M58 355C110 339 127 273 185 272S263 330 314 255s63-141 126-128 70 71 101 11" fill="none" strokeWidth="4" strokeLinecap="round" pathLength="1"/>
    <g className="drawing-nodes"><circle cx="58" cy="355" r="11"/><circle cx="185" cy="272" r="11"/><circle cx="314" cy="255" r="11"/><circle cx="440" cy="127" r="11"/><circle cx="541" cy="138" r="11"/></g>
    <g className="drawing-labels"><text x="35" y="390">SAÍDA</text><text x="151" y="247">VISITA</text><text x="284" y="291">GRUPO</text><text x="410" y="102">FEED</text><text x="492" y="173">RANKING</text></g>
    <path className="drawing-arrow" d="M454 354h83m-14-14 14 14-14 14" fill="none" strokeWidth="3"/>
    <text className="drawing-caption" x="38" y="464">128 BARES / 07 REGIÕES / 09 CATEGORIAS</text>
  </svg>;

  if (kind === 'quarta') return <svg {...common}>
    <path className="priority-flow" d="M300 86v316" fill="none" strokeWidth="2" strokeDasharray="5 8" pathLength="1"/>
    <g className="priority-cards">
      <rect className="priority-card priority-first" x="85" y="72" width="430" height="68" rx="2"/>
      <rect className="priority-card" x="85" y="158" width="430" height="68" rx="2"/>
      <rect className="priority-card" x="85" y="244" width="430" height="68" rx="2"/>
      <rect className="priority-card" x="85" y="330" width="430" height="68" rx="2"/>
    </g>
    <g className="priority-steps"><circle cx="121" cy="106" r="16"/><circle cx="121" cy="192" r="16"/><circle cx="121" cy="278" r="16"/><circle cx="121" cy="364" r="16"/></g>
    <g className="drawing-labels priority-labels"><text x="115" y="110">1</text><text x="115" y="196">2</text><text x="115" y="282">3</text><text x="115" y="368">4</text><text x="164" y="111">BAR</text><text x="164" y="197">CIDADE</text><text x="164" y="283">ESTADO</text><text x="164" y="369">NACIONAL</text></g>
    <g className="priority-notes"><text x="393" y="111">PRIMEIRO MATCH</text><text x="395" y="197">SE NÃO HOUVER</text><text x="395" y="283">SE NÃO HOUVER</text><text x="395" y="369">ÚLTIMA CAMADA</text></g>
    <text className="drawing-caption" x="38" y="464">A PRIMEIRA REGRA APLICÁVEL ESCOLHE A CAMPANHA</text>
  </svg>;

  if (kind === 'condrio') return <svg {...common}>
    <rect className="arch-frame" x="28" y="55" width="258" height="355" rx="2"/>
    <rect className="arch-frame arch-frame-worker" x="314" y="55" width="258" height="355" rx="2"/>
    <text className="arch-title" x="48" y="87">README / FASTAPI</text>
    <text className="arch-title" x="334" y="87">BRANCH / WORKER</text>
    <g className="arch-links"><path d="M157 153v39m0 49v39m0 49v28M443 153v39m0 49v39m0 49v28" fill="none" strokeWidth="2" pathLength="1"/></g>
    <g className="arch-modules">
      <rect x="58" y="112" width="198" height="42"/><rect x="58" y="194" width="198" height="49"/><rect x="58" y="283" width="198" height="49"/><rect x="58" y="360" width="198" height="30"/>
      <rect x="344" y="112" width="198" height="42"/><rect x="344" y="194" width="198" height="49"/><rect x="344" y="283" width="198" height="49"/><rect x="344" y="360" width="198" height="30"/>
    </g>
    <g className="drawing-labels arch-labels"><text x="84" y="139">FRONTEND</text><text x="95" y="224">FASTAPI</text><text x="91" y="313">DATABRICKS</text><text x="79" y="381">DELTA LAKE</text><text x="381" y="139">API HONO</text><text x="374" y="224">CLOUDFLARE</text><text x="370" y="313">D1 · KV · R2</text><text x="387" y="381">WORKERS</text></g>
    <path className="arch-gap" d="M286 230h28" strokeWidth="2" strokeDasharray="3 4"/>
    <circle className="arch-question" cx="300" cy="230" r="15"/><text className="arch-question-mark" x="296" y="236">?</text>
    <text className="drawing-caption" x="39" y="464">DUAS LINHAS DOCUMENTADAS / RELAÇÃO NÃO CONFIRMADA</text>
  </svg>;

  if (kind === 'mneme') return <svg {...common}>
    <path className="decision-line" d="M62 231h476" fill="none" strokeWidth="2" strokeDasharray="6 8" pathLength="1"/>
    <g className="decision-gates">
      <rect x="48" y="148" width="112" height="168" rx="2"/><rect x="184" y="148" width="112" height="168" rx="2"/><rect x="320" y="148" width="112" height="168" rx="2"/><rect x="456" y="148" width="96" height="168" rx="2"/>
    </g>
    <g className="drawing-labels decision-labels"><text x="72" y="124">01 / JANELA</text><text x="210" y="124">02 / MAIORIA</text><text x="342" y="124">03 / LIMITES</text><text x="472" y="124">04 / MODO</text><text x="78" y="224">30 DIAS</text><text x="211" y="224">SINAL</text><text x="342" y="224">DIÁRIOS</text><text x="473" y="224">SIMULAÇÃO</text></g>
    <circle className="decision-signal" cx="273" cy="231" r="17"/>
    <path className="drawing-arrow" d="M480 352h56m-13-13 13 13-13 13" fill="none" strokeWidth="3"/>
    <text className="drawing-caption" x="39" y="464">PROJETO DE THIAGO ANTUNES / EXECUÇÃO DOCUMENTADA SIMULADA</text>
  </svg>;

  return <svg {...common}><text className="drawing-caption" x="37" y="475">DIAGRAMA EM PREPARAÇÃO</text></svg>;
}
