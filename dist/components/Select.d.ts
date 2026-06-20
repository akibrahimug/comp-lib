import React, { type SelectHTMLAttributes, type ReactNode } from 'react';
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
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
