import Link from 'next/link';
import { Container } from '@/components/layout/container/container';
import { profile } from '@/content/profile';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-border bg-surface/20 py-10">
      <Container className="flex flex-col gap-8 text-sm text-muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent"
              aria-label="Vensly home"
            >
              VENSLY<span className="text-accent">.</span>
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Full-Stack Software Engineer — Engineering ideas in rhythm.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <Link href="/projects" className="transition-colors hover:text-foreground">
              Work
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/music" className="transition-colors hover:text-foreground">
              Music Lab
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/60 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Vensly Benaya. All rights reserved.</p>
          <Link
            href="/#home"
            className="inline-flex min-h-11 w-fit items-center gap-2 transition-colors hover:text-foreground focus-visible:rounded-control"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
