import React, { type InputHTMLAttributes } from 'react';
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
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
