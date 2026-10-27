import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { experience } from '@/content/profile';

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          id="experience-heading"
          eyebrow="03 / The journey"
          title="Learning by building."
          description="From software engineering studies to contributing to real client applications."
        />
        <ol className="border-l border-border">
          {experience.map(entry => (
            <li key={entry.title} className="relative pb-10 pl-7 last:pb-0">
              <span aria-hidden="true" className="absolute top-1 -left-[5px] size-[9px] rounded-full bg-accent ring-4 ring-background" />
              <p className="font-mono text-xs text-accent">{entry.period}</p>
              <h3 className="mt-3 text-xl font-semibold">{entry.title}</h3>
              <p className="mt-1 text-sm text-foreground">{entry.organization}</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{entry.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
