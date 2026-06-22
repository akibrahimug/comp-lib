import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import {
  mergeTw,
  surfaceVariants,
  SlotProps,
  BlockVariant,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   StatCard — KPI / metric tile.
   Composed from semantic tokens, exposing the shared 6 designs via `variant`
   and a compound slot API. Renders complete from data props alone:

     // Data-prop form (renders a full metric):
     <StatCard variant="elevated" label="Revenue" value="$48,210"
       delta="12.4%" deltaDirection="up" hint="vs last month"
       icon={<WalletIcon />} />

     // Slot-composition form (full control):
     <StatCard variant="glass">
       <StatCard.Icon><WalletIcon /></StatCard.Icon>
       <StatCard.Label>Revenue</StatCard.Label>
       <StatCard.Value>$48,210</StatCard.Value>
       <StatCard.Delta direction="up">12.4%</StatCard.Delta>
       <StatCard.Hint>vs last month</StatCard.Hint>
     </StatCard>
   ════════════════════════════════════════════════════════════════════════ */

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  /** One of the 6 designs. */
  variant?: BlockVariant;
  /** Extra className. */
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Metric label, e.g. "Revenue". */
  label?: ReactNode;
  /** Primary value, e.g. "$48,210". */
  value?: ReactNode;
  /** Delta text, e.g. "12.4%". */
  delta?: ReactNode;
  /** Direction — colors the delta green/red and orients the arrow. */
  deltaDirection?: 'up' | 'down';
  /** Trailing icon shown top-right. */
  icon?: ReactNode;
  /** Helper text shown next to the delta, e.g. "vs last month". */
  hint?: ReactNode;
}

/* ---------------------------------- types --------------------------------- */

export type StatSlotProps = SlotProps<HTMLDivElement>;

/* ---------------------------------- Root ---------------------------------- */

const StatCardRoot = forwardRef<HTMLDivElement, StatCardProps>(
  function StatCard(
    {
      variant = 'elevated',
      className,
      tw,
      children,
      label,
      value,
      delta,
      deltaDirection = 'up',
      icon,
      hint,
      ...rest
    },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <BlockVariantContext.Provider value={variant}>
        <div
          ref={ref}
          className={mergeTw(
            'relative flex w-full max-w-sm flex-col gap-1 rounded-2xl p-5 text-fg transition-transform',
            surfaceVariants[variant],
            className,
            tw
          )}
          {...rest}
        >
          {hasChildren ? (
            children
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                {label ? <StatLabel>{label}</StatLabel> : null}
                {icon ? <StatIcon>{icon}</StatIcon> : null}
              </div>
              {value != null ? <StatValue>{value}</StatValue> : null}
              {delta != null || hint != null ? (
                <div className="mt-1 flex items-center gap-2">
                  {delta != null ? (
                    <StatDelta direction={deltaDirection}>{delta}</StatDelta>
                  ) : null}
                  {hint != null ? <StatHint>{hint}</StatHint> : null}
                </div>
              ) : null}
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* ----------------------------------- Icon --------------------------------- */

const StatIcon = forwardRef<HTMLSpanElement, SlotProps<HTMLSpanElement>>(
  function StatCardIcon({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const accented = variant === 'feature' || variant === 'gradient';
    return (
      <span
        ref={ref}
        className={mergeTw(
          'grid h-9 w-9 shrink-0 place-items-center rounded-xl [&>svg]:h-[18px] [&>svg]:w-[18px]',
          accented
            ? 'border border-primary/20 bg-primary/10 text-primary'
            : 'border border-edge/10 bg-fg/[0.04] text-fg-muted',
          className,
          tw
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

/* ----------------------------------- Label -------------------------------- */

const StatLabel = forwardRef<HTMLSpanElement, SlotProps<HTMLSpanElement>>(
  function StatCardLabel({ children, className, tw, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={mergeTw(
          'text-xs font-medium uppercase tracking-wider text-fg-subtle',
          className,
          tw
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

/* ----------------------------------- Value -------------------------------- */

const StatValue = forwardRef<HTMLDivElement, StatSlotProps>(
  function StatCardValue({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (
      <div
        ref={ref}
        className={mergeTw(
          'mt-3 font-display text-3xl font-semibold tracking-tight',
          variant === 'feature' || variant === 'gradient' ? 'text-primary' : 'text-fg',
          className,
          tw
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* ----------------------------------- Delta -------------------------------- */

export interface StatDeltaProps extends SlotProps<HTMLSpanElement> {
  /** Up colors green + arrow rises; down colors red + arrow falls. */
  direction?: 'up' | 'down';
}

const StatDelta = forwardRef<HTMLSpanElement, StatDeltaProps>(
  function StatCardDelta({ direction = 'up', children, className, tw, ...rest }, ref) {
    const up = direction !== 'down';
    return (
      <span
        ref={ref}
        className={mergeTw(
          'inline-flex items-center gap-1 text-xs font-medium',
          up ? 'text-success-500' : 'text-danger-500',
          className,
          tw
        )}
        {...rest}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={up ? '-rotate-45' : 'rotate-45'}
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </span>
    );
  }
);

/* ----------------------------------- Hint --------------------------------- */

const StatHint = forwardRef<HTMLSpanElement, SlotProps<HTMLSpanElement>>(
  function StatCardHint({ children, className, tw, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={mergeTw('text-xs text-fg-subtle', className, tw)}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type StatCardComponent = typeof StatCardRoot & {
  Icon: typeof StatIcon;
  Label: typeof StatLabel;
  Value: typeof StatValue;
  Delta: typeof StatDelta;
  Hint: typeof StatHint;
};

export const StatCard = StatCardRoot as StatCardComponent;
StatCard.Icon = StatIcon;
StatCard.Label = StatLabel;
StatCard.Value = StatValue;
StatCard.Delta = StatDelta;
StatCard.Hint = StatHint;
