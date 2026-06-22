import React, {
  forwardRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import { Avatar } from '../../Avatar';
import { Input } from '../../Input';
import {
  mergeTw,
  accentSolid,
  ghostControl,
  SlotProps,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   Navbar — pre-assembled, themeable app navigation bar.
   Composed from library primitives (Button, Avatar, Input) and semantic tokens.
   6 layout designs via `variant`, a compound slot API for full control, and a
   data-prop form that renders a complete sticky, responsive bar out of the box.

     // Data-prop form:
     <Navbar variant="split" brand="comp·lib"
       links={[{ label: 'Product', active: true }, { label: 'Pricing' }]}
       actions={<Button>Sign in</Button>} />

     // Slot-composition form:
     <Navbar variant="glass">
       <Navbar.Brand>comp·lib</Navbar.Brand>
       <Navbar.Links links={[{ label: 'Product', active: true }]} />
       <Navbar.Actions><Button>Sign in</Button></Navbar.Actions>
     </Navbar>
   ════════════════════════════════════════════════════════════════════════ */

export type NavbarVariant =
  | 'minimal'
  | 'centered'
  | 'split'
  | 'glass'
  | 'withSearch'
  | 'mega';

export const NAVBAR_VARIANTS: NavbarVariant[] = [
  'minimal',
  'centered',
  'split',
  'glass',
  'withSearch',
  'mega',
];

export interface NavLink {
  label: ReactNode;
  href?: string;
  active?: boolean;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** One of the 6 layout designs. */
  variant?: NavbarVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Brand mark / wordmark. */
  brand?: ReactNode;
  /** Primary navigation links. */
  links?: NavLink[];
  /** Right-aligned actions (buttons, avatar…). */
  actions?: ReactNode;
}

/* ─────────────────────────────── Surfaces ──────────────────────────────── */

const surfaces: Record<NavbarVariant, string> = {
  minimal: 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
  centered: 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
  split: 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
  glass: 'glass border-b border-edge/10',
  withSearch: 'border-b border-edge/10 bg-elevated/70 backdrop-blur-xl',
  mega: 'border-b border-edge/10 bg-canvas/90 backdrop-blur-xl',
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------------- Root --------------------------------- */

const NavbarRoot = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { variant = 'split', className, tw, children, brand, links, actions, ...rest },
  ref
) {
  const [open, setOpen] = useState(false);
  const hasChildren = React.Children.count(children) > 0;
  const centered = variant === 'centered';

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <header
        ref={ref}
        className={mergeTw('sticky top-0 z-30 w-full text-fg', surfaces[variant], className, tw)}
        {...rest}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6">
          {hasChildren ? (
            children
          ) : (
            <>
              {/* mobile toggle */}
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge/12 bg-fg/[0.04] text-fg-muted hover:text-fg lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>

              <NavbarBrand>{brand}</NavbarBrand>

              {centered ? (
                <NavbarLinks links={links} tw="mx-auto" />
              ) : (
                <NavbarLinks links={links} />
              )}

              {variant === 'withSearch' ? (
                <div className="ml-auto hidden md:block">
                  <NavbarSearch />
                </div>
              ) : null}

              <NavbarActions tw={mergeTw(variant === 'withSearch' ? 'ml-2' : 'ml-auto')}>
                {actions ?? (
                  <>
                    <Button
                      intent="ghost"
                      tw={mergeTw('hidden rounded-lg sm:inline-flex', ghostControl)}
                    >
                      Sign in
                    </Button>
                    <Button intent="ghost" tw={mergeTw('rounded-lg', accentSolid)}>
                      Get started
                    </Button>
                  </>
                )}
              </NavbarActions>
            </>
          )}
        </div>

        {/* mobile drawer */}
        {!hasChildren && open && links?.length ? (
          <div className="border-t border-edge/10 bg-canvas/95 px-5 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <a
                  key={i}
                  href={l.href ?? '#'}
                  onClick={(e) => !l.href && e.preventDefault()}
                  className={mergeTw(
                    'rounded-lg px-3 py-2 text-sm transition-colors',
                    l.active ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'
                  )}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}

        {/* mega panel hint row */}
        {!hasChildren && variant === 'mega' ? (
          <div className="hidden border-t border-edge/10 bg-elevated/40 lg:block">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-6 px-6 py-5">
              {[
                { t: 'Components', d: '60+ accessible primitives' },
                { t: 'Sections', d: 'Pre-built page chrome' },
                { t: 'Tokens', d: 'Theme across 4 palettes' },
              ].map((c) => (
                <a
                  key={c.t}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-xl border border-edge/10 bg-fg/[0.03] p-4 transition hover:border-primary/40"
                >
                  <p className="text-sm font-semibold text-fg">{c.t}</p>
                  <p className="mt-1 text-xs text-fg-muted">{c.d}</p>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>
    </BlockVariantContext.Provider>
  );
});

/* ----------------------------------- Brand -------------------------------- */

const NavbarBrand = forwardRef<HTMLDivElement, SlotProps>(function NavbarBrand(
  { children, className, tw, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={mergeTw('flex shrink-0 items-center gap-2.5', className, tw)}
      {...rest}
    >
      {children ?? (
        <>
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
        </>
      )}
    </div>
  );
});

/* ----------------------------------- Links -------------------------------- */

export interface NavbarLinksProps extends SlotProps<HTMLElement> {
  links?: NavLink[];
}

const NavbarLinks = forwardRef<HTMLElement, NavbarLinksProps>(function NavbarLinks(
  { links, children, className, tw, ...rest },
  ref
) {
  return (
    <nav
      ref={ref}
      className={mergeTw('hidden items-center gap-1 lg:flex', className, tw)}
      {...rest}
    >
      {children ??
        links?.map((l, i) => (
          <a
            key={i}
            href={l.href ?? '#'}
            onClick={(e) => !l.href && e.preventDefault()}
            aria-current={l.active ? 'page' : undefined}
            className={mergeTw(
              'rounded-lg px-3 py-2 text-sm transition-colors',
              l.active ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'
            )}
          >
            {l.label}
          </a>
        ))}
    </nav>
  );
});

/* ----------------------------------- Search ------------------------------- */

const NavbarSearch = forwardRef<HTMLInputElement, { className?: string; tw?: string }>(
  function NavbarSearch({ className, tw }, ref) {
    return (
      <Input
        ref={ref}
        placeholder="Search…"
        aria-label="Search"
        prefix={<SearchIcon className="h-4 w-4" />}
        className={className}
        tw={mergeTw(
          'h-9 w-64 rounded-lg border-edge/15 bg-fg/[0.04] text-fg placeholder:text-fg-subtle',
          'focus:border-primary/60 focus:ring-primary/25 focus:ring-offset-0',
          tw
        )}
      />
    );
  }
);

/* ---------------------------------- Actions ------------------------------- */

const NavbarActions = forwardRef<HTMLDivElement, SlotProps>(function NavbarActions(
  { children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant();
  return (
    <div
      ref={ref}
      className={mergeTw('flex items-center gap-2.5', className, tw)}
      data-variant={variant}
      {...rest}
    >
      {children}
    </div>
  );
});

/* ---------------------------------- Avatar -------------------------------- */

export interface NavbarAvatarProps extends SlotProps {
  /** Initials or short label shown inside the avatar. */
  initials?: ReactNode;
}

const NavbarAvatar = forwardRef<HTMLDivElement, NavbarAvatarProps>(function NavbarAvatar(
  { initials, children, className, tw, ...rest },
  ref
) {
  return (
    <Avatar
      ref={ref as never}
      size="sm"
      className={className}
      tw={mergeTw('bg-primary text-primary-fg text-xs font-semibold', tw)}
      {...(rest as Record<string, unknown>)}
    >
      {children ?? initials ?? 'AL'}
    </Avatar>
  );
});

/* --------------------------------- Export --------------------------------- */

type NavbarComponent = typeof NavbarRoot & {
  Brand: typeof NavbarBrand;
  Links: typeof NavbarLinks;
  Search: typeof NavbarSearch;
  Actions: typeof NavbarActions;
  Avatar: typeof NavbarAvatar;
};

export const Navbar = NavbarRoot as NavbarComponent;
Navbar.Brand = NavbarBrand;
Navbar.Links = NavbarLinks;
Navbar.Search = NavbarSearch;
Navbar.Actions = NavbarActions;
Navbar.Avatar = NavbarAvatar;
