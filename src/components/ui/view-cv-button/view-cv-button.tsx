'use client';

type ViewCvButtonProps = {
  variant?: 'nav' | 'hero' | 'compact';
  className?: string;
};

export function ViewCvButton({ variant = 'hero', className = '' }: ViewCvButtonProps) {
  const cvPath = '/CV/vensly-gunasekara-cv.pdf';

  if (variant === 'nav') {
    return (
      <a
        href={cvPath}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent backdrop-blur-xl transition-all hover:border-accent hover:bg-accent/20 hover:text-white hover:shadow-[0_0_16px_rgba(167,139,250,0.3)] ${className}`}
        title="Open Vensly Gunasekara's CV in new tab"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span>View CV</span>
        <span aria-hidden="true" className="text-muted text-[10px]">↗</span>
      </a>
    );
  }

  return (
    <a
      href={cvPath}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-control border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-200 hover:border-accent/60 hover:bg-white/[0.12] hover:text-accent hover:shadow-[0_0_24px_rgba(167,139,250,0.25)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer ${className}`}
      title="View Vensly Gunasekara's CV in new tab"
    >
      <svg className="h-4 w-4 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
      <span>View CV</span>
      <span aria-hidden="true" className="text-muted text-xs">↗</span>
    </a>
  );
}
