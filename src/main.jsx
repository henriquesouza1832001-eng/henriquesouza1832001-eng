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
    repo: GITHUB + "/quarta-amstel",
    summary: "Mapa de bares e campanhas da Quarta Amstel.",
    status: "Aberto para acesso. O lançamento ainda não tem data definida.",
    language: "javascript",
    code: [
      "let sub = await swReg.pushManager.getSubscription();",
      "",
      "if (!sub) {",
      "  sub = await swReg.pushManager.subscribe({",
      "    userVisibleOnly: true,",
      "    applicationServerKey: _urlBase64ToUint8Array(VAPID_PUBLIC_KEY),",
      "  });",
      "}",
    ].join("\n"),
    codeNote: "O navegador reaproveita uma inscrição existente antes de criar outra.",
    repositoryPath: "blob/main/www/js/push.js",
    storyTitle: "Encontrar o bar é só o começo.",
    story: "O projeto combina mapa, campanhas e avisos numa experiência instalável. Com a permissão do visitante, o navegador pode receber notificações do sistema.",
    proofTitle: "A mesma inscrição não é criada duas vezes.",
    proof: "Antes de criar outra inscrição, o código consulta a Push API. Se já existe uma, reutiliza o endpoint; caso contrário, pede permissão e envia a nova inscrição ao Worker.",
    cta: "Abrir Quarta Amstel",
  },
  {
    id: "sim",
    name: "e&t",
    url: "https://tudocomecoudeumsim.pages.dev/",
    repo: GITHUB + "/tudocomecoudeumsim",
    summary: "Site de casamento, convites e eventos do casal.",
    language: "javascript",
    code: [
      "const groups = Array.isArray(event.group_ids)",
      "  ? event.group_ids",
      "  : JSON.parse(event.group_ids_json || '[]')",
      "",
      "return !groups.length || groups.includes(guest.group_id)",
      "  ? event",
      "  : null",
    ].join("\n"),
    codeNote: "A API confere o grupo antes de devolver cada evento.",
    repositoryPath: "blob/main/functions/api/%5B%5Broute%5D%5D.js",
    storyTitle: "Cada convite conhece o seu grupo.",
    story: "O site público apresenta a celebração; a área de convites organiza a entrada e os eventos de cada grupo.",
    proofTitle: "A regra não fica só na interface.",
    proof: "A API verifica a autorização e filtra a lista antes de devolver os eventos. O acesso não depende só de esconder uma seção na tela.",
    cta: "Visitar e&t",
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
  return <img className="brand-logo" src="/assets/logo-hs.png" alt="" />;
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

function ProjectMark({ project }) {
  if (project.id === "quarta") {
    return (
      <div className="project-mark project-mark-quarta" role="img" aria-label="Marca da Quarta Amstel">
        <img src="/assets/amstel-app-mark.png" alt="Amstel" />
      </div>
    );
  }

  return (
    <div className="project-mark project-mark-sim" role="img" aria-label="e&t">
      <span>e<span aria-hidden="true">&</span>t</span>
    </div>
  );
}
function ProjectSpread({ project }) {
  return (
    <article className={"project-spread spread-" + project.id} id={project.id}>
      <div className="case-visual">
        <ProjectMark project={project} />
      </div>
      <div className="project-copy">
        <p className="project-name">{project.name}</p>
        <h3><a href={"/projetos/" + project.id}>{project.storyTitle}<Arrow diagonal /></a></h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-story">{project.story}</p>
        {project.status && <p className="project-status">{project.status}</p>}
        <div className="project-source">
          <pre><HighlightedCode code={project.code} language={project.language} /></pre>
          <p>{project.codeNote}</p>
          <a href={project.repo + "/" + project.repositoryPath} target="_blank" rel="noreferrer">Ver este trecho no GitHub <Arrow diagonal /></a>
        </div>
        <div className="project-actions">
          <a className="button-primary" href={project.url} target="_blank" rel="noreferrer">{project.cta}<Arrow diagonal /></a>
          <a className="text-link" href={"/projetos/" + project.id}>Conhecer o case <Arrow /></a>
        </div>
      </div>
    </article>
  );
}

function ChannelReceiver({ project, onSelect }) {
  const nextChannel = () => {
    const index = projects.findIndex((item) => item.id === project.id);
    onSelect(projects[(index + 1) % projects.length].id);
  };
  const turnOnWheel = (event) => {
    if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
    event.preventDefault();
    nextChannel();
  };

  return (
    <div className="receiver">
      <div className="receiver-body">
        <section className={"receiver-screen screen-" + project.id} aria-live="polite" key={project.id}>
          <ProjectMark project={project} />
          <div className="screen-copy">
            <h2>{project.storyTitle}</h2><p>{project.summary}</p>
            <a href={"/projetos/" + project.id}>Ver o case <Arrow diagonal /></a>
          </div>
        </section>
        <aside className="receiver-controls">
          <button className="receiver-wheel" type="button" aria-label={"Sintonizar próximo projeto depois de " + project.name} onClick={nextChannel} onWheel={turnOnWheel}>
            <span />
          </button>
          <span className="sr-only">Use a roda para alternar entre Quarta Amstel e e&t.</span>
        </aside>
      </div>
      <nav className="channel-switcher" aria-label="Abrir o case de um projeto">
        {projects.map((item) => (
          <a key={item.id} href={"/projetos/" + item.id} className={item.id === project.id ? "is-active" : ""}>
            <span>{item.name}</span><Arrow diagonal />
          </a>
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
    <div className="portfolio home-page" id="inicio">
      <Header />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">Engenheiro de software</p>
            <h1 id="hero-title">Software para<br /><em>o mundo real.</em></h1>
            <div className="hero-bottom">
              <p>Construo software da regra de negócio à publicação.</p>
              <a href="#projetos">Explorar projetos <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <ChannelReceiver project={projectById[activeProject]} onSelect={setActiveProject} />
        </section>

        <ProjectMarquee />

        <section className="work-section" id="projetos" aria-labelledby="work-title">
          <div className="work-heading">
            <h2 id="work-title">Projetos reais.<br />Engenharia por dentro.</h2>
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
            {projects.map((project) => <ProjectSpread key={project.id} project={project} />)}
          </div>
        </section>

        <section className="about-section" id="sobre">
          <h2>Do problema<br />à <em>produção.</em></h2>
          <div className="about-copy">
            <p>Sou Henrique, engenheiro de software em Belo Horizonte. Trabalho do modelo de dados à publicação, com atenção às regras que fazem o produto funcionar no uso real.</p>
            <p>Na <a className="about-project-link" href="/projetos/quarta">Quarta Amstel</a>, o navegador reaproveita uma inscrição de notificações antes de registrar outra. No <a className="about-project-link" href="/projetos/sim">e&amp;t</a>, a API confere quais eventos estão liberados para o grupo de cada convite. São regras do produto garantidas no código.</p>
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
  python: /^(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|not|or|pass|raise|return|True|try|while|with|yield)$/,
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
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <main className={`detail-page detail-${project.id}`}>
      <section className="detail-hero">
        <a className="back-link" href="/#projetos"><Arrow /> Todos os projetos</a>
        <ProjectMark project={project} />
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
        <a href={`/projetos/${previous.id}`}><span>Projeto anterior</span><strong>{previous.name}</strong><Arrow /></a>
        <a href={`/projetos/${next.id}`}><span>Próximo projeto</span><strong>{next.name}</strong><Arrow /></a>
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

