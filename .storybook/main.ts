/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx|md)"], // <- this is fine
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
};
export default config;
