import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { ToolsGrid } from '@/components/skills/tools-grid/tools-grid';

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-heading" className="border-y border-border bg-surface/20">
      <SectionHeading
        id="skills-heading"
        eyebrow="04 // Technologies & Tools"
        title="The right tools. A clear purpose."
        description="A battle-tested stack for building performant web applications, cross-platform mobile tools, and resilient services."
      />

      <div className="mt-12">
        <ToolsGrid />
      </div>
    </Section>
  );
}
