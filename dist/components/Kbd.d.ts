import React, { type HTMLAttributes } from 'react';
export interface KbdProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    tw?: string;
}
/**
 * Keyboard key hint.
 *
 * @example
 * Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
 */
export declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;
