import { useEffect, useRef, useState, type ReactNode } from 'react';
import { projects, type Project, type ProjectKey } from './content';
import { codeFiles, sourceByFile } from './ide-source';
import './desktop-os.css';

export type ScreenStage = 'ide' | 'prototype' | 'review' | 'desktop';
type WindowId = 'explorer' | 'code' | 'about' | 'contact' | 'settings';
type ExplorerLocation = 'root' | ProjectKey;
type ExplorerFileKind = 'readme' | 'case' | 'repo' | 'product';
type FileSelection = { location: ExplorerLocation; kind: ExplorerFileKind } | null;

const windowLabels: Record<WindowId, string> = {
  explorer: 'Portfólio', code: 'Código', about: 'Sobre', contact: 'Contato', settings: 'Ajustes',
};

function Mark({ type }: { type: 'folder' | 'document' | 'code' | 'person' | 'mail' | 'settings' | 'start' }) {
  const paths = {
    folder: <><path d="M2 4.2h4.4l1.5 1.6H14v6.5H2z"/><path d="M2 6h12"/></>,
    document: <><path d="M4 1.8h5l3 3v9.4H4z"/><path d="M9 1.8v3h3M6 8h4M6 10.5h4"/></>,
    code: <><path d="m5.5 4-4 4 4 4M10.5 4l4 4-4 4M9 2.5l-2 11"/></>,
    person: <><circle cx="8" cy="5" r="2.5"/><path d="M2.5 14c.4-3 2.2-4.5 5.5-4.5s5.1 1.5 5.5 4.5"/></>,
    mail: <><rect x="1.5" y="3" width="13" height="10" rx="1"/><path d="m2 4 6 4.8L14 4"/></>,
    settings: <><circle cx="8" cy="8" r="2.5"/><path d="M8 1.5v2m0 9v2m6.5-6.5h-2m-9 0h-2m11.1-4.6-1.4 1.4m-6.4 6.4-1.4 1.4m9.2 0-1.4-1.4m-6.4-6.4L3.4 3.4"/></>,
    start: <><path d="M1.5 1.5h5.4v5.4H1.5zM9.1 1.5h5.4v5.4H9.1zM1.5 9.1h5.4v5.4H1.5zM9.1 9.1h5.4v5.4H9.1z"/></>,
  };
  return <svg className={`os-mark os-mark-${type}`} viewBox="0 0 16 16" aria-hidden="true">{paths[type]}</svg>;
}

function WindowIcon({ id }: { id: WindowId }) {
  return <Mark type={id === 'explorer' ? 'folder' : id === 'code' ? 'code' : id === 'about' ? 'person' : id === 'contact' ? 'mail' : 'settings'}/>;
}

function DesktopShortcut({ id, label, onOpen }: { id: WindowId; label: string; onOpen: (id: WindowId) => void }) {
  return <button className={`desktop-shortcut shortcut-${id}`} type="button" onClick={() => onOpen(id)}>
    <span className="desktop-shortcut-icon"><WindowIcon id={id}/></span><span>{label}</span>
  </button>;
}

function WindowFrame({ id, active, maximized, onClose, onMinimize, onMaximize, children }: {
  id: WindowId; active: boolean; maximized: boolean; onClose: () => void; onMinimize: () => void; onMaximize: () => void; children: ReactNode;
}) {
  return <section className={`os-window os-window-${id} ${maximized ? 'is-maximized' : ''}`} role="dialog" aria-label={windowLabels[id]} aria-hidden={!active}>
    <header className="os-window-titlebar">
      <span className="os-window-appicon"><WindowIcon id={id}/></span>
      <strong>{id === 'explorer' ? 'Explorador de Arquivos' : id === 'code' ? 'Visual Studio Code · Portfólio' : windowLabels[id]}</strong>
      <div className="os-window-controls">
        <button type="button" aria-label="Minimizar janela" onClick={onMinimize}><i className="os-minimize"/></button>
        <button type="button" aria-label={maximized ? 'Restaurar janela' : 'Maximizar janela'} onClick={onMaximize}><i className={maximized ? 'os-restore' : 'os-maximize'}/></button>
        <button type="button" aria-label="Fechar janela" onClick={onClose}><i className="os-close"/></button>
      </div>
    </header>
    {children}
  </section>;
}

function ProjectLinks({ project, kind }: { project: Project; kind?: ExplorerFileKind }) {
  return <div className="explorer-preview-links">
    {(!kind || kind === 'case') && project.slug && <a href={`/projetos/${project.slug}/`}>Abrir case <span>↗</span></a>}
    {(!kind || kind === 'product') && project.live && <a href={project.live} target="_blank" rel="noreferrer">Abrir produto <span>↗</span></a>}
    {(!kind || kind === 'repo') && <a href={project.repo} target="_blank" rel="noreferrer">Abrir no GitHub <span>↗</span></a>}
  </div>;
}

const codeTokenPattern = /(\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|return|if|else|import|from|export|default|type|interface|function|async|await|new|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b)/g;
const codeKeywords = new Set(['const', 'let', 'return', 'if', 'else', 'import', 'from', 'export', 'default', 'type', 'interface', 'function', 'async', 'await', 'new', 'true', 'false', 'null', 'undefined']);

function CodeLineText({ line }: { line: string }) {
  return <>{line.split(codeTokenPattern).map((token, index) => {
    if (!token) return null;
    const className = token.startsWith('//') ? 'code-token-comment'
      : token.startsWith('"') || token.startsWith("'") || token.startsWith('`') ? 'code-token-string'
      : /^\d/.test(token) ? 'code-token-number'
      : codeKeywords.has(token) ? 'code-token-keyword' : undefined;
    return className ? <span key={index} className={className}>{token}</span> : token;
  })}</>;
}

function ExplorerWindow({ location, selected, onSelect, onOpenFolder, onGoHome }: {
  location: ExplorerLocation;
  selected: FileSelection;
  onSelect: (file: FileSelection) => void;
  onOpenFolder: (key: ProjectKey) => void;
  onGoHome: () => void;
}) {
  const [query, setQuery] = useState('');
  useEffect(() => setQuery(''), [location]);
  const selectedProject = location === 'root' ? undefined : projects.find(project => project.key === location);
  const currentFile = selected?.location === location ? selected.kind : null;
  const folderItems = selectedProject ? [
    { kind: 'readme' as const, name: 'LEIA-ME.md', type: 'Documento Markdown', status: 'Resumo do projeto' },
    ...(selectedProject.slug ? [{ kind: 'case' as const, name: 'CASE.url', type: 'Atalho da Internet', status: 'Case no portfólio' }] : []),
    ...(selectedProject.live ? [{ kind: 'product' as const, name: 'PRODUTO.url', type: 'Atalho da Internet', status: selectedProject.liveLabel ?? 'Produto público' }] : []),
    { kind: 'repo' as const, name: 'REPOSITÓRIO.url', type: 'Atalho da Internet', status: 'Código-fonte público' },
  ] : [];
  const visibleProjects = projects.filter(project => project.title.toLowerCase().includes(query.toLowerCase()));
  const visibleFiles = folderItems.filter(file => file.name.toLowerCase().includes(query.toLowerCase()) || file.status.toLowerCase().includes(query.toLowerCase()));
  const showReadme = 'LEIA-ME.md'.toLowerCase().includes(query.toLowerCase());

  return <div className="explorer-window-body">
    <div className="explorer-commandbar">
      <button type="button" aria-label="Voltar à pasta Portfólio" disabled={location === 'root'} onClick={onGoHome}>←</button>
      <div className="explorer-breadcrumb"><button type="button" onClick={onGoHome}>Henrique</button><b>›</b><button type="button" onClick={onGoHome}>Portfólio</button>{selectedProject && <><b>›</b><strong>{selectedProject.title}</strong></>}</div>
      <label className="explorer-search"><span aria-hidden="true">⌕</span><input aria-label={`Pesquisar em ${selectedProject?.title ?? 'Portfólio'}`} placeholder={`Pesquisar em ${selectedProject?.title ?? 'Portfólio'}`} value={query} onChange={event => setQuery(event.target.value)}/></label>
    </div>
    <div className="explorer-toolbar"><span className="explorer-toolbar-location">{selectedProject ? `Arquivos públicos de ${selectedProject.title}` : 'Projetos e arquivos públicos'}</span><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Abrir GitHub <span aria-hidden="true">↗</span></a></div>
    <div className="explorer-content">
      <nav className="explorer-sidebar" aria-label="Locais">
        <button className={location === 'root' ? 'is-selected' : ''} type="button" onClick={onGoHome}><Mark type="folder"/> Portfólio</button>
        <div className="explorer-sidebar-divider"/><span className="explorer-sidebar-heading">ACESSO DIRETO</span>
        {projects.slice(0, 4).map(project => <button key={project.key} className={location === project.key ? 'is-selected' : ''} type="button" onClick={() => onOpenFolder(project.key)}><Mark type="folder"/> {project.title}</button>)}
        <a className="explorer-sidebar-link" href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer"><Mark type="code"/> GitHub</a>
      </nav>
      <div className="explorer-file-area">
        <div className="explorer-column-head"><span>Nome</span><span>Tipo</span><span>Disponibilidade</span></div>
        <div className="explorer-file-list">
          {selectedProject ? <>
            {showReadme && <button type="button" className={`explorer-file-row ${currentFile === 'readme' ? 'is-selected' : ''}`} onClick={() => onSelect({ location, kind: 'readme' })}>
              <span className="explorer-file-name"><Mark type="document"/><strong>LEIA-ME.md</strong></span><span>Documento Markdown</span><span>Resumo do projeto</span>
            </button>}
            {visibleFiles.filter(file => file.kind !== 'readme').map(file => <button type="button" key={file.kind} className={`explorer-file-row ${currentFile === file.kind ? 'is-selected' : ''}`} onClick={() => onSelect({ location, kind: file.kind })}>
              <span className="explorer-file-name"><Mark type="code"/><strong>{file.name}</strong></span><span>{file.type}</span><span>{file.status}</span>
            </button>)}
          </> : <>
            {showReadme && <button type="button" className={`explorer-file-row ${currentFile === 'readme' ? 'is-selected' : ''}`} onClick={() => onSelect({ location: 'root', kind: 'readme' })}>
              <span className="explorer-file-name"><Mark type="document"/><strong>LEIA-ME.md</strong></span><span>Documento Markdown</span><span>Portfólio</span>
            </button>}
            {visibleProjects.map(project => <button type="button" key={project.key} className="explorer-file-row" onClick={() => onOpenFolder(project.key)}>
              <span className="explorer-file-name"><Mark type="folder"/><strong>{project.title}</strong></span><span>Pasta de projeto</span><span>{project.status}</span>
            </button>)}
          </>}
          {((selectedProject && visibleFiles.length === 0 && !showReadme) || (!selectedProject && visibleProjects.length === 0 && !showReadme)) && <p className="explorer-no-results">Nenhum arquivo encontrado para “{query}”.</p>}
        </div>
      </div>
      <aside className="explorer-preview" aria-live="polite">
        {selected?.kind === 'readme' && selected.location === 'root' ? <>
          <span className="explorer-preview-icon"><Mark type="document"/></span><small>DOCUMENTO / LEIA-ME</small><h2>Henrique Souza</h2><strong>Engenharia de software · Belo Horizonte</strong><p>Trabalho do fluxo que a pessoa usa até as regras de negócio, os dados e os serviços que sustentam o produto.</p><p>Esta pasta reúne projetos públicos e documentos para entender o trabalho e abrir cada fonte.</p><div className="explorer-preview-links"><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Ver perfil no GitHub <span>↗</span></a></div>
        </> : selectedProject && currentFile === 'readme' ? <>
          <span className="explorer-preview-icon"><Mark type="document"/></span><small>{selectedProject.tag}</small><h2>{selectedProject.title}</h2><strong>{selectedProject.line}</strong><p>{selectedProject.description}</p>{selectedProject.role && <p className="explorer-role">{selectedProject.role}</p>}<div className="explorer-stack"><span>TECNOLOGIAS</span>{selectedProject.stack.map(item => <b key={item}>{item}</b>)}</div><ProjectLinks project={selectedProject}/>
        </> : selectedProject && currentFile ? <>
          <span className="explorer-preview-icon"><Mark type="code"/></span><small>ATALHO PÚBLICO / {currentFile === 'case' ? 'CASE' : currentFile === 'product' ? 'PRODUTO' : 'REPOSITÓRIO'}</small><h2>{currentFile === 'case' ? 'Case do projeto' : currentFile === 'product' ? 'Produto publicado' : 'Código-fonte'}</h2><strong>{selectedProject.title}</strong><p>{currentFile === 'case' ? 'Abrir a página do case dentro deste portfólio.' : currentFile === 'product' ? selectedProject.liveLabel ?? 'Abrir a versão pública do produto.' : 'Consultar os arquivos e a documentação disponíveis no repositório público.'}</p><ProjectLinks project={selectedProject} kind={currentFile}/>
        </> : <div className="explorer-empty"><Mark type="folder"/><h2>{selectedProject ? 'Esta pasta está aberta' : 'Escolha uma pasta ou arquivo'}</h2><p>{selectedProject ? 'Os atalhos mostram apenas cases, produtos e repositórios disponíveis publicamente.' : 'Abra uma pasta para ver seus arquivos, o resumo do projeto e os links de acesso.'}</p></div>}
      </aside>
    </div>
    <footer className="explorer-statusbar"><span>{selectedProject ? folderItems.length : projects.length + 1} itens</span><span>{currentFile ? '1 arquivo selecionado' : 'Selecione uma pasta ou arquivo'}</span></footer>
  </div>;
}

function CodeWindow({ progress }: { progress: number }) {
  const [manualFile, setManualFile] = useState<string | null>(null);
  const automaticFile = progress < .3 ? 'content.ts' : progress < .56 ? 'App.tsx' : 'SoftwareFilm.tsx';
  const selectedFile = manualFile ?? automaticFile;
  const lines = sourceByFile[selectedFile] ?? sourceByFile['content.ts'];
  const phaseProgress = progress < .3 ? progress / .3 : progress < .56 ? (progress - .3) / .26 : (progress - .56) / .26;
  const visibleLines = manualFile ? lines.length : Math.max(Math.min(4, lines.length), Math.ceil(phaseProgress * lines.length));
  return <div className="code-window-body">
    <aside className="code-explorer"><span>ARQUIVOS DO PROJETO</span><b><i/> SRC</b>{codeFiles.map(file => <button type="button" key={file} className={selectedFile === file ? 'is-selected' : ''} onClick={() => setManualFile(file)}><i>TS</i>{file}</button>)}</aside>
    <main className="code-editor"><div className="code-tab"><span>TS</span> src/{selectedFile}</div><div className="code-breadcrumb">src <b>›</b> {selectedFile}</div><pre aria-label={`Código real de ${selectedFile}`}><code>{lines.slice(0, visibleLines).map((line, index) => <span key={`${selectedFile}-${index}`}><i>{String(index + 1).padStart(2, '0')}</i><span className="code-line-text"><CodeLineText line={line}/></span></span>)}</code></pre><footer className="code-statusbar"><span>TypeScript</span><span>Trecho público do portfólio</span></footer></main>
  </div>;
}

function SimpleWindow({ id, soundEnabled, onSoundToggle }: { id: 'about' | 'contact' | 'settings'; soundEnabled: boolean; onSoundToggle: () => void }) {
  if (id === 'about') return <article className="os-simple-window"><small>HENRIQUE SOUZA / BELO HORIZONTE</small><h2>Software para<br/><em>trabalho real.</em></h2><p>Desenvolvimento full stack com atenção ao fluxo que as pessoas usam, às regras de negócio e aos dados que sustentam o produto.</p><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">Acompanhar no GitHub ↗</a></article>;
  if (id === 'contact') return <article className="os-simple-window"><small>CONTATO / BELO HORIZONTE</small><h2>Vamos tirar<br/>uma ideia<br/><em>do papel.</em></h2><p>Me conta onde o processo trava e quem precisa usar a solução.</p><div className="os-contact-links"><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer"><span>LINKEDIN</span>Conectar profissionalmente ↗</a><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer"><span>GITHUB</span>Ver código e repositórios ↗</a></div></article>;
  return <article className="os-simple-window os-settings-window"><small>PREFERÊNCIAS DESTA VISITA</small><h2>Ajustes</h2><p>O som da interface fica desligado até você escolher ativá-lo.</p><div className="os-sound-row"><div><strong>Som da interface</strong><span>Teclas e navegação</span></div><button type="button" role="switch" aria-checked={soundEnabled} onClick={onSoundToggle}><i/><b>{soundEnabled ? 'Ligado' : 'Desligado'}</b></button></div></article>;
}

export default function DesktopOS({ progress, soundEnabled, onSoundToggle }: {
  progress: number; soundEnabled: boolean; onSoundToggle: () => void;
}) {
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [minimized, setMinimized] = useState<WindowId[]>([]);
  const [maximized, setMaximized] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [startQuery, setStartQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileSelection>({ location: 'root', kind: 'readme' });
  const [location, setLocation] = useState<ExplorerLocation>('root');
  const [now, setNow] = useState(() => new Date());
  const navigationChosen = useRef(false);

  const openWindow = (id: WindowId, manual = true) => {
    if (manual) navigationChosen.current = true;
    setOpenWindows(current => current.includes(id) ? current : [...current, id]);
    setMinimized(current => current.filter(item => item !== id));
    setActiveWindow(id);
    setMaximized(false);
    setStartOpen(false);
  };

  useEffect(() => {
    if (navigationChosen.current) return;
    openWindow(progress < .82 ? 'code' : 'explorer', false);
  }, [progress]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const closeWindow = (id: WindowId) => {
    setOpenWindows(current => current.filter(item => item !== id));
    setMinimized(current => current.filter(item => item !== id));
    setActiveWindow(current => current === id ? null : current);
    setMaximized(false);
    navigationChosen.current = true;
  };
  const minimizeWindow = (id: WindowId) => {
    setMinimized(current => current.includes(id) ? current : [...current, id]);
    setActiveWindow(current => current === id ? null : current);
  };
  const shownStartApps = (['explorer', 'code', 'about', 'contact', 'settings'] as WindowId[]).filter(id => windowLabels[id].toLowerCase().includes(startQuery.toLowerCase()));
  const openProjectFolder = (key: ProjectKey) => {
    setLocation(key);
    setSelectedFile({ location: key, kind: 'readme' });
  };
  const goHome = () => {
    setLocation('root');
    setSelectedFile({ location: 'root', kind: 'readme' });
  };

  return <section className="os-desktop" aria-label="Área de trabalho interativa">
    <svg className="os-wallpaper-map" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d="M-50 720C220 610 210 400 430 450s190 255 420 145 255-365 480-280 205 35 330-140"/><path d="M-40 770C230 660 230 450 445 500s180 250 430 150 260-360 475-280 210 45 350-125"/><path d="M90 940c85-160 165-310 300-345s183 115 310 90 176-186 293-165 165 145 292 35 180-190 300-235"/><path d="M340-70c72 120 74 263 135 355s184 131 203 285-97 226-95 390"/><path d="M1240-60c-25 170-115 245-75 355s195 195 122 320-103 204-20 360"/>
      <circle cx="843" cy="568" r="9"/><circle cx="843" cy="568" r="26"/><circle cx="843" cy="568" r="52"/>
    </svg>
    <div className="os-wallpaper-caption"><span>HENRIQUE<br/>SOUZA</span><small>Engenharia de software<br/>Belo Horizonte, Brasil</small></div>
    <nav className="os-desktop-shortcuts" aria-label="Atalhos da área de trabalho">
      <DesktopShortcut id="explorer" label="Portfólio" onOpen={openWindow}/>
      <DesktopShortcut id="code" label="Código" onOpen={openWindow}/>
      <DesktopShortcut id="about" label="Sobre" onOpen={openWindow}/>
      <DesktopShortcut id="contact" label="Contato" onOpen={openWindow}/>
      <DesktopShortcut id="settings" label="Ajustes" onOpen={openWindow}/>
    </nav>
    <p className="os-desktop-hint">{progress >= .82 || activeWindow === 'explorer' ? 'ABRA UMA PASTA PARA EXPLORAR' : 'ROLE PARA REVELAR O CÓDIGO'}</p>

    {openWindows.map(id => <div key={id} className={`os-window-layer ${activeWindow === id && !minimized.includes(id) ? 'is-active' : 'is-hidden'}`}>
      <WindowFrame id={id} active={activeWindow === id && !minimized.includes(id)} maximized={maximized} onClose={() => closeWindow(id)} onMinimize={() => minimizeWindow(id)} onMaximize={() => setMaximized(value => !value)}>
        {id === 'explorer' && <ExplorerWindow location={location} selected={selectedFile} onSelect={setSelectedFile} onOpenFolder={openProjectFolder} onGoHome={goHome}/>}
        {id === 'code' && <CodeWindow progress={progress}/>}
        {(id === 'about' || id === 'contact' || id === 'settings') && <SimpleWindow id={id} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/>}
      </WindowFrame>
    </div>)}

    {startOpen && <section className="os-start-menu" aria-label="Menu Iniciar"><label><span>⌕</span><input value={startQuery} onChange={event => setStartQuery(event.target.value)} placeholder="Pesquisar aplicativos"/></label><small>APLICATIVOS</small>{shownStartApps.map(id => <button type="button" key={id} onClick={() => openWindow(id)}><span><WindowIcon id={id}/></span>{windowLabels[id]}</button>)}<footer>Henrique Souza <span>Área de trabalho</span></footer></section>}

    <footer className="os-taskbar">
      <button type="button" className={`os-start-button ${startOpen ? 'is-active' : ''}`} aria-label="Abrir menu Iniciar" aria-expanded={startOpen} onClick={() => setStartOpen(value => !value)}><Mark type="start"/></button>
      <label className="os-taskbar-search"><span>⌕</span><input aria-label="Pesquisar no computador" placeholder="Pesquisar" onFocus={() => setStartOpen(true)} onChange={event => setStartQuery(event.target.value)}/></label>
      <nav className="os-taskbar-apps" aria-label="Aplicativos abertos">
        {openWindows.map(id => <button type="button" key={id} className={`${activeWindow === id && !minimized.includes(id) ? 'is-active' : ''} ${minimized.includes(id) ? 'is-minimized' : ''}`} aria-label={windowLabels[id]} onClick={() => { setActiveWindow(activeWindow === id && !minimized.includes(id) ? null : id); setMinimized(current => current.filter(item => item !== id)); }}><WindowIcon id={id}/></button>)}
      </nav>
      <span className="os-taskbar-profile"><i/> HENRIQUE SOUZA</span>
      <time className="os-taskbar-clock" dateTime={now.toISOString()}>{now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}<small>{now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</small></time>
    </footer>
  </section>;
}
