import { createComponent } from "../core/createComponent";

/**
 * Avatar component for displaying user profile images or initials..
 */
export const Avatar = createComponent({
  as: "div",
  displayName: "Avatar",
  base: "relative inline-flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700 overflow-hidden flex-shrink-0",
  variants: {
    size: {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-20 w-20 text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
