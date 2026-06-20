import React, { type InputHTMLAttributes, type ReactNode } from 'react';
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
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
