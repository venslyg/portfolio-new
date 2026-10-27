'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/content/projects';

type ProjectDetailModalProps = {
  project: Project | null;
  onClose: () => void;
};

const emptySubscribe = () => () => {};

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Close on Escape key press & prevent background scroll
  useEffect(() => {
    if (!project) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
    >
      {/* Blurred Dim Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalContentRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/95 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200"
      >
        {/* Sticky Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/70 bg-surface/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Case Study {'//'} {project.number}
            </span>
            <span className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-[11px] text-muted">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:bg-background hover:text-foreground cursor-pointer"
            aria-label="Close project details"
          >
            <span aria-hidden="true" className="text-base font-bold">✕</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-8 [scrollbar-width:thin]">
          {/* Title and Summary */}
          <div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {project.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              {project.summary}
            </p>
          </div>

          {/* Quick Meta Grid & Live Links */}
          <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-border/60 bg-background/50 p-5 font-mono text-xs">
            <div>
              <span className="text-muted/70 uppercase">Role</span>
              <p className="mt-1 font-semibold text-foreground">{project.role}</p>
            </div>
            <div>
              <span className="text-muted/70 uppercase">Timeline / Context</span>
              <p className="mt-1 font-semibold text-foreground">{project.period}</p>
            </div>
            <div>
              <span className="text-muted/70 uppercase">Visibility Status</span>
              <p className="mt-1 flex items-center gap-1.5 font-semibold text-foreground">
                <span className={`h-2 w-2 rounded-full ${project.permissionStatus === 'public' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>{project.permissionStatus === 'public' ? 'Public Project' : 'Client Confidential Summary'}</span>
              </p>
            </div>
            {project.liveUrl && (
              <div>
                <span className="text-muted/70 uppercase">Live Production URL</span>
                <p className="mt-1">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
                  >
                    <span>{project.liveUrl.replace('https://', '')}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Live Action Bar if Project has Live URL */}
          {project.liveUrl && (
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                  Live Public Deployment
                </span>
                <p className="text-xs text-muted mt-0.5">
                  Visit the operational web deployment at {project.liveUrl.replace('https://', '')}
                </p>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 font-mono text-xs font-bold text-background transition-all hover:bg-foreground hover:shadow-lg shadow-accent/20 cursor-pointer"
              >
                <span>Visit Live Website</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}

          {/* Technology Stack Pills */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              Technologies & Architecture
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <li
                  key={tech}
                  className="rounded-full border border-border/80 bg-surface px-3 py-1 font-mono text-xs text-foreground/90 shadow-sm"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Problem & Approach */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-surface/40 p-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-300">
                The Challenge
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.problem}
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-surface/40 p-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-secondary">
                The Solution & Approach
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Architecture Highlights */}
          {project.architecture.length > 0 && (
            <div className="rounded-2xl border border-border/80 bg-background/40 p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent-secondary">
                System Architecture
              </h3>
              <ul className="mt-4 space-y-3 font-mono text-xs text-muted">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="size-2 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Technical Highlights */}
          {project.highlights.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                Core Technical Highlights
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/30 p-3.5 text-xs text-foreground/90 leading-relaxed"
                  >
                    <span className="font-mono text-accent shrink-0 font-bold">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome & Engineering Insight */}
          <div className="rounded-2xl border border-accent/30 bg-surface/60 p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              Outcome & Engineering Insight
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
              {project.outcomeOrLearning}
            </p>
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-border/70 bg-surface/90 px-6 py-4 backdrop-blur-md">
          <span className="font-mono text-[11px] text-muted hidden sm:inline-block">
            Press <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-foreground">ESC</kbd> to close
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-accent/40 bg-accent/15 px-4 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-background transition-colors cursor-pointer"
              >
                <span>Live View</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-surface px-5 font-mono text-xs font-semibold text-foreground hover:bg-background transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
