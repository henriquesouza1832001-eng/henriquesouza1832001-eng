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
    language: "javascript",
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
    language: "python",
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
    language: "javascript",
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
        Ver a arquitetura descrita no repositório <Arrow diagonal />
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

function ProjectEvidence({ project }) {
  const story = caseStudies[project.id];
  const evidenceUrl = `${project.repo}/${story.repositoryPath}`;
  return (
    <div className={`folio-project-evidence evidence-${project.id}`}>
      {story.code ? (
        <>
          <div className="folio-evidence-topline">
            <span>{story.language === "python" ? "Python" : "JavaScript"}</span>
            <a href={evidenceUrl} target="_blank" rel="noreferrer">
              Ver código <Arrow diagonal />
            </a>
          </div>
          <pre><HighlightedCode code={story.code} language={story.language} /></pre>
        </>
      ) : (
        <>
          <div className="folio-evidence-flow">
            {story.flow.map((step, index) => (
              <React.Fragment key={step}>
                <span>{step}</span>
                {index < story.flow.length - 1 && <b aria-hidden="true">→</b>}
              </React.Fragment>
            ))}
          </div>
          <div className="folio-evidence-topline">
            <span>Fluxo documentado</span>
            <a href={evidenceUrl} target="_blank" rel="noreferrer">
              Ver no GitHub <Arrow diagonal />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

const projectPresentation = {
  quarta: {
    label: "Produto digital · disponível para acesso",
    summary:
      "Bares, campanhas e encontros em um app feito para a quarta-feira ganhar a cidade. O acesso está aberto; a data oficial de lançamento ainda não foi definida.",
  },
  pulso: {
    label: "Plataforma pública · leitura de sinais",
    summary:
      "Fontes públicas viram contexto: acontecimentos organizados por lugar, origem e confiança.",
  },
  sim: {
    label: "Experiência digital · casamento",
    summary:
      "Convite, site e organização do casamento reunidos em uma experiência para o casal e seus convidados.",
  },
  trilha: {
    label: "Produto local · em finalização",
    summary:
      "Uma forma coletiva de encontrar bares e desenhar novos roteiros por Belo Horizonte.",
  },
  rota: {
    label: "Produto de temporada · próxima edição em redesign",
    summary:
      "Uma experiência que acompanhou o Comida di Buteco em Belo Horizonte, com bares, check-ins, avaliações e roteiros em grupo. A próxima edição terá um redesign completo.",
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
      <div className="folio-card-art">
        <ProjectEvidence project={project} />
      </div>
      <div className="folio-copy">
        <p className="folio-type">{presentation.label}</p>
        <h2>{projectNames[project.id]}</h2>
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
          <a className="folio-case-link" href={`/projetos/${project.id}`}>
            Ver projeto <Arrow diagonal />
          </a>
          <a href={project.repo} target="_blank" rel="noreferrer">
            Código no GitHub <Arrow diagonal />
          </a>
        </div>
      </div>
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
            Software para
            <br />
            <em>o mundo real.</em>
          </h1>
          <div className="folio-hero-bottom">
            <p>
              Do problema ao produto: construo software de ponta a ponta, da regra de negócio à publicação.
            </p>
            <a href="#projetos">
              Conheça meu trabalho <span>↓</span>
            </a>
          </div>
        </section>
        <section className="folio-work" id="projetos" aria-label="Projetos">
          <div className="folio-section-heading" id="codigo">
            <span>Trabalho real. Código aberto. Produtos acessíveis.</span>
            <a href={GH} target="_blank" rel="noreferrer">
              Acompanhe no GitHub <Arrow diagonal />
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
            <span>Vagas, projetos e boas parcerias.</span>
            <h2>
              Vamos fazer
              <br />
              <em>acontecer.</em>
            </h2>
          </div>
          <a href={CONTACT}>
            Vamos conversar por e-mail <Arrow diagonal />
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
