'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Project } from '@/content/projects';
import { ProjectCard } from '@/components/projects/project-card/project-card';

type ProjectSliderProps = {
  projects: readonly Project[];
};

export function ProjectSlider({ projects }: ProjectSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update active slide index and button states on scroll
  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active card
    const card = el.firstElementChild as HTMLElement | null;
    if (card) {
      const cardWidth = card.offsetWidth + 24; // width + gap
      const newIndex = Math.min(
        Math.max(Math.round(scrollLeft / cardWidth), 0),
        projects.length - 1
      );
      setActiveIndex(newIndex);
    }
  }, [projects.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function scroll(direction: 'left' | 'right') {
    const el = trackRef.current;
    if (!el) return;

    const card = el.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 400;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  function scrollToIndex(index: number) {
    const el = trackRef.current;
    if (!el) return;

    const card = el.children[index] as HTMLElement | null;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scroll('right');
    }
  }

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected Projects Carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ================= CONTROLS & COUNTER HEADER ================= */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Slide Counter & Hint */}
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-border/80 bg-surface/60 px-3 py-1 font-mono text-xs tracking-wider text-accent">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <span className="hidden font-mono text-xs text-muted/80 sm:inline">
            Swipe or use arrows to explore
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`flex h-11 w-11 items-center justify-center rounded-control border text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              canScrollLeft
                ? 'border-border bg-surface text-foreground hover:border-accent hover:bg-surface/80'
                : 'cursor-not-allowed border-border/40 bg-surface/20 text-muted/40'
            }`}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`flex h-11 w-11 items-center justify-center rounded-control border text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              canScrollRight
                ? 'border-border bg-surface text-foreground hover:border-accent hover:bg-surface/80'
                : 'cursor-not-allowed border-border/40 bg-surface/20 text-muted/40'
            }`}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      {/* ================= SCROLLABLE HORIZONTAL TRACK ================= */}
      <div
        ref={trackRef}
        className="flex w-full gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: 'x mandatory',
          touchAction: 'pan-x pan-y',
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.slug}
            className={`w-[85vw] max-w-[480px] shrink-0 transition-opacity duration-300 sm:w-[420px] lg:w-[460px] ${
              idx === activeIndex ? 'opacity-100' : 'opacity-85 hover:opacity-100'
            }`}
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* ================= DOT INDICATORS ================= */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {projects.map((project, idx) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
              idx === activeIndex
                ? 'w-7 bg-accent'
                : 'w-2 bg-border hover:bg-muted/60'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${project.title}`}
          />
        ))}
      </div>
    </div>
  );
}
