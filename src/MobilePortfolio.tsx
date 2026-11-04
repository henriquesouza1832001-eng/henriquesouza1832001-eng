import { useEffect, useRef, useState } from 'react';
import { projects, type Project } from './content';
import { codeFiles, sourceByFile } from './ide-source';
import PortfolioBrowser from './PortfolioBrowser';
import './mobile-portfolio.css';

type MobileApp = 'home' | 'projects' | 'browser' | 'ide' | 'about' | 'contact' | 'settings';

const apps: { id: Exclude<MobileApp, 'home'>; label: string; mark: string }[] = [
  { id: 'projects', label: 'Projetos', mark: '↗' },
  { id: 'browser', label: 'Site', mark: '⌘' },
  { id: 'ide', label: 'Código', mark: '</>' },
  { id: 'about', label: 'Sobre', mark: 'HS' },
  { id: 'contact', label: 'Contato', mark: '↗' },
  { id: 'settings', label: 'Ajustes', mark: '⌘' },
];

function ProjectApp({ project, onSelect }: { project: Project; onSelect: (key: Project['key']) => void }) {
  return <section className="mobile-projects-app" aria-label="Projetos de Henrique">
    <p className="mobile-eyebrow">TRABALHOS / LINKS PÚBLICOS</p>
    <div className="mobile-project-picker" aria-label="Selecionar projeto">
      {projects.map(item => <button type="button" key={item.key} aria-pressed={item.key === project.key} onClick={() => onSelect(item.key)}>{item.title}</button>)}
    </div>
    <div className={`mobile-project-card mobile-project-${project.key}`}>
      <span>{project.tag}</span>
      <h2>{project.title}</h2>
      <strong>{project.line}</strong>
      <p>{project.description}</p>
      <small>{project.status}</small>
    </div>
    <div className="mobile-project-links">
      {project.slug && <a href={`/projetos/${project.slug}/`}>Ler case ↗</a>}
      {project.live && <a href={project.live} target="_blank" rel="noreferrer">Abrir produto ↗</a>}
      <a href={project.repo} target="_blank" rel="noreferrer">Ver repositório ↗</a>
    </div>
  </section>;
}

function MobileIDE({ typingStep }: { typingStep: number }) {
  const [selectedFile, setSelectedFile] = useState('content.ts');
  const lines = (sourceByFile[selectedFile] ?? sourceByFile['content.ts']).split(/\r?\n/);
  const visibleCount = Math.floor((typingStep / 18) * lines.length);
  return <section className="mobile-ide-app" aria-label="IDE com código real do portfólio">
    <p className="mobile-eyebrow">IDE / CÓDIGO DO PORTFÓLIO</p>
    <div className="mobile-file-picker" aria-label="Escolher arquivo">
      {codeFiles.map(file => <button type="button" key={file} aria-pressed={selectedFile === file} onClick={() => setSelectedFile(file)}>{file}</button>)}
    </div>
    <div className="mobile-code-window"><header><span>●</span> src/{selectedFile}</header><pre><code>
      {lines.slice(0, visibleCount).map((line, index) => <span key={`${selectedFile}-${index}`}><i>{String(index + 1).padStart(2, '0')}</i>{line}</span>)}
      {visibleCount === 0 && <em>Role para acompanhar a leitura do código.</em>}
    </code></pre></div>
    <p className="mobile-hint">O conteúdo vem dos arquivos públicos deste portfólio.</p>
  </section>;
}

function MobileHome({ onOpen }: { onOpen: (app: MobileApp) => void }) {
  return <section className="mobile-home-app" aria-labelledby="mobile-home-title">
    <p className="mobile-eyebrow">TELA INICIAL / PORTFÓLIO</p>
    <h1 id="mobile-home-title">Henrique<br/><em>Souza.</em></h1>
    <p className="mobile-home-copy">Engenharia de software para cidade, operação e produto.</p>
    <nav className="mobile-app-grid" aria-label="Aplicativos">
      {apps.map(app => <button type="button" key={app.id} onClick={() => onOpen(app.id)}><span className={`mobile-app-icon mobile-icon-${app.id}`}>{app.mark}</span><strong>{app.label}</strong></button>)}
    </nav>
    <p className="mobile-hint">Toque em um app ou role para começar a construção.</p>
  </section>;
}

export default function MobilePortfolio({ progress, typingStep, soundEnabled, onSoundToggle }: { progress: number; typingStep: number; soundEnabled: boolean; onSoundToggle: () => void }) {
  const [activeApp, setActiveApp] = useState<MobileApp>('home');
  const [selectedKey, setSelectedKey] = useState<Project['key']>(projects[0].key);
  const manualChoice = useRef(false);
  const selectedProject = projects.find(project => project.key === selectedKey) ?? projects[0];

  useEffect(() => {
    if (manualChoice.current) return;
    if (progress <= .015) setActiveApp('home');
    else if (progress < .82) setActiveApp('ide');
    else setActiveApp('browser');
  }, [progress]);

  const openApp = (app: MobileApp) => {
    manualChoice.current = app !== 'home';
    setActiveApp(app);
  };

  return <div className="mobile-device-stage">
    <div className="mobile-phone" aria-label="Portfólio em um celular">
      <div className="mobile-phone-screen">
        <header className="mobile-status-bar"><span>HS / 09:41</span><span aria-label="Conectado e com bateria">● ◖</span></header>
        <div className="mobile-screen-content" data-app={activeApp}>
          {activeApp === 'home' && <MobileHome onOpen={openApp}/>}
          {activeApp === 'projects' && <ProjectApp project={selectedProject} onSelect={setSelectedKey}/>}
          {activeApp === 'browser' && <PortfolioBrowser/>}
          {activeApp === 'ide' && <MobileIDE typingStep={typingStep}/>}
          {activeApp === 'about' && <section className="mobile-info-app"><p className="mobile-eyebrow">HENRIQUE SOUZA / BH</p><h2>Sistemas para<br/><em>trabalho real.</em></h2><p>Trabalho do fluxo que a pessoa usa até os dados e serviços que sustentam o produto.</p><div className="mobile-systems-line">INTERFACE <i/> REGRAS <i/> DADOS</div><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Acompanhar no GitHub ↗</a></section>}
          {activeApp === 'contact' && <section className="mobile-info-app"><p className="mobile-eyebrow">CONTATO / BELO HORIZONTE</p><h2>Vamos tirar<br/>uma ideia<br/><em>do papel.</em></h2><p>Me conta onde o processo trava e quem precisa usar a solução.</p><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer">Conectar pelo LinkedIn ↗</a><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Ver código no GitHub ↗</a></section>}
          {activeApp === 'settings' && <section className="mobile-info-app mobile-settings"><p className="mobile-eyebrow">PREFERÊNCIAS DESTA VISITA</p><h2>Ajuste o<br/><em>ambiente.</em></h2><p>O som fica desligado até você escolher ativá-lo.</p><div className="mobile-sound-row"><span>Som da interface</span><button type="button" role="switch" aria-checked={soundEnabled} onClick={onSoundToggle}><i/><b>{soundEnabled ? 'Ligado' : 'Desligado'}</b></button></div></section>}
        </div>
        <nav className="mobile-app-dock" aria-label="Navegação do celular">
          <button type="button" className={activeApp === 'home' ? 'selected' : ''} onClick={() => openApp('home')} aria-label="Tela inicial"><span>⌂</span></button>
          {apps.slice(0, 5).map(app => <button type="button" key={app.id} className={activeApp === app.id ? 'selected' : ''} onClick={() => openApp(app.id)} aria-label={app.label}><span>{app.mark}</span></button>)}
        </nav>
      </div>
    </div>
    <p className="mobile-device-caption">HENRIQUE SOUZA · PORTFÓLIO INTERATIVO</p>
  </div>;
}
