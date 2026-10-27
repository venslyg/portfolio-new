import { Container } from '@/components/layout/container/container';
import { technologies } from '@/content/profile';

export function ProofStrip() {
  return (
    <div className="border-y border-border bg-surface/40 py-7">
      <Container className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-muted">Web. Mobile. The services behind them.</p>
        <ul aria-label="Selected technologies" className="flex flex-wrap gap-x-7 gap-y-3">
          {technologies.map(technology => (
            <li key={technology} className="font-mono text-xs text-foreground">
              {technology}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
