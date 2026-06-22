import React, {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { Button } from '../../Button';
import {
  mergeTw,
  accentSolid,
  SlotProps,
  BlockVariantContext,
  useBlockVariant,
} from '../_shared';

/* ════════════════════════════════════════════════════════════════════════
   EmptyState — themeable empty / zero / error state.
   6 designs via `variant`, a compound slot API for full control, and a
   data-prop form that renders a complete, centred state out of the box with an
   inline SVG illustration. Theme-following through semantic tokens only.

     // Data-prop form:
     <EmptyState variant="cta" title="No projects yet"
       description="Create your first project to get started."
       action={<Button>New project</Button>} />

     // Slot-composition form:
     <EmptyState variant="card">
       <EmptyState.Icon />
       <EmptyState.Title>No results</EmptyState.Title>
       <EmptyState.Description>Try a different query.</EmptyState.Description>
       <EmptyState.Action><Button>Clear</Button></EmptyState.Action>
     </EmptyState>
   ════════════════════════════════════════════════════════════════════════ */

export type EmptyStateVariant =
  | 'minimal'
  | 'illustrated'
  | 'card'
  | 'cta'
  | 'error'
  | 'search';

export const EMPTY_STATE_VARIANTS: EmptyStateVariant[] = [
  'minimal',
  'illustrated',
  'card',
  'cta',
  'error',
  'search',
];

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** One of the 6 designs. */
  variant?: EmptyStateVariant;
  className?: string;
  tw?: string;

  /* —— Data props (used when no children are provided) —— */
  /** Leading icon / glyph (defaults to a variant-specific illustration). */
  icon?: ReactNode;
  /** Heading. */
  title?: ReactNode;
  /** Supporting copy. */
  description?: ReactNode;
  /** Primary action(s). */
  action?: ReactNode;
}

/* ─────────────────────────────── Surfaces ──────────────────────────────── */

const surfaces: Record<EmptyStateVariant, string> = {
  minimal: 'bg-transparent',
  illustrated: 'bg-transparent',
  card: 'rounded-2xl border border-edge/12 bg-panel/70 shadow-luxe-sm backdrop-blur-xl',
  cta: 'rounded-2xl border border-primary/25 bg-primary/[0.06]',
  error: 'rounded-2xl border border-danger/30 bg-danger/[0.06]',
  search: 'bg-transparent',
};

/* ──────────────────────────── Inline illustrations ──────────────────────── */

function BoxGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M6 16 24 6l18 10v16L24 42 6 32V16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 16l18 10 18-10M24 26v16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="21" cy="21" r="13" stroke="currentColor" strokeWidth="2.4" />
      <path d="m31 31 9 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function ErrorGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M24 5 44 41H4L24 5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 19v10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="35" r="1.6" fill="currentColor" />
    </svg>
  );
}

function SparkleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path
        d="M24 6 28 18.5 40.5 22 28 25.5 24 38l-4-12.5L7.5 22 20 18.5 24 6Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function defaultGlyph(variant: EmptyStateVariant, className?: string) {
  if (variant === 'search') return <SearchGlyph className={className} />;
  if (variant === 'error') return <ErrorGlyph className={className} />;
  if (variant === 'cta') return <SparkleGlyph className={className} />;
  return <BoxGlyph className={className} />;
}

/* ----------------------------------- Icon --------------------------------- */

const EmptyStateIcon = forwardRef<HTMLDivElement, SlotProps>(function EmptyStateIcon(
  { children, className, tw, ...rest },
  ref
) {
  const variant = useBlockVariant() as unknown as EmptyStateVariant;
  const isError = variant === 'error';
  const isIllustrated = variant === 'illustrated';

  return (
    <div
      ref={ref}
      className={mergeTw(
        'grid place-items-center rounded-2xl',
        isIllustrated ? 'h-20 w-20' : 'h-14 w-14',
        isError
          ? 'bg-danger/12 text-danger ring-1 ring-inset ring-danger/20'
          : 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
        className,
        tw
      )}
      {...rest}
    >
      {children ?? defaultGlyph(variant, isIllustrated ? 'h-10 w-10' : 'h-7 w-7')}
    </div>
  );
});

/* ----------------------------------- Title -------------------------------- */

const EmptyStateTitle = forwardRef<HTMLHeadingElement, SlotProps<HTMLHeadingElement>>(
  function EmptyStateTitle({ children, className, tw, ...rest }, ref) {
    return (
      <h3
        ref={ref}
        className={mergeTw(
          'font-display text-lg font-semibold tracking-tight text-fg',
          className,
          tw
        )}
        {...rest}
      >
        {children}
      </h3>
    );
  }
);

/* -------------------------------- Description ----------------------------- */

const EmptyStateDescription = forwardRef<
  HTMLParagraphElement,
  SlotProps<HTMLParagraphElement>
>(function EmptyStateDescription({ children, className, tw, ...rest }, ref) {
  return (
    <p
      ref={ref}
      className={mergeTw('max-w-sm text-sm text-fg-muted', className, tw)}
      {...rest}
    >
      {children}
    </p>
  );
});

/* ----------------------------------- Action ------------------------------- */

const EmptyStateAction = forwardRef<HTMLDivElement, SlotProps>(function EmptyStateAction(
  { children, className, tw, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={mergeTw('mt-1 flex flex-wrap items-center justify-center gap-2.5', className, tw)}
      {...rest}
    >
      {children}
    </div>
  );
});

/* ----------------------------------- Root --------------------------------- */

const EmptyStateRoot = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { variant = 'card', className, tw, children, icon, title, description, action, ...rest },
  ref
) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <BlockVariantContext.Provider value={variant as never}>
      <div
        ref={ref}
        data-variant={variant}
        className={mergeTw(
          'flex flex-col items-center gap-4 px-6 py-12 text-center text-fg',
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
            <EmptyStateIcon>{icon}</EmptyStateIcon>
            <div className="flex flex-col items-center gap-1.5">
              {title ? <EmptyStateTitle>{title}</EmptyStateTitle> : null}
              {description ? (
                <EmptyStateDescription>{description}</EmptyStateDescription>
              ) : null}
            </div>
            {action ? (
              <EmptyStateAction>{action}</EmptyStateAction>
            ) : variant === 'cta' ? (
              <EmptyStateAction>
                <Button intent="ghost" tw={mergeTw('rounded-lg', accentSolid)}>
                  Get started
                </Button>
              </EmptyStateAction>
            ) : null}
          </>
        )}
      </div>
    </BlockVariantContext.Provider>
  );
});

/* --------------------------------- Export --------------------------------- */

type EmptyStateComponent = typeof EmptyStateRoot & {
  Icon: typeof EmptyStateIcon;
  Title: typeof EmptyStateTitle;
  Description: typeof EmptyStateDescription;
  Action: typeof EmptyStateAction;
};

export const EmptyState = EmptyStateRoot as EmptyStateComponent;
EmptyState.Icon = EmptyStateIcon;
EmptyState.Title = EmptyStateTitle;
EmptyState.Description = EmptyStateDescription;
EmptyState.Action = EmptyStateAction;
