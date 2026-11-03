import { useEffect, useState, type FormEvent } from 'react';
import { playKey } from './sound';

const command = './abrir-caderno --modo campo';
const transcript = [
  'lendo rotas, regras e anotações públicas',
  'quatro projetos no percurso principal',
  'primeira parada: Rota di Buteco / BH',
];

type FeaturedKey = 'rota' | 'quarta' | 'condrio' | 'mneme';

export default function SystemBoot({ onOpenProject }: { onOpenProject: (key: FeaturedKey) => void }) {
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; result: string }[]>([]);

  const runCommand = (raw: string) => {
    const value = raw.trim().toLowerCase();
    if (!value) return;
    let result = 'comando desconhecido · digite help para ver o índice';
    if (value === 'help' || value === 'ajuda') result = 'commands: projects · open rota|quarta|condrio|mneme · security · about';
    else if (value === 'projects' || value === 'projetos') {
      result = '04 cadernos: rota · quarta · condrio · mneme';
      window.setTimeout(() => document.getElementById('cadernos')?.scrollIntoView({ behavior: 'smooth' }), 80);
    }
    else if (value === 'security' || value === 'seguranca' || value === 'segurança') {
      result = 'abrindo caderno de segurança / leitura documental';
      window.setTimeout(() => document.getElementById('seguranca')?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else if (value === 'about' || value === 'sobre') {
      result = 'abrindo ficha do autor';
      window.setTimeout(() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      const match = value.match(/^(?:open|abrir)\s+(rota|quarta|condrio|mneme)$/);
      if (match) {
        const key = match[1] as FeaturedKey;
        result = `selecionado: ${key} / bancada de experiência`;
        onOpenProject(key);
      }
    }
    setHistory(previous => [...previous.slice(-2), { command: raw.trim(), result }]);
    setInput('');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setTyped(command.length);
      setLines(transcript.length);
      return;
    }
    let position = 0;
    let output = 0;
    const typing = window.setInterval(() => {
      position += 1;
      setTyped(position);
      if (position >= command.length) {
        window.clearInterval(typing);
        let row = 0;
        output = window.setInterval(() => {
          row += 1;
          setLines(row);
          if (row >= transcript.length) window.clearInterval(output);
        }, 460);
      }
    }, 46);
    return () => { window.clearInterval(typing); window.clearInterval(output); };
  }, []);

  return <section className="boot-intro section-wrap" id="topo" data-palette-zone="boot" aria-labelledby="home-title">
    <div className="boot-margin" aria-hidden="true"><span>HS / OFICINA</span><i/><span>BH · 19°55′S</span></div>
    <div className="boot-grid">
      <div className="boot-copy">
        <div className="boot-kicker"><span className="boot-signal"/> CADERNO DE SISTEMAS · BELO HORIZONTE</div>
        <h1 id="home-title">Eu sigo o fio<br/>até <em>o sistema.</em></h1>
        <p>Começo pela situação real, desenho a experiência e vou até as regras que fazem o produto funcionar.</p>
        <div className="boot-links"><a href="#experiencia">Experimentar os projetos <span>↓</span></a><a href="#cadernos">Ir aos cadernos <span>↘</span></a></div>
      </div>
      <div className="boot-console" aria-label="Abertura editorial em estilo terminal; o comando e as linhas são uma apresentação do portfólio.">
        <div className="console-chrome"><span className="console-leds"><i/><i/><i/></span><span>OFICINA / SESSÃO 001</span><span>BH—BR</span></div>
        <div className="console-body">
          <div className="console-path">~/henrique/sistemas <span>· leitura local</span></div>
          <p className="console-command"><span>henrique@oficina:~$</span> <b aria-hidden="true">{command.slice(0, typed)}<i className={typed >= command.length ? 'cursor cursor-rest' : 'cursor'}/></b><span className="visually-hidden">{command}</span></p>
          <div className="console-output" aria-live="polite">
            {transcript.slice(0, lines).map((line, index) => <p key={line}><span>{String(index + 1).padStart(2, '0')}</span>{line}</p>)}
          </div>
          <div className="console-progress"><span>NOTAS / 03 LINHAS</span><i><b style={{ width: `${Math.round(lines / transcript.length * 100)}%` }}/></i><span>{String(lines).padStart(2, '0')} / 03</span></div>
          {history.length > 0 && <div className="console-history" aria-live="polite">{history.map((entry, index) => <div key={`${entry.command}-${index}`}><p><span>henrique@oficina:~$</span> {entry.command}</p><small>{entry.result}</small></div>)}</div>}
          <form className="console-form" onSubmit={submit}>
            <label htmlFor="console-input">henrique@oficina:~$</label>
            <input id="console-input" value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) playKey(); }} autoComplete="off" spellCheck={false} aria-describedby="console-help" placeholder="digite help" />
            <button type="submit" aria-label="Executar comando">↵</button>
          </form>
          <p id="console-help" className="console-help">help · projects · open rota · security</p>
        </div>
        <div className="console-note"><span>COMANDO EDITORIAL</span><span>NÃO EXECUTA NENHUM PROCESSO</span></div>
      </div>
    </div>
    <div className="boot-foot"><span>INTERFACE · BACKEND · OPERAÇÃO</span><span>ARRASTE A LEITURA PARA BAIXO <b>↓</b></span><span>01 / ABERTURA</span></div>
  </section>;
}
