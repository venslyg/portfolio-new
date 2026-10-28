'use client';

import { MobileNavigation } from '@/components/layout/mobile-navigation/mobile-navigation';
import { NavigationLinks } from '@/components/layout/navigation-links/navigation-links';
import { useActiveSection } from '@/hooks/use-active-section/use-active-section';

export function Navigation() {
  const activeSection = useActiveSection();

  return (
    <nav aria-label="Primary navigation" className="flex items-center">
      {/* Centered Desktop Navigation Capsule */}
      <div className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 items-center justify-center pointer-events-auto">
        <NavigationLinks activeSection={activeSection} />
      </div>

      {/* Hamburger Navigation for Mobile and Tablet (< 1024px) */}
      <div className="lg:hidden flex items-center">
        <MobileNavigation activeSection={activeSection} />
      </div>
    </nav>
  );
}
