import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Section id="home" labelledBy="intro-heading" className="flex min-h-[65svh] items-center">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs tracking-[0.18em] text-accent-secondary uppercase">
            Vensly Benaya · Full-Stack Software Engineer
          </p>
          <h1 id="intro-heading" className="text-display max-w-4xl font-semibold tracking-tight text-balance">
            Engineering ideas <span className="text-accent">in rhythm.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            I bring software engineering and a love of music together.
            A collection of my work and creative explorations is taking shape here.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact">Contact information <span aria-hidden="true">↗</span></Button>
          </div>
        </div>
      </Section>
      <Section id="contact" labelledBy="contact-heading" className="border-t border-border bg-surface">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs tracking-[0.18em] text-accent uppercase">Stay connected</p>
          <h2 id="contact-heading" className="text-heading font-semibold tracking-tight">Good work starts with a conversation.</h2>
          <p className="mt-5 leading-relaxed text-muted">
            Public contact details will be added soon. This portfolio is a work in progress.
          </p>
        </div>
      </Section>
    </>
  );
}
