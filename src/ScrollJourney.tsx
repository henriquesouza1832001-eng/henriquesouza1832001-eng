import { useEffect, useRef, useState } from 'react';
import ProcessWorld, { type ProcessStepKey } from './ProcessWorld';
import { playScrollStep } from './sound';

type Phase = {
  key: ProcessStepKey;
  number: string;
  label: string;
  title: string;
  lead: string;
  description: string;
  action: string;
  project: string;
  proof: string;
  href?: string;
};

const phases: Phase[] = [
  {
    key: 'idea', number: '01', label: 'IDEIA', title: 'Tudo começa por uma pergunta.',
    lead: 'Onde a vida real está travando?',
    description: 'Antes de abrir o editor, procuro quem usa, o contexto e a decisão que precisa ficar mais simples. O mapa social da Rota começou num evento com bares espalhados por Belo Horizonte.',
    action: 'Eu traduzo contexto em uma pergunta de produto.', project: 'ROTA DI BUTECO / DESCOBERTA DE CAMPO',
    proof: '128 bares · 7 regiões · check-in, feed e ranking.', href: '/projetos/rota-di-buteco/',
  },
  {
    key: 'code', number: '02', label: 'CÓDIGO', title: 'A pergunta recebe estrutura.',
    lead: 'Interface é só uma parte do caminho.',
    description: 'Desenho a entrada, a regra e a resposta. Na Quarta é Dia de Amstel, a interface conversa com um Worker e D1; a prioridade de campanha é resolvida no sistema.',
    action: 'Eu conecto interface, backend e persistência.', project: 'QUARTA É DIA DE AMSTEL / WORKER + D1',
    proof: 'Bar → cidade → estado → país. A regra mais específica vence.', href: '/projetos/quarta-amstel/',
  },
  {
    key: 'refine', number: '03', label: 'REFINO', title: 'O fluxo perde o que atrapalha.',
    lead: 'Menos caminhos soltos. Mais trabalho que termina.',
    description: 'Refino a hierarquia, os estados e as dependências entre telas. No Condrio, obras, chamados, conforto, CAPEX e acesso precisavam deixar de viver em planilhas, mensagens e memória.',
    action: 'Eu organizo módulos em torno da operação.', project: 'CONDRIO / ERP INTERNO',
    proof: 'README e branch descrevem arquiteturas diferentes; implantação atual não confirmada.', href: '/projetos/condrio/',
  },
  {
    key: 'validate', number: '04', label: 'VALIDAÇÃO', title: 'A regra precisa aguentar perguntas.',
    lead: 'Quem pode fazer? O que acontece quando não pode?',
    description: 'Procuro permissões, casos de borda, fonte dos dados e limites. Se um fato não está confirmado no repositório, ele fica marcado como dúvida em vez de virar promessa visual.',
    action: 'Eu valido a evidência e exponho o limite.', project: 'CONDRIO + CADERNO DE SEGURANÇA',
    proof: 'As fontes e os limites estão apontados no registro de segurança logo acima.', href: '#seguranca',
  },
  {
    key: 'test', number: '05', label: 'TESTE', title: 'A ideia precisa responder ao toque.',
    lead: 'Mude uma regra. Veja o que ela altera.',
    description: 'A bancada reconstrói interações dos projetos com dados inventados. O estado muda na tela, mas nenhuma demonstração escreve nos produtos originais.',
    action: 'Eu torno a consequência da regra visível.', project: 'BANCADA / QUATRO FLUXOS INTERATIVOS',
    proof: 'Check-in · campanha · módulos de ERP · cenário de simulação.', href: '#experiencia',
  },
  {
    key: 'preview', number: '06', label: 'PRÉVIA', title: 'A experiência precisa fechar inteira.',
    lead: 'Conteúdo, estado e interface no mesmo quadro.',
    description: 'A prévia serve para verificar o ritmo da leitura e se a próxima ação é compreensível. No MNEME, o README descreve execução simulada; o portfólio para antes de qualquer ordem real.',
    action: 'Eu apresento o estado do produto sem esconder o estágio.', project: 'MNEME / SINAL → LIMITE → SIMULAÇÃO',
    proof: 'Projeto de Thiago Antunes. Henrique colaborou no desenvolvimento.', href: '/projetos/mneme/',
  },
  {
    key: 'ready', number: '07', label: 'PRODUTO', title: 'Pronto é quando alguém consegue seguir.',
    lead: 'Um sistema tem começo, resposta e próximo passo.',
    description: 'No fim, entrego uma experiência que explica o que resolve, como se comporta e onde continua. Abaixo estão os projetos completos, com código, evidência e papel documentado.',
    action: 'Eu levo a ideia até uma experiência navegável.', project: 'HENRIQUE SOUZA / OFICINA DE SISTEMAS',
    proof: 'Escolha um projeto e siga o caderno completo.', href: '#trabalhos',
  },
];

function ProcessPlate({ step, compact = false }: { step: ProcessStepKey; compact?: boolean }) {
  return <div className={`process-plate process-${step} ${compact ? 'process-plate-compact' : ''}`} aria-label={`Etapa do processo: ${phases.find(item => item.key === step)?.label}`} role="img">
    <div className="process-plate-mark"><span>HS / MESA DE TRABALHO</span><span>{String(phases.findIndex(item => item.key === step) + 1).padStart(2, '0')}—07</span></div>
    <svg viewBox="0 0 640 420" aria-hidden="true">
      <path className="plate-axis" d="M30 365H610M75 25V390M565 25V390"/>
      {step === 'idea' && <g className="plate-art"><path className="plate-paper" d="M170 75h287v258H170z"/><path className="plate-line" d="M205 126h190M205 158h145M205 215c44-55 59 62 105 6s55-18 88 16"/><circle className="plate-point" cx="425" cy="263" r="12"/><text x="204" y="102">NOTA / PERGUNTA</text></g>}
      {step === 'code' && <g className="plate-art"><rect className="plate-screen" x="114" y="68" width="412" height="280"/><path className="plate-topbar" d="M114 111h412"/><circle className="plate-point" cx="137" cy="90" r="5"/><circle className="plate-point secondary" cx="157" cy="90" r="5"/><path className="plate-code" d="M160 152h218M194 188h267M194 224h190M160 260h237M194 296h146"/><text x="160" y="94">ABRIR / SRC</text></g>}
      {step === 'refine' && <g className="plate-art"><rect className="plate-rough" x="78" y="105" width="190" height="204"/><rect className="plate-clean" x="374" y="76" width="190" height="250"/><path className="plate-line" d="M110 147h126M110 178h99M110 225h126M408 125h120M408 158h91M408 205h120M408 240h105M268 205h106m-22-16 18 16-18 16"/><text x="100" y="91">RASCUNHO</text><text x="395" y="62">REGRA CLARA</text></g>}
      {step === 'validate' && <g className="plate-art"><rect className="plate-screen" x="115" y="67" width="410" height="282"/><path className="plate-line" d="M190 139h255M190 198h255M190 257h255"/><circle className="plate-check" cx="157" cy="139" r="14"/><circle className="plate-check" cx="157" cy="198" r="14"/><circle className="plate-limit" cx="157" cy="257" r="14"/><text x="187" y="102">PERMISSÃO / ESTADO / LIMITE</text><text x="187" y="145">01 / QUEM PODE</text><text x="187" y="204">02 / O QUE MUDA</text><text x="187" y="263">03 / O QUE NÃO ESTÁ CONFIRMADO</text></g>}
      {step === 'test' && <g className="plate-art"><rect className="plate-screen" x="103" y="78" width="434" height="254"/><path className="plate-route" d="M148 257c50 0 48-105 115-105s68 105 126 105 60-93 103-93"/><circle className="plate-point" cx="148" cy="257" r="10"/><circle className="plate-point" cx="263" cy="152" r="10"/><circle className="plate-limit" cx="492" cy="164" r="10"/><text x="133" y="115">AÇÃO / RESPOSTA / CASO DE BORDA</text><text x="135" y="297">LOCAL · DADOS FICTÍCIOS · SEM ESCRITA NO APP</text></g>}
      {step === 'preview' && <g className="plate-art"><rect className="plate-device" x="228" y="48" width="184" height="326" rx="18"/><rect className="plate-screen" x="242" y="78" width="156" height="270"/><path className="plate-topbar" d="M242 117h156"/><path className="plate-code" d="M260 151h105M260 176h125M260 201h93"/><rect className="plate-action" x="260" y="238" width="102" height="26"/><path className="plate-line" d="M260 292h124M260 314h98"/><text x="250" y="103">PRÉVIA / FLUXO INTEIRO</text></g>}
      {step === 'ready' && <g className="plate-art"><rect className="plate-device" x="207" y="46" width="226" height="330" rx="18"/><rect className="plate-screen" x="223" y="70" width="194" height="282"/><path className="plate-topbar" d="M223 111h194"/><path className="plate-code" d="M245 144h140M245 173h111M245 198h152"/><rect className="plate-action" x="245" y="230" width="150" height="34"/><path className="plate-line" d="M245 291h152M245 317h121"/><circle className="plate-check" cx="405" cy="323" r="17"/><text x="245" y="96">APP / PRONTO PARA SEGUIR</text></g>}
    </svg>
    <div className="process-plate-foot"><span>{phases.find(item => item.key === step)?.label}</span><span>IDEIA → PRODUTO</span></div>
  </div>;
}

export default function ScrollJourney() {
  const chapters = useRef<HTMLDivElement>(null);
  const previousStep = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = phases[activeIndex]?.key ?? 'idea';

  useEffect(() => {
    const root = chapters.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const index = Number((active.target as HTMLElement).dataset.stepIndex);
      setActiveIndex(index);
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    root.querySelectorAll<HTMLElement>('[data-step-index]').forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (previousStep.current !== activeIndex) playScrollStep();
    previousStep.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const root = chapters.current;
    const layout = root?.parentElement;
    if (!root || !layout) return;
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(root.querySelectorAll<HTMLElement>('[data-step-index]'));
        const focusLine = window.innerHeight * 0.55;
        const current = items.find(item => {
          const bounds = item.getBoundingClientRect();
          return bounds.top <= focusLine && bounds.bottom >= focusLine;
        }) ?? items[Math.min(activeIndex, items.length - 1)];
        if (!current) return;
        const index = Number(current.dataset.stepIndex);
        const bounds = current.getBoundingClientRect();
        const local = Math.max(0, Math.min(1, (focusLine - bounds.top) / Math.max(1, bounds.height)));
        const progress = (index + local) / Math.max(1, items.length);
        layout.dataset.journeyProgress = progress.toFixed(4);
        current.style.setProperty('--phase-progress', String(local));
      });
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [activeIndex]);

  return <section className="scroll-journey section-wrap" id="processo" aria-labelledby="journey-title">
    <div className="section-label"><span>02 / COMO UMA IDEIA VIRA PRODUTO</span><span>ROLE PARA A CENA EVOLUIR</span></div>
    <div className="journey-heading"><h2 id="journey-title">Cada etapa<br/>deixa <em>uma marca.</em></h2><p>A cena começa como anotação e atravessa código, refinamento, validação e teste até chegar à prévia do produto. Os projetos no caminho mostram problemas que resolvi de verdade.</p></div>
    <div className={`journey-layout active-${activeStep}`}>
      <aside className="journey-stage" aria-label={`Cena interativa: etapa ${phases[activeIndex]?.label}`}>
        <div className="journey-stage-kicker"><span>HENRIQUE / PROCESSO DE PRODUTO</span><span>{String(activeIndex + 1).padStart(2, '0')} / 07</span></div>
        <div className="journey-stage-frame">
          <ProcessWorld activeStep={activeStep}/>
          <div className="journey-svg-fallback" aria-hidden="true"><ProcessPlate step={activeStep}/></div>
        </div>
        <div className="journey-stage-title"><span>{phases[activeIndex]?.label}</span><strong>{phases[activeIndex]?.project}</strong></div>
        <nav className="journey-chapter-nav" aria-label="Ir para uma etapa do processo">
          {phases.map((phase, index) => <a href={`#fase-${phase.key}`} key={phase.key} className={activeIndex === index ? 'is-active' : ''} aria-current={activeIndex === index ? 'step' : undefined}>
            <span>{phase.number}</span><i aria-hidden="true"/><b>{phase.label}</b>
          </a>)}
        </nav>
      </aside>
      <div className="journey-chapters" ref={chapters}>
        {phases.map((phase, index) => <article className={`journey-chapter phase-${phase.key}`} id={`fase-${phase.key}`} data-step-index={index} data-palette-zone={`phase-${phase.key}`} key={phase.key}>
          <div className="journey-mobile-plate"><ProcessPlate step={phase.key} compact/></div>
          <div className="chapter-heading-line"><span>{phase.number} / {phase.label}</span><span>{phase.project}</span></div>
          <h3>{phase.title}</h3>
          <p className="chapter-lead">{phase.lead}</p>
          <p className="chapter-description">{phase.description}</p>
          <div className="chapter-note"><span>{phase.action}</span><p>{phase.proof}</p></div>
          <div className="chapter-footer"><span className="phase-project">{phase.project}</span><a href={phase.href ?? '#trabalhos'}>{phase.key === 'test' ? 'Abrir bancada de teste' : phase.key === 'ready' ? 'Conhecer os projetos' : 'Ver o projeto relacionado'} <b>↗</b></a></div>
        </article>)}
      </div>
    </div>
  </section>;
}
