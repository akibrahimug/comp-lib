import React, { type TextareaHTMLAttributes } from 'react';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Label text for the textarea */
    label?: string;
    /** Description text below the label */
    description?: string;
    /** Error message to display */
    error?: string;
    /** Whether the textarea is in an invalid state */
    invalid?: boolean;
    /** Enable auto-resizing based on content */
    autoSize?: boolean;
    /** Show character counter */
    showCounter?: boolean;
    /** Additional className for the textarea element */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
}
/**
 * Textarea component with label, description, error states, auto-resize, and character counter.
 * Fully accessible with proper ARIA attributes.
 */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
