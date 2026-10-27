'use client';

import { useEffect, useRef } from 'react';

export function GlowingCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
    let isHoveringInteractive = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (glowRef.current) glowRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check if hovering over links or buttons
      const target = e.target as HTMLElement | null;
      isHoveringInteractive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select'),
      );
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const render = () => {
      // Smooth lerp trailing movement
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const targetScale = isHoveringInteractive ? 1.6 : 1.0;
        ringRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${targetScale})`;
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
      {/* 1. Large Ambient Soft Luminous Glow */}
      <div
        ref={glowRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 h-[280px] w-[280px] rounded-full bg-radial from-accent/18 via-accent-secondary/8 to-transparent blur-2xl transition-opacity duration-300"
      />
      {/* 2. Focused Glowing Halo around the normal cursor */}
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 h-7 w-7 rounded-full border border-accent/40 bg-accent/5 shadow-[0_0_14px_rgba(167,139,250,0.6)] backdrop-blur-[1px] transition-[opacity,transform] duration-150 ease-out"
      />
    </div>
  );
}
