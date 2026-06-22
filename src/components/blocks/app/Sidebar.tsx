import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import {
  mergeTw,
  accentSoft,
  SlotProps,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   Sidebar — pre-assembled, themeable app side navigation.
   6 layout designs via `variant`, a compound slot API for full control, and a
   data-prop form that renders a complete, grouped, scrollable rail out of the
   box. Theme-following through semantic tokens only.

     // Data-prop form:
     <Sidebar variant="grouped" brand="comp·lib"
       groups={[{ label: 'Workspace', items: [
         { label: 'Overview', active: true }, { label: 'Reports', badge: '3' },
       ] }]}
       footer={<span>v2.0</span>} />

     // Slot-composition form:
     <Sidebar variant="floating">
       <Sidebar.Brand>comp·lib</Sidebar.Brand>
       <Sidebar.Group label="Workspace">
         <Sidebar.Item active>Overview</Sidebar.Item>
       </Sidebar.Group>
       <Sidebar.Footer>v2.0</Sidebar.Footer>
     </Sidebar>
   ════════════════════════════════════════════════════════════════════════ */

export type SidebarVariant =
  | 'minimal'
  | 'grouped'
  | 'iconRail'
  | 'floating'
  | 'glass'
  | 'dark';

export const SIDEBAR_VARIANTS: SidebarVariant[] = [
  'minimal',
  'grouped',
  'iconRail',
  'floating',
  'glass',
  'dark',
];

export interface SidebarItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
}

export interface SidebarGroup {
  label?: ReactNode;
  items: SidebarItem[];
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** One of the 6 layout designs. */
  variant?: SidebarVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Brand mark / wordmark shown at the top. */
  brand?: ReactNode;
  /** Grouped navigation items. */
  groups?: SidebarGroup[];
  /** Footer region (user card, version…). */
  footer?: ReactNode;
}

/* ─────────────────────────────── Surfaces ──────────────────────────────── */

const surfaces: Record<SidebarVariant, string> = {
  minimal: 'border-r border-edge/10 bg-canvas/80 backdrop-blur-xl',
  grouped: 'border-r border-edge/10 bg-panel/70 backdrop-blur-xl',
  iconRail: 'border-r border-edge/10 bg-canvas/80 backdrop-blur-xl',
  floating:
    'm-3 rounded-2xl border border-edge/12 bg-elevated shadow-luxe-sm',
  glass: 'glass border-r border-edge/10',
  dark: 'border-r border-edge/10 bg-fg/[0.04] backdrop-blur-xl',
};

/* ──────────────────────────── Inline icons ──────────────────────────────── */

function DefaultItemIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ----------------------------------- Root --------------------------------- */

const SidebarRoot = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { variant = 'grouped', className, tw, children, brand, groups, footer, ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;
  const isRail = variant === 'iconRail';

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <aside
        ref={ref}
        data-variant={variant}
        className={mergeTw(
          'flex h-full flex-col text-fg',
          isRail ? 'w-16' : 'w-64',
          surfaces[variant],
          className,
          tw
        )}
        {...rest}
      >
        {hasChildren ? (
          children
        ) : (
          <>
            <SidebarBrand>{brand}</SidebarBrand>

            <nav className="scrollbar-luxe flex-1 overflow-y-auto px-3 py-2">
              {groups?.map((g, gi) => (
                <SidebarGroupBlock key={gi} label={g.label}>
                  {g.items.map((item, ii) => (
                    <SidebarItemLink key={ii} {...item} />
                  ))}
                </SidebarGroupBlock>
              ))}
            </nav>

            {footer !== undefined ? <SidebarFooter>{footer}</SidebarFooter> : null}
          </>
        )}
      </aside>
    </BlockVariantContext.Provider>
  );
});

/* ----------------------------------- Brand -------------------------------- */

const SidebarBrand = forwardRef<HTMLDivElement, SlotProps>(function SidebarBrand(
  { children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant() as unknown as SidebarVariant;
  const isRail = variant === 'iconRail';

  return (
    <div
      ref={ref}
      className={mergeTw(
        'flex h-16 shrink-0 items-center gap-2.5 px-4',
        isRail && 'justify-center px-0',
        className,
        tw
      )}
      {...rest}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-fg shadow-accent">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
          <path
            d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"
            fill="currentColor"
          />
        </svg>
      </span>
      {!isRail ? (
        <span className="truncate font-display text-[15px] font-semibold tracking-tight text-fg">
          {children ?? 'comp·lib'}
        </span>
      ) : null}
    </div>
  );
});

/* ----------------------------------- Group -------------------------------- */

export interface SidebarGroupProps extends SlotProps<HTMLElement> {
  /** Section heading shown above the items. */
  label?: ReactNode;
}

const SidebarGroupBlock = forwardRef<HTMLElement, SidebarGroupProps>(
  function SidebarGroup({ label, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant() as unknown as SidebarVariant;
    const isRail = variant === 'iconRail';

    return (
      <div
        ref={ref as never}
        className={mergeTw('mb-4 last:mb-0', className, tw)}
        {...rest}
      >
        {label && !isRail ? (
          <p className="px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
            {label}
          </p>
        ) : null}
        <div className="flex flex-col gap-0.5">{children}</div>
      </div>
    );
  }
);

/* ----------------------------------- Item --------------------------------- */

export interface SidebarItemProps
  extends Omit<HTMLAttributes<HTMLAnchorElement>, 'children'> {
  label?: ReactNode;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
  tw?: string;
}

const SidebarItemLink = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  function SidebarItem(
    { label, href, icon, active, badge, children, className, tw, ...rest },
    ref
  ) {
    const variant = useBlockVariant() as unknown as SidebarVariant;
    const isRail = variant === 'iconRail';
    const content = children ?? label;

    return (
      <a
        ref={ref}
        href={href ?? '#'}
        onClick={(e) => !href && e.preventDefault()}
        aria-current={active ? 'page' : undefined}
        title={isRail && typeof content === 'string' ? content : undefined}
        className={mergeTw(
          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          isRail && 'justify-center px-0 py-2.5',
          active
            ? 'bg-primary/12 font-medium text-fg ring-1 ring-inset ring-primary/20'
            : 'text-fg-muted hover:bg-fg/[0.05] hover:text-fg',
          className,
          tw
        )}
        {...rest}
      >
        <span
          className={mergeTw(
            'grid h-5 w-5 shrink-0 place-items-center',
            active ? 'text-primary' : 'text-fg-subtle group-hover:text-fg-muted'
          )}
        >
          {icon ?? <DefaultItemIcon className="h-[18px] w-[18px]" />}
        </span>
        {!isRail ? (
          <>
            <span className="flex-1 truncate">{content}</span>
            {badge !== undefined && badge !== null ? (
              <span
                className={mergeTw(
                  'ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                  accentSoft
                )}
              >
                {badge}
              </span>
            ) : null}
          </>
        ) : null}
      </a>
    );
  }
);

/* ----------------------------------- Footer ------------------------------- */

const SidebarFooter = forwardRef<HTMLDivElement, SlotProps>(function SidebarFooter(
  { children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant() as unknown as SidebarVariant;
  const isRail = variant === 'iconRail';

  return (
    <div
      ref={ref}
      className={mergeTw(
        'mt-auto shrink-0 border-t border-edge/10 p-3 text-sm text-fg-muted',
        isRail && 'flex justify-center px-0',
        className,
        tw
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

/* --------------------------------- Export --------------------------------- */

type SidebarComponent = typeof SidebarRoot & {
  Brand: typeof SidebarBrand;
  Group: typeof SidebarGroupBlock;
  Item: typeof SidebarItemLink;
  Footer: typeof SidebarFooter;
};

export const Sidebar = SidebarRoot as SidebarComponent;
Sidebar.Brand = SidebarBrand;
Sidebar.Group = SidebarGroupBlock;
Sidebar.Item = SidebarItemLink;
Sidebar.Footer = SidebarFooter;
