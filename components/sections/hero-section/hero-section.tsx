import { Section } from '@/components/layout/section/section';
import { Button } from '@/components/ui/button/button';
import { SynthesizerPreview } from '@/components/visuals/synthesizer-preview/synthesizer-preview';

export function HeroSection() {
  return (
    <Section id="home" labelledBy="intro-heading" className="overflow-clip">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="mb-6 font-mono text-xs leading-relaxed tracking-[0.16em] text-accent-secondary uppercase">
            Vensly Benaya / Full-Stack Software Engineer
          </p>
          <h1 id="intro-heading" className="text-display font-semibold tracking-tight text-balance">
            Engineering ideas <span className="text-accent">in rhythm.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            I build web and mobile applications that turn real-world problems into useful software. Music brings another perspective to the
            way I create.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#work">
              View work <span aria-hidden="true">↗</span>
            </Button>
            <Button href="#contact" variant="secondary">
              Let’s talk
            </Button>
          </div>
        </div>
        <SynthesizerPreview />
      </div>
    </Section>
  );
}
