import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { mergeTw } from '../core/mergeTw';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  /** Metric label (e.g. "Revenue") */
  label: ReactNode;
  /** The primary value (e.g. "$48,210") */
  value: ReactNode;
  /** Optional delta text (e.g. "+12.4%") */
  delta?: ReactNode;
  /** Direction of the delta — colors it green/red and rotates the arrow */
  trend?: 'up' | 'down';
  /** Optional trailing icon element shown top-right */
  icon?: ReactNode;
  /** Optional helper shown next to the delta (e.g. "vs last month") */
  hint?: ReactNode;
  className?: string;
  tw?: string;
}

/**
 * Stat / metric card — label, value and an optional trend delta + icon.
 *
 * @example
 * <Stat label="Revenue" value="$48,210" delta="+12.4%" trend="up"
 *       icon={<Icon name="wallet" />} hint="vs last month" />
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  { label, value, delta, trend, icon, hint, className, tw, ...props },
  ref
) {
  const up = trend !== 'down';
  return (
    <div
      ref={ref}
      className={mergeTw('rounded-2xl border border-edge/12 bg-panel/80 p-5 shadow-luxe-sm backdrop-blur-xl', className, tw)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-fg-subtle">{label}</span>
        {icon && (
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-edge/10 bg-fg/[0.04] text-accent [&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight text-fg">{value}</div>
      {(delta || hint) && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          {delta && (
            <span className={mergeTw('inline-flex items-center gap-1 font-medium', up ? 'text-success-500' : 'text-danger-500')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={up ? '-rotate-45' : 'rotate-45'}>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {delta}
            </span>
          )}
          {hint && <span className="text-fg-subtle">{hint}</span>}
        </div>
      )}
    </div>
  );
});
