import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useRef, useEffect, useCallback, forwardRef, } from 'react';
import { createPortal } from 'react-dom';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
const MenuContext = createContext(null);
function useMenu() {
    const ctx = useContext(MenuContext);
    if (!ctx)
        throw new Error('DropdownMenu components must be used within DropdownMenu.Root');
    return ctx;
}
const Root = ({ children, open: controlled, defaultOpen, onOpenChange, align = 'start', side = 'bottom' }) => {
    const [internal, setInternal] = useState(defaultOpen || false);
    const isControlled = controlled !== undefined;
    const open = isControlled ? controlled : internal;
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const menuId = useStableId('menu');
    const setOpen = useCallback((o) => {
        if (!isControlled)
            setInternal(o);
        onOpenChange?.(o);
    }, [isControlled, onOpenChange]);
    return (_jsx(MenuContext.Provider, { value: { open, setOpen, triggerRef, contentRef, menuId, align, side }, children: _jsx("div", { className: "relative inline-block text-left", children: children }) }));
};
const Trigger = forwardRef(function Trigger({ className, tw, children, onClick, ...props }, ref) {
    const { open, setOpen, triggerRef, menuId } = useMenu();
    const handleRef = (node) => {
        triggerRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    return (_jsx("button", { ref: handleRef, type: "button", "aria-haspopup": "menu", "aria-expanded": open, "aria-controls": open ? menuId : undefined, onClick: (e) => {
            setOpen(!open);
            onClick?.(e);
        }, className: mergeTw(className, tw), ...props, children: children }));
});
const Content = forwardRef(function Content({ sideOffset = 6, className, tw, children, ...props }, ref) {
    const { open, setOpen, triggerRef, contentRef, menuId, align, side } = useMenu();
    const [style, setStyle] = useState({ position: 'fixed', top: 0, left: 0, opacity: 0 });
    const handleRef = (node) => {
        contentRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    useEffect(() => {
        if (!open)
            return;
        const place = () => {
            const t = triggerRef.current?.getBoundingClientRect();
            const c = contentRef.current?.getBoundingClientRect();
            if (!t || !c)
                return;
            let top = side === 'bottom' ? t.bottom + sideOffset : t.top - c.height - sideOffset;
            let left = align === 'start' ? t.left : align === 'end' ? t.right - c.width : t.left + t.width / 2 - c.width / 2;
            left = Math.max(8, Math.min(left, window.innerWidth - c.width - 8));
            top = Math.max(8, Math.min(top, window.innerHeight - c.height - 8));
            setStyle({ position: 'fixed', top, left, opacity: 1 });
        };
        place();
        window.addEventListener('scroll', place, true);
        window.addEventListener('resize', place);
        return () => {
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('resize', place);
        };
    }, [open, align, side, sideOffset, triggerRef, contentRef]);
    // Focus first item on open; close on Escape / outside click.
    useEffect(() => {
        if (!open)
            return;
        const items = () => Array.from(contentRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') || []);
        const first = items()[0];
        first?.focus();
        const onKey = (e) => {
            const list = items();
            const idx = list.indexOf(document.activeElement);
            if (e.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                list[(idx + 1) % list.length]?.focus();
            }
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                list[(idx - 1 + list.length) % list.length]?.focus();
            }
            else if (e.key === 'Home') {
                e.preventDefault();
                list[0]?.focus();
            }
            else if (e.key === 'End') {
                e.preventDefault();
                list[list.length - 1]?.focus();
            }
        };
        const onClick = (e) => {
            const target = e.target;
            if (!contentRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [open, setOpen, contentRef, triggerRef]);
    if (!open)
        return null;
    return createPortal(_jsx("div", { ref: handleRef, id: menuId, role: "menu", style: style, className: mergeTw('z-50 min-w-[12rem] origin-top rounded-xl border border-gray-200 bg-white p-1.5 shadow-card', 'animate-zoom-in-95', className, tw), ...props, children: children }), document.body);
});
const Item = forwardRef(function Item({ disabled, destructive, icon, className, tw, children, onClick, ...props }, ref) {
    const { setOpen } = useMenu();
    return (_jsxs("button", { ref: ref, type: "button", role: "menuitem", "aria-disabled": disabled || undefined, disabled: disabled, onClick: (e) => {
            if (disabled)
                return;
            onClick?.(e);
            setOpen(false);
        }, className: mergeTw('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', destructive
            ? 'text-danger-600 hover:bg-danger-50 focus:bg-danger-50'
            : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100', disabled && 'pointer-events-none opacity-50', className, tw), ...props, children: [icon && _jsx("span", { className: "shrink-0 [&>svg]:h-4 [&>svg]:w-4", children: icon }), _jsx("span", { className: "flex-1", children: children })] }));
});
/* ------------------------------ Label / Sep ------------------------------- */
const Label = forwardRef(function Label({ className, tw, ...props }, ref) {
    return (_jsx("div", { ref: ref, className: mergeTw('px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400', className, tw), ...props }));
});
const Separator = forwardRef(function Separator({ className, tw, ...props }, ref) {
    return _jsx("div", { ref: ref, role: "separator", className: mergeTw('my-1.5 h-px bg-gray-100', className, tw), ...props });
});
/* --------------------------------- Export --------------------------------- */
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
export const DropdownMenu = {
    Root,
    Trigger,
    Content,
    Item,
    Label,
    Separator,
};
