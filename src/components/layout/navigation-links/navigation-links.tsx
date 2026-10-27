'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems, type SectionId } from '@/content/navigation';

type NavigationLinksProps = {
  activeSection: SectionId;
  className?: string;
  onNavigate?: (id: SectionId) => void;
};

export function NavigationLinks({ activeSection, className = '', onNavigate }: NavigationLinksProps) {
  const pathname = usePathname();
  const isMobile = className.includes('grid');

  function isItemActive(id: SectionId) {
    if (pathname.startsWith('/projects')) return id === 'work';
    if (pathname === '/music') return id === 'music';
    if (pathname === '/about') return id === 'about';
    if (pathname === '/') return activeSection === id;
    return false;
  }

  function resolveHref(id: SectionId, defaultHref: string) {
    if (id === 'contact') return '/#contact';
    if (id === 'home') return '/';
    if (pathname === '/' && id !== 'work') return `/#${id}`;
    return defaultHref;
  }

  return (
    <ul
      className={
        isMobile
          ? className
          : `inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl ${className}`
      }
    >
      {navigationItems.map(({ id, label, href }) => {
        const active = isItemActive(id);
        const targetHref = resolveHref(id, href);

        return (
          <li key={id}>
            <Link
              href={targetHref}
              aria-current={active ? 'location' : undefined}
              onClick={onNavigate ? () => onNavigate(id) : undefined}
              className={
                isMobile
                  ? `flex min-h-11 w-full items-center rounded-xl px-3.5 text-sm font-medium transition-all ${
                      active
                        ? 'border border-accent/40 bg-accent/15 text-accent shadow-sm'
                        : 'border border-transparent text-muted hover:border-white/10 hover:bg-white/[0.06] hover:text-foreground'
                    }`
                  : `inline-flex min-h-9 items-center justify-center rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      active
                        ? 'border border-white/15 bg-white/[0.12] text-accent shadow-[0_2px_12px_rgba(167,139,250,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]'
                        : 'text-muted hover:bg-white/[0.06] hover:text-foreground'
                    }`
              }
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
