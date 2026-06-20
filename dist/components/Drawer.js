import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useRef, useEffect, forwardRef, } from 'react';
import { createPortal } from 'react-dom';
import { useLockScroll } from '../hooks/useLockScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useFocusReturn } from '../hooks/useFocusReturn';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
const DrawerContext = createContext(null);
function useDrawerContext() {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('Drawer compound components must be used within Drawer.Root');
    }
    return context;
}
const DrawerRoot = ({ open: controlledOpen, defaultOpen, onOpenChange, position = 'right', children, }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const titleId = useStableId('drawer-title');
    const descriptionId = useStableId('drawer-description');
    const handleOpenChange = (newOpen) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };
    return (_jsx(DrawerContext.Provider, { value: { open, onOpenChange: handleOpenChange, titleId, descriptionId, position }, children: children }));
};
const DrawerOverlay = forwardRef(function DrawerOverlay({ className, tw, ...props }, ref) {
    const { open } = useDrawerContext();
    if (!open)
        return null;
    return createPortal(_jsx("div", { ref: ref, className: mergeTw('fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm', 'animate-fade-in', className, tw), ...props }), document.body);
});
const DrawerContent = forwardRef(function DrawerContent({ children, className, tw, ...props }, ref) {
    const { open, onOpenChange, titleId, descriptionId, position } = useDrawerContext();
    const contentRef = useRef(null);
    useLockScroll(open);
    useFocusTrap(contentRef, open);
    useFocusReturn();
    useEffect(() => {
        if (!open)
            return;
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onOpenChange(false);
        }
    };
    const handleRef = (node) => {
        contentRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    if (!open)
        return null;
    const positionClasses = {
        left: 'left-0 top-0 h-full w-full max-w-md animate-slide-in-from-left',
        right: 'right-0 top-0 h-full w-full max-w-md animate-slide-in-from-right',
        top: 'top-0 left-0 w-full h-full max-h-96 animate-slide-in-from-top',
        bottom: 'bottom-0 left-0 w-full h-full max-h-96 animate-slide-in-from-bottom',
    };
    return createPortal(_jsx("div", { className: "fixed inset-0 z-50", onClick: handleBackdropClick, children: _jsx("div", { ref: handleRef, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descriptionId, className: mergeTw('fixed bg-white p-6 shadow-card', positionClasses[position], className, tw), ...props, children: children }) }), document.body);
});
const DrawerHeader = forwardRef(function DrawerHeader({ children, className, tw, ...props }, ref) {
    return (_jsx("div", { ref: ref, className: mergeTw('mb-4', className, tw), ...props, children: children }));
});
const DrawerTitle = forwardRef(function DrawerTitle({ children, className, tw, ...props }, ref) {
    const { titleId } = useDrawerContext();
    return (_jsx("h2", { ref: ref, id: titleId, className: mergeTw('text-lg font-semibold text-gray-900', className, tw), ...props, children: children }));
});
const DrawerDescription = forwardRef(function DrawerDescription({ children, className, tw, ...props }, ref) {
    const { descriptionId } = useDrawerContext();
    return (_jsx("p", { ref: ref, id: descriptionId, className: mergeTw('text-sm text-gray-600 mt-1', className, tw), ...props, children: children }));
});
const DrawerFooter = forwardRef(function DrawerFooter({ children, className, tw, ...props }, ref) {
    return (_jsx("div", { ref: ref, className: mergeTw('mt-6 flex items-center justify-end gap-3', className, tw), ...props, children: children }));
});
const DrawerClose = forwardRef(function DrawerClose({ children, className, tw, onClick, ...props }, ref) {
    const { onOpenChange } = useDrawerContext();
    const handleClick = (e) => {
        onOpenChange(false);
        onClick?.(e);
    };
    return (_jsx("button", { ref: ref, type: "button", onClick: handleClick, className: mergeTw('absolute right-4 top-4 rounded-md p-1 text-gray-400', 'hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-600', className, tw), ...props, children: children || (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 15 15", fill: "none", children: _jsx("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) })) }));
});
/* --------------------------------- Export --------------------------------- */
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
export const Drawer = {
    Root: DrawerRoot,
    Overlay: DrawerOverlay,
    Content: DrawerContent,
    Header: DrawerHeader,
    Title: DrawerTitle,
    Description: DrawerDescription,
    Footer: DrawerFooter,
    Close: DrawerClose,
};
