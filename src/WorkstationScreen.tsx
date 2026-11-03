import { useEffect, useState } from 'react';
import { projects, type Project } from './content';
import { codeFiles, projectSource, sourceByFile } from './ide-source';
import './workstation-screen.css';

export type ScreenStage = 'ide' | 'prototype' | 'review' | 'desktop';
type ScreenApp = 'ide' | 'projects' | 'about' | 'contact' | 'settings';

const icon = (name: ScreenApp) => {
  const paths: Record<ScreenApp, string> = {
    ide: 'M5 6l-4 4 4 4M11 14l4-4-4-4M9 16l2-12',
    projects: 'M2 3h12v12H2zM5 6h6M5 9h6M5 12h3',
    about: 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 15a6 6 0 0 1 12 0',
    contact: 'M2 3h12v10H7l-4 3v-3H2zM5 7h6M5 10h4',
    settings: 'M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M12.2 3.8l-1.4 1.4M5.2 10.8l-1.4 1.4M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
  };
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d={paths[name]}/></svg>;
};

function WindowBar({ activeApp, onSelect }: { activeApp: ScreenApp; onSelect: (app: ScreenApp) => void }) {
  const tabs: { id: ScreenApp; label: string }[] = [
    { id: 'ide', label: 'Código' },
    { id: 'projects', label: 'Trabalhos' },
    { id: 'about', label: 'Sobre' },
    { id: 'contact', label: 'Contato' },
    { id: 'settings', label: 'Ajustes' },
  ];
  return <div className="ws-windowbar">
    <a className="ws-brand" href="#inicio" aria-label="Henrique Souza, início">
      <svg viewBox="0 0 72 72" aria-hidden="true"><path d="M11 55V16h21v20h28M32 36v20h29V35"/><path d="M44 36V17h17"/><circle cx="32" cy="36" r="4"/></svg>
      <span>HENRIQUE SOUZA<small>ENGENHARIA DE SOFTWARE · BH</small></span>
    </a>
    <nav className="ws-app-nav" aria-label="Aplicativos do computador">
      {tabs.map(tab => <button key={tab.id} type="button" aria-label={tab.label} aria-current={activeApp === tab.id ? 'page' : undefined} onClick={() => onSelect(tab.id)}>
        {icon(tab.id)}<span>{tab.label}</span>
      </button>)}
    </nav>
  </div>;
}

function IdeWindow({ stage, typingStep }: { stage: ScreenStage; typingStep: number }) {
  const [selectedFile, setSelectedFile] = useState('content.ts');
  const copy = stage === 'ide'
    ? 'Mapear o trabalho real antes de escolher a interface.'
    : stage === 'prototype'
      ? 'Os projetos e seus estados entram no mesmo sistema.'
      : 'Cada afirmação precisa levar a uma prova pública.';
  const visibleLines = sourceByFile[selectedFile] ?? projectSource;
  const typedLineCount = Math.floor((typingStep / 18) * visibleLines.length);
  return <div className={`ws-workbench ws-stage-${stage}`}>
    <aside className="ws-file-rail" aria-label="Arquivos do projeto">
      <span className="ws-rail-heading">EXPLORADOR</span>
      <span className="ws-folder">⌄ src</span>
      {codeFiles.map(file => <button key={file} type="button" className={selectedFile === file ? 'selected' : ''} onClick={() => setSelectedFile(file)}>
        <i>TS</i>{file}
      </button>)}
      <span className="ws-folder ws-public-folder">⌄ public</span>
      <span className="ws-static-file">favicon.svg</span>
    </aside>
    <section className="ws-editor" aria-label="Trecho de código do portfólio">
      <div className="ws-editor-tab"><span>TS</span>src/{selectedFile}<i>●</i></div>
      <div className="ws-editor-context"><span>src</span><b>›</b><span>{selectedFile}</span></div>
      <pre className="ws-code" tabIndex={0} aria-label="Código de exemplo baseado nos dados públicos dos projetos"><code>
        {visibleLines.slice(0, typedLineCount).map((line, index) => <span className="ws-code-line" key={`${selectedFile}-${index}`}><i>{String(index + 1).padStart(2, '0')}</i><b>{line}</b></span>)}
        {stage === 'review' && <span className="ws-code-note">// links e estados vêm dos projetos públicos</span>}
      </code></pre>
      <div className="ws-terminal"><div><span>TERMINAL</span><span>SAÍDA</span></div><p><b>›</b> {copy}</p><small>Conteúdo editorial · sem conexão com os serviços dos projetos</small></div>
    </section>
    <aside className="ws-live-preview" aria-label="Prévia editorial local">
      <div className="ws-preview-toolbar"><span/><span/><span/><b>PRÉVIA LOCAL</b></div>
      <div className="ws-preview-body">
        <p className="ws-preview-kicker">PROJETO EM DESTAQUE</p>
        <h2>Rota di<br/><em>Buteco.</em></h2>
        <p>A cidade vira um jogo entre amigos.</p>
        <div className="ws-route-lines"><i/><i/><i/></div>
        <span className="ws-preview-note">ESTUDO DE CONTEÚDO · EVENTO ENCERRADO</span>
      </div>
    </aside>
  </div>;
}

function ProjectDetail({ project }: { project: Project }) {
  return <article className={`ws-project-detail ws-project-${project.key}`}>
    <div className="ws-project-detail-head"><span>{project.tag}</span><span>{project.status}</span></div>
    <div className="ws-project-detail-main">
      <div className="ws-project-mark" aria-hidden="true">{project.key === 'rota' ? <svg viewBox="0 0 100 100"><path d="M18 74V20h28v30h38M46 50v30h36V48M62 50V20h20"/><circle cx="46" cy="50" r="5"/></svg> : <span>{project.title.slice(0, 1)}</span>}</div>
      <div className="ws-project-writing"><h2>{project.title}</h2><p className="ws-project-line">{project.line}</p><p>{project.description}</p>{project.role && <p className="ws-project-role">{project.role}</p>}</div>
    </div>
    <div className="ws-project-stack"><span>TECNOLOGIAS</span>{project.stack.map(item => <b key={item}>{item}</b>)}</div>
    <div className="ws-project-proof">
      {project.slug && <a href={`/projetos/${project.slug}/`}>Ler o case <span>↗</span></a>}
      {project.live && <a href={project.live} target="_blank" rel="noreferrer">Abrir projeto <span>↗</span></a>}
      <a href={project.repo} target="_blank" rel="noreferrer">Ver código no GitHub <span>↗</span></a>
    </div>
  </article>;
}

function ProjectsWindow() {
  const [selectedKey, setSelectedKey] = useState(projects[0].key);
  const selected = projects.find(project => project.key === selectedKey) ?? projects[0];
  return <div className="ws-projects-app">
    <aside className="ws-project-list" aria-label="Projetos">
      <div className="ws-project-list-title"><span>MEUS PROJETOS</span></div>
      {projects.map(project => <button key={project.key} type="button" aria-pressed={selectedKey === project.key} onClick={() => setSelectedKey(project.key)}>
        <span className={`ws-project-app-icon ws-icon-${project.key}`}>{project.key === 'rota' ? '↗' : project.title.slice(0, 1)}</span>
        <span><strong>{project.title}</strong><small>{project.status}</small></span>
      </button>)}
      <div className="ws-project-list-foot">DADOS E LINKS PÚBLICOS</div>
    </aside>
    <div className="ws-project-screen"><ProjectDetail project={selected}/></div>
  </div>;
}

function AboutWindow() {
  return <section className="ws-about-app" aria-labelledby="ws-about-title">
    <p className="ws-app-kicker">HENRIQUE SOUZA · BELO HORIZONTE, BRASIL</p>
    <h2 id="ws-about-title">Software que<br/><em>resolve trabalho.</em></h2>
    <p>Desenvolvedor de software com atuação full stack. Trabalho do fluxo que a pessoa usa até os dados e serviços que o sustentam.</p>
    <div className="ws-about-lines"><span>INTERFACE</span><i/><span>REGRA DE NEGÓCIO</span><i/><span>DADOS E SERVIÇOS</span></div>
    <a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Acompanhar meu trabalho no GitHub ↗</a>
  </section>;
}

function SettingsWindow({ soundEnabled, onSoundToggle }: { soundEnabled: boolean; onSoundToggle: () => void }) {
  return <section className="ws-settings-app" aria-labelledby="ws-settings-title">
    <p className="ws-app-kicker">PREFERÊNCIAS DESTA VISITA</p>
    <h2 id="ws-settings-title">Ajuste o<br/><em>ambiente.</em></h2>
    <p>O som da interface fica desligado até você escolher ativá-lo.</p>
    <div className="ws-setting-row">
      <div><strong>Som da interface</strong><span>Teclas e navegação</span></div>
      <button className="ws-setting-switch" type="button" role="switch" data-sound-toggle="true" aria-checked={soundEnabled} aria-label="Som da interface" onClick={onSoundToggle}>
        <i aria-hidden="true"/><b>{soundEnabled ? 'Ligado' : 'Desligado'}</b>
      </button>
    </div>
    <p className="ws-settings-note">A escolha vale enquanto esta página estiver aberta.</p>
  </section>;
}

function ContactWindow() {
  return <section className="ws-contact-app" aria-labelledby="ws-contact-title">
    <p className="ws-app-kicker">BELO HORIZONTE · DISPONÍVEL PARA CONVERSAR</p>
    <h2 id="ws-contact-title">Tem um sistema<br/>que precisa sair<br/><em>do papel?</em></h2>
    <p>Me conta o que está travando e quem precisa usar a solução.</p>
    <div><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer"><span>GITHUB</span><b>Repositórios e código ↗</b></a><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>Conexão profissional ↗</b></a></div>
  </section>;
}

export default function WorkstationScreen({ stage, typingStep, soundEnabled, onSoundToggle }: { stage: ScreenStage; typingStep: number; soundEnabled: boolean; onSoundToggle: () => void }) {
  const [activeApp, setActiveApp] = useState<ScreenApp>('ide');
  useEffect(() => { if (stage === 'desktop') setActiveApp('projects'); }, [stage]);
  return <section id="workstation-screen" className="ws-screen" data-stage={stage} aria-label="Computador interativo de Henrique Souza">
    <h1 className="ws-visually-hidden">Henrique Souza — engenharia de software em Belo Horizonte</h1>
    <header className="ws-os-header"><WindowBar activeApp={activeApp} onSelect={setActiveApp}/></header>
    <div className="ws-os-body">
      {activeApp === 'ide' && <IdeWindow stage={stage} typingStep={typingStep}/>}
      {activeApp === 'projects' && <ProjectsWindow/>}
      {activeApp === 'about' && <AboutWindow/>}
      {activeApp === 'contact' && <ContactWindow/>}
      {activeApp === 'settings' && <SettingsWindow soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/>}
    </div>
    <footer className="ws-taskbar"><span className="ws-taskbar-mark">HS</span><span>PORTFÓLIO</span><span className="ws-taskbar-end">Role para acompanhar a construção <i/></span></footer>
  </section>;
}
