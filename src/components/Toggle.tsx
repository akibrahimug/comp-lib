import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text for the toggle */
  label?: string;
  /** Description text */
  description?: string;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Additional className for the toggle wrapper */
  className?: string;
  /** Additional Tailwind classes via tw prop */
  tw?: string;
}

/**
 * Toggle/Switch component with label and description support.
 * Implements ARIA switch pattern for accessibility.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    label,
    description,
    size = 'md',
    disabled,
    checked,
    className,
    tw,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useStableId('toggle');
  const id = providedId || generatedId;

  const sizeClasses = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: checked ? 'translate-x-4' : 'translate-x-0.5',
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: checked ? 'translate-x-5' : 'translate-x-0.5',
    },
  };

  const trackClasses = mergeTw(
    'relative inline-flex items-center rounded-full transition-colors',
    'focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2',
    sizeClasses[size].track,
    checked ? 'bg-brand-600' : 'bg-gray-300',
    disabled && 'cursor-not-allowed opacity-60',
    !disabled && 'cursor-pointer'
  );

  const thumbClasses = mergeTw(
    'inline-block rounded-full bg-white transition-transform',
    sizeClasses[size].thumb,
    sizeClasses[size].translate
  );

  return (
    <div className={mergeTw('flex items-start gap-3', className, tw)}>
      <label htmlFor={id} className={trackClasses}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          checked={checked}
          disabled={disabled}
          aria-checked={checked}
          className="sr-only"
          {...props}
        />
        <span className={thumbClasses} aria-hidden="true" />
      </label>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={mergeTw(
                'text-sm font-medium text-gray-900',
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  );
});
