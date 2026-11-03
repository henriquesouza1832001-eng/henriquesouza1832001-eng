let context: AudioContext | null = null;
let enabled = false;

export async function setSoundEnabled(next: boolean): Promise<boolean> {
  enabled = next;
  if (!next) return false;
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) { enabled = false; return false; }
  context ??= new AudioContextClass();
  if (context.state === 'suspended') await context.resume();
  playClick();
  return true;
}

function currentContext() {
  if (!enabled || !context || context.state !== 'running') return null;
  return context;
}

export function playKey() {
  const audio = currentContext();
  if (!audio) return;
  const length = Math.max(1, Math.floor(audio.sampleRate * 0.018));
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = 'highpass';
  filter.frequency.value = 1150;
  gain.gain.setValueAtTime(0.018, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.022);
  source.connect(filter).connect(gain).connect(audio.destination);
  source.start();
  source.stop(audio.currentTime + 0.024);
}

export function playClick() {
  const audio = currentContext();
  if (!audio) return;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(520, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(245, audio.currentTime + 0.032);
  gain.gain.setValueAtTime(0.026, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.04);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.042);
}

export function playScrollStep() {
  const audio = currentContext();
  if (!audio) return;
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(190, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(126, audio.currentTime + 0.095);
  gain.gain.setValueAtTime(0.034, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.12);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.125);
}
