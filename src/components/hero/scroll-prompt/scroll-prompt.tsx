'use client';

interface ScrollPromptProps {
  visible: boolean;
}

export function ScrollPrompt({ visible }: ScrollPromptProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="relative flex h-[32px] w-[20px] items-start justify-center rounded-full border-[1.5px] border-white/30 pt-1.5 shadow-[0_0_12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="h-[6px] w-[3px] animate-bounce rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
      </div>

      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-zinc-400 uppercase">
        Scroll To Explore
      </span>

      <svg
        className="h-3.5 w-3.5 text-accent-secondary/90 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
