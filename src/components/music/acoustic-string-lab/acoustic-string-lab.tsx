'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type StringSpec = {
  name: string;
  note: string;
  freq: number;
  gauge: number; // thickness in pixels
};

const STANDARD_STRINGS: StringSpec[] = [
  { name: '1st String (High E)', note: 'E4', freq: 329.63, gauge: 1.5 },
  { name: '2nd String (B)', note: 'B3', freq: 246.94, gauge: 2.0 },
  { name: '3rd String (G)', note: 'G3', freq: 196.0, gauge: 2.5 },
  { name: '4th String (D)', note: 'D3', freq: 146.83, gauge: 3.2 },
  { name: '5th String (A)', note: 'A2', freq: 110.0, gauge: 4.0 },
  { name: '6th String (Low E)', note: 'E2', freq: 82.41, gauge: 5.0 },
];

export function AcousticStringLab() {
  const [activeStrings, setActiveStrings] = useState<Record<number, number>>({});
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedTuning, setSelectedTuning] = useState<'Standard' | 'Drop D' | 'DADGAD'>('Standard');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize or get Web Audio Context on user gesture
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

  // Synthesize acoustic plucked string sound using multi-harmonic additive synthesis & decay
  const pluckString = useCallback((index: number, freq: number) => {
    setAudioEnabled(true);
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Harmonic partials for rich acoustic string timbre
    const harmonics = [1, 2, 3, 4, 5];
    const amplitudes = [1.0, 0.45, 0.25, 0.12, 0.05];

    harmonics.forEach((h, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * h, now);

      const amp = amplitudes[i];
      const duration = 2.2 / (h * 0.7);

      gain.gain.setValueAtTime(amp * 0.25, now);
      // Fast pluck attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });

    // Trigger visual string vibration decay
    setActiveStrings(prev => ({ ...prev, [index]: Date.now() }));
  }, [getAudioContext]);

  // Handle strumming all strings sequentially
  const strumAll = useCallback(() => {
    STANDARD_STRINGS.forEach((s, idx) => {
      setTimeout(() => {
        pluckString(idx, s.freq);
      }, idx * 45);
    });
  }, [pluckString]);

  // Animation frame loop for string oscillation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStrings(prev => {
        let changed = false;
        const now = Date.now();
        const next: Record<number, number> = {};
        for (const [k, v] of Object.entries(prev)) {
          if (now - v < 1200) {
            next[Number(k)] = v;
          } else {
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-border/80 bg-surface/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-1 font-mono text-xs text-accent-secondary">
            <span className="h-2 w-2 rounded-full bg-accent-secondary animate-pulse" />
            <span>Instrument 02 // Physical String Modeling</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Acoustic String Lab
          </h3>
          <p className="mt-1 text-xs text-muted">
            Hover or click any string to pluck it. Strings oscillate with realistic harmonic decay.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={strumAll}
            className="rounded-xl border border-accent/40 bg-accent/15 px-4 py-2 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-background hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
          >
            ♫ Strum Chord
          </button>
          <div className="flex items-center rounded-xl border border-border bg-surface p-1 text-xs font-mono">
            {(['Standard', 'Drop D', 'DADGAD'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTuning(t)}
                className={`rounded-lg px-2.5 py-1 transition-colors cursor-pointer ${
                  selectedTuning === t
                    ? 'bg-accent/20 font-semibold text-accent'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Fretboard Stage */}
      <div className="relative mt-8 overflow-hidden rounded-xl border border-border/70 bg-gradient-to-r from-[#141620] via-[#1a1d2c] to-[#141620] p-6 sm:p-10 shadow-inner">
        {/* Fret Markers */}
        <div className="pointer-events-none absolute inset-0 flex justify-between px-12 opacity-25">
          <div className="h-full border-r border-dashed border-border" />
          <div className="h-full border-r border-dashed border-border flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-muted/60" />
          </div>
          <div className="h-full border-r border-dashed border-border flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-muted/60" />
          </div>
          <div className="h-full border-r border-dashed border-border flex items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </div>
          <div className="h-full border-r border-dashed border-border" />
        </div>

        {/* Strings Grid */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
          {STANDARD_STRINGS.map((str, idx) => {
            const isVibrating = activeStrings[idx] !== undefined;

            return (
              <div
                key={str.name}
                onClick={() => pluckString(idx, str.freq)}
                onMouseEnter={() => pluckString(idx, str.freq)}
                className="group relative flex items-center gap-4 cursor-pointer py-1"
                role="button"
                tabIndex={0}
                aria-label={`Pluck ${str.name}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    pluckString(idx, str.freq);
                  }
                }}
              >
                {/* Note Label */}
                <div className="w-12 shrink-0 font-mono text-xs font-bold text-muted transition-colors group-hover:text-accent">
                  <span className="text-foreground">{str.note}</span>
                  <span className="text-[10px] text-muted/60 ml-1">({Math.round(str.freq)}Hz)</span>
                </div>

                {/* The Vibrating Acoustic String */}
                <div className="relative flex-1 py-3">
                  <div
                    style={{
                      height: `${str.gauge}px`,
                      background: isVibrating
                        ? 'linear-gradient(90deg, #A78BFA, #67E8F9, #A78BFA)'
                        : 'linear-gradient(90deg, #64748B, #94A3B8, #64748B)',
                      boxShadow: isVibrating ? '0 0 14px rgba(103, 232, 249, 0.8)' : 'none',
                    }}
                    className={`w-full rounded-full transition-colors duration-150 ${
                      isVibrating ? 'animate-pulse' : ''
                    }`}
                  />
                </div>

                {/* Pluck Trigger Indicator */}
                <span className="shrink-0 rounded-md border border-border/80 bg-surface/80 px-2 py-0.5 font-mono text-[10px] text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  Pluck
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sound Status Footer */}
      <div className="mt-6 flex items-center justify-between font-mono text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${audioEnabled ? 'bg-emerald-400' : 'bg-muted/40'}`} />
          <span>{audioEnabled ? 'Web Audio Active • Karplus Timbre' : 'Hover or tap strings to hear sound'}</span>
        </div>
        <span className="text-[11px] text-muted/70">6 Strings • 44.1kHz Multi-Harmonic</span>
      </div>
    </div>
  );
}
