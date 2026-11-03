import { featured } from './content';
import ProjectGraphic from './ProjectGraphic';

const stories = {
  rota: {
    context: 'O evento ocupava a cidade, mas a experiência do grupo estava espalhada entre mapa, fotos e conversa.',
    move: 'Transformei a visita em um gesto que atualiza o percurso: o check-in liga lugar, pessoa, feed e placar.',
    evidence: 'PWA · Firebase Authentication · Firestore · Storage · Leaflet · 128 bares · 7 regiões.',
    caption: 'A CIDADE VIRA PERCURSO',
  },
  quarta: {
    context: 'Uma campanha precisava aparecer para o bar certo, sem perder a regra quando a oferta mudava de escala.',
    move: 'Levei a precedência para o Worker: bar, cidade, estado e país. A interface recebe a decisão já resolvida.',
    evidence: 'Cloudflare Worker · D1 · Web Push. O app da bancada usa campanhas fictícias.',
    caption: 'A REGRA ENCONTRA O LUGAR',
  },
  condrio: {
    context: 'Obras, chamados, conforto, CAPEX, acesso e atividades disputavam planilhas, mensagens e memória de operação.',
    move: 'Reuni os fluxos num ERP interno por módulos, com estados e histórico para acompanhar o trabalho.',
    evidence: 'O README descreve FastAPI/Databricks/Delta Lake; a branch também contém Worker/Hono/D1/KV/R2. Implantação atual não confirmada.',
    caption: 'A OPERAÇÃO GANHA RASTRO',
  },
  mneme: {
    context: 'O produto observa operações recentes e procura uma maioria antes de simular uma entrada ou saída.',
    move: 'Colaborei no desenvolvimento. A documentação descreve execução simulada; não atribui um módulo específico à minha participação.',
    evidence: 'Projeto de Thiago Antunes · janela de 30 dias · limites diários · sem ordens reais na execução documentada.',
    caption: 'O SINAL PARA ANTES DA ORDEM',
  },
};

export default function ProjectEditorials() {
  return <section className="project-editorials" id="trabalhos" aria-labelledby="work-title">
    <header className="work-index section-wrap" data-palette-zone="work-index">
      <div className="section-label"><span>05 / CADERNOS DE PROJETO</span><span>PROBLEMA → DECISÃO → SISTEMA</span></div>
      <div className="work-heading"><h2 id="work-title">O trabalho<br/>em <em>contexto.</em></h2><p>Quatro problemas diferentes, vistos de perto. Cada caderno mostra o que mudou no sistema e onde a implementação para.</p></div>
      <div className="work-index-rule"><span>ROLA PARA ENTRAR EM CADA PROJETO</span><b>01—04</b></div>
    </header>
    {featured.map((project, index) => {
      const story = stories[project.key as keyof typeof stories];
      if (!story) return null;
      return <article className={`work-editorial work-${project.key}`} id={`trabalho-${project.key}`} data-palette-zone={`work-${project.key}`} key={project.key}>
        <div className="work-editorial-inner section-wrap">
          <header className="work-editorial-head"><span>{String(index + 1).padStart(2, '0')} / 04 · {project.tag}</span><span>{project.status}</span></header>
          <div className="work-editorial-grid">
            <div className="work-visual">
              <div className="work-visual-note"><span>PRANCHA DE PROJETO</span><span>{project.number}—HS</span></div>
              <ProjectGraphic kind={project.key}/>
              <div className="work-visual-caption"><b>{story.caption}</b><span>{project.stack.slice(0, 2).join(' / ')}</span></div>
            </div>
            <div className="work-copy">
              <p className="work-kicker">{project.number} / {project.status}</p>
              <h3>{project.title}<i>.</i></h3>
              <p className="work-line">{project.line}</p>
              <div className="work-reading"><div><span>O PROBLEMA</span><p>{story.context}</p></div><div><span>A DECISÃO</span><p>{story.move}</p></div></div>
              <div className="work-proof"><span>O QUE O REPOSITÓRIO MOSTRA</span><p>{story.evidence}</p></div>
              {project.role && <p className="work-role"><span>MINHA PARTICIPAÇÃO</span>{project.role}</p>}
              <div className="work-links"><a href={`/projetos/${project.slug}/`}>Ler o caderno completo <b>↗</b></a><a href={project.repo} target="_blank" rel="noreferrer">Abrir repositório <b>↗</b></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">{project.liveLabel || 'Abrir produto ↗'}</a>}</div>
            </div>
          </div>
        </div>
      </article>;
    })}
  </section>;
}
