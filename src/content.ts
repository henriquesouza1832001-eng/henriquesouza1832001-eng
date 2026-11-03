export type ProjectKey = 'rota' | 'quarta' | 'condrio' | 'mneme' | 'pulso' | 'trilha';

export type Project = {
  key: ProjectKey;
  number: string;
  title: string;
  tag: string;
  status: string;
  line: string;
  description: string;
  stack: string[];
  repo: string;
  live?: string;
  liveLabel?: string;
  role?: string;
  slug?: string;
};

export const projects: Project[] = [
  {
    key: 'rota', number: '01', title: 'Rota di Buteco', tag: 'CIDADE / EXPERIÊNCIA SOCIAL', status: 'EVENTO ENCERRADO',
    line: 'A cidade virou um jogo entre amigos.',
    description: 'Um bar visitado mudava o mapa, o feed e a disputa do grupo. Uma PWA criada para acompanhar o Comida di Buteco BH 2026.',
    stack: ['JavaScript', 'Firebase', 'Firestore', 'Leaflet', 'PWA'],
    role: 'Desenvolvimento full stack · PWA, Firebase e mapa.',
    repo: 'https://github.com/henriquesouza1832001-eng/rotadibuteco', live: 'https://rotadibuteco.web.app/', liveLabel: 'Abrir app · evento encerrado ↗', slug: 'rota-di-buteco',
  },
  {
    key: 'quarta', number: '02', title: 'Quarta é Dia de Amstel', tag: 'CAMPANHA / SISTEMA LOCAL', status: 'REPOSITÓRIO PÚBLICO · ACESSO 18+',
    line: 'A campanha encontra o lugar certo.',
    description: 'Uma experiência de descoberta de bares sustentada por regras de campanha, Cloudflare Worker e D1.',
    stack: ['JavaScript', 'Cloudflare Workers', 'D1', 'Web Push'],
    role: 'Desenvolvimento full stack · interface, Worker e D1.',
    repo: 'https://github.com/henriquesouza1832001-eng/quarta-amstel', live: 'https://quarta-amstel.pages.dev/', liveLabel: 'Abrir site · confirmação de idade ↗', slug: 'quarta-amstel',
  },
  {
    key: 'condrio', number: '03', title: 'Condrio', tag: 'OPERAÇÃO / ERP', status: 'SISTEMA INTERNO',
    line: 'A operação precisava de um lugar só.',
    description: 'ERP interno para obras, chamados, conforto, acesso e CAPEX. O repositório documenta duas linhas de arquitetura; a implantação atual não está confirmada.',
    stack: ['Python', 'FastAPI', 'Databricks', 'Delta Lake', 'JavaScript'],
    role: 'Desenvolvimento do ERP · fluxos operacionais e integração full stack.',
    repo: 'https://github.com/henriquesouza1832001-eng/condrio', slug: 'condrio',
  },
  {
    key: 'mneme', number: '04', title: 'MNEME', tag: 'COLABORAÇÃO / DECISÃO', status: 'PROJETO DE THIAGO ANTUNES',
    line: 'A maioria aponta uma direção; a execução ainda é simulada.',
    description: 'Projeto de Thiago Antunes. Colaborei no desenvolvimento de um bot de copy trading para Solana; a execução documentada hoje é simulada.',
    stack: ['TypeScript', 'Node.js', 'Cloudflare Workers', 'Solana', 'Telegram'],
    role: 'Colaboração no desenvolvimento; sem módulo específico atribuído publicamente.',
    repo: 'https://github.com/th1agx/MNEME', slug: 'mneme',
  },
  {
    key: 'pulso', number: '05', title: 'PULSO', tag: 'FONTES / DADOS PÚBLICOS', status: 'EM DESENVOLVIMENTO',
    line: 'Fontes públicas, sinais com contexto.',
    description: 'Motor que reúne fontes públicas e separa atividade, severidade e confiança sem tratar sinal como confirmação.',
    stack: ['React', 'TypeScript', 'Python', 'Cloudflare Workers'],
    repo: 'https://github.com/henriquesouza1832001-eng/Pulso',
  },
  {
    key: 'trilha', number: '06', title: 'TrilhaBH', tag: 'CIDADE / ROTEIROS', status: 'PRÉ-BETA',
    line: 'A exploração continua.',
    description: 'PWA e aplicativo Android para descobrir lugares, criar roteiros e explorar Belo Horizonte em grupo.',
    stack: ['JavaScript', 'Firebase', 'Leaflet', 'Capacitor'],
    repo: 'https://github.com/henriquesouza1832001-eng/trilhaBH',
  },
];

export const featured = projects.slice(0, 4);
