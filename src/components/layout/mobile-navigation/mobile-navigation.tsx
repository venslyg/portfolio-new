'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { navigationItems, type SectionId } from '@/content/navigation';
import { ViewCvButton } from '@/components/ui/view-cv-button/view-cv-button';

type MobileNavigationProps = { activeSection: SectionId };

const emptySubscribe = () => () => {};

export function MobileNavigation({ activeSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Close on Escape & close when resizing to desktop (>= 1024px)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    function handleResize() {
      if (window.innerWidth >= 1024) setIsOpen(false);
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

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
    <>
      {/* 3-Line Animated Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl text-foreground transition-all duration-200 hover:border-accent/60 hover:bg-white/[0.12] hover:shadow-[0_0_20px_rgba(167,139,250,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <div className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
          <span className="h-0.5 w-full rounded-full bg-foreground" />
          <span className="h-0.5 w-full rounded-full bg-foreground" />
          <span className="h-0.5 w-full rounded-full bg-foreground" />
        </div>
      </button>

      {/* Fullscreen Mobile & Tablet Navigation Overlay via Portal to prevent UI overlap */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0b0c10] px-5 sm:px-8 py-5 animate-in fade-in duration-200"
          >
            {/* Top Bar inside Overlay: Brand Logo & Close Button */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center"
                aria-label="Vensly Gunasekara home"
              >
                <Image
                  src="/brand-logo.svg"
                  alt="VENSLY. Software & Sound"
                  width={150}
                  height={30}
                  priority
                  className="h-6 sm:h-7 w-auto"
                />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-foreground transition-all duration-200 hover:border-accent hover:bg-white/[0.15] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                aria-label="Close navigation menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation Links — Centered, Solid, Touch-Friendly */}
            <div className="my-auto flex w-full max-w-md flex-col gap-5 mx-auto py-6">
              <ul className="flex flex-col gap-2.5 w-full">
                {navigationItems.map(({ id, label, href }) => {
                  const active = isItemActive(id);
                  const targetHref = resolveHref(id, href);

                  return (
                    <li key={id} className="w-full">
                      <Link
                        href={targetHref}
                        aria-current={active ? 'location' : undefined}
                        onClick={() => setIsOpen(false)}
                        className={`flex min-h-13 w-full items-center justify-between rounded-2xl px-5 py-3 text-base sm:text-lg font-medium transition-all ${
                          active
                            ? 'border border-accent/60 bg-accent/20 text-accent shadow-[0_0_24px_rgba(167,139,250,0.25)]'
                            : 'border border-white/10 bg-white/[0.04] text-muted hover:border-white/25 hover:bg-white/[0.08] hover:text-foreground'
                        }`}
                      >
                        <span className="font-medium text-foreground">{label}</span>
                        <span className={`text-xs font-mono ${active ? 'text-accent font-semibold' : 'text-muted/60'}`}>
                          {active ? '● active' : '→'}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* CV Button Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <ViewCvButton variant="hero" className="w-full justify-center" />
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-mono text-muted/60">
              <span>Vensly Gunasekara</span>
              <span>Software &amp; Sound</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
