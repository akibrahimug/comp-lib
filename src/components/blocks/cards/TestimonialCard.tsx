import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Avatar } from '../../Avatar';
import {
  mergeTw,
  surfaceVariants,
  SlotProps,
  BlockVariant,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   TestimonialCard — customer quote tile.
   Composed from the Avatar primitive and semantic tokens, exposing the shared
   6 designs via `variant` and a compound slot API. Renders complete from data
   props alone, so it works out of the box:

     // Data-prop form (renders a full testimonial):
     <TestimonialCard variant="elevated" rating={5}
       quote="It paid for itself in a week."
       name="Ada Lovelace" role="CTO, Analytical Engines" avatar="/ada.jpg" />

     // Slot-composition form (full control):
     <TestimonialCard variant="glass">
       <TestimonialCard.Rating value={5} />
       <TestimonialCard.Quote>It paid for itself in a week.</TestimonialCard.Quote>
       <TestimonialCard.Author name="Ada Lovelace" role="CTO" avatar="/ada.jpg" />
     </TestimonialCard>
   ════════════════════════════════════════════════════════════════════════ */

export interface TestimonialCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** One of the 6 designs. */
  variant?: BlockVariant;
  /** Extra className. */
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** The quote text. */
  quote?: ReactNode;
  /** Author name. */
  name?: ReactNode;
  /** Author role / company, e.g. "CTO, Acme". */
  role?: ReactNode;
  /** Author avatar URL (falls back to initials from `name`). */
  avatar?: string;
  /** Star rating, 0–5. */
  rating?: number;
}

/* ---------------------------------- types --------------------------------- */

export type TestimonialSlotProps = SlotProps<HTMLDivElement>;

/** Derive up-to-2-letter initials from a name for the avatar fallback. */
function initialsFrom(name: ReactNode): string {
  if (typeof name !== 'string') return '';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/* ---------------------------------- Root ---------------------------------- */

const TestimonialCardRoot = forwardRef<HTMLDivElement, TestimonialCardProps>(
  function TestimonialCard(
    {
      variant = 'elevated',
      className,
      tw,
      children,
      quote,
      name,
      role,
      avatar,
      rating,
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
            'group/card relative flex w-full max-w-sm flex-col gap-4 rounded-2xl p-6 text-fg transition-transform',
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
              {typeof rating === 'number' ? <TestimonialRating value={rating} /> : null}
              {quote ? <TestimonialQuote>{quote}</TestimonialQuote> : null}
              {name ? (
                <TestimonialAuthor name={name} role={role} avatar={avatar} />
              ) : null}
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* ---------------------------------- Rating -------------------------------- */

export interface TestimonialRatingProps extends TestimonialSlotProps {
  /** Rating value, 0–5. */
  value?: number;
}

function Star({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px] text-primary">
      {fill === 'half' ? (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z"
        fill={fill === 'full' ? 'currentColor' : fill === 'half' ? `url(#${id})` : 'currentColor'}
        fillOpacity={fill === 'empty' ? 0.25 : 1}
      />
    </svg>
  );
}

const TestimonialRating = forwardRef<HTMLDivElement, TestimonialRatingProps>(
  function TestimonialCardRating({ value = 0, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw('flex items-center gap-0.5', className, tw)}
        aria-label={`${value} out of 5 stars`}
        {...rest}
      >
        {children ??
          Array.from({ length: 5 }, (_, i) => {
            const fill = value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'empty';
            return <Star key={i} fill={fill} />;
          })}
      </div>
    );
  }
);

/* ----------------------------------- Quote -------------------------------- */

const TestimonialQuote = forwardRef<HTMLQuoteElement, SlotProps<HTMLQuoteElement>>(
  function TestimonialCardQuote({ children, className, tw, ...rest }, ref) {
    return (
      <blockquote
        ref={ref}
        className={mergeTw(
          'relative flex-1 font-display text-lg font-medium leading-relaxed text-fg',
          className,
          tw
        )}
        {...rest}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="mb-2 h-7 w-7 text-primary/40"
          fill="currentColor"
        >
          <path d="M9.5 6C6.5 7.6 4.8 10.4 4.8 14v4h5.4v-5.4H7.6c.1-2 1-3.4 2.9-4.4L9.5 6zm9 0c-3 1.6-4.7 4.4-4.7 8v4h5.4v-5.4h-2.6c.1-2 1-3.4 2.9-4.4L18.5 6z" />
        </svg>
        {children}
      </blockquote>
    );
  }
);

/* ---------------------------------- Author -------------------------------- */

export interface TestimonialAuthorProps extends Omit<TestimonialSlotProps, 'role'> {
  /** Author name. */
  name?: ReactNode;
  /** Author role / company. */
  role?: ReactNode;
  /** Author avatar URL (falls back to initials from `name`). */
  avatar?: string;
}

const TestimonialAuthor = forwardRef<HTMLDivElement, TestimonialAuthorProps>(
  function TestimonialCardAuthor({ name, role, avatar, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const accented = variant === 'feature' || variant === 'gradient';
    return (
      <div
        ref={ref}
        className={mergeTw('mt-2 flex items-center gap-3 border-t border-edge/10 pt-4', className, tw)}
        {...rest}
      >
        {children ?? (
          <>
            <Avatar
              size="md"
              tw={
                accented
                  ? 'bg-primary/15 text-primary'
                  : 'bg-fg/[0.06] text-fg-muted'
              }
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={typeof name === 'string' ? name : ''}
                  className="h-full w-full object-cover"
                />
              ) : (
                initialsFrom(name)
              )}
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-sm font-semibold text-fg">{name}</span>
              {role ? (
                <span className="truncate text-xs text-fg-subtle">{role}</span>
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type TestimonialCardComponent = typeof TestimonialCardRoot & {
  Rating: typeof TestimonialRating;
  Quote: typeof TestimonialQuote;
  Author: typeof TestimonialAuthor;
};

export const TestimonialCard = TestimonialCardRoot as TestimonialCardComponent;
TestimonialCard.Rating = TestimonialRating;
TestimonialCard.Quote = TestimonialQuote;
TestimonialCard.Author = TestimonialAuthor;
