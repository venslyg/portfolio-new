'use client';

import { useState } from 'react';

type ViewCvButtonProps = {
  variant?: 'nav' | 'hero' | 'compact';
  className?: string;
};

export function ViewCvButton({ variant = 'hero', className = '' }: ViewCvButtonProps) {
  const cvPath = '/CV/vensly-gunasekara-cv.pdf';
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (variant === 'nav') {
    return (
      <div className={`inline-flex items-center rounded-full border border-accent/40 bg-accent/10 p-0.5 text-xs font-medium text-accent backdrop-blur-xl transition-all hover:border-accent hover:bg-accent/20 hover:shadow-[0_0_16px_rgba(167,139,250,0.3)] ${className}`}>
        <a
          href={cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-accent transition-colors hover:text-white"
          title="Open Vensly Gunasekara's CV in new tab"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>CV</span>
        </a>
        <span className="h-3 w-px bg-accent/30" aria-hidden="true" />
        <a
          href={cvPath}
          download="Vensly_Gunasekara_CV.pdf"
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-accent transition-all hover:bg-accent hover:text-background"
          title="Download CV (PDF)"
          aria-label="Download CV PDF"
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <>
      <div className={`inline-flex items-stretch rounded-full border border-white/20 bg-white/[0.06] p-1 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:border-accent/60 hover:bg-white/[0.1] hover:shadow-[0_0_24px_rgba(167,139,250,0.25)] ${className}`}>
        {/* Main View CV Link */}
        <a
          href={cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition-colors hover:text-accent"
          title="View Vensly Gunasekara's CV in new tab"
        >
          <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>View CV</span>
          <span aria-hidden="true" className="text-muted text-xs">↗</span>
        </a>

        {/* Divider */}
        <span className="my-1.5 w-px bg-white/15" aria-hidden="true" />

        {/* Direct Download Button */}
        <a
          href={cvPath}
          download="Vensly_Gunasekara_CV.pdf"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs sm:text-sm font-medium text-accent transition-all hover:bg-accent hover:text-background"
          title="Download CV as PDF"
          aria-label="Download Vensly Gunasekara's CV as PDF"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="hidden sm:inline">Download</span>
        </a>

        {/* In-page Modal Preview Toggle */}
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="inline-flex items-center justify-center rounded-full px-2 text-muted transition-colors hover:text-foreground"
          title="Quick preview CV modal"
          aria-label="Quick preview CV on page"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      {/* Optional In-Page PDF Modal */}
      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="CV Preview Modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Vensly Gunasekara — Curriculum Vitae</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={cvPath}
                  download="Vensly_Gunasekara_CV.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-background transition-all"
                >
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-lg p-1.5 text-muted hover:bg-white/10 hover:text-foreground transition-colors"
                  aria-label="Close CV modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content: PDF Embed */}
            <div className="relative flex-1 bg-black/50">
              <iframe
                src={`${cvPath}#toolbar=1&navpanes=0`}
                className="h-full w-full border-none"
                title="Vensly Gunasekara CV Document"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
