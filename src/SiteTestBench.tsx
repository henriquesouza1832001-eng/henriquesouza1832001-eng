import { featured } from './content';
import { CondrioDemo, MnemeDemo, QuartaDemo, RotaDemo } from './Demos';
import ProjectRenderer from './ProjectRenderers';

type FeaturedKey = 'rota' | 'quarta' | 'condrio' | 'mneme';

export default function SiteTestBench({ activeKey, onSelect }: { activeKey: FeaturedKey; onSelect: (key: FeaturedKey) => void }) {
  const project = featured.find(item => item.key === activeKey)!;
  return <section className="test-bench section-wrap" id="experiencia" data-palette-zone="experience" aria-labelledby="bench-title">
    <div className="section-label"><span>03 / TESTE DE FLUXOS</span><span>FLUXOS RECONSTRUÍDOS COM DADOS DE EXEMPLO</span></div>
    <div className="bench-heading"><div><span className="editorial-overline">ESCOLHA UM PROJETO · MEXA NA REGRA</span><h2 id="bench-title">Não precisa<br/>imaginar. <em>Testa.</em></h2></div><p>Pequenas reconstruções de interface para explicar uma decisão de cada projeto. Elas rodam aqui, isoladas dos sistemas originais.</p></div>
    <div className="bench-tabs" role="tablist" aria-label="Escolher projeto para experimentar" onKeyDown={event => {
      const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
      const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next]?.focus();
      tabs[next]?.click();
    }}>
      {featured.map((item, index) => <button key={item.key} type="button" role="tab" id={`bench-tab-${item.key}`} aria-controls="bench-panel" aria-selected={activeKey === item.key} tabIndex={activeKey === item.key ? 0 : -1} onClick={() => onSelect(item.key as FeaturedKey)}>
        <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><i>{activeKey === item.key ? 'ABERTO' : 'ABRIR ↗'}</i>
      </button>)}
    </div>
    <div className={`bench-panel bench-${project.key}`} id="bench-panel" role="tabpanel" aria-labelledby={`bench-tab-${project.key}`}>
      <div className="bench-panel-head"><div><span>{project.number} / {project.tag}</span><h3>{project.title}</h3></div><span className="bench-status"><i/> RECONSTRUÇÃO INTERATIVA</span></div>
      <ProjectRenderer kind={activeKey}/>
      <div className={`bench-interaction interaction-${project.key}`}>
        {activeKey === 'rota' && <RotaDemo/>}
        {activeKey === 'quarta' && <QuartaDemo/>}
        {activeKey === 'condrio' && <CondrioDemo/>}
        {activeKey === 'mneme' && <MnemeDemo/>}
      </div>
      <div className="bench-disclaimer"><span>O QUE É REAL</span><p>A lógica e os temas são extraídos da documentação pública. Os lugares, operações e conteúdos manipulados acima são fictícios e não gravam dados nos produtos.</p><a href={`/projetos/${project.slug}/`}>Ler o caderno completo <b>↗</b></a></div>
    </div>
    <div className="bench-ruler" aria-hidden="true"><span>01 / INPUT</span><i/><span>02 / REGRA</span><i/><span>03 / RESPOSTA</span></div>
  </section>;
}
