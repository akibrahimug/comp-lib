/** Backpack-like Tailwind tokens (generic, unbranded). */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./.storybook/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#005BBB", 600: "#005BBB", 700: "#004E9F", 800: "#003E7D" },
        accent: { DEFAULT: "#FFB703", 600: "#F59E0B", 700: "#D97706" },
        gray: {
          25: "#FCFCFD", 50: "#F9FAFB", 100: "#F2F4F7", 200: "#EAECF0", 300: "#D0D5DD",
          400: "#98A2B3", 500: "#667085", 600: "#475467", 700: "#344054", 800: "#1D2939", 900: "#101828"
        },
        danger: { 600: "#DC2626", 700: "#B91C1C" },
        success: { 600: "#16A34A", 700: "#15803D" },
        info: { 600: "#0284C7", 700: "#0369A1" }
      },
      borderRadius: { xl: "0.75rem", "2xl": "1rem" },
      boxShadow: { card: "0 1px 2px rgba(16,24,40,0.05), 0 4px 8px rgba(16,24,40,0.06)" },
      fontFamily: { sans: ["Inter", "system-ui", "ui-sans-serif", "Segoe UI", "Roboto", "Helvetica", "Arial"] },
      keyframes: {
        "spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "zoom-in-95": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" }
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        }
      },
      animation: {
        "spin": "spin 1s linear infinite",
        "fade-in": "fade-in 200ms ease-in-out",
        "zoom-in-95": "zoom-in-95 200ms ease-in-out",
        "slide-in-from-right": "slide-in-from-right 200ms ease-in-out",
        "slide-in-from-left": "slide-in-from-left 200ms ease-in-out",
        "slide-in-from-top": "slide-in-from-top 200ms ease-in-out",
        "slide-in-from-bottom": "slide-in-from-bottom 200ms ease-in-out"
      }
    }
  },
  plugins: []
};
