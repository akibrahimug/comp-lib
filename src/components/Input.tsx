import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
import { cx } from '../core/cx';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Label text for the input */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Error message to display */
  error?: string;
  /** Prefix content (e.g., icon) */
  prefix?: ReactNode;
  /** Suffix content (e.g., icon) */
  suffix?: ReactNode;
  /** Whether the input is in an invalid state */
  invalid?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className for the input element */
  className?: string;
  /** Additional Tailwind classes via tw prop */
  tw?: string;
}

/**
 * Input component with label, description, error states, and prefix/suffix support.
 * Fully accessible with proper ARIA attributes.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    description,
    error,
    prefix,
    suffix,
    invalid,
    size = 'md',
    disabled,
    className,
    tw,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useStableId('input');
  const id = providedId || generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const isInvalid = invalid || !!error;

  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-sm px-3',
    lg: 'h-11 text-base px-4',
  };

  const inputClasses = mergeTw(
    'w-full rounded-md border font-medium transition-colors',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    sizeClasses[size],
    isInvalid
      ? 'border-danger-600 focus:ring-danger-600 focus:border-danger-600'
      : 'border-gray-300 focus:ring-brand-600 focus:border-brand-600',
    disabled && 'bg-gray-50 cursor-not-allowed opacity-60',
    prefix && 'pl-10',
    suffix && 'pr-10',
    className,
    tw
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
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          aria-describedby={cx(descriptionId, errorId)}
          className={inputClasses}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
