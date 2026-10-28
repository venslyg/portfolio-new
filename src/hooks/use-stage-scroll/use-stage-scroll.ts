'use client';

import { useEffect, useRef } from 'react';

export interface StageScrollState {
  // Current smoothly interpolated progress (0 to 1)
  current: number;
  // Raw target progress derived from scroll offset (0 to 1)
  target: number;
  // Scroll direction: 1 for down, -1 for up, 0 for stationary
  direction: number;
  // Scroll velocity (pixels per frame)
  velocity: number;
}

export function useStageScroll() {
  const scrollStateRef = useRef<StageScrollState>({
    current: 0,
    target: 0,
    direction: 0,
    velocity: 0,
  });

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const heroElement = document.getElementById('home');
      // Normalize progress across the hero section range (~600-900px)
      const range = heroElement
        ? Math.max(heroElement.offsetHeight * 0.85, 450)
        : 650;

      const normalized = Math.min(Math.max(scrollY / range, 0), 1);
      const delta = scrollY - lastScrollY;

      scrollStateRef.current.target = normalized;
      scrollStateRef.current.direction = delta > 0 ? 1 : delta < 0 ? -1 : 0;
      scrollStateRef.current.velocity = Math.abs(delta);
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
