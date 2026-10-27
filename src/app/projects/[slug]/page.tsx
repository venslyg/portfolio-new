import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container/container';
import { CaseStudyHero } from '@/components/projects/case-study-hero/case-study-hero';
import { ProjectArtwork } from '@/components/projects/project-artwork/project-artwork';
import { RelatedProjects } from '@/components/projects/related-projects/related-projects';
import { getAllProjects, getProjectBySlug, getRelatedProjects } from '@/content/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map(project => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(slug);

  return (
    <div className="pt-3 sm:pt-4 pb-[var(--section-space)]">
      <Container>
        <article>
          {/* Header */}
          <CaseStudyHero project={project} />

          {/* Visual Showcase Piece */}
          <div className="my-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            <ProjectArtwork visual={project.visual} />
          </div>

          {/* Key Accomplishments / Highlights */}
          <section aria-labelledby="highlights-heading" className="my-16">
            <h2 id="highlights-heading" className="font-mono text-xs uppercase tracking-widest text-accent">
              Core Technical Highlights
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {project.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
                >
                  <span className="font-mono text-xs text-accent-secondary">
                    0{index + 1} {'//'}
                  </span>
                  <p className="mt-3 font-medium leading-relaxed text-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Problem & Context Section */}
          <section aria-labelledby="problem-heading" className="my-16 border-t border-border pt-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  Context & Challenge
                </span>
                <h2 id="problem-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  The Problem
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-foreground/90">{project.problem}</p>
              </div>
            </div>
          </section>

          {/* Technical Approach & Architecture Section */}
          <section aria-labelledby="approach-heading" className="my-16 border-t border-border pt-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  Engineering Breakdown
                </span>
                <h2 id="approach-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Approach & Architecture
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground/90">{project.approach}</p>

                <div className="mt-8 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
                    Architectural Decisions & Implementation
                  </h3>
                  <div className="grid gap-4">
                    {project.architecture.map((item, index) => {
                      const [title, description] = item.includes(':')
                        ? item.split(/:\s*(.+)/)
                        : [`Step ${index + 1}`, item];

                      return (
                        <div
                          key={index}
                          className="flex gap-4 rounded-xl border border-border bg-surface/30 p-5"
                        >
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold text-foreground">{title}</h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Outcomes & Lessons Learned Section */}
          <section aria-labelledby="outcomes-heading" className="my-16 border-t border-border pt-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  Reflections & Growth
                </span>
                <h2 id="outcomes-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Takeaways & Lessons
                </h2>
              </div>
              <div className="rounded-2xl border border-border bg-surface/40 p-8 sm:p-10">
                <p className="text-lg leading-relaxed text-muted">{project.outcomeOrLearning}</p>
              </div>
            </div>
          </section>

          {/* Related Projects */}
          <RelatedProjects projects={related} />
        </article>
      </Container>
    </div>
  );
}
