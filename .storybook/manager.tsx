import React from "react";
import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

/* ════════════════════════════════════════════════════════════════════════
   The Storybook chrome (sidebar + toolbar + panels) is themed to MATCH the
   toolbar "Theme" global, so switching the theme re-skins the entire
   Storybook UI — not just the story canvas. We register a manager addon that
   listens for global changes and re-applies the matching manager theme.
   ════════════════════════════════════════════════════════════════════════ */

const shared = {
  brandTitle: "comp·lib — themeable component system",
  brandUrl: "#",
  brandTarget: "_self",
  fontBase: '"Hanken Grotesk", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, monospace',
  appBorderRadius: 12,
  inputBorderRadius: 8,
};

const managerThemes = {
  slate: create({
    ...shared,
    base: "dark",
    colorPrimary: "#818CF8",
    colorSecondary: "#818CF8",
    appBg: "#0F1320",
    appContentBg: "#0C0F18",
    appPreviewBg: "#0C0F18",
    appBorderColor: "rgba(226,232,248,0.10)",
    barBg: "#0F1320",
    barTextColor: "#A9AFBD",
    barHoverColor: "#ECEEF3",
    barSelectedColor: "#818CF8",
    textColor: "#ECEEF3",
    textInverseColor: "#0B0D12",
    textMutedColor: "#8A90A0",
    inputBg: "#161A28",
    inputBorder: "rgba(226,232,248,0.14)",
    inputTextColor: "#ECEEF3",
  }),
  aurum: create({
    ...shared,
    base: "dark",
    colorPrimary: "#E2B863",
    colorSecondary: "#E2B863",
    appBg: "#17130D",
    appContentBg: "#110E09",
    appPreviewBg: "#110E09",
    appBorderColor: "rgba(245,238,226,0.10)",
    barBg: "#17130D",
    barTextColor: "#A89F8D",
    barHoverColor: "#F4F2EC",
    barSelectedColor: "#E2B863",
    textColor: "#F4F2EC",
    textInverseColor: "#0C0B09",
    textMutedColor: "#9A9486",
    inputBg: "#221C13",
    inputBorder: "rgba(245,238,226,0.14)",
    inputTextColor: "#F4F2EC",
  }),
  evergreen: create({
    ...shared,
    base: "dark",
    colorPrimary: "#35D69C",
    colorSecondary: "#35D69C",
    appBg: "#0C1814",
    appContentBg: "#08110D",
    appPreviewBg: "#08110D",
    appBorderColor: "rgba(220,245,233,0.10)",
    barBg: "#0C1814",
    barTextColor: "#8FA89B",
    barHoverColor: "#E6F0EB",
    barSelectedColor: "#35D69C",
    textColor: "#E6F0EB",
    textInverseColor: "#05140F",
    textMutedColor: "#7E978B",
    inputBg: "#112019",
    inputBorder: "rgba(220,245,233,0.14)",
    inputTextColor: "#E6F0EB",
  }),
  daylight: create({
    ...shared,
    base: "light",
    colorPrimary: "#4F46E5",
    colorSecondary: "#4F46E5",
    appBg: "#EEEFEC",
    appContentBg: "#FFFFFF",
    appPreviewBg: "#FFFFFF",
    appBorderColor: "rgba(18,22,33,0.12)",
    barBg: "#FFFFFF",
    barTextColor: "#57606A",
    barHoverColor: "#181B21",
    barSelectedColor: "#4F46E5",
    textColor: "#181B21",
    textInverseColor: "#FFFFFF",
    textMutedColor: "#6B7280",
    inputBg: "#FFFFFF",
    inputBorder: "rgba(18,22,33,0.18)",
    inputTextColor: "#181B21",
  }),
} as const;

type ThemeKey = keyof typeof managerThemes;

/* ───────────────────────── Modern sidebar icons ───────────────────────── */

const ICONS: Record<string, string> = {
  sparkle: "M12 3l1.6 4.6a3 3 0 001.8 1.8L20 11l-4.6 1.6a3 3 0 00-1.8 1.8L12 19l-1.6-4.6a3 3 0 00-1.8-1.8L4 11l4.6-1.6a3 3 0 001.8-1.8L12 3z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z",
  rocket: "M5 14l-2 5 5-2m2-2a14 14 0 01.5-9A9 9 0 0119 4a9 9 0 01-1.4 9.5 14 14 0 01-9 .5L5 14z",
  dashboard: "M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4",
  window: "M3 5h18v14H3zM3 9h18",
  cog: "M12 15a3 3 0 100-6 3 3 0 000 6zM5 12a7 7 0 01.1-1l-2-1.5 2-3.4 2.3 1a7 7 0 011.7-1l.3-2.6h4l.3 2.6a7 7 0 011.7 1l2.3-1 2 3.4-2 1.5a7 7 0 010 2l2 1.5-2 3.4-2.3-1a7 7 0 01-1.7 1l-.3 2.6h-4l-.3-2.6a7 7 0 01-1.7-1l-2.3 1-2-3.4 2-1.5A7 7 0 015 12z",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM19 19H6",
  dot: "M12 8a4 4 0 100 8 4 4 0 000-8z",
  component: "M12 3l3.5 3.5L12 10 8.5 6.5zM6.5 8.5L10 12l-3.5 3.5L3 12zM17.5 8.5L21 12l-3.5 3.5L14 12zM12 14l3.5 3.5L12 21l-3.5-3.5z",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5",
};

function svg(path: string, color: string) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={path} />
    </svg>
  );
}

function iconKey(item: any): string {
  const n = String(item?.name || "").toLowerCase();
  const t = item?.type;
  if (n.includes("welcome") || n.includes("intro")) return "sparkle";
  if (n === "sections") return "layers";
  if (n === "components") return "grid";
  if (n === "utilities" || n.includes("guide")) return "cog";
  if (n.includes("marketing")) return "rocket";
  if (n.includes("dashboard")) return "dashboard";
  if (n.includes("auth")) return "lock";
  if (n.includes("shell")) return "window";
  if (t === "docs") return "doc";
  if (t === "story") return "dot";
  if (t === "component" || t === "group") return "component";
  if (t === "root") return "book";
  return "dot";
}

function makeConfig(themeKey: ThemeKey) {
  const accent = { slate: "#818CF8", aurum: "#E2B863", evergreen: "#35D69C", daylight: "#4F46E5" }[themeKey];
  const muted = managerThemes[themeKey].textMutedColor || "#888";
  return {
    theme: managerThemes[themeKey],
    sidebar: {
      showRoots: true,
      renderLabel: (item: any) => {
        const key = iconKey(item);
        const isRootish = item?.type === "root" || item?.type === "group" || item?.type === "component";
        const color = isRootish ? accent : muted;
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {svg(ICONS[key], color)}
            <span>{item?.name}</span>
          </span>
        );
      },
    },
  };
}

function currentTheme(api: any): ThemeKey {
  try {
    const t = api?.getGlobals?.()?.theme;
    if (t && t in managerThemes) return t as ThemeKey;
  } catch {
    /* noop */
  }
  return "slate";
}

// Initial config (before the addon registers / globals arrive).
addons.setConfig(makeConfig("slate"));

addons.register("comp-lib/theme-sync", (api) => {
  const apply = (key?: ThemeKey) => addons.setConfig(makeConfig(key || currentTheme(api)));

  apply();

  // Storybook core event names (constants of GLOBALS_UPDATED / SET_GLOBALS).
  const fromPayload = (p: any): ThemeKey | undefined => {
    const t = p?.globals?.theme;
    return t && t in managerThemes ? (t as ThemeKey) : undefined;
  };
  api.on("globalsUpdated", (p: any) => apply(fromPayload(p)));
  api.on("setGlobals", (p: any) => apply(fromPayload(p)));
  api.on("storyChanged", () => apply());
});
