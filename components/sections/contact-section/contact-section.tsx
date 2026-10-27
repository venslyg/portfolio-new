import { Section } from '@/components/layout/section/section';
import { SectionHeading } from '@/components/ui/section-heading/section-heading';
import { profile } from '@/content/profile';

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="border-t border-border bg-surface">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="contact-heading"
          eyebrow="06 / Get in touch"
          title="Have an idea? Let’s talk."
          description="A project, a role, or a conversation about software and music. I’d be glad to hear from you."
        />
        <div>
          <a
            href={'mailto:' + profile.email}
            className="inline-flex min-h-12 max-w-full items-center gap-3 rounded-control text-lg font-medium text-accent underline decoration-accent/40 underline-offset-8 transition-colors hover:text-foreground sm:text-xl"
          >
            <span className="break-all">{profile.email}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <ul aria-label="Social profiles" className="mt-6 flex flex-wrap gap-6">
            <li>
              <a
                href={profile.github}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
