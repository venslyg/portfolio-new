'use client';

import { MobileNavigation } from '@/components/layout/mobile-navigation/mobile-navigation';
import { NavigationLinks } from '@/components/layout/navigation-links/navigation-links';
import { useActiveSection } from '@/hooks/use-active-section/use-active-section';

export function Navigation() {
  const activeSection = useActiveSection();

  return (
    <nav aria-label="Primary navigation">
      <NavigationLinks activeSection={activeSection} className="hidden items-center gap-2 md:flex" />
      <div className="md:hidden">
        <MobileNavigation activeSection={activeSection} />
      </div>
    </nav>
  );
}
