import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type SharedProps = { variant?: 'primary' | 'secondary' };
type ButtonProps = SharedProps &
  ((ComponentPropsWithoutRef<typeof Link> & { href: string }) | (ComponentPropsWithoutRef<'button'> & { href?: never }));

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const appearance =
    variant === 'primary'
      ? 'border-accent/80 bg-accent text-background shadow-[0_4px_20px_rgba(167,139,250,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md hover:bg-foreground hover:border-foreground hover:shadow-[0_6px_25px_rgba(244,244,247,0.4)]'
      : 'border-white/15 bg-white/[0.05] text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-md hover:bg-white/[0.12] hover:border-white/30 hover:text-white';
  const classes = `inline-flex min-h-12 items-center justify-center gap-3 rounded-control border px-6 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${appearance} ${className}`;

  if (typeof props.href === 'string') {
    return <Link className={classes} {...props} />;
  }
  return <button type="button" className={classes} {...props} />;
}
