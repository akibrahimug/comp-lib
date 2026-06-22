import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  SlotProps,
  BlockVariantContext,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   Footer — pre-assembled, themeable site footer.
   6 layout designs via `variant`, a compound slot API for full control, and a
   data-prop form that renders a complete, responsive footer out of the box.
   `newsletter` composes Input + Button. Theme-following through tokens only.

     // Data-prop form:
     <Footer variant="columns" brand="comp·lib"
       columns={[{ title: 'Product', links: [{ label: 'Pricing' }] }]}
       bottom="© 2026 comp·lib" />

     // Slot-composition form:
     <Footer variant="cta">
       <Footer.Brand>comp·lib</Footer.Brand>
       <Footer.Column title="Product"><a href="#">Pricing</a></Footer.Column>
       <Footer.Bottom>© 2026</Footer.Bottom>
     </Footer>
   ════════════════════════════════════════════════════════════════════════ */

export type FooterVariant =
  | 'simple'
  | 'columns'
  | 'cta'
  | 'newsletter'
  | 'minimal'
  | 'dark';

export const FOOTER_VARIANTS: FooterVariant[] = [
  'simple',
  'columns',
  'cta',
  'newsletter',
  'minimal',
  'dark',
];

export interface FooterLink {
  label: ReactNode;
  href?: string;
}

export interface FooterColumn {
  title: ReactNode;
  links: FooterLink[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** One of the 6 layout designs. */
  variant?: FooterVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Brand mark / wordmark + tagline region. */
  brand?: ReactNode;
  /** Link columns. */
  columns?: FooterColumn[];
  /** Bottom bar content (copyright, legal links…). */
  bottom?: ReactNode;
}

/* ─────────────────────────────── Surfaces ──────────────────────────────── */

const surfaces: Record<FooterVariant, string> = {
  simple: 'border-t border-edge/10 bg-canvas/80 backdrop-blur-xl',
  columns: 'border-t border-edge/10 bg-panel/60 backdrop-blur-xl',
  cta: 'border-t border-edge/10 bg-gradient-to-b from-primary/[0.06] to-canvas/80 backdrop-blur-xl',
  newsletter: 'border-t border-edge/10 bg-elevated/70 backdrop-blur-xl',
  minimal: 'border-t border-edge/10 bg-transparent',
  dark: 'border-t border-edge/10 bg-fg/[0.04] backdrop-blur-xl',
};

/* ----------------------------------- Brand -------------------------------- */

const FooterBrand = forwardRef<HTMLDivElement, SlotProps>(function FooterBrand(
  { children, className, tw, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={mergeTw('flex flex-col gap-3', className, tw)}
      {...rest}
    >
      <span className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-fg shadow-accent">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
            <path
              d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
          comp·lib
        </span>
      </span>
      <p className="max-w-xs text-sm text-fg-muted">
        {children ?? 'A themeable component library that re-tints across every palette.'}
      </p>
    </div>
  );
});

/* ----------------------------------- Column ------------------------------- */

export interface FooterColumnProps extends Omit<SlotProps, 'title'> {
  /** Column heading. */
  title?: ReactNode;
  links?: FooterLink[];
}

const FooterColumnBlock = forwardRef<HTMLDivElement, FooterColumnProps>(
  function FooterColumn({ title, links, children, className, tw, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={mergeTw('flex flex-col gap-3', className, tw)}
        {...rest}
      >
        {title ? (
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {title}
          </p>
        ) : null}
        <nav className="flex flex-col gap-2">
          {children ??
            links?.map((l, i) => (
              <a
                key={i}
                href={l.href ?? '#'}
                onClick={(e) => !l.href && e.preventDefault()}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
        </nav>
      </div>
    );
  }
);

/* --------------------------------- Newsletter ----------------------------- */

function FooterNewsletter() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-sm flex-col gap-3"
    >
      <div>
        <p className="text-sm font-semibold text-fg">Subscribe to our newsletter</p>
        <p className="mt-1 text-sm text-fg-muted">
          Product updates and design notes. No spam.
        </p>
      </div>
      <div className="flex items-start gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          tw={mergeTw(
            'h-10 rounded-lg border-edge/15 bg-fg/[0.04] text-fg placeholder:text-fg-subtle',
            'focus:border-primary/60 focus:ring-primary/25 focus:ring-offset-0'
          )}
        />
        <Button type="submit" intent="ghost" tw={mergeTw('h-10 shrink-0 rounded-lg', accentSolid)}>
          Subscribe
        </Button>
      </div>
    </form>
  );
}

/* ----------------------------------- CTA ---------------------------------- */

function FooterCta() {
  return (
    <div className="flex flex-col items-start gap-5 rounded-2xl border border-primary/20 bg-primary/[0.06] p-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-fg">
          Start building today
        </h3>
        <p className="mt-1 text-sm text-fg-muted">
          Drop in pre-assembled blocks that follow your theme automatically.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <Button intent="ghost" tw={mergeTw('rounded-lg', ghostControl)}>
          Documentation
        </Button>
        <Button intent="ghost" tw={mergeTw('rounded-lg', accentSolid)}>
          Get started
        </Button>
      </div>
    </div>
  );
}

/* ----------------------------------- Bottom ------------------------------- */

const FooterBottom = forwardRef<HTMLDivElement, SlotProps>(function FooterBottom(
  { children, className, tw, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={mergeTw(
        'flex flex-col items-center justify-between gap-3 border-t border-edge/10 pt-6 text-sm text-fg-subtle sm:flex-row',
        className,
        tw
      )}
      {...rest}
    >
      {children ?? (
        <>
          <span>© 2026 comp·lib. All rights reserved.</span>
          <nav className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Status'].map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="transition-colors hover:text-fg"
              >
                {l}
              </a>
            ))}
          </nav>
        </>
      )}
    </div>
  );
});

/* ----------------------------------- Root --------------------------------- */

const FooterRoot = forwardRef<HTMLElement, FooterProps>(function Footer(
  { variant = 'columns', className, tw, children, brand, columns, bottom, ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const isMinimal = variant === 'minimal';

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <footer
        ref={ref}
        data-variant={variant}
        className={mergeTw('w-full text-fg', surfaces[variant], className, tw)}
        {...rest}
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6">
          {hasChildren ? (
            children
          ) : isMinimal ? (
            <FooterBottom tw="border-t-0 pt-0">{bottom}</FooterBottom>
          ) : (
            <>
              {variant === 'cta' ? <div className="mb-12"><FooterCta /></div> : null}

              <div
                className={mergeTw(
                  'flex flex-col gap-10 pb-10 md:flex-row md:justify-between',
                  variant === 'newsletter' && 'md:items-start'
                )}
              >
                <FooterBrand>{brand}</FooterBrand>

                {variant === 'newsletter' ? (
                  <FooterNewsletter />
                ) : columns?.length ? (
                  <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:max-w-2xl">
                    {columns.map((c, i) => (
                      <FooterColumnBlock key={i} title={c.title} links={c.links} />
                    ))}
                  </div>
                ) : null}
              </div>

              <FooterBottom>{bottom}</FooterBottom>
            </>
          )}
        </div>
      </footer>
    </BlockVariantContext.Provider>
  );
});

/* --------------------------------- Export --------------------------------- */

type FooterComponent = typeof FooterRoot & {
  Brand: typeof FooterBrand;
  Column: typeof FooterColumnBlock;
  Bottom: typeof FooterBottom;
};

export const Footer = FooterRoot as FooterComponent;
Footer.Brand = FooterBrand;
Footer.Column = FooterColumnBlock;
Footer.Bottom = FooterBottom;
