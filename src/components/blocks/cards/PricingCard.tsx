import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import {
  mergeTw,
  surfaceVariants,
  accentSolid,
  ghostControl,
  SlotProps,
  BlockVariant,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   PricingCard — the reference Block.
   A pre-assembled pricing tier composed from library primitives (Button) and
   semantic tokens, exposing 6 designs via `variant` and a compound slot API for
   full structural control. It also renders complete from data props alone, so it
   works out of the box:

     // Data-prop form (renders a full tier):
     <PricingCard variant="feature" name="Pro" price={29} period="/mo"
       features={['SSO', 'Audit log', '99.9% SLA']} cta="Upgrade" ribbon="Most popular" />

     // Slot-composition form (full control):
     <PricingCard variant="gradient">
       <PricingCard.Ribbon>Most popular</PricingCard.Ribbon>
       <PricingCard.Header name="Pro" description="For growing teams" />
       <PricingCard.Price amount={29} period="/mo" />
       <PricingCard.Features items={['SSO', 'Audit log', '99.9% SLA']} />
       <PricingCard.Action>Upgrade</PricingCard.Action>
       <PricingCard.Footer>Cancel anytime</PricingCard.Footer>
     </PricingCard>
   ════════════════════════════════════════════════════════════════════════ */

export type PricingFeature = string | { label: ReactNode; included?: boolean };

export interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {
  /** One of the 6 designs. */
  variant?: BlockVariant;
  /** Visually promote this tier (lift + accent), independent of `variant`. */
  highlighted?: boolean;
  /** Extra className. */
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Tier name, e.g. "Pro". */
  name?: ReactNode;
  /** Supporting line under the name. */
  description?: ReactNode;
  /** Numeric or pre-formatted price. */
  price?: number | string;
  /** Currency symbol shown before the price. */
  currency?: string;
  /** Billing period suffix, e.g. "/mo". */
  period?: string;
  /** Feature list. */
  features?: PricingFeature[];
  /** Call-to-action label. */
  cta?: ReactNode;
  /** Ribbon label, e.g. "Most popular". */
  ribbon?: ReactNode;
  /** Fine print under the CTA. */
  footnote?: ReactNode;
}

/* ---------------------------------- Root ---------------------------------- */

const PricingCardRoot = forwardRef<HTMLDivElement, PricingCardProps>(
  function PricingCard(
    {
      variant = 'elevated',
      highlighted,
      className,
      tw,
      children,
      name,
      description,
      price,
      currency = '$',
      period = '/mo',
      features,
      cta,
      ribbon,
      footnote,
      ...rest
    },
    ref
  ) {
    const promoted = highlighted || variant === 'feature';
    const hasChildren = React.Children.count(children) > 0;

    return (
      <BlockVariantContext.Provider value={variant}>
        <div
          ref={ref}
          className={mergeTw(
            'relative flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6 text-fg transition-transform',
            surfaceVariants[variant],
            promoted && variant !== 'feature' && 'ring-1 ring-primary/30',
            promoted && 'lg:scale-[1.02]',
            className,
            tw
          )}
          {...rest}
        >
          {hasChildren ? (
            children
          ) : (
            <>
              {ribbon ? <PricingRibbon>{ribbon}</PricingRibbon> : null}
              <PricingHeader name={name} description={description} />
              <PricingPrice amount={price} currency={currency} period={period} />
              {features?.length ? <PricingFeatures items={features} /> : null}
              {cta ? <PricingAction>{cta}</PricingAction> : null}
              {footnote ? <PricingFooter>{footnote}</PricingFooter> : null}
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* --------------------------------- Ribbon --------------------------------- */

/** Default div-based slot props. */
export type PricingSlotProps = SlotProps<HTMLDivElement>;

const PricingRibbon = forwardRef<HTMLSpanElement, SlotProps<HTMLSpanElement>>(
  function PricingCardRibbon({ children, className, tw, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={mergeTw(
          'inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1',
          'font-mono text-[11px] font-medium uppercase tracking-widest text-primary',
          'ring-1 ring-primary/20',
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

/* --------------------------------- Header --------------------------------- */

export interface PricingHeaderProps extends PricingSlotProps {
  name?: ReactNode;
  description?: ReactNode;
}

const PricingHeader = forwardRef<HTMLDivElement, PricingHeaderProps>(
  function PricingCardHeader(
    { name, description, children, className, tw, ...rest },
    ref
  ) {
    return (
      <div ref={ref} className={mergeTw('flex flex-col gap-1', className, tw)} {...rest}>
        {children ?? (
          <>
            {name ? (
              <h3 className="font-display text-lg font-semibold text-fg">{name}</h3>
            ) : null}
            {description ? (
              <p className="text-sm text-fg-muted">{description}</p>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

/* ---------------------------------- Price --------------------------------- */

export interface PricingPriceProps extends PricingSlotProps {
  amount?: number | string;
  currency?: string;
  period?: string;
}

const PricingPrice = forwardRef<HTMLDivElement, PricingPriceProps>(
  function PricingCardPrice(
    { amount, currency = '$', period = '/mo', children, className, tw, ...rest },
    ref
  ) {
    const variant = useBlockVariant();
    return (
      <div
        ref={ref}
        className={mergeTw('flex items-baseline gap-1', className, tw)}
        {...rest}
      >
        {children ?? (
          <>
            {typeof amount === 'number' ? (
              <span className="text-sm font-medium text-fg-muted">{currency}</span>
            ) : null}
            <span
              className={mergeTw(
                'font-display text-4xl font-semibold tracking-tight',
                variant === 'feature' || variant === 'gradient'
                  ? 'text-primary'
                  : 'text-fg'
              )}
            >
              {amount}
            </span>
            {period ? (
              <span className="text-sm font-medium text-fg-subtle">{period}</span>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

/* -------------------------------- Features -------------------------------- */

export interface PricingFeaturesProps extends SlotProps<HTMLUListElement> {
  items?: PricingFeature[];
}

function CheckMark({ muted }: { muted?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={mergeTw('mt-0.5 h-4 w-4 shrink-0', muted ? 'text-fg-subtle' : 'text-primary')}
    >
      <path
        d="M16.5 5.5 8.25 13.75 4 9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PricingFeatures = forwardRef<HTMLUListElement, PricingFeaturesProps>(
  function PricingCardFeatures({ items, children, className, tw, ...rest }, ref) {
    return (
      <ul
        ref={ref}
        className={mergeTw('flex flex-col gap-2.5 text-sm text-fg-muted', className, tw)}
        {...rest}
      >
        {children ??
          items?.map((item, i) => {
            const label = typeof item === 'string' ? item : item.label;
            const included = typeof item === 'string' ? true : item.included !== false;
            return (
              <li key={i} className={mergeTw('flex items-start gap-2.5', !included && 'opacity-55')}>
                <CheckMark muted={!included} />
                <span className={mergeTw(!included && 'line-through')}>{label}</span>
              </li>
            );
          })}
      </ul>
    );
  }
);

/* --------------------------------- Action --------------------------------- */

export interface PricingActionProps extends SlotProps<HTMLButtonElement> {
  /** Accent (filled) or ghost (outline) styling. Defaults to the variant. */
  tone?: 'accent' | 'ghost';
}

const PricingAction = forwardRef<HTMLButtonElement, PricingActionProps>(
  function PricingCardAction({ tone, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const resolved =
      tone ?? (variant === 'feature' || variant === 'gradient' ? 'accent' : 'ghost');
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        fullWidth
        intent="ghost"
        tw={mergeTw(
          'mt-1 rounded-xl',
          resolved === 'accent' ? accentSolid : ghostControl,
          className,
          tw
        )}
        {...(rest as Record<string, unknown>)}
      >
        {children}
      </Button>
    );
  }
);

/* --------------------------------- Footer --------------------------------- */

const PricingFooter = forwardRef<HTMLParagraphElement, SlotProps<HTMLParagraphElement>>(
  function PricingCardFooter({ children, className, tw, ...rest }, ref) {
    return (
      <p
        ref={ref}
        className={mergeTw('text-center text-xs text-fg-subtle', className, tw)}
        {...rest}
      >
        {children}
      </p>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type PricingCardComponent = typeof PricingCardRoot & {
  Ribbon: typeof PricingRibbon;
  Header: typeof PricingHeader;
  Price: typeof PricingPrice;
  Features: typeof PricingFeatures;
  Action: typeof PricingAction;
  Footer: typeof PricingFooter;
};

export const PricingCard = PricingCardRoot as PricingCardComponent;
PricingCard.Ribbon = PricingRibbon;
PricingCard.Header = PricingHeader;
PricingCard.Price = PricingPrice;
PricingCard.Features = PricingFeatures;
PricingCard.Action = PricingAction;
PricingCard.Footer = PricingFooter;
