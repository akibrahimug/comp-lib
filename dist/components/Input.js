import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
import { cx } from '../core/cx';
/**
 * Input component with label, description, error states, and prefix/suffix support.
 * Fully accessible with proper ARIA attributes.
 */
export const Input = forwardRef(function Input({ label, description, error, prefix, suffix, invalid, size = 'md', disabled, className, tw, id: providedId, ...props }, ref) {
    const generatedId = useStableId('input');
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const isInvalid = invalid || !!error;
    const sizeClasses = {
        sm: 'h-8 text-sm px-3',
        md: 'h-10 text-sm px-3',
        lg: 'h-11 text-base px-4',
    };
    const inputClasses = mergeTw('w-full rounded-md border font-medium transition-colors', 'placeholder:text-gray-400', 'focus:outline-none focus:ring-2 focus:ring-offset-2', sizeClasses[size], isInvalid
        ? 'border-danger-600 focus:ring-danger-600 focus:border-danger-600'
        : 'border-gray-300 focus:ring-brand-600 focus:border-brand-600', disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : '', prefix ? 'pl-10' : '', suffix ? 'pr-10' : '', className, tw);
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1", children: label })), description && !error && (_jsx("p", { id: descriptionId, className: "text-sm text-gray-600 mb-2", children: description })), _jsxs("div", { className: "relative", children: [prefix && (_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500", children: prefix })), _jsx("input", { ref: ref, id: id, disabled: disabled, "aria-invalid": isInvalid || undefined, "aria-describedby": cx(descriptionId, errorId), className: inputClasses, ...props }), suffix && (_jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500", children: suffix }))] }), error && (_jsx("p", { id: errorId, className: "mt-1 text-sm text-danger-600", role: "alert", children: error }))] }));
});
