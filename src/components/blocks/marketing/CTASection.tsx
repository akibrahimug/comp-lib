import React, {
  forwardRef,
  createContext,
  useContext,
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
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   CTASection — a full-width marketing CALL-TO-ACTION section.
   Six LAYOUT designs, fully themeable through semantic tokens, composed from
   the library Button primitive. Renders complete from data props or via the
   compound slot API for total control.

     // Data-prop form:
     <CTASection variant="gradient" title="Ready to ship?"
       subtitle="Start in minutes." primaryCta="Get started" secondaryCta="Docs" />

     // Slot-composition form:
     <CTASection variant="card">
       <CTASection.Title>Ready to ship?</CTASection.Title>
       <CTASection.Subtitle>Start in minutes.</CTASection.Subtitle>
       <CTASection.Actions primaryCta="Get started" secondaryCta="Docs" />
     </CTASection>
   ════════════════════════════════════════════════════════════════════════ */

export type CTASectionVariant =
  | 'simple'
  | 'centered'
  | 'split'
  | 'gradient'
  | 'glass'
  | 'card';

export const CTA_SECTION_VARIANTS: CTASectionVariant[] = [
  'simple',
  'centered',
  'split',
  'gradient',
  'glass',
  'card',
];

export interface CTACta {
  label: ReactNode;
  href?: string;
}

export interface CTASectionProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: CTASectionVariant;
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  title?: ReactNode;
  subtitle?: ReactNode;
  primaryCta?: ReactNode | CTACta;
  secondaryCta?: ReactNode | CTACta;
}

/* CTASection broadcasts its layout variant so sub-parts self-arrange. */
const CTASectionVariantContext = createContext<CTASectionVariant>('simple');
const useCTASectionVariant = () => useContext(CTASectionVariantContext);

const isSplit = (v: CTASectionVariant) => v === 'split';
const isCentered = (v: CTASectionVariant) => v !== 'split';

/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface: Record<CTASectionVariant, string> = {
  simple: 'bg-canvas',
  centered: 'bg-canvas',
  split: 'bg-canvas',
  gradient: 'bg-gradient-to-br from-primary/14 via-canvas to-accent2/14',
  glass: 'bg-canvas',
  card: 'bg-canvas',
};

/* Inner panel surface for the panel-bearing variants. */
const innerSurface: Partial<Record<CTASectionVariant, string>> = {
  glass: mergeTw(surfaceVariants.glass, 'rounded-3xl'),
  card: mergeTw(surfaceVariants.elevated, 'rounded-3xl shadow-luxe'),
};

/* ---------------------------------- Root ---------------------------------- */

const CTASectionRoot = forwardRef<HTMLElement, CTASectionProps>(
  function CTASection(
    {
      variant = 'simple',
      className,
      tw,
      children,
      title,
      subtitle,
      primaryCta,
      secondaryCta,
      ...rest
    },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;
    const split = isSplit(variant);
    const inner = innerSurface[variant];

    const body = hasChildren ? (
      children
    ) : split ? (
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-start gap-3">
          {title ? <CTASectionTitle>{title}</CTASectionTitle> : null}
          {subtitle ? (
            <CTASectionSubtitle>{subtitle}</CTASectionSubtitle>
          ) : null}
        </div>
        <CTASectionActions
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />
      </div>
    ) : (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        {title ? <CTASectionTitle>{title}</CTASectionTitle> : null}
        {subtitle ? <CTASectionSubtitle>{subtitle}</CTASectionSubtitle> : null}
        <CTASectionActions
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />
      </div>
    );

    return (
      <CTASectionVariantContext.Provider value={variant}>
        <BlockVariantContext.Provider value="elevated">
          <section
            ref={ref}
            className={mergeTw(
              'relative w-full overflow-hidden text-fg',
              sectionSurface[variant],
              variant === 'glass' && 'mesh',
              className,
              tw
            )}
            {...rest}
          >
            {(variant === 'gradient' || variant === 'glass') && (
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
              />
            )}

            <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
              {inner ? (
                <div
                  className={mergeTw(
                    'relative overflow-hidden px-6 py-14 sm:px-12 sm:py-16',
                    inner
                  )}
                >
                  {body}
                </div>
              ) : (
                body
              )}
            </div>
          </section>
        </BlockVariantContext.Provider>
      </CTASectionVariantContext.Provider>
    );
  }
);

/* ---------------------------------- Title --------------------------------- */

const CTASectionTitle = forwardRef<
  HTMLHeadingElement,
  SlotProps<HTMLHeadingElement>
>(function CTASectionTitle({ children, className, tw, ...rest }, ref) {
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

const CTASectionSubtitle = forwardRef<
  HTMLParagraphElement,
  SlotProps<HTMLParagraphElement>
>(function CTASectionSubtitle({ children, className, tw, ...rest }, ref) {
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

/* --------------------------------- Actions -------------------------------- */

export interface CTASectionActionsProps extends SlotProps {
  primaryCta?: ReactNode | CTACta;
  secondaryCta?: ReactNode | CTACta;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 10h11m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ctaLabel(cta?: ReactNode | CTACta): ReactNode {
  if (cta && typeof cta === 'object' && 'label' in (cta as CTACta)) {
    return (cta as CTACta).label;
  }
  return cta as ReactNode;
}

const CTASectionActions = forwardRef<HTMLDivElement, CTASectionActionsProps>(
  function CTASectionActions(
    { primaryCta, secondaryCta, children, className, tw, ...rest },
    ref
  ) {
    const variant = useCTASectionVariant();
    const centered = isCentered(variant);
    const primary = ctaLabel(primaryCta);
    const secondary = ctaLabel(secondaryCta);
    if (!children && !primary && !secondary) return null;
    return (
      <div
        ref={ref}
        className={mergeTw(
          'flex flex-col gap-3 sm:flex-row',
          centered && 'justify-center',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            {primary ? (
              <Button
                size="lg"
                intent="ghost"
                tw={mergeTw('group rounded-xl', accentSolid)}
              >
                {primary}
                <ArrowIcon />
              </Button>
            ) : null}
            {secondary ? (
              <Button
                size="lg"
                intent="ghost"
                tw={mergeTw('rounded-xl', ghostControl)}
              >
                {secondary}
              </Button>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type CTASectionComponent = typeof CTASectionRoot & {
  Title: typeof CTASectionTitle;
  Subtitle: typeof CTASectionSubtitle;
  Actions: typeof CTASectionActions;
};

export const CTASection = CTASectionRoot as CTASectionComponent;
CTASection.Title = CTASectionTitle;
CTASection.Subtitle = CTASectionSubtitle;
CTASection.Actions = CTASectionActions;
