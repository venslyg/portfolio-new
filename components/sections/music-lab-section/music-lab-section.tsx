import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { Button } from '@/components/ui/button/button';

export function MusicLabSection() {
  return (
    <Section id="music" labelledBy="music-heading" className="border-y border-border bg-surface/40">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16">
        <div>
          <SectionHeading
            id="music-heading"
            eyebrow="02 / Music lab"
            title="Where logic finds its rhythm."
            description="Music is part of my life outside the editor—and sometimes the reason I open it. Key Detective brings pitch detection into a tool for live church musicians."
          />
          <Button href="#key-detective" variant="secondary">
            Explore Key Detective <span aria-hidden="true">↗</span>
          </Button>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-background p-8 sm:p-10">
          <p aria-hidden="true" className="mb-6 text-6xl text-accent">
            ♮
          </p>
          <h3 className="text-xl font-medium">Listen. Understand. Build.</h3>
          <p className="mt-4 leading-relaxed text-muted">
            Pitch, patterns, and a practical idea: software that supports the people making music.
          </p>
          <p className="mt-7 border-t border-border pt-5 font-mono text-xs text-accent-secondary">More musical experiments to come.</p>
        </div>
      </div>
    </Section>
  );
}
