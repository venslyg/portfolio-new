import Link from "next/link";
import { Container } from "@/components/layout/container";

export function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex min-h-24 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
        <Link href="/" aria-label="Vensly home" className="inline-flex min-h-11 items-center text-xl font-bold tracking-tight">
          VENSLY<span className="text-accent">.</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-2 sm:gap-6">
          <Link href="/#home" className="inline-flex min-h-11 items-center px-3 text-sm text-muted transition-colors hover:text-foreground">Home</Link>
          <Link href="/#contact" className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-accent transition-colors hover:text-foreground">Contact</Link>
        </nav>
      </Container>
    </header>
  );
}
