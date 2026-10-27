import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { Button } from '@/components/ui/button/button';
import { InterstitialKnot } from '@/components/three/interstitial-knot/interstitial-knot';

export function MusicLabSection() {
  return (
    <Section id="music" labelledBy="music-heading" className="border-y border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16">
        <div>
          <SectionHeading
            id="music-heading"
            eyebrow="02 / Music lab"
            title="Where logic finds its rhythm."
            description="Music is part of my life outside the editor—and sometimes the reason I open it. Key Detective brings pitch detection into a tool for live church musicians."
          />
          <div className="flex flex-wrap gap-4">
            <Button href="/music" variant="primary">
              Explore Music Lab <span aria-hidden="true">→</span>
            </Button>
            <Button href="/projects/key-detective" variant="secondary">
              Key Detective Case Study <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
        <div className="relative rounded-3xl border border-white/[0.12] bg-white/[0.04] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_16px_40px_0_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-hidden flex flex-col items-center text-center hover:border-accent/40 transition-all duration-300">
          <InterstitialKnot />
          <h3 className="text-xl font-medium text-foreground">Listen. Understand. Build.</h3>
          <p className="mt-3 leading-relaxed text-muted text-sm max-w-sm">
            Pitch, patterns, and practical acoustic software: digital signal processing engineered for live performance.
          </p>
          <p className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-accent-secondary">
            Interactive Instrument Lab &amp; Experiments
          </p>
        </div>
      </div>
    </Section>
  );
}
