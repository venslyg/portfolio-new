// Client-side Web Audio synthesis helper.
// AudioContext is initialized ONLY upon explicit user interaction (click/touch).
// Never plays audio automatically.

let audioContext: AudioContext | null = null;

const NOTE_FREQUENCIES: Record<number, number> = {
  0: 261.63, // C4
  1: 277.18, // C#4
  2: 293.66, // D4
  3: 311.13, // D#4
  4: 329.63, // E4
  5: 349.23, // F4
  6: 369.99, // F#4
  7: 392.00, // G4
  8: 415.30, // G#4
  9: 440.00, // A4
  10: 466.16, // A#4
  11: 493.88, // B4
  12: 523.25, // C5
  13: 554.37, // C#5
  14: 587.33, // D5
  15: 622.25, // D#5
  16: 659.25, // E5
  17: 698.46, // F5
};

export function playNote(index: number) {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContext) {
      audioContext = new AudioCtx();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const freq = NOTE_FREQUENCIES[index % 18] || 440;
    const now = audioContext.currentTime;

    // Dual-oscillator analog voice: fundamental sine + warm triangle overtone
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const masterGain = audioContext.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // +3 cents analog chorus warmth

    // Low-pass filter for smooth analog feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(700, now + 0.5);

    // Dynamic ADSR envelope
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.14, now + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.75);
    osc2.stop(now + 0.75);
  } catch {
    // Fail silently without disrupting UI
  }
}
