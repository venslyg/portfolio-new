'use client';

import { useEffect, useRef } from 'react';

export function GlowingCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on precise pointer devices with hover capability
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (glowRef.current) glowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const render = () => {
      // Smooth lerp trailing movement
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Ambient Soft Luminous Glow tracking the custom precision cursor */}
      <div
        ref={glowRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 h-[220px] w-[220px] rounded-full bg-radial from-accent/15 via-accent-secondary/5 to-transparent blur-2xl transition-opacity duration-300"
      />
    </div>
  );
}
