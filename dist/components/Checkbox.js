import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useEffect } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
/**
 * Checkbox component with label, description, and indeterminate state support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
export const Checkbox = forwardRef(function Checkbox({ label, description, indeterminate, disabled, className, tw, id: providedId, ...props }, ref) {
    const generatedId = useStableId('checkbox');
    const id = providedId || generatedId;
    const internalRef = useRef(null);
    // Handle indeterminate state
    useEffect(() => {
        if (internalRef.current) {
            internalRef.current.indeterminate = !!indeterminate;
        }
    }, [indeterminate]);
    const handleRef = (node) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    const checkboxClasses = mergeTw('h-4 w-4 rounded border-gray-300 text-brand-600', 'focus:ring-2 focus:ring-brand-600 focus:ring-offset-2', 'transition-colors', disabled && 'cursor-not-allowed opacity-60', 'cursor-pointer');
    return (_jsxs("div", { className: mergeTw('flex items-start gap-3', className, tw), children: [_jsx("input", { ref: handleRef, type: "checkbox", id: id, disabled: disabled, className: checkboxClasses, ...props }), (label || description) && (_jsxs("div", { className: "flex flex-col", children: [label && (_jsx("label", { htmlFor: id, className: mergeTw('text-sm font-medium text-gray-900', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'), children: label })), description && (_jsx("p", { className: "text-sm text-gray-600 mt-0.5", children: description }))] }))] }));
});
