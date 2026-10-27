import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container/container';
import { InteractiveSynthesizer } from '@/components/visuals/interactive-synthesizer/interactive-synthesizer';
import { AcousticStringLab } from '@/components/music/acoustic-string-lab/acoustic-string-lab';
import { PolyrhythmMatrix } from '@/components/music/polyrhythm-matrix/polyrhythm-matrix';

export const metadata: Metadata = {
  title: 'Music Lab',
  description:
    'Explore the intersection of audio engineering, pitch detection, and interactive synthesis in Vensly Gunasekara’s Music Lab.',
};

export default function MusicPage() {
  return (
    <div className="pt-3 sm:pt-4 pb-[var(--section-space)]">
      <Container>
        {/* Back to Homepage Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-4 py-2 font-mono text-xs font-semibold text-muted transition-all hover:border-accent hover:bg-surface hover:text-foreground hover:shadow-md"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1 text-accent">←</span>
            <span>Back to homepage</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-14 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Creative Lab {'//'} Sound & Signal
          </p>
          <h1 className="mt-4 text-display font-bold tracking-tight text-foreground text-balance">
            Where code meets sound.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Music is more than a creative hobby—it’s an engineering lens. The Music Lab is where I explore
            digital signal processing, real-time audio buffers, and browser-based 3D synthesis.
          </p>
        </header>

        {/* ================= INSTRUMENT LAB OVERVIEW ================= */}
        <section aria-labelledby="lab-overview-heading" className="my-14 border-t border-border pt-12">
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-secondary">
              Virtual Acoustics // Experimental Instruments
            </span>
            <h2 id="lab-overview-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Instrument Lab Overview
            </h2>
            <p className="mt-3 text-muted max-w-2xl leading-relaxed">
              A sandbox for experimental browser instruments. Each instrument explores sound synthesis, physical acoustic modeling, or polyrhythmic sequencing—sound starts strictly on user interaction.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Instrument 1: 3D Synthesizer (Active) */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-accent/40 bg-surface/40 p-6 shadow-lg shadow-accent/5 backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                    ● Active Instrument
                  </span>
                  <span className="font-mono text-xs text-muted">01 / Synth</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Interactive Synthesizer</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Solid 3D mechanical keyboard running Web Audio oscillator synthesis with dynamic key physics, realistic chassis, and OLED spectrum.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-muted">
                <span className="rounded bg-surface px-2 py-0.5 border border-border">Web Audio</span>
                <span className="rounded bg-surface px-2 py-0.5 border border-border">R3F 3D</span>
                <span className="rounded bg-surface px-2 py-0.5 border border-border">No Autoplay</span>
              </div>
            </div>

            {/* Instrument 2: Acoustic String Lab (Active) */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-accent-secondary/40 bg-surface/40 p-6 shadow-lg shadow-accent-secondary/5 backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-accent-secondary/40 bg-accent-secondary/10 px-2.5 py-0.5 font-mono text-[11px] text-accent-secondary">
                    ● Active Instrument
                  </span>
                  <span className="font-mono text-xs text-muted">02 / Strings</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Acoustic String Lab</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Physical modeling synthesis simulating 6-string acoustic vibration, tension harmonics, customizable tunings, and interactive fretboard strumming.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-muted">
                <span className="rounded bg-surface px-2 py-0.5 border border-border">Karplus-Strong</span>
                <span className="rounded bg-surface px-2 py-0.5 border border-border">Harmonics</span>
                <span className="rounded bg-surface px-2 py-0.5 border border-border">Interactive Fretboard</span>
              </div>
            </div>

            {/* Instrument 3: Polyrhythm Matrix (Active) */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-amber-400/40 bg-surface/40 p-6 shadow-lg shadow-amber-400/5 backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[11px] text-amber-300">
                    ● Active Instrument
                  </span>
                  <span className="font-mono text-xs text-muted">03 / Percussion</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Polyrhythm Matrix</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  16-step procedural drum sequencer and Euclidean rhythm generator. Synthesizes kicks, snares, hats, and claves with real-time tempo control.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-muted">
                <span className="rounded bg-surface px-2 py-0.5 border border-border">Euclidean Math</span>
                <span className="rounded bg-surface px-2 py-0.5 border border-border">Step Sequencer</span>
                <span className="rounded bg-surface px-2 py-0.5 border border-border">BPM Sync</span>
              </div>
            </div>
          </div>

          {/* ================= PLAYABLE INSTRUMENT SUITE ================= */}
          <div className="mt-14 space-y-12">
            {/* Stage 1: Synthesizer */}
            <div className="overflow-hidden rounded-2xl border border-border bg-background/80 p-4 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>Instrument 01 // 3D Audio Synthesis</span>
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-foreground">Interactive Synthesizer Stage</h3>
                  <p className="text-xs text-muted">Click or tap keys to synthesize notes. Solid chassis with accurate key action.</p>
                </div>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                  Web Audio Ready
                </span>
              </div>
              <InteractiveSynthesizer />
            </div>

            {/* Stage 2: Acoustic String Lab */}
            <AcousticStringLab />

            {/* Stage 3: Polyrhythm Drum Matrix */}
            <PolyrhythmMatrix />
          </div>
        </section>

        {/* Key Detective Deep Dive */}
        <section aria-labelledby="key-detective-heading" className="my-16 border-t border-border pt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Origin Story
              </span>
              <h2 id="key-detective-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                The Key Detective Journey
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                Playing keyboard live during church services comes with a unique acoustic challenge:
                songs transition spontaneously, acoustic guitars modulate on the fly, and there is no room
                to stop the music to find the key.
              </p>
              <p className="leading-relaxed text-muted">
                To solve this, I built <span className="font-medium text-foreground">Key Detective</span>—a mobile
                tool built with Ionic, Angular, and the Pitchy autocorrelation algorithm. By sampling the live audio
                feed directly from the phone’s microphone, Key Detective isolates the fundamental frequency and
                instantly maps it to the nearest musical scale and chord chart.
              </p>

              <div className="rounded-2xl border border-border bg-surface/40 p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent-secondary">
                  Signal Processing Pipeline
                </h3>
                <ul className="mt-4 space-y-3 font-mono text-xs text-muted">
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>Mic Input → Web Audio AudioContext (44.1kHz Buffer)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>Pitchy Autocorrelation → Peak Frequency Detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>Frequency Normalization → Musical Scale Matching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-accent" />
                    <span>RxJS Throttling → Real-Time Stage UI Update</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  href="/projects/key-detective"
                  className="inline-flex min-h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-background transition-colors hover:bg-foreground"
                >
                  <span>Read full Key Detective case study</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy on Sound & Systems */}
        <section aria-labelledby="sound-systems-heading" className="my-16 border-t border-border pt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Engineering Notes
              </span>
              <h2 id="sound-systems-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                What music teaches engineering
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/30 p-6">
                <h3 className="text-lg font-semibold text-foreground">Latency is non-negotiable</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A musician perceives delay above 20 milliseconds as broken. That standard of immediacy
                  trains you to eliminate unnecessary network round-trips and optimize client render cycles.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface/30 p-6">
                <h3 className="text-lg font-semibold text-foreground">Silence is architecture</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Just as rests shape a musical phrase, negative space and restraint define great software.
                  Resisting the urge to add bloated dependencies keeps systems agile and maintainable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
