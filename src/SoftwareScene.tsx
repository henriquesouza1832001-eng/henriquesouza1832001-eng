import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import WorkstationScreen, { type ScreenStage } from './WorkstationScreen';
import { sourceByFile } from './ide-source';

export type SoftwareSceneHandle = {
  setProgress: (value: number) => void;
  setPointer: (x: number, y: number) => void;
};

type SoftwareSceneProps = { stage: ScreenStage; typingStep: number; soundEnabled: boolean; onSoundToggle: () => void };

function screenTransform(points: [number, number][], width: number, height: number) {
  const source = [[0, 0], [width, 0], [width, height], [0, height]];
  const rows: number[][] = [];
  points.forEach(([x, y], index) => {
    const [u, v] = source[index];
    rows.push([u, v, 1, 0, 0, 0, -x * u, -x * v, x]);
    rows.push([0, 0, 0, u, v, 1, -y * u, -y * v, y]);
  });
  for (let column = 0; column < 8; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < 8; row += 1) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column])) pivot = row;
    }
    [rows[column], rows[pivot]] = [rows[pivot], rows[column]];
    const divisor = rows[column][column] || 1;
    for (let value = column; value < 9; value += 1) rows[column][value] /= divisor;
    for (let row = 0; row < 8; row += 1) {
      if (row === column) continue;
      const factor = rows[row][column];
      for (let value = column; value < 9; value += 1) rows[row][value] -= factor * rows[column][value];
    }
  }
  const [a, b, c, d, e, f, g, h] = rows.map(row => row[8]);
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${h},0,0,1,0,${c},${f},0,1)`;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp01(value); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function makePaperTexture(THREE: any) {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1200;
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.fillStyle = '#ded8c9';
  context.fillRect(0, 0, canvas.width, canvas.height);
  let seed = 41;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 1700; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    context.strokeStyle = random() > 0.5 ? '#fffdf326' : '#514b3f0b';
    context.lineWidth = random() > 0.9 ? 1.4 : 0.7;
    context.beginPath(); context.moveTo(x, y); context.lineTo(x + random() * 10, y + random() * 3); context.stroke();
  }
  context.strokeStyle = '#77756788';
  context.lineWidth = 2;
  context.strokeRect(110, 146, 680, 240);
  context.strokeRect(110, 466, 286, 258);
  context.strokeRect(500, 466, 290, 258);
  context.strokeRect(110, 804, 680, 220);
  context.fillStyle = '#c78e70';
  for (const [x, y] of [[163, 198], [737, 322], [176, 568], [728, 641], [170, 882], [727, 949]]) {
    context.beginPath(); context.arc(x, y, 8, 0, Math.PI * 2); context.fill();
  }
  context.strokeStyle = '#77756788';
  context.lineWidth = 3;
  context.beginPath(); context.moveTo(180, 198); context.lineTo(382, 198); context.lineTo(410, 268); context.lineTo(686, 268); context.stroke();
  context.beginPath(); context.moveTo(180, 568); context.lineTo(326, 568); context.lineTo(326, 654); context.lineTo(180, 654); context.stroke();
  context.beginPath(); context.moveTo(570, 568); context.lineTo(690, 568); context.lineTo(690, 654); context.lineTo(570, 654); context.stroke();
  context.beginPath(); context.moveTo(180, 882); context.lineTo(398, 882); context.moveTo(180, 925); context.lineTo(530, 925); context.moveTo(180, 968); context.lineTo(645, 968); context.stroke();
  context.fillStyle = '#80796744';
  for (let index = 0; index < 28; index += 1) {
    const x = 125 + random() * 640;
    const y = 164 + random() * 825;
    context.fillRect(x, y, 5 + random() * 30, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function fillRoundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

function addRod(THREE: any, group: any, start: [number, number, number], end: [number, number, number], radius: number, material: any) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const direction = to.clone().sub(from);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 12), material);
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  group.add(mesh);
  return mesh;
}

function roundedRectangle(THREE: any, width: number, height: number, radius: number) {
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w, h);
  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  return shape;
}

function roundedExtrusion(THREE: any, width: number, height: number, depth: number, radius: number, bevelSize: number) {
  const geometry = new THREE.ExtrudeGeometry(roundedRectangle(THREE, width, height, radius), {
    depth,
    bevelEnabled: bevelSize > 0,
    bevelSegments: 3,
    steps: 1,
    bevelSize,
    bevelThickness: bevelSize,
    curveSegments: 8,
  });
  geometry.computeVertexNormals();
  return geometry;
}

function makeSurfaceMaps(THREE: any, kind: 'plastic' | 'fabric', seed: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 512;
  const context = canvas.getContext('2d');
  if (!context) return { map: null, bumpMap: null };
  context.fillStyle = kind === 'fabric' ? '#d1d0ca' : '#deddd7';
  context.fillRect(0, 0, 512, 512);
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  if (kind === 'fabric') {
    for (let y = 0; y < 512; y += 4) {
      context.fillStyle = y % 2 ? '#2526211a' : '#f3efe21c';
      context.fillRect(0, y, 512, 1);
    }
    for (let x = 0; x < 512; x += 4) {
      context.fillStyle = x % 2 ? '#f3efe21b' : '#2526211c';
      context.fillRect(x, 0, 1, 512);
    }
  }
  for (let index = 0; index < 22000; index += 1) {
    const shade = Math.round(105 + random() * 95);
    const alpha = kind === 'fabric' ? 0.07 : 0.065;
    context.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    const size = kind === 'fabric' ? (random() > 0.985 ? 2 : 1) : random() > 0.99 ? 2 : 1;
    context.fillRect(Math.floor(random() * 512), Math.floor(random() * 512), size, size);
  }
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(kind === 'fabric' ? 4 : 2, kind === 'fabric' ? 4 : 2);
  const bumpMap = map.clone();
  bumpMap.colorSpace = THREE.NoColorSpace;
  bumpMap.needsUpdate = true;
  return { map, bumpMap };
}

function drawIde(context: CanvasRenderingContext2D, reveal: number) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  context.fillStyle = '#11100f';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#211d1a';
  context.fillRect(0, 0, width, 62);
  context.fillStyle = '#d66a4a';
  context.fillRect(24, 20, 23, 23);
  context.fillStyle = '#22251f';
  context.font = '700 13px monospace';
  context.fillText('{}', 27, 36);
  context.fillStyle = '#d4d1c4';
  context.font = '18px monospace';
  context.fillText('src / portfolio / content.ts', 112, 37);
  context.fillStyle = '#777168';
  context.fillRect(0, 62, 194, height - 62);
  context.font = '16px monospace';
  context.fillStyle = '#c8c1b5';
  context.fillText('⌄  src', 24, 104);
  context.fillStyle = '#d66a4a';
  context.fillRect(14, 121, 166, 34);
  context.fillStyle = '#273027';
  context.fillText('TS  content.ts', 26, 144);
  context.fillStyle = '#b9b1a6';
  context.fillText('TS  SoftwareFilm.tsx', 24, 190);
  context.fillText('⌄  cases', 24, 244);
  context.fillText('TS  CasePage.tsx', 24, 281);
  const lines = sourceByFile['content.ts'].map(line => [line, '']);
  const visibleLines = Math.floor(reveal * lines.length);
  context.font = '16px monospace';
  lines.slice(0, visibleLines).forEach(([lead, tail], index) => {
    const y = 112 + index * 35;
    context.fillStyle = '#777168';
    context.fillText(String(index + 1).padStart(2, '0'), 221, y);
    context.fillStyle = /^(export|const|return|<|\/)/.test(lead.trim()) ? '#d66a4a' : '#e2ded2';
    context.fillText(lead, 273, y);
    const offset = context.measureText(lead).width;
    context.fillStyle = tail.includes('useState') || tail.includes('required') ? '#d66a4a' : tail.includes('Pedido') || tail.includes('Resumo') || tail.includes('Resultado') ? '#aaa399' : '#e2ded2';
    context.fillText(tail, 273 + offset, y);
  });
  if (visibleLines > 0 && visibleLines < lines.length) {
    const cursorY = 112 + (visibleLines - 1) * 35;
    context.fillStyle = '#d66a4a';
    context.fillRect(281, cursorY - 21, 2, 25);
  }
  context.fillStyle = '#a39b8e';
  context.font = '14px monospace';
  context.fillText('REPOSITÓRIO  ·  PROJETOS  ·  LINKS', 220, height - 28);
}

function drawTyped(context: CanvasRenderingContext2D, text: string, x: number, y: number, progress: number) {
  context.fillText(text.slice(0, Math.ceil(text.length * clamp01(progress))), x, y);
}

function drawPrototype(context: CanvasRenderingContext2D, progress: number, entrance: number) {
  if (progress <= 0 && entrance <= 0) return;
  const width = context.canvas.width;
  const height = context.canvas.height;
  context.save();
  const entranceAlpha = smooth(entrance / 0.18);
  context.globalAlpha = entranceAlpha;
  context.translate((1 - smooth(entrance)) * (width - 600), 0);
  context.fillStyle = '#211d1a';
  context.fillRect(600, 62, width - 600, height - 62);
  context.fillStyle = '#eee9de';
  context.fillRect(600, 62, width - 600, height - 62);
  context.fillStyle = '#2a2521';
  context.fillRect(600, 62, width - 600, 52);
  context.fillStyle = '#e2ddce';
  context.font = '16px monospace';
  context.fillText('PRÉVIA LOCAL · FLUXO DE EXEMPLO', 632, 94);
  const heading = smooth((progress - 0.1) / 0.16);
  const firstField = smooth((progress - 0.24) / 0.15);
  const secondField = smooth((progress - 0.4) / 0.15);
  const action = smooth((progress - 0.57) / 0.16);
  const validation = smooth((progress - 0.74) / 0.12);
  context.globalAlpha = entranceAlpha * heading;
  context.fillStyle = '#242821';
  context.font = '600 36px "DM Sans", Arial, sans-serif';
  context.fillText('Novo pedido', 656, 184);
  context.globalAlpha = entranceAlpha * smooth(progress / 0.08) * firstField;
  context.fillStyle = '#746e65';
  context.font = '15px monospace';
  context.fillText('RESUMO DO PEDIDO', 656, 226);
  context.strokeStyle = '#aaa392';
  context.lineWidth = 1;
  context.strokeRect(656, 243, 500, 65);
  context.fillStyle = '#38342e';
  context.fillStyle = '#38342e';
  drawTyped(context, 'Organizar uma solicitação', 674, 281, (progress - 0.34) / 0.2);
  context.globalAlpha = entranceAlpha * smooth(progress / 0.08) * secondField;
  context.fillStyle = '#746e65';
  context.fillText('RESULTADO ESPERADO', 656, 354);
  context.strokeRect(656, 371, 500, 55);
  context.fillStyle = '#38342e';
  drawTyped(context, 'Resposta clara até sexta', 674, 404, (progress - 0.52) / 0.18);
  context.globalAlpha = entranceAlpha * smooth(progress / 0.08) * action;
  context.fillStyle = '#d66a4a';
  fillRoundRect(context, 656, 465, 194, 54, 3);
  context.fillStyle = '#f1eee4';
  context.font = '600 17px monospace';
  context.fillText('SALVAR PEDIDO', 680, 498);
  context.globalAlpha = entranceAlpha * smooth(progress / 0.08) * validation;
  context.fillStyle = '#d66a4a';
  context.beginPath(); context.arc(872, 492, 7, 0, Math.PI * 2); context.fill();
  context.fillStyle = '#d66a4a';
  context.font = '14px monospace';
  context.fillText('FORMULÁRIO VALIDADO', 892, 498);
  context.fillStyle = '#7a6c5d';
  context.font = '14px monospace';
  context.fillText('O CÓDIGO ATUALIZA ESTA PRÉVIA', 656, height - 31);
  context.restore();
}

function drawProduct(context: CanvasRenderingContext2D, alpha: number, settle: number) {
  if (alpha <= 0) return;
  const width = context.canvas.width;
  const height = context.canvas.height;
  context.save();
  context.globalAlpha = alpha;
  const scale = mix(1.035, 1, smooth(settle));
  context.translate(width * (1 - scale) / 2, height * (1 - scale) / 2);
  context.scale(scale, scale);
  context.fillStyle = '#eee9de';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#282420';
  context.fillRect(0, 0, width, 74);
  context.fillStyle = '#d66a4a';
  context.font = '600 18px monospace';
  context.fillText('FLUXO  /  PEDIDOS', 52, 45);
  context.fillStyle = '#242821';
  context.font = '700 54px "Barlow Condensed", Arial Narrow, sans-serif';
  context.fillText('Pedido registrado.', 84, 202);
  context.fillStyle = '#716a61';
  context.font = '400 20px "DM Sans", Arial, sans-serif';
  context.fillText('Resumo, retorno e responsável ficam no mesmo lugar.', 84, 250);
  context.strokeStyle = '#b7b09e';
  context.lineWidth = 1;
  context.strokeRect(84, 312, 1110, 224);
  context.fillStyle = '#a55a40';
  context.font = '16px monospace';
  context.fillText('RESUMO DO PEDIDO', 116, 358);
  context.fillStyle = '#302a25';
  context.font = '500 28px "DM Sans", Arial, sans-serif';
  context.fillText('Organizar uma solicitação', 116, 402);
  context.fillStyle = '#a55a40';
  context.font = '15px monospace';
  context.fillText('RESULTADO ESPERADO', 116, 458);
  context.fillStyle = '#38342e';
  context.font = '400 21px "DM Sans", Arial, sans-serif';
  context.fillText('Resposta clara até sexta', 116, 494);
  context.fillStyle = '#a55a40';
  context.font = '15px monospace';
  context.fillText('STATUS', 846, 358);
  context.fillStyle = '#302a25';
  context.font = '500 24px "DM Sans", Arial, sans-serif';
  context.fillText('Aguardando equipe', 846, 402);
  context.fillStyle = '#d66a4a';
  context.beginPath(); context.arc(1120, 394, 8, 0, Math.PI * 2); context.fill();
  context.fillStyle = '#7c7b70';
  context.font = '15px monospace';
  context.fillText('RESPONSÁVEL  ·  EQUIPE', 846, 466);
  context.fillStyle = '#7c7b70';
  context.font = '15px monospace';
  context.fillText('MODELO DE PRODUTO · DEMONSTRAÇÃO LOCAL', 84, height - 38);
  context.restore();
}

function buildCursor(progress: number) {
  const code = smooth((progress - 0.38) / 0.27);
  const toPreview = smooth((progress - 0.64) / 0.1);
  const toProduct = smooth((progress - 0.84) / 0.1);
  const codeX = mix(0.27, 0.49, code);
  const codeY = mix(0.16, 0.72, code);
  const previewX = mix(codeX, 0.61, toPreview);
  const previewY = mix(codeY, 0.62, toPreview);
  return { x: mix(previewX, 0.88, toProduct), y: mix(previewY, 0.49, toProduct) };
}

function drawScreen(context: CanvasRenderingContext2D, progress: number) {
  context.fillStyle = '#090b0a';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  const prototypeEntrance = smooth((progress - 0.3) / 0.12);
  const prototypeProgress = clamp01((progress - 0.38) / 0.28);
  const product = smooth((progress - 0.82) / 0.14);
  const typingStep = Math.floor(clamp01((progress - 0.035) / 0.265) * 18);
  drawIde(context, typingStep / 18);
  drawPrototype(context, prototypeProgress * (1 - product), prototypeEntrance * (1 - product));
  drawProduct(context, product, (progress - 0.84) / 0.14);
  context.save();
  context.globalAlpha = 0.08;
  const reflection = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height);
  reflection.addColorStop(0, '#a9b7a219');
  reflection.addColorStop(0.45, '#a9b7a200');
  reflection.addColorStop(1, '#a9b7a20b');
  context.fillStyle = reflection;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.restore();
}

const SoftwareScene = forwardRef<SoftwareSceneHandle, SoftwareSceneProps>(function SoftwareScene({ stage, typingStep, soundEnabled, onSoundToggle }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenPlaneRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const scheduleRef = useRef<() => void>(() => undefined);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.58 });
  const pointerMovedAtRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setProgress(value) {
      progressRef.current = clamp01(value);
      screenPlaneRef.current?.parentElement?.style.setProperty('--scene-progress', String(progressRef.current));
      scheduleRef.current();
    },
    setPointer(x, y) {
      pointerRef.current = { x: clamp01(x), y: clamp01(y) };
      pointerMovedAtRef.current = Date.now();
      scheduleRef.current();
    },
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const sceneHost = host;
    let THREE: any;
    let renderer: any;
    let scene: any;
    let camera: any;
    let workstation: any;
    let sheet: any;
    let mouseObject: any;
    let keyboardKeys: any;
    let keyboardSlots: [number, number, number][] = [];
    let keyboardTypingOrder: number[] = [];
    let keyTransform: any;
    let ledKeys: any;
    let keyboardHues: number[] = [];
    let activeKey = -1;
    let screenTexture: any;
    let interactiveScreen: any;
    let screenContext: CanvasRenderingContext2D | null = null;
    let visible = false;
    let initialized = false;
    let disposed = false;
    let frame = 0;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const schedule = () => {
      if (!visible || disposed || frame || !renderer) return;
      frame = requestAnimationFrame(render);
    };
    scheduleRef.current = schedule;

    const resize = new ResizeObserver(() => {
      if (!renderer || !camera) return;
      const bounds = host.getBoundingClientRect();
      camera.aspect = Math.max(0.45, bounds.width / Math.max(1, bounds.height));
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height, false);
      const fallbackScale = Math.min((bounds.width * (window.innerWidth < 760 ? 0.64 : 0.56)) / 1280, (bounds.height * (window.innerWidth < 760 ? 0.63 : 0.71)) / 800);
      screenPlaneRef.current?.style.setProperty('--fallback-screen-scale', String(fallbackScale));
      schedule();
    });
    resize.observe(sceneHost);

    const intersection = new IntersectionObserver(entries => {
      visible = Boolean(entries[0]?.isIntersecting);
      if (visible && !initialized) { initialized = true; void initialize(); }
      else if (visible) schedule();
    }, { rootMargin: '30% 0px' });
    intersection.observe(sceneHost);

    function woodTexture() {
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 1024; textureCanvas.height = 512;
      const context = textureCanvas.getContext('2d');
      if (!context) return null;
      const wash = context.createLinearGradient(0, 0, 0, 512);
      wash.addColorStop(0, '#817357'); wash.addColorStop(0.48, '#6f6249'); wash.addColorStop(1, '#5b513c');
      context.fillStyle = wash; context.fillRect(0, 0, 1024, 512);
      let seed = 193;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      for (let i = 0; i < 220; i += 1) {
        const y = random() * 512;
        const sway = (random() - 0.5) * 25;
        context.strokeStyle = random() > 0.55 ? '#f0dfba20' : '#19160f28';
        context.lineWidth = random() > 0.94 ? 2.4 : 0.7 + random() * 0.7;
        context.beginPath(); context.moveTo(0, y);
        context.bezierCurveTo(220, y + sway, 635, y - sway * 0.7, 1024, y + sway * 0.35); context.stroke();
      }
      for (const [x, y, rx, ry] of [[178, 166, 28, 9], [744, 362, 20, 7], [905, 122, 15, 5]] as const) {
        context.save(); context.translate(x, y); context.scale(1, ry / rx);
        for (let ring = 0; ring < 4; ring += 1) {
          context.beginPath(); context.ellipse(0, 0, rx * (0.38 + ring * 0.2), rx * (0.12 + ring * 0.12), 0, 0, Math.PI * 2);
          context.strokeStyle = ring % 2 ? '#d3c4a017' : '#11120f24'; context.lineWidth = 1.5; context.stroke();
        }
        context.restore();
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 1);
      return texture;
    }

    function plasterTexture() {
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 512; textureCanvas.height = 512;
      const context = textureCanvas.getContext('2d');
      if (!context) return null;
      const wash = context.createLinearGradient(0, 0, 512, 512);
      wash.addColorStop(0, '#45473f'); wash.addColorStop(0.58, '#505148'); wash.addColorStop(1, '#393b35');
      context.fillStyle = wash; context.fillRect(0, 0, 512, 512);
      let seed = 77;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      for (let i = 0; i < 18000; i += 1) {
        const x = random() * 512; const y = random() * 512;
        const radius = 0.12 + random() * 0.3;
        context.fillStyle = random() > 0.5 ? '#e4ddca04' : '#090b0905';
        context.beginPath(); context.ellipse(x, y, radius * 1.5, radius, random() * Math.PI, 0, Math.PI * 2); context.fill();
      }
      for (let index = 0; index < 24; index += 1) {
        const x = random() * 512; const y = random() * 512;
        context.strokeStyle = random() > 0.5 ? '#d9d2bf04' : '#0a0b0905';
        context.lineWidth = 0.5 + random() * 1;
        context.beginPath(); context.moveTo(x, y);
        context.bezierCurveTo(x + 32, y + 11, x + 62, y - 8, x + 96, y + 3); context.stroke();
      }
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    function buildScene() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#11100f');
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
      const plasticSurface = makeSurfaceMaps(THREE, 'plastic', 81);
      const fabricSurface = makeSurfaceMaps(THREE, 'fabric', 239);
      plasticSurface.map && (plasticSurface.map.anisotropy = 4);
      fabricSurface.map && (fabricSurface.map.anisotropy = 4);
      scene.add(new THREE.HemisphereLight(0xe7e0ce, 0x101311, 2.15));
      const keyLight = new THREE.DirectionalLight(0xf0e5ce, 3.7);
      keyLight.position.set(-4.5, 8, 6); keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -8; keyLight.shadow.camera.right = 8;
      keyLight.shadow.camera.top = 8; keyLight.shadow.camera.bottom = -8;
      keyLight.shadow.bias = -0.0003;
      scene.add(keyLight);
      const fill = new THREE.DirectionalLight(0xb9ad9b, 1.6);
      fill.position.set(4, 4, -4); scene.add(fill);
      const warm = new THREE.PointLight(0xe1bb81, 1.2, 9);
      warm.position.set(0.5, 2.15, 0.4); scene.add(warm);

      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(28, 13),
        new THREE.MeshStandardMaterial({ color: '#c2bbaa', map: plasterTexture(), roughness: 0.97, metalness: 0 }),
      );
      wall.position.set(0, 4.4, -4.25); wall.receiveShadow = true; scene.add(wall);

      const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: '#2c2723', roughness: 0.92 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = -1.77; floor.receiveShadow = true; scene.add(floor);
      workstation = new THREE.Group();
      scene.add(workstation);

      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.24, 6.5), new THREE.MeshStandardMaterial({ color: '#d2c5a7', map: woodTexture(), roughness: 0.74, metalness: 0.02 }));
      deskTop.position.set(0, -0.12, 0); deskTop.castShadow = true; deskTop.receiveShadow = true; workstation.add(deskTop);
      const deskEdge = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.06, 6.52), new THREE.MeshStandardMaterial({ color: '#191614', roughness: 0.43, metalness: 0.35 }));
      deskEdge.position.set(0, -0.27, 0); deskEdge.castShadow = true; workstation.add(deskEdge);
      const legMaterial = new THREE.MeshStandardMaterial({ color: '#191614', roughness: 0.4, metalness: 0.45 });
      for (const x of [-3.85, 3.85]) for (const z of [-2.45, 2.45]) {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.5, 0.14), legMaterial);
        leg.position.set(x, -1.0, z); leg.castShadow = true; workstation.add(leg);
      }

      const monitorCase = new THREE.Mesh(
        roundedExtrusion(THREE, 4.82, 3.12, 0.18, 0.16, 0.035),
        new THREE.MeshPhysicalMaterial({ color: '#282823', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.012, metalness: 0.12, roughness: 0.39, clearcoat: 0.18, clearcoatRoughness: 0.35 }),
      );
      monitorCase.position.set(0.35, 1.82, -1.32); monitorCase.castShadow = true; monitorCase.receiveShadow = true; workstation.add(monitorCase);
      const bezelFace = new THREE.Mesh(
        roundedExtrusion(THREE, 4.61, 2.91, 0.035, 0.11, 0.012),
        new THREE.MeshPhysicalMaterial({ color: '#181916', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.006, metalness: 0.08, roughness: 0.32, clearcoat: 0.24, clearcoatRoughness: 0.24 }),
      );
      bezelFace.position.set(0.35, 1.82, -1.15); bezelFace.castShadow = false; workstation.add(bezelFace);
      const screenCanvas = document.createElement('canvas'); screenCanvas.width = 1280; screenCanvas.height = 800;
      screenContext = screenCanvas.getContext('2d');
      screenTexture = new THREE.CanvasTexture(screenCanvas);
      screenTexture.colorSpace = THREE.SRGBColorSpace; screenTexture.anisotropy = 8;
      drawScreen(screenContext!, progressRef.current);
      screenTexture.needsUpdate = true;
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.28, 2.675), new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false }));
      interactiveScreen = screen;
      screen.position.set(0.35, 1.82, -1.09); workstation.add(screen);
      const screenGlass = new THREE.Mesh(
        new THREE.PlaneGeometry(4.28, 2.675),
        new THREE.MeshPhysicalMaterial({ color: '#f6f1e6', transparent: true, opacity: 0.025, roughness: 0.12, metalness: 0.04, clearcoat: 1, clearcoatRoughness: 0.08, depthWrite: false, side: THREE.DoubleSide }),
      );
      screenGlass.position.set(0.35, 1.82, -1.084); workstation.add(screenGlass);
      const auxiliaryScreenCanvas = document.createElement('canvas'); auxiliaryScreenCanvas.width = 640; auxiliaryScreenCanvas.height = 960;
      const auxiliaryContext = auxiliaryScreenCanvas.getContext('2d');
      if (auxiliaryContext) {
        auxiliaryContext.fillStyle = '#111512'; auxiliaryContext.fillRect(0, 0, 640, 960);
        auxiliaryContext.fillStyle = '#222620'; auxiliaryContext.fillRect(0, 0, 640, 68);
        auxiliaryContext.fillStyle = '#d66a4a'; auxiliaryContext.fillRect(25, 23, 18, 18);
        auxiliaryContext.fillStyle = '#eee9de'; auxiliaryContext.font = '18px monospace'; auxiliaryContext.fillText('HENRIQUE / PROJETOS', 61, 41);
        auxiliaryContext.fillStyle = '#a6a293'; auxiliaryContext.font = '15px monospace'; auxiliaryContext.fillText('FONTES PÚBLICAS', 35, 120);
        const publicProjects = [
          ['rota', 'JavaScript · Firebase · PWA'],
          ['quarta-amstel', 'Workers · D1 · Web Push'],
          ['condrio', 'Python · FastAPI · Databricks'],
          ['MNEME', 'TypeScript · Node.js · Solana'],
        ];
        publicProjects.forEach(([name, stack], index) => {
          const y = 194 + index * 162;
          auxiliaryContext.strokeStyle = '#eee9de35'; auxiliaryContext.strokeRect(28, y - 39, 584, 126);
          auxiliaryContext.fillStyle = '#d66a4a'; auxiliaryContext.fillRect(49, y - 13, 11, 11);
          auxiliaryContext.fillStyle = '#eee9de'; auxiliaryContext.font = '22px monospace'; auxiliaryContext.fillText(name, 80, y);
          auxiliaryContext.fillStyle = '#a6a293'; auxiliaryContext.font = '15px monospace'; auxiliaryContext.fillText(stack, 80, y + 38);
          auxiliaryContext.fillStyle = '#b8c17b'; auxiliaryContext.fillRect(80, y + 63, 148 + index * 28, 3);
        });
        auxiliaryContext.fillStyle = '#918e82'; auxiliaryContext.font = '13px monospace';
        auxiliaryContext.fillText('REPOSITÓRIOS ABERTOS NO GITHUB', 35, 922);
      }
      const auxiliaryTexture = new THREE.CanvasTexture(auxiliaryScreenCanvas);
      auxiliaryTexture.colorSpace = THREE.SRGBColorSpace; auxiliaryTexture.anisotropy = 8;
      auxiliaryTexture.needsUpdate = true;
      const secondaryMonitor = new THREE.Group();
      secondaryMonitor.position.set(-3.14, 1.87, -1.48); secondaryMonitor.rotation.y = 0.045; workstation.add(secondaryMonitor);
      const secondaryCase = new THREE.Mesh(roundedExtrusion(THREE, 1.95, 2.8, 0.16, 0.12, 0.035), new THREE.MeshPhysicalMaterial({ color: '#272925', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.009, metalness: 0.15, roughness: 0.4, clearcoat: 0.18 }));
      secondaryCase.position.z = -0.09;
      secondaryCase.castShadow = true; secondaryCase.receiveShadow = true; secondaryMonitor.add(secondaryCase);
      const secondaryBezel = new THREE.Mesh(roundedExtrusion(THREE, 1.83, 2.67, 0.03, 0.075, 0.009), new THREE.MeshPhysicalMaterial({ color: '#171916', metalness: 0.08, roughness: 0.35, clearcoat: 0.2 }));
      secondaryBezel.position.z = 0.09; secondaryMonitor.add(secondaryBezel);
      const secondaryScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.66, 2.48), new THREE.MeshBasicMaterial({ map: auxiliaryTexture, toneMapped: false }));
      secondaryScreen.position.z = 0.14; secondaryMonitor.add(secondaryScreen);
      const secondaryStand = new THREE.Mesh(roundedExtrusion(THREE, 0.18, 0.8, 0.1, 0.08, 0.018), new THREE.MeshStandardMaterial({ color: '#292b28', metalness: 0.6, roughness: 0.32 }));
      secondaryStand.position.set(0, -1.59, -0.12); secondaryStand.castShadow = true; secondaryMonitor.add(secondaryStand);
      const secondaryFoot = new THREE.Mesh(roundedExtrusion(THREE, 0.92, 0.58, 0.09, 0.12, 0.018), new THREE.MeshStandardMaterial({ color: '#292b28', metalness: 0.58, roughness: 0.33 }));
      secondaryFoot.rotation.x = Math.PI / 2; secondaryFoot.position.set(0, -1.81, 0.05); secondaryFoot.castShadow = true; secondaryMonitor.add(secondaryFoot);
      const webcamRing = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.007, 8, 24), new THREE.MeshStandardMaterial({ color: '#64635c', metalness: 0.7, roughness: 0.3 }));
      webcamRing.position.set(0.35, 3.255, -1.08); workstation.add(webcamRing);
      const webcamLens = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 10), new THREE.MeshPhysicalMaterial({ color: '#242d31', metalness: 0.45, roughness: 0.14, clearcoat: 1 }));
      webcamLens.position.set(0.35, 3.255, -1.071); workstation.add(webcamLens);
      const screenGlow = new THREE.PointLight(0xd6c8a6, 1.25, 7);
      screenGlow.position.set(0.35, 1.8, -0.25); workstation.add(screenGlow);
      const lowerBezel = new THREE.Mesh(new THREE.BoxGeometry(4.22, 0.09, 0.018), new THREE.MeshStandardMaterial({ color: '#151613', metalness: 0.32, roughness: 0.28 }));
      lowerBezel.position.set(0.35, 0.42, -1.105); workstation.add(lowerBezel);
      const sensorRing = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 8, 20), new THREE.MeshStandardMaterial({ color: '#64635c', metalness: 0.72, roughness: 0.28 }));
      sensorRing.position.set(2.32, 0.42, -1.085); workstation.add(sensorRing);
      const sensor = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 8), new THREE.MeshBasicMaterial({ color: '#d66a4a' }));
      sensor.position.set(2.32, 0.42, -1.076); workstation.add(sensor);
      const bezelButtonsMaterial = new THREE.MeshStandardMaterial({ color: '#77776d', metalness: 0.38, roughness: 0.43 });
      for (const x of [1.97, 2.06, 2.15]) {
        const bezelButton = new THREE.Mesh(new THREE.SphereGeometry(0.009, 10, 8), bezelButtonsMaterial);
        bezelButton.position.set(x, 0.42, -1.083); workstation.add(bezelButton);
      }
      const standMaterial = new THREE.MeshStandardMaterial({ color: '#292b28', metalness: 0.66, roughness: 0.29 });
      const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.42, 28), standMaterial);
      pivot.rotation.z = Math.PI / 2; pivot.position.set(0.35, 0.38, -1.36); pivot.castShadow = true; workstation.add(pivot);
      const stand = new THREE.Mesh(roundedExtrusion(THREE, 0.43, 0.94, 0.16, 0.11, 0.015), standMaterial);
      stand.position.set(0.35, -0.02, -1.32); stand.castShadow = true; workstation.add(stand);
      const standFoot = new THREE.Mesh(roundedExtrusion(THREE, 1.72, 0.92, 0.12, 0.18, 0.025), standMaterial);
      standFoot.rotation.x = Math.PI / 2; standFoot.position.set(0.35, 0.11, -0.64); standFoot.castShadow = true; workstation.add(standFoot);
      const standSeam = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.012, 0.018), new THREE.MeshStandardMaterial({ color: '#41433d', metalness: 0.55, roughness: 0.32 }));
      standSeam.position.set(0.35, 0.11, -0.64); workstation.add(standSeam);
      const monitorCableMaterial = new THREE.MeshStandardMaterial({ color: '#191917', roughness: 0.83, metalness: 0.03 });
      const cableCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.35, 0.43, -1.43), new THREE.Vector3(0.38, 0.16, -1.52),
        new THREE.Vector3(0.48, 0.04, -1.65), new THREE.Vector3(0.9, 0.035, -1.72),
        new THREE.Vector3(1.48, 0.035, -1.7),
      ]);
      const monitorCable = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 36, 0.028, 8, false), monitorCableMaterial);
      monitorCable.castShadow = true; workstation.add(monitorCable);
      const cableSocket = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.12), new THREE.MeshStandardMaterial({ color: '#343530', metalness: 0.35, roughness: 0.44 }));
      cableSocket.position.set(0.35, 0.43, -1.38); workstation.add(cableSocket);

      const keyboardCenter = -0.25;
      const keyboardDepth = 1.65;
      const keyboardWidth = 4.7;
      const keyPitch = 0.183;
      const keyboardBase = new THREE.Mesh(roundedExtrusion(THREE, keyboardWidth, keyboardDepth, 0.14, 0.13, 0.035), new THREE.MeshStandardMaterial({ color: '#292a28', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.016, metalness: 0.24, roughness: 0.42 }));
      keyboardBase.rotation.x = Math.PI / 2; keyboardBase.position.set(keyboardCenter, 0.15, 1.13); keyboardBase.castShadow = true; keyboardBase.receiveShadow = true; workstation.add(keyboardBase);
      const keyGeometry = roundedExtrusion(THREE, keyPitch * 0.86, 0.15, 0.055, 0.025, 0.008);
      keyGeometry.rotateX(Math.PI / 2);
      const keyMaterial = new THREE.MeshPhysicalMaterial({ color: '#85867f', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.008, roughness: 0.38, metalness: 0.035, clearcoat: 0.11, clearcoatRoughness: 0.38 });
      const ledMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
      const keyRows = [
        [['esc'], ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'], ['print', 'scroll', 'pause']],
        [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', { label: 'backspace', width: 2 }], ['insert', 'home', 'pageup'], ['num', '/', '*', '-']],
        [[{ label: 'tab', width: 1.5 }, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', { label: '\\', width: 1.5 }], ['delete', 'end', 'pagedown'], ['7', '8', '9', { label: '+', width: 1.5 }]],
        [[{ label: 'caps', width: 1.75 }, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", { label: 'enter', width: 2.25 }], ['left', 'down', 'right'], ['4', '5', '6']],
        [[{ label: 'shift', width: 2.25 }, 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', { label: 'shift', width: 2.75 }], ['up'], ['1', '2', '3', { label: 'enter', width: 1.5 }]],
        [[{ label: 'ctrl', width: 1.25 }, { label: 'win', width: 1.25 }, { label: 'alt', width: 1.25 }, { label: 'space', width: 6.25 }, { label: 'alt', width: 1.25 }, { label: 'menu', width: 1.25 }, { label: 'ctrl', width: 1.25 }], ['left', 'down', 'right'], [{ label: '0', width: 2 }, '.']],
      ] as ({ label: string; width?: number } | string)[][][];
      const keyboardLabels: string[] = [];
      const keyboardPositions: { x: number; z: number; width: number; label: string; row: number }[] = [];
      const groupGap = 0.66;
      keyRows.forEach((groups, rowIndex) => {
        const normalizedGroups = groups.map(group => group.map(item => typeof item === 'string' ? { label: item, width: 1 } : { label: item.label, width: item.width ?? 1 }));
        const total = normalizedGroups.reduce((sum, group) => sum + group.reduce((groupSum, key) => groupSum + key.width, 0), 0) + Math.max(0, normalizedGroups.length - 1) * groupGap;
        let cursor = -total / 2;
        normalizedGroups.forEach((group, groupIndex) => {
          group.forEach(key => {
            const x = keyboardCenter + (cursor + key.width / 2) * keyPitch;
            const z = 0.515 + rowIndex * 0.205;
            keyboardPositions.push({ x, z, width: key.width, label: key.label, row: rowIndex });
            keyboardLabels.push(key.label);
            cursor += key.width;
          });
          if (groupIndex < normalizedGroups.length - 1) cursor += groupGap;
        });
      });
      const keys = new THREE.InstancedMesh(keyGeometry, keyMaterial, keyboardPositions.length);
      const leds = new THREE.InstancedMesh(new THREE.BoxGeometry(keyPitch * 0.78, 0.008, 0.135), ledMaterial, keyboardPositions.length);
      keyboardKeys = keys; ledKeys = leds; keyTransform = new THREE.Object3D();
      keyboardPositions.forEach((key, index) => {
        const position: [number, number, number] = [key.x, 0.211, key.z];
        keyboardSlots.push(position);
        keyTransform.position.set(...position); keyTransform.scale.set(key.width, 1, 1); keyTransform.updateMatrix(); keys.setMatrixAt(index, keyTransform.matrix);
        keyTransform.position.set(key.x, 0.177, key.z); keyTransform.scale.set(key.width, 1, 1); keyTransform.updateMatrix(); leds.setMatrixAt(index, keyTransform.matrix);
        const hue = (0.86 + (key.x + 2.5) * 0.115 + key.row * 0.018) % 1;
        const ledColor = new THREE.Color().setHSL(hue, 0.94, 0.56);
        const capColor = new THREE.Color().setHSL(hue, 0.82, 0.47);
        keyboardHues.push(hue);
        keys.setColorAt(index, capColor); leds.setColorAt(index, ledColor);
      });
      keys.instanceMatrix.needsUpdate = true; leds.instanceMatrix.needsUpdate = true;
      keys.castShadow = true; workstation.add(leds, keys);
      keyboardTypingOrder = Array.from('const projects = [rota, quarta, condrio]', character => {
        if (character === ' ') return keyboardLabels.findIndex(label => label === 'space');
        const exact = keyboardLabels.indexOf(character);
        return exact >= 0 ? exact : keyboardLabels.indexOf('a');
      });
      const keyboardLegendCanvas = document.createElement('canvas');
      keyboardLegendCanvas.width = 2048; keyboardLegendCanvas.height = 768;
      const legendContext = keyboardLegendCanvas.getContext('2d');
      if (legendContext) {
        legendContext.clearRect(0, 0, keyboardLegendCanvas.width, keyboardLegendCanvas.height);
        legendContext.textAlign = 'center'; legendContext.textBaseline = 'middle';
        keyboardPositions.forEach(key => {
          const label = key.label.length > 4 ? key.label.slice(0, 3) : key.label;
          if (!label || ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'].includes(label)) return;
          const px = ((key.x - (keyboardCenter - keyboardWidth / 2)) / keyboardWidth) * keyboardLegendCanvas.width;
          const py = ((key.z - (1.13 - keyboardDepth / 2)) / keyboardDepth) * keyboardLegendCanvas.height;
          legendContext.fillStyle = '#f2f0e6'; legendContext.font = label.length > 3 ? '15px Arial, sans-serif' : '20px Arial, sans-serif';
          legendContext.fillText(label, px, py);
        });
      }
      const keyboardLegendTexture = new THREE.CanvasTexture(keyboardLegendCanvas);
      keyboardLegendTexture.colorSpace = THREE.SRGBColorSpace;
      const keyboardLegends = new THREE.Mesh(new THREE.PlaneGeometry(keyboardWidth, keyboardDepth), new THREE.MeshBasicMaterial({ map: keyboardLegendTexture, transparent: true, opacity: 0.82, depthWrite: false, toneMapped: false }));
      keyboardLegends.rotation.x = -Math.PI / 2; keyboardLegends.position.set(keyboardCenter, 0.241, 1.13); workstation.add(keyboardLegends);
      const keyboardEdgeLight = new THREE.Mesh(new THREE.BoxGeometry(4.28, 0.014, 0.025), new THREE.MeshBasicMaterial({ color: '#b54cff', toneMapped: false }));
      keyboardEdgeLight.position.set(keyboardCenter, 0.093, 1.99); workstation.add(keyboardEdgeLight);
      const keyboardLight = new THREE.PointLight(0x8759ff, 0.9, 3.5);
      keyboardLight.position.set(keyboardCenter, 0.18, 1.2); workstation.add(keyboardLight);

      const paperTexture = makePaperTexture(THREE);
      const paperMaterial = new THREE.MeshStandardMaterial({ map: paperTexture, color: '#fffdf5', roughness: 0.96, side: THREE.DoubleSide });
      const paperGroup = new THREE.Group();
      paperGroup.position.set(-1.75, 0.015, 0.15);
      sheet = paperGroup;
      const paperBacking = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.035, 2.86), new THREE.MeshStandardMaterial({ color: '#c8c1b2', roughness: 0.91 }));
      paperBacking.castShadow = true; paperBacking.receiveShadow = true; paperGroup.add(paperBacking);
      const paperFace = new THREE.Mesh(new THREE.PlaneGeometry(2.12, 2.82), paperMaterial);
      paperFace.rotation.x = -Math.PI / 2; paperFace.position.y = 0.019; paperFace.castShadow = false; paperFace.receiveShadow = true; paperGroup.add(paperFace);
      const clip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.035, 0.12), new THREE.MeshStandardMaterial({ color: '#80877c', metalness: 0.7, roughness: 0.32 }));
      clip.position.set(-0.78, 0.042, -1.27); paperGroup.add(clip);
      workstation.add(paperGroup);

      const pencilMaterial = new THREE.MeshStandardMaterial({ color: '#bc7658', roughness: 0.48 });
      const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.45, 8), pencilMaterial);
      pencil.rotation.x = Math.PI / 2; pencil.rotation.z = -0.02; pencil.position.set(-3.6, 0.045, 1.3); pencil.castShadow = true; workstation.add(pencil);
      const pencilTip = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.11, 8), new THREE.MeshStandardMaterial({ color: '#292a26', roughness: 0.8 }));
      pencilTip.rotation.x = Math.PI / 2; pencilTip.position.set(-3.6, 0.045, 2.58); workstation.add(pencilTip);

      const lampMetal = new THREE.MeshStandardMaterial({ color: '#30332e', metalness: 0.72, roughness: 0.34 });
      const lampBrass = new THREE.MeshStandardMaterial({ color: '#a17b4d', metalness: 0.78, roughness: 0.32 });
      const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.43, 0.12, 32), lampMetal);
      lampBase.position.set(-4.05, 0.05, -1.3); lampBase.castShadow = true; workstation.add(lampBase);
      addRod(THREE, workstation, [-4.05, 0.12, -1.3], [-4.18, 1.22, -1.05], 0.055, lampMetal);
      addRod(THREE, workstation, [-4.18, 1.22, -1.05], [-3.28, 2.2, -0.65], 0.05, lampMetal);
      for (const [x, y, z] of [[-4.18, 1.22, -1.05], [-3.28, 2.2, -0.65]]) {
        const hinge = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 12), lampBrass);
        hinge.position.set(x, y, z); hinge.castShadow = true; workstation.add(hinge);
      }
      const shade = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.38, 0.38, 32, 1, true),
        new THREE.MeshStandardMaterial({ color: '#33342e', metalness: 0.63, roughness: 0.35, side: THREE.DoubleSide }),
      );
      shade.position.set(-3.18, 2.12, -0.56); shade.rotation.z = -0.22; shade.castShadow = true; workstation.add(shade);
      const diffuser = new THREE.Mesh(new THREE.CircleGeometry(0.31, 24), new THREE.MeshStandardMaterial({ color: '#f1d7a5', emissive: '#d9ad66', emissiveIntensity: 0.5, side: THREE.DoubleSide }));
      diffuser.rotation.x = Math.PI / 2; diffuser.position.set(-3.22, 1.91, -0.55); workstation.add(diffuser);
      const lampLight = new THREE.SpotLight(0xf1d2a1, 14, 10, Math.PI / 5.2, 0.72, 1.7);
      lampLight.position.set(-3.22, 2.02, -0.55);
      lampLight.target.position.set(-1.75, 0.01, 0.45);
      lampLight.castShadow = true; lampLight.shadow.mapSize.set(768, 768); lampLight.shadow.bias = -0.00025;
      workstation.add(lampLight, lampLight.target);

      const mousePad = new THREE.Mesh(new THREE.BoxGeometry(2.52, 0.045, 2.0), new THREE.MeshStandardMaterial({ color: '#55574f', map: fabricSurface.map, bumpMap: fabricSurface.bumpMap, bumpScale: 0.03, roughness: 0.96, metalness: 0.01 }));
      mousePad.position.set(3.28, 0.012, 1.2); mousePad.castShadow = true; mousePad.receiveShadow = true; workstation.add(mousePad);
      const padStitch = new THREE.MeshStandardMaterial({ color: '#74766b', roughness: 0.8, metalness: 0.02 });
      const padEdges = [
        new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.003, 0.006), padStitch),
        new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.003, 0.006), padStitch),
        new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.003, 1.9), padStitch),
        new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.003, 1.9), padStitch),
      ];
      padEdges.forEach((edge, index) => {
        edge.position.set(index < 2 ? 3.28 : index === 2 ? 2.02 : 4.54, 0.038, index === 0 ? 0.2 : index === 1 ? 2.2 : 1.2);
        workstation.add(edge);
      });
      mouseObject = new THREE.Group();
      const mouseProfile = [
        [0.015, -0.36], [0.09, -0.35], [0.16, -0.31], [0.21, -0.24],
        [0.235, -0.15], [0.235, 0.06], [0.21, 0.2], [0.16, 0.29],
        [0.09, 0.34], [0.015, 0.36],
      ].map(([radius, length]: number[]) => new THREE.Vector2(radius, length));
      const makeMouseHousing = (heightScale: number) => {
        const geometry = new THREE.LatheGeometry(mouseProfile, 48);
        geometry.rotateX(Math.PI / 2);
        geometry.scale(1, heightScale, 1);
        return geometry;
      };
      const mouseBaseMaterial = new THREE.MeshPhysicalMaterial({ color: '#252722', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.01, roughness: 0.52, metalness: 0.015 });
      const mouseTopMaterial = new THREE.MeshPhysicalMaterial({ color: '#4b4d46', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.008, roughness: 0.36, metalness: 0.02, clearcoat: 0.12, clearcoatRoughness: 0.4 });
      const mouseBase = new THREE.Mesh(makeMouseHousing(0.36), mouseBaseMaterial);
      mouseBase.position.y = 0.12; mouseBase.castShadow = true; mouseBase.receiveShadow = true; mouseObject.add(mouseBase);
      const mouseShell = new THREE.Mesh(makeMouseHousing(0.46), mouseTopMaterial);
      mouseShell.position.y = 0.14; mouseShell.castShadow = true; mouseObject.add(mouseShell);
      const mouseRgb = new THREE.Mesh(new THREE.TorusGeometry(1, 0.013, 8, 64), new THREE.MeshBasicMaterial({ color: '#79d7ce', toneMapped: false }));
      mouseRgb.rotation.x = Math.PI / 2; mouseRgb.scale.set(0.23, 0.34, 0.23); mouseRgb.position.set(0, 0.075, 0); mouseObject.add(mouseRgb);
      const mouseSensorGlow = new THREE.PointLight(0x72d8d0, 0.35, 0.75);
      mouseSensorGlow.position.set(0, 0.055, 0.28); mouseObject.add(mouseSensorGlow);
      const buttonMaterial = new THREE.MeshPhysicalMaterial({ color: '#55574f', map: plasticSurface.map, bumpMap: plasticSurface.bumpMap, bumpScale: 0.006, roughness: 0.34, metalness: 0.02, clearcoat: 0.14, clearcoatRoughness: 0.35 });
      const buttonGeometry = new THREE.SphereGeometry(1, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2);
      const leftButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
      leftButton.scale.set(0.112, 0.034, 0.235); leftButton.position.set(-0.12, 0.229, -0.105); leftButton.castShadow = true; mouseObject.add(leftButton);
      const rightButton = leftButton.clone(); rightButton.position.x = 0.12; mouseObject.add(rightButton);
      const wheelSlot = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.009, 0.18), new THREE.MeshStandardMaterial({ color: '#20211d', roughness: 0.62 }));
      wheelSlot.position.set(0, 0.228, -0.06); mouseObject.add(wheelSlot);
      const wheelMaterial = new THREE.MeshStandardMaterial({ color: '#232521', roughness: 0.66, metalness: 0.04 });
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.095, 24), wheelMaterial);
      wheel.rotation.z = Math.PI / 2; wheel.position.set(0, 0.245, -0.06); mouseObject.add(wheel);
      for (const x of [-0.022, 0, 0.022]) {
        const wheelRidge = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.003, 6, 20), new THREE.MeshStandardMaterial({ color: '#6c6c63', roughness: 0.73 }));
        wheelRidge.rotation.y = Math.PI / 2; wheelRidge.position.set(x, 0.245, -0.06); mouseObject.add(wheelRidge);
      }
      const seamMaterial = new THREE.MeshStandardMaterial({ color: '#272a25', roughness: 0.62 });
      const centerSeamCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.197, -0.325), new THREE.Vector3(0, 0.239, -0.23),
        new THREE.Vector3(0, 0.252, -0.1), new THREE.Vector3(0, 0.252, 0.04),
        new THREE.Vector3(0, 0.242, 0.19), new THREE.Vector3(0, 0.205, 0.3),
      ]);
      mouseObject.add(new THREE.Mesh(new THREE.TubeGeometry(centerSeamCurve, 32, 0.003, 6, false), seamMaterial));
      const sideButtonMaterial = new THREE.MeshPhysicalMaterial({ color: '#373933', map: plasticSurface.map, roughness: 0.45, metalness: 0.015 });
      for (const z of [0.04, 0.14]) {
        const sideButton = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), sideButtonMaterial);
        sideButton.scale.set(0.018, 0.027, 0.032); sideButton.position.set(-0.247, 0.157, z); mouseObject.add(sideButton);
      }
      const sensorWindow = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 8), new THREE.MeshBasicMaterial({ color: '#68ddd3', toneMapped: false }));
      sensorWindow.scale.set(1, 0.25, 1); sensorWindow.position.set(0, 0.04, 0.28); mouseObject.add(sensorWindow);
      mouseObject.position.set(3.28, 0, 1.2); workstation.add(mouseObject);
    }

    function render() {
      frame = 0;
      if (!visible || disposed || !renderer || !camera || !workstation) return;
      const p = progressRef.current;
      const cameraProgress = reduceMotionQuery.matches ? 0 : p;
      const visualPointer = reduceMotionQuery.matches
        ? { x: 0.5, y: 0.58 }
        : Date.now() - pointerMovedAtRef.current < 850 ? pointerRef.current : buildCursor(p);
      const mobile = sceneHost.clientWidth < 760;
      const aspect = Math.max(0.45, sceneHost.clientWidth / Math.max(1, sceneHost.clientHeight));
      const desktopStops = [
        { p: 0, x: 3.0, y: 5.15, z: 7.75, tx: 0.35, ty: 2.25, tz: -0.05 },
        { p: 0.48, x: -0.65, y: 4.9, z: 8.8, tx: 0.1, ty: 1.35, tz: -0.55 },
        { p: 1, x: 0.15, y: 3.2, z: 5.55, tx: 0.35, ty: 1.62, tz: -0.91 },
      ];
      const mobileStops = [
        { p: 0, x: 0.35, y: 4.5, z: 12, tx: 0.35, ty: 1.45, tz: -0.5 },
        { p: 0.48, x: 0.35, y: 3.7, z: 11.2, tx: 0.35, ty: 1.6, tz: -0.75 },
        { p: 1, x: 0.35, y: 3.0, z: 10, tx: 0.35, ty: 1.8, tz: -1.0 },
      ];
      const stops = mobile ? mobileStops : desktopStops;
      let index = stops.findIndex(stop => stop.p >= cameraProgress);
      if (index <= 0) index = 1;
      if (index < 0) index = stops.length - 1;
      const a = stops[index - 1]; const b = stops[index];
      const t = smooth((cameraProgress - a.p) / Math.max(0.001, b.p - a.p));
      camera.position.set(mix(a.x, b.x, t), mix(a.y, b.y, t), mix(a.z, b.z, t));
      camera.fov = mobile ? 48 + Math.max(0, 0.9 - aspect) * 6 : 34;
      camera.updateProjectionMatrix();
      camera.lookAt(mix(a.tx, b.tx, t), mix(a.ty, b.ty, t), mix(a.tz, b.tz, t));
      workstation.rotation.y = mix(-0.035, 0.012, smooth(cameraProgress));
      workstation.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      if (interactiveScreen && screenPlaneRef.current) {
        const planeCorners = [
          new THREE.Vector3(-2.14, 1.3375, 0.002),
          new THREE.Vector3(2.14, 1.3375, 0.002),
          new THREE.Vector3(2.14, -1.3375, 0.002),
          new THREE.Vector3(-2.14, -1.3375, 0.002),
        ];
        const projected = planeCorners.map(point => {
          const screenPoint = interactiveScreen.localToWorld(point).project(camera);
          return [(screenPoint.x + 1) * sceneHost.clientWidth / 2, (1 - screenPoint.y) * sceneHost.clientHeight / 2] as [number, number];
        });
        screenPlaneRef.current.style.transform = screenTransform(projected, 1280, 800);
        screenPlaneRef.current.style.visibility = 'visible';
      }
      if (sheet) {
        const move = smooth((cameraProgress - 0.36) / 0.38);
        sheet.position.x = mix(-1.75, -2.9, move);
        sheet.rotation.z = mix(0.02, -0.055, move);
      }
      if (mouseObject) {
        mouseObject.position.x = 3.28 + (visualPointer.x - 0.5) * 0.85;
        mouseObject.position.z = 1.2 + (visualPointer.y - 0.5) * 0.7;
        mouseObject.rotation.y = (visualPointer.x - 0.5) * 0.32;
      }
      if (keyboardKeys && keyTransform) {
        const typing = clamp01((p - 0.035) / 0.265);
        const step = typing * keyboardTypingOrder.length;
        const sequenceIndex = Math.min(keyboardTypingOrder.length - 1, Math.floor(step));
        const nextKey = p > 0.035 && p < 0.3 ? keyboardTypingOrder[sequenceIndex] : -1;
        if (nextKey !== activeKey) {
          if (activeKey >= 0) {
            keyTransform.position.set(...keyboardSlots[activeKey]);
            keyTransform.updateMatrix(); keyboardKeys.setMatrixAt(activeKey, keyTransform.matrix);
          }
          activeKey = nextKey;
        }
        if (nextKey >= 0) {
          const [x, y, z] = keyboardSlots[nextKey];
          const stroke = Math.sin(Math.PI * clamp01(step - sequenceIndex));
          keyTransform.position.set(x, y - 0.012 * stroke, z);
          keyTransform.updateMatrix(); keyboardKeys.setMatrixAt(nextKey, keyTransform.matrix);
        }
        keyboardKeys.instanceMatrix.needsUpdate = true;
      }
      if (ledKeys && keyboardHues.length) {
        keyboardHues.forEach((hue, index) => ledKeys.setColorAt(index, new THREE.Color().setHSL((hue + p * 0.14) % 1, 0.96, 0.56)));
        if (ledKeys.instanceColor) ledKeys.instanceColor.needsUpdate = true;
      }
      if (screenContext && screenTexture) {
        drawScreen(screenContext, p); screenTexture.needsUpdate = true;
      }
      renderer.render(scene, camera);
    }

    async function initialize() {
      try {
        const three = await import('./three-runtime');
        await document.fonts.ready;
        if (disposed) return;
        THREE = three;
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
        // Keep the full-resolution render below the page's scroll work on desktop GPUs.
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        buildScene();
        const bounds = sceneHost.getBoundingClientRect();
        camera.aspect = Math.max(0.45, bounds.width / Math.max(1, bounds.height));
        camera.updateProjectionMatrix();
        renderer.setSize(bounds.width, bounds.height, false);
        sceneHost.classList.remove('scene-failed');
        if (fallbackRef.current) fallbackRef.current.hidden = true;
        schedule();
      } catch {
        sceneHost.classList.add('scene-failed');
        const bounds = sceneHost.getBoundingClientRect();
        const fallbackScale = Math.min((bounds.width * (window.innerWidth < 760 ? 0.64 : 0.56)) / 1280, (bounds.height * (window.innerWidth < 760 ? 0.63 : 0.71)) / 800);
        screenPlaneRef.current?.style.setProperty('--fallback-screen-scale', String(fallbackScale));
        if (screenPlaneRef.current) screenPlaneRef.current.style.visibility = 'visible';
        if (fallbackRef.current) fallbackRef.current.hidden = false;
      }
    }

    scheduleRef.current = schedule;
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect(); intersection.disconnect();
      scheduleRef.current = () => undefined;
      if (scene) scene.traverse((object: any) => {
        object.geometry?.dispose?.();
        const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
        materials.forEach((material: any) => { material.map?.dispose?.(); material.dispose?.(); });
      });
      renderer?.dispose?.();
    };
  }, []);

  return <div className="software-scene">
    <canvas className="software-scene-canvas" ref={canvasRef} aria-hidden="true"/>
    <div className="monitor-screen-plane" ref={screenPlaneRef}>
      <WorkstationScreen stage={stage} typingStep={typingStep} soundEnabled={soundEnabled} onSoundToggle={onSoundToggle}/>
    </div>
    <div className="software-scene-fallback" ref={fallbackRef}>
      <div className="fallback-desk"><div className="fallback-paper" aria-hidden="true"><i/><i/><i/><i/><i/></div><div className="fallback-monitor"><div className="fallback-screen"/><div className="fallback-stand"/></div></div>
    </div>
  </div>;
});

export default SoftwareScene;

