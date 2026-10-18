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
    status: "O produto está aberto para acesso. O lançamento ainda não tem data definida.",
    language: "javascript",
    file: "www/js/push.js",
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
    id: "pulso",
    name: "PULSO",
    url: "https://pulso-web.henriquesouza.workers.dev/",
    repo: `${GITHUB}/Pulso`,
    summary: "O PULSO organiza acontecimentos públicos por fonte, lugar e confiança.",
    language: "python",
    file: "engine/pulso_engine/scoring/confidence.py",
    code: `if s.source_classes and s.source_classes <= SOCIAL_CLASSES:
    value = min(value, SOCIAL_ONLY_CAP)`,
    codeNote: "Sinais baseados apenas em fontes sociais têm um limite de confiança.",
    repositoryPath: "blob/main/engine/pulso_engine/scoring/confidence.py",
    storyTitle: "Um sinal precisa de contexto.",
    story: "O PULSO organiza informações por evento, lugar e origem. Severidade e confiança são tratadas separadamente para indicar o que as fontes realmente sustentam.",
    proofTitle: "A fonte muda o peso do sinal.",
    proof: "Confirmações oficiais elevam a confiança. Contradições e fontes duplicadas reduzem o peso; fontes sociais, sozinhas, não bastam para confirmar um acontecimento.",
    composition: ["Origem", "Evento", "Contexto"],
    cta: "Abrir o PULSO",
  },
  {
    id: "sim",
    name: "e&t",
    url: "https://tudocomecoudeumsim.pages.dev/",
    repo: `${GITHUB}/tudocomecoudeumsim`,
    summary: "Um site de casamento com convites e informações organizadas para convidados e grupos.",
    language: "javascript",
    file: "functions/api/[[route]].js",
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
  {
    id: "rota",
    name: "Rota di Buteco",
    url: "https://rotadibuteco.web.app/",
    repo: `${GITHUB}/rotadibuteco`,
    summary: "Visitas, avaliações e roteiros compartilhados durante o Comida di Buteco em Belo Horizonte.",
    status: "A edição deste ano encerrou. O próximo ciclo volta com um redesign completo.",
    language: "text",
    file: "README.md",
    code: null,
    codeNote: null,
    repositoryPath: "blob/master/README.md",
    storyTitle: "A cidade vira um plano em grupo.",
    story: "Durante a edição do Comida di Buteco em Belo Horizonte, o app conectou bares, check-ins, avaliações e roteiros compartilhados.",
    proofTitle: "Uma visita atualiza o roteiro de todos.",
    proof: "O check-in registra a visita e alimenta o feed e o ranking do grupo. O produto atual documenta a edição encerrada; a próxima edição será redesenhada.",
    composition: ["Visitas", "Avaliações", "Grupo"],
    cta: "Ver a edição encerrada",
  },
  {
    id: "trilha",
    name: "Trilha BH",
    url: "https://trilhabh.web.app/",
    repo: `${GITHUB}/trilhaBH`,
    summary: "Roteiros por Belo Horizonte para montar no mapa e compartilhar com amigos.",
    status: "Em finalização. A versão pública permite acompanhar o projeto.",
    language: "text",
    file: "www/readme.md",
    code: null,
    codeNote: null,
    repositoryPath: "blob/main/www/readme.md",
    storyTitle: "Descobrir a cidade em companhia.",
    story: "O projeto aproxima mapa, visitas e roteiros compartilhados. A experiência está sendo preparada para uso no navegador e no Android.",
    proofTitle: "Mapa, autenticação e atividade do grupo.",
    proof: "O fluxo liga o PWA e o app Android à autenticação e aos dados do Firestore. Feed e ranking acompanham as atualizações do grupo.",
    composition: ["Mapa", "Roteiro", "Amigos"],
    cta: "Abrir versão pública",
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

function Header({ detail = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = detail ? "/" : "#inicio";
  return (
    <header className="site-header">
      <a className="wordmark" href={home} aria-label="Henrique Souza, início">
        <img className="brand-logo" src="/assets/logo-hs.png" alt="" />
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
  return (
    <div className={`project-composition composition-${project.id}`} role="img" aria-label={project.composition.join(", ")}>
      {project.composition.map((word, index) => (
        <span key={word} className={`composition-word composition-word-${index + 1}`}>{word}</span>
      ))}
      {project.id === "sim" && <span className="composition-amp" aria-hidden="true">&</span>}
    </div>
  );
}

function ProjectSpread({ project }) {
  return (
    <article className={`project-spread spread-${project.id}`} id={project.id}>
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

function Home() {
  const [activeProject, setActiveProject] = useState("quarta");
  useEffect(() => {
    const items = document.querySelectorAll(".project-spread, .about-section, .contact-section");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveProject(entry.target.id);
      });
    }, { rootMargin: "-44% 0px -44% 0px" });
    document.querySelectorAll(".project-spread").forEach((project) => projectObserver.observe(project));
    return () => {
      observer.disconnect();
      projectObserver.disconnect();
    };
  }, []);

  return (
    <div className="portfolio home-page" id="inicio">
      <Header />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">Henrique Souza <span>—</span> Software & produto</p>
            <h1 id="hero-title">Eu projeto<br />e construo<br /><em>software.</em></h1>
            <div className="hero-bottom">
              <p>Sistemas web que juntam produto, regras de negócio e operação.</p>
              <a href="#projetos">Conheça os projetos <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section className="work-section" id="projetos" aria-labelledby="work-title">
          <div className="work-heading">
            <h2 id="work-title">Projetos com<br />código público.</h2>
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
            <p>Sou Henrique, engenheiro de software em Belo Horizonte. Trabalho da modelagem das regras à implementação e publicação de produtos web.</p>
            <p>Gosto de entender como o sistema precisa funcionar por inteiro: a experiência, os dados, as integrações e o que acontece depois que vai ao ar.</p>
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
        <a className="footer-wordmark" href="#inicio"><img className="brand-logo" src="/assets/logo-hs.png" alt="" /> Henrique Souza</a>
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
            <a href={`${project.repo}/${project.repositoryPath}`} target="_blank" rel="noreferrer">{project.file} <Arrow diagonal /></a>
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
    const title = project ? `${project.name} — Henrique Souza` : "Henrique Souza — Software & produto";
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="description"]')?.setAttribute("content", project ? project.summary : "Henrique Souza projeta e constrói software: produtos web, sistemas e código público.");
  }, [project]);
  return project ? (
    <div className="portfolio detail-portfolio">
      <Header detail />
      <ProjectDetail project={project} />
    </div>
  ) : <Home />;
}

createRoot(document.getElementById("root")).render(<App />);
