import React, { createContext, useContext, type ReactNode } from 'react';
import { addons } from '@storybook/preview-api';
import { Icon } from '../../components/Icon';
import { Code } from '../../components/Code';

// Re-export the migrated library components so sections consume them from here.
export { Icon } from '../../components/Icon';
export { Eyebrow } from '../../components/Eyebrow';
export { Stat } from '../../components/Stat';
export { Kbd } from '../../components/Kbd';
export { IconButton } from '../../components/IconButton';
export { Code } from '../../components/Code';

// Storybook's global-update channel event (constant value of UPDATE_GLOBALS).
const UPDATE_GLOBALS = 'updateGlobals';

/* ════════════════════════════════════════════════════════════════════════
   Shared "luxe" toolkit for the showcase Sections.
   Theming is driven by the Storybook global `theme` (toolbar) which a preview
   decorator reflects onto <html data-theme>. In-page switchers read the current
   value from ThemeBridgeContext and write back through the Storybook channel,
   so the toolbar and every on-page switcher stay perfectly in sync.
   ════════════════════════════════════════════════════════════════════════ */

export type ThemeId = 'slate' | 'aurum' | 'evergreen' | 'daylight';

export const themes: { id: ThemeId; name: string; accent: string; scheme: 'dark' | 'light' }[] = [
  { id: 'slate', name: 'Slate', accent: '#818CF8', scheme: 'dark' },
  { id: 'aurum', name: 'Aurum', accent: '#E2B863', scheme: 'dark' },
  { id: 'evergreen', name: 'Evergreen', accent: '#35D69C', scheme: 'dark' },
  { id: 'daylight', name: 'Daylight', accent: '#4F46E5', scheme: 'light' },
];

/** The active theme, provided by the preview decorator (defaults to daylight). */
export const ThemeBridgeContext = createContext<ThemeId>('daylight');

export function useTheme() {
  const theme = useContext(ThemeBridgeContext);
  const setTheme = (t: ThemeId) => {
    try {
      addons.getChannel().emit(UPDATE_GLOBALS, { globals: { theme: t } });
    } catch {
      /* not in a Storybook channel context */
    }
    // Optimistic: also reflect immediately so the canvas updates without a tick.
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', t);
  };
  return { theme, setTheme };
}

/** Full-bleed stage with the living mesh + grain. */
export function LuxeStage({
  children,
  className = '',
  switcher = true,
}: {
  children: ReactNode;
  className?: string;
  switcher?: boolean;
}) {
  return (
    <div className={`mesh grain scrollbar-luxe relative min-h-screen w-full font-sans text-fg antialiased ${className}`}>
      {switcher && <FloatingThemeSwitcher />}
      {children}
    </div>
  );
}

/** Compact swatch picker, pinned bottom-right. */
export function FloatingThemeSwitcher() {
  return (
    <div className="glass fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full px-3 py-2">
      <span className="hidden font-mono text-[10px] uppercase tracking-widest text-fg-subtle sm:inline">Theme</span>
      <ThemeDots />
    </div>
  );
}

export function ThemeDots() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id)}
          aria-label={`${t.name} theme`}
          aria-pressed={theme === t.id}
          title={t.name}
          className={`h-5 w-5 rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/60 ${
            theme === t.id ? 'ring-2 ring-fg/80 ring-offset-2 ring-offset-canvas' : 'ring-1 ring-black/20'
          }`}
          style={{ background: t.accent }}
        />
      ))}
    </div>
  );
}

/** Labeled segmented switcher for embedding in page chrome. */
export function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`inline-flex items-center gap-0.5 rounded-full border border-edge/15 bg-fg/[0.04] p-1 ${className}`}>
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id)}
          aria-pressed={theme === t.id}
          title={t.name}
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
            theme === t.id ? 'bg-accent/20 text-fg' : 'text-fg-muted hover:text-fg'
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/20" style={{ background: t.accent }} />
          <span className="hidden md:inline">{t.name}</span>
        </button>
      ))}
    </div>
  );
}

/* ───────────────────────────── Primitives ─────────────────────────────── */


export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  const tones = {
    default: 'border-edge/15 text-fg-muted',
    accent: 'border-accent/40 text-accent bg-accent/10',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-accent-sheen shadow-accent">
        <Icon name="sparkle" className="relative h-[18px] w-[18px] text-onaccent" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
        comp<span className="text-accent">·</span>lib
      </span>
    </a>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>;
}

/* ──────────────── Source-code panel shown below each section ───────────── */

/** Storybook decorator: renders the section, then a themed code panel built
 *  from the story's `parameters.sourceCode`, demonstrating the declarative
 *  library usage. Add to a section meta's `decorators`. */
export const withSourceBelow = (Story: React.ComponentType, ctx: any) => {
  const code: string | undefined = ctx?.parameters?.sourceCode;
  return (
    <>
      <Story />
      {code && (
        <div className="mesh scrollbar-luxe border-t border-edge/10 py-14">
          <Container>
            <div className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-fg-subtle">
              <Icon name="bolt" className="h-3.5 w-3.5 text-accent" />
              How it's built · component library, declaratively
            </div>
            <Code code={code} filename="section.tsx" lang="tsx" />
          </Container>
        </div>
      )}
    </>
  );
};

/* Common theme-driven surface/control class strings reused by sections. */
export const surface = {
  card: 'rounded-2xl border border-edge/12 bg-panel/80 backdrop-blur-xl shadow-luxe-sm',
  glass: 'glass rounded-2xl',
  input:
    'w-full rounded-xl border border-edge/15 bg-elevated/70 px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle ' +
    'transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25',
};

/** Accent primary button (library Button + tw). Follows the active theme accent. */
export const accentBtn =
  'bg-accent hover:bg-accent hover:brightness-110 text-onaccent font-semibold shadow-accent border-0 focus:ring-accent focus:ring-offset-canvas';
/** Ghost-on-surface button. */
export const ghostBtn =
  'border border-edge/15 bg-fg/[0.05] text-fg hover:bg-fg/[0.09] focus:ring-accent focus:ring-offset-canvas';

/** Dark/light-agnostic restyle for the library Input element (twMerge dedupes light defaults). */
export const darkInput =
  'bg-elevated/70 border-edge/20 text-fg placeholder:text-fg-subtle focus:border-accent/60 focus:ring-accent/25 focus:ring-offset-0';
