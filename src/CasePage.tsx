import { featured, type Project } from './content';
import { CondrioDemo, MnemeDemo, QuartaDemo, RotaDemo } from './Demos';
import ProjectGraphic from './ProjectGraphic';

const caseCopy: Record<string, { situation: string; system: string; decisionTitle: string; decision: string; limit: string; proof: string }> = {
  rota: {
    situation: 'Durante o Comida di Buteco BH 2026, um grupo de amigos queria descobrir bares, registrar visitas e acompanhar quem avançava pelo roteiro. O produto tinha começo e fim: precisava estar pronto para o evento.',
    system: 'A PWA usa Firebase Authentication, Firestore, Storage e Leaflet. Cada check-in com foto atualizava dados de visita; listeners do Firestore mantinham ranking e feed sincronizados para quem estava com o app aberto.',
    decisionTitle: 'Tempo real era parte da brincadeira.',
    decision: 'O app foi feito sem framework de frontend para reduzir o caminho até a entrega. Firestore entrou porque a visita de uma pessoa precisava aparecer no grupo sem recarregar a página.',
    limit: 'O feed usa um array em um documento do Firestore, adequado ao grupo pequeno do evento. O próprio README aponta que esse formato precisaria de uma escrita validada no servidor para crescer.',
    proof: 'README público: 128 bares, sete regiões, check-in com foto, nove categorias de ranking e uso durante o evento de 2026.',
  },
  quarta: {
    situation: 'Uma campanha local depende de contexto. O bar precisa ser encontrado, e a promoção mostrada à pessoa deve corresponder ao lugar e à regra aplicável.',
    system: 'A interface pública e o painel administrativo são atendidos por um Cloudflare Worker com banco D1. O código resolve uma campanha por prioridade: bar, cidade, estado e campanha nacional.',
    decisionTitle: 'A regra vive no backend.',
    decision: 'A prioridade é calculada no Worker, que devolve a campanha aplicável junto dos dados do bar. Isso evita que cada tela tente interpretar a mesma regra por conta própria.',
    limit: 'A demonstração abaixo usa localidades e campanhas fictícias. A configuração pública documenta D1 e chaves de notificações; não tratamos comentários sobre cron como prova de agendamento ativo.',
    proof: 'Arquivos públicos worker/index.js, www/index.html, www/admin.html e wrangler.toml.',
  },
  condrio: {
    situation: 'Obras, manutenção, climatização, acesso e atividades viviam entre planilhas, WhatsApp e a memória de quem operava. O sistema reuniu esses caminhos em um ERP interno.',
    system: 'O README público descreve frontend HTML/CSS/JS, FastAPI em Databricks Apps e Delta Lake via SQL Warehouse. A mesma branch também contém uma API Hono para Cloudflare Workers com D1, KV e R2; a relação entre essas implementações não está documentada.',
    decisionTitle: 'A latência virou uma decisão de arquitetura.',
    decision: 'Na arquitetura descrita pelo README, o cache em memória evita repetir leituras do SQL Warehouse e é atualizado após escritas. A demonstração separa esse caminho da API Worker encontrada na branch, sem afirmar que uma substituiu a outra.',
    limit: 'O vínculo entre as duas linhas de arquitetura e o deploy atual não estão confirmados. A demonstração emprega dados sintéticos, não conecta a nenhum backend e não exibe informação interna de pessoas, obras ou orçamento.',
    proof: 'README público do Condrio/Controler e código público em System/worker; o README e a árvore de código descrevem caminhos de arquitetura diferentes.',
  },
  mneme: {
    situation: 'O MNEME acompanha traders na Solana e procura uma direção compartilhada entre operações recentes antes de simular uma entrada ou saída.',
    system: 'O README descreve a taxa de acerto em operações fechadas nos últimos 30 dias. A entrada considera a maioria de traders de alto acerto comprando dentro da janela configurada; a saída observa a maioria dos traders que formaram a entrada. A execução documentada usa preço de mercado, taxas e slippage reais, mas continua simulada.',
    decisionTitle: 'A maioria é uma regra, não uma promessa.',
    decision: 'O fluxo combina direção da maioria com janela, meta diária de lucro e limite de perda. Ao atingir os limites, as compras pausam até a meia-noite de Brasília. A interação usa cenários inventados e para antes de qualquer ordem.',
    limit: 'MNEME é um projeto de Thiago Antunes. Henrique colaborou no desenvolvimento, sem módulo específico atribuído publicamente. O README descreve execução real como uma etapa futura; não exibimos carteiras, resultados ou recomendações.',
    proof: 'README e package.json públicos do MNEME, mais a confirmação de Henrique sobre sua colaboração.',
  },
};

function CaseGraphic({ project }: { project: Project }) {
  return <div className={`case-art art-${project.key}`}><div className="case-art-top"><span>HS / {project.number}</span><span>DIAGRAMA EDITORIAL</span></div><ProjectGraphic kind={project.key}/><div className="case-art-bottom"><span>{project.key === 'rota' ? 'MAPA → VISITA → GRUPO' : project.key === 'quarta' ? 'LUGAR → REGRA → CAMPANHA' : project.key === 'condrio' ? 'ENTRADA → MÓDULO → RESULTADO' : 'OPERAÇÕES → MAIORIA → SIMULAÇÃO'}</span><span>↗</span></div></div>;
}

export default function CasePage({ project }: { project: Project }) {
  const copy = caseCopy[project.key];
  const next = featured[(featured.findIndex(item => item.key === project.key) + 1) % featured.length];
  return <main className={`case-page case-${project.key}`} id="topo"><section className="case-hero section-wrap"><div className="section-label"><span>{project.number} / {project.tag}</span><span>{project.status}</span></div><div className="case-hero-layout"><div><a className="back-link" href="/#trabalhos">← Voltar aos trabalhos</a><h1>{project.title}<span>.</span></h1><p className="case-lead">{project.line}</p><p className="case-summary">{project.description}</p>{project.role && <p className="case-role"><span>PAPEL</span><strong>{project.role}</strong></p>}<div className="case-hero-links"><a href={project.repo} target="_blank" rel="noreferrer">Código / documentação ↗</a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">{project.liveLabel || 'Abrir produto ↗'}</a>}</div></div><CaseGraphic project={project}/></div><div className="case-scroll">ROLE PARA VER O SISTEMA ↓</div></section><section className="case-situation section-wrap"><div className="section-label"><span>01 / SITUAÇÃO</span><span>DE ONDE VEIO</span></div><div className="case-text-grid"><h2>O ponto<br/><em>de partida.</em></h2><p>{copy.situation}</p></div></section><section className="case-experience section-wrap"><div className="section-label"><span>02 / EXPERIÊNCIA</span><span>INTERAÇÃO DEMONSTRATIVA</span></div><div className="case-section-intro"><h2>Mexa no<br/><em>problema.</em></h2><p>Esta interação reconstrói uma mecânica do projeto com dados de exemplo. Ela não altera o produto original.</p></div>{project.key === 'rota' && <RotaDemo/>}{project.key === 'quarta' && <QuartaDemo/>}{project.key === 'condrio' && <CondrioDemo/>}{project.key === 'mneme' && <MnemeDemo/>}</section><section className="case-system section-wrap"><div className="section-label"><span>03 / SISTEMA</span><span>O QUE SUSTENTA A EXPERIÊNCIA</span></div><div className="case-text-grid"><h2>Por trás<br/><em>da tela.</em></h2><div><p>{copy.system}</p><div className="stack-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div></div></div></section><section className="case-decision section-wrap"><div className="section-label"><span>04 / DECISÃO</span><span>ENGENHARIA COM CONTEXTO</span></div><div className="decision-layout"><div className="decision-number">{project.number}</div><div><h2>{copy.decisionTitle}</h2><p>{copy.decision}</p><div className="decision-limit"><span>CONSEQUÊNCIA / LIMITE</span><p>{copy.limit}</p></div></div></div></section><section className="case-proof section-wrap"><div className="section-label"><span>05 / PROVA E CRÉDITOS</span><span>{project.status}</span></div><div className="proof-layout"><div><h2>O que está<br/><em>documentado.</em></h2><p>{copy.proof}</p>{project.key === 'mneme' && <p className="credit-strong">Projeto de Thiago Antunes. Henrique Souza colaborou no desenvolvimento.</p>}<div className="case-hero-links"><a href={project.repo} target="_blank" rel="noreferrer">Ver repositório ↗</a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">{project.liveLabel || 'Abrir produto ↗'}</a>}</div></div><a className="next-case" href={`/projetos/${next.slug}`}><span>PRÓXIMO PROJETO / {next.number}</span><strong>{next.title}</strong><span>↗</span></a></div></section></main>;
}
