import { createComponent } from '../core/createComponent';

export const Button = createComponent({
  as: 'button',
  displayName: 'Button',
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
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
