import React, { type InputHTMLAttributes } from 'react';
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
export declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLInputElement>>;
