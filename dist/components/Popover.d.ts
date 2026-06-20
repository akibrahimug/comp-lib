import React, { type ReactNode, type HTMLAttributes } from 'react';
type Align = 'start' | 'end' | 'center';
type Side = 'bottom' | 'top' | 'left' | 'right';
export interface PopoverRootProps {
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: Align;
    side?: Side;
}
export interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    tw?: string;
}
export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    sideOffset?: number;
    className?: string;
    tw?: string;
}
/**
 * Popover — floating panel anchored to a trigger, with portal positioning,
 * outside-click & Escape dismissal and focus return.
 *
 * @example
 * <Popover.Root side="bottom" align="end">
 *   <Popover.Trigger><Button>Open</Button></Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Close />
 *     <p>Anything you like in here.</p>
 *   </Popover.Content>
 * </Popover.Root>
 */
export declare const Popover: {
    Root: ({ children, open: controlled, defaultOpen, onOpenChange, align, side }: PopoverRootProps) => import("react/jsx-runtime").JSX.Element;
    Trigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLButtonElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLButtonElement>>;
};
export {};
