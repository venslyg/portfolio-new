import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>VENSLY. <span className="mx-2 text-accent" aria-hidden="true">/</span> Code in rhythm.</p>
        <p>Software engineering meets music.</p>
      </Container>
    </footer>
  );
}
