import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
const barColors = {
    brand: 'bg-brand-600',
    gold: 'bg-gold-500',
    success: 'bg-success-600',
    danger: 'bg-danger-600',
    info: 'bg-info-600',
};
const trackHeights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
};
/**
 * Progress bar. Pass a numeric `value` for determinate, or omit it (or pass
 * `null`) for an animated indeterminate state.
 *
 * @example
 * <Progress value={64} variant="gold" showValue />
 */
export const Progress = forwardRef(function Progress({ value = null, max = 100, variant = 'brand', size = 'md', showValue, label, className, tw, ...props }, ref) {
    const indeterminate = value === null || value === undefined;
    const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
    return (_jsxs("div", { ref: ref, className: mergeTw('flex w-full items-center gap-3', className, tw), ...props, children: [_jsx("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": indeterminate ? undefined : value ?? undefined, "aria-label": label, className: mergeTw('relative w-full overflow-hidden rounded-full bg-gray-200', trackHeights[size]), children: indeterminate ? (_jsx("div", { className: mergeTw('absolute inset-y-0 left-0 w-1/3 rounded-full', barColors[variant]), style: { animation: 'slide-in-from-left 1.2s ease-in-out infinite alternate' } })) : (_jsx("div", { className: mergeTw('h-full rounded-full transition-[width] duration-500 ease-out', barColors[variant]), style: { width: `${pct}%` } })) }), showValue && !indeterminate && (_jsxs("span", { className: "w-10 shrink-0 text-right text-xs font-medium tabular-nums text-gray-600", children: [Math.round(pct), "%"] }))] }));
});
