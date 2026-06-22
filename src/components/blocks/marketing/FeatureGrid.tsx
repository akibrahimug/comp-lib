import React, {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Badge } from '../../Badge';
import {
  mergeTw,
  surfaceVariants,
  SlotProps,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   FeatureGrid — a full-width marketing FEATURES section.
   Six LAYOUT designs, fully themeable through semantic tokens. Renders complete
   from data props (eyebrow / title / subtitle / features) or via the compound
   slot API for total control. Feature items render as inner cards using the
   shared surface vocabulary so they re-tint across every theme.

     // Data-prop form:
     <FeatureGrid variant="grid3" eyebrow="Why us" title="Built for speed"
       features={[{ icon: <svg/>, title: 'Fast', description: '…' }]} />

     // Slot-composition form:
     <FeatureGrid variant="grid2">
       <FeatureGrid.Eyebrow>Why us</FeatureGrid.Eyebrow>
       <FeatureGrid.Title>Built for speed</FeatureGrid.Title>
       <FeatureGrid.Subtitle>A themeable system.</FeatureGrid.Subtitle>
       <FeatureGrid.Items>…</FeatureGrid.Items>
     </FeatureGrid>
   ════════════════════════════════════════════════════════════════════════ */

export type FeatureGridVariant =
  | 'grid3'
  | 'grid2'
  | 'alternating'
  | 'iconLeft'
  | 'bordered'
  | 'spotlight';

export const FEATURE_GRID_VARIANTS: FeatureGridVariant[] = [
  'grid3',
  'grid2',
  'alternating',
  'iconLeft',
  'bordered',
  'spotlight',
];

export interface Feature {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export interface FeatureGridProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: FeatureGridVariant;
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  features?: Feature[];
}

/* FeatureGrid broadcasts its layout variant so sub-parts self-arrange. */
const FeatureGridVariantContext = createContext<FeatureGridVariant>('grid3');
const useFeatureGridVariant = () => useContext(FeatureGridVariantContext);

/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface: Record<FeatureGridVariant, string> = {
  grid3: 'bg-canvas',
  grid2: 'bg-canvas',
  alternating: 'bg-canvas',
  iconLeft: 'bg-canvas',
  bordered: 'bg-canvas',
  spotlight: 'bg-gradient-to-b from-primary/8 via-canvas to-canvas',
};

/* ---------------------------------- Root ---------------------------------- */

const FeatureGridRoot = forwardRef<HTMLElement, FeatureGridProps>(
  function FeatureGrid(
    {
      variant = 'grid3',
      className,
      tw,
      children,
      eyebrow,
      title,
      subtitle,
      features,
      ...rest
    },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <FeatureGridVariantContext.Provider value={variant}>
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
          {variant === 'spotlight' && (
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
                {(eyebrow || title || subtitle) && (
                  <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
                    {eyebrow ? (
                      <FeatureGridEyebrow>{eyebrow}</FeatureGridEyebrow>
                    ) : null}
                    {title ? <FeatureGridTitle>{title}</FeatureGridTitle> : null}
                    {subtitle ? (
                      <FeatureGridSubtitle>{subtitle}</FeatureGridSubtitle>
                    ) : null}
                  </div>
                )}
                {features?.length ? (
                  <FeatureGridItems
                    items={features}
                    className={eyebrow || title || subtitle ? 'mt-16' : undefined}
                  />
                ) : null}
              </>
            )}
          </div>
        </section>
      </FeatureGridVariantContext.Provider>
    );
  }
);

/* --------------------------------- Eyebrow -------------------------------- */

const FeatureGridEyebrow = forwardRef<
  HTMLSpanElement,
  SlotProps<HTMLSpanElement>
>(function FeatureGridEyebrow({ children, className, tw, ...rest }, ref) {
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

const FeatureGridTitle = forwardRef<
  HTMLHeadingElement,
  SlotProps<HTMLHeadingElement>
>(function FeatureGridTitle({ children, className, tw, ...rest }, ref) {
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

/* -------------------------------- Subtitle -------------------------------- */

const FeatureGridSubtitle = forwardRef<
  HTMLParagraphElement,
  SlotProps<HTMLParagraphElement>
>(function FeatureGridSubtitle({ children, className, tw, ...rest }, ref) {
  return (
    <p
      ref={ref}
      className={mergeTw(
        'max-w-xl text-lg leading-relaxed text-fg-muted',
        className,
        tw
      )}
      {...rest}
    >
      {children}
    </p>
  );
});

/* --------------------------------- Items ---------------------------------- */

export interface FeatureGridItemsProps extends SlotProps {
  items?: Feature[];
}

const columnsFor: Record<FeatureGridVariant, string> = {
  grid3: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
  grid2: 'grid gap-6 sm:grid-cols-2',
  alternating: 'flex flex-col gap-6',
  iconLeft: 'grid gap-6 sm:grid-cols-2',
  bordered: 'grid gap-px overflow-hidden rounded-2xl border border-edge/12 bg-edge/10 sm:grid-cols-2 lg:grid-cols-3',
  spotlight: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
};

const FeatureGridItems = forwardRef<HTMLDivElement, FeatureGridItemsProps>(
  function FeatureGridItems({ items, children, className, tw, ...rest }, ref) {
    const variant = useFeatureGridVariant();
    return (
      <div
        ref={ref}
        className={mergeTw(columnsFor[variant], className, tw)}
        {...rest}
      >
        {children ??
          items?.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
          ))}
      </div>
    );
  }
);

/* ------------------------------- Feature item ----------------------------- */

function DefaultFeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="m12 3 2.3 4.66 5.14.75-3.72 3.63.88 5.12L12 14.85l-4.6 2.42.88-5.12-3.72-3.63 5.14-.75L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface FeatureItemProps extends Omit<SlotProps, 'title'>, Feature {}

const FeatureItem = forwardRef<HTMLDivElement, FeatureItemProps>(
  function FeatureItem(
    { icon, title, description, children, className, tw, ...rest },
    ref
  ) {
    const variant = useFeatureGridVariant();
    const horizontal = variant === 'iconLeft' || variant === 'alternating';

    /* The bordered variant uses hairline-separated cells; others use cards. */
    const cellSurface =
      variant === 'bordered'
        ? 'bg-canvas'
        : variant === 'spotlight'
          ? surfaceVariants.elevated
          : surfaceVariants.bordered;

    return (
      <div
        ref={ref}
        className={mergeTw(
          'group relative flex gap-4 rounded-2xl p-6 text-fg transition-colors',
          variant === 'bordered' && 'rounded-none',
          horizontal ? 'flex-row items-start' : 'flex-col',
          cellSurface,
          variant === 'spotlight' && 'hover:border-primary/30 hover:ring-1 hover:ring-primary/20',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
              {icon ?? <DefaultFeatureIcon />}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-base font-semibold text-fg">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-fg-muted">
                {description}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type FeatureGridComponent = typeof FeatureGridRoot & {
  Eyebrow: typeof FeatureGridEyebrow;
  Title: typeof FeatureGridTitle;
  Subtitle: typeof FeatureGridSubtitle;
  Items: typeof FeatureGridItems;
  Item: typeof FeatureItem;
};

export const FeatureGrid = FeatureGridRoot as FeatureGridComponent;
FeatureGrid.Eyebrow = FeatureGridEyebrow;
FeatureGrid.Title = FeatureGridTitle;
FeatureGrid.Subtitle = FeatureGridSubtitle;
FeatureGrid.Items = FeatureGridItems;
FeatureGrid.Item = FeatureItem;
