import type { ComponentPropsWithoutRef } from "react";
import { Container } from "@/components/layout/container";

type SectionProps = ComponentPropsWithoutRef<"section"> & { labelledBy: string };

export function Section({ children, className = "", labelledBy, ...props }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={`py-[var(--section-space)] ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
