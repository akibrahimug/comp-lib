import React, { forwardRef, type HTMLAttributes } from 'react';
import { mergeTw } from '../core/mergeTw';

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  /** Show the leading accent dot */
  dot?: boolean;
  /** Tailwind background class for the dot (e.g. "bg-accent") */
  dotTw?: string;
  className?: string;
  tw?: string;
}

/**
 * Eyebrow / overline label — a small uppercase monospace kicker above headings.
 *
 * @example
 * <Eyebrow>Why us</Eyebrow>
 */
export const Eyebrow = forwardRef<HTMLSpanElement, EyebrowProps>(function Eyebrow(
  { dot = true, dotTw = 'bg-accent', className, tw, children, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={mergeTw(
        'inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-fg-muted',
        className,
        tw
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={mergeTw('absolute inline-flex h-full w-full rounded-full opacity-70', dotTw)} />
          <span className={mergeTw('relative inline-flex h-1.5 w-1.5 rounded-full', dotTw)} />
        </span>
      )}
      {children}
    </span>
  );
});
