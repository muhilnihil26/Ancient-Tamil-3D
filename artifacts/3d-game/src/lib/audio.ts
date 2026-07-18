// ── Utility helpers ─────────────────────────────────────────────────────────
function note(ctx: AudioContext, freq: number, start: number, dur: number, vol = 0.08) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(vol, start + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(start); osc.stop(start + dur + 0.1);
}

function noiseBuffer(ctx: AudioContext, dur = 2): AudioBuffer {
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

// ── Sword swoosh on intro ────────────────────────────────────────────────────
export function playSwordSwoosh(ctx: AudioContext) {
  if (!ctx || ctx.state === 'suspended') return;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(6000, ctx.currentTime + 0.15);
  filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.5);
  filter.Q.setValueAtTime(2, ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.6);
  src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  src.start(); src.stop(ctx.currentTime + 0.6);
  // Bell accent
  note(ctx, 523, ctx.currentTime + 0.05, 1.2, 0.04);
  note(ctx, 659, ctx.currentTime + 0.1, 1.0, 0.03);
}

// ── Per-page ambient music objects ───────────────────────────────────────────
// Each returns a { stop() } handle. Designed to be crossfaded.

export interface AmbientHandle { stop: (fadeTime?: number) => void }

function createDrone(ctx: AudioContext, freqs: number[], vol = 0.04): AmbientHandle {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 3);
  master.connect(ctx.destination);

  const oscs = freqs.map(f => {
    const o = ctx.createOscillator();
    o.type = 'sine'; o.frequency.value = f;
    // Slight vibrato
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.15;
    const lfoG = ctx.createGain(); lfoG.gain.value = f * 0.003;
    lfo.connect(lfoG); lfoG.connect(o.frequency);
    lfo.start(); o.connect(master); o.start();
    return { o, lfo };
  });
  return {
    stop: (fadeTime = 2) => {
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
      oscs.forEach(({ o, lfo }) => {
        o.stop(ctx.currentTime + fadeTime + 0.1);
        lfo.stop(ctx.currentTime + fadeTime + 0.1);
      });
    }
  };
}

function createRhythm(ctx: AudioContext, bpm: number, vol = 0.06): AmbientHandle {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 2);
  master.connect(ctx.destination);

  const beat = 60 / bpm;
  let t = ctx.currentTime + beat;
  const ids: ReturnType<typeof setTimeout>[] = [];
  let stopped = false;

  function schedule() {
    if (stopped) return;
    // Kick drum
    const kick = ctx.createOscillator();
    const kickG = ctx.createGain();
    kick.type = 'sine'; kick.frequency.setValueAtTime(120, t); kick.frequency.exponentialRampToValueAtTime(40, t + 0.1);
    kickG.gain.setValueAtTime(0.4, t); kickG.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    kick.connect(kickG); kickG.connect(master); kick.start(t); kick.stop(t + 0.3);
    // Snare noise on beat 3
    const sn = ctx.createBufferSource();
    sn.buffer = noiseBuffer(ctx, 0.12);
    const snF = ctx.createBiquadFilter(); snF.type = 'bandpass'; snF.frequency.value = 3000; snF.Q.value = 1;
    const snG = ctx.createGain(); snG.gain.setValueAtTime(0.15, t + beat * 2); snG.gain.exponentialRampToValueAtTime(0.001, t + beat * 2 + 0.12);
    sn.connect(snF); snF.connect(snG); snG.connect(master); sn.start(t + beat * 2); sn.stop(t + beat * 2 + 0.15);

    t += beat * 4;
    const id = setTimeout(schedule, (beat * 4 - 0.1) * 1000);
    ids.push(id);
  }
  schedule();

  return {
    stop: (fadeTime = 2) => {
      stopped = true;
      ids.forEach(clearTimeout);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
    }
  };
}

function createPluckedMelody(ctx: AudioContext, scale: number[], tempo = 1.8, vol = 0.05): AmbientHandle {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 2);
  master.connect(ctx.destination);

  let t = ctx.currentTime + 0.5;
  let idx = 0;
  const ids: ReturnType<typeof setTimeout>[] = [];
  let stopped = false;

  function pluck() {
    if (stopped) return;
    const freq = scale[idx % scale.length];
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle'; osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    osc.connect(g); g.connect(master); osc.start(t); osc.stop(t + 0.9);
    idx++; t += tempo * (0.8 + Math.random() * 0.4);
    const id = setTimeout(pluck, Math.max((t - ctx.currentTime - 0.1) * 1000, 100));
    ids.push(id);
  }
  pluck();

  return {
    stop: (fadeTime = 2) => {
      stopped = true;
      ids.forEach(clearTimeout);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
    }
  };
}

// ── Page theme factory ───────────────────────────────────────────────────────
// D-minor pentatonic (D3-D5): 147, 175, 196, 220, 262, 294, 350, 392, 440, 523, 587
const D_MINOR = [147, 175, 196, 220, 262, 294, 350, 392];
const A_MINOR = [220, 261.6, 293.7, 329.6, 392, 440];
const G_MAJOR = [196, 246.9, 293.7, 369.9, 440, 587.3];
const E_MINOR = [164.8, 220, 246.9, 293.7, 329.6, 392];

export function createPageAmbient(ctx: AudioContext, page: string): AmbientHandle {
  switch (page) {
    case '/':          // Home — epic low drone + bell melody
      return createCombined(ctx, [
        createDrone(ctx, [55, 82.4, 110], 0.03),
        createPluckedMelody(ctx, D_MINOR, 2.2, 0.04),
      ]);
    case '/story':     // Story — melancholic soft pad
      return createDrone(ctx, [110, 138.6, 164.8, 220], 0.035);
    case '/kingdoms':  // Kingdoms — regal brass drone
      return createCombined(ctx, [
        createDrone(ctx, [65.4, 82.4, 130.8, 196], 0.04),
        createPluckedMelody(ctx, G_MAJOR, 3, 0.03),
      ]);
    case '/characters':
      return createPluckedMelody(ctx, A_MINOR, 2.5, 0.05);
    case '/weapons':   // Weapons — metallic resonance
      return createDrone(ctx, [220, 277.2, 330, 440], 0.025);
    case '/gameplay':  // Gameplay — battle rhythm
      return createCombined(ctx, [
        createRhythm(ctx, 80, 0.04),
        createDrone(ctx, [55, 110], 0.02),
      ]);
    case '/gallery':   // Gallery — peaceful ambient
      return createPluckedMelody(ctx, [261.6, 329.6, 392, 523.3, 659.3], 3.5, 0.04);
    case '/trailer':   // Trailer — cinematic swell
      return createDrone(ctx, [82.4, 110, 164.8, 246.9], 0.045);
    case '/articles':  // Articles — contemplative
      return createPluckedMelody(ctx, E_MINOR, 4, 0.035);
    case '/about':     // About — warm inspiring
      return createCombined(ctx, [
        createDrone(ctx, [130.8, 196, 261.6], 0.03),
        createPluckedMelody(ctx, G_MAJOR, 3.5, 0.035),
      ]);
    case '/download':  // Download — triumphant ascending
      return createPluckedMelody(ctx, [261.6, 329.6, 392, 523.3, 659.3, 783.9], 1.2, 0.05);
    default:
      return createDrone(ctx, [110, 165], 0.02);
  }
}

function createCombined(ctx: AudioContext, handles: AmbientHandle[]): AmbientHandle {
  return {
    stop: (fadeTime = 2) => handles.forEach(h => h.stop(fadeTime))
  };
}

// Legacy export
export function playAmbientDrone(ctx: AudioContext) {
  return createDrone(ctx, [55, 82.4, 110], 0.04);
}
