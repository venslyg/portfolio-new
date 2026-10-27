import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/layout/navigation/navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 w-full max-w-[1700px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16 py-3">
        <Link
          href="/"
          aria-label="Vensly Gunasekara home"
          className="inline-flex min-h-11 shrink-0 items-center transition-opacity hover:opacity-85 focus-visible:rounded-control"
        >
          <Image
            src="/brand-logo.svg"
            alt="VENSLY. Software & Sound"
            width={160}
            height={32}
            priority
            className="h-7 sm:h-8 w-auto"
          />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
