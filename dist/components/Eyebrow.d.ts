import React, { type HTMLAttributes } from 'react';
export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
    /** Show the leading accent dot */
    dot?: boolean;
    /** Tailwind background class for the dot (e.g. "bg-accent") */
    dotTw?: string;
    className?: string;
    tw?: string;
}
/**
 * Eyebrow / overline label — a small uppercase monospace kicker above headings.
 *
 * @example
 * <Eyebrow>Why us</Eyebrow>
 */
export declare const Eyebrow: React.ForwardRefExoticComponent<EyebrowProps & React.RefAttributes<HTMLSpanElement>>;
