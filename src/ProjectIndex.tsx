import { projects, type Project, type ProjectKey } from './content';
import ProjectRenderer from './ProjectRenderers';

type RenderedProjectKey = Extract<ProjectKey, 'rota' | 'quarta' | 'condrio' | 'mneme'>;
type RenderedProject = Project & { key: RenderedProjectKey };

const renderedKeys: RenderedProjectKey[] = ['rota', 'quarta', 'condrio', 'mneme'];
const renderedProjects = projects.filter((project): project is RenderedProject => renderedKeys.includes(project.key as RenderedProjectKey));
const ongoingProjects = projects.filter(project => project.key === 'pulso' || project.key === 'trilha');

function ProjectLinks({ project }: { project: RenderedProject }) {
  return <div className="spread-links">
    {project.slug && <a href={`/projetos/${project.slug}/`}>Ler o case <span aria-hidden="true">↗</span></a>}
    {project.live && <a href={project.live} target="_blank" rel="noreferrer">{project.key === 'rota' ? 'Aplicação · evento encerrado' : 'Abrir site · acesso 18+'} <span aria-hidden="true">↗</span></a>}
    <a href={project.repo} target="_blank" rel="noreferrer">Ver repositório <span aria-hidden="true">↗</span></a>
  </div>;
}

function ProjectSpread({ project }: { project: RenderedProject }) {
  const status = project.key === 'condrio' ? 'REPOSITÓRIO PÚBLICO · SISTEMA INTERNO' : project.status;
  return <article className={`project-spread project-spread-${project.key}`}>
    <figure className="project-spread-visual">
      <div className="spread-window-bar"><span className="spread-window-dots" aria-hidden="true"><i/><i/><i/></span><span>{project.title.toLocaleLowerCase('pt-BR')} / fluxo</span><span>RECONSTRUÇÃO EDITORIAL</span></div>
      <ProjectRenderer kind={project.key}/>
      <figcaption>{project.key === 'rota' ? 'Mapa de percurso · posições esquemáticas' : project.key === 'quarta' ? 'Prioridade de campanha · regra pública' : project.key === 'condrio' ? 'Arquiteturas descritas separadamente no repositório' : 'Janela, maioria e execução simulada · README'}</figcaption>
    </figure>
    <div className="project-spread-copy">
      <div className="project-spread-meta"><span>{project.tag}</span><span>{status}</span></div>
      <h3>{project.title}</h3>
      <p className="project-spread-line">{project.line}</p>
      <p className="project-spread-description">{project.description}</p>
      {project.role && <p className="project-role">{project.role}</p>}
      <div className="project-stack" aria-label="Tecnologias"><span>STACK</span>{project.stack.map(item => <b key={item}>{item}</b>)}</div>
      <ProjectLinks project={project}/>
    </div>
  </article>;
}

export default function ProjectIndex() {
  return <section className="project-index section-wrap" id="trabalhos" aria-labelledby="project-index-title">
    <header className="project-index-heading">
      <div><p className="index-overline">HENRIQUE SOUZA / TRABALHOS SELECIONADOS</p><h2 id="project-index-title">Projetos<br/><em>em contexto.</em></h2></div>
      <p className="index-intro">Cidade, campanha, operação e decisão. Cada projeto parte de um fluxo diferente e pede uma resposta própria no produto.</p>
    </header>

    <div className="project-spreads">
      {renderedProjects.map(project => <ProjectSpread project={project} key={project.key}/ >)}
    </div>

    <section className="ongoing-work" aria-labelledby="ongoing-title">
      <header><span>OUTRAS FRENTES</span><h3 id="ongoing-title">Em andamento</h3><p>Dois projetos continuam em construção; os estados estão explícitos.</p></header>
      <div className="ongoing-list">
        {ongoingProjects.map(project => <article className={`ongoing-row ongoing-${project.key}`} key={project.key}>
          <span className="ongoing-status"><i aria-hidden="true"/>{project.status}</span>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <a href={project.repo} target="_blank" rel="noreferrer">Repositório <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
    </section>
  </section>;
}
