import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef, useState } from 'react';
import { mergeTw } from '../core/mergeTw';
/**
 * A self-contained dark code block with an optional filename header and a
 * copy-to-clipboard button. Looks consistent on any background/theme.
 *
 * @example
 * <Code filename="App.tsx" lang="tsx" code={`<Button>Click</Button>`} />
 */
export const Code = forwardRef(function Code({ code, filename, lang, copyable = true, className, tw, ...props }, ref) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard?.writeText(code).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };
    return (_jsxs("div", { ref: ref, className: mergeTw('overflow-hidden rounded-xl border border-white/10 bg-[#0c0e14] shadow-lg', className, tw), ...props, children: [(filename || lang || copyable) && (_jsxs("div", { className: "flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#ff5f57]" }), _jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#febc2e]" }), _jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#28c840]" })] }), filename && _jsx("span", { className: "font-mono text-xs text-gray-400", children: filename }), _jsxs("div", { className: "ml-auto flex items-center gap-3", children: [lang && _jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-gray-500", children: lang }), copyable && (_jsx("button", { type: "button", onClick: copy, className: "inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-gray-300 transition hover:bg-white/10 hover:text-white", "aria-label": "Copy code", children: copied ? (_jsxs(_Fragment, { children: [_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Copied"] })) : (_jsxs(_Fragment, { children: [_jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M9 9h10v12H9zM5 15H3V3h12v2", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Copy"] })) }))] })] })), _jsx("pre", { className: "scrollbar-luxe overflow-x-auto p-4 text-[13px] leading-relaxed", children: _jsx("code", { className: "font-mono text-gray-200", children: code }) })] }));
});
