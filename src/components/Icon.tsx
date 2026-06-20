import React, { forwardRef, type SVGProps } from 'react';
import { mergeTw } from '../core/mergeTw';

/**
 * A small, modern line-icon set (Lucide-inspired, 24px grid). Icons inherit
 * `currentColor`, so they adapt to whatever text color / theme surrounds them.
 */
export const icons = {
  sparkle: 'M12 3l1.6 4.6a3 3 0 001.8 1.8L20 11l-4.6 1.6a3 3 0 00-1.8 1.8L12 19l-1.6-4.6a3 3 0 00-1.8-1.8L4 11l4.6-1.6a3 3 0 001.8-1.8L12 3z',
  check: 'M20 6L9 17l-5-5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  bolt: 'M13 3v6h6l-8 12v-6H5l8-12z',
  shield: 'M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  dashboard: 'M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z',
  barchart: 'M3 3v18h18M8 17V11M13 17V7M18 17v-4',
  gauge: 'M12 14a2.5 2.5 0 002.5-2.5c0-1.4-2.5-5-2.5-5s-2.5 3.6-2.5 5A2.5 2.5 0 0012 14zM4.5 18a9 9 0 1115 0',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3.5 9h17M3.5 15h17M12 3a14 14 0 010 18 14 14 0 010-18z',
  users: 'M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a4 4 0 100-8 4 4 0 000 8zM22 19v-2a4 4 0 00-3-3.9M16 1.1A4 4 0 0116 9',
  bell: 'M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
  menu: 'M3 6h18M3 12h18M3 18h18',
  x: 'M18 6L6 18M6 6l12 12',
  chart: 'M3 3v18h18M7 14l3-3 3 2 5-6',
  wallet: 'M3 8a2 2 0 012-2h12.5A1.5 1.5 0 0019 7.5V7a2 2 0 00-2-2H5M3 8v8a2 2 0 002 2h13a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 01-2-2zM16.5 12.5h.01',
  creditcard: 'M3 6h18v12H3zM3 10h18M7 15h4',
  folder: 'M4 7a2 2 0 012-2h3.5l2 2H18a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V7z',
  star: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z',
  github: 'M9 19c-5 1.4-5-2.5-7-3m14 6v-3.5a3 3 0 00-.9-2.3c3-.3 6.1-1.5 6.1-6.6a5.1 5.1 0 00-1.4-3.5 4.8 4.8 0 00-.1-3.5s-1.1-.3-3.6 1.4a12.3 12.3 0 00-6.4 0C5.7 1.7 4.6 2 4.6 2a4.8 4.8 0 00-.1 3.5A5.1 5.1 0 003 9c0 5.1 3.1 6.3 6.1 6.6a3 3 0 00-.9 2.3V21',
  twitter: 'M22 4.5a8 8 0 01-2.3.6 4 4 0 001.8-2.2 8 8 0 01-2.5 1 4 4 0 00-6.9 3.6A11.3 11.3 0 013 3.3a4 4 0 001.2 5.3 4 4 0 01-1.8-.5 4 4 0 003.2 4 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 21a11.3 11.3 0 006.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0022 4.5z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z',
  rocket: 'M5 14l-2 5 5-2m2-2a14 14 0 01.5-9A9 9 0 0119 4a9 9 0 01-1.4 9.5 14 14 0 01-9 .5L5 14zm9-5.5h.01',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 018 0v4',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z',
  'eye-off': 'M10 5.1A11 11 0 0112 5c6.4 0 10 7 10 7a18 18 0 01-2.2 3M6.6 6.6A18 18 0 002 12s3.6 7 10 7a11 11 0 005.3-1.3M3 3l18 18M9.9 9.9a3 3 0 004.2 4.2',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  home: 'M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10',
  cog: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 13.5a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-2.9-1.1l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00-1.2-2.9H3a2 2 0 110-4h.2a1.7 1.7 0 001.1-2.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.4h.1A1.7 1.7 0 0010 3.2V3a2 2 0 114 0v.2a1.7 1.7 0 002.9 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.4 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.5 1z',
  logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
  plus: 'M12 5v14M5 12h14',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5',
  download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  // filled (rendered solid)
  google: 'M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 01-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z M12 22c2.7 0 5-1 6.6-2.4l-3.3-2.5c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3.1v2.6A10 10 0 0012 22z M6.5 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 000 9.2L6.5 14z M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0012 2 10 10 0 003.1 7.4L6.5 10c.8-2.4 2.9-4 5.5-4z',
} as const;

/** Icons drawn as solid fills rather than strokes. */
const FILLED = new Set<string>(['google']);

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name from the built-in set (any string accepted; unknown renders nothing) */
  name: IconName | (string & {});
  /** Pixel size (sets width & height) */
  size?: number;
  /** Additional Tailwind classes */
  tw?: string;
}

/**
 * Render a named icon. Inherits `currentColor`.
 *
 * @example
 * <Icon name="sparkle" className="h-5 w-5 text-brand-600" />
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size, className, tw, ...props },
  ref
) {
  const d = icons[name as IconName];
  const filled = FILLED.has(name);
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={mergeTw(size ? undefined : 'h-5 w-5', className, tw)}
      aria-hidden="true"
      {...props}
    >
      {d ? <path d={d} /> : null}
    </svg>
  );
});
