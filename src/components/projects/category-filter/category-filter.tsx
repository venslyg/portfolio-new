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
        className="mb-10 flex flex-wrap gap-2.5 border-b border-white/[0.08] pb-5"
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
              className={`inline-flex min-h-11 items-center gap-2.5 rounded-full px-5 py-2 text-xs sm:text-sm font-medium backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary cursor-pointer ${
                isActive
                  ? 'border border-accent/80 bg-accent text-background font-semibold shadow-[0_4px_20px_rgba(167,139,250,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]'
                  : 'border border-white/[0.08] bg-white/[0.03] text-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:border-white/20 hover:bg-white/[0.08] hover:text-foreground'
              }`}
            >
              <span>{category}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-mono ${
                  isActive ? 'bg-background/20 text-background' : 'bg-white/[0.06] text-muted'
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
