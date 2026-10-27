import { ProjectArtwork } from '@/components/projects/project-artwork/project-artwork';
import type { FeaturedProject } from '@/content/featured-projects';

type ProjectCardProps = { project: FeaturedProject };

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      id={project.id}
      className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors hover:border-accent/60"
    >
      <ProjectArtwork visual={project.visual} />
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-4 flex justify-between gap-4 font-mono text-xs text-muted">
          <span>{project.category}</span>
          <span className="text-accent">{project.number}</span>
        </p>
        <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          <span className="font-medium text-foreground">My contribution: </span>
          {project.contribution}
        </p>
        <ul aria-label={project.title + ' technologies'} className="mt-6 flex flex-wrap gap-2">
          {project.stack.map(technology => (
            <li key={technology} className="rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] text-muted">
              {technology}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-7 text-xs text-muted">Full case study coming soon.</p>
      </div>
    </article>
  );
}
