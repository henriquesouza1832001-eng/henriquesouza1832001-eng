import { useState } from 'react';
import { projects, type Project, type ProjectKey } from './content';
import ProjectRenderer from './ProjectRenderers';
import './portfolio-computer.css';

export type ComputerView = 'projects' | 'contact';
type RenderedKey = Extract<ProjectKey, 'rota' | 'quarta' | 'condrio' | 'mneme'>;
const featuredKeys: RenderedKey[] = ['rota', 'quarta', 'condrio', 'mneme'];

function ProjectLinks({ project }: { project: Project }) {
  return <div className="pc-project-links">
    {project.slug && <a href={`/projetos/${project.slug}/`}>Ler case <span>↗</span></a>}
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">{project.liveLabel ?? 'Abrir aplicação ↗'} <span>↗</span></a>}
    <a href={project.repo} target="_blank" rel="noreferrer">Repositório <span>↗</span></a>
  </div>;
}

function ProjectApp({ project }: { project: Project }) {
  const canRender = featuredKeys.includes(project.key as RenderedKey);
  return <div className={`pc-project-app pc-project-${project.key}`}>
    <div className="pc-project-heading"><span>{project.tag}</span><span>{project.status}</span></div>
    <div className="pc-project-view">
      <div className="pc-project-preview">
        {canRender
          ? <ProjectRenderer kind={project.key as RenderedKey}/>
          : <div className="pc-project-in-progress"><span>{project.number} / EM ANDAMENTO</span><strong>{project.title}</strong><p>{project.description}</p><a href={project.repo} target="_blank" rel="noreferrer">Acompanhar no repositório ↗</a></div>}
      </div>
      <div className="pc-project-copy">
        <h2>{project.title}</h2>
        <p className="pc-project-line">{project.line}</p>
        <p className="pc-project-description">{project.description}</p>
        {project.role && <p className="pc-project-role">{project.role}</p>}
        <div className="pc-project-stack"><span>STACK</span>{project.stack.map(item => <b key={item}>{item}</b>)}</div>
        <ProjectLinks project={project}/>
      </div>
    </div>
  </div>;
}

function ContactApp() {
  return <div className="pc-contact-app">
    <p className="pc-app-kicker">HENRIQUE SOUZA / BELO HORIZONTE</p>
    <h2>Vamos tirar<br/>uma ideia<br/><em>do papel.</em></h2>
    <p className="pc-contact-note">Desenvolvimento full stack, produto digital e sistemas que organizam trabalho real.</p>
    <div className="pc-contact-links">
      <a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Conectar profissionalmente ↗</strong></a>
      <a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer"><span>GITHUB</span><strong>Ver código e repositórios ↗</strong></a>
    </div>
  </div>;
}

export default function PortfolioComputer({ onOpenIDE, view, onViewChange }: { onOpenIDE: () => void; view: ComputerView; onViewChange: (view: ComputerView) => void }) {
  const [selectedKey, setSelectedKey] = useState<ProjectKey>('rota');
  const selectedProject = projects.find(project => project.key === selectedKey) ?? projects[0];

  return <section className="computer-portal" id="pc-final" aria-labelledby="computer-portal-title">
    <div className="computer-portal-heading">
      <p>FIM DA CONSTRUÇÃO / SESSÃO DISPONÍVEL</p>
      <h2 id="computer-portal-title">Agora o computador<br/><em>fica com você.</em></h2>
      <span>Abra os projetos, explore o código ou encontre meus contatos.</span>
    </div>
    <div className="computer-device">
      <div className="computer-screen-shell">
        <div className="computer-browser-chrome">
          <span className="computer-window-lights"><i/><i/><i/></span>
          <div className="computer-browser-address"><span>⌕</span>{view === 'projects' ? `henriquesouza.com/projetos/${selectedProject.slug ?? selectedProject.key}` : 'henriquesouza.com/contato'}</div>
          <span className="computer-session">SESSÃO LOCAL</span>
        </div>
        <div className="computer-appbar" role="group" aria-label="Aplicativos do computador">
          <button type="button" aria-pressed={view === 'projects'} onClick={() => onViewChange('projects')}><span>▤</span> PORTFÓLIO</button>
          <button type="button" onClick={onOpenIDE}><span>⌘</span> IDE / MEXER NO CÓDIGO</button>
          <button type="button" aria-pressed={view === 'contact'} onClick={() => onViewChange('contact')}><span>✉</span> CONTATO</button>
        </div>
        {view === 'projects' ? <div className="computer-browser-page">
          <nav className="computer-project-nav" aria-label="Projetos">
            <div className="computer-project-nav-title"><span>APLICATIVOS</span><span>06</span></div>
            {projects.map(project => <button type="button" key={project.key} className={selectedKey === project.key ? 'selected' : ''} onClick={() => setSelectedKey(project.key)}>
              <span className="computer-project-icon">{project.key === 'rota' ? '↗' : project.key === 'quarta' ? 'Q' : project.key === 'condrio' ? 'C' : project.key === 'mneme' ? 'M' : project.key === 'pulso' ? 'P' : 'T'}</span>
              <span><strong>{project.title}</strong><small>{project.status}</small></span>
            </button>)}
            <div className="computer-project-nav-foot">PROJETOS / REPOSITÓRIOS PÚBLICOS</div>
          </nav>
          <main className="computer-project-content"><ProjectApp project={selectedProject}/></main>
        </div> : <ContactApp/>}
      </div>
      <div className="computer-frame-caption"><span>HS / OFICINA DE SISTEMAS</span><span>PORTFÓLIO INTERATIVO · 2026</span></div>
      <div className="computer-stand" aria-hidden="true"><i/></div>
    </div>
    <div className="computer-portal-foot"><span>HENRIQUE SOUZA · DESENVOLVIMENTO FULL STACK · BELO HORIZONTE</span><a href="#processo">VOLTAR À CONSTRUÇÃO ↑</a></div>
  </section>;
}
