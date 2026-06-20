import React, { type ReactNode, type HTMLAttributes } from 'react';
type Position = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipRootProps {
    /** Children */
    children: ReactNode;
    /** Position of the tooltip */
    position?: Position;
}
export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
    /** Children */
    children: ReactNode;
    /** Element type to render */
    as?: 'button' | 'span' | 'div';
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
/**
 * Tooltip component that shows on hover or focus.
 * Supports top, right, bottom, and left positioning.
 *
 * @example
 * <Tooltip.Root position="top">
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip.Root>
 */
export declare const Tooltip: {
    Root: ({ children, position }: TooltipRootProps) => import("react/jsx-runtime").JSX.Element;
    Trigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<any>>;
    Content: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
};
export {};
