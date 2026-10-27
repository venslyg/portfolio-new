'use client';

import { useEffect, useState } from 'react';
import { navigationItems, type SectionId } from '@/content/navigation';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    let animationFrame = 0;

    function updateActiveSection() {
      let current: SectionId = 'home';

      for (const { id } of navigationItems) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 180) current = id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = 'contact';
      }

      setActiveSection(current);
      animationFrame = 0;
    }

    function scheduleUpdate() {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return activeSection;
}
