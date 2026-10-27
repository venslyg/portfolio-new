'use client';

import { useRef, type KeyboardEvent } from 'react';
import { NavigationLinks } from '@/components/layout/navigation-links/navigation-links';
import { ViewCvButton } from '@/components/ui/view-cv-button/view-cv-button';
import type { SectionId } from '@/content/navigation';
import styles from './mobile-navigation.module.css';

type MobileNavigationProps = { activeSection: SectionId };

export function MobileNavigation({ activeSection }: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  function closeOnEscape(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key === 'Escape' && detailsRef.current?.open) {
      event.preventDefault();
      detailsRef.current.open = false;
      summaryRef.current?.focus();
    }
  }

  function navigateToSection(id: SectionId) {
    if (detailsRef.current) detailsRef.current.open = false;
    document.getElementById(id)?.focus({ preventScroll: true });
  }

  return (
    <details ref={detailsRef} onKeyDown={closeOnEscape} className={styles.menu}>
      <summary ref={summaryRef} className={styles.toggle}>
        Menu{' '}
        <span aria-hidden="true" className={styles.indicator}>
          +
        </span>
      </summary>
      <div className={styles.panel}>
        <NavigationLinks activeSection={activeSection} onNavigate={navigateToSection} className="grid gap-1" />
        <div className="mt-3 border-t border-white/10 pt-3">
          <ViewCvButton variant="hero" className="w-full justify-center" />
        </div>
      </div>
    </details>
  );
}

