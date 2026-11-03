import { useEffect, useRef, useState, type FormEvent } from 'react';
import { playScrollStep } from './sound';

type BuildMode = 'briefing' | 'ide' | 'prototype' | 'product';
const buildModes: BuildMode[] = ['briefing', 'ide', 'prototype', 'product'];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const interpolate = (from: number, to: number, progress: number) => from + (to - from) * progress;
const passage = (progress: number, start: number, end: number) => {
  const value = clamp01((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
};

const buildCopy: Record<BuildMode, { title: string; lead: string; body: string }> = {
  briefing: {
    title: 'Do mapa ao ERP.',
    lead: 'Eu construo o sistema inteiro: produto, interface, backend e dados, do briefing à entrega.',
    body: 'Sou Henrique, desenvolvedor full stack em Belo Horizonte. Role para acompanhar como uma ideia ganha forma; depois, veja projetos reais em contextos diferentes.',
  },
  ide: {
    title: 'A pergunta vira estrutura no código.',
    lead: 'Escrevo a regra e defino o que a interface envia e recebe.',
    body: 'A implementação conecta frontend, validação, persistência, permissões e integrações conforme o problema pede.',
  },
  prototype: {
    title: 'Código e tela se provam juntos.',
    lead: 'Experimente enviar o formulário vazio e depois preencha os dois campos.',
    body: 'A demonstração roda só nesta página. Ela mostra erro e confirmação sem chamar um serviço ou gravar dados fora do navegador.',
  },
  product: {
    title: 'O produto deixa claro o que aconteceu.',
    lead: 'A pessoa vê o resultado, entende o estado e sabe o que fazer em seguida.',
    body: 'É assim que penso a passagem do código para uso. Abaixo, os projetos mostram esse cuidado aplicado a problemas diferentes.',
  },
};

function missingFields(summary: string, outcome: string) {
  const missing: string[] = [];
  if (summary.trim().length < 8) missing.push('descreva o que precisa ser resolvido');
  if (outcome.trim().length < 4) missing.push('informe o resultado esperado');
  return missing;
}

export default function ContinuousProcess() {
  const root = useRef<HTMLElement>(null);
  const workspace = useRef<HTMLElement>(null);
  const previousMode = useRef<BuildMode>('briefing');
  const [mode, setMode] = useState<BuildMode>('briefing');
  const [summary, setSummary] = useState('');
  const [outcome, setOutcome] = useState('');
  const [result, setResult] = useState('Aguardando o envio de demonstração.');
  const [validated, setValidated] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const element = root.current;
    const scene = workspace.current;
    if (!element || !scene) return;

    const storyObserver = new IntersectionObserver(entries => {
      const current = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const nextMode = current?.target.getAttribute('data-build') as BuildMode | null;
      if (nextMode && buildModes.includes(nextMode)) setMode(nextMode);
    }, { rootMargin: '-39% 0px -43% 0px', threshold: [0, .12, .3, .55] });

    element.querySelectorAll<HTMLElement>('[data-build]').forEach(chapter => storyObserver.observe(chapter));

    const projects = document.getElementById('trabalhos');
    const projectObserver = projects ? new IntersectionObserver(([entry]) => {
      scene.classList.toggle('is-past-process', entry.isIntersecting);
    }, { threshold: 0 }) : null;
    if (projects) projectObserver?.observe(projects);

    let frame = 0;
    const updateScrollScene = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const distance = Math.max(1, element.offsetHeight - window.innerHeight);
        const progress = clamp01(-bounds.top / distance);
        scene.style.setProperty('--scene-progress', progress.toFixed(3));
        const mobile = window.matchMedia('(max-width: 760px)').matches;
        const briefPin = passage(progress, .22, .39);
        const briefFade = passage(progress, mobile ? .29 : .61, mobile ? .39 : .76);
        const ideEnter = passage(progress, .25, .41);
        const ideFade = passage(progress, .58, .72);
        const prototypeEnter = passage(progress, .56, .72);
        const productGrowth = passage(progress, .78, .97);
        const codeProgress = clamp01((progress - .27) / .34);

        scene.style.setProperty('--brief-top', `${interpolate(8, 30, briefPin)}%`);
        scene.style.setProperty('--brief-left', `${interpolate(mobile ? 8 : 11, mobile ? 1 : 2, briefPin)}%`);
        scene.style.setProperty('--brief-width', `${interpolate(mobile ? 84 : 78, 15, briefPin)}%`);
        scene.style.setProperty('--brief-height', `${interpolate(mobile ? 88 : 84, 40, briefPin)}%`);
        scene.style.setProperty('--brief-rotation', `${interpolate(-.7, 0, briefPin)}deg`);
        scene.style.setProperty('--brief-opacity', String(1 - briefFade));
        scene.style.setProperty('--brief-details', String(1 - briefPin));
        scene.style.setProperty('--brief-title-size', `${interpolate(mobile ? 43 : 72, mobile ? 15 : 20, briefPin)}px`);

        scene.style.setProperty('--editor-opacity', String(ideEnter * (1 - ideFade)));
        scene.style.setProperty('--editor-left', `${interpolate(mobile ? 4 : 7, mobile ? 4 : 17, ideEnter)}%`);
        scene.style.setProperty('--editor-width', `${interpolate(mobile ? 92 : 86, mobile ? 92 : 81, ideEnter)}%`);
        scene.style.setProperty('--editor-y', `${interpolate(20, 0, ideEnter)}px`);

        scene.style.setProperty('--prototype-opacity', String(prototypeEnter));
        scene.style.setProperty('--prototype-inset', `${interpolate(9, 4, productGrowth)}% ${interpolate(5, 2, productGrowth)}%`);
        scene.style.setProperty('--prototype-y', `${interpolate(16, 0, prototypeEnter)}px`);
        scene.style.setProperty('--prototype-scale', String(interpolate(.975, 1, prototypeEnter)));
        scene.style.setProperty('--prototype-code-column', `${interpolate(mobile ? .26 : .72, 0, productGrowth)}fr`);
        scene.style.setProperty('--prototype-code-opacity', String(1 - productGrowth));
        const titleSmall = mobile ? 25 : Math.min(38, window.innerWidth * .03);
        const titleLarge = mobile ? 46 : Math.min(70, window.innerWidth * .055);
        scene.style.setProperty('--request-title-size', `${interpolate(titleSmall, titleLarge, productGrowth)}px`);
        const formPaddingSmall = mobile ? 8 : Math.min(32, window.innerWidth * .03);
        const formPaddingLarge = mobile ? 24 : Math.min(60, window.innerWidth * .05);
        scene.style.setProperty('--request-padding', `${interpolate(formPaddingSmall, formPaddingLarge, productGrowth)}px`);
        scene.style.setProperty('--request-width', `${interpolate(540, 650, productGrowth)}px`);

        scene.style.setProperty('--code-progress', codeProgress.toFixed(3));

        const codeLines = scene.querySelectorAll<HTMLElement>('[data-code-line]');
        codeLines.forEach((line, index) => {
          const reveal = Math.max(.22, Math.min(1, codeProgress * (codeLines.length + 1) - index));
          line.style.opacity = String(reveal);
        });
      });
    };
    window.addEventListener('scroll', updateScrollScene, { passive: true });
    window.addEventListener('resize', updateScrollScene);
    updateScrollScene();

    return () => {
      storyObserver.disconnect();
      projectObserver?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScrollScene);
      window.removeEventListener('resize', updateScrollScene);
    };
  }, []);

  useEffect(() => {
    if (previousMode.current !== mode) playScrollStep();
    previousMode.current = mode;
  }, [mode]);

  const runLocalRule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const missing = missingFields(summary, outcome);
    if (missing.length) {
      setValidated(false);
      setResult(`Não enviado · ${missing.join(' · ')}.`);
      return;
    }
    setValidated(true);
    setResult('Validação concluída · estado local, sem envio externo.');
  };

  return <section className="continuous-process" id="processo" ref={root} aria-label="Como uma ideia chega a produto">
    <div className="process-grid">
      <div className="process-stories">
        {buildModes.map((key, index) => <article className={`process-copy process-copy-${key}`} data-build={key} key={key}>
          {index === 0 && <div className="process-signature"><span>HENRIQUE SOUZA / DESENVOLVIMENTO FULL STACK</span><span>BELO HORIZONTE, BR</span></div>}
          {index === 0 ? <h1>Do mapa<br/><em>ao ERP.</em></h1> : <h2>{buildCopy[key].title}</h2>}
          <p className="process-lead">{buildCopy[key].lead}</p>
          <p className="process-body">{buildCopy[key].body}</p>
          {key === 'product' && <a className="process-continue" href="#trabalhos">Continuar pelos projetos <span aria-hidden="true">↓</span></a>}
        </article>)}
      </div>

      <aside className={`build-workspace mode-${mode}`} data-mode={mode} ref={workspace} aria-label="Exemplo local evoluindo do briefing à interface">
        <div className="build-canvas">
          <article className="build-material build-paper" aria-hidden={mode !== 'briefing'}>
            <header className="paper-head"><span>HS / FLUXO DE EXEMPLO</span><span>LOCAL</span></header>
            <p className="paper-prompt">O PEDIDO</p>
            <h3>Organizar<br/>uma solicitação.</h3>
            <div className="brief-rows">
              <div><span>QUEM</span><strong>Quem precisa da resposta?</strong></div>
              <div><span>ENTRADA</span><strong>O que precisa ser resolvido?</strong></div>
              <div><span>SAÍDA</span><strong>Como saber que deu certo?</strong></div>
            </div>
            <footer className="paper-foot"><i aria-hidden="true"/> CONTEXTO → REGRA → RESPOSTA</footer>
          </article>

          <article className="build-material build-editor" aria-hidden={mode !== 'ide'}>
            <header className="editor-bar"><span className="editor-lights" aria-hidden="true"><i/><i/><i/></span><span>solicitacao / src / validar.ts</span><small>TypeScript</small></header>
            <div className="editor-body">
              <aside className="editor-files" aria-hidden="true"><span>⌄ src</span><b>TS&nbsp; validar.ts</b><span>◇ types.ts</span><span>⌄ tests</span><span>TS&nbsp; validar.test.ts</span></aside>
              <pre aria-label="Código de exemplo que valida uma solicitação"><code>
                <span data-code-line><i>01</i> <b>type</b> Pedido = {'{'}</span>
                <span data-code-line><i>02</i>   resumo: string</span>
                <span data-code-line><i>03</i>   resultado: string</span>
                <span data-code-line><i>04</i> {'}'}</span>
                <span data-code-line><i>05</i> </span>
                <span data-code-line><i>06</i> <b>function</b> validar(pedido: Pedido) {'{'}</span>
                <span data-code-line><i>07</i>   if (pedido.resumo.trim().length &lt; 8)</span>
                <span data-code-line><i>08</i>     <b>return</b> erro(<em>'descreva o pedido'</em>)</span>
                <span data-code-line><i>09</i>   if (pedido.resultado.trim().length &lt; 4)</span>
                <span data-code-line><i>10</i>     <b>return</b> erro(<em>'informe o resultado'</em>)</span>
                <span data-code-line><i>11</i>   <b>return</b> aceitar(pedido)</span>
                <span data-code-line><i>12</i> {'}'}</span>
              </code></pre>
            </div>
            <footer className="editor-foot"><span>ENTRADA</span><i/> <span>VALIDAÇÃO</span><i/> <span>RESPOSTA</span></footer>
          </article>

          <article className="build-material build-prototype" aria-hidden={mode !== 'prototype' && mode !== 'product'}>
            <div className="prototype-code">
              <header><span>validar.ts</span><small>IDE / EXEMPLO</small></header>
              <pre><code>if (resumo.length &lt; 8) {'{'}<br/>  return erro()<br/>{'}'}<br/>return aceitar(pedido)</code></pre>
            </div>
            <div className="prototype-app">
              <header className="app-bar"><span className="app-window-controls" aria-hidden="true"><i/><i/><i/></span><span>localhost / solicitacao</span><span className="app-prototype-label">PROTÓTIPO LOCAL</span><span className="app-product-label">PRODUTO / SOLICITAÇÃO</span></header>
              <form className="request-form" onSubmit={runLocalRule}>
                <div className="request-heading"><span>EXEMPLO DO PROCESSO · NÃO É PROJETO PUBLICADO</span><h3>Nova solicitação</h3><p>Descreva o pedido e o resultado que precisa alcançar.</p></div>
                <label htmlFor="request-summary">O que precisa ser resolvido?
                  <textarea id="request-summary" value={summary} onChange={event => { setSummary(event.target.value); setValidated(false); setResult('Rascunho alterado · envie novamente.'); }} placeholder="Escreva pelo menos oito caracteres" rows={2}/>
                </label>
                <label htmlFor="request-outcome">Qual resultado indica que deu certo?
                  <input id="request-outcome" value={outcome} onChange={event => { setOutcome(event.target.value); setValidated(false); setResult('Rascunho alterado · envie novamente.'); }} placeholder="Ex.: solicitação aparece para a equipe"/>
                </label>
                <div className="request-submit-row"><button type="submit">Enviar exemplo <span aria-hidden="true">↗</span></button><small>DADOS FICAM NESTA SESSÃO</small></div>
                <output className={validated ? 'request-result is-validated' : 'request-result'} aria-live="polite">{attempted && <><i aria-hidden="true"/>{result}</>}</output>
              </form>
              <footer className="app-foot"><span>ESTADO</span><strong>{validated ? 'VALIDADA LOCALMENTE' : 'AGUARDANDO ENVIO'}</strong><span>· SEM BACKEND</span></footer>
            </div>
          </article>
        </div>
      </aside>
    </div>
  </section>;
}
