import React, {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   Hero — a full-width marketing hero SECTION.
   Six LAYOUT designs, fully themeable through semantic tokens, composed from
   library primitives (Button, Badge). Renders complete from data props or via
   the compound slot API for total control.

     // Data-prop form:
     <Hero variant="split" eyebrow="New" title="Ship faster"
       subtitle="A themeable system." primaryCta="Start" secondaryCta="Docs" />

     // Slot-composition form:
     <Hero variant="centered">
       <Hero.Eyebrow>New</Hero.Eyebrow>
       <Hero.Title>Ship faster</Hero.Title>
       <Hero.Subtitle>A themeable system.</Hero.Subtitle>
       <Hero.Actions>…</Hero.Actions>
       <Hero.Media>…</Hero.Media>
     </Hero>
   ════════════════════════════════════════════════════════════════════════ */

export type HeroVariant =
  | 'split'
  | 'centered'
  | 'imageRight'
  | 'gradient'
  | 'glass'
  | 'video';

export const HERO_VARIANTS: HeroVariant[] = [
  'split',
  'centered',
  'imageRight',
  'gradient',
  'glass',
  'video',
];

export interface HeroCta {
  label: ReactNode;
  href?: string;
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: HeroVariant;
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  primaryCta?: ReactNode | HeroCta;
  secondaryCta?: ReactNode | HeroCta;
  /** Image src for media-bearing variants. */
  image?: string;
}

/* Hero broadcasts its layout variant to sub-parts so they self-arrange. */
const HeroVariantContext = createContext<HeroVariant>('split');
const useHeroVariant = () => useContext(HeroVariantContext);

const centeredVariant = (v: HeroVariant) =>
  v === 'centered' || v === 'gradient' || v === 'glass' || v === 'video';

const hasMedia = (v: HeroVariant) =>
  v === 'split' || v === 'imageRight' || v === 'video';

/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface: Record<HeroVariant, string> = {
  split: 'bg-canvas',
  centered: 'bg-canvas',
  imageRight: 'bg-canvas',
  gradient:
    'bg-gradient-to-br from-primary/12 via-canvas to-accent2/12',
  glass: 'bg-canvas',
  video: 'bg-canvas',
};

/* ---------------------------------- Root ---------------------------------- */

const HeroRoot = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    variant = 'split',
    className,
    tw,
    children,
    eyebrow,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    image,
    ...rest
  },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const centered = centeredVariant(variant);
  const withMedia = hasMedia(variant);

  return (
    <HeroVariantContext.Provider value={variant}>
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
          {/* ambient glow for the lush variants */}
          {(variant === 'gradient' || variant === 'glass' || variant === 'centered') && (
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
            />
          )}

          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
            {hasChildren ? (
              centered ? (
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
                  {children}
                </div>
              ) : (
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  {children}
                </div>
              )
            ) : centered ? (
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
                {eyebrow ? <HeroEyebrow>{eyebrow}</HeroEyebrow> : null}
                {title ? <HeroTitle>{title}</HeroTitle> : null}
                {subtitle ? <HeroSubtitle>{subtitle}</HeroSubtitle> : null}
                <HeroActions primaryCta={primaryCta} secondaryCta={secondaryCta} />
                {variant === 'video' ? <HeroMedia image={image} /> : null}
              </div>
            ) : (
              <div
                className={mergeTw(
                  'grid items-center gap-12 lg:grid-cols-2',
                  variant === 'imageRight' && 'lg:[&>*:first-child]:order-1'
                )}
              >
                <div className="flex flex-col items-start gap-6">
                  {eyebrow ? <HeroEyebrow>{eyebrow}</HeroEyebrow> : null}
                  {title ? <HeroTitle>{title}</HeroTitle> : null}
                  {subtitle ? <HeroSubtitle>{subtitle}</HeroSubtitle> : null}
                  <HeroActions primaryCta={primaryCta} secondaryCta={secondaryCta} />
                </div>
                {withMedia ? <HeroMedia image={image} /> : null}
              </div>
            )}
          </div>
        </section>
      </BlockVariantContext.Provider>
    </HeroVariantContext.Provider>
  );
});

/* --------------------------------- Eyebrow -------------------------------- */

export type HeroSlotProps<E extends HTMLElement = HTMLDivElement> =
  HTMLAttributes<E> & { tw?: string };

const HeroEyebrow = forwardRef<HTMLSpanElement, HeroSlotProps<HTMLSpanElement>>(
  function HeroEyebrow({ children, className, tw, ...rest }, ref) {
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
  }
);

/* ---------------------------------- Title --------------------------------- */

const HeroTitle = forwardRef<HTMLHeadingElement, HeroSlotProps<HTMLHeadingElement>>(
  function HeroTitle({ children, className, tw, ...rest }, ref) {
    const variant = useHeroVariant();
    return (
      <h1
        ref={ref}
        className={mergeTw(
          'font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl',
          (variant === 'gradient' || variant === 'glass') && 'text-balance',
          className,
          tw
        )}
        {...rest}
      >
        {children}
      </h1>
    );
  }
);

/* -------------------------------- Subtitle -------------------------------- */

const HeroSubtitle = forwardRef<HTMLParagraphElement, HeroSlotProps<HTMLParagraphElement>>(
  function HeroSubtitle({ children, className, tw, ...rest }, ref) {
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
  }
);

/* --------------------------------- Actions -------------------------------- */

export interface HeroActionsProps extends HeroSlotProps {
  primaryCta?: ReactNode | HeroCta;
  secondaryCta?: ReactNode | HeroCta;
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

function ctaLabel(cta?: ReactNode | HeroCta): ReactNode {
  if (cta && typeof cta === 'object' && 'label' in (cta as HeroCta)) {
    return (cta as HeroCta).label;
  }
  return cta as ReactNode;
}

const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  function HeroActions(
    { primaryCta, secondaryCta, children, className, tw, ...rest },
    ref
  ) {
    const variant = useHeroVariant();
    const centered = centeredVariant(variant);
    const primary = ctaLabel(primaryCta);
    const secondary = ctaLabel(secondaryCta);
    if (!children && !primary && !secondary) return null;
    return (
      <div
        ref={ref}
        className={mergeTw(
          'mt-2 flex flex-col gap-3 sm:flex-row',
          centered && 'justify-center',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            {primary ? (
              <Button size="lg" intent="ghost" tw={mergeTw('group rounded-xl', accentSolid)}>
                {primary}
                <ArrowIcon />
              </Button>
            ) : null}
            {secondary ? (
              <Button size="lg" intent="ghost" tw={mergeTw('rounded-xl', ghostControl)}>
                {secondary}
              </Button>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

/* ---------------------------------- Media --------------------------------- */

export interface HeroMediaProps extends HeroSlotProps {
  image?: string;
}

const HeroMedia = forwardRef<HTMLDivElement, HeroMediaProps>(function HeroMedia(
  { image, children, className, tw, ...rest },
  ref
) {
  const variant = useHeroVariant();
  return (
    <div
      ref={ref}
      className={mergeTw(
        'relative w-full overflow-hidden rounded-2xl border border-edge/12 bg-elevated shadow-luxe',
        variant === 'video' ? 'aspect-video' : 'aspect-[4/3]',
        className,
        tw
      )}
      {...rest}
    >
      {children ??
        (image ? (
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/10 via-panel/40 to-accent2/10">
            {variant === 'video' ? (
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-fg shadow-accent">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 h-6 w-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fg-subtle">
                Preview
              </span>
            )}
          </div>
        ))}
    </div>
  );
});

/* --------------------------------- Export --------------------------------- */

type HeroComponent = typeof HeroRoot & {
  Eyebrow: typeof HeroEyebrow;
  Title: typeof HeroTitle;
  Subtitle: typeof HeroSubtitle;
  Actions: typeof HeroActions;
  Media: typeof HeroMedia;
};

export const Hero = HeroRoot as HeroComponent;
Hero.Eyebrow = HeroEyebrow;
Hero.Title = HeroTitle;
Hero.Subtitle = HeroSubtitle;
Hero.Actions = HeroActions;
Hero.Media = HeroMedia;
