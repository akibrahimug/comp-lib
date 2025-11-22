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
      ],
    },
    options: {
      storySort: {
        order: ["Intro", "Guides", "Components", "Utilities"],
      },
    },
  },
};

export default preview;
