'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Project } from '@/content/projects';
import { ProjectCard } from '@/components/projects/project-card/project-card';

type ProjectSliderProps = {
  projects: readonly Project[];
};

export function ProjectSlider({ projects }: ProjectSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Translate vertical wheel scrolls over the carousel/controls into horizontal slider movement
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = track.scrollLeft <= 5;
        const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;

        // If scrolling forward and not at end, or backward and not at start
        if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
          e.preventDefault();
          track.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

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
      ref={containerRef}
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
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1 font-mono text-xs tracking-wider text-accent backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
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
            className={`flex h-11 w-11 items-center justify-center rounded-control border text-sm backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer ${
              canScrollLeft
                ? 'border-white/10 bg-white/[0.05] text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)] hover:border-accent hover:bg-white/[0.12] hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)]'
                : 'cursor-not-allowed border-white/[0.04] bg-white/[0.02] text-muted/30'
            }`}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`flex h-11 w-11 items-center justify-center rounded-control border text-sm backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer ${
              canScrollRight
                ? 'border-white/10 bg-white/[0.05] text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)] hover:border-accent hover:bg-white/[0.12] hover:shadow-[0_4px_20px_rgba(167,139,250,0.25)]'
                : 'cursor-not-allowed border-white/[0.04] bg-white/[0.02] text-muted/30'
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
            className={`w-[82vw] max-w-[340px] shrink-0 transition-opacity duration-300 sm:w-[350px] md:w-[370px] lg:w-[390px] ${
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
            className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer ${
              idx === activeIndex
                ? 'w-7 bg-accent shadow-[0_0_12px_rgba(167,139,250,0.6)]'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}: ${project.title}`}
          />
        ))}
      </div>
    </div>
  );
}
