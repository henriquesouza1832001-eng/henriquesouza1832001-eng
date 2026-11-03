export const projectSource = [
  'export const projects: Project[] = [',
  "  { key: 'rota', number: '01', title: 'Rota di Buteco',",
  "    status: 'EVENTO ENCERRADO',",
  "    line: 'A cidade virou um jogo entre amigos.',",
  "    stack: ['JavaScript', 'Firebase', 'Firestore', 'Leaflet', 'PWA'],",
  "    live: 'https://rotadibuteco.web.app/' },",
  "  { key: 'quarta', number: '02', title: 'Quarta é Dia de Amstel',",
  "    status: 'REPOSITÓRIO PÚBLICO · ACESSO 18+',",
  "    stack: ['JavaScript', 'Cloudflare Workers', 'D1', 'Web Push'],",
  "    live: 'https://quarta-amstel.pages.dev/' },",
  '];',
];

export const sourceByFile: Record<string, string[]> = {
  'content.ts': projectSource,
  'App.tsx': [
    "import { projects } from './content';",
    "import CasePage from './CasePage';",
    "import SoftwareFilm from './SoftwareFilm';",
    "const slug = window.location.pathname.match(/^\\/projetos\\/([^/]+)\\/?$/)?.[1];",
    'const caseProject = slug ? projects.find(project => project.slug === slug) : undefined;',
    '',
    '<SoftwareFilm soundEnabled={soundEnabled} onSoundToggle={toggleSound} />',
  ],
  'CasePage.tsx': [
    "import { featured, type Project } from './content';",
    "import { CondrioDemo, MnemeDemo, QuartaDemo, RotaDemo } from './Demos';",
    "import ProjectGraphic from './ProjectGraphic';",
    '',
    'export default function CasePage({ project }: { project: Project }) {',
    '  const copy = caseCopy[project.key];',
    '  const next = featured[(featured.findIndex(item => item.key === project.key) + 1) % featured.length];',
    '  return <main className={`case-page case-${project.key}`}>',
  ],
  'SoftwareFilm.tsx': [
    'const progress = clamp01(-root.getBoundingClientRect().top / range);',
    'const nextStage = stageFor(progress);',
    '',
    'if (nextStage !== previousStageRef.current) {',
    '  setStage(nextStage);',
    '  previousStageRef.current = nextStage;',
    '}',
    '',
    'sceneRef.current?.setProgress(progress);',
  ],
};

export const codeFiles = Object.keys(sourceByFile);
