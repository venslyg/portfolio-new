import Link from 'next/link';
import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="relative border-t border-border/80 bg-background bg-pinstripe pt-16 pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-accent/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-12 px-6 sm:px-10 lg:px-16">
        {/* ================= INSPIRATIONAL MOTTO ================= */}
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.24em] text-muted/70 uppercase">
            &ldquo;WE ARE NOT JUST WRITING CODE. WE ARE COMPOSING DIGITAL EXPERIENCES.&rdquo;
          </p>
        </div>

        {/* ================= 3-COLUMN FOOTER LAYOUT ================= */}
        <div className="grid gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.3fr] lg:gap-16">
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-surface/80 font-mono text-sm font-bold text-accent shadow-sm">
                VB
              </div>
              <div>
                <Link
                  href="/"
                  className="text-base font-bold tracking-tight text-foreground transition-colors hover:text-accent"
                  aria-label="Vensly home"
                >
                  VENSLY GUNASEKARA<span className="text-accent">.</span>
                </Link>
                <p className="font-mono text-[0.68rem] tracking-wider text-accent-secondary uppercase">
                  Full-Stack Software Engineer
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-xs leading-relaxed text-muted">
              Merging technical software engineering rigor with musical rhythm to craft resilient,
              purpose-driven digital products across web and mobile ecosystems.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-muted transition-colors hover:text-accent focus-visible:rounded-control"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted transition-colors hover:text-accent focus-visible:rounded-control"
                >
                  Work & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/music"
                  className="text-muted transition-colors hover:text-accent focus-visible:rounded-control"
                >
                  Music Lab & Key Detective
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted transition-colors hover:text-accent focus-visible:rounded-control"
                >
                  About Vensly
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-muted transition-colors hover:text-accent focus-visible:rounded-control"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social with Icons */}
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
              Contact & Social
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-xs">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2.5 text-muted transition-colors hover:text-foreground focus-visible:rounded-control"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface text-accent group-hover:border-accent">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span>{profile.email}</span>
                </a>
              </li>

              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-muted transition-colors hover:text-foreground focus-visible:rounded-control"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface text-accent group-hover:border-accent">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </span>
                  <span>github.com/venslyg ↗</span>
                </a>
              </li>

              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-muted transition-colors hover:text-foreground focus-visible:rounded-control"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface text-accent group-hover:border-accent">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </span>
                  <span>linkedin.com/in/vensly-gunasekara ↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
