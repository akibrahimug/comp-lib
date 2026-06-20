import React, { forwardRef, type HTMLAttributes } from 'react';
import { mergeTw } from '../core/mergeTw';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  tw?: string;
}

/**
 * Keyboard key hint.
 *
 * @example
 * Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, tw, children, ...props },
  ref
) {
  return (
    <kbd
      ref={ref}
      className={mergeTw(
        'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-edge/20 bg-fg/[0.06] px-1.5',
        'font-mono text-[11px] font-medium text-fg-muted',
        className,
        tw
      )}
      {...props}
    >
      {children}
    </kbd>
  );
});
