import React, { type ReactNode, type HTMLAttributes } from 'react';
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Visual intent */
    variant?: AlertVariant;
    /** Optional bold title shown above the body */
    title?: ReactNode;
    /** Custom leading icon. Pass `false` to hide it. */
    icon?: ReactNode | false;
    /** Show a dismiss button and fire this callback when clicked */
    onClose?: () => void;
    className?: string;
    tw?: string;
}
/**
 * Inline Alert / banner for contextual feedback. Five intents, optional title,
 * custom or default icon, and an optional dismiss affordance.
 *
 * @example
 * <Alert variant="success" title="Saved" onClose={() => {}}>
 *   Your changes were saved.
 * </Alert>
 */
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
