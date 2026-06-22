import React, {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Badge } from '../../Badge';
import { Avatar } from '../../Avatar';
import {
  mergeTw,
  surfaceVariants,
  SlotProps,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   Testimonials — a full-width marketing SOCIAL-PROOF section.
   Six LAYOUT designs, fully themeable through semantic tokens. Self-contained
   testimonial items compose the Avatar primitive and inline star marks.
   Renders complete from data props or via the compound slot API.

     // Data-prop form:
     <Testimonials variant="grid" eyebrow="Loved" title="What people say"
       items={[{ quote: '…', name: 'Ada', role: 'CTO', avatar: '/a.jpg' }]} />

     // Slot-composition form:
     <Testimonials variant="single">
       <Testimonials.Eyebrow>Loved</Testimonials.Eyebrow>
       <Testimonials.Title>What people say</Testimonials.Title>
       <Testimonials.Items>…</Testimonials.Items>
     </Testimonials>
   ════════════════════════════════════════════════════════════════════════ */

export type TestimonialsVariant =
  | 'grid'
  | 'single'
  | 'carousel'
  | 'masonry'
  | 'logos'
  | 'gradient';

export const TESTIMONIALS_VARIANTS: TestimonialsVariant[] = [
  'grid',
  'single',
  'carousel',
  'masonry',
  'logos',
  'gradient',
];

export interface Testimonial {
  quote: ReactNode;
  name: ReactNode;
  role?: ReactNode;
  avatar?: string;
}

export interface TestimonialsProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: TestimonialsVariant;
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  eyebrow?: ReactNode;
  title?: ReactNode;
  items?: Testimonial[];
}

/* Testimonials broadcasts its layout variant so sub-parts self-arrange. */
const TestimonialsVariantContext = createContext<TestimonialsVariant>('grid');
const useTestimonialsVariant = () => useContext(TestimonialsVariantContext);

/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface: Record<TestimonialsVariant, string> = {
  grid: 'bg-canvas',
  single: 'bg-canvas',
  carousel: 'bg-canvas',
  masonry: 'bg-canvas',
  logos: 'bg-canvas',
  gradient: 'bg-gradient-to-b from-primary/8 via-canvas to-accent2/8',
};

/* ---------------------------------- Root ---------------------------------- */

const TestimonialsRoot = forwardRef<HTMLElement, TestimonialsProps>(
  function Testimonials(
    { variant = 'grid', className, tw, children, eyebrow, title, items, ...rest },
    ref
  ) {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <TestimonialsVariantContext.Provider value={variant}>
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
          {variant === 'gradient' && (
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
                      <TestimonialsEyebrow>{eyebrow}</TestimonialsEyebrow>
                    ) : null}
                    {title ? (
                      <TestimonialsTitle>{title}</TestimonialsTitle>
                    ) : null}
                  </div>
                )}
                {items?.length ? (
                  <TestimonialsItems
                    items={items}
                    className={eyebrow || title ? 'mt-14' : undefined}
                  />
                ) : null}
              </>
            )}
          </div>
        </section>
      </TestimonialsVariantContext.Provider>
    );
  }
);

/* --------------------------------- Eyebrow -------------------------------- */

const TestimonialsEyebrow = forwardRef<
  HTMLSpanElement,
  SlotProps<HTMLSpanElement>
>(function TestimonialsEyebrow({ children, className, tw, ...rest }, ref) {
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

const TestimonialsTitle = forwardRef<
  HTMLHeadingElement,
  SlotProps<HTMLHeadingElement>
>(function TestimonialsTitle({ children, className, tw, ...rest }, ref) {
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

/* ---------------------------------- Items --------------------------------- */

export interface TestimonialsItemsProps extends SlotProps {
  items?: Testimonial[];
}

const layoutFor: Record<TestimonialsVariant, string> = {
  grid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
  single: 'mx-auto max-w-3xl',
  carousel:
    'scrollbar-luxe -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 [&>*]:w-[320px] [&>*]:shrink-0 [&>*]:snap-start',
  masonry: 'gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid',
  logos: 'grid gap-6 sm:grid-cols-2',
  gradient: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
};

const TestimonialsItems = forwardRef<HTMLDivElement, TestimonialsItemsProps>(
  function TestimonialsItems({ items, children, className, tw, ...rest }, ref) {
    const variant = useTestimonialsVariant();

    /* The `logos` variant pairs a quiet brand strip with featured quotes. */
    if (variant === 'logos' && !children) {
      return (
        <div ref={ref} className={mergeTw('flex flex-col gap-12', className, tw)} {...rest}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
            {(items ?? []).map((t, i) => (
              <span
                key={i}
                className="font-display text-lg font-semibold tracking-tight text-fg-muted"
              >
                {t.name}
              </span>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {(items ?? []).slice(0, 2).map((t, i) => (
              <TestimonialItem key={i} {...t} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={mergeTw(layoutFor[variant], className, tw)}
        {...rest}
      >
        {children ??
          items?.map((t, i) => <TestimonialItem key={i} {...t} />)}
      </div>
    );
  }
);

/* ------------------------------ Stars + item ------------------------------ */

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-primary" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="m10 2 2.39 4.84 5.34.78-3.86 3.77.91 5.32L10 14.98l-4.78 2.51.91-5.32L2.27 7.62l5.34-.78L10 2Z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: ReactNode): string {
  if (typeof name !== 'string') return '';
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export interface TestimonialItemProps
  extends Omit<SlotProps, 'role'>,
    Testimonial {}

const TestimonialItem = forwardRef<HTMLElement, TestimonialItemProps>(
  function TestimonialItem(
    { quote, name, role, avatar, children, className, tw, ...rest },
    ref
  ) {
    const variant = useTestimonialsVariant();
    const big = variant === 'single';

    const surface =
      variant === 'gradient'
        ? surfaceVariants.gradient
        : variant === 'single'
          ? surfaceVariants.elevated
          : surfaceVariants.bordered;

    return (
      <figure
        ref={ref}
        className={mergeTw(
          'flex flex-col gap-5 rounded-2xl p-6 text-fg',
          surface,
          big && 'items-center p-10 text-center',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <>
            <Stars />
            <blockquote
              className={mergeTw(
                'leading-relaxed text-fg-muted',
                big
                  ? 'font-display text-2xl font-light text-fg text-balance'
                  : 'text-[15px]'
              )}
            >
              {quote}
            </blockquote>
            <figcaption
              className={mergeTw(
                'mt-auto flex items-center gap-3',
                big && 'justify-center'
              )}
            >
              <Avatar
                size={big ? 'md' : 'sm'}
                tw="bg-primary/15 text-primary ring-1 ring-primary/20"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials(name)
                )}
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-fg">{name}</span>
                {role ? (
                  <span className="text-xs text-fg-subtle">{role}</span>
                ) : null}
              </div>
            </figcaption>
          </>
        )}
      </figure>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type TestimonialsComponent = typeof TestimonialsRoot & {
  Eyebrow: typeof TestimonialsEyebrow;
  Title: typeof TestimonialsTitle;
  Items: typeof TestimonialsItems;
  Item: typeof TestimonialItem;
};

export const Testimonials = TestimonialsRoot as TestimonialsComponent;
Testimonials.Eyebrow = TestimonialsEyebrow;
Testimonials.Title = TestimonialsTitle;
Testimonials.Items = TestimonialsItems;
Testimonials.Item = TestimonialItem;
