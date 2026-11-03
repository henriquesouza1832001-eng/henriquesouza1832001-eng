import { useEffect, useRef, useState } from 'react';

export type ProcessStepKey = 'idea' | 'code' | 'refine' | 'validate' | 'test' | 'preview' | 'ready';

const steps: ProcessStepKey[] = ['idea', 'code', 'refine', 'validate', 'test', 'preview', 'ready'];
const colors = [0x171717, 0x282019, 0x1b272d, 0x2a211b, 0x27232e, 0x1d292e, 0x282016];
const notes: Record<ProcessStepKey, string> = {
  idea: 'A primeira tela ainda não é a solução. Primeiro anoto quem usa, o contexto e onde o processo quebra.',
  code: 'A estrutura começa a ganhar forma: entrada, estado, resposta e os serviços que sustentam a interface.',
  refine: 'Refinar é remover caminhos ambíguos. A regra fica explícita antes de aparecer como um botão.',
  validate: 'Confiro permissões, casos de borda, limites e o que a documentação realmente permite afirmar.',
  test: 'O fluxo passa por uma demonstração local. A ação mostra a consequência sem escrever nos sistemas reais.',
  preview: 'A prévia junta tipografia, tela, resposta e contexto. É aqui que a experiência precisa fazer sentido inteira.',
  ready: 'O resultado é um produto navegável, com estado, limites e próximo passo documentados.',
};

function block(THREE: any, group: any, size: [number, number, number], position: [number, number, number], color: number, note: string, opacity = 1) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.74, metalness: 0.06, transparent: opacity < 1, opacity });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.userData.note = note;
  group.add(mesh);
  return mesh;
}

function rod(THREE: any, group: any, start: [number, number, number], end: [number, number, number], color: number, note: string, radius = 0.025) {
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, radius, 6, false), new THREE.MeshStandardMaterial({ color, roughness: 0.58 }));
  mesh.userData.note = note;
  group.add(mesh);
}

function label(THREE: any, group: any, text: string, position: [number, number, number], accent: string, width = 2.1) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 112;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.fillStyle = '#171717';
  context.fillRect(0, 0, 512, 112);
  context.fillStyle = accent;
  context.fillRect(0, 0, 9, 112);
  context.fillStyle = '#eee5d5';
  context.font = '600 36px monospace';
  context.textBaseline = 'middle';
  context.fillText(text.toUpperCase(), 28, 57, 465);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width * 0.22), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, toneMapped: false }));
  mesh.position.set(...position);
  mesh.userData.note = text;
  group.add(mesh);
}

function buildArtifact(THREE: any, key: ProcessStepKey, group: any, accent: number, accentHex: string) {
  const note = notes[key];
  block(THREE, group, [5.3, 0.08, 4.1], [0, -0.08, 0], 0x232323, note);

  if (key === 'idea') {
    block(THREE, group, [3.5, 0.08, 2.55], [-0.24, 0.25, 0], 0xd6c9b3, note);
    for (let row = 0; row < 4; row += 1) block(THREE, group, [row === 1 ? 1.8 : 2.35 - row * 0.16, 0.025, 0.035], [-0.2, 0.31, -0.72 + row * 0.38], accent, note);
    const seed = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 12), new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.12 }));
    seed.position.set(1.05, 0.45, 0.72);
    seed.userData.note = 'Ideia: reduzir um problema observável a uma pergunta que dá para responder.';
    group.add(seed);
    label(THREE, group, '01 / IDEIA', [-0.2, 1.38, 1.33], accentHex);
  }

  if (key === 'code') {
    block(THREE, group, [3.8, 2.65, 0.18], [0, 1.3, 0], 0x282b2d, note);
    block(THREE, group, [3.5, 2.32, 0.06], [0, 1.3, 0.13], 0x171a1c, note);
    for (let row = 0; row < 7; row += 1) {
      const width = [1.45, 2.3, 1.75, 2.7, 1.2, 2.0, 1.55][row];
      block(THREE, group, [width, 0.045, 0.035], [-0.34 + (row % 3) * 0.16, 2.08 - row * 0.28, 0.19], row === 1 || row === 5 ? 0xd17859 : row % 2 ? accent : 0x97a8ad, note);
    }
    block(THREE, group, [0.12, 0.09, 0.05], [1.1, 0.4, 0.22], accent, note);
    label(THREE, group, '02 / CÓDIGO', [0, 3.02, 0.15], accentHex);
  }

  if (key === 'refine') {
    block(THREE, group, [2.65, 2.2, 0.16], [-0.95, 1.16, -0.08], 0x3c3832, 'Rascunho: a primeira versão mostra as opções ainda sem hierarquia.');
    block(THREE, group, [2.65, 2.2, 0.18], [0.68, 1.34, 0.36], 0x2d3031, 'Refino: priorizar o caminho principal e deixar os estados secundários legíveis.');
    for (let row = 0; row < 4; row += 1) block(THREE, group, [row === 0 ? 1.62 : 1.95, 0.045, 0.035], [0.72, 2.05 - row * 0.31, 0.48], row === 0 ? accent : 0xaaa69b, note);
    rod(THREE, group, [-0.05, 1.05, 0.06], [0.05, 1.05, 0.24], accent, note, 0.06);
    label(THREE, group, '03 / REFINO', [0, 3.02, 0.15], accentHex);
  }

  if (key === 'validate') {
    block(THREE, group, [3.6, 2.8, 0.15], [0, 1.3, 0], 0x282b2d, note);
    for (let row = 0; row < 4; row += 1) {
      const y = 2.08 - row * 0.56;
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), new THREE.MeshStandardMaterial({ color: row === 3 ? 0xd17859 : accent, emissive: row === 3 ? 0xd17859 : accent, emissiveIntensity: 0.1 }));
      dot.position.set(-1.23, y, 0.14);
      dot.userData.note = row === 3 ? 'Limite reconhecido: esta regra precisa de validação adicional antes de uma ação real.' : 'Verificação: estado, permissão e resultado precisam ter um caminho explícito.';
      group.add(dot);
      block(THREE, group, [1.95 - row * 0.15, 0.045, 0.035], [0.08, y, 0.16], row === 3 ? 0xd17859 : 0xc5bba9, note);
    }
    label(THREE, group, '04 / VALIDAÇÃO', [0, 3.02, 0.15], accentHex);
  }

  if (key === 'test') {
    block(THREE, group, [3.6, 2.7, 0.16], [0, 1.28, 0], 0x242728, note);
    for (let row = 0; row < 3; row += 1) {
      const x = -1.05 + row * 1.05;
      block(THREE, group, [0.8, 0.76, 0.12], [x, 1.35, 0.14], row === 1 ? 0x34302b : 0x202426, note);
      const mark = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 8, 24), new THREE.MeshStandardMaterial({ color: row === 2 ? 0xd17859 : accent, roughness: 0.5 }));
      mark.position.set(x, 1.35, 0.24);
      mark.userData.note = row === 2 ? 'Caso de borda: o sistema precisa saber dizer não.' : 'Teste local: uma ação deve produzir uma consequência fácil de ler.';
      group.add(mark);
    }
    label(THREE, group, '05 / TESTE', [0, 3.02, 0.15], accentHex);
  }

  if (key === 'preview') {
    block(THREE, group, [3.9, 2.9, 0.17], [0, 1.35, 0], 0xd8cebd, note);
    block(THREE, group, [3.52, 2.48, 0.07], [0, 1.35, 0.13], 0x252728, note);
    block(THREE, group, [3.52, 0.24, 0.05], [0, 2.47, 0.19], 0x3a3c3d, note);
    for (let row = 0; row < 3; row += 1) block(THREE, group, [row === 0 ? 1.18 : 2.4 - row * 0.32, 0.075, 0.045], [-0.36, 1.95 - row * 0.24, 0.2], row === 0 ? accent : 0xbdb4a4, note);
    block(THREE, group, [1.1, 0.34, 0.07], [0.9, 0.75, 0.2], accent, 'Prévia: interface, conteúdo e estados precisam funcionar como uma peça única.');
    label(THREE, group, '06 / PRÉVIA', [0, 3.18, 0.15], accentHex);
  }

  if (key === 'ready') {
    block(THREE, group, [2.25, 3.55, 0.26], [0, 1.62, 0], 0xd9d0bf, note);
    block(THREE, group, [1.99, 3.27, 0.08], [0, 1.62, 0.19], 0x202426, note);
    block(THREE, group, [1.99, 0.4, 0.07], [0, 2.88, 0.24], 0x34383a, note);
    block(THREE, group, [1.34, 0.08, 0.05], [-0.12, 2.32, 0.26], accent, 'Aplicação pronta: o fluxo principal está visível e o próximo passo tem destino.');
    for (let row = 0; row < 4; row += 1) block(THREE, group, [1.45 - row * 0.12, 0.055, 0.04], [-0.05, 1.95 - row * 0.36, 0.26], row === 3 ? 0xd17859 : 0xa9aaa5, note);
    const seal = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.055, 10, 40), new THREE.MeshStandardMaterial({ color: accent, roughness: 0.42, metalness: 0.14 }));
    seal.position.set(1.45, 0.68, 0.32);
    seal.userData.note = 'Pronto para conhecer: abra os projetos reais ao final do percurso.';
    group.add(seal);
    label(THREE, group, '07 / PRONTO', [0, 3.72, 0.12], accentHex);
  }
}

function buildJourney(THREE: any, root: any) {
  const spacing = 6.5;
  const accents = [0xd4a75b, 0xd17859, 0x91a8b1, 0xd4a75b, 0xb4a2c6, 0x91a8b1, 0xd4a75b];
  const accentHex = ['#d4a75b', '#d17859', '#91a8b1', '#d4a75b', '#b4a2c6', '#91a8b1', '#d4a75b'];
  steps.forEach((key, index) => {
    const station = new THREE.Group();
    station.position.z = -index * spacing;
    station.userData.step = key;
    root.add(station);
    buildArtifact(THREE, key, station, accents[index], accentHex[index]);
    const stop = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 18), new THREE.MeshStandardMaterial({ color: accents[index], roughness: 0.5 }));
    stop.position.set(-3.1, 0.13, -index * spacing);
    stop.userData.note = notes[key];
    root.add(stop);
  });

  const pathPoints = steps.map((_, index) => new THREE.Vector3(index % 2 ? 1.2 : -1.1, 0.22, -index * spacing));
  const path = new THREE.CatmullRomCurve3(pathPoints);
  const rail = new THREE.Mesh(new THREE.TubeGeometry(path, 160, 0.045, 8, false), new THREE.MeshStandardMaterial({ color: 0xd4a75b, roughness: 0.55, metalness: 0.08 }));
  rail.userData.note = 'A linha atravessa ideia, código, refinamento, validação, teste, prévia e produto.';
  root.add(rail);
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 14), new THREE.MeshStandardMaterial({ color: 0xf0e6d6, emissive: 0xd17859, emissiveIntensity: 0.36, roughness: 0.3 }));
  marker.position.copy(path.getPointAt(0));
  marker.userData.note = 'Este ponto acompanha a etapa atual da construção.';
  root.add(marker);
  root.userData.path = path;
  root.userData.marker = marker;
  return spacing;
}

export default function ProcessWorld({ activeStep }: { activeStep: ProcessStepKey }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderState, setRenderState] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [detail, setDetail] = useState(notes[activeStep]);

  useEffect(() => setDetail(notes[activeStep]), [activeStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const hostElement = host;
    let disposed = false;
    let visible = false;
    let initialized = false;
    let frame = 0;
    let THREE: any;
    let renderer: any;
    let scene: any;
    let camera: any;
    let world: any;
    let spacing = 6.5;
    let pointerStart: [number, number] | null = null;
    let pointerPrevious: [number, number] | null = null;
    let dragged = false;
    let backgroundColors: any[] = [];
    let interpolatedBackground: any;
    let ground: any;
    const raycaster = { current: null as any };

    const resize = new ResizeObserver(() => {
      if (!renderer || !camera) return;
      const bounds = hostElement.getBoundingClientRect();
      camera.aspect = Math.max(0.5, bounds.width / Math.max(1, bounds.height));
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height, false);
      schedule();
    });
    resize.observe(hostElement);

    const visibility = new IntersectionObserver(entries => {
      visible = Boolean(entries[0]?.isIntersecting);
      if (visible && !initialized) { initialized = true; init(); }
      else if (visible) schedule();
    }, { rootMargin: '24% 0px' });
    visibility.observe(hostElement);

    function schedule() {
      if (!visible || disposed || frame) return;
      frame = requestAnimationFrame(render);
    }

    function pointerDown(event: PointerEvent) {
      pointerStart = [event.clientX, event.clientY];
      pointerPrevious = pointerStart;
      dragged = false;
      canvas?.setPointerCapture?.(event.pointerId);
    }

    function pointerMove(event: PointerEvent) {
      if (!pointerPrevious || !world || event.buttons !== 1) return;
      const dx = event.clientX - pointerPrevious[0];
      const dy = event.clientY - pointerPrevious[1];
      if (pointerStart && Math.hypot(event.clientX - pointerStart[0], event.clientY - pointerStart[1]) > 7) dragged = true;
      world.rotation.y += dx * 0.006;
      world.rotation.x = Math.max(-0.25, Math.min(0.25, world.rotation.x + dy * 0.003));
      pointerPrevious = [event.clientX, event.clientY];
      schedule();
    }

    function pointerUp(event: PointerEvent) {
      if (!pointerPrevious || !canvas || !camera || !raycaster.current || !world) { pointerStart = null; pointerPrevious = null; return; }
      pointerPrevious = null;
      pointerStart = null;
      if (dragged) return;
      const bounds = canvas.getBoundingClientRect();
      const point = new THREE.Vector2(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -(((event.clientY - bounds.top) / bounds.height) * 2 - 1));
      raycaster.current.setFromCamera(point, camera);
      const hit = raycaster.current.intersectObjects(world.children, true).find((item: any) => item.object.userData.note);
      if (hit?.object.userData.note) setDetail(hit.object.userData.note);
    }

    function scroll() { schedule(); }
    function cancelPointer() { pointerStart = null; pointerPrevious = null; }
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', cancelPointer);
    window.addEventListener('scroll', scroll, { passive: true });

    async function init() {
      try {
        const three = await import('./three-runtime');
        if (disposed || !canvas) return;
        THREE = three;
        renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 821 ? 1 : 1.35));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        scene = new THREE.Scene();
        interpolatedBackground = new THREE.Color(0x171717);
        backgroundColors = colors.map(value => new THREE.Color(value));
        scene.background = interpolatedBackground;
        camera = new THREE.PerspectiveCamera(38, 1, 0.1, 90);
        camera.position.set(6.4, 6.4, 8.5);
        camera.lookAt(0, 1, 0);
        scene.add(new THREE.HemisphereLight(0xf0e6d6, 0x252525, 1.8));
        const keyLight = new THREE.DirectionalLight(0xf0e6d6, 2.3);
        keyLight.position.set(-4, 8, 5);
        scene.add(keyLight);
        const warmLight = new THREE.DirectionalLight(0xd17859, 0.65);
        warmLight.position.set(5, 5, -8);
        scene.add(warmLight);
        ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1 }));
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.18;
        scene.add(ground);
        world = new THREE.Group();
        scene.add(world);
        spacing = buildJourney(THREE, world);
        raycaster.current = new THREE.Raycaster();
        const bounds = hostElement.getBoundingClientRect();
        camera.aspect = Math.max(0.5, bounds.width / Math.max(1, bounds.height));
        camera.updateProjectionMatrix();
        renderer.setSize(bounds.width, bounds.height, false);
        setRenderState('ready');
        schedule();
      } catch {
        if (!disposed) setRenderState('fallback');
      }
    }

    function release(group: any) {
      for (const child of [...group.children]) {
        if (child.children?.length) release(child);
        group.remove(child);
        child.geometry?.dispose?.();
        const materials = Array.isArray(child.material) ? child.material : child.material ? [child.material] : [];
        materials.forEach((material: any) => { material.map?.dispose?.(); material.dispose?.(); });
      }
    }

    function render() {
      frame = 0;
      if (disposed || !renderer || !visible) return;
      const progress = Math.max(0, Math.min(1, Number(hostElement.closest('.journey-layout')?.getAttribute('data-journey-progress') ?? 0)));
      const scaled = progress * (steps.length - 1);
      const stepIndex = Math.min(steps.length - 2, Math.floor(scaled));
      const mix = Math.max(0, Math.min(1, scaled - stepIndex));
      const travel = -spacing * scaled;
      camera.position.set(6.4, 6.4, travel + 8.5);
      camera.lookAt(0, 1, travel);
      camera.fov = 38 - Math.sin(mix * Math.PI) * 4;
      camera.updateProjectionMatrix();
      interpolatedBackground.lerpColors(backgroundColors[stepIndex], backgroundColors[stepIndex + 1], mix);
      scene.background.copy(interpolatedBackground);
      ground.material.color.copy(interpolatedBackground).multiplyScalar(0.74);
      const point = world.userData.path.getPointAt(progress);
      world.userData.marker.position.copy(point);
      hostElement.style.setProperty('--world-progress', `${progress * 100}%`);
      hostElement.dataset.activeStage = String(stepIndex + 1).padStart(2, '0');
      renderer.render(scene, camera);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', cancelPointer);
      window.removeEventListener('scroll', scroll);
      if (world) release(world);
      renderer?.dispose?.();
    };
  }, []);

  return <div className="journey-world" data-render-state={renderState}>
    <canvas ref={canvasRef} aria-hidden="true" />
    <div className="world-timeline" aria-hidden="true"><i/><span>O SCROLL MONTA</span><b>ARRASTE PARA GIRAR</b></div>
    <div className="world-caption" aria-live="polite"><span>{activeStep.toUpperCase()} / 07</span><p>{detail}</p></div>
    {renderState === 'loading' && <span className="world-loading">ABRINDO A MESA…</span>}
  </div>;
}
