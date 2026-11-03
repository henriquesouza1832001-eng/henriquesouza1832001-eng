import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { playKey } from './sound';
import './interactive-workbench.css';

type WorkFile = { path: string; content: string };
type Workspace = { files: WorkFile[]; folders: string[]; activePath: string };
type LogEntry = { level: 'log' | 'warn' | 'error'; text: string };

const STORAGE_KEY = 'hs-oficina-ide-session-v1';
const exampleFiles: WorkFile[] = [
  {
    path: 'src/App.js',
    content: `app.setScreen('Um pedido com contexto', 'Resumo, pessoa responsável e retorno esperado no mesmo fluxo.');
app.setOutput('A interface aparece aqui sem acessar a internet nem os arquivos do computador.');

console.log('Prévia local iniciada. Edite o código e execute outra vez.');`,
  },
  {
    path: 'src/styles.css',
    content: `:root { color-scheme: light; font-family: Arial, sans-serif; }
body { margin: 0; background: #e8e2d6; color: #27241f; }
#app { max-width: 620px; margin: 12vh auto; padding: 44px; }
.overline { color: #a4573f; font: 12px monospace; letter-spacing: .12em; }
h1 { font-size: clamp(42px, 7vw, 72px); line-height: .9; letter-spacing: -.05em; }
h1 em { color: #b65f42; font-style: normal; }
button { border: 0; background: #282720; color: #f2ecdf; padding: 14px 18px; cursor: pointer; }
#retorno { min-height: 1.5em; color: #a4573f; }`,
  },
  { path: 'README.md', content: `# Oficina local\n\nEdite src/App.js e src/styles.css.\nA prévia roda em um quadro isolado; os arquivos ficam neste navegador.` },
];

const initialWorkspace = (): Workspace => ({
  files: exampleFiles.map(file => ({ ...file })),
  folders: ['src'],
  activePath: 'src/App.js',
});

function loadWorkspace(): Workspace {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialWorkspace();
    const value = JSON.parse(raw) as Partial<Workspace>;
    if (!Array.isArray(value.files) || !Array.isArray(value.folders)) return initialWorkspace();
    const files = value.files.filter((file): file is WorkFile => Boolean(file && typeof file.path === 'string' && typeof file.content === 'string'));
    const folders = value.folders.filter((folder): folder is string => typeof folder === 'string');
    const activePath = files.some(file => file.path === value.activePath) ? value.activePath! : files[0]?.path ?? 'src/App.js';
    return { files: files.length ? files : initialWorkspace().files, folders, activePath };
  } catch {
    return initialWorkspace();
  }
}

function makePreview(files: WorkFile[]) {
  const totalSourceLength = files.reduce((total, file) => total + file.content.length, 0);
  if (totalSourceLength > 60_000) return `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><body><p>Esta prévia aceita até 60 KB de código por execução.</p></body></html>`;
  const styles = files.find(file => file.path === 'src/styles.css')?.content ?? '';
  const encoded = btoa(Array.from(new TextEncoder().encode(JSON.stringify(files)), byte => String.fromCharCode(byte)).join(''));
  const safeStyles = styles.replace(/<\/style/gi, '<\\/style');
  const workerSource = [
    'const nativePost = self.postMessage.bind(self);',
    "const stringify = value => { if (typeof value === 'string') return value; try { return JSON.stringify(value) ?? String(value); } catch { return String(value); } };",
    "const send = (kind, payload = {}) => nativePost({ channel: 'hs-oficina-worker', kind, ...payload });",
    "const log = (level, values) => send('log', { level, text: values.map(stringify).join(' ').slice(0, 3000) });",
    "const clean = value => String(value ?? '').slice(0, 3000);",
    "const denyNetwork = () => { throw new Error('A prévia está sem acesso à rede.'); };",
    "for (const name of ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'Worker', 'SharedWorker', 'BroadcastChannel', 'WebTransport', 'RTCPeerConnection', 'webkitRTCPeerConnection', 'importScripts']) { try { Object.defineProperty(self, name, { value: denyNetwork, writable: false, configurable: false }); } catch {} }",
    "try { Object.defineProperty(self, 'postMessage', { value: denyNetwork, writable: false, configurable: false }); } catch {}",
    "try { Object.defineProperty(self, 'console', { value: Object.freeze({ log: (...values) => log('log', values), info: (...values) => log('log', values), warn: (...values) => log('warn', values), error: (...values) => log('error', values) }), writable: false, configurable: false }); } catch {}",
    "try { Object.defineProperty(self, 'app', { value: Object.freeze({ setScreen: (title, detail = '') => send('screen', { title: clean(title).slice(0, 160), detail: clean(detail).slice(0, 500) }), setOutput: value => send('output', { text: clean(value) }) }), writable: false, configurable: false }); } catch {}",
    'import(ENTRY_URL).then(() => send("done")).catch(error => { send("log", { level: "error", text: String(error && error.stack ? error.stack : error).slice(0, 3000) }); send("done"); });',
  ].join('\n');
  const encodedWorkerSource = JSON.stringify(workerSource);
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline' blob:; worker-src blob:; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none'; frame-src 'none'; media-src 'none'; font-src 'none'"><style>${safeStyles}</style></head><body><main id="app"><p class="overline">OFICINA / PRÉVIA LOCAL</p><h1 id="app-title">A interface aparece aqui.</h1><p id="app-detail">Edite o exemplo ou escreva no editor e execute.</p><pre id="app-output" aria-live="polite"></pre></main><script>
(() => {
  const report = (level, text) => parent.postMessage({ channel: 'hs-oficina-preview', level, text: String(text).slice(0, 3000) }, '*');
  const bytes = Uint8Array.from(atob('${encoded}'), char => char.charCodeAt(0));
  const files = JSON.parse(new TextDecoder().decode(bytes));
  const sources = Object.fromEntries(files.filter(file => /\\.(?:m?js)$/.test(file.path)).map(file => [file.path, file.content]));
  const moduleUrls = new Map();
  const resolvePath = (from, specifier) => {
    const parts = from.split('/').slice(0, -1);
    for (const part of specifier.split('/')) {
      if (!part || part === '.') continue;
      if (part === '..') { if (!parts.length) throw new Error('Import fora da pasta do projeto bloqueado.'); parts.pop(); }
      else parts.push(part);
    }
    let path = parts.join('/');
    if (!(path in sources) && !path.endsWith('.js') && !path.endsWith('.mjs')) path += '.js';
    if (!(path in sources)) throw new Error('Arquivo JavaScript local não encontrado: ' + path);
    return path;
  };
  const moduleUrl = path => {
    if (moduleUrls.has(path)) return moduleUrls.get(path);
    const source = sources[path];
    if (source === undefined) throw new Error('Arquivo não encontrado: ' + path);
    const placeholder = URL.createObjectURL(new Blob([''], { type: 'text/javascript' }));
    moduleUrls.set(path, placeholder);
    const replace = (match, prefix, quote, specifier) => {
      if (!specifier.startsWith('.')) throw new Error('Use apenas importações relativas entre os arquivos deste projeto: ' + specifier);
      return prefix + JSON.stringify(moduleUrl(resolvePath(path, specifier)));
    };
    let resolved = source.replace(/(from\\s+)(['"])([^'"]+)\\2/g, replace);
    resolved = resolved.replace(/(\\bimport\\s*)(['"])([^'"]+)\\2/g, replace);
    resolved = resolved.replace(/(\\bimport\\s*\\()(['"])([^'"]+)\\2/g, replace);
    const url = URL.createObjectURL(new Blob([resolved], { type: 'text/javascript' }));
    URL.revokeObjectURL(placeholder);
    moduleUrls.set(path, url);
    return url;
  };
  try {
    if (!sources['src/App.js']) throw new Error('Crie o arquivo src/App.js para iniciar a prévia.');
    const entryUrl = JSON.stringify(moduleUrl('src/App.js'));
    const workerCode = ${encodedWorkerSource}.replace('ENTRY_URL', entryUrl);
    const workerUrl = URL.createObjectURL(new Blob([workerCode], { type: 'text/javascript' }));
    const worker = new Worker(workerUrl, { type: 'module' });
    URL.revokeObjectURL(workerUrl);
    const timeout = window.setTimeout(() => {
      worker.terminate();
      moduleUrls.forEach(url => URL.revokeObjectURL(url));
      report('error', 'Execução interrompida após 1,5 segundo. A prévia é limitada por segurança.');
    }, 1500);
    const title = document.querySelector('#app-title');
    const detail = document.querySelector('#app-detail');
    const output = document.querySelector('#app-output');
    worker.onmessage = event => {
      const message = event.data;
      if (!message || message.channel !== 'hs-oficina-worker') return;
      if (message.kind === 'done') {
        window.clearTimeout(timeout);
        worker.terminate();
        moduleUrls.forEach(url => URL.revokeObjectURL(url));
      } else if (message.kind === 'screen') {
        title.textContent = typeof message.title === 'string' ? message.title.slice(0, 160) : '';
        detail.textContent = typeof message.detail === 'string' ? message.detail.slice(0, 500) : '';
      } else if (message.kind === 'output') {
        output.textContent = typeof message.text === 'string' ? message.text.slice(0, 3000) : '';
      } else if (message.kind === 'log' && typeof message.text === 'string') {
        report(message.level === 'warn' || message.level === 'error' ? message.level : 'log', message.text);
      }
    };
    worker.onerror = event => {
      window.clearTimeout(timeout);
      worker.terminate();
      moduleUrls.forEach(url => URL.revokeObjectURL(url));
      report('error', String(event.message || 'Falha na prévia isolada.').slice(0, 3000));
    };
  } catch (error) {
    report('error', error && error.stack ? error.stack : String(error));
  }
})();
</script></body></html>`;
}

function addFolderParents(folders: string[], path: string) {
  const next = new Set(folders);
  const parts = path.split('/').filter(Boolean);
  let current = '';
  parts.forEach(part => { current = current ? `${current}/${part}` : part; next.add(current); });
  return [...next].sort((a, b) => a.localeCompare(b));
}

export default function InteractiveWorkbench({ onClose }: { onClose: () => void }) {
  const [workspace, setWorkspace] = useState<Workspace>(loadWorkspace);
  const [newKind, setNewKind] = useState<'file' | 'folder' | null>(null);
  const [newPath, setNewPath] = useState('');
  const [saved, setSaved] = useState(true);
  const [preview, setPreview] = useState(() => makePreview(loadWorkspace().files));
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [execution, setExecution] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const activeFile = workspace.files.find(file => file.path === workspace.activePath) ?? workspace.files[0];
  const lineCount = useMemo(() => Math.max(1, (activeFile?.content ?? '').split('\n').length), [activeFile?.content]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [workspace]);

  useEffect(() => {
    const priorOverflow = document.documentElement.style.overflow;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.documentElement.style.overflow = 'hidden';
    editorRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') runPreview();
    };
    const handleMessage = (event: MessageEvent) => {
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return;
      if (!event.data || event.data.channel !== 'hs-oficina-preview' || typeof event.data.text !== 'string') return;
      setLogs(current => [...current.slice(-79), { level: event.data.level === 'warn' || event.data.level === 'error' ? event.data.level : 'log', text: event.data.text }]);
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('message', handleMessage);
      document.documentElement.style.overflow = priorOverflow;
      window.setTimeout(() => opener?.focus({ preventScroll: true }), 0);
    };
  }, [onClose]);

  function runPreview() {
    setLogs([]);
    setPreview(makePreview(workspace.files));
    setExecution(value => value + 1);
  }

  function updateActiveFile(content: string) {
    if (!activeFile) return;
    setSaved(false);
    setWorkspace(current => ({
      ...current,
      files: current.files.map(file => file.path === activeFile.path ? { ...file, content } : file),
    }));
  }

  function createItem() {
    const path = newPath.trim().replace(/^\/+|\/+$/g, '');
    if (!path || path.split('/').some(part => !part || part === '.' || part === '..' || part.includes('\\'))) return;
    if (newKind === 'folder') {
      setWorkspace(current => ({ ...current, folders: addFolderParents(current.folders, path) }));
    } else if (newKind === 'file' && !workspace.files.some(file => file.path === path)) {
      const starter = path.endsWith('.css') ? '/* Estilos do projeto */\n' : path.endsWith('.md') ? '# Novo arquivo\n' : '// Novo arquivo\n';
      const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
      setWorkspace(current => ({
        ...current,
        folders: folder ? addFolderParents(current.folders, folder) : current.folders,
        files: [...current.files, { path, content: starter }],
        activePath: path,
      }));
    }
    setNewKind(null);
    setNewPath('');
  }

  const entries = useMemo(() => [
    ...workspace.folders.map(path => ({ path, type: 'folder' as const })),
    ...workspace.files.map(file => ({ path: file.path, type: 'file' as const })),
  ].sort((a, b) => a.path.localeCompare(b.path) || a.type.localeCompare(b.type)), [workspace.files, workspace.folders]);

  return createPortal(<div className="workbench-shade" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="workbench" role="dialog" aria-modal="true" aria-labelledby="workbench-title">
      <header className="workbench-topbar">
        <div className="workbench-brand"><span className="workbench-brand-mark">HS</span><span><strong id="workbench-title">Oficina / ambiente local</strong><small>ARQUIVOS SALVOS NESTA GUIA</small></span></div>
        <div className="workbench-top-actions"><span className={saved ? 'workbench-save is-saved' : 'workbench-save'}><i/> {saved ? 'SALVO LOCALMENTE' : 'NÃO FOI POSSÍVEL SALVAR'}</span><button type="button" className="workbench-close" onClick={onClose} aria-label="Fechar editor">FECHAR <span>×</span></button></div>
      </header>
      <div className="workbench-toolbar"><span><i/> HENRIQUE / FLUXO DE PEDIDO</span><span>JS · CSS · WORKER ISOLADO · SEM REDE</span><button type="button" onClick={runPreview} title="Executar prévia (Ctrl ou Command + Enter)">▶ EXECUTAR <kbd>CTRL ↵</kbd></button></div>
      <div className="workbench-grid">
        <aside className="workbench-explorer" aria-label="Arquivos do projeto">
          <div className="workbench-pane-label">EXPLORADOR <span>01</span></div>
          <div className="workbench-file-actions"><button type="button" onClick={() => { setNewKind('file'); setNewPath('src/'); }}>+ ARQUIVO</button><button type="button" onClick={() => { setNewKind('folder'); setNewPath('src/'); }}>+ PASTA</button></div>
          {newKind && <form className="workbench-create" onSubmit={event => { event.preventDefault(); createItem(); }}><label htmlFor="workbench-new-path">{newKind === 'file' ? 'CAMINHO DO ARQUIVO' : 'NOME DA PASTA'}</label><input id="workbench-new-path" autoFocus value={newPath} onChange={event => setNewPath(event.target.value)} placeholder={newKind === 'file' ? 'src/Componente.js' : 'src/componentes'} /><div><button type="submit">CRIAR</button><button type="button" onClick={() => setNewKind(null)}>CANCELAR</button></div></form>}
          <nav className="workbench-tree">{entries.map(entry => {
            const depth = Math.max(0, entry.path.split('/').length - (entry.type === 'file' ? 1 : 0) - 1);
            return entry.type === 'folder'
              ? <div className="workbench-tree-folder" style={{ paddingLeft: 12 + depth * 12 }} key={`dir-${entry.path}`}><span>⌄</span> {entry.path.split('/').at(-1)}</div>
              : <button type="button" className={workspace.activePath === entry.path ? 'workbench-tree-file active' : 'workbench-tree-file'} style={{ paddingLeft: 12 + depth * 12 }} key={entry.path} onClick={() => setWorkspace(current => ({ ...current, activePath: entry.path }))}><span>{entry.path.endsWith('.css') ? '◌' : entry.path.endsWith('.md') ? 'M' : 'JS'}</span>{entry.path.split('/').at(-1)}</button>;
          })}</nav>
          <p className="workbench-storage-note">Os arquivos ficam apenas nesta guia. Fechá-la encerra a sessão; nada é enviado ao servidor.</p>
        </aside>
        <section className="workbench-editor" aria-label="Editor de código">
          <div className="workbench-tab"><span>{activeFile?.path ?? 'sem arquivo'}</span><span>●</span></div>
          {activeFile ? <div className="workbench-code-area"><pre className="workbench-lines" aria-hidden="true">{Array.from({ length: lineCount }, (_, index) => index + 1).join('\n')}</pre><textarea ref={editorRef} spellCheck={false} autoCapitalize="off" autoComplete="off" aria-label={`Código de ${activeFile.path}`} value={activeFile.content} onChange={event => updateActiveFile(event.target.value)} onKeyDown={event => { if (!event.ctrlKey && !event.metaKey && !event.altKey && event.key.length === 1) playKey(); if (event.key === 'Tab') { event.preventDefault(); const field = event.currentTarget; const start = field.selectionStart; const end = field.selectionEnd; updateActiveFile(`${field.value.slice(0, start)}  ${field.value.slice(end)}`); requestAnimationFrame(() => { field.selectionStart = field.selectionEnd = start + 2; }); } }} /></div> : <p className="workbench-no-file">Crie ou escolha um arquivo para editar.</p>}
          <div className="workbench-terminal"><div className="workbench-terminal-head"><span>CONSOLE <i/></span><button type="button" onClick={() => setLogs([])}>LIMPAR</button></div><div className="workbench-log-list" aria-live="polite">{logs.length ? logs.map((entry, index) => <p className={`workbench-log ${entry.level}`} key={`${execution}-${index}`}><b>{entry.level === 'error' ? '×' : entry.level === 'warn' ? '!' : '›'}</b>{entry.text}</p>) : <p className="workbench-log-empty">Execute a prévia para ver os registros do console.</p>}</div></div>
        </section>
        <section className="workbench-preview" aria-label="Prévia do aplicativo">
          <div className="workbench-pane-label">PRÉVIA LOCAL <span>SEM PUBLICAR</span></div>
          <div className="workbench-browser"><div className="workbench-browser-bar"><i/><i/><i/><span>sessão isolada / sem rede</span></div><iframe key={execution} ref={iframeRef} title="Prévia isolada do aplicativo" sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={preview}/></div>
          <p className="workbench-preview-caption">Worker temporário · sem rede · limite de 1,5 s. <kbd>Ctrl + Enter</kbd></p>
        </section>
      </div>
    </section>
  </div>, document.body);
}
