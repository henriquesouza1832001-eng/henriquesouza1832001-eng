import { useEffect, useState } from 'react';
import { projects } from './content';
import CasePage from './CasePage';
import SoftwareFilm from './SoftwareFilm';
import { playClick, setSoundEnabled } from './sound';

function RouteMark({ small = false }: { small?: boolean }) {
  return <svg className={small ? 'route-mark small' : 'route-mark'} viewBox="0 0 72 72" aria-hidden="true"><path d="M11 55V16h21v20h28M32 36v20h29V35"/><path className="route-mark-branch" d="M44 36V17h17"/><circle cx="32" cy="36" r="4"/></svg>;
}

function Header({ soundEnabled, onSoundToggle }: { soundEnabled: boolean; onSoundToggle: () => void }) {
  return <header className="site-header"><a className="wordmark" href="/" aria-label="Henrique Souza, início"><RouteMark small/><span>HENRIQUE SOUZA<small>ENGENHARIA DE SOFTWARE · BH</small></span></a><button className="sound-toggle" type="button" data-sound-toggle="true" aria-pressed={soundEnabled} onClick={onSoundToggle}><span className={soundEnabled ? 'sound-glyph sound-on' : 'sound-glyph'} aria-hidden="true">{soundEnabled ? ')))' : '))·'}</span> SOM {soundEnabled ? 'ON' : 'OFF'}</button></header>;
}

function CaseFooter() {
  return <footer id="contato" className="footer section-wrap" data-palette-zone="contact"><div className="section-label"><span>CONTATO</span><span>BELO HORIZONTE / BRASIL</span></div><h2>Me conta onde<br/><em>o processo trava.</em></h2><div className="footer-links"><a href="https://github.com/henriquesouza1832001-eng" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/#workstation-screen">Voltar ao computador ↗</a></div><div className="footer-bottom"><span>HENRIQUE SOUZA © 2026</span><a href="#topo">VOLTAR AO INÍCIO ↑</a><span>ENGENHARIA DE SOFTWARE</span></div></footer>;
}

export default function App() {
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const toggleSound = async () => {
    const enabled = await setSoundEnabled(!soundEnabled);
    setSoundEnabledState(enabled);
  };
  const slug = window.location.pathname.match(/^\/projetos\/([^/]+)\/?$/)?.[1];
  const caseProject = slug ? projects.find(project => project.slug === slug) : undefined;
  const notFound = !caseProject && window.location.pathname !== '/';

  useEffect(() => {
    const clickCue = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest('[data-sound-toggle]')) return;
      if (target.closest('button,a,[role="tab"]')) playClick();
    };
    document.addEventListener('click', clickCue);
    return () => document.removeEventListener('click', clickCue);
  }, []);
  useEffect(() => { if (!window.location.hash) return; const id = decodeURIComponent(window.location.hash.slice(1)); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })); }, []);
  useEffect(() => {
    const title = caseProject ? `${caseProject.title} — Henrique Souza` : notFound ? 'Página não encontrada — Henrique Souza' : 'Henrique Souza — Engenharia de software';
    const description = caseProject?.description ?? (notFound ? 'Esta rota não existe. Volte ao portfólio de Henrique Souza.' : 'Henrique Souza desenvolve software full stack em Belo Horizonte. Explore o código e os projetos diretamente no computador.');
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (notFound) { canonical?.remove(); ogUrl?.remove(); }
    else {
      const url = caseProject?.slug ? `${window.location.origin}/projetos/${caseProject.slug}/` : `${window.location.origin}/`;
      canonical?.setAttribute('href', url);
      ogUrl?.setAttribute('content', url);
    }
    if (notFound) {
      const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'robots' }));
      robots.content = 'noindex, nofollow';
    } else document.querySelector('meta[name="robots"]')?.remove();
  }, [caseProject, slug, notFound]);

  return <>
    <a className="skip-link" href={notFound ? '#topo' : caseProject ? '#topo' : '#workstation-screen'}>Pular para o conteúdo principal</a>
    {(caseProject || notFound) && <Header soundEnabled={soundEnabled} onSoundToggle={toggleSound}/>}
    {caseProject
      ? <><CasePage project={caseProject}/><CaseFooter/></>
      : notFound
        ? <main id="topo" className="not-found section-wrap"><span>404 / ROTA NÃO ENCONTRADA</span><h1>Esse caminho<br/>não existe.</h1><a href="/#workstation-screen">Voltar ao computador ↗</a></main>
        : <main className="portfolio-main" id="inicio"><SoftwareFilm soundEnabled={soundEnabled} onSoundToggle={toggleSound}/></main>}
  </>;
}
