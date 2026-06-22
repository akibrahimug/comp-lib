import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Badge } from '../../Badge';
import { Toggle } from '../../Toggle';
import { PricingCard, type PricingCardProps } from '../cards/PricingCard';
import {
  mergeTw,
  SlotProps,
  BlockVariant,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   PricingTable — a full-width marketing PRICING section.
   Six LAYOUT designs, fully themeable through semantic tokens. COMPOSES the
   PricingCard block for each tier. The `toggle` variant adds a monthly/annual
   Toggle that swaps the displayed prices. Renders complete from data props or
   via the compound slot API.

     // Data-prop form:
     <PricingTable variant="cards" eyebrow="Pricing" title="Simple, fair"
       tiers={[{ name: 'Pro', price: 29, features: ['SSO'], cta: 'Upgrade' }]} />

     // Slot-composition form:
     <PricingTable variant="twoTier">
       <PricingTable.Title>Simple, fair</PricingTable.Title>
       <PricingTable.Tiers>…</PricingTable.Tiers>
     </PricingTable>
   ════════════════════════════════════════════════════════════════════════ */

export type PricingTableVariant =
  | 'cards'
  | 'comparison'
  | 'toggle'
  | 'twoTier'
  | 'glass'
  | 'gradient';

export const PRICING_TABLE_VARIANTS: PricingTableVariant[] = [
  'cards',
  'comparison',
  'toggle',
  'twoTier',
  'glass',
  'gradient',
];

/** A tier is a PricingCard's props, with an optional annual price for `toggle`. */
export interface PricingTier extends PricingCardProps {
  /** Annual (per-month-equivalent) price shown when the toggle is on. */
  annualPrice?: number | string;
}

export interface PricingTableProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: PricingTableVariant;
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  eyebrow?: ReactNode;
  title?: ReactNode;
  tiers?: PricingTier[];
}

/* PricingTable broadcasts its layout variant so sub-parts self-arrange. */
const PricingTableVariantContext = createContext<PricingTableVariant>('cards');
const usePricingTableVariant = () => useContext(PricingTableVariantContext);

/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface: Record<PricingTableVariant, string> = {
  cards: 'bg-canvas',
  comparison: 'bg-canvas',
  toggle: 'bg-canvas',
  twoTier: 'bg-canvas',
  glass: 'mesh bg-canvas',
  gradient: 'bg-gradient-to-b from-primary/8 via-canvas to-accent2/8',
};

/** Map the section variant to the per-card BlockVariant surface. */
const cardVariantFor: Record<PricingTableVariant, BlockVariant> = {
  cards: 'elevated',
  comparison: 'bordered',
  toggle: 'elevated',
  twoTier: 'elevated',
  glass: 'glass',
  gradient: 'gradient',
};

/* ---------------------------------- Root ---------------------------------- */

const PricingTableRoot = forwardRef<HTMLElement, PricingTableProps>(
  function PricingTable(
    { variant = 'cards', className, tw, children, eyebrow, title, tiers, ...rest },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <PricingTableVariantContext.Provider value={variant}>
        <BlockVariantContext.Provider value="elevated">
          <section
            ref={ref}
            className={mergeTw(
              'relative w-full overflow-hidden text-fg',
              sectionSurface[variant],
              className,
              tw
            )}
            {...rest}
          >
            {(variant === 'glass' || variant === 'gradient') && (
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
              />
            )}

            <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
              {hasChildren ? (
                children
              ) : (
                <>
                  {(eyebrow || title) && (
                    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
                      {eyebrow ? (
                        <PricingTableEyebrow>{eyebrow}</PricingTableEyebrow>
                      ) : null}
                      {title ? (
                        <PricingTableTitle>{title}</PricingTableTitle>
                      ) : null}
                    </div>
                  )}
                  {tiers?.length ? (
                    <PricingTableTiers
                      tiers={tiers}
                      className={eyebrow || title ? 'mt-14' : undefined}
                    />
                  ) : null}
                </>
              )}
            </div>
          </section>
        </BlockVariantContext.Provider>
      </PricingTableVariantContext.Provider>
    );
  }
);

/* --------------------------------- Eyebrow -------------------------------- */

const PricingTableEyebrow = forwardRef<
  HTMLSpanElement,
  SlotProps<HTMLSpanElement>
>(function PricingTableEyebrow({ children, className, tw, ...rest }, ref) {
  return (
    <Badge
      ref={ref as React.Ref<HTMLSpanElement>}
      tw={mergeTw(
        'gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20',
        className,
        tw
      )}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Badge>
  );
});

/* ---------------------------------- Title --------------------------------- */

const PricingTableTitle = forwardRef<
  HTMLHeadingElement,
  SlotProps<HTMLHeadingElement>
>(function PricingTableTitle({ children, className, tw, ...rest }, ref) {
  return (
    <h2
      ref={ref}
      className={mergeTw(
        'font-display text-3xl font-light leading-tight tracking-tight text-fg text-balance sm:text-4xl',
        className,
        tw
      )}
      {...rest}
    >
      {children}
    </h2>
  );
});

/* ---------------------------------- Tiers --------------------------------- */

export interface PricingTableTiersProps extends SlotProps {
  tiers?: PricingTier[];
}

const PricingTableTiers = forwardRef<HTMLDivElement, PricingTableTiersProps>(
  function PricingTableTiers({ tiers, children, className, tw, ...rest }, ref) {
    const variant = usePricingTableVariant();
    const [annual, setAnnual] = useState(false);
    const cardVariant = cardVariantFor[variant];

    /* Layout: twoTier centers a duo; everything else flows a responsive row. */
    const cols =
      variant === 'twoTier'
        ? 'mx-auto grid max-w-3xl gap-6 sm:grid-cols-2'
        : 'grid items-stretch gap-6 md:grid-cols-3';

    const resolvedTiers = useMemo(
      () =>
        (tiers ?? []).map((tier) => {
          const {
            annualPrice,
            variant: tierVariant,
            highlighted,
            ...cardProps
          } = tier;
          const price =
            variant === 'toggle' && annual && annualPrice !== undefined
              ? annualPrice
              : cardProps.price;
          return {
            ...cardProps,
            price,
            period:
              variant === 'toggle'
                ? annual
                  ? '/mo, billed yearly'
                  : '/mo'
                : cardProps.period,
            variant: tierVariant ?? (highlighted ? 'feature' : cardVariant),
            highlighted,
          } as PricingCardProps;
        }),
      [tiers, variant, annual, cardVariant]
    );

    return (
      <div ref={ref} className={mergeTw('flex flex-col gap-10', className, tw)} {...rest}>
        {variant === 'toggle' && !children ? (
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className={mergeTw(!annual ? 'text-fg' : 'text-fg-subtle')}>
              Monthly
            </span>
            <Toggle
              checked={annual}
              onChange={(e) => setAnnual(e.currentTarget.checked)}
              aria-label="Bill annually"
            />
            <span className={mergeTw(annual ? 'text-fg' : 'text-fg-subtle')}>
              Annual
            </span>
            <span className={mergeTw('ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/20')}>
              Save 20%
            </span>
          </div>
        ) : null}

        <div className={cols}>
          {children ??
            resolvedTiers.map((tier, i) => (
              <PricingCard key={i} tw="max-w-none" {...tier} />
            ))}
        </div>
      </div>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type PricingTableComponent = typeof PricingTableRoot & {
  Eyebrow: typeof PricingTableEyebrow;
  Title: typeof PricingTableTitle;
  Tiers: typeof PricingTableTiers;
};

export const PricingTable = PricingTableRoot as PricingTableComponent;
PricingTable.Eyebrow = PricingTableEyebrow;
PricingTable.Title = PricingTableTitle;
PricingTable.Tiers = PricingTableTiers;
