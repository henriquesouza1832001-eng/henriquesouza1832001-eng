import { useEffect, useState } from 'react';
import { projects, type Project } from './content';
import './workstation-screen.css';

export type ScreenStage = 'ide' | 'prototype' | 'review' | 'desktop';
type ScreenApp = 'ide' | 'projects' | 'about' | 'contact';

const projectSource = [
  "export const projects: Project[] = [",
  "  { key: 'rota', title: 'Rota di Buteco',",
  "    status: 'EVENTO ENCERRADO',",
  "    line: 'A cidade virou um jogo entre amigos.',",
  "    stack: ['JavaScript', 'Firebase', 'Firestore', 'Leaflet', 'PWA'] },",
  "  { key: 'quarta', title: 'Quarta é Dia de Amstel',",
  "    status: 'REPOSITÓRIO PÚBLICO · ACESSO 18+',",
  "    stack: ['JavaScript', 'Cloudflare Workers', 'D1', 'Web Push'] },",
  '];',
];

const sourceByFile: Record<string, string[]> = {
  'content.ts': projectSource,
  'App.tsx': [
    "import { projects } from './content';",
    "import CasePage from './CasePage';",
    "import SoftwareFilm from './SoftwareFilm';",
    "const slug = window.location.pathname.match(/^\\/projetos\\/([^/]+)\\/?$/)?.[1];",
    'const caseProject = slug ? projects.find(project => project.slug === slug) : undefined;',
    '',
    '<SoftwareFilm soundEnabled={soundEnabled} onSoundToggle={toggleSound} />',
  ],
  'CasePage.tsx': [
    "import { featured, type Project } from './content';",
    "import { CondrioDemo, MnemeDemo, QuartaDemo, RotaDemo } from './Demos';",
    "import ProjectGraphic from './ProjectGraphic';",
    '',
    'const caseCopy: Record<string, { situation: string; system: string; decisionTitle: string; decision: string; limit: string; proof: string }> = {',
    '  rota: {',
    "    situation: 'Durante o Comida di Buteco BH 2026, um grupo de amigos queria descobrir bares, registrar visitas e acompanhar quem avançava pelo roteiro. O produto tinha começo e fim: precisava estar pronto para o evento.',",
  ],
  'SoftwareFilm.tsx': [
    'const progress = clamp01(scrollProgress);',
    'const nextStage = stageFor(progress);',
    '',
    'if (nextStage !== currentStage) {',
    '  setStage(nextStage);',
    '}',
    '',
    'sceneRef.current?.setProgress(progress);',
  ],
};

const icon = (name: ScreenApp) => {
  const paths: Record<ScreenApp, string> = {
    ide: 'M5 6l-4 4 4 4M11 14l4-4-4-4M9 16l2-12',
    projects: 'M2 3h12v12H2zM5 6h6M5 9h6M5 12h3',
    about: 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 15a6 6 0 0 1 12 0',
    contact: 'M2 3h12v10H7l-4 3v-3H2zM5 7h6M5 10h4',
  };
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d={paths[name]}/></svg>;
};

function WindowBar({ activeApp, onSelect, soundEnabled, onSoundToggle }: { activeApp: ScreenApp; onSelect: (app: ScreenApp) => void; soundEnabled: boolean; onSoundToggle: () => void }) {
  const tabs: { id: ScreenApp; label: string }[] = [
    { id: 'ide', label: 'Código' },
    { id: 'projects', label: 'Trabalhos' },
    { id: 'about', label: 'Sobre' },
    { id: 'contact', label: 'Contato' },
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
    <button className="ws-sound-toggle" type="button" data-sound-toggle="true" aria-pressed={soundEnabled} onClick={onSoundToggle}>{soundEnabled ? 'SOM LIGADO' : 'SOM DESLIGADO'}</button>
    <div className="ws-session"><i/>SESSÃO LOCAL</div>
  </div>;
}

function IdeWindow({ stage }: { stage: ScreenStage }) {
  const [selectedFile, setSelectedFile] = useState('content.ts');
  const copy = stage === 'ide'
    ? 'Mapear o trabalho real antes de escolher a interface.'
    : stage === 'prototype'
      ? 'Os projetos e seus estados entram no mesmo sistema.'
      : 'Cada afirmação precisa levar a uma prova pública.';
  const visibleLines = sourceByFile[selectedFile] ?? projectSource;
  return <div className={`ws-workbench ws-stage-${stage}`}>
    <aside className="ws-file-rail" aria-label="Arquivos do projeto">
      <span className="ws-rail-heading">EXPLORADOR</span>
      <span className="ws-folder">⌄ src</span>
      {['App.tsx', 'content.ts', 'ProjectPage.tsx', 'SoftwareFilm.tsx'].map(file => <button key={file} type="button" className={selectedFile === file ? 'selected' : ''} onClick={() => setSelectedFile(file)}>
        <i>{file.endsWith('.tsx') ? 'TS' : 'JS'}</i>{file}
      </button>)}
      <span className="ws-folder ws-public-folder">⌄ public</span>
      <span className="ws-static-file">favicon.svg</span>
    </aside>
    <section className="ws-editor" aria-label="Trecho de código do portfólio">
      <div className="ws-editor-tab"><span>TS</span>src/{selectedFile}<i>●</i></div>
      <div className="ws-editor-context"><span>src</span><b>›</b><span>{selectedFile}</span></div>
      <pre className="ws-code" tabIndex={0} aria-label="Código de exemplo baseado nos dados públicos dos projetos"><code>
        {visibleLines.map((line, index) => <span className="ws-code-line" key={`${selectedFile}-${index}`}><i>{String(index + 1).padStart(2, '0')}</i><b>{line}</b></span>)}
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
      <div className="ws-project-list-title"><span>MEUS PROJETOS</span><span>{projects.length}</span></div>
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

function ContactWindow() {
  return <section className="ws-contact-app" aria-labelledby="ws-contact-title">
    <p className="ws-app-kicker">BELO HORIZONTE · DISPONÍVEL PARA CONVERSAR</p>
    <h2 id="ws-contact-title">Tem um sistema<br/>que precisa sair<br/><em>do papel?</em></h2>
    <p>Me conta o que está travando e quem precisa usar a solução.</p>
    <div><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer"><span>GITHUB</span><b>Repositórios e código ↗</b></a><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>Conexão profissional ↗</b></a></div>
  </section>;
}

export default function WorkstationScreen({ stage, soundEnabled, onSoundToggle }: { stage: ScreenStage; soundEnabled: boolean; onSoundToggle: () => void }) {
  const [activeApp, setActiveApp] = useState<ScreenApp>('ide');
  useEffect(() => { setActiveApp(stage === 'desktop' ? 'projects' : 'ide'); }, [stage]);
  return <section id="workstation-screen" className="ws-screen" data-stage={stage} aria-label="Computador interativo de Henrique Souza">
    <h1 className="ws-visually-hidden">Henrique Souza — engenharia de software em Belo Horizonte</h1>
    <header className="ws-os-header"><WindowBar activeApp={activeApp} onSelect={setActiveApp} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/></header>
    <div className="ws-os-body">
      {activeApp === 'ide' && <IdeWindow stage={stage}/>} 
      {activeApp === 'projects' && <ProjectsWindow/>}
      {activeApp === 'about' && <AboutWindow/>}
      {activeApp === 'contact' && <ContactWindow/>}
    </div>
    <footer className="ws-taskbar"><span className="ws-taskbar-mark">HS</span><span>PORTFÓLIO</span><span>IDE</span><span className="ws-taskbar-end">PÁGINA EM ROLAGEM <i/></span></footer>
  </section>;
}
