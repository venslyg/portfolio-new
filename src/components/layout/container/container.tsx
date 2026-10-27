import type { ComponentPropsWithoutRef } from 'react';

export function Container({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={`mx-auto w-full max-w-[var(--content-width)] px-4 sm:px-8 lg:px-16 ${className}`} {...props} />;
}

