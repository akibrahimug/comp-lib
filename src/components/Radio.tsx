import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text for the radio button */
  label?: string;
  /** Description text */
  description?: string;
  /** Additional className for the radio wrapper */
  className?: string;
  /** Additional Tailwind classes via tw prop */
  tw?: string;
}

/**
 * Radio button component with label and description support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    label,
    description,
    disabled,
    className,
    tw,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useStableId('radio');
  const id = providedId || generatedId;

  const radioClasses = mergeTw(
    'h-4 w-4 border-gray-300 text-brand-600',
    'focus:ring-2 focus:ring-brand-600 focus:ring-offset-2',
    'transition-colors',
    disabled && 'cursor-not-allowed opacity-60',
    'cursor-pointer'
  );

  return (
    <div className={mergeTw('flex items-start gap-3', className, tw)}>
      <input
        ref={ref}
        type="radio"
        id={id}
        disabled={disabled}
        className={radioClasses}
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
