import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeTw } from '../core/mergeTw';
/**
 * Stat / metric card — label, value and an optional trend delta + icon.
 *
 * @example
 * <Stat label="Revenue" value="$48,210" delta="+12.4%" trend="up"
 *       icon={<Icon name="wallet" />} hint="vs last month" />
 */
export const Stat = forwardRef(function Stat({ label, value, delta, trend, icon, hint, className, tw, ...props }, ref) {
    const up = trend !== 'down';
    return (_jsxs("div", { ref: ref, className: mergeTw('rounded-2xl border border-edge/12 bg-panel/80 p-5 shadow-luxe-sm backdrop-blur-xl', className, tw), ...props, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-fg-subtle", children: label }), icon && (_jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg border border-edge/10 bg-fg/[0.04] text-accent [&>svg]:h-4 [&>svg]:w-4", children: icon }))] }), _jsx("div", { className: "mt-4 text-3xl font-semibold tracking-tight text-fg", children: value }), (delta || hint) && (_jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs", children: [delta && (_jsxs("span", { className: mergeTw('inline-flex items-center gap-1 font-medium', up ? 'text-success-500' : 'text-danger-500'), children: [_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: up ? '-rotate-45' : 'rotate-45', children: _jsx("path", { d: "M5 12h14M13 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }) }), delta] })), hint && _jsx("span", { className: "text-fg-subtle", children: hint })] }))] }));
});
