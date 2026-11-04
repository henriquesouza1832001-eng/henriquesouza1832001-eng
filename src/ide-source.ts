import appSource from './App.tsx?raw';
import casePageSource from './CasePage.tsx?raw';
import contentSource from './content.ts?raw';
import filmSource from './SoftwareFilm.tsx?raw';

export const sourceByFile: Record<string, string> = {
  'content.ts': contentSource,
  'App.tsx': appSource,
  'CasePage.tsx': casePageSource,
  'SoftwareFilm.tsx': filmSource,
};

export const codeFiles = Object.keys(sourceByFile);
