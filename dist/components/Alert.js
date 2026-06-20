import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
const variantStyles = {
    info: { wrap: 'bg-info-50 border-info-200 text-info-800', icon: 'text-info-600', title: 'text-info-900' },
    success: { wrap: 'bg-success-50 border-success-200 text-success-800', icon: 'text-success-600', title: 'text-success-900' },
    warning: { wrap: 'bg-accent-50 border-accent-200 text-accent-800', icon: 'text-accent-700', title: 'text-accent-900' },
    danger: { wrap: 'bg-danger-50 border-danger-200 text-danger-800', icon: 'text-danger-600', title: 'text-danger-900' },
    neutral: { wrap: 'bg-gray-50 border-gray-200 text-gray-700', icon: 'text-gray-500', title: 'text-gray-900' },
};
const defaultIcons = {
    info: (_jsx("path", { d: "M12 16v-4M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    success: (_jsx("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    warning: (_jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    danger: (_jsx("path", { d: "M12 8v4M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    neutral: (_jsx("path", { d: "M12 16v-4M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
};
/**
 * Inline Alert / banner for contextual feedback. Five intents, optional title,
 * custom or default icon, and an optional dismiss affordance.
 *
 * @example
 * <Alert variant="success" title="Saved" onClose={() => {}}>
 *   Your changes were saved.
 * </Alert>
 */
export const Alert = forwardRef(function Alert({ variant = 'info', title, icon, onClose, className, tw, children, ...props }, ref) {
    const styles = variantStyles[variant];
    const showIcon = icon !== false;
    return (_jsxs("div", { ref: ref, role: "alert", className: mergeTw('flex items-start gap-3 rounded-xl border p-4 text-sm', styles.wrap, className, tw), ...props, children: [showIcon && (_jsx("span", { className: mergeTw('mt-0.5 shrink-0', styles.icon), children: icon ?? (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: defaultIcons[variant] })) })), _jsxs("div", { className: "min-w-0 flex-1", children: [title && _jsx("div", { className: mergeTw('font-semibold', styles.title), children: title }), children && _jsx("div", { className: mergeTw(!!title && 'mt-0.5', 'leading-relaxed'), children: children })] }), onClose && (_jsx("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", className: mergeTw('-mr-1 -mt-1 shrink-0 rounded-md p-1 opacity-70 transition hover:opacity-100', styles.icon), children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }) }))] }));
});
