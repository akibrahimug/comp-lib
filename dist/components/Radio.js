import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
/**
 * Radio button component with label and description support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
export const Radio = forwardRef(function Radio({ label, description, disabled, className, tw, id: providedId, ...props }, ref) {
    const generatedId = useStableId('radio');
    const id = providedId || generatedId;
    const radioClasses = mergeTw('h-4 w-4 border-gray-300 text-brand-600', 'focus:ring-2 focus:ring-brand-600 focus:ring-offset-2', 'transition-colors', disabled && 'cursor-not-allowed opacity-60', 'cursor-pointer');
    return (_jsxs("div", { className: mergeTw('flex items-start gap-3', className, tw), children: [_jsx("input", { ref: ref, type: "radio", id: id, disabled: disabled, className: radioClasses, ...props }), (label || description) && (_jsxs("div", { className: "flex flex-col", children: [label && (_jsx("label", { htmlFor: id, className: mergeTw('text-sm font-medium text-gray-900', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'), children: label })), description && (_jsx("p", { className: "text-sm text-gray-600 mt-0.5", children: description }))] }))] }));
});
