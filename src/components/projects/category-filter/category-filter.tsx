'use client';

import { ProjectCard } from '@/components/projects/project-card/project-card';
import type { Project } from '@/content/projects';

type CategoryFilterProps = {
  projects: readonly Project[];
};

export function CategoryFilter({ projects }: CategoryFilterProps) {
  return (
    <div>
      {/* Projects Grid with reduced width and height */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface/30 p-12 text-center">
          <p className="text-muted">No projects found.</p>
        </div>
      )}
    </div>
  );
}
