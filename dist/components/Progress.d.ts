import React, { type HTMLAttributes } from 'react';
export type ProgressVariant = 'brand' | 'gold' | 'success' | 'danger' | 'info';
export type ProgressSize = 'sm' | 'md' | 'lg';
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Current value (0–max). Omit / set null for an indeterminate bar. */
    value?: number | null;
    /** Maximum value */
    max?: number;
    variant?: ProgressVariant;
    size?: ProgressSize;
    /** Render a percentage label to the right of the track */
    showValue?: boolean;
    /** Accessible label */
    label?: string;
    className?: string;
    tw?: string;
}
/**
 * Progress bar. Pass a numeric `value` for determinate, or omit it (or pass
 * `null`) for an animated indeterminate state.
 *
 * @example
 * <Progress value={64} variant="gold" showValue />
 */
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
