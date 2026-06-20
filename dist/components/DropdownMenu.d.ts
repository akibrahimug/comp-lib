import React, { type ReactNode, type HTMLAttributes } from 'react';
type Align = 'start' | 'end' | 'center';
type Side = 'bottom' | 'top';
export interface DropdownMenuRootProps {
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: Align;
    side?: Side;
}
export interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    tw?: string;
}
export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Gap between trigger and menu, in px */
    sideOffset?: number;
    className?: string;
    tw?: string;
}
export interface DropdownMenuItemProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    /** Mark as a destructive action (danger styling) */
    destructive?: boolean;
    /** Leading icon / element */
    icon?: ReactNode;
    className?: string;
    tw?: string;
}
/**
 * Dropdown menu with portal positioning, outside-click & Escape dismissal, and
 * arrow-key roving focus.
 *
 * @example
 * <DropdownMenu.Root align="end">
 *   <DropdownMenu.Trigger><Button>Options</Button></DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item>Edit</DropdownMenu.Item>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 */
export declare const DropdownMenu: {
    Root: ({ children, open: controlled, defaultOpen, onOpenChange, align, side }: DropdownMenuRootProps) => import("react/jsx-runtime").JSX.Element;
    Trigger: React.ForwardRefExoticComponent<DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLButtonElement>>;
    Label: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLDivElement>>;
    Separator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLDivElement>>;
};
export {};
