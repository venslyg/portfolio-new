import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container/container';
import { experience, profile, skillGroups } from '@/content/profile';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Vensly Gunasekara — full-stack software engineer, NIBM graduate, developer at The Heaven’s Code, and musician exploring code through rhythm.',
};

export default function AboutPage() {
  return (
    <div className="py-[var(--section-space)]">
      <Container>
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            About {'//'} Engineering Journey
          </p>
          <h1 className="mt-4 text-display font-bold tracking-tight text-foreground text-balance">
            Engineering ideas with cadence and craft.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            I’m a full-stack software engineer based in Sri Lanka. I build web applications,
            mobile tools, and backend services that solve operational challenges with clarity and speed.
          </p>
        </header>

        {/* Narrative & Background */}
        <section aria-labelledby="story-heading" className="my-16 border-t border-border pt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Background & Story
              </span>
              <h2 id="story-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                How I build software
              </h2>
            </div>
            <div className="space-y-6 text-muted">
              <p className="text-lg leading-relaxed text-foreground/90">
                My software journey began with curiosity about how complex systems fit together.
                Through formal education at NIBM—earning both a Diploma and Higher National Diploma in Software Engineering—I
                developed a deep appreciation for strong software fundamentals, data structures, and relational modeling.
              </p>
              <p className="leading-relaxed">
                At <span className="font-medium text-foreground">The Heaven’s Code</span>, I began as a full-stack
                development intern before stepping into a full-time engineering role. Here, I work on production-critical
                applications spanning point-of-sale systems, e-commerce platforms, and organization registries—collaborating
                closely across Angular, Spring Boot, and PostgreSQL.
              </p>
              <p className="leading-relaxed">
                Whether implementing ACID-compliant checkout routines or tuning mobile SQLite schemas for offline field use,
                I believe software should be reliable, intuitive to operate, and structured so the next developer can build
                upon it with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Engineering Philosophy: Music & Code */}
        <section aria-labelledby="philosophy-heading" className="my-16 border-t border-border pt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent-secondary">
                Creative Perspective
              </span>
              <h2 id="philosophy-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Code meets music
              </h2>
            </div>
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <h3 className="text-xl font-semibold text-foreground">Listening before playing.</h3>
              <p className="mt-4 leading-relaxed text-muted">
                Music and software share an innate symmetry: rhythm, harmonic progression, timing, and restraint.
                Playing keys in church taught me that before you play a note, you must listen to the room and understand
                the acoustics.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                In software engineering, that same instinct translates to listening to the business problem before choosing
                a framework, prioritizing readability before cleverness, and designing architectures that move in natural harmony
                with user needs.
              </p>
              <div className="mt-6">
                <Link
                  href="/music"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
                >
                  <span>Explore the Music Lab project</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section aria-labelledby="experience-heading" className="my-16 border-t border-white/[0.08] pt-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Career Progression
              </span>
              <h2 id="experience-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Experience & Education
              </h2>
            </div>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)] sm:p-8"
                >
                  <span className="font-mono text-xs text-accent">{item.period}</span>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="font-mono text-sm text-muted">{item.organization}</p>
                  <p className="mt-4 leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Capabilities Matrix */}
        <section aria-labelledby="skills-heading" className="my-16 border-t border-white/[0.08] pt-14">
          <div className="mb-10 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Core Competencies
            </span>
            <h2 id="skills-heading" className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Technical toolkit
            </h2>
            <p className="mt-3 text-muted">
              Technologies I work with daily to design, ship, and maintain resilient applications.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map(group => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.05]"
              >
                <h3 className="font-semibold text-foreground">{group.title}</h3>
                <p className="mt-1 text-xs text-muted">{group.description}</p>
                <ul className="mt-5 space-y-2">
                  {group.items.map(item => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-mono text-xs text-foreground/90"
                    >
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-20 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center sm:p-12 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Let’s collaborate on your next project.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Whether you’re seeking a full-stack engineer or need guidance on web and mobile development,
            I’m always open to discussing new opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-control bg-accent px-6 font-semibold text-background transition-colors hover:bg-foreground"
            >
              <span>{profile.email}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center gap-2 rounded-control border border-border bg-surface px-6 font-semibold text-foreground transition-colors hover:border-accent"
            >
              <span>View engineering case studies</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
