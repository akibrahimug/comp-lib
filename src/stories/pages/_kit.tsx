import React, { type ReactNode } from 'react';
import { Icon as LuxeIcon } from '../sections/_luxe';

/* ════════════════════════════════════════════════════════════════════════
   Shared toolkit for the full-page industry demos under "Pages/*".

   These pages reuse the runtime-themeable "luxe" toolkit (LuxeStage, surface
   tokens, accent/ghost buttons, the theme switcher …) so every page follows
   the active Storybook theme. This module re-exports those helpers and extends
   the icon set with the extra glyphs the pages need (cart, calendar, plane …)
   without touching the shared _luxe file.
   ════════════════════════════════════════════════════════════════════════ */

export {
  LuxeStage,
  Container,
  Eyebrow,
  Chip,
  Logo,
  ThemeSwitcher,
  ThemeDots,
  surface,
  accentBtn,
  ghostBtn,
  darkInput,
} from '../sections/_luxe';

/* ─────────────────────── Extra Lucide-style icons ─────────────────────── */
/* 24px grid, 1.75 stroke, round joins — matching the _luxe set. */

const extra: Record<string, ReactNode> = {
  bag: <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />,
  heart: <path d="M19.5 12.6L12 20l-7.5-7.4a5 5 0 117.5-6.6 5 5 0 117.5 6.6z" />,
  minus: <path d="M5 12h14" />,
  tag: <path d="M20.6 13.4L13.4 20.6a2 2 0 01-2.8 0l-7.2-7.2A2 2 0 013 12V4a1 1 0 011-1h8a2 2 0 011.4.6l7.2 7.2a2 2 0 010 2.6zM7.5 7.5h.01" />,
  truck: <path d="M1 4h15v12H1zM16 8h4l3 3v5h-7M5.5 19a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM18.5 19a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z" />,
  calendar: <path d="M3 6a2 2 0 012-2h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 10h18M8 2v4M16 2v4" />,
  'calendar-check': <path d="M3 6a2 2 0 012-2h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 10h18M8 2v4M16 2v4M9 15l2 2 4-4" />,
  clock: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2" />,
  activity: <path d="M22 12h-4l-3 8-6-16-3 8H2" />,
  pill: <path d="M10.5 20.5a4.2 4.2 0 01-6-6l6-6a4.2 4.2 0 016 6l-6 6zM8.5 8.5l7 7" />,
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 014 13 19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />,
  file: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13h6M9 17h4" />,
  pin: <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  plane: <path d="M17.8 19.2L15 11l3.5-3.5a2.1 2.1 0 00-3-3L12 8 3.8 5.7a.8.8 0 00-.8 1.3L7 10l-2.5 2.5-2.5-.5-1 1 4 2.4L11 19.5l1-1-.5-2.5L14 13.5l4.5 4.7a.8.8 0 001.3-.4z" />,
  bed: <path d="M3 7v13M3 13h18v7M21 13v-1a3 3 0 00-3-3H9M7 13v-2a2 2 0 012-2" />,
  send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  repeat: <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />,
  utensils: <path d="M5 3v7a2 2 0 002 2v9M7 3v6M9 3v7M17 3c-1.7 0-2.5 2.5-2.5 5.5S15.3 13 17 13v8" />,
  coffee: <path d="M4 8h13v4a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 8h2a3 3 0 010 6h-2M7 1v2M11 1v2M15 1v2" />,
  leaf: <path d="M11 20A7 7 0 014 13C4 6 9 3 20 3c0 11-3 16-9 16a4 4 0 01-1-.1zM4 21c1.5-5 5-9 11-11" />,
  flame: <path d="M12 2s5 4 5 9a5 5 0 11-10 0c0-1.2.4-2.2 1-3 .5 1.3 1.2 1.7 2 1.7C9 6.5 12 5 12 2z" />,
  filter: <path d="M22 3H2l8 9.5V21l4-2v-6.5L22 3z" />,
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  building: <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 21v-4h4v4" />,
  quote: <path d="M10 11H5a1 1 0 01-1-1V8a3 3 0 013-3M10 11v3a4 4 0 01-4 4M20 11h-5a1 1 0 01-1-1V8a3 3 0 013-3M20 11v3a4 4 0 01-4 4" />,
  shirt: <path d="M16 3l5 3-2.5 4L17 9v11H7V9l-1.5 1L3 6l5-3 4 3 4-3z" />,
  flask: <path d="M9 3h6M10 3v6L5 19a2 2 0 002 3h10a2 2 0 002-3l-5-10V3M7.5 14h9" />,
  award: <path d="M12 15a6 6 0 100-12 6 6 0 000 12zM8.2 13.6L7 22l5-3 5 3-1.2-8.4" />,
  shield: <path d="M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3zM9 12l2 2 4-4" />,
  map: <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" />,
  ticket: <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2 2 2 0 000 4 2 2 0 00-2 2v0a2 2 0 01-2 2H5a2 2 0 01-2-2 2 2 0 000-4 2 2 0 002-2zM14 6v12" />,
  play: <path d="M6 4l14 8-14 8V4z" />,
  book: <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />,
  cart: <path d="M3 3h2l2.4 12.4a1 1 0 001 .8h9.7a1 1 0 001-.8L21 7H6M10 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z" />,
  wifi: <path d="M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0M2 9a15 15 0 0120 0M12 19.5h.01" />,
};

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  if (extra[name]) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {extra[name]}
      </svg>
    );
  }
  return <LuxeIcon name={name} className={className} />;
}

/* ────────────────────────────── tiny helpers ──────────────────────────── */

export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

/** Rounded 0–5 star row driven by the active accent. */
export function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon
          key={i}
          name="star"
          className={`h-3.5 w-3.5 ${i < Math.round(value) ? 'text-accent [&_path]:fill-accent' : 'text-fg-subtle/40'}`}
        />
      ))}
    </span>
  );
}
