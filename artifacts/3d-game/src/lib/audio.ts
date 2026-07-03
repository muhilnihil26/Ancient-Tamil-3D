export function playSwordSwoosh(audioCtx: AudioContext) {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  
  // Metallic swoosh synthesis
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  const bufferSize = audioCtx.sampleRate * 0.5; // 0.5 seconds
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(8000, audioCtx.currentTime + 0.1);
  filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.4);

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noise.start(audioCtx.currentTime);
  noise.stop(audioCtx.currentTime + 0.5);
}

export function playAmbientDrone(audioCtx: AudioContext) {
  if (!audioCtx || audioCtx.state === 'suspended') return null;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low drone (A1)
  
  // Add some subtle frequency modulation
  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime);
  
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.setValueAtTime(5, audioCtx.currentTime);
  
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 5);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  lfo.start();

  return {
    stop: () => {
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2);
      osc.stop(audioCtx.currentTime + 2);
      lfo.stop(audioCtx.currentTime + 2);
    }
  };
}