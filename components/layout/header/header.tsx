import Link from 'next/link';
import { Container } from '@/components/layout/container/container';
import { Navigation } from '@/components/layout/navigation/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
      <Container className="flex min-h-20 items-center justify-between gap-6 py-3">
        <Link
          href="/#home"
          aria-label="Vensly home"
          className="inline-flex min-h-11 shrink-0 items-center text-xl font-bold tracking-tight"
        >
          VENSLY<span className="text-accent">.</span>
        </Link>
        <Navigation />
      </Container>
    </header>
  );
}
