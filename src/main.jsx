import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const GITHUB = "https://github.com/henriquesouza1832001-eng";
const LINKEDIN = "https://www.linkedin.com/in/henrique-s-4080b9139/";
const EMAIL = "henriquesouza1832001@gmail.com";
const CONTACT = `mailto:${EMAIL}?subject=${encodeURIComponent("Conversa sobre oportunidade ou projeto")}`;

const projects = [
  {
    id: "quarta",
    name: "Quarta Amstel",
    url: "https://quarta-amstel.pages.dev/",
    repo: `${GITHUB}/quarta-amstel`,
    summary: "Mapa de bares, campanhas e avisos da Quarta Amstel.",
    status: "Pronto para acesso. A data de lançamento ainda não foi definida.",
    language: "javascript",
    code: `let sub = await swReg.pushManager.getSubscription();

if (!sub) {
  sub = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: _urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
}`,
    codeNote: "A inscrição só é criada quando o navegador ainda não tem uma.",
    repositoryPath: "blob/main/www/js/push.js",
    storyTitle: "Do mapa ao encontro.",
    story: "O produto reúne descoberta de bares e campanhas em uma experiência instalável. A inscrição de notificações respeita a permissão do navegador e evita duplicar uma inscrição existente.",
    proofTitle: "Uma experiência que continua depois da visita.",
    proof: "O service worker permite que o produto instalado retome a conversa com quem autorizou receber notificações.",
    composition: ["Bares", "Campanhas", "Encontros"],
    cta: "Acessar o produto",
  },
  {
    id: "sim",
    name: "e&t",
    url: "https://tudocomecoudeumsim.pages.dev/",
    repo: `${GITHUB}/tudocomecoudeumsim`,
    summary: "Um site de casamento com convites e informações organizadas para convidados e grupos.",
    language: "javascript",
    code: `const groups = Array.isArray(event.group_ids)
  ? event.group_ids
  : JSON.parse(event.group_ids_json || '[]')

return !groups.length || groups.includes(guest.group_id)
  ? event
  : null`,
    codeNote: "Cada convidado recebe os detalhes dos eventos do próprio grupo.",
    repositoryPath: "blob/main/functions/api/%5B%5Broute%5D%5D.js",
    storyTitle: "Cada pessoa recebe o convite certo.",
    story: "A experiência reúne o site da celebração e uma aplicação para organizar convidados e eventos. A API verifica o grupo antes de entregar as informações de cada convite.",
    proofTitle: "As regras do convite vivem no sistema.",
    proof: "O grupo de cada convidado determina quais eventos aparecem. A mesma regra é aplicada no servidor, em vez de depender de um filtro visual na página.",
    composition: ["Site", "Convite", "Celebração"],
    cta: "Conhecer e&t",
  },
];

const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));

function Arrow({ diagonal = false }) {
  return (
    <svg className={diagonal ? "arrow arrow-diagonal" : "arrow"} viewBox="0 0 20 20" aria-hidden="true">
      <path d={diagonal ? "M5 15 15 5M6 5h9v9" : "M3 10h13m-5-5 5 5-5 5"} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Mark() {
  return <span className="mark" aria-hidden="true"><span>H</span><i /></span>;
}

function Header({ detail = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = detail ? "/" : "#inicio";
  return (
    <header className="site-header">
      <a className="wordmark" href={home} aria-label="Henrique Souza, início">
        <Mark />
        <span className="wordmark-name">Henrique Souza</span>
      </a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
        <a href={detail ? "/#projetos" : "#projetos"} onClick={() => setMenuOpen(false)}>Projetos</a>
        <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
        <a href={detail ? "/#sobre" : "#sobre"} onClick={() => setMenuOpen(false)}>Sobre</a>
        <a className="nav-contact" href={CONTACT}>Vamos conversar <Arrow diagonal /></a>
      </nav>
    </header>
  );
}

function ProjectComposition({ project }) {
  const drawing = {
    quarta: (
      <svg viewBox="0 0 600 360" aria-hidden="true">
        <path className="map-street" d="M-20 70 174 119 388 79 626 128M-20 245 162 205 338 242 622 194M88-20l41 124-25 126 57 150M302-20l-18 132 43 129-16 139M509-20l-34 110 53 117-41 153" />
        <path className="map-route" d="m119 104 166 28 177-35 53 117-177 28-74 119" />
        <g className="map-pin"><circle cx="119" cy="104" r="17"/><circle cx="119" cy="104" r="5"/><circle cx="285" cy="132" r="17"/><circle cx="285" cy="132" r="5"/><circle cx="462" cy="97" r="17"/><circle cx="462" cy="97" r="5"/><circle cx="515" cy="214" r="17"/><circle cx="515" cy="214" r="5"/><circle cx="338" cy="242" r="17"/><circle cx="338" cy="242" r="5"/></g>
      </svg>
    ),
    sim: (
      <svg viewBox="0 0 600 360" aria-hidden="true">
        <rect className="invite-card" x="45" y="62" width="215" height="235" rx="2"/><rect className="invite-card invite-card-back" x="67" y="40" width="215" height="235" rx="2"/>
        <path className="invite-rule" d="M103 98h143M103 235h143"/><text className="invite-script" x="116" y="170">vocês</text>
        <path className="group-branch" d="M355 109h92v54h93M447 163v75h93"/><circle className="group-dot" cx="355" cy="109" r="10"/><circle className="group-dot" cx="540" cy="163" r="10"/><circle className="group-dot" cx="540" cy="238" r="10"/>
      </svg>
    ),
  }[project.id];
  return (
    <div className={`project-composition composition-${project.id}`} role="img" aria-label={project.composition.join(" · ")}>
      {drawing}
    </div>
  );
}

function ProjectSpread({ project, active }) {
  return (
    <article className={`project-spread spread-${project.id}`} id={project.id} data-active={active ? "true" : undefined}>
      <ProjectComposition project={project} />
      <div className="project-copy">
        <h3><a href={`/projetos/${project.id}`}>{project.name}<Arrow diagonal /></a></h3>
        <p className="project-summary">{project.summary}</p>
        {project.status && <p className="project-status">{project.status}</p>}
        <div className="project-actions">
          <a className="button-primary" href={project.url} target="_blank" rel="noreferrer">{project.cta}<Arrow diagonal /></a>
          <a className="text-link" href={`/projetos/${project.id}`}>Como foi construído <Arrow /></a>
        </div>
      </div>
    </article>
  );
}

function ChannelReceiver({ project, onSelect }) {
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const nextChannel = () => {
    onSelect(nextProject.id);
  };
  const turnOnWheel = (event) => {
    if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
    event.preventDefault();
    nextChannel();
  };

  return (
    <div className="receiver">
      <div className="receiver-caption">
        <span>PROJETOS PÚBLICOS</span>
        <span>BELO HORIZONTE</span>
      </div>
      <div className="receiver-body">
        <section className={`receiver-screen screen-${project.id}`} aria-live="polite" key={project.id}>
          <div className="screen-header">
            <span><i /> EM EXIBIÇÃO</span>
          </div>
          <div className="screen-content">
            <ProjectComposition project={project} />
            <div className="screen-copy">
              <span className="screen-project-name">{project.name}</span>
              <h2>{project.storyTitle}</h2>
              <p>{project.summary}</p>
              <a href={`/projetos/${project.id}`}>Ver o projeto por dentro <Arrow diagonal /></a>
            </div>
          </div>
        </section>
        <aside className="receiver-controls">
          <Mark />
          <span className="receiver-label">CANAL</span>
          <button className="receiver-wheel" type="button" aria-label={`Mudar para ${nextProject.name}`} style={{ "--dial-turn": `${currentIndex * 180}deg` }} onClick={nextChannel} onWheel={turnOnWheel}>
            <span />
          </button>
          <span className="receiver-label receiver-hint">MUDAR CANAL</span>
        </aside>
      </div>
      <nav className="channel-switcher" aria-label="Canais do portfólio">
        {projects.map((item) => (
          <button key={item.id} type="button" className={item.id === project.id ? "is-active" : ""} aria-pressed={item.id === project.id} onClick={() => onSelect(item.id)}>
            <span>{item.name}</span><Arrow diagonal />
          </button>
        ))}
      </nav>
    </div>
  );
}

function ProjectMarquee() {
  const names = [...projects, ...projects].map((project) => project.name);
  return (
    <div className="project-marquee" aria-label="Projetos em destaque">
      <div className="project-marquee-track" aria-hidden="true">
        {names.map((name, index) => <span key={`${name}-${index}`}>{name}<i>✳</i></span>)}
      </div>
    </div>
  );
}

function Home() {
  const [activeProject, setActiveProject] = useState("quarta");
  useEffect(() => {
    const items = document.querySelectorAll(".project-spread, .about-section, .contact-section");
    const hasIntersectionObserver = "IntersectionObserver" in window;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let revealObserver = null;

    if (hasIntersectionObserver && !reduceMotion) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      items.forEach((item) => revealObserver.observe(item));
    } else {
      items.forEach((item) => item.classList.add("is-visible"));
    }

    let projectObserver = null;
    if (hasIntersectionObserver) {
      projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveProject(entry.target.id);
        });
      }, { rootMargin: "-44% 0px -44% 0px" });
      document.querySelectorAll(".project-spread").forEach((project) => projectObserver.observe(project));
    } else {
      const updateActiveProject = () => {
        const midpoint = window.innerHeight / 2;
        const currentProject = [...document.querySelectorAll(".project-spread")].reduce((closest, project) => {
          const distance = Math.abs(project.getBoundingClientRect().top + project.offsetHeight / 2 - midpoint);
          return !closest || distance < closest.distance ? { id: project.id, distance } : closest;
        }, null);
        if (currentProject) setActiveProject((active) => active === currentProject.id ? active : currentProject.id);
      };
      window.addEventListener("scroll", updateActiveProject, { passive: true });
      updateActiveProject();
      return () => window.removeEventListener("scroll", updateActiveProject);
    }

    return () => {
      revealObserver?.disconnect();
      projectObserver?.disconnect();
    };
  }, []);

  return (
    <div className="portfolio home-page" id="inicio" data-active-project={activeProject}>
      <Header />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">Henrique Souza <span>·</span> Engenheiro de software</p>
            <h1 id="hero-title">Software para<br /><em>o mundo real.</em></h1>
            <div className="hero-bottom">
              <p>Do mapa de bares à lógica dos convites: dois produtos publicados, com regras pensadas para quem usa cada um.</p>
              <a href="#projetos">Explorar projetos <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <ChannelReceiver project={projectById[activeProject]} onSelect={setActiveProject} />
        </section>

        <ProjectMarquee />

        <section className="work-section" id="projetos" aria-labelledby="work-title">
          <div className="work-heading">
            <h2 id="work-title">Dois produtos.<br />Código público.</h2>
            <a href={GITHUB} target="_blank" rel="noreferrer">Ver repositórios públicos <Arrow diagonal /></a>
          </div>
          <nav className="project-index" aria-label="Ir direto a um projeto">
            {projects.map((project) => (
              <a key={project.id} href={`#${project.id}`} aria-current={activeProject === project.id ? "location" : undefined}>
                {project.name}<Arrow />
              </a>
            ))}
          </nav>
          <div className="project-list">
            {projects.map((project) => <ProjectSpread key={project.id} project={project} active={activeProject === project.id} />)}
          </div>
        </section>

        <section className="about-section" id="sobre">
          <h2>Do problema<br />à <em>produção.</em></h2>
          <div className="about-copy">
            <p>Sou Henrique, engenheiro de software em Belo Horizonte. Trabalho do modelo de dados à publicação, com atenção às regras que fazem o produto funcionar no uso real.</p>
            <p>No <a className="about-project-link" href="/projetos/quarta">Quarta Amstel</a>, o navegador respeita a permissão antes de inscrever notificações. No <a className="about-project-link" href="/projetos/sim">e&t</a>, a API verifica o grupo do convidado antes de mostrar eventos restritos. São problemas diferentes; em ambos, a regra fica no lugar em que precisa valer.</p>
            <div className="about-links">
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <p>Para vagas em engenharia de software, colaboração ou um produto que precisa sair do papel.</p>
          <h2>Vamos<br /><em>conversar.</em></h2>
          <div className="contact-actions">
            <a href={CONTACT}>Falar sobre uma oportunidade <Arrow diagonal /></a>
            <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a className="contact-linkedin" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-wordmark" href="#inicio"><Mark /> Henrique Souza</a>
        <span>Belo Horizonte, Brasil</span>
        <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
      </footer>
    </div>
  );
}

const codeWords = {
  javascript: /^(?:async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|false|finally|for|from|function|if|import|in|instanceof|let|new|null|of|return|static|throw|true|try|typeof|var|void|while|yield)$/,
};

function HighlightedCode({ code, language }) {
  const parts = code.split(/(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b[A-Z][A-Z0-9_]*\b|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][\w$]*\b)/g);
  return <code>{parts.map((part, index) => {
    let type = "";
    if (/^(?:"|'|`)/.test(part)) type = "string";
    else if (/^#/.test(part)) type = "comment";
    else if (/^\d/.test(part)) type = "number";
    else if (/^[A-Z][A-Z0-9_]*$/.test(part)) type = "constant";
    else if (codeWords[language]?.test(part)) type = "keyword";
    return type ? <span className={`syntax-${type}`} key={index}>{part}</span> : part;
  })}</code>;
}

function ProjectDetail({ project }) {
  const index = projects.findIndex((item) => item.id === project.id);
  const otherProject = projects[(index + 1) % projects.length];
  return (
    <main className={`detail-page detail-${project.id}`}>
      <section className="detail-hero">
        <a className="back-link" href="/#projetos"><Arrow /> Todos os projetos</a>
        <ProjectComposition project={project} />
        <div className="detail-title">
          <p>{project.summary}</p>
          <h1>{project.name}</h1>
          {project.status && <p className="detail-status">{project.status}</p>}
          <div className="detail-actions">
            <a className="button-primary" href={project.url} target="_blank" rel="noreferrer">{project.cta}<Arrow diagonal /></a>
            <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">Ver repositório no GitHub <Arrow diagonal /></a>
          </div>
        </div>
      </section>
      <section className="detail-story">
        <h2>{project.storyTitle}</h2>
        <p>{project.story}</p>
      </section>
      <section className="detail-proof">
        <div className="proof-copy">
          <h2>{project.proofTitle}</h2>
          <p>{project.proof}</p>
        </div>
        {project.code ? (
          <div className="code-proof">
            <a href={`${project.repo}/${project.repositoryPath}`} target="_blank" rel="noreferrer">Abrir trecho no GitHub <Arrow diagonal /></a>
            <pre><HighlightedCode code={project.code} language={project.language} /></pre>
            <p>{project.codeNote}</p>
          </div>
        ) : (
          <div className={`flow-proof flow-${project.id}`}>
            {project.composition.map((step, stepIndex) => <React.Fragment key={step}><span>{step}</span>{stepIndex < project.composition.length - 1 && <b aria-hidden="true">→</b>}</React.Fragment>)}
            <a href={`${project.repo}/${project.repositoryPath}`} target="_blank" rel="noreferrer">Ver documentação no GitHub <Arrow diagonal /></a>
          </div>
        )}
      </section>
      <nav className="detail-next" aria-label="Navegar entre projetos">
        <a href="/#projetos"><span>Voltar ao portfólio</span><strong>Todos os projetos</strong><Arrow /></a>
        <a href={`/projetos/${otherProject.id}`}><span>Outro projeto</span><strong>{otherProject.name}</strong><Arrow /></a>
      </nav>
    </main>
  );
}

function App() {
  const match = window.location.pathname.match(/^\/projetos\/([^/]+)\/?$/);
  const project = match ? projectById[match[1]] : null;
  useEffect(() => {
    const title = project ? `${project.name} — Henrique Souza` : "Henrique Souza — Engenheiro de software";
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    const description = project ? project.summary : "Henrique Souza é engenheiro de software em Belo Horizonte. Projetos web com regras de negócio, dados, integrações e código público.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", project ? description : "Engenheiro de software em Belo Horizonte. Conheça sistemas públicos e decisões de engenharia nos projetos de Henrique Souza.");
  }, [project]);
  return project ? (
    <div className="portfolio detail-portfolio">
      <Header detail />
      <ProjectDetail project={project} />
    </div>
  ) : <Home />;
}

createRoot(document.getElementById("root")).render(<App />);

