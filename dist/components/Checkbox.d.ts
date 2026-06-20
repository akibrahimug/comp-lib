import React, { type InputHTMLAttributes } from 'react';
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
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
