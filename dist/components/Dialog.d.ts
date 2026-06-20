import React, { type ReactNode, type HTMLAttributes } from 'react';
export interface DialogRootProps {
    /** Whether the dialog is open */
    open?: boolean;
    /** Default open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Children */
    children: ReactNode;
}
export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
/**
 * Dialog/Modal component with focus trap, scroll lock, and keyboard handling.
 * Accessible with ARIA attributes and focus management.
 *
 * @example
 * <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <Dialog.Overlay />
 *   <Dialog.Content>
 *     <Dialog.Close />
 *     <Dialog.Header>
 *       <Dialog.Title>Title</Dialog.Title>
 *       <Dialog.Description>Description</Dialog.Description>
 *     </Dialog.Header>
 *     <div>Content</div>
 *     <Dialog.Footer>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 */
export declare const Dialog: {
    Root: ({ open: controlledOpen, defaultOpen, onOpenChange, children }: DialogRootProps) => import("react/jsx-runtime").JSX.Element;
    Overlay: React.ForwardRefExoticComponent<DialogOverlayProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.ForwardRefExoticComponent<DialogHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<DialogTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    Description: React.ForwardRefExoticComponent<DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<DialogFooterProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
};
