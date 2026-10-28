'use client';

import { useState, type ReactNode } from 'react';
import { ProjectArtwork } from '@/components/projects/project-artwork/project-artwork';
import { ProjectDetailModal } from '@/components/projects/project-detail-modal/project-detail-modal';
import type { Project } from '@/content/projects';

type ProjectCardProps = {
  project: Project;
  onOpenDetails?: (project: Project) => void;
};

// Mini matching SVG icons for technologies
function getTechIcon(name: string): ReactNode {
  switch (name.toLowerCase()) {
    case 'angular':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 250 250">
          <polygon points="125,30 31.9,63.2 46.1,186.3 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
          <polygon points="125,30 125,52.2 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
          <path d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M141.6,135h-33.3l16.6-41.2L141.6,135z" fill="#FFF" />
        </svg>
      );
    case 'react':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="-11.5 -10.23 23 20.46">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'flutter':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 166 202">
          <path d="M100.3 0L0 100.3l31.1 31.1 131.4-131.4z" fill="#47C5FB" />
          <path d="M100.3 84.7l-46.7 46.7 31.1 31.1 46.7-46.7z" fill="#02569B" />
          <path d="M69.2 147l31.1 31.1 65.7-65.7-31.1-31.1z" fill="#0175C2" />
        </svg>
      );
    case 'ionic':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 512 512">
          <circle cx="256" cy="256" r="208" fill="#3880FF" />
          <circle cx="256" cy="256" r="80" fill="#FFF" />
        </svg>
      );
    case 'firebase':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 128 128">
          <path d="M22.9 98.2L3.1 82.5 48.9 23.6 70 68.2z" fill="#FFA000" />
          <path d="M68.8 40.5l15.4 79.3-47.5.3z" fill="#F57C00" />
          <path d="M124.9 98.2l-33.1 20.9-23-19.9 10.2-74.9z" fill="#FFCA28" />
        </svg>
      );
    case 'sqlite':
    case 'postgresql':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="#336791">
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm-6 5.5c1.45.89 3.63 1.5 6 1.5s4.55-.61 6-1.5V12c0 .5-2.13 2-6 2s-6-1.5-6-2v-1.5zm0 5c1.45.89 3.63 1.5 6 1.5s4.55-.61 6-1.5V17c0 .5-2.13 2-6 2s-6-1.5-6-2v-1.5z" />
        </svg>
      );
    case 'spring boot':
    case 'java':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="#6DB33F">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
        </svg>
      );
    case 'typescript':
    case 'javascript':
      return (
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="#3178C6">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M7 8h10v2.5H13V18h-2.5v-7.5H7V8z" fill="#FFF" />
        </svg>
      );
    case 'web audio api':
    case 'pitchy':
      return (
        <svg className="h-3 w-3 shrink-0 text-accent" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      );
    default:
      return (
        <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" aria-hidden="true" />
      );
  }
}

// Category matching icons
function getCategoryIcon(tag: Project['tag']): string {
  switch (tag) {
    case 'Music':
      return '🎵';
    case 'Mobile':
      return '📱';
    case 'Web':
      return '🌐';
    case 'Systems':
      return '⚡';
    default:
      return '📁';
  }
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpen() {
    if (onOpenDetails) {
      onOpenDetails(project);
    } else {
      setIsModalOpen(true);
    }
  }

  return (
    <>
      <article
        id={project.slug}
        onClick={handleOpen}
        className="group relative flex h-[340px] sm:h-[350px] w-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-accent/50 hover:bg-white/[0.06] hover:shadow-[0_14px_44px_0_rgba(167,139,250,0.18),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:-translate-y-1 cursor-pointer"
      >
        {/* Artwork Banner with Real Project Image */}
        <div className="relative h-[145px] w-full overflow-hidden shrink-0">
          <ProjectArtwork visual={project.visual} image={project.image} title={project.title} />
        </div>

        {/* Card Content (compact & balanced) */}
        <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 min-h-0">
          <div>
            {/* Category & Number Eyebrow with Live indicator */}
            <div className="mb-1 flex items-center justify-between gap-2 font-mono text-[0.68rem] text-muted">
              <span className="flex items-center gap-1.5 truncate">
                <span aria-hidden="true">{getCategoryIcon(project.tag)}</span>
                <span className="truncate">{project.category}</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {project.liveUrl && (
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] text-emerald-400 font-medium shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                    Live
                  </span>
                )}
                <span className="font-semibold text-accent">{project.number}</span>
              </div>
            </div>

            {/* Project Title */}
            <h3 className="line-clamp-1 text-sm sm:text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="mt-1 line-clamp-2 text-[0.76rem] leading-snug text-muted">
              {project.summary}
            </p>
          </div>

          {/* Bottom Row: Tech Stack on Left + Glassmorphism View Details Button on Right */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.06] pt-2.5">
            {/* Technology Pills with Matching Icons */}
            <ul aria-label={project.title + ' technologies'} className="flex flex-wrap items-center gap-1 overflow-hidden">
              {project.stack.slice(0, 2).map(technology => (
                <li
                  key={technology}
                  className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[0.58rem] text-muted backdrop-blur-sm transition-colors group-hover:border-white/15 group-hover:bg-white/[0.08] group-hover:text-foreground"
                >
                  {getTechIcon(technology)}
                  <span className="truncate max-w-[65px]">{technology}</span>
                </li>
              ))}
              {project.stack.length > 2 && (
                <li className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.5 font-mono text-[0.56rem] text-muted/70">
                  +{project.stack.length - 2}
                </li>
              )}
            </ul>

            {/* Glassmorphism View Details Button (in purple marked place) */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleOpen();
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 font-mono text-[0.7rem] font-semibold text-foreground/90 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.25)] transition-all hover:border-accent hover:bg-white/[0.18] hover:text-accent hover:shadow-[0_0_15px_rgba(167,139,250,0.3)] cursor-pointer"
              aria-label={`View project details for ${project.title}`}
            >
              <span>View Details</span>
              <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </div>
      </article>

      {/* Render standalone modal if onOpenDetails is not provided by parent */}
      {!onOpenDetails && isModalOpen && (
        <ProjectDetailModal project={project} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
