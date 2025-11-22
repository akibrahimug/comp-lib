import React, { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
import { cx } from '../core/cx';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text for the select */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Whether the select is in an invalid state */
  invalid?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className for the select element */
  className?: string;
  /** Additional Tailwind classes via tw prop */
  tw?: string;
  /** Children (option elements) */
  children: ReactNode;
}

/**
 * Select component with label, description, and error states.
 * Native select with custom styling for maximum compatibility and accessibility.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    description,
    error,
    invalid,
    size = 'md',
    disabled,
    className,
    tw,
    id: providedId,
    children,
    ...props
  },
  ref
) {
  const generatedId = useStableId('select');
  const id = providedId || generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const isInvalid = invalid || !!error;

  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-sm px-3',
    lg: 'h-11 text-base px-4',
  };

  const selectClasses = mergeTw(
    'w-full rounded-md border font-medium transition-colors appearance-none',
    'bg-white bg-no-repeat',
    'pr-10', // space for chevron
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeClasses[size],
    isInvalid
      ? 'border-danger-600 focus:ring-danger-600 focus:border-danger-600'
      : 'border-gray-300 focus:ring-brand-600 focus:border-brand-600',
    disabled && 'bg-gray-50 cursor-not-allowed opacity-60',
    className,
    tw
  );

  const chevronIcon = (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
      width="16"
      height="16"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {description && !error && (
        <p id={descriptionId} className="text-sm text-gray-600 mb-2">
          {description}
        </p>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          aria-describedby={cx(descriptionId, errorId)}
          className={selectClasses}
          {...props}
        >
          {children}
        </select>
        {chevronIcon}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
