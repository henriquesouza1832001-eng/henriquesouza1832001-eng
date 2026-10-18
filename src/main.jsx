import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const GH = "https://github.com/henriquesouza1832001-eng";
const EMAIL = "henriquesouza1832001@gmail.com";

const projects = [
  {
    id: "pulso",
    name: "PULSO",
    tags: ["Python", "React", "Cloudflare"],
    url: "https://pulso-web.henriquesouza.workers.dev/",
    repo: `${GH}/Pulso`,
    cta: "Abrir o PULSO",
  },
  {
    id: "quarta",
    name: "Quarta Amstel",
    tags: ["PWA", "Web Push", "Cloudflare Workers"],
    url: "https://quarta-amstel.pages.dev/",
    repo: `${GH}/quarta-amstel`,
    cta: "Explorar o app",
  },
  {
    id: "sim",
    name: "e&t",
    tags: ["Produto digital", "React", "Cloudflare"],
    url: "https://tudocomecoudeumsim.pages.dev/",
    repo: `${GH}/tudocomecoudeumsim`,
    cta: "Conhecer e&t",
  },
  {
    id: "trilha",
    name: "Trilha BH",
    tags: ["PWA", "Firebase", "Capacitor"],
    url: "https://trilhabh.web.app/",
    repo: `${GH}/trilhaBH`,
    cta: "Abrir a versão de teste",
  },
  {
    id: "rota",
    name: "Rota di Buteco",
    tags: ["PWA", "Produto", "Redesign"],
    url: "https://rotadibuteco.web.app/",
    repo: `${GH}/rotadibuteco`,
    cta: "Ver a versão de 2026",
  },
];

const portfolioProjects = [projects[1], projects[0], ...projects.slice(2)];
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
    code: `value += 25 if s.official_confirmation else 0
value -= 30 * s.contradiction
value -= 20 * s.duplicate_ratio
value = max(0.0, min(100.0, value))

if s.source_classes and s.source_classes <= SOCIAL_CLASSES:
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
        <a className="nav-contact" href={`mailto:${EMAIL}`}>
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
    status: "Disponível para acesso · lançamento sem data definida",
    introduction:
      "Um app de bares e campanhas para levar as pessoas do mapa ao encontro.",
    statement: "A próxima quarta começa escolhendo para onde ir.",
    story:
      "O Quarta Amstel reúne descoberta de bares, campanhas e uma experiência que funciona no celular. O produto está aberto para acesso; a data oficial de lançamento ainda não foi definida.",
    sectionTitle: "A experiência continua depois do mapa.",
    sectionBody:
      "Como PWA, o app pode ser instalado pelo navegador. As notificações retomam a inscrição existente quando a pessoa já autorizou o recurso.",
    file: "www/js/push.js",
    code: excerpts.quarta.code,
    codeNote: "A inscrição só é criada quando ainda não existe no navegador.",
    repositoryPath: "blob/main/www/js/push.js",
  },
  pulso: {
    status: "Produto público",
    introduction: "Um instrumento de leitura de sinais públicos do Brasil.",
    statement: "Um sinal isolado não conta a história inteira.",
    story:
      "O PULSO coleta informações públicas e as organiza por evento, lugar e origem. Severidade e confiança são tratadas separadamente para deixar claro o que os sinais sustentam — e o que ainda não sustentam.",
    sectionTitle: "Confiança é construída a partir das fontes.",
    sectionBody:
      "Confirmações oficiais somam evidência. Contradições e fontes duplicadas reduzem a confiança; sinais sociais, sozinhos, têm um limite.",
    file: "engine/pulso_engine/scoring/confidence.py",
    code: excerpts.pulso.code,
    codeNote:
      "O cálculo separa confirmação, contradição, duplicidade e limites de fonte.",
    repositoryPath: "blob/main/engine/pulso_engine/scoring/confidence.py",
  },
  sim: {
    status: "Experiência pública",
    introduction: "Site, convite e organização do casamento em um só lugar.",
    statement: "Cada pessoa convidada encontra o que precisa saber.",
    story:
      "O e&t aproxima o site do casal e os detalhes da celebração. Convites e eventos publicados respeitam o grupo de cada convidado, mantendo as informações certas com as pessoas certas.",
    sectionTitle: "O convite também define o acesso.",
    sectionBody:
      "A API filtra os eventos publicados pelo grupo do convidado antes de apresentar os detalhes da celebração.",
    file: "functions/api/[[route]].js",
    code: "const groups = Array.isArray(event.group_ids)\n  ? event.group_ids\n  : JSON.parse(event.group_ids_json || '[]')\n\nreturn !groups.length || groups.includes(guest.group_id)\n  ? event\n  : null",
    codeNote:
      "Um evento sem grupos é público para os convidados; caso contrário, vale a participação do grupo.",
    repositoryPath: "blob/main/functions/api/%5B%5Broute%5D%5D.js",
  },
  trilha: {
    status: "Pré-beta · produto em finalização",
    introduction: "Um roteiro colaborativo para descobrir Belo Horizonte.",
    statement: "A cidade aparece quando a gente sai pelo caminho.",
    story:
      "A Trilha BH organiza a descoberta de bares por mapa, visitas e roteiros compartilhados. O mesmo produto atende navegador e Android, com dados de grupos que se atualizam quando há mudanças.",
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
    status: "Edição 2026 encerrada · próximo ciclo em redesign",
    introduction:
      "Uma experiência social que acompanhou o Comida di Buteco em BH.",
    statement: "Visitar um bar virava parte de uma história em grupo.",
    story:
      "A edição de 2026 reuniu bares, check-ins, avaliações e roteiros em um app colaborativo. O ranking e o feed do grupo acompanhavam as visitas enquanto o evento acontecia. O redesign de 2027 será um novo produto, ainda em preparação.",
    sectionTitle: "Cada visita mexia na jornada coletiva.",
    sectionBody:
      "O check-in registrava a experiência e alimentava o feed e o ranking em tempo real. Esta página mostra apenas a edição encerrada de 2026.",
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
          <span className="case-file-mark">{"{}"}</span>
          <a
            href={`${repo}/${story.repositoryPath}`}
            target="_blank"
            rel="noreferrer"
          >
            {story.file} <Arrow diagonal />
          </a>
        </div>
        <pre>
          <code>{story.code}</code>
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
        Ver a arquitetura descrita no repositório <Arrow diagonal />
      </a>
    </div>
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
        <span>{story.status}</span>
      </div>
      <section className="folio-detail-hero">
        <p>{story.introduction}</p>
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
          <p className="folio-detail-label">O projeto</p>
          <h2>{story.statement}</h2>
        </div>
        <p>{story.story}</p>
      </section>
      <section className="folio-detail-proof">
        <div className="folio-proof-heading">
          <p className="folio-detail-label">Por dentro</p>
          <h2>{story.sectionTitle}</h2>
          <p>{story.sectionBody}</p>
        </div>
        <CaseProof story={story} repo={project.repo} />
      </section>
      <section className="folio-detail-stack">
        <p className="folio-detail-label">Construído com</p>
        <div>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a href={project.repo} target="_blank" rel="noreferrer">
          Explorar o repositório completo <Arrow diagonal />
        </a>
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
      : "Henrique Souza — Desenvolvedor full stack em Belo Horizonte";
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

function ProjectSymbol({ id }) {
  const drawings = {
    quarta: (
      <>
        <path d="M9 6h14l-2 19H11L9 6Z" />
        <path d="M11 17h10M12 4h8" />
      </>
    ),
    pulso: <path d="M3 17h5l3-9 5 16 4-12 2 5h7" />,
    sim: (
      <>
        <path d="M16 27S4 20 4 12a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 15-12 15Z" />
        <path d="M7 4 5 2m20 2 2-2" />
      </>
    ),
    trilha: (
      <>
        <path d="M5 25c0-7 10-5 10-12s12-8 12-2-8 4-8 11" />
        <circle cx="5" cy="25" r="2" />
        <circle cx="19" cy="22" r="2" />
      </>
    ),
    rota: (
      <>
        <path d="M16 28s-9-9-9-16a9 9 0 1 1 18 0c0 7-9 16-9 16Z" />
        <circle cx="16" cy="12" r="3" />
        <path d="M4 28h24" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawings[id]}
    </svg>
  );
}

function ProjectIndex({ activeProject, indexRef }) {
  return (
    <nav className="folio-index" aria-label="Índice de projetos" ref={indexRef}>
      {portfolioProjects.map((project) => (
        <a
          key={project.id}
          className={`folio-index-link folio-${project.id}`}
          data-project={project.id}
          href={`#folio-${project.id}`}
          aria-current={activeProject === project.id ? "location" : undefined}
        >
          <ProjectSymbol id={project.id} />
          <span>{projectNames[project.id]}</span>
        </a>
      ))}
    </nav>
  );
}

function PortfolioProject({ project }) {
  const summaries = {
    quarta:
      "Bares, campanhas e encontros em um app feito para a quarta-feira ganhar a cidade. O acesso está aberto; a data oficial de lançamento ainda não foi definida.",
    pulso:
      "Fontes públicas viram contexto: acontecimentos organizados por lugar, origem e confiança.",
    sim: "Convite, site e organização do casamento reunidos em uma experiência para o casal e seus convidados.",
    trilha:
      "Uma forma coletiva de encontrar bares e desenhar novos roteiros por Belo Horizonte.",
    rota: "Uma experiência de descoberta que acompanhou a edição 2026. A próxima versão será redesenhada para 2027.",
  };
  return (
    <article
      className={`folio-project folio-chapter folio-${project.id}`}
      id={`folio-${project.id}`}
      data-project={project.id}
    >
      <div className="folio-copy">
        <p className="folio-type">
          {project.id === "quarta"
            ? "PRODUTO DIGITAL · DISPONÍVEL PARA ACESSO"
            : project.id === "rota"
              ? "PRODUTO DIGITAL · PRÓXIMO CICLO EM 2027"
              : project.id === "trilha"
                ? "PRODUTO DIGITAL · EM FINALIZAÇÃO"
                : "PRODUTO DIGITAL · CÓDIGO PÚBLICO"}
        </p>
        <div className="folio-project-symbol" aria-hidden="true">
          <ProjectSymbol id={project.id} />
        </div>
        <h2>{projectNames[project.id]}</h2>
        <p className="folio-description">{summaries[project.id]}</p>
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
          <a href={`/projetos/${project.id}`}>
            Ver o case <Arrow diagonal />
          </a>
          <a href={project.repo} target="_blank" rel="noreferrer">
            Código no GitHub <Arrow diagonal />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectStage({ project }) {
  const story = caseStudies[project.id];
  const sourceFile = story.file || "README.md";
  const sourceLabel = sourceFile.split("/").at(-1);
  return (
    <div
      className={`folio-stage folio-${project.id}`}
      data-project={project.id}
    >
      <div className="folio-stage-topline">
        <span>{story.code ? "Lógica do produto" : "Fluxo do produto"}</span>
        <a
          href={`${project.repo}/${story.repositoryPath}`}
          target="_blank"
          rel="noreferrer"
          title={sourceFile}
          aria-label={`Ver ${sourceFile} no GitHub`}
        >
          {sourceLabel} <Arrow diagonal />
        </a>
      </div>
      <div className="folio-source-sheet" key={project.id}>
        <div className="folio-source-heading">
          <ProjectSymbol id={project.id} />
          <div>
            <span>Em destaque</span>
            <h3 aria-live="polite" aria-atomic="true">
              {projectNames[project.id]}
            </h3>
          </div>
        </div>
        {story.code ? (
          <pre className="folio-source-code">
            <code>{story.code}</code>
          </pre>
        ) : (
          <div className="folio-source-flow">
            {story.flow.map((step, index) => (
              <React.Fragment key={step}>
                <div>{step}</div>
                {index < story.flow.length - 1 && (
                  <span aria-hidden="true">↓</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="folio-source-foot">
          <span>
            {story.code
              ? "Trecho do repositório público"
              : "Etapas descritas no repositório"}
          </span>
          <a href={project.repo} target="_blank" rel="noreferrer">
            Abrir no GitHub <Arrow diagonal />
          </a>
        </div>
      </div>
    </div>
  );
}

function PortfolioHome() {
  const [activeProject, setActiveProject] = useState("quarta");
  const progressRef = useRef(null);
  const projectIndexRef = useRef(null);
  useEffect(() => {
    const home = document.querySelector(".folio-home");
    home?.classList.add("folio-motion");
    const projectObserver = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(
                a.boundingClientRect.top +
                  a.boundingClientRect.height / 2 -
                  window.innerHeight / 2,
              ) -
              Math.abs(
                b.boundingClientRect.top +
                  b.boundingClientRect.height / 2 -
                  window.innerHeight / 2,
              ),
          )[0];
        if (current) setActiveProject(current.target.dataset.project);
      },
      {
        rootMargin: window.matchMedia("(max-width: 760px)").matches
          ? "-54% 0px -16% 0px"
          : "-38% 0px -38% 0px",
        threshold: 0,
      },
    );
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
    document.querySelectorAll(".folio-chapter").forEach((project) => {
      projectObserver.observe(project);
      revealObserver.observe(project);
    });
    return () => {
      projectObserver.disconnect();
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
  useEffect(() => {
    const index = projectIndexRef.current;
    if (!index || window.innerWidth > 760) return;
    const active = index.querySelector(`[data-project="${activeProject}"]`);
    if (!active) return;
    const start = active.offsetLeft;
    const end = start + active.offsetWidth;
    let nextLeft = index.scrollLeft;
    const visibleStart = index.scrollLeft + 12;
    const visibleEnd = index.scrollLeft + index.clientWidth - 12;
    if (start < visibleStart) nextLeft = Math.max(0, start - 12);
    else if (end > visibleEnd)
      nextLeft = Math.min(
        end - index.clientWidth + 12,
        index.scrollWidth - index.clientWidth,
      );
    if (nextLeft !== index.scrollLeft) {
      index.scrollTo({
        left: nextLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }, [activeProject]);
  return (
    <div className="portfolio folio-home">
      <div className="folio-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <Header />
      <main id="inicio">
        <section className="folio-hero">
          <div className="folio-hero-kicker">
            <span>Henrique Souza</span>
            <span>Desenvolvimento de software · Belo Horizonte</span>
          </div>
          <h1>
            Código para
            <br />
            <em>o mundo real.</em>
          </h1>
          <div className="folio-hero-bottom">
            <p>
              Transformo processos reais em produtos digitais — da regra de
              negócio ao software em produção.
            </p>
            <a href="#projetos">
              Ver projetos <span>↓</span>
            </a>
          </div>
        </section>
        <section className="folio-work" id="projetos" aria-label="Projetos">
          <div className="folio-section-heading" id="codigo">
            <span>Projetos feitos para sair da ideia e ganhar uso.</span>
            <a href={GH} target="_blank" rel="noreferrer">
              Acompanhe no GitHub <Arrow diagonal />
            </a>
          </div>
          <ProjectIndex
            activeProject={activeProject}
            indexRef={projectIndexRef}
          />
          <div className="folio-showcase-layout">
            <ProjectStage
              project={
                portfolioProjects.find((item) => item.id === activeProject) ||
                portfolioProjects[0]
              }
            />
            <div className="folio-chapters">
              {portfolioProjects.map((project) => (
                <PortfolioProject project={project} key={project.id} />
              ))}
            </div>
          </div>
        </section>
        <section className="folio-about" id="sobre">
          <div className="folio-about-heading">
            <span className="folio-about-label">Sobre o meu trabalho</span>
            <h2>
              Do processo real
              <br />
              ao sistema <em>em produção.</em>
            </h2>
          </div>
          <div className="folio-about-copy">
            <p>
              Sou desenvolvedor full stack em Belo Horizonte. Trabalho de ponta
              a ponta: entendo o processo, modelo os dados, construo interfaces
              e APIs e coloco o sistema no ar.
            </p>
            <p>
              Também desenvolvo soluções para engenharia e construção civil,
              conectando visão de processos com software.
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
            <span>Tem algo bom para construir?</span>
            <h2>
              Vamos fazer
              <br />
              <em>acontecer.</em>
            </h2>
          </div>
          <a href={`mailto:${EMAIL}`}>
            Falar sobre um projeto <Arrow diagonal />
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
            <a href={`mailto:${EMAIL}`}>E-mail</a>
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
