import Link from 'next/link';
import { Section } from '@/components/layout/section/section';
import { ProjectSlider } from '@/components/projects/project-slider/project-slider';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { HolographicDisc } from '@/components/three/holographic-disc/holographic-disc';
import { getAllProjects } from '@/content/projects';

export function FeaturedWorkSection() {
  const projects = getAllProjects();

  return (
    <Section id="work" labelledBy="work-heading">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <SectionHeading
            id="work-heading"
            eyebrow="01 // Selected work"
            title="Built around real needs."
            description="Personal projects across music, mobile, and community. Slide through to explore the engineering and architectural highlights."
          />
        </div>
        <div className="hidden md:flex shrink-0 items-center justify-center">
          <HolographicDisc />
        </div>
      </div>

      <div className="mt-8">
        <ProjectSlider projects={projects} />
      </div>

      <div className="mt-12 flex justify-center sm:justify-start">
        <Link
          href="/projects"
          className="inline-flex min-h-12 items-center gap-2 rounded-control border border-border bg-surface/40 px-6 font-semibold text-foreground transition-colors hover:border-accent hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-secondary"
        >
          <span>View all work & case studies</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
