'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
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

// Lazy-load client 3D scene with SSR disabled for optimal loading & zero hydration mismatch
const DynamicMusicDispersionScene = dynamic(
  () =>
    import('@/components/three/music-dispersion-scene/music-dispersion-scene').then(
      mod => mod.MusicDispersionScene,
    ),
  { ssr: false },
);

export function MusicalDispersionHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  const isClient = useSyncExternalStore(subscribeClient, () => true, () => false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  // Discrete milestone states to trigger smooth CSS "pop" transitions without high-frequency re-renders
  const [activeMilestones, setActiveMilestones] = useState({
    milestone1: false, // 25% scroll: Full-Stack Architecture
    milestone2: false, // 50% scroll: Audio Synthesis & DSP
    milestone3: false, // 75% scroll: Cross-Platform Mobile
  });

  useEffect(() => {
    // Native scroll calculation without wheel hijacking
    let ticking = false;
    const handleScroll = () => {
      if (!containerRef.current || ticking) return;

      window.requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollableDistance = rect.height - window.innerHeight;

        if (totalScrollableDistance > 0) {
          const rawProgress = -rect.top / totalScrollableDistance;
          const clamped = Math.max(0, Math.min(1, rawProgress));
          scrollProgressRef.current = clamped;

          // Milestone triggers for the ThreadLab detail pop-ins
          const m1 = clamped >= 0.22 && clamped < 0.95;
          const m2 = clamped >= 0.45 && clamped < 0.95;
          const m3 = clamped >= 0.68 && clamped < 0.95;

          setActiveMilestones(prev => {
            if (prev.milestone1 !== m1 || prev.milestone2 !== m2 || prev.milestone3 !== m3) {
              return { milestone1: m1, milestone2: m2, milestone3: m3 };
            }
            return prev;
          });
        }
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative w-full min-h-[175svh]"
    >
      {/* Sticky 100vh stage that stays pinned while user scrolls through the 175svh track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* ================= FULL-SCREEN 3D BACKGROUND CANVAS ================= */}
        <div className="absolute inset-0 h-full w-full z-0 pointer-events-none">
          {prefersReducedMotion ? (
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/hero-music-dispersion.png"
                alt="Polished chrome treble clef decomposing into sound ribbons and crystal shards"
                fill
                priority
                className="object-cover opacity-40"
              />
            </div>
          ) : (
            isClient && (
              <div className="h-full w-full">
                <DynamicMusicDispersionScene scrollProgressRef={scrollProgressRef} />
              </div>
            )
          )}
        </div>

        {/* Ambient atmospheric gradients */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 right-10 -z-10 h-[400px] w-[500px] rounded-full bg-accent-secondary/8 blur-[130px]"
          aria-hidden="true"
        />

        {/* Foreground Content Container */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1700px] items-center px-6 sm:px-10 lg:px-16 pointer-events-none">
          {/* ================= EDITORIAL HEADLINE & CTAS ================= */}
          <div className="w-full max-w-2xl py-6 lg:py-12 pointer-events-auto">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/70 px-3.5 py-1.5 backdrop-blur-md">
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

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Button href="#contact">
                Let’s talk
              </Button>
              <ViewCvButton variant="hero" />
            </div>
          </div>

          {/* ================= THREADLAB-STYLE FULL-SCREEN POPPING DETAIL CARDS ================= */}
          {/* Pop Card 1: Full-Stack Architecture (Pops at 22% scroll) */}
          <div
            className={`pointer-events-auto absolute bottom-12 left-6 sm:left-12 z-20 max-w-[280px] rounded-2xl border border-accent/40 bg-surface/85 p-4 shadow-xl backdrop-blur-lg transition-all duration-500 ease-out ${
              activeMilestones.milestone1
                ? 'translate-y-0 scale-100 opacity-100 shadow-accent/15'
                : 'translate-y-8 scale-90 opacity-0'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-[10px] tracking-wider text-accent uppercase">
                Core Systems
              </span>
            </div>
            <h3 className="mt-1 text-sm font-bold text-foreground">
              Full-Stack Architecture
            </h3>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              High-throughput backend APIs with Spring Boot, Java, Go &amp; PostgreSQL.
            </p>
          </div>

          {/* Pop Card 2: Audio Synthesis & DSP (Pops at 45% scroll) */}
          <div
            className={`pointer-events-auto absolute top-24 right-6 sm:right-16 z-20 max-w-[280px] rounded-2xl border border-accent-secondary/40 bg-surface/85 p-4 shadow-xl backdrop-blur-lg transition-all duration-500 ease-out ${
              activeMilestones.milestone2
                ? 'translate-y-0 scale-100 opacity-100 shadow-accent-secondary/15'
                : '-translate-y-8 scale-90 opacity-0'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-accent-secondary" />
              <span className="font-mono text-[10px] tracking-wider text-accent-secondary uppercase">
                Music Tech
              </span>
            </div>
            <h3 className="mt-1 text-sm font-bold text-foreground">
              Audio Synthesis &amp; DSP
            </h3>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              Web Audio API &amp; autocorrelation algorithms behind Key Detective.
            </p>
          </div>

          {/* Pop Card 3: Mobile & Cross-Platform (Pops at 68% scroll) */}
          <div
            className={`pointer-events-auto absolute bottom-28 right-6 sm:right-20 z-20 max-w-[280px] rounded-2xl border border-border bg-surface/90 p-4 shadow-xl backdrop-blur-lg transition-all duration-500 ease-out ${
              activeMilestones.milestone3
                ? 'translate-y-0 scale-100 opacity-100 shadow-accent/20'
                : 'translate-y-8 scale-90 opacity-0'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] tracking-wider text-emerald-400 uppercase">
                Cross-Platform
              </span>
            </div>
            <h3 className="mt-1 text-sm font-bold text-foreground">
              Mobile Engineering
            </h3>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              Fluid, offline-ready apps built with Flutter, Ionic, and Firebase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
