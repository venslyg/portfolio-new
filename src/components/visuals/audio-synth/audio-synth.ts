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
  13: 587.33, // D5
};

export function playNote(index: number) {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioContext) {
      audioContext = new AudioCtx();
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const freq = NOTE_FREQUENCIES[index % 14] || 440;
    const now = audioContext.currentTime;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    // Gentle warm triangle / sine tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Smooth envelope: instant attack, gentle exponential decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  } catch {
    // Fail silently without disrupting UI
  }
}
