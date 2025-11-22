import { createComponent } from '../core/createComponent';

/**
 * Badge component for labels, status indicators, and counts.
 */
export const Badge = createComponent({
  as: 'span',
  displayName: 'Badge',
  base: 'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors',
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-brand-100 text-brand-800',
      success: 'bg-success-100 text-success-800',
      danger: 'bg-danger-100 text-danger-800',
      warning: 'bg-accent-100 text-accent-800',
      info: 'bg-info-100 text-info-800',
    },
    size: {
      sm: 'text-xs px-1.5 py-0.5',
      md: 'text-xs px-2 py-0.5',
      lg: 'text-sm px-2.5 py-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
