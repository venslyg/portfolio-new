import Link from 'next/link';
import { Section } from '@/components/layout/section/section';
import { ProjectCard } from '@/components/projects/project-card/project-card';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { getFeaturedProjects } from '@/content/projects';

export function FeaturedWorkSection() {
  const featured = getFeaturedProjects();

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        eyebrow="01 / Selected work"
        title="Built around real needs."
        description="Personal projects across music, mobile, and community. A glimpse at what I build and the part I play."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-10 flex justify-center sm:justify-start">
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
