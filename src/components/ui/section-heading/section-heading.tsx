type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-14">
      <p className="mb-4 font-mono text-xs tracking-[0.16em] text-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="text-heading font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && <p className="mt-5 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
