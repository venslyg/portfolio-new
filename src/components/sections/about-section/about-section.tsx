import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { Button } from '@/components/ui/button/button';

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid gap-8 md:grid-cols-2 md:gap-20">
        <SectionHeading id="about-heading" eyebrow="05 / Beyond the code" title="A developer with a musical side." />
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            I’m Vensly, a full-stack developer at The Heaven’s Code. My work spans web and mobile applications, with a foundation in
            software engineering from NIBM.
          </p>
          <p>
            Music adds a different kind of curiosity. I enjoy finding places where that interest and software can come together—like tools
            for musicians.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/about" variant="primary">
              Read my journey <span aria-hidden="true">→</span>
            </Button>
            <Button href="#contact" variant="secondary">
              Start a conversation <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
