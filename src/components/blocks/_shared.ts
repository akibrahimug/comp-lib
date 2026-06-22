/**
 * Shared foundation for the Blocks tier — pre-assembled, multi-design components
 * (PricingCard, Hero, Navbar, SignIn …) composed from the library primitives.
 *
 * Every block exposes a 6-value `variant` prop and is themed *only* through the
 * semantic tokens (canvas / panel / elevated / edge / fg / primary …) so it
 * re-tints automatically across all themes (daylight / slate / aurum / evergreen).
 * Centralising the design vocabulary here keeps the whole suite visually coherent.
 */
import { createContext, useContext, type HTMLAttributes } from 'react';

export { mergeTw } from '../../core/mergeTw';
export { cx } from '../../core/cx';

/** Generic slot props for block sub-parts: an element's HTML attributes plus the
 *  `tw` escape hatch. Centralised here so every block imports one canonical type
 *  (avoids duplicate `SlotProps` exports colliding at the barrel). */
export type SlotProps<E extends HTMLElement = HTMLDivElement> = HTMLAttributes<E> & {
  /** Extra Tailwind classes (merged last). */
  tw?: string;
};

/* ───────────────────────────── Design language ──────────────────────────── */

/**
 * The shared 6-design surface vocabulary used by card-like blocks.
 * Full-width blocks (Hero, Navbar, Footer…) define their own layout-oriented
 * variant sets but should reuse the token classes below for their surfaces.
 */
export type BlockVariant =
  | 'minimal' // flat, low-chrome — sits directly on the canvas
  | 'bordered' // hairline edge, no shadow
  | 'elevated' // raised surface with a soft luxe shadow
  | 'glass' // translucent frosted panel
  | 'gradient' // subtle accent-tinted gradient wash
  | 'feature'; // spotlight / "most popular" — accent ring + glow

export const BLOCK_VARIANTS: BlockVariant[] = [
  'minimal',
  'bordered',
  'elevated',
  'glass',
  'gradient',
  'feature',
];

/** Root surface classes per design — all theme-following via semantic tokens. */
export const surfaceVariants: Record<BlockVariant, string> = {
  minimal: 'bg-transparent',
  bordered: 'bg-panel/60 border border-edge/12',
  elevated: 'bg-elevated border border-edge/10 shadow-luxe-sm',
  glass: 'glass',
  gradient:
    'border border-edge/12 bg-gradient-to-br from-primary/10 via-panel/40 to-accent2/10',
  feature:
    'bg-elevated border border-primary/30 ring-1 ring-primary/20 shadow-accent',
};

/* ─────────────────────── Reusable accent class strings ───────────────────── */
/* Theme-following accent helpers so every block styles CTAs/marks identically. */

/** Solid accent surface (buttons, marks) + correct contrast text. */
export const accentSolid =
  'bg-primary text-primary-fg hover:brightness-110 shadow-accent border-0';
/** Soft accent tint (chips, highlighted rows). */
export const accentSoft = 'bg-primary/10 text-primary border border-primary/20';
/** Ghost control sitting on a themed surface. */
export const ghostControl =
  'border border-edge/15 bg-fg/[0.04] text-fg hover:bg-fg/[0.08]';
/** Hairline-bordered, theme-aware input surface. */
export const inputSurface =
  'w-full rounded-xl border border-edge/15 bg-elevated/70 px-3.5 py-2.5 text-sm text-fg ' +
  'placeholder:text-fg-subtle transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25';

/* ──────────────────────── Variant context (cascade) ──────────────────────── */
/* A block's Root publishes its `variant`; sub-parts read it to adapt styling. */

export const BlockVariantContext = createContext<BlockVariant>('elevated');

/** Read the active block variant. Pass a local override to win over context. */
export function useBlockVariant(local?: BlockVariant): BlockVariant {
  const ctx = useContext(BlockVariantContext);
  return local ?? ctx;
}
