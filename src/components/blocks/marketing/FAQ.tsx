import React, {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Badge } from '../../Badge';
import { Accordion } from '../../Accordion';
import {
  mergeTw,
  surfaceVariants,
  SlotProps,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   FAQ — a full-width marketing FREQUENTLY-ASKED-QUESTIONS section.
   Six LAYOUT designs, fully themeable through semantic tokens. COMPOSES the
   Accordion primitive, restyling its triggers/panels onto theme tokens. Renders
   complete from data props or via the compound slot API.

     // Data-prop form:
     <FAQ variant="accordion" eyebrow="Help" title="Questions"
       items={[{ q: 'Is it themeable?', a: 'Yes — semantic tokens.' }]} />

     // Slot-composition form:
     <FAQ variant="twoColumn">
       <FAQ.Title>Questions</FAQ.Title>
       <FAQ.Items>…</FAQ.Items>
     </FAQ>
   ════════════════════════════════════════════════════════════════════════ */

export type FAQVariant =
  | 'accordion'
  | 'twoColumn'
  | 'bordered'
  | 'cards'
  | 'centered'
  | 'split';

export const FAQ_VARIANTS: FAQVariant[] = [
  'accordion',
  'twoColumn',
  'bordered',
  'cards',
  'centered',
  'split',
];

export interface FAQItem {
  q: ReactNode;
  a: ReactNode;
}

export interface FAQProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 layout designs. */
  variant?: FAQVariant;
  className?: string;
  /** Extra Tailwind classes (merged last). */
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  eyebrow?: ReactNode;
  title?: ReactNode;
  items?: FAQItem[];
}

/* FAQ broadcasts its layout variant so sub-parts self-arrange. */
const FAQVariantContext = createContext<FAQVariant>('accordion');
const useFAQVariant = () => useContext(FAQVariantContext);

const isSplit = (v: FAQVariant) => v === 'split';

/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface: Record<FAQVariant, string> = {
  accordion: 'bg-canvas',
  twoColumn: 'bg-canvas',
  bordered: 'bg-canvas',
  cards: 'bg-canvas',
  centered: 'bg-canvas',
  split: 'bg-canvas',
};

/* ---------------------------------- Root ---------------------------------- */

const FAQRoot = forwardRef<HTMLElement, FAQProps>(function FAQ(
  { variant = 'accordion', className, tw, children, eyebrow, title, items, ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const split = isSplit(variant);
  const centered = variant === 'centered';

  const header =
    eyebrow || title ? (
      <div
        className={mergeTw(
          'flex flex-col gap-4',
          centered && 'mx-auto max-w-2xl items-center text-center',
          split ? 'lg:sticky lg:top-24' : !centered && 'max-w-2xl'
        )}
      >
        {eyebrow ? <FAQEyebrow>{eyebrow}</FAQEyebrow> : null}
        {title ? <FAQTitle>{title}</FAQTitle> : null}
      </div>
    ) : null;

  return (
    <FAQVariantContext.Provider value={variant}>
      <section
        ref={ref}
        className={mergeTw('relative w-full overflow-hidden text-fg', sectionSurface[variant], className, tw)}
        {...rest}
      >
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          {hasChildren ? (
            children
          ) : split ? (
            <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
              {header}
              {items?.length ? <FAQItems items={items} /> : null}
            </div>
          ) : (
            <>
              {header}
              {items?.length ? (
                <FAQItems items={items} className={header ? 'mt-12' : undefined} />
              ) : null}
            </>
          )}
        </div>
      </section>
    </FAQVariantContext.Provider>
  );
});

/* --------------------------------- Eyebrow -------------------------------- */

const FAQEyebrow = forwardRef<HTMLSpanElement, SlotProps<HTMLSpanElement>>(
  function FAQEyebrow({ children, className, tw, ...rest }, ref) {
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

const FAQTitle = forwardRef<HTMLHeadingElement, SlotProps<HTMLHeadingElement>>(
  function FAQTitle({ children, className, tw, ...rest }, ref) {
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
  }
);

/* ---------------------------------- Items --------------------------------- */

export interface FAQItemsProps extends SlotProps {
  items?: FAQItem[];
}

/* Per-variant wrapper layout around the accordion(s). */
const itemsLayout: Record<FAQVariant, string> = {
  accordion: 'mx-auto max-w-3xl',
  twoColumn: 'grid gap-x-12 gap-y-2 md:grid-cols-2',
  bordered: 'mx-auto max-w-3xl divide-y divide-edge/12 rounded-2xl border border-edge/12',
  cards: 'grid gap-4 md:grid-cols-2',
  centered: 'mx-auto max-w-3xl',
  split: 'min-w-0',
};

/* Restyle the Accordion's light defaults onto theme tokens. */
const triggerTw =
  'py-5 text-base text-fg hover:text-primary focus-visible:ring-primary/40';
const contentTw = 'text-sm leading-relaxed text-fg-muted';

const FAQItems = forwardRef<HTMLDivElement, FAQItemsProps>(function FAQItems(
  { items, children, className, tw, ...rest },
  ref
) {
  const variant = useFAQVariant();
  const cards = variant === 'cards';

  if (children) {
    return (
      <div ref={ref} className={mergeTw(itemsLayout[variant], className, tw)} {...rest}>
        {children}
      </div>
    );
  }

  /* `cards` renders each Q&A as its own surface card with a mini accordion. */
  if (cards) {
    return (
      <div ref={ref} className={mergeTw(itemsLayout[variant], className, tw)} {...rest}>
        {items?.map((item, i) => (
          <Accordion.Root
            key={i}
            type="single"
            collapsible
            tw={mergeTw('rounded-2xl px-5 divide-y-0', surfaceVariants.bordered)}
          >
            <Accordion.Item value={`q-${i}`}>
              <Accordion.Trigger tw={triggerTw}>{item.q}</Accordion.Trigger>
              <Accordion.Content tw={contentTw}>{item.a}</Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        ))}
      </div>
    );
  }

  /* Everything else: a single accordion grouping all items. */
  const rowPad = variant === 'bordered' ? 'px-5' : '';

  return (
    <Accordion.Root
      ref={ref as React.Ref<HTMLDivElement>}
      type="single"
      collapsible
      className={mergeTw(itemsLayout[variant], 'divide-edge/12', className, tw)}
      {...(rest as Record<string, unknown>)}
    >
      {items?.map((item, i) => (
        <Accordion.Item key={i} value={`q-${i}`} tw={rowPad}>
          <Accordion.Trigger tw={triggerTw}>{item.q}</Accordion.Trigger>
          <Accordion.Content tw={contentTw}>{item.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
});

/* --------------------------------- Export --------------------------------- */

type FAQComponent = typeof FAQRoot & {
  Eyebrow: typeof FAQEyebrow;
  Title: typeof FAQTitle;
  Items: typeof FAQItems;
};

export const FAQ = FAQRoot as FAQComponent;
FAQ.Eyebrow = FAQEyebrow;
FAQ.Title = FAQTitle;
FAQ.Items = FAQItems;
