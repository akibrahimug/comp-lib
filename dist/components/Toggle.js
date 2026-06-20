import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
/**
 * Toggle/Switch component with label and description support.
 * Implements ARIA switch pattern for accessibility.
 */
export const Toggle = forwardRef(function Toggle({ label, description, size = 'md', disabled, checked, className, tw, id: providedId, ...props }, ref) {
    const generatedId = useStableId('toggle');
    const id = providedId || generatedId;
    const sizeClasses = {
        sm: {
            track: 'h-5 w-9',
            thumb: 'h-4 w-4',
            translate: checked ? 'translate-x-4' : 'translate-x-0.5',
        },
        md: {
            track: 'h-6 w-11',
            thumb: 'h-5 w-5',
            translate: checked ? 'translate-x-5' : 'translate-x-0.5',
        },
    };
    const trackClasses = mergeTw('relative inline-flex items-center rounded-full transition-colors', 'focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2', sizeClasses[size].track, checked ? 'bg-brand-600' : 'bg-gray-300', disabled && 'cursor-not-allowed opacity-60', !disabled && 'cursor-pointer');
    const thumbClasses = mergeTw('inline-block rounded-full bg-white transition-transform', sizeClasses[size].thumb, sizeClasses[size].translate);
    return (_jsxs("div", { className: mergeTw('flex items-start gap-3', className, tw), children: [_jsxs("label", { htmlFor: id, className: trackClasses, children: [_jsx("input", { ref: ref, type: "checkbox", role: "switch", id: id, checked: checked, disabled: disabled, "aria-checked": checked, className: "sr-only", ...props }), _jsx("span", { className: thumbClasses, "aria-hidden": "true" })] }), (label || description) && (_jsxs("div", { className: "flex flex-col", children: [label && (_jsx("label", { htmlFor: id, className: mergeTw('text-sm font-medium text-gray-900', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'), children: label })), description && (_jsx("p", { className: "text-sm text-gray-600 mt-0.5", children: description }))] }))] }));
});
