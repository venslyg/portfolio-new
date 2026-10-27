import Link from 'next/link';
import { Container } from '@/components/layout/container/container';

export function Footer() {
  return (
    <footer className="border-t border-border py-7">
      <Container className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          VENSLY.{' '}
          <span className="mx-2 text-accent" aria-hidden="true">
            /
          </span>{' '}
          Code in rhythm.
        </p>
        <Link href="/#home" className="inline-flex min-h-11 w-fit items-center gap-2 transition-colors hover:text-foreground">
          Back to top <span aria-hidden="true">↑</span>
        </Link>
      </Container>
    </footer>
  );
}
