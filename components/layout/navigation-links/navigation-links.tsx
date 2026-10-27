import Link from 'next/link';
import { navigationItems, type SectionId } from '@/content/navigation';

type NavigationLinksProps = {
  activeSection: SectionId;
  className?: string;
  onNavigate?: (id: SectionId) => void;
};

export function NavigationLinks({ activeSection, className = '', onNavigate }: NavigationLinksProps) {
  return (
    <ul className={className}>
      {navigationItems.map(({ id, label }) => (
        <li key={id}>
          <Link
            href={'/#' + id}
            aria-current={activeSection === id ? 'location' : undefined}
            onClick={onNavigate ? () => onNavigate(id) : undefined}
            className="inline-flex min-h-11 w-full items-center rounded-control px-3 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground aria-[current=location]:text-accent"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
