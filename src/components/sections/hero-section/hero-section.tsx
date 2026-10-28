import { Button } from '@/components/ui/button/button';
import { ViewCvButton } from '@/components/ui/view-cv-button/view-cv-button';
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

      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-10 lg:px-16">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[0.95fr_1.25fr] lg:gap-8">
          {/* Hero Typography & CTAs */}
          <div className="z-10 py-2 lg:py-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
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
              <Button href="#contact">
                Let’s talk
              </Button>
              <ViewCvButton variant="hero" />
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
