'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/projects/project-card/project-card';
import type { Project } from '@/content/projects';

const CATEGORIES = ['All', 'Mobile', 'Web', 'Music', 'Systems'] as const;
type Category = (typeof CATEGORIES)[number];

type CategoryFilterProps = {
  projects: readonly Project[];
};

export function CategoryFilter({ projects }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(project => project.tag === selectedCategory);

  return (
    <div>
      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category;
          const count =
            category === 'All'
              ? projects.length
              : projects.filter(p => p.tag === category).length;

          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-control px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary ${
                isActive
                  ? 'bg-accent text-background font-semibold shadow-sm'
                  : 'bg-surface/50 text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              <span>{category}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-mono ${
                  isActive ? 'bg-background/20 text-background' : 'bg-surface text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface/30 p-12 text-center">
          <p className="text-muted">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
