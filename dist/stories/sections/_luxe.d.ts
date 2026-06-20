import React, { type ReactNode } from 'react';
export { Icon } from '../../components/Icon';
export { Eyebrow } from '../../components/Eyebrow';
export { Stat } from '../../components/Stat';
export { Kbd } from '../../components/Kbd';
export { IconButton } from '../../components/IconButton';
export { Code } from '../../components/Code';
export type ThemeId = 'slate' | 'aurum' | 'evergreen' | 'daylight';
export declare const themes: {
    id: ThemeId;
    name: string;
    accent: string;
    scheme: 'dark' | 'light';
}[];
/** The active theme, provided by the preview decorator (defaults to daylight). */
export declare const ThemeBridgeContext: React.Context<ThemeId>;
export declare function useTheme(): {
    theme: ThemeId;
    setTheme: (t: ThemeId) => void;
};
/** Full-bleed stage with the living mesh + grain. */
export declare function LuxeStage({ children, className, switcher, }: {
    children: ReactNode;
    className?: string;
    switcher?: boolean;
}): import("react/jsx-runtime").JSX.Element;
/** Compact swatch picker, pinned bottom-right. */
export declare function FloatingThemeSwitcher(): import("react/jsx-runtime").JSX.Element;
export declare function ThemeDots(): import("react/jsx-runtime").JSX.Element;
/** Labeled segmented switcher for embedding in page chrome. */
export declare function ThemeSwitcher({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function Chip({ children, tone }: {
    children: ReactNode;
    tone?: 'default' | 'accent';
}): import("react/jsx-runtime").JSX.Element;
export declare function Logo({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function Container({ children, className }: {
    children: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/** Storybook decorator: renders the section, then a themed code panel built
 *  from the story's `parameters.sourceCode`, demonstrating the declarative
 *  library usage. Add to a section meta's `decorators`. */
export declare const withSourceBelow: (Story: React.ComponentType, ctx: any) => import("react/jsx-runtime").JSX.Element;
export declare const surface: {
    card: string;
    glass: string;
    input: string;
};
/** Accent primary button (library Button + tw). Follows the active theme accent. */
export declare const accentBtn = "bg-accent hover:bg-accent hover:brightness-110 text-onaccent font-semibold shadow-accent border-0 focus:ring-accent focus:ring-offset-canvas";
/** Ghost-on-surface button. */
export declare const ghostBtn = "border border-edge/15 bg-fg/[0.05] text-fg hover:bg-fg/[0.09] focus:ring-accent focus:ring-offset-canvas";
/** Dark/light-agnostic restyle for the library Input element (twMerge dedupes light defaults). */
export declare const darkInput = "bg-elevated/70 border-edge/20 text-fg placeholder:text-fg-subtle focus:border-accent/60 focus:ring-accent/25 focus:ring-offset-0";
