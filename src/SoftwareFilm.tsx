import { useEffect, useRef, useState } from 'react';
import SoftwareScene, { type SoftwareSceneHandle } from './SoftwareScene';
import { type ScreenStage } from './WorkstationScreen';
import { playClick, playKey } from './sound';
import MobilePortfolio from './MobilePortfolio';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function stageFor(progress: number): ScreenStage {
  if (progress < 0.3) return 'ide';
  if (progress < 0.56) return 'prototype';
  if (progress < 0.82) return 'review';
  return 'desktop';
}

export default function SoftwareFilm({ soundEnabled, onSoundToggle }: { soundEnabled: boolean; onSoundToggle: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<SoftwareSceneHandle>(null);
  const progressRef = useRef(0);
  const previousStageRef = useRef<ScreenStage>('ide');
  const [stage, setStage] = useState<ScreenStage>('ide');
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
        const nextTypingStep = Math.floor(clamp01((progress - 0.035) / 0.265) * 18);
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
        sceneRef.current?.setProgress(progress);
      });
    };
    const pointer = (event: PointerEvent) => sceneRef.current?.setPointer(
      clamp01(event.clientX / Math.max(1, window.innerWidth)),
      clamp01(event.clientY / Math.max(1, window.innerHeight)),
    );
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    if (!mobileViewport) window.addEventListener('pointermove', pointer, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('pointermove', pointer);
    };
  }, [mobileViewport]);

  return <section className="software-film" id="processo" ref={rootRef} data-active={stage} aria-label="Portfólio interativo de Henrique Souza">
    <div className="film-sticky">
      {mobileViewport
        ? <MobilePortfolio progress={Number(rootRef.current?.style.getPropertyValue('--film-progress') ?? 0)} typingStep={typingStep} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/>
        : <SoftwareScene ref={sceneRef} stage={stage} typingStep={typingStep} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/>}
    </div>
    <div className="film-track" aria-hidden="true">
      <div className="film-chapter film-chapter-ide"/>
      <div className="film-chapter film-chapter-prototype"/>
      <div className="film-chapter film-chapter-review"/>
      <div className="film-chapter film-chapter-desktop"/>
    </div>
  </section>;
}
