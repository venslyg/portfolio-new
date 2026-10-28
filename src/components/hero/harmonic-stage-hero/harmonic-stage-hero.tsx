'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button/button';
import { ViewCvButton } from '@/components/ui/view-cv-button/view-cv-button';

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function subscribeClient() {
  return () => {};
}

// Lazy-load client 3D Harmonic Stage scene with SSR disabled for optimal loading
const DynamicHarmonicStageScene = dynamic(
  () =>
    import('@/components/three/harmonic-stage-scene/harmonic-stage-scene').then(
      mod => mod.HarmonicStageScene
    ),
  { ssr: false }
);

export function HarmonicStageHero() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const isClient = useSyncExternalStore(subscribeClient, () => true, () => false);

  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:py-16 min-h-[calc(100vh-5rem)] flex items-center"
    >
      {/* Background ambient glowing atmospheric lights */}
      <div
        className="pointer-events-none absolute -top-40 left-1/3 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 -z-10 h-[450px] w-[550px] rounded-full bg-accent-secondary/8 blur-[130px]"
        aria-hidden="true"
      />

      {/* Main Content Layout Container */}
      <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1.25fr] lg:gap-12 xl:grid-cols-[1fr_1.3fr]">
          {/* ================= LEFT: EDITORIAL HEADLINE & CTAS ================= */}
          <div className="z-10 py-2 sm:py-6 lg:py-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-secondary" />
              <p className="font-mono text-xs tracking-[0.16em] text-accent-secondary uppercase">
                Vensly Gunasekara {'//'} Full-Stack Software Engineer
              </p>
            </div>

            <h1
              id="hero-title"
              className="text-display font-semibold tracking-tight text-balance text-foreground drop-shadow-md"
            >
              Engineering ideas{' '}
              <span className="bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
                in rhythm.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-xl drop-shadow-sm">
              I build web and mobile applications that turn real-world problems into
              resilient software. Music brings acoustic harmony to the way I engineer digital systems.
            </p>

            {/* CTAs with Let's talk and View CV */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Button href="#contact">
                Let’s talk
              </Button>
              <ViewCvButton variant="hero" />
            </div>
          </div>

          {/* ================= RIGHT: 3D FLOATING HARMONIC STAGE ================= */}
          <div className="relative h-[340px] sm:h-[460px] md:h-[520px] lg:h-[620px] xl:h-[680px] w-full flex items-center justify-center">
            {/* Atmospheric Stage Glow Backdrop */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-accent-secondary/5 to-transparent blur-2xl"
              aria-hidden="true"
            />

            {isClient && (
              <div className="relative z-10 h-full w-full">
                <DynamicHarmonicStageScene reducedMotion={prefersReducedMotion} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
