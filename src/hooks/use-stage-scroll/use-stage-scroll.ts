'use client';

import { useEffect, useRef, useState } from 'react';

export interface StageScrollState {
  // Current smoothly interpolated progress (0 to 1)
  current: number;
  // Raw target progress derived from scroll offset (0 to 1)
  target: number;
  // Scroll direction: 1 for down, -1 for up, 0 for stationary
  direction: number;
  // Scroll velocity (pixels per frame)
  velocity: number;
  // Active story step (0: intro, 1: headline, 2: architecture, 3: cta)
  activeStep: number;
}

// Global shared state ref so Three.js canvas and DOM overlays read identical progress
const sharedScrollState: StageScrollState = {
  current: 0,
  target: 0,
  direction: 0,
  velocity: 0,
  activeStep: 0,
};

const listeners = new Set<(state: StageScrollState) => void>();

export function useStageScroll() {
  const scrollStateRef = useRef<StageScrollState>(sharedScrollState);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const heroElement = document.getElementById('home');

      let normalized = 0;
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const totalScrollable = heroElement.offsetHeight - window.innerHeight;
        if (totalScrollable > 0) {
          const currentOffset = -rect.top;
          normalized = Math.min(Math.max(currentOffset / totalScrollable, 0), 1);
        } else {
          normalized = Math.min(Math.max(scrollY / 600, 0), 1);
        }
      } else {
        normalized = Math.min(Math.max(scrollY / 600, 0), 1);
      }

      const delta = scrollY - lastScrollY;
      const velocity = Math.abs(delta);
      const direction = delta > 0 ? 1 : delta < 0 ? -1 : 0;

      // Determine active story step based on scroll progress:
      // Step 0: Initial centered stage (0.00 - 0.12)
      // Step 1: Main editorial headline (0.12 - 0.42)
      // Step 2: Architecture & acoustic harmony (0.42 - 0.72)
      // Step 3: Call to action & work exploration (0.72 - 1.00)
      let activeStep = 0;
      if (normalized >= 0.72) {
        activeStep = 3;
      } else if (normalized >= 0.42) {
        activeStep = 2;
      } else if (normalized >= 0.12) {
        activeStep = 1;
      } else {
        activeStep = 0;
      }

      sharedScrollState.target = normalized;
      sharedScrollState.direction = direction;
      sharedScrollState.velocity = velocity;
      sharedScrollState.activeStep = activeStep;

      scrollStateRef.current = sharedScrollState;

      // Notify external DOM listeners if any
      listeners.forEach(listener => listener(sharedScrollState));

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return scrollStateRef;
}

/**
 * Hook for DOM overlay components to react to milestone step changes.
 * Re-renders only when activeStep changes (0, 1, 2, 3), saving frame budget.
 */
export function useStageStoryStep(): number {
  const [activeStep, setActiveStep] = useState<number>(() => sharedScrollState.activeStep);

  useEffect(() => {
    let currentStep = sharedScrollState.activeStep;
    const unsubscribe = (state: StageScrollState) => {
      if (state.activeStep !== currentStep) {
        currentStep = state.activeStep;
        setActiveStep(currentStep);
      }
    };

    listeners.add(unsubscribe);
    return () => {
      listeners.delete(unsubscribe);
    };
  }, []);

  return activeStep;
}

