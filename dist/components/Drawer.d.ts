import React, { type ReactNode, type HTMLAttributes } from 'react';
export interface DrawerRootProps {
    /** Whether the drawer is open */
    open?: boolean;
    /** Default open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Position of the drawer */
    position?: 'left' | 'right' | 'top' | 'bottom';
    /** Children */
    children: ReactNode;
}
export interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
/**
 * Drawer component with focus trap, scroll lock, and keyboard handling.
 * Slides in from left, right, top, or bottom.
 *
 * @example
 * <Drawer.Root open={isOpen} onOpenChange={setIsOpen} position="right">
 *   <Drawer.Overlay />
 *   <Drawer.Content>
 *     <Drawer.Close />
 *     <Drawer.Header>
 *       <Drawer.Title>Title</Drawer.Title>
 *       <Drawer.Description>Description</Drawer.Description>
 *     </Drawer.Header>
 *     <div>Content</div>
 *     <Drawer.Footer>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Drawer.Footer>
 *   </Drawer.Content>
 * </Drawer.Root>
 */
export declare const Drawer: {
    Root: ({ open: controlledOpen, defaultOpen, onOpenChange, position, children, }: DrawerRootProps) => import("react/jsx-runtime").JSX.Element;
    Overlay: React.ForwardRefExoticComponent<DrawerOverlayProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.ForwardRefExoticComponent<DrawerHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<DrawerTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    Description: React.ForwardRefExoticComponent<DrawerDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<DrawerFooterProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<DrawerCloseProps & React.RefAttributes<HTMLButtonElement>>;
};
