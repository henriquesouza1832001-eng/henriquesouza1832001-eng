import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const GH = "https://github.com/henriquesouza1832001-eng";
const EMAIL = "henriquesouza1832001@gmail.com";

const projects = [
  {
    id: "pulso",
    channel: "01",
    name: "PULSO",
    format: "SISTEMA DE SINAIS PÚBLICOS",
    short: "Reúne sinais de fontes públicas para mostrar o que está acontecendo e onde.",
    description:
      "Fontes públicas de imprensa, clima, energia, saúde e alertas oficiais são agrupadas por evento e lugar. A interface mostra origem, confiança e contexto para que um sinal isolado não pareça uma confirmação.",
    focus: "DADOS PÚBLICOS → EVENTOS",
    decision: "Severidade e confiança são calculadas separadamente. Contradições e cópias reduzem a confiança; sinais sociais sozinhos têm um teto.",
    tags: ["Python", "React", "Cloudflare"],
    status: "PLATAFORMA PÚBLICA",
    url: "https://pulso-web.henriquesouza.workers.dev/",
    repo: `${GH}/Pulso`,
    cta: "Abrir o PULSO",
    visual: "pulso",
  },
  {
    id: "quarta",
    channel: "02",
    name: "Quarta Amstel",
    format: "PWA · MAPA · NOTIFICAÇÕES",
    short: "Um app de bares e campanhas, pronto para acessar. A data de lançamento ainda não foi definida.",
    description:
      "Um app instalável que aproxima pessoas, bares e campanhas. Mapa para encontrar lugares, notificações push e um painel próprio para tocar a operação.",
    focus: "PWA · MAPA · WEB PUSH",
    decision: "A inscrição de notificações é reutilizada quando já existe no navegador; o Worker só recebe um endpoint novo.",
    tags: ["PWA", "Web Push", "Cloudflare Workers"],
    status: "PRONTO · DATA DE LANÇAMENTO NÃO DEFINIDA",
    url: "https://quarta-amstel.pages.dev/",
    repo: `${GH}/quarta-amstel`,
    cta: "Explorar o app",
    visual: "quarta",
  },
  {
    id: "sim",
    channel: "03",
    name: "e&t",
    format: "PRODUTO DIGITAL PARA CASAMENTOS",
    short: "Site, convite e organização do casamento em um só produto.",
    description:
      "Site do casal, convite, confirmações e planejamento do casamento apresentados em uma experiência pública pensada para reunir o grande dia.",
    focus: "CONVITE · RSVP · ACESSO POR GRUPO",
    decision: "Cada convite consulta apenas os eventos publicados para a pessoa e o grupo dela.",
    tags: ["Produto digital", "React", "Cloudflare"],
    status: "PROJETO PÚBLICO",
    url: "https://tudocomecoudeumsim.pages.dev/",
    repo: `${GH}/tudocomecoudeumsim`,
    cta: "Conhecer e&t",
    visual: "sim",
  },
  {
    id: "trilha",
    channel: "04",
    name: "Trilha BH",
    format: "PWA · DESCOBERTA · COMUNIDADE",
    short: "Roteiros de bares de Belo Horizonte para descobrir e compartilhar.",
    description:
      "Uma trilha gastronômica para descobrir bares, registrar visitas e combinar roteiros. A versão pública está em pré-beta; estou finalizando o produto.",
    focus: "PWA · ROTEIROS · GRUPOS",
    decision: "PWA e Android compartilham o mesmo produto; Firestore mantém feed e ranking sincronizados em tempo real.",
    tags: ["PWA", "Firebase", "Capacitor"],
    status: "EM FINALIZAÇÃO · PRÉ-BETA",
    url: "https://trilhabh.web.app/",
    repo: `${GH}/trilhaBH`,
    cta: "Abrir a versão de teste",
    visual: "trilha",
  },
  {
    id: "rota",
    channel: "05",
    name: "Rota di Buteco",
    format: "PROJETO EM EVOLUÇÃO · 2027",
    short: "A edição de 2026 está no ar; a experiência de 2027 será redesenhada por inteiro.",
    description:
      "A experiência pública acompanhou o Comida di Buteco 2026 em BH. Para 2027, o produto será reconstruído por inteiro: nova experiência, novos fluxos e melhorias de ponta a ponta.",
    focus: "CHECK-IN · FEED · RANKING EM TEMPO REAL",
    decision: "Na edição 2026, cada visita atualizava o feed social e os rankings do grupo sem recarregar a página.",
    tags: ["PWA", "Produto", "Redesign"],
    status: "EDIÇÃO 2026 ENCERRADA · REDESIGN 2027",
    url: "https://rotadibuteco.web.app/",
    repo: `${GH}/rotadibuteco`,
    cta: "Ver a versão de 2026",
    visual: "rota",
  },
];

const fallbackRepos = [
  {
    name: "Pulso",
    description: "Um instrumento que mede o Brasil em tempo real.",
    language: "Python",
    html_url: `${GH}/Pulso`,
  },
  {
    name: "quarta-amstel",
    description: "PWA para encontrar bares e campanhas perto de você.",
    language: "JavaScript",
    html_url: `${GH}/quarta-amstel`,
  },
  {
    name: "tudocomecoudeumsim",
    description: "Sites de casamento e planejamento do grande dia.",
    language: "JavaScript",
    html_url: `${GH}/tudocomecoudeumsim`,
  },
  {
    name: "trilhaBH",
    description: "PWA gastronômica colaborativa de Belo Horizonte.",
    language: "JavaScript",
    html_url: `${GH}/trilhaBH`,
  },
  {
    name: "rotadibuteco",
    description: "App social do Comida di Buteco BH 2026.",
    language: "JavaScript",
    html_url: `${GH}/rotadibuteco`,
  },
];

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
    file: "www/js/push.js",
    note: "A inscrição só é criada quando ainda não existe no navegador.",
    code: `let sub = await swReg.pushManager.getSubscription();

if (!sub) {
  sub = await swReg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: _urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
}`,
  },
  pulso: {
    file: "engine/pulso_engine/scoring/confidence.py",
    note: "Confiança considera confirmação, contradição e duplicidade separadamente da severidade.",
    code: `value += 25 if s.official_confirmation else 0
value -= 30 * s.contradiction
value -= 20 * s.duplicate_ratio
value = max(0.0, min(100.0, value))

if s.source_classes and s.source_classes <= SOCIAL_CLASSES:
    value = min(value, SOCIAL_ONLY_CAP)`,
  },
  sim: {
    file: "functions/api/[[route]].js",
    note: "O acesso a cada evento respeita os convidados e grupos publicados para aquele casamento.",
    code: `const events = JSON.parse(row?.published_events_json || '[]')
return events.find((event) => event.id === eventId && (!event.group_ids.length || event.group_ids.includes(guest.group_id))) || null`,
  },
  trilha: {
    file: "README.md / arquitetura",
    note: "O mesmo produto roda como PWA e Android; feed e ranking recebem atualizações em tempo real.",
    code: `PWA + Android (Capacitor)
  → Firebase Authentication
  → Cloud Firestore · onSnapshot
      → feed do grupo
      → ranking em tempo real
      → progresso da trilha`,
  },
  rota: {
    file: "README.md / fluxo de visita · edição 2026",
    note: "O check-in alimentava a jornada do grupo: avaliação, distância, gasto e ranking ao vivo.",
    code: `visita ao bar
  → foto registrada na hora
  → avaliação de 1 a 10
  → distância + gasto
  → feed e ranking do grupo`,
  },
};

function ProjectCode({ project, compact = false }) {
  const excerpt = excerpts[project.id];
  return (
    <figure className={`project-code code-${project.id} ${compact ? "code-compact" : ""}`}>
      <figcaption><span>{excerpt.file}</span><span>FONTE PÚBLICA</span></figcaption>
      <pre><code>{excerpt.code.split("\n").map((line, index) => (
        <span className="code-line" key={index}>
          <i>{String(index + 1).padStart(2, "0")}</i>
          <span>{line || " "}</span>
        </span>
      ))}</code></pre>
      {!compact && <p>{excerpt.note}</p>}
    </figure>
  );
}

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
        <a href={isProject ? "/#projetos" : "#projetos"} onClick={() => setOpen(false)}>
          Projetos
        </a>
        <a href={isProject ? "/#codigo" : "#codigo"} onClick={() => setOpen(false)}>
          Código
        </a>
        <a href={isProject ? "/#sobre" : "#sobre"} onClick={() => setOpen(false)}>
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

function Television({ active, onTune }) {
  const [powered, setPowered] = useState(true);
  const [changing, setChanging] = useState(false);
  const tune = (id) => {
    if (id === active.id) return;
    setChanging(true);
    window.setTimeout(() => {
      onTune(id);
      setChanging(false);
    }, 220);
  };
  const handleKeys = (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const current = projects.findIndex((item) => item.id === active.id);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    onTune(
      projects[(current + direction + projects.length) % projects.length].id,
    );
  };
  return (
    <div className={`tv-stage ${changing ? "changing" : ""}`}>
      <div className="tv-topline">
        <span>
          <i className="signal-light" /> RECEPÇÃO DIGITAL / BH–BR
        </span>
        <span>{powered ? `SINTONIZADO · ${active.channel}` : "EM ESPERA"}</span>
      </div>
      <div className="television">
        <div className="tv-screen-wrap">
          <div
            className={`tv-screen ${powered ? "" : "screen-off"}`}
            data-channel={active.id}
          >
            {powered ? (
              <>
                <div className="screen-sweep" aria-hidden="true" />
                <div className="screen-preview">
                  <ProjectCode project={active} compact />
                </div>
                <div className="screen-overlay">
                  <span>CANAL {active.channel}</span>
                  <span className="screen-dot">
                    <i /> ON AIR
                  </span>
                </div>
                <div className="screen-caption">
                  <span>{active.name}</span>
                  <small>{active.format} <b>VER PROJETO</b></small>
                </div>
                <a
                  className="screen-project-link"
                  href={`/projetos/${active.id}`}
                  aria-label={`Abrir a página de ${active.name}`}
                >
                  <span>ABRIR PROJETO <Arrow diagonal /></span>
                </a>
              </>
            ) : (
              <div className="screen-snow">
                <span>SEM SINAL</span>
                <small>APERTE POWER PARA VOLTAR</small>
              </div>
            )}
          </div>
        </div>
        <div className="tv-controls">
          <div className="tv-controls-top">
            <span>
              HENRIQUE
              <br />
              SOUZA®
            </span>
            <span>
              STEREO
              <br />
              FULL STACK
            </span>
          </div>
          <div className="tv-knobs">
            <button
              className={powered ? "power on" : "power"}
              onClick={() => setPowered(!powered)}
              aria-label={
                powered ? "Desligar a televisão" : "Ligar a televisão"
              }
            >
              <i />
            </button>
            <span>POWER</span>
            <button
              className="channel-knob"
              type="button"
              aria-label={`Avançar para o próximo canal. Canal atual: ${active.channel}, ${active.name}`}
              title="Girar para o próximo canal"
              style={{
                "--dial-angle": `${projects.findIndex((item) => item.id === active.id) * 72}deg`,
              }}
              onClick={() => {
                const current = projects.findIndex((item) => item.id === active.id);
                tune(projects[(current + 1) % projects.length].id);
              }}
            >
              <i />
            </button>
            <span>CHANNEL</span>
          </div>
          <div className="tv-speaker" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
          <div className="tv-controls-bottom">PRODUCTS / PEOPLE / SOFTWARE</div>
        </div>
      </div>
      <div className="tv-feet">
        <i />
        <i />
      </div>
      <div
        className="remote"
        role="group"
        aria-label="Controle remoto: sintonizar um projeto"
      >
        <div className="remote-head">
          <span>CH</span>
          <b>▲</b>
          <span>VOL</span>
        </div>
        <div className="remote-grid" onKeyDown={handleKeys}>
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => tune(project.id)}
              aria-label={`Sintonizar canal ${project.channel}: ${project.name}`}
              aria-pressed={active.id === project.id}
              className={
                active.id === project.id
                  ? "remote-channel selected"
                  : "remote-channel"
              }
            >
              <span>{project.channel}</span>
              <b>{project.name}</b>
              <i />
            </button>
          ))}
        </div>
        <button
          className="remote-github"
          type="button"
          onClick={() =>
            document
              .querySelector("#codigo")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span>GH</span>
          <b>CODE</b>
          <Arrow diagonal />
        </button>
        <div className="remote-label">GIRE A RODA OU SELECIONE UM CANAL</div>
      </div>
      <div
        className="channel-story"
        data-channel={active.id}
        aria-live="polite"
      >
        <div className="channel-meta">
          <span>CANAL {active.channel} / 05</span>
          <span className="channel-status">
            <i />
            {active.status}
          </span>
        </div>
        <p className="channel-format">{active.format}</p>
        <h2>
          {active.name}
          <span>®</span>
        </h2>
        <p className="channel-line">{active.short}</p>
        <div className="channel-actions">
          <a
            className="channel-open"
            href={active.url}
            target="_blank"
            rel="noreferrer"
          >
            {active.cta}
            <Arrow diagonal />
          </a>
          <a
            className="channel-repo"
            href={active.repo}
            target="_blank"
            rel="noreferrer"
          >
            ABRIR CÓDIGO <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="tv-footnote">
        <span>A EXPERIÊNCIA MUDA A CADA CANAL.</span>
        <span>USE O CONTROLE OU AS SETAS ← →</span>
      </div>
    </div>
  );
}

function ProjectStory({ project, index }) {
  const isEven = index % 2 === 1;
  if (project.id === "rota")
    return (
      <article className="story story-rota" data-reveal>
        <div className="rota-story-top">
          <span>{project.channel} / PRÓXIMA EDIÇÃO</span>
          <span>
            <i /> REDESIGN EM PREPARAÇÃO
          </span>
        </div>
        <div className="rota-story-grid">
          <div className="rota-story-code">
            <ProjectCode project={project} />
          </div>
          <div className="rota-story-copy">
            <p className="eyebrow">
              <i className="eyebrow-dot" /> O QUE VEM A SEGUIR
            </p>
            <h3>
              A edição
              <br />
              <em>de 2026.</em>
            </h3>
            <p>{project.description}</p>
            <div className="rota-timeline">
              <div>
                <span>2026</span>
                <b>
                  App público
                  <br />
                  em uso
                </b>
              </div>
              <i>→</i>
              <div>
                <span>2027</span>
                <b>
                  Produto
                  <br />
                  reconstruído
                </b>
              </div>
            </div>
            <div className="story-links">
              <a href={`/projetos/${project.id}`}>
                Ver projeto
              </a>
              <a href={project.url} target="_blank" rel="noreferrer">
                {project.cta}
                <Arrow diagonal />
              </a>
              <a href={project.repo} target="_blank" rel="noreferrer">
                Repositório público
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  return (
    <article
      className={`story story-${project.id} ${isEven ? "story-even" : ""}`}
      data-reveal
    >
      <div className="story-index">
        <span>
          {project.channel} / {project.format}
        </span>
        <span>
          <i />
          {project.status}
        </span>
      </div>
      <div className="story-grid">
        <div className="story-code-block">
          <ProjectCode project={project} />
          <span className="story-art-index">
            {project.channel}
            <i> / 05</i>
          </span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">
            <i className="eyebrow-dot" /> {project.focus}
          </p>
              <h3>
            {project.name}
            <span>.</span>
          </h3>
          <p className="story-lede">{project.short}</p>
          <p className="story-description">{project.description}</p>
          <div className="story-decision">
            <span>DECISÃO DE SISTEMA</span>
            <p>{project.decision}</p>
          </div>
          <div className="story-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="story-links">
            <a href={`/projetos/${project.id}`}>
              Ver projeto
            </a>
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.cta}
              <Arrow diagonal />
            </a>
            <a href={project.repo} target="_blank" rel="noreferrer">
              Abrir repositório
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectReel() {
  const ordered = [projects[1], projects[0], ...projects.slice(2)];
  return (
    <section className="project-reel" aria-label="Faixa contínua de projetos">
      <div className="project-reel-track">
        {[0, 1].map((copy) => (
          <div className="project-reel-set" key={copy} aria-hidden={copy === 1}>
            {ordered.map((project, index) => (
              <a
                className={`reel-card reel-card-${index + 1}`}
                href={`/projetos/${project.id}`}
                key={project.id}
                tabIndex={copy === 1 ? -1 : undefined}
              >
                <ProjectCode project={project} compact />
                <span>{project.channel} / {project.name}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function RepoShelf() {
  const [repos, setRepos] = useState(fallbackRepos);
  const [source, setSource] = useState("REPOSITÓRIOS PÚBLICOS");
  useEffect(() => {
    const controller = new AbortController();
    fetch(
      "https://api.github.com/users/henriquesouza1832001-eng/repos?per_page=100&sort=pushed",
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      },
    )
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const featured = new Set([
          "Pulso",
          "tudocomecoudeumsim",
          "quarta-amstel",
          "trilhaBH",
          "rotadibuteco",
        ]);
        const curated = data.filter(
          (repo) => featured.has(repo.name) && !repo.fork && !repo.archived,
        );
        if (curated.length) {
          setRepos(curated);
          setSource("SINTONIA DIRETA COM O GITHUB");
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return (
    <div className="github-reel">
      <div className="github-reel-intro">
        <p className="eyebrow">
          <i className="eyebrow-dot" /> {source}
        </p>
        <p>
          Não precisa confiar só na apresentação. Abra a documentação, siga as
          decisões e veja o software por dentro.
        </p>
        <a href={GH} target="_blank" rel="noreferrer">
          <span>VER PERFIL COMPLETO</span>
          <Arrow diagonal />
        </a>
      </div>
      <div className="repo-list" aria-live="polite">
        {repos.map((repo, index) => (
          <a
            className="repo-row"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            key={repo.id || repo.name}
          >
            <span className="repo-num">0{index + 1}</span>
            <span className="repo-copy">
              <b>{repo.name}</b>
              <small>
                {repo.description ||
                  "Código e decisões técnicas no repositório."}
              </small>
            </span>
            <span className="repo-lang">
              <i />
              {repo.language || "Projeto"}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ project }) {
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(index + projects.length - 1) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const overviews = {
    pulso:
      "Reúne sinais de fontes públicas e organiza acontecimentos por lugar, contexto e confiança. A interface mostra de onde vêm as informações para que a leitura possa ser conferida.",
      quarta:
      "Um app pronto para apresentar bares e campanhas pelo celular, com mapa, instalação como PWA e notificações. O acesso está aberto; a data de lançamento ainda não foi definida.",
    sim:
      "Uma plataforma para reunir o site do casal, o convite e os preparativos do casamento em uma experiência que abre pelo celular.",
    trilha:
      "Um roteiro gastronômico em Belo Horizonte, feito para encontrar lugares e compartilhar descobertas. O produto segue em finalização; o link abre a versão pública de pré-beta.",
    rota:
      "A versão de 2026 acompanhou o Comida di Buteco em Belo Horizonte. O próximo ciclo será reconstruído para 2027; por enquanto, o link abre a edição anterior.",
  };

  return (
    <main className="project-detail" data-channel={project.id}>
      <section className="detail-heading">
        <a className="detail-back" href="/#projetos">← Todos os projetos</a>
        <div className="detail-overline">
          <span>CANAL {project.channel}</span>
          <span>{project.status}</span>
        </div>
        <p className="eyebrow">{project.format}</p>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p className="detail-lede">{project.short}</p>
        <div className="detail-actions">
          <a
            className="detail-primary"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            {project.cta} <Arrow diagonal />
          </a>
          <a href={project.repo} target="_blank" rel="noreferrer">
            Ver código no GitHub
          </a>
        </div>
      </section>
      <section className="detail-code" aria-label={`Trecho técnico de ${project.name}`}>
        <div className="detail-preview-top">
          <a href={project.repo} target="_blank" rel="noreferrer">
            github.com/henriquesouza1832001-eng/{project.repo.replace(`${GH}/`, "")}
          </a>
          <span>IMPLEMENTAÇÃO / {project.channel}</span>
        </div>
        <div className="detail-code-sample">
          <ProjectCode project={project} />
        </div>
      </section>
      <section className="detail-notes">
        <div>
          <p className="eyebrow">O projeto</p>
          <h2>O que ele faz</h2>
          <p>{overviews[project.id]}</p>
          <div className="detail-decision">
            <span>UMA DECISÃO TÉCNICA</span>
            <p>{project.decision}</p>
          </div>
        </div>
        <div className="detail-facts">
          <div>
            <span>TECNOLOGIAS</span>
            <p>{project.tags.join(" · ")}</p>
          </div>
          <div>
            <span>SITUAÇÃO</span>
            <p>{project.status}</p>
          </div>
          <div>
            <span>ACESSO</span>
            <p>Produto público e repositório aberto</p>
          </div>
        </div>
      </section>
      {project.id === "rota" && (
        <aside className="detail-status-note">
          <span>PRÓXIMO CICLO</span>
          <p>
            O redesign de 2027 está em preparação. Esta página apresenta a
            experiência pública de 2026, sem antecipar funcionalidades da
            próxima edição.
          </p>
        </aside>
      )}
      {project.id === "trilha" && (
        <aside className="detail-status-note">
          <span>EM FINALIZAÇÃO</span>
          <p>
            A versão disponível é um pré-beta. Novidades entram nesta página
            quando o produto estiver concluído.
          </p>
        </aside>
      )}
      <nav className="detail-pagination" aria-label="Navegar entre projetos">
        <a href={`/projetos/${previous.id}`}>
          <span>ANTERIOR</span>
          <b>{previous.name}</b>
        </a>
        <a href={`/projetos/${next.id}`}>
          <span>PRÓXIMO</span>
          <b>{next.name}</b>
        </a>
      </nav>
    </main>
  );
}

function currentProject() {
  const match = window.location.pathname.match(/^\/projetos\/([^/]+)\/?$/);
  return match ? projects.find((project) => project.id === match[1]) || null : null;
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
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", projectRoute?.short || "Projetos públicos, sites e sistemas digitais de Henrique Souza, desenvolvedor full stack em Belo Horizonte. Explore cada produto e acesse o código-fonte.");
  }, [projectRoute]);
  if (projectRoute) {
    return (
      <div className="portfolio project-portfolio" data-channel={projectRoute.id}>
        <Header isProject />
        <ProjectDetail project={projectRoute} />
        <footer className="footer detail-footer">
          <a className="wordmark footer-mark" href="/">
            <Mark />
            <span>
              HENRIQUE
              <br />
              SOUZA
            </span>
          </a>
          <span>
            DESENVOLVEDOR FULL STACK
            <br />
            BELO HORIZONTE, BR
          </span>
          <div className="footer-links">
            <a href={GH} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${EMAIL}`}>E-mail</a>
          </div>
          <span className="copyright">© 2026 HENRIQUE SOUZA</span>
        </footer>
      </div>
    );
  }
  return <PortfolioHome />;
}

function ProjectGlyph({ id }) {
  if (id === "quarta") return <div className="glyph glyph-amstel" aria-hidden="true"><span className="amstel-orbit" /><span className="amstel-glass"><i /></span><span className="glyph-word">quarta<br />é nossa.</span><span className="glyph-spark">✳</span></div>;
  if (id === "pulso") return <div className="glyph glyph-pulso" aria-hidden="true"><span className="pulse-map" /><span className="pulse-map pulse-map-two" /><span className="pulse-orbit orbit-one" /><span className="pulse-orbit orbit-two" /><span className="pulse-core" /><span className="pulse-word">PULSO</span></div>;
  if (id === "sim") return <div className="glyph glyph-sim" aria-hidden="true"><span className="sim-ring" /><span className="sim-script">e&t</span><span className="sim-note">um dia<br />que fica.</span><span className="sim-flower">✳</span></div>;
  if (id === "trilha") return <div className="glyph glyph-trilha" aria-hidden="true"><svg viewBox="0 0 700 520"><path d="M-20 90C150 30 210 170 362 110S550 30 730 120M-20 150C120 110 240 235 380 165S565 105 730 205M-20 220C130 180 210 310 390 240S570 185 730 280M-20 300C125 250 260 390 410 320S590 275 730 365M-20 390C160 340 270 475 440 400S590 365 730 450"/><path className="trail-route" d="M82 470C180 390 160 310 270 285S390 315 440 220 520 165 620 70"/><circle cx="82" cy="470" r="8"/><circle cx="620" cy="70" r="8"/></svg><span className="trilha-stamp">BH<br />A PÉ</span><span className="trilha-title">a cidade<br />acontece<br /><i>no caminho.</i></span></div>;
  return <div className="glyph glyph-rota" aria-hidden="true"><span className="rota-sun" /><span className="rota-type">ROTA<br /><i>di</i> BUTECO</span><span className="rota-path" /><span className="rota-stamp">BH · 2026</span></div>;
}

function PortfolioProject({ project, index }) {
  const summaries = {
    quarta: "Bares, campanhas e encontros em um app feito para a quarta-feira ganhar a cidade. O acesso está aberto; a data oficial de lançamento ainda não foi definida.",
    pulso: "Fontes públicas viram contexto: acontecimentos organizados por lugar, origem e confiança.",
    sim: "Convite, site e organização do casamento reunidos em uma experiência para o casal e seus convidados.",
    trilha: "Uma forma coletiva de encontrar bares e desenhar novos roteiros por Belo Horizonte.",
    rota: "Uma experiência de descoberta que acompanhou a edição 2026. A próxima versão será redesenhada para 2027.",
  };
  const displayNames = { quarta: "Quarta Amstel", pulso: "PULSO", sim: "e&t", trilha: "Trilha BH", rota: "Rota di Buteco" };
  return (
    <article className={`folio-project folio-${project.id} ${index % 2 ? "folio-reverse" : ""}`}>
      <a className="folio-art" href={`/projetos/${project.id}`} aria-label={`Ver case ${displayNames[project.id]}`}>
        <ProjectGlyph id={project.id} />
        <span className="art-open">Ver projeto <Arrow diagonal /></span>
      </a>
      <div className="folio-copy">
        <p className="folio-type">{project.id === "quarta" ? "PRODUTO DIGITAL · DISPONÍVEL PARA ACESSO" : project.id === "rota" ? "PRODUTO DIGITAL · PRÓXIMO CICLO EM 2027" : project.id === "trilha" ? "PRODUTO DIGITAL · EM FINALIZAÇÃO" : "PRODUTO DIGITAL · CÓDIGO PÚBLICO"}</p>
        <h2>{displayNames[project.id]}</h2>
        <p className="folio-description">{summaries[project.id]}</p>
        <div className="folio-links">
          <a className="folio-primary" href={project.url} target="_blank" rel="noreferrer">{project.id === "quarta" ? "Acessar produto" : project.cta}<Arrow diagonal /></a>
          <a href={project.repo} target="_blank" rel="noreferrer">Código no GitHub <Arrow diagonal /></a>
        </div>
      </div>
    </article>
  );
}

function PortfolioHome() {
  return (
    <div className="portfolio folio-home">
      <Header />
      <main id="inicio">
        <section className="folio-hero">
          <div className="folio-hero-kicker"><span>Henrique Souza</span><span>Desenvolvedor de software · Belo Horizonte</span></div>
          <h1>Software com<br /><em>lugar no mundo.</em></h1>
          <div className="folio-hero-bottom"><p>Produtos digitais que encontram pessoas, cidades e problemas reais. Do primeiro fluxo ao código em produção.</p><a href="#projetos">Conheça o trabalho <span>↓</span></a></div>
          <div className="hero-orbit" aria-hidden="true"><i /><i /><i /><b>HS</b></div>
        </section>
        <div className="folio-marquee" aria-hidden="true"><div>{[0, 1].map((copy) => <span key={copy}>QUARTA AMSTEL <i>✳</i> PULSO <i>✳</i> e&amp;t <i>✳</i> TRILHA BH <i>✳</i> ROTA DI BUTECO <i>✳</i></span>)}</div></div>
        <section className="folio-work" id="projetos" aria-label="Projetos">
          <div className="folio-section-heading"><span>Projetos feitos para existir fora da tela.</span><a href={GH} target="_blank" rel="noreferrer">Acompanhe no GitHub <Arrow diagonal /></a></div>
          {[projects[1], projects[0], ...projects.slice(2)].map((project, index) => <PortfolioProject project={project} index={index} key={project.id} />)}
        </section>
        <section className="folio-about" id="sobre"><p>Gosto de entender como as coisas funcionam antes de decidir como construí-las.</p><div><span>Produto</span><span>Sistemas</span><span>Código</span></div></section>
        <section className="folio-contact" id="codigo"><div><span>Tem algo bom para construir?</span><h2>Vamos fazer<br /><em>acontecer.</em></h2></div><a href={`mailto:${EMAIL}`}>Henrique, vamos conversar <Arrow diagonal /></a><div className="folio-social"><a href={GH} target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/henrique-s-4080b9139/" target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${EMAIL}`}>E-mail</a></div></section>
      </main>
      <footer className="folio-footer"><a className="wordmark footer-mark" href="#inicio"><Mark /><span>HENRIQUE<br />SOUZA</span></a><span>Feito em Belo Horizonte, Brasil.</span><a href="#inicio">Voltar ao início ↑</a></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
