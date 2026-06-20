import React, { useEffect, type ReactNode } from "react";
import type { Decorator } from "@storybook/react";
import { create } from "@storybook/theming";
import { ThemeBridgeContext, type ThemeId } from "../src/stories/sections/_luxe";
import "../src/styles/tailwind.css";

/** Dark docs theme — keeps autodocs pages on-brand with the chrome. */
const docsTheme = create({
  base: "dark",
  appBg: "#0B0D12",
  appContentBg: "#0B0D12",
  appPreviewBg: "#0B0D12",
  appBorderColor: "rgba(226,232,248,0.10)",
  appBorderRadius: 12,
  colorPrimary: "#818CF8",
  colorSecondary: "#818CF8",
  textColor: "#ECEEF3",
  textMutedColor: "#A9AFBD",
  barSelectedColor: "#818CF8",
  fontBase: '"Hanken Grotesk", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, monospace',
});

/** Reflects the active Storybook global theme onto <html data-theme> (so even
 *  portaled overlays inherit it) and shares it via context to on-page switchers. */
function ThemeApplier({ theme, children }: { theme: ThemeId; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return <ThemeBridgeContext.Provider value={theme}>{children}</ThemeBridgeContext.Provider>;
}

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as ThemeId) || "slate";
  return (
    <ThemeApplier theme={theme}>
      <Story />
    </ThemeApplier>
  );
};

export const decorators = [withTheme];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Design-system theme",
    defaultValue: "slate",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "slate", title: "Slate", left: "🔵" },
        { value: "aurum", title: "Aurum", left: "🟡" },
        { value: "evergreen", title: "Evergreen", left: "🟢" },
        { value: "daylight", title: "Daylight", left: "⚪" },
      ],
      dynamicTitle: true,
    },
  },
};

const preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Light "porcelain" artboard for inspecting individual components.
    backgrounds: {
      default: "Porcelain",
      values: [
        { name: "Porcelain", value: "#F4F3EF" },
        { name: "Ink", value: "#0B0D12" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    options: {
      storySort: {
        order: [
          "Intro",
          "Sections",
          ["Marketing", "App Shell", "Dashboard", "Auth"],
          "Components",
          "Utilities",
          "*",
        ],
      },
    },
    docs: { theme: docsTheme, source: { dark: true } },
  },
};

export default preview;
