import { useEffect, useRef, useState } from 'react';
import DesktopOS, { type ScreenStage } from './DesktopOS';
import { playClick, playKey } from './sound';
import MobilePortfolio from './MobilePortfolio';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function stageFor(progress: number): ScreenStage {
  if (progress < 0.18) return 'brief';
  if (progress < 0.36) return 'structure';
  if (progress < 0.54) return 'content';
  if (progress < 0.72) return 'interface';
  if (progress < 0.88) return 'review';
  return 'desktop';
}

const chapterCopy: Record<ScreenStage, { label: string; title: string; body: string }> = {
  brief: { label: 'Começar pelo problema', title: 'Software para o mundo real.', body: 'Antes da tela, entendo o que precisa funcionar e quem vai usar.' },
  structure: { label: 'Definir a estrutura', title: 'Primeiro, o fluxo.', body: 'Organizo páginas, navegação e estados para que cada caminho tenha um propósito.' },
  content: { label: 'Dar contexto aos dados', title: 'Cada projeto tem sua lógica.', body: 'Os projetos e seus estados vêm de conteúdo real, organizado em código que dá para abrir.' },
  interface: { label: 'Construir a interface', title: 'A tela começa a responder.', body: 'A estrutura ganha hierarquia visual, conteúdo e controles que levam a destinos reais.' },
  review: { label: 'Revisar e conectar', title: 'Tudo precisa levar a algum lugar.', body: 'Confiro seleção, navegação e links. A rolagem para cima também desfaz a construção.' },
  desktop: { label: 'Usar o resultado', title: 'Agora, explore o computador.', body: 'O navegador abre no mesmo monitor. Escolha um projeto, consulte o código e siga os links públicos.' },
};

export default function SoftwareFilm({ soundEnabled, onSoundToggle }: { soundEnabled: boolean; onSoundToggle: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const previousStageRef = useRef<ScreenStage>('brief');
  const [stage, setStage] = useState<ScreenStage>('brief');
  const [typingStep, setTypingStep] = useState(0);
  const previousTypingStepRef = useRef(0);
  const [mobileViewport, setMobileViewport] = useState(() => window.matchMedia('(max-width: 760px)').matches);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)');
    const updateViewport = () => setMobileViewport(query.matches);
    query.addEventListener('change', updateViewport);
    return () => query.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = Math.max(1, root.offsetHeight - window.innerHeight);
        const progress = clamp01(-root.getBoundingClientRect().top / range);
        const nextStage = stageFor(progress);
        const nextTypingStep = Math.floor(clamp01((progress - 0.025) / 0.825) * 30);
        if (nextStage !== previousStageRef.current) {
          if (progress > progressRef.current) playClick();
          setStage(nextStage);
          previousStageRef.current = nextStage;
        }
        if (nextTypingStep !== previousTypingStepRef.current) {
          if (nextTypingStep > previousTypingStepRef.current && nextTypingStep % 3 === 0) playKey();
          setTypingStep(nextTypingStep);
          previousTypingStepRef.current = nextTypingStep;
        }
        progressRef.current = progress;
        root.style.setProperty('--film-progress', String(progress));
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [mobileViewport]);

  const chapter = chapterCopy[stage];
  return <section className="software-film" id="processo" ref={rootRef} data-active={stage} aria-label="Portfólio interativo de Henrique Souza">
    <div className="film-sticky">
      {mobileViewport
        ? <div className="film-mobile-screen"><MobilePortfolio progress={progressRef.current} typingStep={typingStep} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/></div>
        : <div className="film-workbench">
          <div className="film-backdrop" aria-hidden="true"><svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><path d="M-80 660C170 610 206 434 388 452S602 614 764 566s237-260 444-216 302 71 486-142"/><path d="M-70 706C180 656 224 482 398 497s202 149 369 112 250-248 448-206 315 72 475-124"/><path d="M260 940c20-176 155-266 246-321s169-61 249-146 116-218 239-254 220 0 318-101"/></svg></div>
          <div className="film-editorial">
            <a className="film-brand" href="#inicio"><img src="/assets/logo-hs.png" alt="Marca de Henrique Souza"/><span>HENRIQUE SOUZA<small>ENGENHARIA DE SOFTWARE · BH</small></span></a>
            <div className="film-chapter-copy" aria-live="polite"><span>{chapter.label}</span><h1>{stage === 'brief' ? <>Software para<br/>o mundo <em>real.</em></> : chapter.title}</h1><p>{chapter.body}</p></div>
            <div className="film-progress" aria-label={`Etapa: ${chapter.label}`}><div><span>Construção do site</span><strong>{chapter.label}</strong></div><i><b style={{ width: `${Math.max(4, progressRef.current * 100)}%` }}/></i></div>
            <a className="film-scroll-cue" href="#processo" onClick={event => { event.preventDefault(); window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' }); }}>Role para acompanhar a construção <span aria-hidden="true">↓</span></a>
          </div>
          <div className="film-device" aria-label="Computador interativo de Henrique Souza">
            <div className="film-monitor-frame"><div className="film-monitor-screen"><DesktopOS progress={progressRef.current} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/></div><div className="film-monitor-bezel"><img src="/assets/logo-hs.png" alt=""/><span>HS · ENGENHARIA DE SOFTWARE</span><i aria-hidden="true"/></div></div>
            <div className="film-monitor-neck" aria-hidden="true"/><div className="film-monitor-base" aria-hidden="true"/>
          </div>
        </div>}
    </div>
    <div className="film-track" aria-hidden="true">
      <div className="film-chapter film-chapter-brief"/>
      <div className="film-chapter film-chapter-structure"/>
      <div className="film-chapter film-chapter-content"/>
      <div className="film-chapter film-chapter-interface"/>
      <div className="film-chapter film-chapter-review"/>
      <div className="film-chapter film-chapter-desktop"/>
    </div>
  </section>;
}
