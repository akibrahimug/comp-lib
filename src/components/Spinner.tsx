import { createComponent } from '../core/createComponent';

/**
 * Spinner/Loader component for loading states.
 * Accessible with proper ARIA attributes.
 */
export const Spinner = createComponent({
  as: 'div',
  displayName: 'Spinner',
  base: 'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
  variants: {
    size: {
      xs: 'h-3 w-3 border-2',
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-[3px]',
      xl: 'h-12 w-12 border-4',
    },
    color: {
      brand: 'text-brand-600',
      white: 'text-white',
      gray: 'text-gray-600',
      danger: 'text-danger-600',
      success: 'text-success-600',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'brand',
  },
});

/**
 * Full-page loading overlay with spinner.
 * Blocks interaction while content is loading.
 */
export function LoadingOverlay({
  message = 'Loading...',
  show = true,
}: {
  message?: string;
  show?: boolean;
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Spinner size="xl" color="brand" className="mb-4" />
      <p className="text-sm font-medium text-gray-700">{message}</p>
    </div>
  );
}
