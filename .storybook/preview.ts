import "../src/styles/tailwind.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "White",
      values: [
        { name: "White", value: "#FFFFFF" },
        { name: "App", value: "#F9FAFB" },
        { name: "Dark", value: "#1a1a1a" },
      ],
    },
    options: {
      storySort: {
        order: ["Intro", "Guides", "Components", "Utilities"],
      },
    },
    docs: {
      source: {
        dark: true,
      },
    },
  },
};

export default preview;
