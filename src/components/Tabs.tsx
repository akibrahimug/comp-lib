import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  tabsId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs.Root');
  }
  return context;
}

/* ---------------------------------- Root ---------------------------------- */

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

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
  { value: controlledValue, defaultValue, onValueChange, orientation = 'horizontal', children, className, tw },
  ref
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const tabsId = useStableId('tabs');

  const onChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onChange, orientation, tabsId }}>
      <div ref={ref} className={mergeTw('w-full', className, tw)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

/* --------------------------------- TabList -------------------------------- */

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { children, className, tw, ...props },
  ref
) {
  const { orientation } = useTabsContext();
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') || []
    );
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') nextIndex = currentIndex - 1;
      if (e.key === 'ArrowRight') nextIndex = currentIndex + 1;
    } else {
      if (e.key === 'ArrowUp') nextIndex = currentIndex - 1;
      if (e.key === 'ArrowDown') nextIndex = currentIndex + 1;
    }

    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      if (nextIndex < 0) nextIndex = tabs.length - 1;
      if (nextIndex >= tabs.length) nextIndex = 0;
      tabs[nextIndex]?.focus();
      tabs[nextIndex]?.click();
    }
  };

  const handleRef = (node: HTMLDivElement | null) => {
    listRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <div
      ref={handleRef}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={mergeTw(
        'flex border-b border-gray-200',
        orientation === 'vertical' && 'flex-col border-b-0 border-r',
        className,
        tw
      )}
      {...props}
    >
      {children}
    </div>
  );
});

/* ----------------------------------- Tab ---------------------------------- */

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

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value: tabValue, disabled, children, className, tw, ...props },
  ref
) {
  const { value, onChange, orientation, tabsId } = useTabsContext();
  const isSelected = value === tabValue;

  const handleClick = () => {
    if (!disabled) {
      onChange(tabValue);
    }
  };

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isSelected}
      aria-controls={`${tabsId}-panel-${tabValue}`}
      id={`${tabsId}-tab-${tabValue}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={mergeTw(
        'px-4 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2',
        isSelected
          ? 'border-b-2 border-brand-600 text-brand-600'
          : 'text-gray-600 hover:text-gray-900',
        disabled && 'cursor-not-allowed opacity-50',
        orientation === 'vertical' && isSelected && 'border-b-0 border-r-2',
        className,
        tw
      )}
      {...props}
    >
      {children}
    </button>
  );
});

/* ------------------------------- TabPanels -------------------------------- */

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels(
  { children, className, tw, ...props },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('mt-4', className, tw)} {...props}>
      {children}
    </div>
  );
});

/* -------------------------------- TabPanel -------------------------------- */

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Value for this panel */
  value: string;
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value: panelValue, children, className, tw, ...props },
  ref
) {
  const { value, tabsId } = useTabsContext();
  const isSelected = value === panelValue;

  if (!isSelected) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${tabsId}-panel-${panelValue}`}
      aria-labelledby={`${tabsId}-tab-${panelValue}`}
      tabIndex={0}
      className={mergeTw('focus:outline-none', className, tw)}
      {...props}
    >
      {children}
    </div>
  );
});

/* --------------------------------- Export --------------------------------- */

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
export const Tabs = {
  Root: TabsRoot,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
};
