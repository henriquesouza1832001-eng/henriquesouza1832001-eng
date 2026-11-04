import { Fragment, useState } from 'react';
import { projects, type Project } from './content';
import './portfolio-browser.css';

const logo = '/assets/logo-hs.png';
const projectFlows: Record<Project['key'], { label: string; steps: [string, string, string] }> = {
  rota: { label: 'Roteiro em grupo', steps: ['Grupo', 'Lugares', 'Mapa'] },
  quarta: { label: 'Descoberta da campanha', steps: ['Campanha', 'Regras', 'Bares'] },
  condrio: { label: 'Fluxo da operação', steps: ['Obra', 'Chamado', 'Operação'] },
  mneme: { label: 'Leitura da estratégia', steps: ['Sinal', 'Estratégia', 'Simulado'] },
  pulso: { label: 'Contexto dos sinais', steps: ['Fontes', 'Eventos', 'Contexto'] },
  trilha: { label: 'Roteiro pela cidade', steps: ['Cidade', 'Lugares', 'Roteiro'] },
};

function ProjectLinks({ project }: { project: Project }) {
  return <div className="site-project-links">
    {project.slug && <a href={`/projetos/${project.slug}/`}>Ler o case <span aria-hidden="true">↗</span></a>}
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">Abrir o produto <span aria-hidden="true">↗</span></a>}
    <a href={project.repo} target="_blank" rel="noreferrer">Ver código no GitHub <span aria-hidden="true">↗</span></a>
  </div>;
}

function ProjectMark({ project }: { project: Project }) {
  const flow = projectFlows[project.key];
  return <div className={`site-project-art site-project-art-${project.key}`}>
    <span className="project-art-label">{flow.label}</span>
    <div className="project-flow" role="img" aria-label={`${flow.label}: ${flow.steps.join(' → ')}`}>
      {flow.steps.map((step, index) => <Fragment key={step}><span className="project-flow-step"><i aria-hidden="true"/>{step}</span>{index < flow.steps.length - 1 && <b className="project-flow-arrow" aria-hidden="true">→</b>}</Fragment>)}
    </div>
    <span className="project-art-caption">{project.line}</span>
  </div>;
}

function BuildScaffold() {
  return <div className="build-preview-blueprint" role="img" aria-label="Estrutura inicial do portfólio">
    <div className="blueprint-heading"><span>ESTRUTURA / PORTFÓLIO</span><b>LAYOUT</b></div>
    <div className="blueprint-hero">
      <div className="blueprint-rule blueprint-rule-short"/>
      <div className="blueprint-rule blueprint-rule-long"/>
      <div className="blueprint-rule blueprint-rule-mid"/>
    </div>
    <div className="blueprint-sections"><i/><i/><i/></div>
    <p>Primeiro, a estrutura. Role para acompanhar o site ganhar conteúdo.</p>
  </div>;
}

function ProjectList({ selectedKey, onSelect }: { selectedKey: Project['key']; onSelect: (key: Project['key']) => void }) {
  return <nav className="site-project-list" aria-label="Projetos públicos">
    {projects.map(project => <button key={project.key} type="button" aria-pressed={selectedKey === project.key} onClick={() => onSelect(project.key)}>
      <span className="site-project-mark" aria-hidden="true">{project.title.slice(0, 1)}</span>
      <span className="site-project-list-copy"><strong>{project.title}</strong><small>{project.line}</small></span>
      <span className="site-project-arrow" aria-hidden="true">↗</span>
    </button>)}
  </nav>;
}

export function BuildPreview({ progress, onOpenBrowser }: { progress: number; onOpenBrowser: () => void }) {
  const [selectedKey, setSelectedKey] = useState<Project['key']>('quarta');
  const selected = projects.find(project => project.key === selectedKey) ?? projects[1];
  const depth = progress < .18 ? 1 : progress < .36 ? 2 : progress < .54 ? 3 : progress < .72 ? 4 : progress < .88 ? 5 : 6;

  return <section className="build-preview" aria-label="Prévia do portfólio em construção" data-depth={depth}>
    <header className="build-preview-chrome"><span className="build-preview-dots"><i/><i/><i/></span><span>henriquesouzas.com</span><b>{depth === 6 ? 'PRONTO' : 'EM CONSTRUÇÃO'}</b></header>
    <div className="build-preview-page" data-depth={depth}>
      {depth === 1 ? <BuildScaffold/> : <>
      <header className="build-preview-nav"><img src={logo} alt=""/><span>HENRIQUE SOUZA</span><button type="button" onClick={onOpenBrowser}>Abrir site <span aria-hidden="true">↗</span></button></header>
      <div className="build-preview-content">
        <section className="build-preview-hero">
          <span>ENGENHARIA DE SOFTWARE · BELO HORIZONTE</span>
          <h2>Software para<br/>o mundo <em>real.</em></h2>
          {depth >= 2 && <p>Produto, interface e sistemas pensados a partir do trabalho que precisam resolver.</p>}
          {depth >= 3 && <a href="#projetos-na-previa" onClick={event => { event.preventDefault(); document.getElementById('projetos-na-previa')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }}>Conheça os projetos <span aria-hidden="true">↓</span></a>}
        </section>
        {depth >= 3 && <section className="build-preview-work" id="projetos-na-previa">
          <div className="build-preview-work-heading"><span>UM PROJETO EM DESTAQUE</span><button type="button" onClick={onOpenBrowser}>Explorar todos ↗</button></div>
          <div className="build-preview-feature">
            <ProjectMark project={selected}/>
            <div><small>{selected.tag}</small><h3>{selected.title}</h3><p>{selected.description}</p><a href={selected.repo} target="_blank" rel="noreferrer">Código público ↗</a></div>
          </div>
          {depth >= 4 && <ProjectList selectedKey={selectedKey} onSelect={setSelectedKey}/>}
        </section>}
        {depth >= 5 && <footer className="build-preview-footer"><span>Conteúdo e projetos públicos</span><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">GitHub ↗</a></footer>}
      </div>
      </>}
    </div>
  </section>;
}

export default function PortfolioBrowser() {
  const [selectedKey, setSelectedKey] = useState<Project['key']>('quarta');
  const selected = projects.find(project => project.key === selectedKey) ?? projects[1];

  return <div className="portfolio-browser">
    <div className="portfolio-browser-toolbar">
      <button type="button" aria-label="Voltar ao início do site" onClick={() => document.querySelector('.portfolio-browser-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })}>←</button>
      <span className="portfolio-address"><i/> henriquesouzas.com</span>
      <a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">GitHub ↗</a>
    </div>
    <main className="portfolio-browser-scroll">
      <header className="portfolio-site-nav">
        <a className="portfolio-site-brand" href="#site-inicio"><img src={logo} alt=""/><span>HENRIQUE SOUZA<small>ENGENHARIA DE SOFTWARE</small></span></a>
        <nav aria-label="Navegação do portfólio"><a href="#site-projetos">Projetos</a><a href="#site-sobre">Sobre</a><a href="#site-contato">Contato</a></nav>
      </header>
      <section className="portfolio-site-hero" id="site-inicio">
        <p>SOFTWARE · PRODUTO · SISTEMAS</p>
        <h1>Software para<br/>o mundo <em>real.</em></h1>
        <div><p>Eu transformo trabalho complexo em sistemas claros: do fluxo que a pessoa usa à lógica que mantém o produto funcionando.</p><a href="#site-projetos">Ver projetos <span aria-hidden="true">↓</span></a></div>
        <img src={logo} alt="Marca HS"/>
      </section>
      <section className="portfolio-site-projects" id="site-projetos">
        <div className="portfolio-site-section-heading"><div><span>PROJETOS PÚBLICOS</span><h2>Trabalho em uso.</h2></div><p>Produtos, sistemas e experiências digitais com seus links e repositórios.</p></div>
        <div className="portfolio-site-work-layout">
          <ProjectList selectedKey={selectedKey} onSelect={setSelectedKey}/>
          <article className="portfolio-site-feature" aria-live="polite">
            <div className="portfolio-site-feature-top"><span>{selected.tag}</span><span>{selected.status}</span></div>
            <ProjectMark project={selected}/>
            <div className="portfolio-site-feature-copy"><h3>{selected.title}</h3><p className="portfolio-site-feature-line">{selected.line}</p><p>{selected.description}</p>
              {selected.role && <p className="portfolio-site-role">{selected.role}</p>}
              <div className="portfolio-site-stack">{selected.stack.map(item => <span key={item}>{item}</span>)}</div>
              <ProjectLinks project={selected}/>
            </div>
          </article>
        </div>
      </section>
      <section className="portfolio-site-about" id="site-sobre"><span>HENRIQUE SOUZA · BELO HORIZONTE</span><h2>Do problema ao<br/><em>software em uso.</em></h2><p>Engenharia de software full stack, com atenção à experiência, às regras do produto e aos dados que sustentam cada fluxo.</p><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Acompanhar no GitHub ↗</a></section>
      <footer className="portfolio-site-contact" id="site-contato"><div><span>CONTATO</span><h2>Vamos conversar.</h2><p>Tem um sistema que precisa sair do papel? Me conte sobre o trabalho e quem precisa usar a solução.</p></div><div><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>
    </main>
  </div>;
}
