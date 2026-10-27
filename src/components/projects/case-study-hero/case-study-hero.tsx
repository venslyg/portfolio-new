import Link from 'next/link';
import type { Project } from '@/content/projects';

type CaseStudyHeroProps = {
  project: Project;
};

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <header className="mb-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="mb-6">
        <ol className="flex items-center gap-2 font-mono text-xs text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/projects" className="transition-colors hover:text-foreground">
              Work
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-accent">
            {project.title}
          </li>
        </ol>
      </nav>

      {/* Eyebrow & Number */}
      <div className="mb-4 flex items-center justify-between gap-4 font-mono text-xs">
        <span className="text-accent uppercase tracking-widest">
          Case Study {'//'} {project.number}
        </span>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted">
          {project.category}
        </span>
      </div>

      {/* Main Title & Summary */}
      <h1 className="text-display font-bold tracking-tight text-foreground text-balance">
        {project.title}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
        {project.summary}
      </p>

      {/* Meta Grid */}
      <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-surface/50 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="block font-mono text-xs uppercase tracking-wider text-muted">
            Role
          </span>
          <span className="mt-1 block font-medium text-foreground">{project.role}</span>
        </div>
        <div>
          <span className="block font-mono text-xs uppercase tracking-wider text-muted">
            Timeline
          </span>
          <span className="mt-1 block font-medium text-foreground">{project.period}</span>
        </div>
        <div>
          <span className="block font-mono text-xs uppercase tracking-wider text-muted">
            Status
          </span>
          <span className="mt-1 inline-flex items-center gap-1.5 font-medium text-foreground">
            <span
              className={`size-2 rounded-full ${
                project.permissionStatus === 'public' ? 'bg-accent' : 'bg-accent-secondary'
              }`}
              aria-hidden="true"
            />
            {project.permissionStatus === 'public' ? 'Public Project' : 'Client Architecture'}
          </span>
        </div>
        <div>
          <span className="block font-mono text-xs uppercase tracking-wider text-muted">
            Technologies
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background/80 px-2.5 py-0.5 font-mono text-[0.65rem] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
