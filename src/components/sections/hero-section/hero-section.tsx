import { Button } from '@/components/ui/button/button';
import { InteractiveSynthesizer } from '@/components/visuals/interactive-synthesizer/interactive-synthesizer';

export function HeroSection() {
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="intro-heading"
      className="relative w-full overflow-hidden pt-2 pb-8 sm:pt-6 sm:pb-12 lg:pt-10 lg:pb-16"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1700px] px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[0.95fr_1.25fr] lg:gap-8">
          {/* Hero Typography & CTAs */}
          <div className="z-10 py-2 lg:py-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/40 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" />
              <p className="font-mono text-xs tracking-[0.16em] text-accent-secondary uppercase">
                Vensly Gunasekara {'//'} Full-Stack Software Engineer
              </p>
            </div>

            <h1
              id="intro-heading"
              className="text-display font-semibold tracking-tight text-balance text-foreground"
            >
              Engineering ideas{' '}
              <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
                in rhythm.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-xl">
              I build web and mobile applications that turn real-world problems into
              useful software. Music brings another perspective to the way I create.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Button href="#work">
                View work <span aria-hidden="true">↗</span>
              </Button>
              <Button href="#contact" variant="secondary">
                Let’s talk
              </Button>
            </div>

            {/* Quick interactive hint */}
            <div className="mt-6 flex items-center gap-2.5 text-xs font-mono text-muted/80 sm:mt-8">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface text-[10px]">
                ♫
              </span>
              <span>Tap keys to play • Scroll down to see keys disperse in 3D</span>
            </div>
          </div>

          {/* Full-Width 3D Synthesizer Experience */}
          <div className="relative w-full">
            <InteractiveSynthesizer isFullWidth={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
