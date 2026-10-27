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
    <ul className={className}>
      {navigationItems.map(({ id, label, href }) => {
        const active = isItemActive(id);
        const targetHref = resolveHref(id, href);

        return (
          <li key={id}>
            <Link
              href={targetHref}
              aria-current={active ? 'location' : undefined}
              onClick={onNavigate ? () => onNavigate(id) : undefined}
              className="inline-flex min-h-11 w-full items-center rounded-control px-3 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground aria-[current=location]:text-accent"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
