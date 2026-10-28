import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.12] bg-gradient-to-b from-white/[0.08] via-surface/40 to-surface/20 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_10px_35px_0_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-colors duration-300">
      <div className="relative mx-auto flex min-h-20 w-full max-w-[1700px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-16 py-3">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          aria-label="Vensly Gunasekara home"
          className="inline-flex min-h-11 shrink-0 items-center transition-opacity hover:opacity-85 focus-visible:rounded-control z-20"
        >
          <Image
            src="/brand-logo.svg"
            alt="VENSLY. Software & Sound"
            width={160}
            height={32}
            priority
            className="h-6 sm:h-7 md:h-8 w-auto"
          />
        </Link>

        {/* Center: Desktop Navigation & Right: Mobile/Tablet Hamburger */}
        <Navigation />
      </div>
    </header>
  );
}
