import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container/container';
import { InteractiveSynthesizer } from '@/components/visuals/interactive-synthesizer/interactive-synthesizer';

export const metadata: Metadata = {
  title: 'Music Lab',
  description:
    'Explore the intersection of audio engineering, pitch detection, and interactive synthesis in Vensly Benaya’s Music Lab.',
};

export default function MusicPage() {
  return (
    <div className="py-[var(--section-space)]">
      <Container>
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

        {/* Synthesizer Centerpiece Showcase */}
        <section
          aria-labelledby="synth-showcase-heading"
          className="my-16 rounded-2xl border border-border bg-surface/30 p-8 sm:p-12"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-secondary">
                Interactive Centerpiece {'//'} Phase 4 Preview
              </span>
              <h2 id="synth-showcase-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                The Floating Synthesizer
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                A custom 3D synthesizer crafted to merge musical expression with web development.
                Currently rendered as an accessible, high-performance visual preview, this instrument
                is prepared for real-time WebGL interaction and procedural note synthesis in Phase 4.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
                  Three.js / React Three Fiber
                </span>
                <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
                  Web Audio API
                </span>
                <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
                  No Autoplay
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background/60 p-4 sm:p-8">
            <InteractiveSynthesizer />
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
