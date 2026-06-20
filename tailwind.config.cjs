/**
 * Design tokens.
 *
 * Two layers live here:
 *  1. Generic, themeable component tokens (brand / gray / semantic scales) — these
 *     drive the published components and ship with full 50–900 ramps so every
 *     shade a component references actually renders.
 *  2. "Luxe" tokens (ink / surface / line / gold / iris) — the bespoke dark
 *     identity used by the Storybook UI and the showcase sections. They give the
 *     near-black canvas, hairline borders, glassy surfaces and a single gold
 *     jewel accent with a cool iris counter-tone for atmosphere.
 */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}", "./.storybook/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Theme-driven semantic tokens (CSS variables) ──────────────────
        // These power the showcase Sections + Welcome page and swap at runtime
        // via [data-theme] on <html>. Defined in src/styles/tailwind.css.
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",
        elevated: "rgb(var(--c-elevated) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        edge: "rgb(var(--c-edge) / <alpha-value>)",
        fg: {
          DEFAULT: "rgb(var(--c-fg) / <alpha-value>)",
          muted: "rgb(var(--c-fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--c-fg-subtle) / <alpha-value>)",
        },
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        accent2: "rgb(var(--c-accent-2) / <alpha-value>)",
        onaccent: "rgb(var(--c-on-accent) / <alpha-value>)",

        // ── Brand (refined sapphire) ──────────────────────────────────────
        brand: {
          DEFAULT: "#005BBB",
          50: "#EAF2FB", 100: "#D2E3F6", 200: "#A6C7ED", 300: "#79AAE3",
          400: "#3D82D2", 500: "#005BBB", 600: "#005BBB", 700: "#004E9F",
          800: "#003E7D", 900: "#002E5C",
        },
        // ── Gold — the luxe jewel accent ──────────────────────────────────
        gold: {
          DEFAULT: "#E0B45C",
          50: "#FBF6EA", 100: "#F7ECCF", 200: "#F1DCA3", 300: "#EBCB78",
          400: "#E6BF66", 500: "#E0B45C", 600: "#C99B4E", 700: "#A87D3A",
          800: "#7E5D2B", 900: "#543E1D",
        },
        // ── Iris — cool counter-tone for atmosphere / secondary accents ───
        iris: {
          DEFAULT: "#7C5CFF",
          300: "#AD99FF", 400: "#8B6CFF", 500: "#7C5CFF",
          600: "#6A45F5", 700: "#5733D6",
        },
        // ── Teal — third mesh tone ────────────────────────────────────────
        teal: {
          DEFAULT: "#36D6C3",
          400: "#5FE3D3", 500: "#36D6C3", 600: "#22B3A2",
        },
        // ── Ink / surface / line — the dark canvas system ─────────────────
        ink: {
          DEFAULT: "#0B0B0F",
          900: "#0B0B0F", 800: "#0E0E15", 700: "#13131C", 600: "#191923",
          500: "#20202C", 400: "#2A2A38",
        },
        surface: {
          DEFAULT: "#15151D",
          1: "#13131B", 2: "#191922", 3: "#20202B", 4: "#272734",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          soft: "rgba(255,255,255,0.06)",
          strong: "rgba(255,255,255,0.14)",
        },
        // text on dark
        haze: {
          DEFAULT: "#A2A2B0",
          high: "#F4F4F7", mid: "#A2A2B0", low: "#6B6B79",
        },
        // ── Neutral gray ramp ─────────────────────────────────────────────
        gray: {
          25: "#FCFCFD", 50: "#F9FAFB", 100: "#F2F4F7", 200: "#EAECF0",
          300: "#D0D5DD", 400: "#98A2B3", 500: "#667085", 600: "#475467",
          700: "#344054", 800: "#1D2939", 900: "#101828",
        },
        // ── Semantic scales (full ramps so *-100/*-800 etc. resolve) ──────
        danger: {
          DEFAULT: "#DC2626",
          50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5",
          400: "#F87171", 500: "#EF4444", 600: "#DC2626", 700: "#B91C1C",
          800: "#991B1B", 900: "#7F1D1D",
        },
        success: {
          DEFAULT: "#16A34A",
          50: "#F0FDF4", 100: "#DCFCE7", 200: "#BBF7D0", 300: "#86EFAC",
          400: "#4ADE80", 500: "#22C55E", 600: "#16A34A", 700: "#15803D",
          800: "#166534", 900: "#14532D",
        },
        info: {
          DEFAULT: "#0284C7",
          50: "#F0F9FF", 100: "#E0F2FE", 200: "#BAE6FD", 300: "#7DD3FC",
          400: "#38BDF8", 500: "#0EA5E9", 600: "#0284C7", 700: "#0369A1",
          800: "#075985", 900: "#0C4A6E",
        },
        accent: {
          DEFAULT: "#FFB703",
          50: "#FFF8E6", 100: "#FFEFC2", 200: "#FFE08A", 300: "#FFD152",
          400: "#FFC22B", 500: "#FFB703", 600: "#F59E0B", 700: "#D97706",
          800: "#A85A06", 900: "#7C3D03",
        },
      },
      borderRadius: { xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", "4xl": "2rem" },
      fontFamily: {
        sans: ['"Hanken Grotesk"', "system-ui", "ui-sans-serif", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ['"Fraunces"', "ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: { tightest: "-0.04em", widestx: "0.28em" },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.05), 0 4px 8px rgba(16,24,40,0.06)",
        // dark / luxe
        luxe: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 70px -28px rgba(0,0,0,0.8)",
        "luxe-sm": "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 10px 30px -14px rgba(0,0,0,0.7)",
        glow: "0 0 0 1px rgba(224,180,92,0.30), 0 10px 44px -10px rgba(224,180,92,0.40)",
        accent: "0 8px 34px -10px rgb(var(--c-accent) / 0.5)",
        "glow-iris": "0 0 0 1px rgba(124,92,255,0.30), 0 10px 44px -10px rgba(124,92,255,0.40)",
        hairline: "0 0 0 1px rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        // layered radial mesh — gold + iris + teal on near-black
        "mesh-luxe":
          "radial-gradient(58% 40% at 12% 6%, rgba(224,180,92,0.18) 0%, transparent 60%)," +
          "radial-gradient(50% 38% at 92% 10%, rgba(124,92,255,0.18) 0%, transparent 60%)," +
          "radial-gradient(60% 50% at 78% 96%, rgba(54,214,195,0.12) 0%, transparent 60%)," +
          "radial-gradient(50% 45% at 30% 88%, rgba(224,180,92,0.08) 0%, transparent 60%)",
        "gold-sheen":
          "linear-gradient(135deg, #F1DCA3 0%, #E0B45C 38%, #C99B4E 70%, #F1DCA3 100%)",
        "iris-sheen":
          "linear-gradient(135deg, #AD99FF 0%, #7C5CFF 50%, #6A45F5 100%)",
        "hairline-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        // subtle film grain (data-uri noise)
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      backgroundSize: { grid: "44px 44px" },
      keyframes: {
        spin: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "zoom-in-95": { "0%": { transform: "scale(0.95)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        "slide-in-from-right": { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0)" } },
        "slide-in-from-left": { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(0)" } },
        "slide-in-from-top": { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(0)" } },
        "slide-in-from-bottom": { "0%": { transform: "translateY(100%)" }, "100%": { transform: "translateY(0)" } },
        // luxe motion
        "mesh-pan": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-2%,-1.5%,0) scale(1.06)" },
        },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        spin: "spin 1s linear infinite",
        "fade-in": "fade-in 200ms ease-in-out",
        "fade-up": "fade-up 600ms cubic-bezier(0.16,1,0.3,1) both",
        "zoom-in-95": "zoom-in-95 200ms ease-in-out",
        "slide-in-from-right": "slide-in-from-right 200ms ease-in-out",
        "slide-in-from-left": "slide-in-from-left 200ms ease-in-out",
        "slide-in-from-top": "slide-in-from-top 200ms ease-in-out",
        "slide-in-from-bottom": "slide-in-from-bottom 200ms ease-in-out",
        "mesh-pan": "mesh-pan 22s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
        float: "float 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [
    // Ship the theme-variable defaults so the semantic tokens (canvas / fg /
    // panel / accent …) resolve for consumers out of the box. :root defaults to
    // a light theme; data-theme on <html> opts into the others.
    require("tailwindcss/plugin")(function ({ addBase }) {
      const light = {
        "--c-canvas": "244 245 243",
        "--c-elevated": "255 255 255",
        "--c-panel": "255 255 255",
        "--c-edge": "18 22 33",
        "--c-fg": "24 27 33",
        "--c-fg-muted": "87 94 107",
        "--c-fg-subtle": "131 138 151",
        "--c-accent": "79 70 229",
        "--c-accent-2": "13 148 136",
        "--c-on-accent": "255 255 255",
        "--glass-shadow": "0 18px 48px -22px rgba(17,24,39,0.22)",
        "color-scheme": "light",
      };
      const slate = {
        "--c-canvas": "11 13 18",
        "--c-elevated": "21 24 33",
        "--c-panel": "30 35 47",
        "--c-edge": "226 232 248",
        "--c-fg": "236 238 243",
        "--c-fg-muted": "169 175 189",
        "--c-fg-subtle": "119 125 140",
        "--c-accent": "129 140 248",
        "--c-accent-2": "45 212 191",
        "--c-on-accent": "10 12 18",
        "--glass-shadow": "0 24px 70px -28px rgba(0,0,0,0.75)",
        "color-scheme": "dark",
      };
      const aurum = {
        "--c-canvas": "13 12 11",
        "--c-elevated": "26 23 19",
        "--c-panel": "38 33 26",
        "--c-edge": "245 238 226",
        "--c-fg": "244 242 236",
        "--c-fg-muted": "181 174 159",
        "--c-fg-subtle": "128 121 106",
        "--c-accent": "226 184 99",
        "--c-accent-2": "139 110 255",
        "--c-on-accent": "12 11 9",
        "--glass-shadow": "0 24px 70px -28px rgba(0,0,0,0.8)",
        "color-scheme": "dark",
      };
      const evergreen = {
        "--c-canvas": "8 15 13",
        "--c-elevated": "15 27 22",
        "--c-panel": "22 37 30",
        "--c-edge": "220 245 233",
        "--c-fg": "230 240 235",
        "--c-fg-muted": "155 178 167",
        "--c-fg-subtle": "105 128 117",
        "--c-accent": "53 214 156",
        "--c-accent-2": "56 189 248",
        "--c-on-accent": "5 14 11",
        "--glass-shadow": "0 24px 70px -28px rgba(0,0,0,0.78)",
        "color-scheme": "dark",
      };
      addBase({
        ":root": light,
        '[data-theme="daylight"]': light,
        '[data-theme="slate"]': slate,
        '[data-theme="aurum"]': aurum,
        '[data-theme="evergreen"]': evergreen,
      });
    }),
  ],
};
