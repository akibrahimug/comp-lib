import React, { useEffect, type ReactNode } from "react";
import type { Decorator } from "@storybook/react";
import { create } from "@storybook/theming";
import { ThemeBridgeContext, type ThemeId } from "../src/stories/sections/_luxe";
import "../src/styles/tailwind.css";

/** Light docs theme — matches the default "Daylight" theme. */
const docsTheme = create({
  base: "light",
  appBg: "#F4F5F3",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "rgba(18,22,33,0.12)",
  appBorderRadius: 12,
  colorPrimary: "#4F46E5",
  colorSecondary: "#4F46E5",
  textColor: "#181B21",
  textMutedColor: "#57606A",
  barSelectedColor: "#4F46E5",
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
  const theme = (context.globals.theme as ThemeId) || "daylight";
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
    defaultValue: "daylight",
    toolbar: {
      title: "Theme",
      icon: "paintbrush",
      items: [
        { value: "daylight", title: "Daylight", left: "⚪" },
        { value: "slate", title: "Slate", left: "🔵" },
        { value: "aurum", title: "Aurum", left: "🟡" },
        { value: "evergreen", title: "Evergreen", left: "🟢" },
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
    // The canvas background is driven by the active theme (see preview-head.html),
    // so we disable the static backgrounds toolbar.
    backgrounds: { disable: true },
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
