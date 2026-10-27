'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Track = {
  id: string;
  name: string;
  color: string;
  defaultSteps: boolean[];
};

const INITIAL_TRACKS: Track[] = [
  {
    id: 'kick',
    name: 'Kick Drum',
    color: '#A78BFA',
    // 4 on the floor: beats 0, 4, 8, 12
    defaultSteps: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
  },
  {
    id: 'snare',
    name: 'Snare Snap',
    color: '#67E8F9',
    // beats 4, 12
    defaultSteps: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
  },
  {
    id: 'hihat',
    name: 'Closed Hi-Hat',
    color: '#F4F4F7',
    // 8th notes: 0, 2, 4, 6, 8, 10, 12, 14
    defaultSteps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
  },
  {
    id: 'clave',
    name: 'Wood Clave (3:2)',
    color: '#FBBF24',
    // Son clave / 3:2 syncopation: 0, 3, 6, 10, 12
    defaultSteps: [true, false, false, true, false, false, true, false, false, false, true, false, true, false, false, false],
  },
];

export function PolyrhythmMatrix() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(112);
  const [currentStep, setCurrentStep] = useState(0);
  const [grid, setGrid] = useState<Record<string, boolean[]>>(() => {
    const init: Record<string, boolean[]> = {};
    INITIAL_TRACKS.forEach(t => {
      init[t.id] = [...t.defaultSteps];
    });
    return init;
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const stepRef = useRef(0);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Procedural Drum Synthesis Functions
  const playSound = useCallback((trackId: string) => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (trackId === 'kick') {
      // Deep 808 style pitch drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(135, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.28);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (trackId === 'snare') {
      // Noise burst + tone body
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(190, now);
      oscGain.gain.setValueAtTime(0.4, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);

      // Noise component
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.15);
    } else if (trackId === 'hihat') {
      // High-pass metallic noise
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(6500, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.05);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.05);
    } else if (trackId === 'clave') {
      // Woodblock / Clave resonant sine
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1750, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  }, [getAudioContext]);

  // Step Sequencer Interval Clock
  useEffect(() => {
    if (!isPlaying) return;

    const stepInterval = (60 / bpm / 4) * 1000; // 16th notes
    const interval = setInterval(() => {
      const step = stepRef.current;
      setCurrentStep(step);

      // Trigger active sounds at current step
      INITIAL_TRACKS.forEach(track => {
        if (grid[track.id]?.[step]) {
          playSound(track.id);
        }
      });

      stepRef.current = (step + 1) % 16;
    }, stepInterval);

    return () => clearInterval(interval);
  }, [isPlaying, bpm, grid, playSound]);

  const toggleStep = (trackId: string, stepIndex: number) => {
    setGrid(prev => {
      const current = prev[trackId] ? [...prev[trackId]] : new Array(16).fill(false);
      current[stepIndex] = !current[stepIndex];
      return { ...prev, [trackId]: current };
    });
  };

  const applyPreset = (preset: '4/4' | 'Polyrhythm' | 'Afrobeat' | 'Clear') => {
    if (preset === 'Clear') {
      const cleared: Record<string, boolean[]> = {};
      INITIAL_TRACKS.forEach(t => (cleared[t.id] = new Array(16).fill(false)));
      setGrid(cleared);
      return;
    }

    if (preset === '4/4') {
      const p: Record<string, boolean[]> = {};
      INITIAL_TRACKS.forEach(t => (p[t.id] = [...t.defaultSteps]));
      setGrid(p);
      return;
    }

    if (preset === 'Polyrhythm') {
      setGrid({
        kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
        snare: [false, false, false, true, false, false, true, false, false, false, true, false, false, false, true, false],
        hihat: [true, true, false, true, true, false, true, true, false, true, true, false, true, true, false, true],
        clave: [true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true],
      });
      return;
    }

    if (preset === 'Afrobeat') {
      setGrid({
        kick: [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false],
        snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
        hihat: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        clave: [true, false, false, true, false, false, true, false, false, true, false, true, false, false, true, false],
      });
    }
  };

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)]">
      {/* Header and Sequencer Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-xs text-amber-300">
            <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-amber-400'}`} />
            <span>Instrument 03 // Euclidean Rhythm Matrix</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Polyrhythm Drum Matrix
          </h3>
          <p className="mt-1 text-xs text-muted">
            16-step procedural drum sequencer. Click steps to compose rhythmic patterns and cross-meters.
          </p>
        </div>

        {/* Master Transport & Tempo */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              getAudioContext();
              setIsPlaying(p => !p);
            }}
            className={`rounded-xl px-5 py-2.5 font-mono text-xs font-bold transition-all shadow-lg cursor-pointer ${
              isPlaying
                ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
                : 'bg-accent text-background hover:bg-foreground shadow-accent/20'
            }`}
          >
            {isPlaying ? '■ Stop Matrix' : '▶ Start Sequencer'}
          </button>

          {/* BPM Slider */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
            <span>{bpm} BPM</span>
            <input
              type="range"
              min="75"
              max="150"
              value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="w-20 accent-accent cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-muted/70 text-[11px] mr-2">Presets:</span>
        {(['4/4', 'Polyrhythm', 'Afrobeat', 'Clear'] as const).map(p => (
          <button
            key={p}
            type="button"
            onClick={() => applyPreset(p)}
            className="rounded-lg border border-border bg-surface/80 px-2.5 py-1 text-muted transition-colors hover:border-accent hover:text-foreground cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* 16-Step Drum Grid */}
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="min-w-[620px] flex flex-col gap-3">
          {/* Step Numbers Header */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted/60 pl-32">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={`hdr-${i}`}
                className={`w-7 text-center ${currentStep === i && isPlaying ? 'font-bold text-accent' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Tracks */}
          {INITIAL_TRACKS.map(track => {
            const steps = grid[track.id] || new Array(16).fill(false);

            return (
              <div key={track.id} className="flex items-center gap-2">
                {/* Track Name & Audition Button */}
                <div className="flex w-32 shrink-0 items-center justify-between pr-2">
                  <span className="font-mono text-xs font-semibold text-foreground truncate">
                    {track.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => playSound(track.id)}
                    title={`Audition ${track.name}`}
                    className="flex h-5 w-5 items-center justify-center rounded border border-border bg-surface text-[10px] text-muted hover:border-accent hover:text-accent cursor-pointer"
                  >
                    ♪
                  </button>
                </div>

                {/* 16 Step Buttons */}
                <div className="flex items-center gap-2">
                  {steps.map((isActive, stepIdx) => {
                    const isPlayhead = currentStep === stepIdx && isPlaying;
                    const isDownbeat = stepIdx % 4 === 0;

                    return (
                      <button
                        key={`${track.id}-${stepIdx}`}
                        type="button"
                        onClick={() => toggleStep(track.id, stepIdx)}
                        aria-label={`${track.name} step ${stepIdx + 1}`}
                        style={{
                          backgroundColor: isActive ? track.color : undefined,
                        }}
                        className={`h-8 w-7 rounded-md border transition-all duration-100 cursor-pointer ${
                          isActive
                            ? 'border-transparent shadow-md'
                            : isDownbeat
                              ? 'border-border/90 bg-surface/80 hover:border-accent/60'
                              : 'border-border/50 bg-background/50 hover:border-accent/40'
                        } ${
                          isPlayhead
                            ? 'ring-2 ring-white scale-110'
                            : ''
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Status Footer */}
      <div className="mt-6 flex items-center justify-between font-mono text-xs text-muted border-t border-border/60 pt-4">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-emerald-400' : 'bg-muted/40'}`} />
          <span>{isPlaying ? `Matrix Running (${bpm} BPM)` : 'Click steps to activate • Press Start Sequencer'}</span>
        </div>
        <span className="text-[11px] text-muted/70">4 Procedural Audio Synthesizers • Zero Audio Files</span>
      </div>
    </div>
  );
}
