import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
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
   ProductCard — e-commerce product tile.
   Composed from library primitives (Button, Badge) and semantic tokens,
   exposing the shared 6 designs via `variant` and a compound slot API. Renders
   complete from data props alone, so it works out of the box:

     // Data-prop form (renders a full product tile):
     <ProductCard variant="elevated" image="/sneaker.jpg" title="Aero Runner"
       price={129} originalPrice={189} rating={4.5} reviews={212}
       badge="Sale" cta="Add to cart" />

     // Slot-composition form (full control):
     <ProductCard variant="glass">
       <ProductCard.Media src="/sneaker.jpg" alt="Aero Runner" badge="Sale" />
       <ProductCard.Body>
         <ProductCard.Title>Aero Runner</ProductCard.Title>
         <ProductCard.Rating value={4.5} reviews={212} />
         <ProductCard.Price amount={129} originalPrice={189} />
         <ProductCard.Action>Add to cart</ProductCard.Action>
       </ProductCard.Body>
     </ProductCard>
   ════════════════════════════════════════════════════════════════════════ */

export interface ProductCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** One of the 6 designs. */
  variant?: BlockVariant;
  /** Extra className. */
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Product image URL. */
  image?: string;
  /** Product title. */
  title?: ReactNode;
  /** Current price (number is formatted with `currency`). */
  price?: number | string;
  /** Original (pre-discount) price, shown struck-through. */
  originalPrice?: number | string;
  /** Currency symbol shown before numeric prices. */
  currency?: string;
  /** Star rating, 0–5. */
  rating?: number;
  /** Review count shown next to the rating. */
  reviews?: number;
  /** Corner badge label, e.g. "Sale". */
  badge?: ReactNode;
  /** Call-to-action label. */
  cta?: ReactNode;
}

/* ---------------------------------- types --------------------------------- */

export type ProductSlotProps = SlotProps<HTMLDivElement>;

/* ---------------------------------- Root ---------------------------------- */

const ProductCardRoot = forwardRef<HTMLDivElement, ProductCardProps>(
  function ProductCard(
    {
      variant = 'elevated',
      className,
      tw,
      children,
      image,
      title,
      price,
      originalPrice,
      currency = '$',
      rating,
      reviews,
      badge,
      cta,
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
            'group/card relative flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-2xl p-4 text-fg transition-transform',
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
              <ProductMedia src={image} alt={typeof title === 'string' ? title : undefined} badge={badge} />
              <ProductBody>
                {title ? <ProductTitle>{title}</ProductTitle> : null}
                {typeof rating === 'number' ? (
                  <ProductRating value={rating} reviews={reviews} />
                ) : null}
                {price != null ? (
                  <ProductPrice amount={price} originalPrice={originalPrice} currency={currency} />
                ) : null}
                {cta ? <ProductAction>{cta}</ProductAction> : null}
              </ProductBody>
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* ---------------------------------- Media --------------------------------- */

export interface ProductMediaProps extends ProductSlotProps {
  /** Image URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Corner badge label. */
  badge?: ReactNode;
}

const ProductMedia = forwardRef<HTMLDivElement, ProductMediaProps>(
  function ProductCardMedia({ src, alt, badge, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw(
          'relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-edge/10 bg-canvas/40',
          className,
          tw
        )}
        {...rest}
      >
        {children ??
          (src ? (
            <img
              src={src}
              alt={alt ?? ''}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-fg-subtle">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-10 w-10">
                <path
                  d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 16l4.5-4.5a2 2 0 012.8 0L15 16M14 13l1.5-1.5a2 2 0 012.8 0L21 14M9 9.5a1 1 0 11-2 0 1 1 0 012 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        {badge ? (
          <Badge
            tw="absolute left-3 top-3 border border-primary/20 bg-primary/15 text-primary backdrop-blur-sm"
          >
            {badge}
          </Badge>
        ) : null}
      </div>
    );
  }
);

/* ----------------------------------- Body --------------------------------- */

const ProductBody = forwardRef<HTMLDivElement, ProductSlotProps>(
  function ProductCardBody({ children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw('flex flex-1 flex-col gap-2.5', className, tw)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

/* ----------------------------------- Title -------------------------------- */

const ProductTitle = forwardRef<HTMLHeadingElement, SlotProps<HTMLHeadingElement>>(
  function ProductCardTitle({ children, className, tw, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={mergeTw('font-display text-base font-semibold leading-snug text-fg', className, tw)}
        {...rest}
      >
        {children}
      </h3>
    );
  }
);

/* ---------------------------------- Rating -------------------------------- */

export interface ProductRatingProps extends ProductSlotProps {
  /** Rating value, 0–5. */
  value?: number;
  /** Review count shown alongside. */
  reviews?: number;
}

function Star({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-primary">
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

const ProductRating = forwardRef<HTMLDivElement, ProductRatingProps>(
  function ProductCardRating({ value = 0, reviews, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw('flex items-center gap-2 text-sm', className, tw)}
        {...rest}
      >
        {children ?? (
          <>
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => {
                const fill = value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'empty';
                return <Star key={i} fill={fill} />;
              })}
            </span>
            <span className="font-medium text-fg-muted">{value.toFixed(1)}</span>
            {typeof reviews === 'number' ? (
              <span className="text-fg-subtle">({reviews})</span>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

/* ----------------------------------- Price -------------------------------- */

export interface ProductPriceProps extends ProductSlotProps {
  amount?: number | string;
  originalPrice?: number | string;
  currency?: string;
}

function formatPrice(amount: number | string | undefined, currency: string): ReactNode {
  if (amount == null) return null;
  return typeof amount === 'number' ? `${currency}${amount}` : amount;
}

const ProductPrice = forwardRef<HTMLDivElement, ProductPriceProps>(
  function ProductCardPrice(
    { amount, originalPrice, currency = '$', children, className, tw, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={mergeTw('mt-auto flex items-baseline gap-2 pt-1', className, tw)}
        {...rest}
      >
        {children ?? (
          <>
            <span className="font-display text-xl font-semibold tracking-tight text-fg">
              {formatPrice(amount, currency)}
            </span>
            {originalPrice != null ? (
              <span className="text-sm font-medium text-fg-subtle line-through">
                {formatPrice(originalPrice, currency)}
              </span>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

/* ---------------------------------- Action -------------------------------- */

export interface ProductActionProps extends SlotProps<HTMLButtonElement> {
  /** Accent (filled) or ghost (outline) styling. Defaults to the variant. */
  tone?: 'accent' | 'ghost';
}

const ProductAction = forwardRef<HTMLButtonElement, ProductActionProps>(
  function ProductCardAction({ tone, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const resolved =
      tone ?? (variant === 'feature' || variant === 'gradient' ? 'accent' : 'ghost');
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        fullWidth
        intent="ghost"
        tw={mergeTw(
          'mt-2 rounded-xl',
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

/* --------------------------------- Export --------------------------------- */

type ProductCardComponent = typeof ProductCardRoot & {
  Media: typeof ProductMedia;
  Body: typeof ProductBody;
  Title: typeof ProductTitle;
  Rating: typeof ProductRating;
  Price: typeof ProductPrice;
  Action: typeof ProductAction;
};

export const ProductCard = ProductCardRoot as ProductCardComponent;
ProductCard.Media = ProductMedia;
ProductCard.Body = ProductBody;
ProductCard.Title = ProductTitle;
ProductCard.Rating = ProductRating;
ProductCard.Price = ProductPrice;
ProductCard.Action = ProductAction;
