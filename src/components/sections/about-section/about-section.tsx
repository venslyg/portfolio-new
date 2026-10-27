import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { Button } from '@/components/ui/button/button';

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
        <SectionHeading
          id="about-heading"
          eyebrow="05 // Beyond the code"
          title="A developer with a musical side."
          description="Software engineering rigor meets musical creative curiosity."
        />
        <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            I’m Vensly, a full-stack developer at The Heaven’s Code. My work spans web and mobile applications, with a foundation in
            software engineering from NIBM.
          </p>
          <p>
            Music adds a different kind of curiosity. I enjoy finding places where that interest and software can come together—like real-time tools
            for worship musicians and audio signal processors.
          </p>
          <div className="pt-2">
            <Button href="/about" variant="primary">
              Read my journey & background <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
