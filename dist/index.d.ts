import * as React from 'react';
import React__default, { ElementType, PropsWithChildren, ComponentPropsWithoutRef, useEffect, RefObject, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, AnchorHTMLAttributes, SVGProps, ButtonHTMLAttributes, FormEvent } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare function cx(...parts: Array<string | undefined | false | null>): string;

declare function mergeTw(...classes: Array<string | undefined | null | false>): string;

type VariantConfig = Record<string, Record<string, string>>;
/** Map a single variant's option-keys to a prop type. Variants keyed by
 *  "true"/"false" become a `boolean` prop; all others become a union of their
 *  string keys. */
type VariantPropValue<V> = 'true' extends keyof V ? boolean : 'false' extends keyof V ? boolean : keyof V & (string | number);
type InferVariantProps<Cfg extends VariantConfig> = {
    [K in keyof Cfg]?: VariantPropValue<Cfg[K]>;
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
}) => React__default.ReactElement | null;
interface CreateComponentOptions<Cfg extends VariantConfig, D extends ElementType> extends TVOptions<Cfg> {
    as?: D;
    displayName?: string;
}
declare function createComponent<Cfg extends VariantConfig, D extends ElementType = 'div'>(opts: CreateComponentOptions<Cfg, D>): PolymorphicComponent<InferVariantProps<Cfg>, D>;

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
declare const Button: PolymorphicComponent<InferVariantProps<{
    intent: {
        primary: string;
        secondary: string;
        danger: string;
        ghost: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    loading: {
        true: string;
        false: string;
    };
    fullWidth: {
        true: string;
        false: string;
    };
}>, "button">;

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
declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.RefAttributes<HTMLInputElement>>;

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
declare const Textarea: React__default.ForwardRefExoticComponent<TextareaProps & React__default.RefAttributes<HTMLTextAreaElement>>;

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
declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLSelectElement>>;

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
declare const Checkbox: React__default.ForwardRefExoticComponent<CheckboxProps & React__default.RefAttributes<HTMLInputElement>>;

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
declare const Radio: React__default.ForwardRefExoticComponent<RadioProps & React__default.RefAttributes<HTMLInputElement>>;

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
declare const Toggle: React__default.ForwardRefExoticComponent<ToggleProps & React__default.RefAttributes<HTMLInputElement>>;

declare const Card: {
    Root: any;
} & Record<"Footer" | "Header" | "Title" | "Content" | "Description", any>;

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
    Root: React__default.ForwardRefExoticComponent<TabsRootProps & React__default.RefAttributes<HTMLDivElement>>;
    TabList: React__default.ForwardRefExoticComponent<TabListProps & React__default.RefAttributes<HTMLDivElement>>;
    Tab: React__default.ForwardRefExoticComponent<TabProps & React__default.RefAttributes<HTMLButtonElement>>;
    TabPanels: React__default.ForwardRefExoticComponent<TabPanelsProps & React__default.RefAttributes<HTMLDivElement>>;
    TabPanel: React__default.ForwardRefExoticComponent<TabPanelProps & React__default.RefAttributes<HTMLDivElement>>;
};

interface AccordionRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Whether one or many items can be open at once */
    type?: 'single' | 'multiple';
    /** Controlled open values */
    value?: string[];
    /** Default open values (uncontrolled) */
    defaultValue?: string[];
    /** Change callback */
    onValueChange?: (value: string[]) => void;
    /** In `single` mode, allow closing the open item */
    collapsible?: boolean;
    className?: string;
    tw?: string;
}
interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
    className?: string;
    tw?: string;
}
interface AccordionTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    className?: string;
    tw?: string;
}
interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    tw?: string;
}
/**
 * Accordion with single/multiple expansion, full keyboard support and ARIA wiring.
 *
 * @example
 * <Accordion.Root type="single" collapsible defaultValue={['a']}>
 *   <Accordion.Item value="a">
 *     <Accordion.Trigger>Question?</Accordion.Trigger>
 *     <Accordion.Content>Answer.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
declare const Accordion: {
    Root: React__default.ForwardRefExoticComponent<AccordionRootProps & React__default.RefAttributes<HTMLDivElement>>;
    Item: React__default.ForwardRefExoticComponent<AccordionItemProps & React__default.RefAttributes<HTMLDivElement>>;
    Trigger: React__default.ForwardRefExoticComponent<AccordionTriggerProps & React__default.RefAttributes<HTMLButtonElement>>;
    Content: React__default.ForwardRefExoticComponent<AccordionContentProps & React__default.RefAttributes<HTMLDivElement>>;
};

interface TableRootProps extends HTMLAttributes<HTMLTableElement> {
    striped?: boolean;
    hoverable?: boolean;
    dense?: boolean;
    className?: string;
    tw?: string;
}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** Visually mark the row as selected */
    selected?: boolean;
    tw?: string;
}
interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
    tw?: string;
}
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    tw?: string;
}
/**
 * Compound data table. `striped`, `hoverable` and `dense` on Root cascade to
 * rows/cells via context.
 *
 * @example
 * <Table.Root hoverable>
 *   <Table.Header><Table.Row><Table.Head>Name</Table.Head></Table.Row></Table.Header>
 *   <Table.Body><Table.Row><Table.Cell>Ada</Table.Cell></Table.Row></Table.Body>
 * </Table.Root>
 */
declare const Table: {
    Root: React__default.ForwardRefExoticComponent<TableRootProps & React__default.RefAttributes<HTMLTableElement>>;
    Header: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLTableSectionElement>>;
    Body: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLTableSectionElement>>;
    Footer: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLTableSectionElement>>;
    Row: React__default.ForwardRefExoticComponent<TableRowProps & React__default.RefAttributes<HTMLTableRowElement>>;
    Head: React__default.ForwardRefExoticComponent<TableHeadProps & React__default.RefAttributes<HTMLTableCellElement>>;
    Cell: React__default.ForwardRefExoticComponent<TableCellProps & React__default.RefAttributes<HTMLTableCellElement>>;
    Caption: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLTableCaptionElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLTableCaptionElement>>;
};

interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    tw?: string;
}
interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
    className?: string;
    tw?: string;
}
interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    tw?: string;
}
interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
    className?: string;
    tw?: string;
}
interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
    className?: string;
    tw?: string;
    children?: ReactNode;
}
/**
 * Breadcrumb navigation. Compose with Link for navigable crumbs, Page for the
 * current page, and Separator between them.
 *
 * @example
 * <Breadcrumb.Root>
 *   <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
 *   <Breadcrumb.Separator />
 *   <Breadcrumb.Item><Breadcrumb.Page>Settings</Breadcrumb.Page></Breadcrumb.Item>
 * </Breadcrumb.Root>
 */
declare const Breadcrumb: {
    Root: React__default.ForwardRefExoticComponent<BreadcrumbRootProps & React__default.RefAttributes<HTMLElement>>;
    Item: React__default.ForwardRefExoticComponent<BreadcrumbItemProps & React__default.RefAttributes<HTMLLIElement>>;
    Link: React__default.ForwardRefExoticComponent<BreadcrumbLinkProps & React__default.RefAttributes<HTMLAnchorElement>>;
    Page: React__default.ForwardRefExoticComponent<BreadcrumbPageProps & React__default.RefAttributes<HTMLSpanElement>>;
    Separator: React__default.ForwardRefExoticComponent<BreadcrumbSeparatorProps & React__default.RefAttributes<HTMLLIElement>>;
};

interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
    /** Current page (1-indexed) */
    page: number;
    /** Total number of pages */
    count: number;
    /** Called with the next page when a control is activated */
    onChange: (page: number) => void;
    /** How many pages to show around the current page */
    siblingCount?: number;
    /** Show the Previous / Next arrows */
    showEdges?: boolean;
    className?: string;
    tw?: string;
}
/**
 * Pagination control with a smart ellipsis range. Fully controlled.
 *
 * @example
 * <Pagination page={page} count={12} onChange={setPage} />
 */
declare const Pagination: React__default.ForwardRefExoticComponent<PaginationProps & React__default.RefAttributes<HTMLElement>>;

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
    Trigger: React__default.ForwardRefExoticComponent<TooltipTriggerProps & React__default.RefAttributes<any>>;
    Content: React__default.ForwardRefExoticComponent<TooltipContentProps & React__default.RefAttributes<HTMLDivElement>>;
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
    Overlay: React__default.ForwardRefExoticComponent<DialogOverlayProps & React__default.RefAttributes<HTMLDivElement>>;
    Content: React__default.ForwardRefExoticComponent<DialogContentProps & React__default.RefAttributes<HTMLDivElement>>;
    Header: React__default.ForwardRefExoticComponent<DialogHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
    Title: React__default.ForwardRefExoticComponent<DialogTitleProps & React__default.RefAttributes<HTMLHeadingElement>>;
    Description: React__default.ForwardRefExoticComponent<DialogDescriptionProps & React__default.RefAttributes<HTMLParagraphElement>>;
    Footer: React__default.ForwardRefExoticComponent<DialogFooterProps & React__default.RefAttributes<HTMLDivElement>>;
    Close: React__default.ForwardRefExoticComponent<DialogCloseProps & React__default.RefAttributes<HTMLButtonElement>>;
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
    Overlay: React__default.ForwardRefExoticComponent<DrawerOverlayProps & React__default.RefAttributes<HTMLDivElement>>;
    Content: React__default.ForwardRefExoticComponent<DrawerContentProps & React__default.RefAttributes<HTMLDivElement>>;
    Header: React__default.ForwardRefExoticComponent<DrawerHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
    Title: React__default.ForwardRefExoticComponent<DrawerTitleProps & React__default.RefAttributes<HTMLHeadingElement>>;
    Description: React__default.ForwardRefExoticComponent<DrawerDescriptionProps & React__default.RefAttributes<HTMLParagraphElement>>;
    Footer: React__default.ForwardRefExoticComponent<DrawerFooterProps & React__default.RefAttributes<HTMLDivElement>>;
    Close: React__default.ForwardRefExoticComponent<DrawerCloseProps & React__default.RefAttributes<HTMLButtonElement>>;
};

type Align$1 = 'start' | 'end' | 'center';
type Side$1 = 'bottom' | 'top';
interface DropdownMenuRootProps {
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: Align$1;
    side?: Side$1;
}
interface DropdownMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    tw?: string;
}
interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Gap between trigger and menu, in px */
    sideOffset?: number;
    className?: string;
    tw?: string;
}
interface DropdownMenuItemProps extends HTMLAttributes<HTMLButtonElement> {
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
declare const DropdownMenu: {
    Root: ({ children, open: controlled, defaultOpen, onOpenChange, align, side }: DropdownMenuRootProps) => react_jsx_runtime.JSX.Element;
    Trigger: React__default.ForwardRefExoticComponent<DropdownMenuTriggerProps & React__default.RefAttributes<HTMLButtonElement>>;
    Content: React__default.ForwardRefExoticComponent<DropdownMenuContentProps & React__default.RefAttributes<HTMLDivElement>>;
    Item: React__default.ForwardRefExoticComponent<DropdownMenuItemProps & React__default.RefAttributes<HTMLButtonElement>>;
    Label: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLDivElement>>;
    Separator: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLDivElement>>;
};

type Align = 'start' | 'end' | 'center';
type Side = 'bottom' | 'top' | 'left' | 'right';
interface PopoverRootProps {
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: Align;
    side?: Side;
}
interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
    tw?: string;
}
interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
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
declare const Popover: {
    Root: ({ children, open: controlled, defaultOpen, onOpenChange, align, side }: PopoverRootProps) => react_jsx_runtime.JSX.Element;
    Trigger: React__default.ForwardRefExoticComponent<PopoverTriggerProps & React__default.RefAttributes<HTMLButtonElement>>;
    Content: React__default.ForwardRefExoticComponent<PopoverContentProps & React__default.RefAttributes<HTMLDivElement>>;
    Close: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLButtonElement> & {
        tw?: string;
    } & React__default.RefAttributes<HTMLButtonElement>>;
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
declare const Spinner: PolymorphicComponent<InferVariantProps<{
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    color: {
        brand: string;
        white: string;
        gray: string;
        danger: string;
        success: string;
    };
}>, "div">;
/**
 * Full-page loading overlay with spinner.
 * Blocks interaction while content is loading.
 */
declare function LoadingOverlay({ message, show, }: {
    message?: string;
    show?: boolean;
}): react_jsx_runtime.JSX.Element | null;

type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
declare const Alert: React__default.ForwardRefExoticComponent<AlertProps & React__default.RefAttributes<HTMLDivElement>>;

type ProgressVariant = 'brand' | 'gold' | 'success' | 'danger' | 'info';
type ProgressSize = 'sm' | 'md' | 'lg';
interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Current value (0–max). Omit / set null for an indeterminate bar. */
    value?: number | null;
    /** Maximum value */
    max?: number;
    variant?: ProgressVariant;
    size?: ProgressSize;
    /** Render a percentage label to the right of the track */
    showValue?: boolean;
    /** Accessible label */
    label?: string;
    className?: string;
    tw?: string;
}
/**
 * Progress bar. Pass a numeric `value` for determinate, or omit it (or pass
 * `null`) for an animated indeterminate state.
 *
 * @example
 * <Progress value={64} variant="gold" showValue />
 */
declare const Progress: React__default.ForwardRefExoticComponent<ProgressProps & React__default.RefAttributes<HTMLDivElement>>;

type SkeletonShape = 'text' | 'circle' | 'rect' | 'rounded';
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    shape?: SkeletonShape;
    /** Width — number (px) or any CSS length */
    width?: number | string;
    /** Height — number (px) or any CSS length */
    height?: number | string;
    /** Number of stacked lines (text shape only) */
    lines?: number;
    className?: string;
    tw?: string;
}
/**
 * Loading placeholder with a moving shimmer. Use `lines` for multi-line text
 * blocks, or `shape` + width/height for avatars, thumbnails and cards.
 *
 * @example
 * <Skeleton shape="circle" width={40} height={40} />
 * <Skeleton lines={3} />
 */
declare const Skeleton: React__default.ForwardRefExoticComponent<SkeletonProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Avatar component for displaying user profile images or initials..
 */
declare const Avatar: PolymorphicComponent<InferVariantProps<{
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
    };
}>, "div">;

/**
 * Badge component for labels, status indicators, and counts.
 */
declare const Badge: PolymorphicComponent<InferVariantProps<{
    variant: {
        default: string;
        primary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
}>, "span">;

/**
 * A small, modern line-icon set (Lucide-inspired, 24px grid). Icons inherit
 * `currentColor`, so they adapt to whatever text color / theme surrounds them.
 */
declare const icons: {
    readonly sparkle: "M12 3l1.6 4.6a3 3 0 001.8 1.8L20 11l-4.6 1.6a3 3 0 00-1.8 1.8L12 19l-1.6-4.6a3 3 0 00-1.8-1.8L4 11l4.6-1.6a3 3 0 001.8-1.8L12 3z";
    readonly check: "M20 6L9 17l-5-5";
    readonly arrow: "M5 12h14M13 6l6 6-6 6";
    readonly bolt: "M13 3v6h6l-8 12v-6H5l8-12z";
    readonly shield: "M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z";
    readonly layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5";
    readonly dashboard: "M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z";
    readonly barchart: "M3 3v18h18M8 17V11M13 17V7M18 17v-4";
    readonly gauge: "M12 14a2.5 2.5 0 002.5-2.5c0-1.4-2.5-5-2.5-5s-2.5 3.6-2.5 5A2.5 2.5 0 0012 14zM4.5 18a9 9 0 1115 0";
    readonly globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3.5 9h17M3.5 15h17M12 3a14 14 0 010 18 14 14 0 010-18z";
    readonly users: "M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a4 4 0 100-8 4 4 0 000 8zM22 19v-2a4 4 0 00-3-3.9M16 1.1A4 4 0 0116 9";
    readonly bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0";
    readonly search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3";
    readonly menu: "M3 6h18M3 12h18M3 18h18";
    readonly x: "M18 6L6 18M6 6l12 12";
    readonly chart: "M3 3v18h18M7 14l3-3 3 2 5-6";
    readonly wallet: "M3 8a2 2 0 012-2h12.5A1.5 1.5 0 0019 7.5V7a2 2 0 00-2-2H5M3 8v8a2 2 0 002 2h13a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 01-2-2zM16.5 12.5h.01";
    readonly creditcard: "M3 6h18v12H3zM3 10h18M7 15h4";
    readonly folder: "M4 7a2 2 0 012-2h3.5l2 2H18a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V7z";
    readonly star: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z";
    readonly github: "M9 19c-5 1.4-5-2.5-7-3m14 6v-3.5a3 3 0 00-.9-2.3c3-.3 6.1-1.5 6.1-6.6a5.1 5.1 0 00-1.4-3.5 4.8 4.8 0 00-.1-3.5s-1.1-.3-3.6 1.4a12.3 12.3 0 00-6.4 0C5.7 1.7 4.6 2 4.6 2a4.8 4.8 0 00-.1 3.5A5.1 5.1 0 003 9c0 5.1 3.1 6.3 6.1 6.6a3 3 0 00-.9 2.3V21";
    readonly twitter: "M22 4.5a8 8 0 01-2.3.6 4 4 0 001.8-2.2 8 8 0 01-2.5 1 4 4 0 00-6.9 3.6A11.3 11.3 0 013 3.3a4 4 0 001.2 5.3 4 4 0 01-1.8-.5 4 4 0 003.2 4 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 21a11.3 11.3 0 006.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0022 4.5z";
    readonly grid: "M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z";
    readonly rocket: "M5 14l-2 5 5-2m2-2a14 14 0 01.5-9A9 9 0 0119 4a9 9 0 01-1.4 9.5 14 14 0 01-9 .5L5 14zm9-5.5h.01";
    readonly lock: "M5 11h14v10H5zM8 11V7a4 4 0 018 0v4";
    readonly eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z";
    readonly 'eye-off': "M10 5.1A11 11 0 0112 5c6.4 0 10 7 10 7a18 18 0 01-2.2 3M6.6 6.6A18 18 0 002 12s3.6 7 10 7a11 11 0 005.3-1.3M3 3l18 18M9.9 9.9a3 3 0 004.2 4.2";
    readonly mail: "M3 6h18v12H3zM3 7l9 6 9-6";
    readonly home: "M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10";
    readonly cog: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 13.5a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-2.9-1.1l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00-1.2-2.9H3a2 2 0 110-4h.2a1.7 1.7 0 001.1-2.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.4h.1A1.7 1.7 0 0010 3.2V3a2 2 0 114 0v.2a1.7 1.7 0 002.9 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.4 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.5 1z";
    readonly logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9";
    readonly plus: "M12 5v14M5 12h14";
    readonly trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5";
    readonly download: "M12 3v12M7 10l5 5 5-5M5 21h14";
    readonly google: "M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 01-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z M12 22c2.7 0 5-1 6.6-2.4l-3.3-2.5c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3.1v2.6A10 10 0 0012 22z M6.5 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 000 9.2L6.5 14z M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0012 2 10 10 0 003.1 7.4L6.5 10c.8-2.4 2.9-4 5.5-4z";
};
type IconName = keyof typeof icons;
interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
    /** Icon name from the built-in set (any string accepted; unknown renders nothing) */
    name: IconName | (string & {});
    /** Pixel size (sets width & height) */
    size?: number;
    /** Additional Tailwind classes */
    tw?: string;
}
/**
 * Render a named icon. Inherits `currentColor`.
 *
 * @example
 * <Icon name="sparkle" className="h-5 w-5 text-brand-600" />
 */
declare const Icon: React__default.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React__default.RefAttributes<SVGSVGElement>>;

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
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
declare const Eyebrow: React__default.ForwardRefExoticComponent<EyebrowProps & React__default.RefAttributes<HTMLSpanElement>>;

interface KbdProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    tw?: string;
}
/**
 * Keyboard key hint.
 *
 * @example
 * Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
 */
declare const Kbd: React__default.ForwardRefExoticComponent<KbdProps & React__default.RefAttributes<HTMLElement>>;

type IconButtonIntent = 'primary' | 'secondary' | 'ghost' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
declare const IconButton: React__default.ForwardRefExoticComponent<IconButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

interface StatProps extends HTMLAttributes<HTMLDivElement> {
    /** Metric label (e.g. "Revenue") */
    label: ReactNode;
    /** The primary value (e.g. "$48,210") */
    value: ReactNode;
    /** Optional delta text (e.g. "+12.4%") */
    delta?: ReactNode;
    /** Direction of the delta — colors it green/red and rotates the arrow */
    trend?: 'up' | 'down';
    /** Optional trailing icon element shown top-right */
    icon?: ReactNode;
    /** Optional helper shown next to the delta (e.g. "vs last month") */
    hint?: ReactNode;
    className?: string;
    tw?: string;
}
/**
 * Stat / metric card — label, value and an optional trend delta + icon.
 *
 * @example
 * <Stat label="Revenue" value="$48,210" delta="+12.4%" trend="up"
 *       icon={<Icon name="wallet" />} hint="vs last month" />
 */
declare const Stat: React__default.ForwardRefExoticComponent<StatProps & React__default.RefAttributes<HTMLDivElement>>;

interface CodeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The code to display */
    code: string;
    /** Optional filename / title shown in the header bar */
    filename?: string;
    /** Language label shown on the right of the header */
    lang?: string;
    /** Show a copy-to-clipboard button (default true) */
    copyable?: boolean;
    className?: string;
    tw?: string;
}
/**
 * A self-contained dark code block with an optional filename header and a
 * copy-to-clipboard button. Looks consistent on any background/theme.
 *
 * @example
 * <Code filename="App.tsx" lang="tsx" code={`<Button>Click</Button>`} />
 */
declare const Code: React__default.ForwardRefExoticComponent<CodeProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Gallery component for displaying images in various grid layouts.
 */
declare const Gallery: PolymorphicComponent<InferVariantProps<{
    columns: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
    };
    gap: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}>, "div">;
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
    children: React__default.ReactNode[];
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
    children: React__default.ReactNode;
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

/** Generic slot props for block sub-parts: an element's HTML attributes plus the
 *  `tw` escape hatch. Centralised here so every block imports one canonical type
 *  (avoids duplicate `SlotProps` exports colliding at the barrel). */
type SlotProps<E extends HTMLElement = HTMLDivElement> = HTMLAttributes<E> & {
    /** Extra Tailwind classes (merged last). */
    tw?: string;
};
/**
 * The shared 6-design surface vocabulary used by card-like blocks.
 * Full-width blocks (Hero, Navbar, Footer…) define their own layout-oriented
 * variant sets but should reuse the token classes below for their surfaces.
 */
type BlockVariant = 'minimal' | 'bordered' | 'elevated' | 'glass' | 'gradient' | 'feature';
declare const BLOCK_VARIANTS: BlockVariant[];
/** Root surface classes per design — all theme-following via semantic tokens. */
declare const surfaceVariants: Record<BlockVariant, string>;
/** Solid accent surface (buttons, marks) + correct contrast text. */
declare const accentSolid = "bg-primary text-primary-fg hover:brightness-110 shadow-accent border-0";
/** Soft accent tint (chips, highlighted rows). */
declare const accentSoft = "bg-primary/10 text-primary border border-primary/20";
/** Ghost control sitting on a themed surface. */
declare const ghostControl = "border border-edge/15 bg-fg/[0.04] text-fg hover:bg-fg/[0.08]";
/** Hairline-bordered, theme-aware input surface. */
declare const inputSurface: string;
declare const BlockVariantContext: React.Context<BlockVariant>;
/** Read the active block variant. Pass a local override to win over context. */
declare function useBlockVariant(local?: BlockVariant): BlockVariant;

type PricingFeature = string | {
    label: ReactNode;
    included?: boolean;
};
interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {
    /** One of the 6 designs. */
    variant?: BlockVariant;
    /** Visually promote this tier (lift + accent), independent of `variant`. */
    highlighted?: boolean;
    /** Extra className. */
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    /** Tier name, e.g. "Pro". */
    name?: ReactNode;
    /** Supporting line under the name. */
    description?: ReactNode;
    /** Numeric or pre-formatted price. */
    price?: number | string;
    /** Currency symbol shown before the price. */
    currency?: string;
    /** Billing period suffix, e.g. "/mo". */
    period?: string;
    /** Feature list. */
    features?: PricingFeature[];
    /** Call-to-action label. */
    cta?: ReactNode;
    /** Ribbon label, e.g. "Most popular". */
    ribbon?: ReactNode;
    /** Fine print under the CTA. */
    footnote?: ReactNode;
}
declare const PricingCardRoot: React__default.ForwardRefExoticComponent<PricingCardProps & React__default.RefAttributes<HTMLDivElement>>;
/** Default div-based slot props. */
type PricingSlotProps = SlotProps<HTMLDivElement>;
declare const PricingRibbon: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
interface PricingHeaderProps extends PricingSlotProps {
    name?: ReactNode;
    description?: ReactNode;
}
declare const PricingHeader: React__default.ForwardRefExoticComponent<PricingHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
interface PricingPriceProps extends PricingSlotProps {
    amount?: number | string;
    currency?: string;
    period?: string;
}
declare const PricingPrice: React__default.ForwardRefExoticComponent<PricingPriceProps & React__default.RefAttributes<HTMLDivElement>>;
interface PricingFeaturesProps extends SlotProps<HTMLUListElement> {
    items?: PricingFeature[];
}
declare const PricingFeatures: React__default.ForwardRefExoticComponent<PricingFeaturesProps & React__default.RefAttributes<HTMLUListElement>>;
interface PricingActionProps extends SlotProps<HTMLButtonElement> {
    /** Accent (filled) or ghost (outline) styling. Defaults to the variant. */
    tone?: 'accent' | 'ghost';
}
declare const PricingAction: React__default.ForwardRefExoticComponent<PricingActionProps & React__default.RefAttributes<HTMLButtonElement>>;
declare const PricingFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
type PricingCardComponent = typeof PricingCardRoot & {
    Ribbon: typeof PricingRibbon;
    Header: typeof PricingHeader;
    Price: typeof PricingPrice;
    Features: typeof PricingFeatures;
    Action: typeof PricingAction;
    Footer: typeof PricingFooter;
};
declare const PricingCard: PricingCardComponent;

interface ProductCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** One of the 6 designs. */
    variant?: BlockVariant;
    /** Extra className. */
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    /** Product image URL. */
    image?: string;
    /** Product title. */
    title?: ReactNode;
    /** Current price (number is formatted with `currency`). */
    price?: number | string;
    /** Original (pre-discount) price, shown struck-through. */
    originalPrice?: number | string;
    /** Currency symbol shown before numeric prices. */
    currency?: string;
    /** Star rating, 0–5. */
    rating?: number;
    /** Review count shown next to the rating. */
    reviews?: number;
    /** Corner badge label, e.g. "Sale". */
    badge?: ReactNode;
    /** Call-to-action label. */
    cta?: ReactNode;
}
type ProductSlotProps = SlotProps<HTMLDivElement>;
declare const ProductCardRoot: React__default.ForwardRefExoticComponent<ProductCardProps & React__default.RefAttributes<HTMLDivElement>>;
interface ProductMediaProps extends ProductSlotProps {
    /** Image URL. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
    /** Corner badge label. */
    badge?: ReactNode;
}
declare const ProductMedia: React__default.ForwardRefExoticComponent<ProductMediaProps & React__default.RefAttributes<HTMLDivElement>>;
declare const ProductBody: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const ProductTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
interface ProductRatingProps extends ProductSlotProps {
    /** Rating value, 0–5. */
    value?: number;
    /** Review count shown alongside. */
    reviews?: number;
}
declare const ProductRating: React__default.ForwardRefExoticComponent<ProductRatingProps & React__default.RefAttributes<HTMLDivElement>>;
interface ProductPriceProps extends ProductSlotProps {
    amount?: number | string;
    originalPrice?: number | string;
    currency?: string;
}
declare const ProductPrice: React__default.ForwardRefExoticComponent<ProductPriceProps & React__default.RefAttributes<HTMLDivElement>>;
interface ProductActionProps extends SlotProps<HTMLButtonElement> {
    /** Accent (filled) or ghost (outline) styling. Defaults to the variant. */
    tone?: 'accent' | 'ghost';
}
declare const ProductAction: React__default.ForwardRefExoticComponent<ProductActionProps & React__default.RefAttributes<HTMLButtonElement>>;
type ProductCardComponent = typeof ProductCardRoot & {
    Media: typeof ProductMedia;
    Body: typeof ProductBody;
    Title: typeof ProductTitle;
    Rating: typeof ProductRating;
    Price: typeof ProductPrice;
    Action: typeof ProductAction;
};
declare const ProductCard: ProductCardComponent;

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
    /** One of the 6 designs. */
    variant?: BlockVariant;
    /** Extra className. */
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    /** Metric label, e.g. "Revenue". */
    label?: ReactNode;
    /** Primary value, e.g. "$48,210". */
    value?: ReactNode;
    /** Delta text, e.g. "12.4%". */
    delta?: ReactNode;
    /** Direction — colors the delta green/red and orients the arrow. */
    deltaDirection?: 'up' | 'down';
    /** Trailing icon shown top-right. */
    icon?: ReactNode;
    /** Helper text shown next to the delta, e.g. "vs last month". */
    hint?: ReactNode;
}
type StatSlotProps = SlotProps<HTMLDivElement>;
declare const StatCardRoot: React__default.ForwardRefExoticComponent<StatCardProps & React__default.RefAttributes<HTMLDivElement>>;
declare const StatIcon: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const StatLabel: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const StatValue: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
interface StatDeltaProps extends SlotProps<HTMLSpanElement> {
    /** Up colors green + arrow rises; down colors red + arrow falls. */
    direction?: 'up' | 'down';
}
declare const StatDelta: React__default.ForwardRefExoticComponent<StatDeltaProps & React__default.RefAttributes<HTMLSpanElement>>;
declare const StatHint: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
type StatCardComponent = typeof StatCardRoot & {
    Icon: typeof StatIcon;
    Label: typeof StatLabel;
    Value: typeof StatValue;
    Delta: typeof StatDelta;
    Hint: typeof StatHint;
};
declare const StatCard: StatCardComponent;

/** A social link rendered as an inline-SVG icon button. */
type SocialPlatform = 'github' | 'twitter' | 'linkedin' | 'dribbble' | 'website';
interface SocialLink {
    /** Known platform — selects the icon. */
    platform: SocialPlatform;
    /** Destination URL. */
    href: string;
    /** Accessible label (defaults to the platform name). */
    label?: string;
}
interface ProfileCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    /** One of the 6 designs. */
    variant?: BlockVariant;
    /** Extra className. */
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    /** Person's name. */
    name?: ReactNode;
    /** Role / title, e.g. "Principal Engineer". */
    role?: ReactNode;
    /** Avatar image URL (falls back to initials from `name`). */
    avatar?: string;
    /** Short bio paragraph. */
    bio?: ReactNode;
    /** Social links rendered as icon buttons. */
    socials?: SocialLink[];
    /** Call-to-action label. */
    cta?: ReactNode;
}
type ProfileSlotProps = SlotProps<HTMLDivElement>;
declare const ProfileCardRoot: React__default.ForwardRefExoticComponent<ProfileCardProps & React__default.RefAttributes<HTMLDivElement>>;
interface ProfileAvatarProps extends ProfileSlotProps {
    /** Avatar image URL. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
}
declare const ProfileAvatar: React__default.ForwardRefExoticComponent<ProfileAvatarProps & React__default.RefAttributes<HTMLDivElement>>;
declare const ProfileName: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
declare const ProfileRole: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
declare const ProfileBio: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
interface ProfileSocialsProps extends ProfileSlotProps {
    /** Social links rendered as icon buttons. */
    socials?: SocialLink[];
}
declare const ProfileSocials: React__default.ForwardRefExoticComponent<ProfileSocialsProps & React__default.RefAttributes<HTMLDivElement>>;
interface ProfileActionProps extends SlotProps<HTMLButtonElement> {
    /** Accent (filled) or ghost (outline) styling. Defaults to the variant. */
    tone?: 'accent' | 'ghost';
}
declare const ProfileAction: React__default.ForwardRefExoticComponent<ProfileActionProps & React__default.RefAttributes<HTMLButtonElement>>;
type ProfileCardComponent = typeof ProfileCardRoot & {
    Avatar: typeof ProfileAvatar;
    Name: typeof ProfileName;
    Role: typeof ProfileRole;
    Bio: typeof ProfileBio;
    Socials: typeof ProfileSocials;
    Action: typeof ProfileAction;
};
declare const ProfileCard: ProfileCardComponent;

interface TestimonialCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
    /** One of the 6 designs. */
    variant?: BlockVariant;
    /** Extra className. */
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    /** The quote text. */
    quote?: ReactNode;
    /** Author name. */
    name?: ReactNode;
    /** Author role / company, e.g. "CTO, Acme". */
    role?: ReactNode;
    /** Author avatar URL (falls back to initials from `name`). */
    avatar?: string;
    /** Star rating, 0–5. */
    rating?: number;
}
type TestimonialSlotProps = SlotProps<HTMLDivElement>;
declare const TestimonialCardRoot: React__default.ForwardRefExoticComponent<TestimonialCardProps & React__default.RefAttributes<HTMLDivElement>>;
interface TestimonialRatingProps extends TestimonialSlotProps {
    /** Rating value, 0–5. */
    value?: number;
}
declare const TestimonialRating: React__default.ForwardRefExoticComponent<TestimonialRatingProps & React__default.RefAttributes<HTMLDivElement>>;
declare const TestimonialQuote: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLQuoteElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLQuoteElement>>;
interface TestimonialAuthorProps extends Omit<TestimonialSlotProps, 'role'> {
    /** Author name. */
    name?: ReactNode;
    /** Author role / company. */
    role?: ReactNode;
    /** Author avatar URL (falls back to initials from `name`). */
    avatar?: string;
}
declare const TestimonialAuthor: React__default.ForwardRefExoticComponent<TestimonialAuthorProps & React__default.RefAttributes<HTMLDivElement>>;
type TestimonialCardComponent = typeof TestimonialCardRoot & {
    Rating: typeof TestimonialRating;
    Quote: typeof TestimonialQuote;
    Author: typeof TestimonialAuthor;
};
declare const TestimonialCard: TestimonialCardComponent;

interface BlogCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** One of the 6 designs. */
    variant?: BlockVariant;
    /** Extra className. */
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    /** Cover image URL. */
    image?: string;
    /** Category / tag label. */
    category?: ReactNode;
    /** Article title. */
    title?: ReactNode;
    /** Short excerpt / dek. */
    excerpt?: ReactNode;
    /** Author name. */
    author?: ReactNode;
    /** Author avatar URL (falls back to initials). */
    authorAvatar?: string;
    /** Publish date, e.g. "Jun 21, 2026". */
    date?: ReactNode;
    /** Read-time label, e.g. "6 min read". */
    readTime?: ReactNode;
    /** When set, the whole card becomes a link. */
    href?: string;
}
type BlogSlotProps = SlotProps<HTMLDivElement>;
declare const BlogCardRoot: React__default.ForwardRefExoticComponent<BlogCardProps & React__default.RefAttributes<HTMLDivElement>>;
interface BlogMediaProps extends BlogSlotProps {
    /** Image URL. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
}
declare const BlogMedia: React__default.ForwardRefExoticComponent<BlogMediaProps & React__default.RefAttributes<HTMLDivElement>>;
declare const BlogBody: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const BlogCategory: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
interface BlogTitleProps extends SlotProps<HTMLHeadingElement> {
    /** When set, wraps the title in a link with a hover affordance. */
    href?: string;
}
declare const BlogTitle: React__default.ForwardRefExoticComponent<BlogTitleProps & React__default.RefAttributes<HTMLHeadingElement>>;
declare const BlogExcerpt: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
interface BlogMetaProps extends BlogSlotProps {
    /** Author name. */
    author?: ReactNode;
    /** Author avatar URL (falls back to initials). */
    authorAvatar?: string;
    /** Publish date. */
    date?: ReactNode;
    /** Read-time label. */
    readTime?: ReactNode;
}
declare const BlogMeta: React__default.ForwardRefExoticComponent<BlogMetaProps & React__default.RefAttributes<HTMLDivElement>>;
type BlogCardComponent = typeof BlogCardRoot & {
    Media: typeof BlogMedia;
    Body: typeof BlogBody;
    Category: typeof BlogCategory;
    Title: typeof BlogTitle;
    Excerpt: typeof BlogExcerpt;
    Meta: typeof BlogMeta;
};
declare const BlogCard: BlogCardComponent;

type HeroVariant = 'split' | 'centered' | 'imageRight' | 'gradient' | 'glass' | 'video';
declare const HERO_VARIANTS: HeroVariant[];
interface HeroCta {
    label: ReactNode;
    href?: string;
}
interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: HeroVariant;
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    eyebrow?: ReactNode;
    title?: ReactNode;
    subtitle?: ReactNode;
    primaryCta?: ReactNode | HeroCta;
    secondaryCta?: ReactNode | HeroCta;
    /** Image src for media-bearing variants. */
    image?: string;
}
declare const HeroRoot: React__default.ForwardRefExoticComponent<HeroProps & React__default.RefAttributes<HTMLElement>>;
type HeroSlotProps<E extends HTMLElement = HTMLDivElement> = HTMLAttributes<E> & {
    tw?: string;
};
declare const HeroEyebrow: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const HeroTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
declare const HeroSubtitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
interface HeroActionsProps extends HeroSlotProps {
    primaryCta?: ReactNode | HeroCta;
    secondaryCta?: ReactNode | HeroCta;
}
declare const HeroActions: React__default.ForwardRefExoticComponent<HeroActionsProps & React__default.RefAttributes<HTMLDivElement>>;
interface HeroMediaProps extends HeroSlotProps {
    image?: string;
}
declare const HeroMedia: React__default.ForwardRefExoticComponent<HeroMediaProps & React__default.RefAttributes<HTMLDivElement>>;
type HeroComponent = typeof HeroRoot & {
    Eyebrow: typeof HeroEyebrow;
    Title: typeof HeroTitle;
    Subtitle: typeof HeroSubtitle;
    Actions: typeof HeroActions;
    Media: typeof HeroMedia;
};
declare const Hero: HeroComponent;

type FeatureGridVariant = 'grid3' | 'grid2' | 'alternating' | 'iconLeft' | 'bordered' | 'spotlight';
declare const FEATURE_GRID_VARIANTS: FeatureGridVariant[];
interface Feature {
    icon?: ReactNode;
    title: ReactNode;
    description: ReactNode;
}
interface FeatureGridProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: FeatureGridVariant;
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    eyebrow?: ReactNode;
    title?: ReactNode;
    subtitle?: ReactNode;
    features?: Feature[];
}
declare const FeatureGridRoot: React__default.ForwardRefExoticComponent<FeatureGridProps & React__default.RefAttributes<HTMLElement>>;
declare const FeatureGridEyebrow: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const FeatureGridTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
declare const FeatureGridSubtitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
interface FeatureGridItemsProps extends SlotProps {
    items?: Feature[];
}
declare const FeatureGridItems: React__default.ForwardRefExoticComponent<FeatureGridItemsProps & React__default.RefAttributes<HTMLDivElement>>;
interface FeatureItemProps extends Omit<SlotProps, 'title'>, Feature {
}
declare const FeatureItem: React__default.ForwardRefExoticComponent<FeatureItemProps & React__default.RefAttributes<HTMLDivElement>>;
type FeatureGridComponent = typeof FeatureGridRoot & {
    Eyebrow: typeof FeatureGridEyebrow;
    Title: typeof FeatureGridTitle;
    Subtitle: typeof FeatureGridSubtitle;
    Items: typeof FeatureGridItems;
    Item: typeof FeatureItem;
};
declare const FeatureGrid: FeatureGridComponent;

type PricingTableVariant = 'cards' | 'comparison' | 'toggle' | 'twoTier' | 'glass' | 'gradient';
declare const PRICING_TABLE_VARIANTS: PricingTableVariant[];
/** A tier is a PricingCard's props, with an optional annual price for `toggle`. */
interface PricingTier extends PricingCardProps {
    /** Annual (per-month-equivalent) price shown when the toggle is on. */
    annualPrice?: number | string;
}
interface PricingTableProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: PricingTableVariant;
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    eyebrow?: ReactNode;
    title?: ReactNode;
    tiers?: PricingTier[];
}
declare const PricingTableRoot: React__default.ForwardRefExoticComponent<PricingTableProps & React__default.RefAttributes<HTMLElement>>;
declare const PricingTableEyebrow: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const PricingTableTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
interface PricingTableTiersProps extends SlotProps {
    tiers?: PricingTier[];
}
declare const PricingTableTiers: React__default.ForwardRefExoticComponent<PricingTableTiersProps & React__default.RefAttributes<HTMLDivElement>>;
type PricingTableComponent = typeof PricingTableRoot & {
    Eyebrow: typeof PricingTableEyebrow;
    Title: typeof PricingTableTitle;
    Tiers: typeof PricingTableTiers;
};
declare const PricingTable: PricingTableComponent;

type CTASectionVariant = 'simple' | 'centered' | 'split' | 'gradient' | 'glass' | 'card';
declare const CTA_SECTION_VARIANTS: CTASectionVariant[];
interface CTACta {
    label: ReactNode;
    href?: string;
}
interface CTASectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: CTASectionVariant;
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    primaryCta?: ReactNode | CTACta;
    secondaryCta?: ReactNode | CTACta;
}
declare const CTASectionRoot: React__default.ForwardRefExoticComponent<CTASectionProps & React__default.RefAttributes<HTMLElement>>;
declare const CTASectionTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
declare const CTASectionSubtitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
interface CTASectionActionsProps extends SlotProps {
    primaryCta?: ReactNode | CTACta;
    secondaryCta?: ReactNode | CTACta;
}
declare const CTASectionActions: React__default.ForwardRefExoticComponent<CTASectionActionsProps & React__default.RefAttributes<HTMLDivElement>>;
type CTASectionComponent = typeof CTASectionRoot & {
    Title: typeof CTASectionTitle;
    Subtitle: typeof CTASectionSubtitle;
    Actions: typeof CTASectionActions;
};
declare const CTASection: CTASectionComponent;

type FAQVariant = 'accordion' | 'twoColumn' | 'bordered' | 'cards' | 'centered' | 'split';
declare const FAQ_VARIANTS: FAQVariant[];
interface FAQItem {
    q: ReactNode;
    a: ReactNode;
}
interface FAQProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: FAQVariant;
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    eyebrow?: ReactNode;
    title?: ReactNode;
    items?: FAQItem[];
}
declare const FAQRoot: React__default.ForwardRefExoticComponent<FAQProps & React__default.RefAttributes<HTMLElement>>;
declare const FAQEyebrow: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const FAQTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
interface FAQItemsProps extends SlotProps {
    items?: FAQItem[];
}
declare const FAQItems: React__default.ForwardRefExoticComponent<FAQItemsProps & React__default.RefAttributes<HTMLDivElement>>;
type FAQComponent = typeof FAQRoot & {
    Eyebrow: typeof FAQEyebrow;
    Title: typeof FAQTitle;
    Items: typeof FAQItems;
};
declare const FAQ: FAQComponent;

type TestimonialsVariant = 'grid' | 'single' | 'carousel' | 'masonry' | 'logos' | 'gradient';
declare const TESTIMONIALS_VARIANTS: TestimonialsVariant[];
interface Testimonial {
    quote: ReactNode;
    name: ReactNode;
    role?: ReactNode;
    avatar?: string;
}
interface TestimonialsProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: TestimonialsVariant;
    className?: string;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
    eyebrow?: ReactNode;
    title?: ReactNode;
    items?: Testimonial[];
}
declare const TestimonialsRoot: React__default.ForwardRefExoticComponent<TestimonialsProps & React__default.RefAttributes<HTMLElement>>;
declare const TestimonialsEyebrow: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLSpanElement>>;
declare const TestimonialsTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
interface TestimonialsItemsProps extends SlotProps {
    items?: Testimonial[];
}
declare const TestimonialsItems: React__default.ForwardRefExoticComponent<TestimonialsItemsProps & React__default.RefAttributes<HTMLDivElement>>;
interface TestimonialItemProps extends Omit<SlotProps, 'role'>, Testimonial {
}
declare const TestimonialItem: React__default.ForwardRefExoticComponent<TestimonialItemProps & React__default.RefAttributes<HTMLElement>>;
type TestimonialsComponent = typeof TestimonialsRoot & {
    Eyebrow: typeof TestimonialsEyebrow;
    Title: typeof TestimonialsTitle;
    Items: typeof TestimonialsItems;
    Item: typeof TestimonialItem;
};
declare const Testimonials: TestimonialsComponent;

type NavbarVariant = 'minimal' | 'centered' | 'split' | 'glass' | 'withSearch' | 'mega';
declare const NAVBAR_VARIANTS: NavbarVariant[];
interface NavLink {
    label: ReactNode;
    href?: string;
    active?: boolean;
}
interface NavbarProps extends HTMLAttributes<HTMLElement> {
    /** One of the 6 layout designs. */
    variant?: NavbarVariant;
    className?: string;
    tw?: string;
    /** Brand mark / wordmark. */
    brand?: ReactNode;
    /** Primary navigation links. */
    links?: NavLink[];
    /** Right-aligned actions (buttons, avatar…). */
    actions?: ReactNode;
}
declare const NavbarRoot: React__default.ForwardRefExoticComponent<NavbarProps & React__default.RefAttributes<HTMLElement>>;
declare const NavbarBrand: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
interface NavbarLinksProps extends SlotProps<HTMLElement> {
    links?: NavLink[];
}
declare const NavbarLinks: React__default.ForwardRefExoticComponent<NavbarLinksProps & React__default.RefAttributes<HTMLElement>>;
declare const NavbarSearch: React__default.ForwardRefExoticComponent<{
    className?: string;
    tw?: string;
} & React__default.RefAttributes<HTMLInputElement>>;
declare const NavbarActions: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
interface NavbarAvatarProps extends SlotProps {
    /** Initials or short label shown inside the avatar. */
    initials?: ReactNode;
}
declare const NavbarAvatar: React__default.ForwardRefExoticComponent<NavbarAvatarProps & React__default.RefAttributes<HTMLDivElement>>;
type NavbarComponent = typeof NavbarRoot & {
    Brand: typeof NavbarBrand;
    Links: typeof NavbarLinks;
    Search: typeof NavbarSearch;
    Actions: typeof NavbarActions;
    Avatar: typeof NavbarAvatar;
};
declare const Navbar: NavbarComponent;

type SidebarVariant = 'minimal' | 'grouped' | 'iconRail' | 'floating' | 'glass' | 'dark';
declare const SIDEBAR_VARIANTS: SidebarVariant[];
interface SidebarItem {
    label: ReactNode;
    href?: string;
    icon?: ReactNode;
    active?: boolean;
    badge?: ReactNode;
}
interface SidebarGroup {
    label?: ReactNode;
    items: SidebarItem[];
}
interface SidebarProps extends HTMLAttributes<HTMLElement> {
    /** One of the 6 layout designs. */
    variant?: SidebarVariant;
    className?: string;
    tw?: string;
    /** Brand mark / wordmark shown at the top. */
    brand?: ReactNode;
    /** Grouped navigation items. */
    groups?: SidebarGroup[];
    /** Footer region (user card, version…). */
    footer?: ReactNode;
}
declare const SidebarRoot: React__default.ForwardRefExoticComponent<SidebarProps & React__default.RefAttributes<HTMLElement>>;
declare const SidebarBrand: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
interface SidebarGroupProps extends SlotProps<HTMLElement> {
    /** Section heading shown above the items. */
    label?: ReactNode;
}
declare const SidebarGroupBlock: React__default.ForwardRefExoticComponent<SidebarGroupProps & React__default.RefAttributes<HTMLElement>>;
interface SidebarItemProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'children'> {
    label?: ReactNode;
    href?: string;
    icon?: ReactNode;
    active?: boolean;
    badge?: ReactNode;
    children?: ReactNode;
    className?: string;
    tw?: string;
}
declare const SidebarItemLink: React__default.ForwardRefExoticComponent<SidebarItemProps & React__default.RefAttributes<HTMLAnchorElement>>;
declare const SidebarFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
type SidebarComponent = typeof SidebarRoot & {
    Brand: typeof SidebarBrand;
    Group: typeof SidebarGroupBlock;
    Item: typeof SidebarItemLink;
    Footer: typeof SidebarFooter;
};
declare const Sidebar: SidebarComponent;

type FooterVariant = 'simple' | 'columns' | 'cta' | 'newsletter' | 'minimal' | 'dark';
declare const FOOTER_VARIANTS: FooterVariant[];
interface FooterLink {
    label: ReactNode;
    href?: string;
}
interface FooterColumn {
    title: ReactNode;
    links: FooterLink[];
}
interface FooterProps extends HTMLAttributes<HTMLElement> {
    /** One of the 6 layout designs. */
    variant?: FooterVariant;
    className?: string;
    tw?: string;
    /** Brand mark / wordmark + tagline region. */
    brand?: ReactNode;
    /** Link columns. */
    columns?: FooterColumn[];
    /** Bottom bar content (copyright, legal links…). */
    bottom?: ReactNode;
}
declare const FooterBrand: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
interface FooterColumnProps extends Omit<SlotProps, 'title'> {
    /** Column heading. */
    title?: ReactNode;
    links?: FooterLink[];
}
declare const FooterColumnBlock: React__default.ForwardRefExoticComponent<FooterColumnProps & React__default.RefAttributes<HTMLDivElement>>;
declare const FooterBottom: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const FooterRoot: React__default.ForwardRefExoticComponent<FooterProps & React__default.RefAttributes<HTMLElement>>;
type FooterComponent = typeof FooterRoot & {
    Brand: typeof FooterBrand;
    Column: typeof FooterColumnBlock;
    Bottom: typeof FooterBottom;
};
declare const Footer: FooterComponent;

type DashboardShellVariant = 'sidebarLeft' | 'sidebarRight' | 'topnav' | 'compact' | 'glass' | 'split';
declare const DASHBOARD_SHELL_VARIANTS: DashboardShellVariant[];
interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {
    /** One of the 6 layout designs. */
    variant?: DashboardShellVariant;
    className?: string;
    tw?: string;
}
declare const ShellSidebar: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const ShellTopbar: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const ShellContent: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLElement>>;
declare const DashboardShellRoot: React__default.ForwardRefExoticComponent<DashboardShellProps & React__default.RefAttributes<HTMLDivElement>>;
type DashboardShellComponent = typeof DashboardShellRoot & {
    Sidebar: typeof ShellSidebar;
    Topbar: typeof ShellTopbar;
    Content: typeof ShellContent;
};
declare const DashboardShell: DashboardShellComponent;

type EmptyStateVariant = 'minimal' | 'illustrated' | 'card' | 'cta' | 'error' | 'search';
declare const EMPTY_STATE_VARIANTS: EmptyStateVariant[];
interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    /** One of the 6 designs. */
    variant?: EmptyStateVariant;
    className?: string;
    tw?: string;
    /** Leading icon / glyph (defaults to a variant-specific illustration). */
    icon?: ReactNode;
    /** Heading. */
    title?: ReactNode;
    /** Supporting copy. */
    description?: ReactNode;
    /** Primary action(s). */
    action?: ReactNode;
}
declare const EmptyStateIcon: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const EmptyStateTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLHeadingElement>>;
declare const EmptyStateDescription: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
declare const EmptyStateAction: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const EmptyStateRoot: React__default.ForwardRefExoticComponent<EmptyStateProps & React__default.RefAttributes<HTMLDivElement>>;
type EmptyStateComponent = typeof EmptyStateRoot & {
    Icon: typeof EmptyStateIcon;
    Title: typeof EmptyStateTitle;
    Description: typeof EmptyStateDescription;
    Action: typeof EmptyStateAction;
};
declare const EmptyState: EmptyStateComponent;

type CommandPaletteVariant = 'minimal' | 'grouped' | 'withFooter' | 'icons' | 'recent' | 'glass';
declare const COMMAND_PALETTE_VARIANTS: CommandPaletteVariant[];
interface CommandItem {
    label: string;
    href?: string;
    icon?: ReactNode;
    shortcut?: ReactNode;
    onSelect?: () => void;
}
interface CommandGroup {
    label?: ReactNode;
    items: CommandItem[];
}
interface CommandPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** One of the 6 designs. */
    variant?: CommandPaletteVariant;
    className?: string;
    tw?: string;
    /** Whether the palette is open (controlled). */
    open: boolean;
    /** Open-state change callback. */
    onOpenChange: (open: boolean) => void;
    /** Grouped command items. Items are filtered by the typed query. */
    groups?: CommandGroup[];
    /** Input placeholder. */
    placeholder?: string;
}
interface CommandPaletteInputProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    tw?: string;
}
declare const CommandPaletteInput: React__default.ForwardRefExoticComponent<CommandPaletteInputProps & React__default.RefAttributes<HTMLInputElement>>;
interface CommandPaletteGroupProps extends SlotProps {
    label?: ReactNode;
}
declare const CommandPaletteGroup: React__default.ForwardRefExoticComponent<CommandPaletteGroupProps & React__default.RefAttributes<HTMLDivElement>>;
interface CommandPaletteItemProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    label?: string;
    icon?: ReactNode;
    shortcut?: ReactNode;
    onSelect?: () => void;
    className?: string;
    tw?: string;
}
declare const CommandPaletteItem: React__default.ForwardRefExoticComponent<CommandPaletteItemProps & React__default.RefAttributes<HTMLButtonElement>>;
declare const CommandPaletteFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLDivElement>>;
declare const CommandPaletteRoot: React__default.ForwardRefExoticComponent<CommandPaletteProps & React__default.RefAttributes<HTMLDivElement>>;
type CommandPaletteComponent = typeof CommandPaletteRoot & {
    Input: typeof CommandPaletteInput;
    Group: typeof CommandPaletteGroup;
    Item: typeof CommandPaletteItem;
    Footer: typeof CommandPaletteFooter;
};
declare const CommandPalette: CommandPaletteComponent;

type SignInVariant = 'centered' | 'split' | 'card' | 'glass' | 'minimal' | 'social';
declare const SIGNIN_VARIANTS: SignInVariant[];
interface SocialProvider {
    /** Provider key (drives the inline icon + default label). */
    provider: 'google' | 'github' | 'apple';
    /** Link target. */
    href?: string;
    /** Override the button label. */
    label?: ReactNode;
}
interface SignInProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
    /** One of the 6 layout designs. */
    variant?: SignInVariant;
    className?: string;
    tw?: string;
    /** Heading. */
    title?: ReactNode;
    /** Sub-heading. */
    subtitle?: ReactNode;
    /** Submit handler — receives the native event (default-prevented). */
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    /** Social sign-in providers. */
    socials?: SocialProvider[];
    /** "Forgot password" link target. */
    forgotHref?: string;
    /** "Create account" link target. */
    signupHref?: string;
}
declare const SignInRoot: React__default.ForwardRefExoticComponent<SignInProps & React__default.RefAttributes<HTMLDivElement>>;
declare const SignInPanel: React__default.ForwardRefExoticComponent<Omit<SlotProps, "title"> & {
    title?: ReactNode;
    subtitle?: ReactNode;
} & React__default.RefAttributes<HTMLDivElement>>;
interface SignInHeaderProps extends Omit<SlotProps, 'title'> {
    title?: ReactNode;
    subtitle?: ReactNode;
}
declare const SignInHeader: React__default.ForwardRefExoticComponent<SignInHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
interface SignInFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Field label. */
    label?: ReactNode;
    /** Trailing action shown on the label row (e.g. "Forgot?"). */
    action?: ReactNode;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
}
declare const SignInField: React__default.ForwardRefExoticComponent<SignInFieldProps & React__default.RefAttributes<HTMLInputElement>>;
declare const SignInActions: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLButtonElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLButtonElement>>;
interface SignInSocialProps extends SlotProps {
    socials?: SocialProvider[];
}
declare const SignInSocial: React__default.ForwardRefExoticComponent<SignInSocialProps & React__default.RefAttributes<HTMLDivElement>>;
declare const SignInFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
type SignInComponent = typeof SignInRoot & {
    Panel: typeof SignInPanel;
    Header: typeof SignInHeader;
    Field: typeof SignInField;
    Actions: typeof SignInActions;
    Social: typeof SignInSocial;
    Footer: typeof SignInFooter;
};
declare const SignIn: SignInComponent;

type SignUpVariant = 'centered' | 'split' | 'card' | 'glass' | 'steps' | 'social';
declare const SIGNUP_VARIANTS: SignUpVariant[];
interface SignUpSocialProvider {
    provider: 'google' | 'github' | 'apple';
    href?: string;
    label?: ReactNode;
}
interface SignUpProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
    /** One of the 6 layout designs. */
    variant?: SignUpVariant;
    className?: string;
    tw?: string;
    /** Heading. */
    title?: ReactNode;
    /** Sub-heading. */
    subtitle?: ReactNode;
    /** Submit handler — receives the native event (default-prevented). */
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    /** Social sign-up providers. */
    socials?: SignUpSocialProvider[];
    /** "Sign in" link target. */
    signinHref?: string;
}
declare const SignUpRoot: React__default.ForwardRefExoticComponent<SignUpProps & React__default.RefAttributes<HTMLDivElement>>;
declare const SignUpPanel: React__default.ForwardRefExoticComponent<Omit<SlotProps, "title"> & {
    title?: ReactNode;
    subtitle?: ReactNode;
} & React__default.RefAttributes<HTMLDivElement>>;
interface SignUpHeaderProps extends Omit<SlotProps, 'title'> {
    title?: ReactNode;
    subtitle?: ReactNode;
}
declare const SignUpHeader: React__default.ForwardRefExoticComponent<SignUpHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
interface SignUpFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Field label. */
    label?: ReactNode;
    /** Extra Tailwind classes (merged last). */
    tw?: string;
}
declare const SignUpField: React__default.ForwardRefExoticComponent<SignUpFieldProps & React__default.RefAttributes<HTMLInputElement>>;
declare const SignUpActions: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLButtonElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLButtonElement>>;
interface SignUpSocialProps extends SlotProps {
    socials?: SignUpSocialProvider[];
}
declare const SignUpSocial: React__default.ForwardRefExoticComponent<SignUpSocialProps & React__default.RefAttributes<HTMLDivElement>>;
declare const SignUpFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLParagraphElement>>;
type SignUpComponent = typeof SignUpRoot & {
    Panel: typeof SignUpPanel;
    Header: typeof SignUpHeader;
    Field: typeof SignUpField;
    Actions: typeof SignUpActions;
    Social: typeof SignUpSocial;
    Footer: typeof SignUpFooter;
};
declare const SignUp: SignUpComponent;

type SettingsFormVariant = 'tabs' | 'sections' | 'sidebar' | 'cards' | 'inline' | 'split';
declare const SETTINGSFORM_VARIANTS: SettingsFormVariant[];
interface SettingsFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
    /** One of the 6 layout designs. */
    variant?: SettingsFormVariant;
    className?: string;
    tw?: string;
    /** Submit handler — receives the native event (default-prevented). */
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
interface SettingsFieldProps extends Omit<SlotProps, 'title'> {
    /** Field label. */
    label?: ReactNode;
    /** Helper / hint text below the control. */
    hint?: ReactNode;
}
declare const SettingsField: React__default.ForwardRefExoticComponent<SettingsFieldProps & React__default.RefAttributes<HTMLDivElement>>;
interface SettingsGroupProps extends Omit<SlotProps, 'title'> {
    /** Group heading. */
    title?: ReactNode;
    /** Group description. */
    description?: ReactNode;
    /** Render as a bordered card (used by the `cards` design). */
    carded?: boolean;
}
declare const SettingsGroup: React__default.ForwardRefExoticComponent<SettingsGroupProps & React__default.RefAttributes<HTMLDivElement>>;
interface ToggleRowProps extends SlotProps<HTMLInputElement> {
    label?: ReactNode;
    description?: ReactNode;
    defaultChecked?: boolean;
}
declare const ToggleRow: React__default.ForwardRefExoticComponent<ToggleRowProps & React__default.RefAttributes<HTMLInputElement>>;
interface SettingsSaveBarProps extends SlotProps {
    /** Sticky to the bottom (default true). */
    sticky?: boolean;
}
declare const SettingsSaveBar: React__default.ForwardRefExoticComponent<SettingsSaveBarProps & React__default.RefAttributes<HTMLDivElement>>;
declare const SettingsFormRoot: React__default.ForwardRefExoticComponent<SettingsFormProps & React__default.RefAttributes<HTMLDivElement>>;
type SettingsFormComponent = typeof SettingsFormRoot & {
    Group: typeof SettingsGroup;
    Field: typeof SettingsField;
    ToggleRow: typeof ToggleRow;
    SaveBar: typeof SettingsSaveBar;
};
declare const SettingsForm: SettingsFormComponent;

type ContactFormVariant = 'simple' | 'split' | 'card' | 'glass' | 'withDetails' | 'minimal';
declare const CONTACTFORM_VARIANTS: ContactFormVariant[];
interface ContactDetails {
    email?: string;
    phone?: string;
    address?: string;
}
interface ContactFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
    /** One of the 6 layout designs. */
    variant?: ContactFormVariant;
    className?: string;
    tw?: string;
    /** Heading. */
    title?: ReactNode;
    /** Sub-heading. */
    subtitle?: ReactNode;
    /** Submit handler — receives the native event (default-prevented). */
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    /** Contact info shown in the sidebar (split / withDetails designs). */
    details?: ContactDetails;
}
declare const ContactFormRoot: React__default.ForwardRefExoticComponent<ContactFormProps & React__default.RefAttributes<HTMLDivElement>>;
interface ContactHeaderProps extends Omit<SlotProps, 'title'> {
    title?: ReactNode;
    subtitle?: ReactNode;
}
declare const ContactHeader: React__default.ForwardRefExoticComponent<ContactHeaderProps & React__default.RefAttributes<HTMLDivElement>>;
interface ContactFieldProps extends Omit<SlotProps, 'title'> {
    label?: ReactNode;
}
declare const ContactField: React__default.ForwardRefExoticComponent<ContactFieldProps & React__default.RefAttributes<HTMLDivElement>>;
declare const ContactSubmit: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLButtonElement> & {
    tw?: string;
} & React__default.RefAttributes<HTMLButtonElement>>;
interface ContactDetailsPanelProps extends Omit<SlotProps, 'title'> {
    title?: ReactNode;
    subtitle?: ReactNode;
    details?: ContactDetails;
}
declare const ContactDetailsPanel: React__default.ForwardRefExoticComponent<ContactDetailsPanelProps & React__default.RefAttributes<HTMLDivElement>>;
type ContactFormComponent = typeof ContactFormRoot & {
    Header: typeof ContactHeader;
    Field: typeof ContactField;
    Submit: typeof ContactSubmit;
    Details: typeof ContactDetailsPanel;
};
declare const ContactForm: ContactFormComponent;

type CheckoutFormVariant = 'single' | 'twoColumn' | 'steps' | 'card' | 'glass' | 'compact';
declare const CHECKOUTFORM_VARIANTS: CheckoutFormVariant[];
interface LineItem {
    name: ReactNode;
    price: number;
    qty?: number;
    image?: string;
}
interface CheckoutFormProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
    /** One of the 6 layout designs. */
    variant?: CheckoutFormVariant;
    className?: string;
    tw?: string;
    /** Submit handler — receives the native event (default-prevented). */
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    /** Order line items shown in the summary. */
    items?: LineItem[];
    /** Flat shipping cost. */
    shipping?: number;
    /** Currency symbol. */
    currency?: string;
}
interface CheckoutFieldProps extends Omit<SlotProps, 'title'> {
    label?: ReactNode;
}
declare const CheckoutField: React__default.ForwardRefExoticComponent<CheckoutFieldProps & React__default.RefAttributes<HTMLDivElement>>;
interface CheckoutSectionProps extends Omit<SlotProps, 'title'> {
    /** Section heading. */
    title?: ReactNode;
    /** Step index shown as a numbered badge. */
    step?: number;
}
declare const CheckoutSection: React__default.ForwardRefExoticComponent<CheckoutSectionProps & React__default.RefAttributes<HTMLElement>>;
interface CheckoutSummaryProps extends SlotProps {
    items?: LineItem[];
    shipping?: number;
    currency?: string;
    /** Pay button label. Pass null to hide it (e.g. when the form owns submit). */
    cta?: ReactNode | null;
}
declare const CheckoutSummary: React__default.ForwardRefExoticComponent<CheckoutSummaryProps & React__default.RefAttributes<HTMLDivElement>>;
declare const CheckoutFormRoot: React__default.ForwardRefExoticComponent<CheckoutFormProps & React__default.RefAttributes<HTMLDivElement>>;
type CheckoutFormComponent = typeof CheckoutFormRoot & {
    Section: typeof CheckoutSection;
    Field: typeof CheckoutField;
    Summary: typeof CheckoutSummary;
};
declare const CheckoutForm: CheckoutFormComponent;

type ProductGridVariant = 'grid3' | 'grid4' | 'list' | 'masonry' | 'compact' | 'featured';
declare const PRODUCTGRID_VARIANTS: ProductGridVariant[];
interface GridProduct {
    image?: string;
    title: ReactNode;
    price: number | string;
    originalPrice?: number | string;
    badge?: ReactNode;
    rating?: number;
}
interface ProductGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** One of the 6 layout designs. */
    variant?: ProductGridVariant;
    className?: string;
    tw?: string;
    /** Products to render. */
    products?: GridProduct[];
    /** Override the column count for the data-prop grid designs. */
    columns?: number;
    /** Currency symbol shown before numeric prices. */
    currency?: string;
    /** Call-to-action label on each item. */
    cta?: ReactNode;
}
interface ProductGridItemProps extends Omit<SlotProps, 'title'>, Partial<GridProduct> {
    /** Render horizontally (list design). */
    row?: boolean;
    /** Larger spotlight item (featured design). */
    feature?: boolean;
    /** Currency symbol. */
    currency?: string;
    /** Call-to-action label. */
    cta?: ReactNode;
}
declare const ProductGridItem: React__default.ForwardRefExoticComponent<ProductGridItemProps & React__default.RefAttributes<HTMLDivElement>>;
declare const ProductGridRoot: React__default.ForwardRefExoticComponent<ProductGridProps & React__default.RefAttributes<HTMLDivElement>>;
type ProductGridComponent = typeof ProductGridRoot & {
    Item: typeof ProductGridItem;
};
declare const ProductGrid: ProductGridComponent;

export { Accordion, Alert, Avatar, BLOCK_VARIANTS, Badge, BlockVariantContext, BlogCard, Breadcrumb, Button, CHECKOUTFORM_VARIANTS, COMMAND_PALETTE_VARIANTS, CONTACTFORM_VARIANTS, CTASection, CTA_SECTION_VARIANTS, Card, Carousel, CarouselImage, CarouselSlide, Checkbox, CheckoutForm, Code, CommandPalette, ContactForm, DASHBOARD_SHELL_VARIANTS, DashboardShell, Dialog, Drawer, DropdownMenu, EMPTY_STATE_VARIANTS, EmptyState, Eyebrow, FAQ, FAQ_VARIANTS, FEATURE_GRID_VARIANTS, FOOTER_VARIANTS, FeatureGrid, Footer, Gallery, GalleryImage, GalleryLightbox, HERO_VARIANTS, Hero, Icon, IconButton, Input, Kbd, LoadingOverlay, Dialog as Modal, NAVBAR_VARIANTS, Navbar, PRICING_TABLE_VARIANTS, PRODUCTGRID_VARIANTS, Pagination, Popover, PricingCard, PricingTable, ProductCard, ProductGrid, ProfileCard, Progress, Radio, SETTINGSFORM_VARIANTS, SIDEBAR_VARIANTS, SIGNIN_VARIANTS, SIGNUP_VARIANTS, Select, SettingsForm, Sidebar, SignIn, SignUp, Skeleton, Spinner, Stat, StatCard, TESTIMONIALS_VARIANTS, Table, Tabs, TestimonialCard, Testimonials, Textarea, ToastProvider, Toggle, Tooltip, accentSoft, accentSolid, createComponent, createSlots, cx, ghostControl, icons, inputSurface, mergeTw, surfaceVariants, tv, useBlockVariant, useCarousel, useFocusReturn, useFocusTrap, useGalleryLightbox, useIsomorphicLayoutEffect, useLockScroll, useStableId, useToast };
export type { AccordionContentProps, AccordionItemProps, AccordionRootProps, AccordionTriggerProps, AlertProps, AlertVariant, BlockVariant, BlogCardProps, BlogMediaProps, BlogMetaProps, BlogSlotProps, BlogTitleProps, BreadcrumbItemProps, BreadcrumbLinkProps, BreadcrumbPageProps, BreadcrumbRootProps, BreadcrumbSeparatorProps, CTACta, CTASectionActionsProps, CTASectionProps, CTASectionVariant, CarouselImageProps, CarouselProps, CarouselSlideProps, CheckboxProps, CheckoutFieldProps, CheckoutFormProps, CheckoutFormVariant, CheckoutSectionProps, CheckoutSummaryProps, CodeProps, CommandGroup, CommandItem, CommandPaletteGroupProps, CommandPaletteInputProps, CommandPaletteItemProps, CommandPaletteProps, CommandPaletteVariant, ContactDetails, ContactDetailsPanelProps, ContactFieldProps, ContactFormProps, ContactFormVariant, ContactHeaderProps, CreateComponentOptions, DashboardShellProps, DashboardShellVariant, DialogCloseProps, DialogContentProps, DialogDescriptionProps, DialogFooterProps, DialogHeaderProps, DialogOverlayProps, DialogRootProps, DialogTitleProps, DrawerCloseProps, DrawerContentProps, DrawerDescriptionProps, DrawerFooterProps, DrawerHeaderProps, DrawerOverlayProps, DrawerRootProps, DrawerTitleProps, DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuRootProps, DropdownMenuTriggerProps, EmptyStateProps, EmptyStateVariant, EyebrowProps, FAQItem, FAQItemsProps, FAQProps, FAQVariant, Feature, FeatureGridItemsProps, FeatureGridProps, FeatureGridVariant, FeatureItemProps, FooterColumn, FooterColumnProps, FooterLink, FooterProps, FooterVariant, GalleryImageProps, GalleryLightboxProps, GridProduct, HeroActionsProps, HeroCta, HeroMediaProps, HeroProps, HeroSlotProps, HeroVariant, IconButtonIntent, IconButtonProps, IconButtonSize, IconName, IconProps, InferVariantProps, InputProps, KbdProps, LineItem, NavLink, NavbarAvatarProps, NavbarLinksProps, NavbarProps, NavbarVariant, PaginationProps, PolymorphicComponent, PopoverContentProps, PopoverRootProps, PopoverTriggerProps, PricingActionProps, PricingCardProps, PricingFeature, PricingFeaturesProps, PricingHeaderProps, PricingPriceProps, PricingSlotProps, PricingTableProps, PricingTableTiersProps, PricingTableVariant, PricingTier, ProductActionProps, ProductCardProps, ProductGridItemProps, ProductGridProps, ProductGridVariant, ProductMediaProps, ProductPriceProps, ProductRatingProps, ProductSlotProps, ProfileActionProps, ProfileAvatarProps, ProfileCardProps, ProfileSlotProps, ProfileSocialsProps, ProgressProps, ProgressSize, ProgressVariant, RadioProps, SelectProps, SettingsFieldProps, SettingsFormProps, SettingsFormVariant, SettingsGroupProps, SettingsSaveBarProps, SidebarGroup, SidebarGroupProps, SidebarItem, SidebarItemProps, SidebarProps, SidebarVariant, SignInFieldProps, SignInHeaderProps, SignInProps, SignInSocialProps, SignInVariant, SignUpFieldProps, SignUpHeaderProps, SignUpProps, SignUpSocialProps, SignUpSocialProvider, SignUpVariant, SkeletonProps, SkeletonShape, SlotProps, SocialLink, SocialPlatform, SocialProvider, StatCardProps, StatDeltaProps, StatProps, StatSlotProps, TVOptions, TabListProps, TabPanelProps, TabPanelsProps, TabProps, TableCellProps, TableHeadProps, TableRootProps, TableRowProps, TabsRootProps, Testimonial, TestimonialAuthorProps, TestimonialCardProps, TestimonialItemProps, TestimonialRatingProps, TestimonialSlotProps, TestimonialsItemsProps, TestimonialsProps, TestimonialsVariant, TextareaProps, ToastProviderProps, ToggleProps, ToggleRowProps, TooltipContentProps, TooltipRootProps, TooltipTriggerProps, VariantConfig };
