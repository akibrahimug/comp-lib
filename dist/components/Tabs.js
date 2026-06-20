import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useRef, forwardRef, } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
const TabsContext = createContext(null);
function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs compound components must be used within Tabs.Root');
    }
    return context;
}
const TabsRoot = forwardRef(function TabsRoot({ value: controlledValue, defaultValue, onValueChange, orientation = 'horizontal', children, className, tw }, ref) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const tabsId = useStableId('tabs');
    const onChange = (newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
    };
    return (_jsx(TabsContext.Provider, { value: { value, onChange, orientation, tabsId }, children: _jsx("div", { ref: ref, className: mergeTw('w-full', className, tw), children: children }) }));
});
const TabList = forwardRef(function TabList({ children, className, tw, ...props }, ref) {
    const { orientation } = useTabsContext();
    const listRef = useRef(null);
    const handleKeyDown = (e) => {
        const tabs = Array.from(listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || []);
        const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
        if (currentIndex === -1)
            return;
        let nextIndex = currentIndex;
        if (orientation === 'horizontal') {
            if (e.key === 'ArrowLeft')
                nextIndex = currentIndex - 1;
            if (e.key === 'ArrowRight')
                nextIndex = currentIndex + 1;
        }
        else {
            if (e.key === 'ArrowUp')
                nextIndex = currentIndex - 1;
            if (e.key === 'ArrowDown')
                nextIndex = currentIndex + 1;
        }
        if (e.key === 'Home')
            nextIndex = 0;
        if (e.key === 'End')
            nextIndex = tabs.length - 1;
        if (nextIndex !== currentIndex) {
            e.preventDefault();
            if (nextIndex < 0)
                nextIndex = tabs.length - 1;
            if (nextIndex >= tabs.length)
                nextIndex = 0;
            tabs[nextIndex]?.focus();
            tabs[nextIndex]?.click();
        }
    };
    const handleRef = (node) => {
        listRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    return (_jsx("div", { ref: handleRef, role: "tablist", "aria-orientation": orientation, onKeyDown: handleKeyDown, className: mergeTw('flex border-b border-gray-200', orientation === 'vertical' && 'flex-col border-b-0 border-r', className, tw), ...props, children: children }));
});
const Tab = forwardRef(function Tab({ value: tabValue, disabled, children, className, tw, ...props }, ref) {
    const { value, onChange, orientation, tabsId } = useTabsContext();
    const isSelected = value === tabValue;
    const handleClick = () => {
        if (!disabled) {
            onChange(tabValue);
        }
    };
    return (_jsx("button", { ref: ref, role: "tab", type: "button", "aria-selected": isSelected, "aria-controls": `${tabsId}-panel-${tabValue}`, id: `${tabsId}-tab-${tabValue}`, tabIndex: isSelected ? 0 : -1, disabled: disabled, onClick: handleClick, className: mergeTw('px-4 py-2 text-sm font-medium transition-colors', 'focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2', isSelected
            ? 'border-b-2 border-brand-600 text-brand-600'
            : 'text-gray-600 hover:text-gray-900', disabled && 'cursor-not-allowed opacity-50', orientation === 'vertical' && isSelected && 'border-b-0 border-r-2', className, tw), ...props, children: children }));
});
const TabPanels = forwardRef(function TabPanels({ children, className, tw, ...props }, ref) {
    return (_jsx("div", { ref: ref, className: mergeTw('mt-4', className, tw), ...props, children: children }));
});
const TabPanel = forwardRef(function TabPanel({ value: panelValue, children, className, tw, ...props }, ref) {
    const { value, tabsId } = useTabsContext();
    const isSelected = value === panelValue;
    if (!isSelected)
        return null;
    return (_jsx("div", { ref: ref, role: "tabpanel", id: `${tabsId}-panel-${panelValue}`, "aria-labelledby": `${tabsId}-tab-${panelValue}`, tabIndex: 0, className: mergeTw('focus:outline-none', className, tw), ...props, children: children }));
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
