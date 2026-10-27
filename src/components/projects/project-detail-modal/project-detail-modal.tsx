'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
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
        className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalContentRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#121422]/85 shadow-[0_24px_70px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Sticky Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Case Study {'//'} {project.number}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-muted">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-muted transition-all hover:border-accent hover:bg-white/[0.15] hover:text-foreground backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer"
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

          {/* Project Image Preview */}
          {project.image && (
            <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121422] via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Quick Meta Grid & Live Links */}
          <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 font-mono text-xs backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
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
                <span className={`h-2 w-2 rounded-full ${project.permissionStatus === 'public' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-amber-400'}`} />
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
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 backdrop-blur-md shadow-[0_4px_25px_rgba(167,139,250,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]">
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
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1 font-mono text-xs text-foreground/90 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Problem & Approach */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-300">
                The Challenge
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.problem}
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
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
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent-secondary">
                System Architecture
              </h3>
              <ul className="mt-4 space-y-3 font-mono text-xs text-muted">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="size-2 rounded-full bg-accent mt-1.5 shrink-0 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
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
                    className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 text-xs text-foreground/90 leading-relaxed backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  >
                    <span className="font-mono text-accent shrink-0 font-bold">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome & Engineering Insight */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
              Outcome & Engineering Insight
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
              {project.outcomeOrLearning}
            </p>
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-white/[0.02] px-6 py-4 backdrop-blur-xl">
          <span className="font-mono text-[11px] text-muted hidden sm:inline-block">
            Press <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-foreground">ESC</kbd> to close
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-accent/40 bg-accent/15 px-4 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-background transition-colors cursor-pointer shadow-[0_0_12px_rgba(167,139,250,0.25)]"
              >
                <span>Live View</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-5 font-mono text-xs font-semibold text-foreground hover:bg-white/[0.12] transition-colors cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
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
