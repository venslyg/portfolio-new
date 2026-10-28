import { Container } from '@/components/layout/container/container';
import { technologies } from '@/content/profile';

export function ProofStrip() {
  return (
    <div className="relative border-y border-white/[0.08] bg-white/[0.02] py-6 sm:py-7 backdrop-blur-xl">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-accent/5 via-transparent to-accent-secondary/5"
        aria-hidden="true"
      />
      <Container className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Core Engineering Stack {'//'} Web · Mobile · Distributed Services
          </p>
        </div>
        <ul aria-label="Selected technologies" className="flex flex-wrap items-center gap-2 sm:gap-3">
          {technologies.map(technology => (
            <li
              key={technology}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1 font-mono text-xs text-foreground/90 backdrop-blur-md transition-all hover:border-accent hover:bg-white/[0.08] hover:text-accent shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
            >
              {technology}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
