import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type SharedProps = { variant?: 'primary' | 'secondary' };
type ButtonProps = SharedProps &
  ((ComponentPropsWithoutRef<typeof Link> & { href: string }) | (ComponentPropsWithoutRef<'button'> & { href?: never }));

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const appearance =
    variant === 'primary'
      ? 'border-accent bg-accent text-background hover:bg-foreground hover:border-foreground'
      : 'border-border bg-surface text-foreground hover:border-accent';
  const classes = `inline-flex min-h-12 items-center justify-center gap-3 rounded-control border px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${appearance} ${className}`;

  if (typeof props.href === 'string') {
    return <Link className={classes} {...props} />;
  }
  return <button type="button" className={classes} {...props} />;
}
