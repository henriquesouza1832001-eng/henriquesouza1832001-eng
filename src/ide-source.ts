import appSource from './App.tsx?raw';
import casePageSource from './CasePage.tsx?raw';
import contentSource from './content.ts?raw';
import filmSource from './SoftwareFilm.tsx?raw';

function sourceWindow(source: string, marker: string, linesBefore: number, lineCount: number) {
  const lines = source.split(/\r?\n/);
  const markerIndex = lines.findIndex(line => line.includes(marker));
  if (markerIndex < 0) return [];
  const start = Math.max(0, markerIndex - linesBefore);
  return lines.slice(start, start + lineCount);
}

export const sourceByFile: Record<string, string[]> = {
  'App.tsx': sourceWindow(appSource, 'const slug =', 0, 8),
  'content.ts': sourceWindow(contentSource, "key: 'rota'", 1, 8),
  'CasePage.tsx': sourceWindow(casePageSource, 'const copy = caseCopy', 0, 1),
  'SoftwareFilm.tsx': sourceWindow(filmSource, 'const progress = clamp01', 0, 9),
};

export const codeFiles = Object.keys(sourceByFile);
