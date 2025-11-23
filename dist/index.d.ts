import React, { ElementType, PropsWithChildren, ComponentPropsWithoutRef, useEffect, RefObject, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare function cx(...parts: Array<string | undefined | false | null>): string;

declare function mergeTw(...classes: Array<string | undefined | null | false>): string;

type VariantConfig = Record<string, Record<string, string>>;
type InferVariantProps<Cfg extends VariantConfig> = {
    [K in keyof Cfg]?: keyof Cfg[K] extends string | number | boolean ? keyof Cfg[K] : never;
};
interface TVOptions<Cfg extends VariantConfig> {
    base?: string;
    variants?: Cfg;
    defaultVariants?: Partial<InferVariantProps<Cfg>>;
    compoundVariants?: Array<Partial<InferVariantProps<Cfg>> & {
        class: string;
    }>;
}
declare function tv<Cfg extends VariantConfig>(opts: TVOptions<Cfg>): (variantProps?: Partial<InferVariantProps<Cfg>> & {
    tw?: string;
    className?: string;
}) => string;

type AsProp<C extends ElementType> = {
    as?: C;
};
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicProps<C extends ElementType, P> = PropsWithChildren<P & AsProp<C>> & Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, P>> & {
    className?: string;
    tw?: string;
};
type PolymorphicComponent<P, D extends ElementType> = <C extends ElementType = D>(props: PolymorphicProps<C, P> & {
    ref?: any;
}) => React.ReactElement | null;
interface CreateComponentOptions<Cfg extends Record<string, any>, D extends ElementType> extends TVOptions<any> {
    as?: D;
    displayName?: string;
}
declare function createComponent<Cfg extends Record<string, any>, D extends ElementType = 'div'>(opts: CreateComponentOptions<Cfg, D>): PolymorphicComponent<InferVariantProps<any>, D>;

type SlotConfig = {
    [slotName: string]: TVOptions<any>;
};
declare function createSlots<SCfg extends SlotConfig>(slots: SCfg, opts?: {
    displayName?: string;
    as?: ElementType;
}): {
    Root: any;
} & Record<Capitalize<Exclude<keyof SCfg, "root"> & string>, any>;

/**
 * SSR-safe layout effect hook. Uses useLayoutEffect on the client and useEffect on the server.
 */
declare const useIsomorphicLayoutEffect: typeof useEffect;

/**
 * Generates a stable, hydration-safe ID.
 * Uses React 18's useId hook internally.
 * @param prefix - Optional prefix for the ID
 */
declare function useStableId(prefix?: string): string;

/**
 * Locks body scroll when active. Useful for modals and drawers.
 * @param lock - Whether to lock scroll
 */
declare function useLockScroll(lock: boolean): void;

/**
 * Traps focus within a container element.
 * @param containerRef - Ref to the container element
 * @param active - Whether the focus trap is active
 */
declare function useFocusTrap(containerRef: RefObject<HTMLElement>, active: boolean): void;

/**
 * Returns focus to the previously focused element when unmounted.
 * Useful for dialogs and modals.
 */
declare function useFocusReturn(): void;

/**
 * Button component with multiple intents, sizes, and states.
 * Supports polymorphic rendering via `as` prop and className extension via `tw` prop.
 */
declare const Button: PolymorphicComponent<InferVariantProps<any>, "button">;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    /** Label text for the input */
    label?: string;
    /** Description text below the label */
    description?: string;
    /** Error message to display */
    error?: string;
    /** Prefix content (e.g., icon) */
    prefix?: ReactNode;
    /** Suffix content (e.g., icon) */
    suffix?: ReactNode;
    /** Whether the input is in an invalid state */
    invalid?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Additional className for the input element */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
}
/**
 * Input component with label, description, error states, and prefix/suffix support.
 * Fully accessible with proper ARIA attributes.
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Label text for the textarea */
    label?: string;
    /** Description text below the label */
    description?: string;
    /** Error message to display */
    error?: string;
    /** Whether the textarea is in an invalid state */
    invalid?: boolean;
    /** Enable auto-resizing based on content */
    autoSize?: boolean;
    /** Show character counter */
    showCounter?: boolean;
    /** Additional className for the textarea element */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
}
/**
 * Textarea component with label, description, error states, auto-resize, and character counter.
 * Fully accessible with proper ARIA attributes.
 */
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /** Label text for the select */
    label?: string;
    /** Description text below the label */
    description?: string;
    /** Error message to display */
    error?: string;
    /** Whether the select is in an invalid state */
    invalid?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Additional className for the select element */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
    /** Children (option elements) */
    children: ReactNode;
}
/**
 * Select component with label, description, and error states.
 * Native select with custom styling for maximum compatibility and accessibility.
 */
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Label text for the checkbox */
    label?: string;
    /** Description text */
    description?: string;
    /** Indeterminate state */
    indeterminate?: boolean;
    /** Additional className for the checkbox wrapper */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
}
/**
 * Checkbox component with label, description, and indeterminate state support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Label text for the radio button */
    label?: string;
    /** Description text */
    description?: string;
    /** Additional className for the radio wrapper */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
}
/**
 * Radio button component with label and description support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** Label text for the toggle */
    label?: string;
    /** Description text */
    description?: string;
    /** Size variant */
    size?: 'sm' | 'md';
    /** Additional className for the toggle wrapper */
    className?: string;
    /** Additional Tailwind classes via tw prop */
    tw?: string;
}
/**
 * Toggle/Switch component with label and description support.
 * Implements ARIA switch pattern for accessibility.
 */
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLInputElement>>;

declare const Card: {
    Root: any;
} & Record<"Description" | "Footer" | "Header" | "Title" | "Content", any>;

interface TabsRootProps {
    /** Currently selected tab value */
    value?: string;
    /** Default value for uncontrolled mode */
    defaultValue?: string;
    /** Callback when tab changes */
    onValueChange?: (value: string) => void;
    /** Orientation of tabs */
    orientation?: 'horizontal' | 'vertical';
    /** Children */
    children: ReactNode;
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface TabListProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /** Value for this tab */
    value: string;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    /** Value for this panel */
    value: string;
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
/**
 * Tabs component with keyboard navigation (arrow keys, Home, End) and roving tabindex.
 * Supports both controlled and uncontrolled modes.
 *
 * @example
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.TabList>
 *     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
 *   </Tabs.TabList>
 *   <Tabs.TabPanels>
 *     <Tabs.TabPanel value="tab1">Panel 1</Tabs.TabPanel>
 *     <Tabs.TabPanel value="tab2">Panel 2</Tabs.TabPanel>
 *   </Tabs.TabPanels>
 * </Tabs.Root>
 */
declare const Tabs: {
    Root: React.ForwardRefExoticComponent<TabsRootProps & React.RefAttributes<HTMLDivElement>>;
    TabList: React.ForwardRefExoticComponent<TabListProps & React.RefAttributes<HTMLDivElement>>;
    Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
    TabPanels: React.ForwardRefExoticComponent<TabPanelsProps & React.RefAttributes<HTMLDivElement>>;
    TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
};

type Position = 'top' | 'right' | 'bottom' | 'left';
interface TooltipRootProps {
    /** Children */
    children: ReactNode;
    /** Position of the tooltip */
    position?: Position;
}
interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
    /** Children */
    children: ReactNode;
    /** Element type to render */
    as?: 'button' | 'span' | 'div';
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
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
declare const Tooltip: {
    Root: ({ children, position }: TooltipRootProps) => react_jsx_runtime.JSX.Element;
    Trigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<any>>;
    Content: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;
};

interface DialogRootProps {
    /** Whether the dialog is open */
    open?: boolean;
    /** Default open state for uncontrolled mode */
    defaultOpen?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Children */
    children: ReactNode;
}
interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
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
declare const Dialog: {
    Root: ({ open: controlledOpen, defaultOpen, onOpenChange, children }: DialogRootProps) => react_jsx_runtime.JSX.Element;
    Overlay: React.ForwardRefExoticComponent<DialogOverlayProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.ForwardRefExoticComponent<DialogHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<DialogTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    Description: React.ForwardRefExoticComponent<DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<DialogFooterProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
};

interface DrawerRootProps {
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
interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
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
declare const Drawer: {
    Root: ({ open: controlledOpen, defaultOpen, onOpenChange, position, children, }: DrawerRootProps) => react_jsx_runtime.JSX.Element;
    Overlay: React.ForwardRefExoticComponent<DrawerOverlayProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;
    Header: React.ForwardRefExoticComponent<DrawerHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<DrawerTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    Description: React.ForwardRefExoticComponent<DrawerDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<DrawerFooterProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<DrawerCloseProps & React.RefAttributes<HTMLButtonElement>>;
};

interface ToastProviderProps {
    /** Children */
    children: ReactNode;
    /** Maximum number of toasts to show at once */
    max?: number;
}
declare function ToastProvider({ children, max }: ToastProviderProps): react_jsx_runtime.JSX.Element;
/**
 * Hook to access toast functionality.
 * Must be used within ToastProvider.
 */
declare function useToast(): {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
};

/**
 * Spinner/Loader component for loading states.
 * Accessible with proper ARIA attributes.
 */
declare const Spinner: PolymorphicComponent<InferVariantProps<any>, "div">;
/**
 * Full-page loading overlay with spinner.
 * Blocks interaction while content is loading.
 */
declare function LoadingOverlay({ message, show, }: {
    message?: string;
    show?: boolean;
}): react_jsx_runtime.JSX.Element | null;

/**
 * Avatar component for displaying user profile images or initials.
 */
declare const Avatar: PolymorphicComponent<InferVariantProps<any>, "div">;

/**
 * Badge component for labels, status indicators, and counts.
 */
declare const Badge: PolymorphicComponent<InferVariantProps<any>, "span">;

/**
 * Gallery component for displaying images in various grid layouts.
 */
declare const Gallery: PolymorphicComponent<InferVariantProps<any>, "div">;
interface GalleryImageProps {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
    objectFit?: 'cover' | 'contain' | 'fill';
    onClick?: () => void;
    className?: string;
    tw?: string;
}
/**
 * GalleryImage component for individual images in the gallery.
 */
declare function GalleryImage({ src, alt, aspectRatio, objectFit, onClick, className, tw, }: GalleryImageProps): react_jsx_runtime.JSX.Element;
interface GalleryLightboxProps {
    images: Array<{
        src: string;
        alt: string;
    }>;
    currentIndex: number;
    onClose: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
}
/**
 * Lightbox component for viewing images in full screen.
 */
declare function GalleryLightbox({ images, currentIndex, onClose, onPrevious, onNext, }: GalleryLightboxProps): react_jsx_runtime.JSX.Element;
/**
 * Hook for managing gallery lightbox state.
 */
declare function useGalleryLightbox(images: Array<{
    src: string;
    alt: string;
}>): {
    isOpen: boolean;
    currentIndex: number;
    open: (index: number) => void;
    close: () => void;
    next: () => void;
    previous: () => void;
};

interface CarouselProps {
    children: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    className?: string;
    tw?: string;
}
/**
 * Carousel component for displaying content in a slideshow.
 * Supports auto-play, navigation arrows, dots, and keyboard navigation.
 */
declare function Carousel({ children, autoPlay, interval, showDots, showArrows, loop, className, tw, }: CarouselProps): react_jsx_runtime.JSX.Element;
interface CarouselSlideProps {
    children: React.ReactNode;
    className?: string;
    tw?: string;
}
/**
 * CarouselSlide component for individual slides.
 */
declare function CarouselSlide({ children, className, tw }: CarouselSlideProps): react_jsx_runtime.JSX.Element;
interface CarouselImageProps {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
    objectFit?: 'cover' | 'contain' | 'fill';
    className?: string;
    tw?: string;
}
/**
 * CarouselImage component optimized for carousel slides.
 */
declare function CarouselImage({ src, alt, aspectRatio, objectFit, className, tw, }: CarouselImageProps): react_jsx_runtime.JSX.Element;
/**
 * Hook for managing carousel state externally.
 */
declare function useCarousel(totalSlides: number, options?: {
    loop?: boolean;
}): {
    currentIndex: number;
    goToSlide: (index: number) => void;
    goToPrevious: () => void;
    goToNext: () => void;
    canGoPrevious: boolean;
    canGoNext: boolean;
};

export { Avatar, Badge, Button, Card, Carousel, CarouselImage, CarouselSlide, Checkbox, Dialog, Drawer, Gallery, GalleryImage, GalleryLightbox, Input, LoadingOverlay, Dialog as Modal, Radio, Select, Spinner, Tabs, Textarea, ToastProvider, Toggle, Tooltip, createComponent, createSlots, cx, mergeTw, tv, useCarousel, useFocusReturn, useFocusTrap, useGalleryLightbox, useIsomorphicLayoutEffect, useLockScroll, useStableId, useToast };
export type { CarouselImageProps, CarouselProps, CarouselSlideProps, CheckboxProps, CreateComponentOptions, DialogCloseProps, DialogContentProps, DialogDescriptionProps, DialogFooterProps, DialogHeaderProps, DialogOverlayProps, DialogRootProps, DialogTitleProps, DrawerCloseProps, DrawerContentProps, DrawerDescriptionProps, DrawerFooterProps, DrawerHeaderProps, DrawerOverlayProps, DrawerRootProps, DrawerTitleProps, GalleryImageProps, GalleryLightboxProps, InferVariantProps, InputProps, PolymorphicComponent, RadioProps, SelectProps, TVOptions, TabListProps, TabPanelProps, TabPanelsProps, TabProps, TabsRootProps, TextareaProps, ToastProviderProps, ToggleProps, TooltipContentProps, TooltipRootProps, TooltipTriggerProps };
