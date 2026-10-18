import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const GH = "https://github.com/henriquesouza1832001-eng";
const EMAIL = "henriquesouza1832001@gmail.com";
const CONTACT = `mailto:${EMAIL}?subject=${encodeURIComponent("Conversa sobre oportunidade ou projeto")}`;

const projects = [
  {
    id: "pulso",
    name: "PULSO",
    url: "https://pulso-web.henriquesouza.workers.dev/",
    repo: `${GH}/Pulso`,
    cta: "Abrir o PULSO",
  },
  {
    id: "quarta",
    name: "Quarta Amstel",
    url: "https://quarta-amstel.pages.dev/",
    repo: `${GH}/quarta-amstel`,
    cta: "Acessar o produto",
  },
  {
    id: "sim",
    name: "e&t",
    url: "https://tudocomecoudeumsim.pages.dev/",
    repo: `${GH}/tudocomecoudeumsim`,
    cta: "Conhecer e&t",
  },
  {
    id: "trilha",
    name: "Trilha BH",
    url: "https://trilhabh.web.app/",
    repo: `${GH}/trilhaBH`,
    cta: "Abrir versão de teste",
  },
  {
    id: "rota",
    name: "Rota di Buteco",
    url: "https://rotadibuteco.web.app/",
    repo: `${GH}/rotadibuteco`,
    cta: "Abrir edição encerrada",
  },
];

// Put the finished public work first and leave the in-progress Trilha for last.
const portfolioProjects = [
  projects[1],
  projects[0],
  projects[2],
  projects[4],
  projects[3],
];
const projectNames = {
  quarta: "Quarta Amstel",
  pulso: "PULSO",
  sim: "e&t",
  trilha: "Trilha BH",
  rota: "Rota di Buteco",
};

function Arrow({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow diagonal" : "arrow"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.5 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <span>H</span>
      <i />
    </span>
  );
}

const excerpts = {
  quarta: {
    code: `let sub = await swReg.pushManager.getSubscription();

if (!sub) {
  sub = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: _urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
}`,
  },
  pulso: {
    code: `if s.source_classes and s.source_classes <= SOCIAL_CLASSES:
    value = min(value, SOCIAL_ONLY_CAP)`,
  },
};
function Header({ isProject = false }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a
        className="wordmark"
        href={isProject ? "/" : "#inicio"}
        aria-label="Henrique Souza, início"
      >
        <Mark />
        <span>
          HENRIQUE
          <br />
          SOUZA
        </span>
      </a>
      <nav
        className={open ? "main-nav nav-open" : "main-nav"}
        aria-label="Navegação principal"
      >
        <a
          href={isProject ? "/#projetos" : "#projetos"}
          onClick={() => setOpen(false)}
        >
          Projetos
        </a>
        <a
          href={isProject ? "/#codigo" : "#codigo"}
          onClick={() => setOpen(false)}
        >
          Código
        </a>
        <a
          href={isProject ? "/#sobre" : "#sobre"}
          onClick={() => setOpen(false)}
        >
          Sobre
        </a>
        <a className="nav-contact" href={CONTACT}>
          Vamos conversar <Arrow diagonal />
        </a>
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

const caseStudies = {
  quarta: {
    introduction:
      "Um app de bares e campanhas para levar as pessoas do mapa ao encontro.",
    statement: "Bares, campanhas e encontros começam no mapa.",
    story:
      "O PWA reúne descoberta de bares e campanhas. Está aberto para acesso; a data de lançamento ainda não foi definida.",
    sectionTitle: "Notificações continuam a experiência.",
    sectionBody:
      "O app pode ser instalado pelo navegador e retoma inscrições de notificações já autorizadas.",
    file: "www/js/push.js",
    language: "javascript",
    code: excerpts.quarta.code,
    codeNote: "A inscrição só é criada quando ainda não existe no navegador.",
    repositoryPath: "blob/main/www/js/push.js",
  },
  pulso: {
    introduction: "Um instrumento de leitura de sinais públicos do Brasil.",
    statement: "Um sinal sozinho não conta a história.",
    story:
      "Reúne informações públicas por evento, lugar e origem. Severidade e confiança ficam separadas para mostrar o que as fontes sustentam.",
    sectionTitle: "Confiança nasce da qualidade das fontes.",
    sectionBody:
      "Confirmações oficiais aumentam a confiança. Contradições e fontes duplicadas reduzem; sinais sociais, sozinhos, têm um limite.",
    file: "engine/pulso_engine/scoring/confidence.py",
    language: "python",
    code: excerpts.pulso.code,
    codeNote:
      "Sinais apoiados só por fontes sociais ficam limitados ao teto definido no sistema.",
    repositoryPath: "blob/main/engine/pulso_engine/scoring/confidence.py",
  },
  sim: {
    introduction: "Site, convite e organização do casamento em um só lugar.",
    statement: "Cada convidado encontra o que precisa.",
    story:
      "A API filtra convites e eventos conforme o grupo de cada convidado, para cada pessoa ver as informações certas da celebração.",
    sectionTitle: "Cada convite respeita o grupo.",
    sectionBody:
      "A API verifica o grupo do convidado antes de retornar os detalhes de cada evento.",
    file: "functions/api/[[route]].js",
    language: "javascript",
    code: "const groups = Array.isArray(event.group_ids)\n  ? event.group_ids\n  : JSON.parse(event.group_ids_json || '[]')\n\nreturn !groups.length || groups.includes(guest.group_id)\n  ? event\n  : null",
    codeNote:
      "Um evento sem grupos é público para os convidados; caso contrário, vale a participação do grupo.",
    repositoryPath: "blob/main/functions/api/%5B%5Broute%5D%5D.js",
  },
  trilha: {
    introduction: "Um roteiro colaborativo para descobrir Belo Horizonte.",
    statement: "O grupo desenha novos caminhos pela cidade.",
    story:
      "Em finalização, conecta mapa, visitas e roteiros compartilhados para grupos descobrirem bares pelo navegador ou no Android.",
    sectionTitle: "Do mapa ao roteiro do grupo.",
    sectionBody:
      "O fluxo conecta o app PWA ou Android à autenticação e aos dados do Firestore. Feed e ranking do grupo acompanham as atualizações em tempo real.",
    flow: [
      "PWA e Android",
      "Firebase Authentication",
      "Cloud Firestore",
      "Feed e ranking do grupo",
    ],
    repositoryPath: "blob/main/www/readme.md",
  },
  rota: {
    introduction:
      "Uma experiência social que acompanhou o Comida di Buteco em BH.",
    statement: "Cada visita entrava na história do grupo.",
    story:
      "A edição de 2026 reuniu bares, check-ins, avaliações e roteiros em grupo. O próximo ciclo terá um redesign completo.",
    sectionTitle: "A visita alimenta o grupo.",
    sectionBody:
      "O check-in registrava a visita e atualizava o feed e o ranking do grupo. Esta página documenta a edição encerrada.",
    flow: [
      "Visita ao bar",
      "Registro e avaliação",
      "Feed do grupo",
      "Ranking ao vivo",
    ],
    repositoryPath: "blob/master/README.md",
  },
};

function CaseProof({ story, repo }) {
  if (story.code)
    return (
      <div className="case-proof-code">
        <div className="case-file">
          <a
            href={`${repo}/${story.repositoryPath}`}
            target="_blank"
            rel="noreferrer"
          >
            {story.file.split("/").at(-1)} <Arrow diagonal />
          </a>
        </div>
        <pre>
          <HighlightedCode code={story.code} language={story.language} />
        </pre>
        <p>{story.codeNote}</p>
      </div>
    );
  return (
    <div className="case-proof-flow">
      {story.flow.map((step, index) => (
        <React.Fragment key={step}>
          <div>{step}</div>
          {index < story.flow.length - 1 && <span aria-hidden="true">↓</span>}
        </React.Fragment>
      ))}
      <a
        href={`${repo}/${story.repositoryPath}`}
        target="_blank"
        rel="noreferrer"
      >
        Ver documentação <Arrow diagonal />
      </a>
    </div>
  );
}

const syntaxKeywords = {
  javascript:
    /^(?:async|await|break|case|catch|class|const|continue|default|delete|do|else|export|extends|false|finally|for|from|function|if|import|in|instanceof|let|new|null|of|return|static|throw|true|try|typeof|var|void|while|yield)$/,
  python:
    /^(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|global|if|import|in|is|lambda|None|not|or|pass|raise|return|True|try|while|with|yield)$/,
};

function HighlightedCode({ code, language = "javascript" }) {
  const parts = code.split(
    /(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b[A-Z][A-Z0-9_]*\b|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][\w$]*\b)/g,
  );
  return (
    <code>
      {parts.map((part, index) => {
        let className;
        if (/^(?:"|'|`)/.test(part)) className = "syntax-string";
        else if (/^#/.test(part)) className = "syntax-comment";
        else if (/^\d/.test(part)) className = "syntax-number";
        else if (/^[A-Z][A-Z0-9_]*$/.test(part)) className = "syntax-constant";
        else if (syntaxKeywords[language]?.test(part))
          className = "syntax-keyword";
        return className ? (
          <span className={className} key={index}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </code>
  );
}

function ProjectDetail({ project }) {
  const story = caseStudies[project.id];
  const index = portfolioProjects.findIndex((item) => item.id === project.id);
  const previous =
    portfolioProjects[
      (index + portfolioProjects.length - 1) % portfolioProjects.length
    ];
  const next = portfolioProjects[(index + 1) % portfolioProjects.length];
  return (
    <main className={`folio-detail folio-detail-${project.id}`}>
      <div className="folio-detail-top">
        <a href="/#projetos">← Todos os projetos</a>
      </div>
      <section className="folio-detail-hero">
        <p className="folio-detail-introduction">{story.introduction}</p>
        <h1>{projectNames[project.id]}</h1>
        <div className="folio-detail-actions">
          <a
            className="folio-primary"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            {project.cta}
            <Arrow diagonal />
          </a>
          <a href={project.repo} target="_blank" rel="noreferrer">
            Abrir código no GitHub
            <Arrow diagonal />
          </a>
        </div>
      </section>
      <section className="folio-detail-story">
        <div>
          <h2>{story.statement}</h2>
        </div>
        <div className="folio-detail-description">
          <p>{story.story}</p>
        </div>
      </section>
      <section className="folio-detail-proof">
        <div className="folio-proof-heading">
          <h2>{story.sectionTitle}</h2>
          <p>{story.sectionBody}</p>
        </div>
        <CaseProof story={story} repo={project.repo} />
      </section>
      <nav className="folio-detail-next" aria-label="Mais projetos">
        <a href={`/projetos/${previous.id}`}>
          <span>Anterior</span>
          <b>{projectNames[previous.id]}</b>
          <Arrow />
        </a>
        <a href={`/projetos/${next.id}`}>
          <span>Próximo</span>
          <b>{projectNames[next.id]}</b>
          <Arrow />
        </a>
      </nav>
    </main>
  );
}

function currentProject() {
  const match = window.location.pathname.match(/^\/projetos\/([^/]+)\/?$/);
  return match
    ? projects.find((project) => project.id === match[1]) || null
    : null;
}

function App() {
  const [projectRoute, setProjectRoute] = useState(currentProject);
  useEffect(() => {
    const onPopState = () => setProjectRoute(currentProject());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    const title = projectRoute
      ? `${projectRoute.name} — Henrique Souza`
      : "Henrique Souza — Engenharia de software em Belo Horizonte";
    document.title = title;
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        projectRoute
          ? caseStudies[projectRoute.id].story
          : "Projetos públicos, produtos digitais e sistemas feitos por Henrique Souza. Explore os projetos, acesse os produtos e confira o código no GitHub.",
      );
  }, [projectRoute]);
  if (projectRoute) {
    return (
      <div
        className="portfolio project-portfolio folio-project-portfolio"
        data-project={projectRoute.id}
      >
        <Header isProject />
        <ProjectDetail project={projectRoute} />
        <footer className="folio-footer">
          <a className="wordmark footer-mark" href="/">
            <Mark />
            <span>
              HENRIQUE
              <br />
              SOUZA
            </span>
          </a>
          <span>Feito em Belo Horizonte, Brasil.</span>
          <a href={GH} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={`mailto:${EMAIL}`}>E-mail</a>
        </footer>
      </div>
    );
  }
  return <PortfolioHome />;
}

function ProjectArtwork({ project }) {
  const marks = {
    quarta: (
      <>
        <path d="M46 48h208v124H46z" className="art-map-boundary" />
        <path d="m46 88 62-24 66 27 80-30M109 64v108m65-81v81m66-111v111" className="art-map-streets" pathLength="1" />
        <path d="M144 105c0-15 12-27 27-27s27 12 27 27c0 20-27 51-27 51s-27-31-27-51Z" className="art-map-pin" pathLength="1" />
        <circle cx="171" cy="105" r="8" className="art-fill art-map-point" />
      </>
    ),
    pulso: (
      <>
        <path d="M34 112h45l23-46 41 94 34-70 21 32h68" className="art-pulse-line" pathLength="1" />
        <path d="M34 176h232M34 48h232" className="art-faint" />
        <circle cx="177" cy="90" r="7" className="art-fill art-pulse-point" />
      </>
    ),
    sim: (
      <>
        <circle cx="132" cy="110" r="55" className="art-ring-one" />
        <circle cx="184" cy="110" r="55" className="art-ring-two" />
        <path d="M150 71a55 55 0 0 1 0 78m16-78a55 55 0 0 0 0 78" className="art-faint" />
      </>
    ),
    trilha: (
      <>
        <path d="M40 162c42 0 42-88 84-88s42 72 84 72 42-43 52-43" className="art-trail-line" pathLength="1" />
        <circle cx="40" cy="162" r="9" className="art-fill art-station" />
        <circle cx="124" cy="74" r="9" className="art-fill art-station" />
        <circle cx="208" cy="146" r="9" className="art-fill art-station" />
        <circle cx="260" cy="103" r="9" className="art-fill art-station" />
      </>
    ),
    rota: (
      <>
        <path d="m38 60 74-24 76 24 74-24v124l-74 24-76-24-74 24Z" className="art-route-map" pathLength="1" />
        <path d="M112 36v124m76-100v124" className="art-map-folds" pathLength="1" />
        <path d="M128 92c0-15 12-27 27-27s27 12 27 27c0 20-27 51-27 51s-27-31-27-51Z" className="art-route-pin" pathLength="1" />
        <circle cx="155" cy="92" r="8" className="art-fill art-route-point" />
      </>
    ),
  };

  return (
    <div className={`folio-project-art art-${project.id}`} aria-hidden="true">
      <svg viewBox="0 0 300 220" fill="none" focusable="false">
        {marks[project.id]}
      </svg>
    </div>
  );
}

const projectPresentation = {
  quarta: {
    summary: "Um mapa para descobrir bares e acompanhar as campanhas da quarta-feira.",
  },
  pulso: {
    summary: "Acontecimentos de fontes públicas, organizados por lugar, origem e confiança.",
  },
  sim: {
    summary: "Site, convites e organização da celebração para o casal e os convidados.",
  },
  trilha: {
    summary: "Roteiros por bares de Belo Horizonte, planejados com amigos no navegador ou Android.",
  },
  rota: {
    summary: "A edição 2026 reuniu check-ins, avaliações e roteiros de bares. O próximo ciclo será redesenhado.",
  },
};

function PortfolioProject({ project }) {
  const presentation = projectPresentation[project.id];
  return (
    <article
      className={`folio-project folio-${project.id}`}
      id={`folio-${project.id}`}
      data-project={project.id}
    >
      <div className="folio-copy">
        <h2>
          <a
            href={`/projetos/${project.id}`}
            aria-label={`Ler sobre ${projectNames[project.id]}`}
          >
            {projectNames[project.id]}
            <Arrow diagonal />
          </a>
        </h2>
        <p className="folio-description">{presentation.summary}</p>
        <div className="folio-links">
          <a
            className="folio-primary"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            {project.id === "quarta" ? "Acessar produto" : project.cta}
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <ProjectArtwork project={project} />
    </article>
  );
}

function PortfolioHome() {
  const progressRef = useRef(null);
  useEffect(() => {
    const home = document.querySelector(".folio-home");
    home?.classList.add("folio-motion");
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    document.querySelectorAll(".folio-project").forEach((project) => {
      revealObserver.observe(project);
    });
    return () => {
      revealObserver.disconnect();
      home?.classList.remove("folio-motion");
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range =
          document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
        const home = document.querySelector(".folio-home");
        const marker =
          window.innerWidth >= 901 ? 142 : Math.round(window.innerHeight * 0.44);
        const projects = [...document.querySelectorAll(".folio-project")];
        const focusedProject = projects
          .filter((project) => {
            const bounds = project.getBoundingClientRect();
            return bounds.top <= marker && bounds.bottom > marker;
          })
          .at(-1);
        const previousProject = projects
          .filter((project) => project.getBoundingClientRect().top <= marker)
          .at(-1);
        if (home) {
          home.dataset.activeProject =
            focusedProject?.dataset.project ||
            previousProject?.dataset.project ||
            projects[0]?.dataset.project ||
            "quarta";
        }
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);
  return (
    <div className="portfolio folio-home" data-active-project="quarta">
      <div className="folio-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <Header />
      <main id="inicio">
        <section className="folio-hero">
          <h1>
            Da regra
            <br />
            <em>à operação.</em>
          </h1>
          <div className="folio-hero-bottom">
            <p>
              Engenharia de software que conecta contexto de negócio, arquitetura e entrega.
            </p>
            <a href="#projetos">
              Ver projetos <span>↓</span>
            </a>
          </div>
        </section>
        <section className="folio-work" id="projetos" aria-labelledby="projects-heading">
          <div className="folio-section-heading" id="codigo">
            <h2 className="folio-projects-heading" id="projects-heading">
              Projetos
            </h2>
            <a href={GH} target="_blank" rel="noreferrer">
              Meu GitHub <Arrow diagonal />
            </a>
          </div>
          <div className="folio-project-grid">
            {portfolioProjects.map((project) => (
              <PortfolioProject project={project} key={project.id} />
            ))}
          </div>
        </section>
        <section className="folio-about" id="sobre">
          <div className="folio-about-heading">
            <h2>
              Um olhar
              <br />
              de <em>engenharia.</em>
            </h2>
          </div>
          <div className="folio-about-copy">
            <p>
              Sou Henrique, de Belo Horizonte. Minha experiência com engenharia
              e construção civil me ensinou a ligar as regras de negócio à
              estrutura e à operação de um sistema.
            </p>
            <div className="folio-about-links">
              <a href={GH} target="_blank" rel="noreferrer">
                Explorar meu GitHub <Arrow diagonal />
              </a>
              <a
                href="https://www.linkedin.com/in/henrique-s-4080b9139/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>
        <section className="folio-contact">
          <div>
            <h2>
              Vamos fazer
              <br />
              <em>funcionar.</em>
            </h2>
          </div>
          <a href={CONTACT}>
            Falar sobre uma oportunidade <Arrow diagonal />
          </a>
          <div className="folio-social">
            <a href={GH} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/henrique-s-4080b9139/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href={CONTACT}>E-mail</a>
          </div>
        </section>
      </main>
      <footer className="folio-footer">
        <a className="wordmark footer-mark" href="#inicio">
          <Mark />
          <span>
            HENRIQUE
            <br />
            SOUZA
          </span>
        </a>
        <span>Feito em Belo Horizonte, Brasil.</span>
        <a href="#inicio">Voltar ao início ↑</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
