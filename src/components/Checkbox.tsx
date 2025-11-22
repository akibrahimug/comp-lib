import React, { forwardRef, type InputHTMLAttributes, useRef, useEffect } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text for the checkbox */
  label?: string;
  /** Description text */
  description?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Additional className for the checkbox wrapper */
  className?: string;
  /** Additional Tailwind classes via tw prop */
  tw?: string;
}

/**
 * Checkbox component with label, description, and indeterminate state support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    indeterminate,
    disabled,
    className,
    tw,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useStableId('checkbox');
  const id = providedId || generatedId;
  const internalRef = useRef<HTMLInputElement | null>(null);

  // Handle indeterminate state
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const handleRef = (node: HTMLInputElement | null) => {
    internalRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  };

  const checkboxClasses = mergeTw(
    'h-4 w-4 rounded border-gray-300 text-brand-600',
    'focus:ring-2 focus:ring-brand-600 focus:ring-offset-2',
    'transition-colors',
    disabled && 'cursor-not-allowed opacity-60',
    'cursor-pointer'
  );

  return (
    <div className={mergeTw('flex items-start gap-3', className, tw)}>
      <input
        ref={handleRef}
        type="checkbox"
        id={id}
        disabled={disabled}
        className={checkboxClasses}
        {...props}
      />
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
