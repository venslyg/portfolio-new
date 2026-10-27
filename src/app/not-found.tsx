import Link from 'next/link';
import { Container } from '@/components/layout/container/container';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center py-[var(--section-space)]">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            404 {'//'} Out of tune
          </p>
          <h1 className="mt-4 text-display font-bold tracking-tight text-foreground">
            Page not found.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            The note or route you’re looking for doesn’t exist or has moved. Let’s bring you back into rhythm.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-background transition-colors hover:bg-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span>Back to home</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center gap-2 rounded-control border border-border bg-surface/50 px-6 font-semibold text-foreground transition-colors hover:border-accent hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-secondary"
            >
              <span>Browse projects</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
