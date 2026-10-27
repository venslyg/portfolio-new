import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { skillGroups } from '@/content/profile';

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-heading" className="border-y border-border bg-surface/30">
      <SectionHeading
        id="skills-heading"
        eyebrow="04 / Toolkit & approach"
        title="The right tools. A clear purpose."
        description="Understand the problem, keep the solution readable, and improve it through feedback. The technology serves the work."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <div key={group.title} className="border-t border-border pt-6">
            <p aria-hidden="true" className="mb-5 font-mono text-xs text-accent">
              0{index + 1}
            </p>
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <p className="mt-2 text-sm text-muted">{group.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground">
              {group.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
