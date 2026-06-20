import React, { type ReactNode, type HTMLAttributes } from 'react';
export interface TabsRootProps {
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
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /** Value for this tab */
    value: string;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
    /** Additional className */
    className?: string;
    /** Additional Tailwind classes */
    tw?: string;
}
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
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
export declare const Tabs: {
    Root: React.ForwardRefExoticComponent<TabsRootProps & React.RefAttributes<HTMLDivElement>>;
    TabList: React.ForwardRefExoticComponent<TabListProps & React.RefAttributes<HTMLDivElement>>;
    Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
    TabPanels: React.ForwardRefExoticComponent<TabPanelsProps & React.RefAttributes<HTMLDivElement>>;
    TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
};
