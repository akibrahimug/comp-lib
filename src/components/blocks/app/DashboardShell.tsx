import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import {
  mergeTw,
  SlotProps,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   DashboardShell — a themeable app-layout wrapper.
   6 layout designs via `variant` that arrange three regions — Sidebar, Topbar
   and Content — with responsive grid/flex positioning. A compound slot API for
   full control, plus a data-prop form that renders labelled placeholder regions
   out of the box. Theme-following through semantic tokens only.

     // Slot-composition form:
     <DashboardShell variant="sidebarLeft">
       <DashboardShell.Sidebar><Sidebar … /></DashboardShell.Sidebar>
       <DashboardShell.Topbar><Navbar … /></DashboardShell.Topbar>
       <DashboardShell.Content>…</DashboardShell.Content>
     </DashboardShell>
   ════════════════════════════════════════════════════════════════════════ */

export type DashboardShellVariant =
  | 'sidebarLeft'
  | 'sidebarRight'
  | 'topnav'
  | 'compact'
  | 'glass'
  | 'split';

export const DASHBOARD_SHELL_VARIANTS: DashboardShellVariant[] = [
  'sidebarLeft',
  'sidebarRight',
  'topnav',
  'compact',
  'glass',
  'split',
];

export interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
  /** One of the 6 layout designs. */
  variant?: DashboardShellVariant;
  className?: string;
  tw?: string;
}

/* ─────────────────────────────── Surfaces ──────────────────────────────── */

const surfaces: Record<DashboardShellVariant, string> = {
  sidebarLeft: 'bg-canvas',
  sidebarRight: 'bg-canvas',
  topnav: 'bg-canvas',
  compact: 'bg-canvas',
  glass: 'mesh',
  split: 'bg-gradient-to-br from-canvas via-canvas to-primary/[0.04]',
};

/* Whether the layout places the sidebar in a horizontal row (vs. stacked). */
const ROW_LAYOUTS: DashboardShellVariant[] = [
  'sidebarLeft',
  'sidebarRight',
  'compact',
  'glass',
  'split',
];

/* ----------------------------------- Sidebar ------------------------------ */

const ShellSidebar = forwardRef<HTMLDivElement, SlotProps>(function DashboardShellSidebar(
  { children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant() as unknown as DashboardShellVariant;
  const isTopnav = variant === 'topnav';
  const isCompact = variant === 'compact';

  if (isTopnav) return null;

  return (
    <div
      ref={ref}
      data-region="sidebar"
      className={mergeTw(
        'hidden shrink-0 md:block',
        isCompact ? 'md:w-16' : 'md:w-64',
        variant === 'split' && 'md:w-72',
        className,
        tw
      )}
      {...rest}
    >
      {children ?? (
        <div
          className={mergeTw(
            'flex h-full flex-col gap-3 p-3',
            variant === 'glass'
              ? 'glass m-3 rounded-2xl'
              : 'border-r border-edge/10 bg-panel/60'
          )}
        >
          <PlaceholderLabel>Sidebar</PlaceholderLabel>
          <div className="flex flex-1 flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-lg bg-fg/[0.04] ring-1 ring-inset ring-edge/8"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

/* ----------------------------------- Topbar ------------------------------- */

const ShellTopbar = forwardRef<HTMLDivElement, SlotProps>(function DashboardShellTopbar(
  { children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant() as unknown as DashboardShellVariant;

  return (
    <div
      ref={ref}
      data-region="topbar"
      className={mergeTw(
        'shrink-0',
        variant === 'glass'
          ? 'glass border-b border-edge/10'
          : 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
        className,
        tw
      )}
      {...rest}
    >
      {children ?? (
        <div className="flex h-16 items-center gap-3 px-5">
          <PlaceholderLabel>Topbar</PlaceholderLabel>
          <div className="ml-auto h-9 w-9 rounded-full bg-fg/[0.06] ring-1 ring-inset ring-edge/10" />
        </div>
      )}
    </div>
  );
});

/* ----------------------------------- Content ------------------------------ */

const ShellContent = forwardRef<HTMLElement, SlotProps<HTMLElement>>(
  function DashboardShellContent({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant() as unknown as DashboardShellVariant;
    const isCompact = variant === 'compact';

    return (
      <main
        ref={ref as never}
        data-region="content"
        className={mergeTw(
          'scrollbar-luxe flex-1 overflow-y-auto',
          isCompact ? 'p-4' : 'p-6',
          className,
          tw
        )}
        {...rest}
      >
        {children ?? (
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
            <PlaceholderLabel>Content</PlaceholderLabel>
            <div className="grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl border border-edge/10 bg-elevated/60 shadow-luxe-sm"
                />
              ))}
            </div>
            <div className="h-64 rounded-2xl border border-edge/10 bg-elevated/40" />
          </div>
        )}
      </main>
    );
  }
);

/* --------------------------------- Placeholder ---------------------------- */

function PlaceholderLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
      {children}
    </span>
  );
}

/* ------------------------- Default region extraction ---------------------- */
/* When rendering placeholders, find which slots the consumer passed so we can
   keep the layout intact while filling the rest with default regions. */

function findSlot(children: ReactNode, slot: React.ElementType): ReactNode {
  let found: ReactNode = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === slot) found = child;
  });
  return found;
}

/* ----------------------------------- Root --------------------------------- */

const DashboardShellRoot = forwardRef<HTMLDivElement, DashboardShellProps>(
  function DashboardShell({ variant = 'sidebarLeft', className, tw, children, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isRow = ROW_LAYOUTS.includes(variant);
    const sidebarRight = variant === 'sidebarRight';

    // Resolve regions: use provided slots, else defaults.
    const sidebar = hasChildren ? findSlot(children, ShellSidebar) : <ShellSidebar />;
    const topbar = hasChildren ? findSlot(children, ShellTopbar) : <ShellTopbar />;
    const content = hasChildren ? findSlot(children, ShellContent) : <ShellContent />;

    return (
      <BlockVariantContext.Provider value={variant as never}>
        <div
          ref={ref}
          data-variant={variant}
          className={mergeTw(
            'flex h-full min-h-[28rem] w-full flex-col overflow-hidden text-fg',
            surfaces[variant],
            className,
            tw
          )}
          {...rest}
        >
          {isRow ? (
            /* Sidebar beside a column of [topbar, content]. */
            <div className={mergeTw('flex h-full flex-1', sidebarRight && 'flex-row-reverse')}>
              {sidebar}
              <div className="flex h-full min-w-0 flex-1 flex-col">
                {topbar}
                {content}
              </div>
            </div>
          ) : (
            /* topnav: topbar on top, content below (no sidebar). */
            <>
              {topbar}
              <div className="flex h-full min-h-0 flex-1 flex-col">{content}</div>
            </>
          )}
        </div>
      </BlockVariantContext.Provider>
    );
  }
);

/* --------------------------------- Export --------------------------------- */

type DashboardShellComponent = typeof DashboardShellRoot & {
  Sidebar: typeof ShellSidebar;
  Topbar: typeof ShellTopbar;
  Content: typeof ShellContent;
};

export const DashboardShell = DashboardShellRoot as DashboardShellComponent;
DashboardShell.Sidebar = ShellSidebar;
DashboardShell.Topbar = ShellTopbar;
DashboardShell.Content = ShellContent;
