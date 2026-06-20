import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useEffect, useRef } from 'react';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';
import { cx } from '../core/cx';
/**
 * Textarea component with label, description, error states, auto-resize, and character counter.
 * Fully accessible with proper ARIA attributes.
 */
export const Textarea = forwardRef(function Textarea({ label, description, error, invalid, autoSize, showCounter, disabled, className, tw, id: providedId, maxLength, value, defaultValue, onChange, ...props }, ref) {
    const generatedId = useStableId('textarea');
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const internalRef = useRef(null);
    const [charCount, setCharCount] = useState(0);
    const isInvalid = invalid || !!error;
    // Handle auto-resize
    useEffect(() => {
        if (!autoSize)
            return;
        const textarea = internalRef.current;
        if (!textarea)
            return;
        const adjustHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        adjustHeight();
    }, [value, autoSize]);
    // Track character count
    useEffect(() => {
        if (!showCounter)
            return;
        const currentValue = value ?? defaultValue ?? '';
        setCharCount(String(currentValue).length);
    }, [value, defaultValue, showCounter]);
    const handleChange = (e) => {
        if (showCounter) {
            setCharCount(e.target.value.length);
        }
        onChange?.(e);
    };
    const textareaClasses = mergeTw('w-full rounded-md border px-3 py-2 font-medium transition-colors', 'placeholder:text-gray-400', 'focus:outline-none focus:ring-2 focus:ring-offset-2', 'resize-none', isInvalid
        ? 'border-danger-600 focus:ring-danger-600 focus:border-danger-600'
        : 'border-gray-300 focus:ring-brand-600 focus:border-brand-600', disabled && 'bg-gray-50 cursor-not-allowed opacity-60', className, tw);
    const handleRef = (node) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1", children: label })), description && !error && (_jsx("p", { id: descriptionId, className: "text-sm text-gray-600 mb-2", children: description })), _jsx("textarea", { ref: handleRef, id: id, disabled: disabled, maxLength: maxLength, value: value, defaultValue: defaultValue, onChange: handleChange, "aria-invalid": isInvalid || undefined, "aria-describedby": cx(descriptionId, errorId), className: textareaClasses, ...props }), error && (_jsx("p", { id: errorId, className: "mt-1 text-sm text-danger-600", role: "alert", children: error })), showCounter && maxLength && (_jsxs("p", { className: "mt-1 text-sm text-gray-600 text-right", children: [charCount, " / ", maxLength] }))] }));
});
