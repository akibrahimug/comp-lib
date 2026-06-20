import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, forwardRef, } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
const AccordionContext = createContext(null);
function useAccordionContext() {
    const ctx = useContext(AccordionContext);
    if (!ctx)
        throw new Error('Accordion components must be used within Accordion.Root');
    return ctx;
}
const ItemContext = createContext(null);
function useItemContext() {
    const ctx = useContext(ItemContext);
    if (!ctx)
        throw new Error('Accordion.Trigger / Content must be used within Accordion.Item');
    return ctx;
}
const AccordionRoot = forwardRef(function AccordionRoot({ type = 'single', value, defaultValue = [], onValueChange, collapsible = true, className, tw, children, ...props }, ref) {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;
    const open = isControlled ? value : internal;
    const setOpen = (next) => {
        if (!isControlled)
            setInternal(next);
        onValueChange?.(next);
    };
    const toggle = (val) => {
        const isOpen = open.includes(val);
        if (type === 'single') {
            setOpen(isOpen ? (collapsible ? [] : [val]) : [val]);
        }
        else {
            setOpen(isOpen ? open.filter((v) => v !== val) : [...open, val]);
        }
    };
    return (_jsx(AccordionContext.Provider, { value: { isOpen: (v) => open.includes(v), toggle, type }, children: _jsx("div", { ref: ref, className: mergeTw('w-full divide-y divide-gray-200', className, tw), ...props, children: children }) }));
});
const AccordionItem = forwardRef(function AccordionItem({ value, disabled, className, tw, children, ...props }, ref) {
    const { isOpen } = useAccordionContext();
    const id = useStableId('accordion');
    const open = isOpen(value);
    return (_jsx(ItemContext.Provider, { value: { value, open, disabled, triggerId: `${id}-trigger`, panelId: `${id}-panel` }, children: _jsx("div", { ref: ref, "data-state": open ? 'open' : 'closed', className: mergeTw(className, tw), ...props, children: children }) }));
});
const AccordionTrigger = forwardRef(function AccordionTrigger({ className, tw, children, ...props }, ref) {
    const { toggle } = useAccordionContext();
    const { value, open, disabled, triggerId, panelId } = useItemContext();
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled)
                toggle(value);
        }
    };
    return (_jsxs("button", { ref: ref, type: "button", id: triggerId, "aria-expanded": open, "aria-controls": panelId, disabled: disabled, onClick: () => !disabled && toggle(value), onKeyDown: handleKeyDown, className: mergeTw('flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-gray-900', 'transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', disabled && 'cursor-not-allowed opacity-50', className, tw), ...props, children: [_jsx("span", { className: "flex-1", children: children }), _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: mergeTw('shrink-0 text-gray-400 transition-transform duration-200', open && 'rotate-180'), children: _jsx("path", { d: "M6 9l6 6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] }));
});
const AccordionContent = forwardRef(function AccordionContent({ className, tw, children, ...props }, ref) {
    const { open, triggerId, panelId } = useItemContext();
    return (_jsx("div", { ref: ref, id: panelId, role: "region", "aria-labelledby": triggerId, hidden: !open, className: mergeTw('overflow-hidden text-sm text-gray-600', open && 'animate-fade-in', className, tw), ...props, children: _jsx("div", { className: "pb-4", children: children }) }));
});
/* --------------------------------- Export --------------------------------- */
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
export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
};
