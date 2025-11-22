import { createComponent } from '../core/createComponent';

/**
 * Button component with multiple intents, sizes, and states.
 * Supports polymorphic rendering via `as` prop and className extension via `tw` prop.
 */
export const Button = createComponent({
  as: 'button',
  displayName: 'Button',
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
  variants: {
    intent: {
      primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-600',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-600',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-900'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-base'
    },
    loading: { true: 'cursor-wait', false: '' },
    fullWidth: { true: 'w-full', false: '' }
  },
  defaultVariants: { intent: 'primary', size: 'md' },
  compoundVariants: [{ intent: 'ghost', size: 'lg', class: 'rounded-lg' }]
});
