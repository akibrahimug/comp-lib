import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { mergeTw } from '../core/mergeTw';

export type IconButtonIntent = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const intents: Record<IconButtonIntent, string> = {
  primary: 'bg-accent text-onaccent hover:brightness-110 focus:ring-accent focus:ring-offset-canvas',
  secondary: 'border border-edge/15 bg-fg/[0.04] text-fg hover:bg-fg/[0.08] focus:ring-accent focus:ring-offset-canvas',
  ghost: 'text-fg-muted hover:bg-fg/10 hover:text-fg focus:ring-accent focus:ring-offset-canvas',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-600 focus:ring-offset-canvas',
};

const sizes: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8 [&>svg]:h-4 [&>svg]:w-4',
  md: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
  lg: 'h-11 w-11 [&>svg]:h-5 [&>svg]:w-5',
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible label (icon-only button) */
  'aria-label': string;
  intent?: IconButtonIntent;
  size?: IconButtonSize;
  /** The icon element */
  children: ReactNode;
  className?: string;
  tw?: string;
}

/**
 * Square, icon-only button. Requires an `aria-label`.
 *
 * @example
 * <IconButton aria-label="Settings" intent="ghost"><Icon name="cog" /></IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { intent = 'secondary', size = 'md', className, tw, children, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={mergeTw(
        'inline-flex items-center justify-center rounded-lg transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
        intents[intent],
        sizes[size],
        className,
        tw
      )}
      {...props}
    >
      {children}
    </button>
  );
});
