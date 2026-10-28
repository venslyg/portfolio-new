'use client';

import { Button } from '@/components/ui/button/button';
import { ViewCvButton } from '@/components/ui/view-cv-button/view-cv-button';

interface HeroStoryStepsProps {
  activeStep: number;
}

export function HeroStorySteps({ activeStep }: HeroStoryStepsProps) {
  return (
    <div className="relative z-20 h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center pointer-events-none">
      <div className="relative w-full max-w-xl xl:max-w-2xl min-h-[380px] flex items-center">
        {/* ================= STEP 1: EDITORIAL HEADLINE (Scroll ~0.15 - 0.42) ================= */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-start text-left transition-all duration-700 ease-out ${
            activeStep === 1
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : activeStep > 1
              ? 'opacity-0 -translate-y-8 pointer-events-none'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          aria-hidden={activeStep !== 1}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-surface/80 px-4 py-1.5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-secondary" />
            <p className="font-mono text-xs tracking-[0.16em] text-accent-secondary uppercase">
              Vensly Gunasekara {'//'} Full-Stack Software Engineer
            </p>
          </div>

          <h1 className="text-display font-semibold tracking-tight text-balance text-foreground drop-shadow-lg">
            Engineering ideas{' '}
            <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
              in rhythm.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg lg:text-xl drop-shadow-md">
            I build web and mobile applications that turn real-world problems into
            resilient software. Music brings acoustic harmony to the way I engineer digital systems.
          </p>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span>Scroll further to deconstruct the architecture</span>
          </div>
        </div>

        {/* ================= STEP 2: ACOUSTIC ARCHITECTURE DEEP-DIVE (Scroll ~0.42 - 0.72) ================= */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-start text-left transition-all duration-700 ease-out ${
            activeStep === 2
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : activeStep > 2
              ? 'opacity-0 -translate-y-8 pointer-events-none'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          aria-hidden={activeStep !== 2}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
              Acoustic Architecture {'//'} Core Philosophy
            </p>
          </div>

          <h2 className="text-display font-semibold tracking-tight text-balance text-foreground drop-shadow-lg">
            Where code meets{' '}
            <span className="bg-gradient-to-r from-accent-secondary to-accent bg-clip-text text-transparent">
              musical cadence.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg drop-shadow-md">
            Complex distributed systems require rhythm, timing, and harmonic balance. Every microservice,
            state transition, and asynchronous pipeline operates like an instrument in a synchronized orchestra.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 pt-1">
            {['Scalable Microservices', 'Real-time Telemetry', 'Acoustic UI/UX', 'Resilient Full-Stack'].map(tag => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-zinc-300 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= STEP 3: ACTION & WORK EXPLORATION (Scroll ~0.72 - 1.00) ================= */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-start text-left transition-all duration-700 ease-out ${
            activeStep === 3
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : activeStep < 3
              ? 'opacity-0 translate-y-8 pointer-events-none'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
          aria-hidden={activeStep !== 3}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <p className="font-mono text-xs tracking-[0.16em] text-emerald-400 uppercase">
              Available For Engineering Roles {'//'} 2026
            </p>
          </div>

          <h2 className="text-display font-semibold tracking-tight text-balance text-foreground drop-shadow-lg">
            Ready to compose{' '}
            <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
              your next breakthrough?
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg drop-shadow-md">
            Let’s build high-performance web systems and digital products that solve tough challenges with precision and elegance.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            <Button href="#contact">
              Let’s talk
            </Button>
            <ViewCvButton variant="hero" />
            <Button variant="secondary" href="#work">
              Selected Work ↓
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
