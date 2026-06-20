import React, { ElementType, PropsWithChildren, ComponentPropsWithoutRef, useEffect, RefObject, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, AnchorHTMLAttributes, SVGProps, ButtonHTMLAttributes } from 'react';
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
}) => React.ReactElement | null;
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
} & Record<"Footer" | "Header" | "Title" | "Description" | "Content", any>;

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
    Root: React.ForwardRefExoticComponent<AccordionRootProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
    Trigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;
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
    Root: React.ForwardRefExoticComponent<TableRootProps & React.RefAttributes<HTMLTableElement>>;
    Header: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableSectionElement>>;
    Body: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableSectionElement>>;
    Footer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableSectionElement>>;
    Row: React.ForwardRefExoticComponent<TableRowProps & React.RefAttributes<HTMLTableRowElement>>;
    Head: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
    Cell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
    Caption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLTableCaptionElement>>;
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
    Root: React.ForwardRefExoticComponent<BreadcrumbRootProps & React.RefAttributes<HTMLElement>>;
    Item: React.ForwardRefExoticComponent<BreadcrumbItemProps & React.RefAttributes<HTMLLIElement>>;
    Link: React.ForwardRefExoticComponent<BreadcrumbLinkProps & React.RefAttributes<HTMLAnchorElement>>;
    Page: React.ForwardRefExoticComponent<BreadcrumbPageProps & React.RefAttributes<HTMLSpanElement>>;
    Separator: React.ForwardRefExoticComponent<BreadcrumbSeparatorProps & React.RefAttributes<HTMLLIElement>>;
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
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;

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
    Trigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
    Close: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLButtonElement> & {
        tw?: string;
    } & React.RefAttributes<HTMLButtonElement>>;
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
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

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
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

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
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;

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
declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

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
declare const Eyebrow: React.ForwardRefExoticComponent<EyebrowProps & React.RefAttributes<HTMLSpanElement>>;

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
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;

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
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;

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
declare const Stat: React.ForwardRefExoticComponent<StatProps & React.RefAttributes<HTMLDivElement>>;

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
declare const Code: React.ForwardRefExoticComponent<CodeProps & React.RefAttributes<HTMLDivElement>>;

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

export { Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Carousel, CarouselImage, CarouselSlide, Checkbox, Code, Dialog, Drawer, DropdownMenu, Eyebrow, Gallery, GalleryImage, GalleryLightbox, Icon, IconButton, Input, Kbd, LoadingOverlay, Dialog as Modal, Pagination, Popover, Progress, Radio, Select, Skeleton, Spinner, Stat, Table, Tabs, Textarea, ToastProvider, Toggle, Tooltip, createComponent, createSlots, cx, icons, mergeTw, tv, useCarousel, useFocusReturn, useFocusTrap, useGalleryLightbox, useIsomorphicLayoutEffect, useLockScroll, useStableId, useToast };
export type { AccordionContentProps, AccordionItemProps, AccordionRootProps, AccordionTriggerProps, AlertProps, AlertVariant, BreadcrumbItemProps, BreadcrumbLinkProps, BreadcrumbPageProps, BreadcrumbRootProps, BreadcrumbSeparatorProps, CarouselImageProps, CarouselProps, CarouselSlideProps, CheckboxProps, CodeProps, CreateComponentOptions, DialogCloseProps, DialogContentProps, DialogDescriptionProps, DialogFooterProps, DialogHeaderProps, DialogOverlayProps, DialogRootProps, DialogTitleProps, DrawerCloseProps, DrawerContentProps, DrawerDescriptionProps, DrawerFooterProps, DrawerHeaderProps, DrawerOverlayProps, DrawerRootProps, DrawerTitleProps, DropdownMenuContentProps, DropdownMenuItemProps, DropdownMenuRootProps, DropdownMenuTriggerProps, EyebrowProps, GalleryImageProps, GalleryLightboxProps, IconButtonIntent, IconButtonProps, IconButtonSize, IconName, IconProps, InferVariantProps, InputProps, KbdProps, PaginationProps, PolymorphicComponent, PopoverContentProps, PopoverRootProps, PopoverTriggerProps, ProgressProps, ProgressSize, ProgressVariant, RadioProps, SelectProps, SkeletonProps, SkeletonShape, StatProps, TVOptions, TabListProps, TabPanelProps, TabPanelsProps, TabProps, TableCellProps, TableHeadProps, TableRootProps, TableRowProps, TabsRootProps, TextareaProps, ToastProviderProps, ToggleProps, TooltipContentProps, TooltipRootProps, TooltipTriggerProps, VariantConfig };
