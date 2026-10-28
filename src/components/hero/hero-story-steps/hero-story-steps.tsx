'use client';

import { Button } from '@/components/ui/button/button';
import { ViewCvButton } from '@/components/ui/view-cv-button/view-cv-button';

interface HeroStoryStepsProps {
  activeStep: number;
}

export function HeroStorySteps({ activeStep }: HeroStoryStepsProps) {
  // activeStep: 0 = Pristine Centered Stage with Scroll Indicator
  // activeStep >= 1 = Full Editorial Content Revealed alongside Dispersing Stage
  const isContentVisible = activeStep >= 1;

  return (
    <div className="relative z-20 h-full w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center pointer-events-none">
      <div className="relative w-full max-w-xl xl:max-w-2xl flex flex-col items-start text-left">
        <div
          className={`flex flex-col items-start text-left transition-all duration-700 ease-out ${
            isContentVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          aria-hidden={!isContentVisible}
        >
          {/* Engineering Role Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-surface/85 px-4 py-1.5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-secondary" />
            <p className="font-mono text-xs tracking-[0.16em] text-accent-secondary uppercase">
              Vensly Gunasekara {'//'} Full-Stack Software Engineer
            </p>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="text-display font-semibold tracking-tight text-balance text-foreground drop-shadow-lg">
            Engineering ideas{' '}
            <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
              in rhythm.
            </span>
          </h1>

          {/* Bio Description */}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg lg:text-xl drop-shadow-md">
            I build web and mobile applications that turn real-world problems into
            resilient software. Music brings acoustic harmony to the way I engineer digital systems.
          </p>

          {/* Primary Action Buttons */}
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
