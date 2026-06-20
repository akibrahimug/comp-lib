import React, { type HTMLAttributes, type ReactNode } from 'react';
export interface StatProps extends HTMLAttributes<HTMLDivElement> {
    /** Metric label (e.g. "Revenue") */
    label: ReactNode;
    /** The primary value (e.g. "$48,210") */
    value: ReactNode;
    /** Optional delta text (e.g. "+12.4%") */
    delta?: ReactNode;
    /** Direction of the delta — colors it green/red and rotates the arrow */
    trend?: 'up' | 'down';
    /** Optional trailing icon element shown top-right */
    icon?: ReactNode;
    /** Optional helper shown next to the delta (e.g. "vs last month") */
    hint?: ReactNode;
    className?: string;
    tw?: string;
}
/**
 * Stat / metric card — label, value and an optional trend delta + icon.
 *
 * @example
 * <Stat label="Revenue" value="$48,210" delta="+12.4%" trend="up"
 *       icon={<Icon name="wallet" />} hint="vs last month" />
 */
export declare const Stat: React.ForwardRefExoticComponent<StatProps & React.RefAttributes<HTMLDivElement>>;
