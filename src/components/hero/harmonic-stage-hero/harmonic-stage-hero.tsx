'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';
import { useStageStoryStep } from '@/hooks/use-stage-scroll/use-stage-scroll';
import { ScrollPrompt } from '@/components/hero/scroll-prompt/scroll-prompt';
import { HeroStorySteps } from '@/components/hero/hero-story-steps/hero-story-steps';

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
  const activeStep = useStageStoryStep();

  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative w-full h-[380vh] bg-background"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center">
        {/* Ambient Atmospheric Glowing Lights */}
        <div
          className="pointer-events-none absolute -top-40 left-1/3 -z-10 h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-8 right-10 -z-10 h-[480px] w-[600px] rounded-full bg-accent-secondary/8 blur-[140px]"
          aria-hidden="true"
        />

        {/* 1. Full-Bleed 3D WebGL Canvas Layer (Spans entire screen so 3D model is never cut in half) */}
        {isClient && (
          <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <DynamicHarmonicStageScene reducedMotion={prefersReducedMotion} />
          </div>
        )}

        {/* 2. Left-Side Subtle Vignette Gradient for Crystal Clear Text Readability */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full sm:w-[65%] lg:w-[48%] bg-gradient-to-r from-background/95 via-background/60 to-transparent transition-opacity duration-700"
          style={{ opacity: activeStep > 0 ? 1 : 0.3 }}
          aria-hidden="true"
        />

        {/* 3. Bottom Subtle Ground Fade into Next Section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />

        {/* 4. Nuralis Labs-style Initial Scroll Indicator (Active when activeStep === 0) */}
        <ScrollPrompt visible={activeStep === 0} />

        {/* 5. Staged Editorial Narrative Cards (Step 1, Step 2, Step 3 on Left) */}
        <HeroStorySteps activeStep={activeStep} />
      </div>
    </section>
  );
}
