import Link from 'next/link';
import { ProjectCard } from '@/components/projects/project-card/project-card';
import type { Project } from '@/content/projects';

type RelatedProjectsProps = {
  projects: readonly Project[];
};

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="related-projects-heading" className="mt-20 border-t border-border pt-16">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Explore More
          </span>
          <h2 id="related-projects-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Related case studies
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
        >
          <span>View all work</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
