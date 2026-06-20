import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';
export type IconButtonIntent = 'primary' | 'secondary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Required accessible label (icon-only button) */
    'aria-label': string;
    intent?: IconButtonIntent;
    size?: IconButtonSize;
    /** The icon element */
    children: ReactNode;
    className?: string;
    tw?: string;
}
/**
 * Square, icon-only button. Requires an `aria-label`.
 *
 * @example
 * <IconButton aria-label="Settings" intent="ghost"><Icon name="cog" /></IconButton>
 */
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
