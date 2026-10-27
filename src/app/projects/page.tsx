import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container/container';
import { CategoryFilter } from '@/components/projects/category-filter/category-filter';
import { getAllProjects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Work & Projects',
  description:
    'Explore full-stack web applications, cross-platform mobile tools, and enterprise architecture engineered by Vensly Gunasekara.',
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="pt-3 sm:pt-4 pb-[var(--section-space)]">
      <Container>
        {/* Back to Homepage Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs font-semibold text-muted backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all hover:border-accent hover:bg-white/[0.1] hover:text-foreground hover:shadow-[0_4px_20px_rgba(167,139,250,0.2)]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1 text-accent">←</span>
            <span>Back to homepage</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="mb-14 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Portfolio {'//'} Selected Work
          </p>
          <h1 className="mt-4 text-display font-bold tracking-tight text-foreground text-balance">
            Engineered for real-world impact.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            A breakdown of mobile utilities, enterprise systems, and community web applications.
            Each project documents the core challenge, engineering approach, and architectural decisions.
          </p>
        </header>

        {/* Interactive Filter and Grid */}
        <CategoryFilter projects={allProjects} />

        {/* Professional Ethics & Confidentiality Notice */}
        <section
          aria-labelledby="confidentiality-heading"
          className="mt-20 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)]"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15 font-mono text-lg font-bold text-accent shadow-[0_0_15px_rgba(167,139,250,0.25)]">
              §
            </div>
            <div>
              <h2 id="confidentiality-heading" className="text-xl font-semibold text-foreground">
                Professional Ethics & Architecture Summaries
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                Projects tagged <span className="font-medium text-foreground">Client Architecture</span> were
                developed as part of my engineering responsibilities at The Heaven’s Code. In adherence to
                strict non-disclosure and client confidentiality standards, private company databases,
                proprietary source repositories, and client logos are excluded. Case studies focus on
                architectural patterns, transaction consistency, and full-stack challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 text-center">
          <p className="text-muted">Have questions about a specific architecture or system?</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-background transition-colors hover:bg-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span>Get in touch</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center gap-2 rounded-control border border-border bg-surface/50 px-6 font-semibold text-foreground transition-colors hover:border-accent hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-secondary"
            >
              <span>Read about my background</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
