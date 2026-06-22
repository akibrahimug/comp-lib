import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import { Badge } from '../../Badge';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  SlotProps,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   ProductGrid — pre-assembled, themeable product listing.
   SELF-CONTAINED product items composed from Button + Badge + inline star SVG
   and semantic tokens (no ProductCard dependency). 6 layout designs via
   `variant`, a data-prop form that renders a complete responsive grid, and a
   compound slot API for full control.

     // Data-prop form:
     <ProductGrid variant="grid3"
       products={[{ image: '/a.jpg', title: 'Aero Runner', price: 129,
         originalPrice: 189, badge: 'Sale', rating: 4.5 }]} />

     // Slot-composition form:
     <ProductGrid variant="list">
       <ProductGrid.Item title="Aero Runner" price={129} rating={4.5} />
     </ProductGrid>
   ════════════════════════════════════════════════════════════════════════ */

export type ProductGridVariant =
  | 'grid3'
  | 'grid4'
  | 'list'
  | 'masonry'
  | 'compact'
  | 'featured';

export const PRODUCTGRID_VARIANTS: ProductGridVariant[] = [
  'grid3',
  'grid4',
  'list',
  'masonry',
  'compact',
  'featured',
];

export interface GridProduct {
  image?: string;
  title: ReactNode;
  price: number | string;
  originalPrice?: number | string;
  badge?: ReactNode;
  rating?: number;
}

export interface ProductGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: ProductGridVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Products to render. */
  products?: GridProduct[];
  /** Override the column count for the data-prop grid designs. */
  columns?: number;
  /** Currency symbol shown before numeric prices. */
  currency?: string;
  /** Call-to-action label on each item. */
  cta?: ReactNode;
}

/* ──────────────────────────── Layout maps ───────────────────────────────── */

const gridCols: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-2 lg:grid-cols-5',
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function Star({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 text-primary">
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

function Rating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const fill = value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'empty';
          return <Star key={i} fill={fill} />;
        })}
      </span>
      <span className="font-medium text-fg-muted">{value.toFixed(1)}</span>
    </span>
  );
}

function ImageFallback({ className }: { className?: string }) {
  return (
    <div className={mergeTw('grid h-full w-full place-items-center text-fg-subtle', className)}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-9 w-9">
        <path
          d="M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 16l4.5-4.5a2 2 0 012.8 0L15 16M14 13l1.5-1.5a2 2 0 012.8 0L21 14M9 9.5a1 1 0 11-2 0 1 1 0 012 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function formatPrice(amount: number | string | undefined, currency: string): ReactNode {
  if (amount == null) return null;
  return typeof amount === 'number' ? `${currency}${amount}` : amount;
}

/* ----------------------------------- Item --------------------------------- */

export interface ProductGridItemProps extends Omit<SlotProps, 'title'>, Partial<GridProduct> {
  /** Render horizontally (list design). */
  row?: boolean;
  /** Larger spotlight item (featured design). */
  feature?: boolean;
  /** Currency symbol. */
  currency?: string;
  /** Call-to-action label. */
  cta?: ReactNode;
}

const ProductGridItem = forwardRef<HTMLDivElement, ProductGridItemProps>(function ProductGridItem(
  { image, title, price, originalPrice, badge, rating, row, feature, currency = '$', cta = 'Add to cart', children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant();

  if (children) {
    return (
      <div ref={ref} className={mergeTw('group/item', className, tw)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={mergeTw(
        'group/item flex overflow-hidden rounded-2xl border border-edge/10 bg-elevated text-fg shadow-luxe-sm transition-shadow hover:shadow-luxe',
        row ? 'flex-row items-stretch' : 'flex-col',
        className,
        tw
      )}
      {...rest}
    >
      {/* media */}
      <div
        className={mergeTw(
          'relative shrink-0 overflow-hidden bg-canvas/40',
          row ? 'aspect-square w-32 sm:w-40' : feature ? 'aspect-[16/10]' : 'aspect-[4/3]'
        )}
      >
        {image ? (
          <img src={image} alt={typeof title === 'string' ? title : ''} className="h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
        ) : (
          <ImageFallback />
        )}
        {badge ? (
          <Badge tw="absolute left-3 top-3 border border-primary/20 bg-primary/15 text-primary backdrop-blur-sm">
            {badge}
          </Badge>
        ) : null}
      </div>

      {/* body */}
      <div className={mergeTw('flex flex-1 flex-col gap-2 p-4', feature && 'gap-3 p-5')}>
        {typeof rating === 'number' ? <Rating value={rating} /> : null}
        <h3 className={mergeTw('font-display font-semibold leading-snug text-fg', feature ? 'text-lg' : 'text-sm')}>
          {title}
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className={mergeTw('font-display font-semibold tracking-tight text-fg', feature ? 'text-2xl' : 'text-lg')}>
            {formatPrice(price, currency)}
          </span>
          {originalPrice != null ? (
            <span className="text-sm font-medium text-fg-subtle line-through">{formatPrice(originalPrice, currency)}</span>
          ) : null}
        </div>
        <Button
          intent="ghost"
          fullWidth
          tw={mergeTw('mt-2 h-10 rounded-xl', feature || (variant as string) === 'featured' ? accentSolid : ghostControl)}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
});

/* ----------------------------------- Root --------------------------------- */

const SAMPLE: GridProduct[] = [
  { title: 'Aero Runner', price: 129, originalPrice: 189, badge: 'Sale', rating: 4.5 },
  { title: 'Trail Blazer', price: 149, rating: 4.8 },
  { title: 'Court Classic', price: 99, rating: 4.2 },
  { title: 'Studio Flex', price: 89, badge: 'New', rating: 4.6 },
];

const ProductGridRoot = forwardRef<HTMLDivElement, ProductGridProps>(function ProductGrid(
  { variant = 'grid3', className, tw, children, products = SAMPLE, columns, currency = '$', cta, ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;

  const isList = variant === 'list';
  const isMasonry = variant === 'masonry';
  const isFeatured = variant === 'featured';

  const cols = columns ?? (variant === 'grid4' ? 4 : variant === 'compact' ? 4 : 3);

  let containerClass: string;
  if (isList) {
    containerClass = 'flex flex-col gap-4';
  } else if (isMasonry) {
    containerClass = 'columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid';
  } else if (isFeatured) {
    containerClass = 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3';
  } else {
    containerClass = mergeTw('grid gap-5', gridCols[cols] ?? gridCols[3]);
  }

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <div ref={ref} className={mergeTw('w-full text-fg', className, tw)} {...rest}>
        <div className={containerClass}>
          {hasChildren
            ? children
            : products.map((p, i) => (
                <ProductGridItem
                  key={i}
                  {...p}
                  currency={currency}
                  cta={cta}
                  row={isList}
                  feature={isFeatured && i === 0}
                  className={mergeTw(
                    isFeatured && i === 0 && 'sm:col-span-2 lg:row-span-2',
                    variant === 'compact' && 'shadow-none'
                  )}
                />
              ))}
        </div>
      </div>
    </BlockVariantContext.Provider>
  );
});

/* --------------------------------- Export --------------------------------- */

type ProductGridComponent = typeof ProductGridRoot & {
  Item: typeof ProductGridItem;
};

export const ProductGrid = ProductGridRoot as ProductGridComponent;
ProductGrid.Item = ProductGridItem;
