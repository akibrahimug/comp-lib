import { twMerge } from 'tailwind-merge';
import React, { forwardRef, createContext, useContext, useLayoutEffect, useEffect, useId, useRef, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

function cx(...parts) {
    return parts.filter(Boolean).join(' ');
}

function mergeTw(...classes) {
    return twMerge(...classes.filter(Boolean).map(String));
}

function tv(opts) {
    const { base = "", variants = {}, defaultVariants = {}, compoundVariants = [], } = opts;
    return function getClassNames(variantProps) {
        const vp = { ...defaultVariants, ...(variantProps || {}) };
        const variantClasses = Object.entries(variants).map(([k, map]) => {
            const val = vp[k];
            return val != null ? map[val] ?? "" : "";
        });
        const compound = compoundVariants
            .filter((rule) => Object.entries(rule).every(([rk, rv]) => rk === "class" ? true : vp[rk] === rv))
            .map((r) => r.class);
        const { className, tw } = vp;
        return [base, ...variantClasses, ...compound, className, tw]
            .filter(Boolean)
            .join(" ");
    };
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=React,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

{
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
}

var jsxRuntimeExports = jsxRuntime.exports;

function createComponent(opts) {
    const { as, displayName } = opts;
    const getClass = tv(opts);
    const Comp = forwardRef(function Comp({ as: As = as || 'div', className, tw, children, ...rest }, ref) {
        const cls = mergeTw(getClass({ ...rest, className, tw }));
        const Element = As;
        return jsxRuntimeExports.jsx(Element, { ref: ref, className: cls, ...rest, children: children });
    });
    Comp.displayName = displayName || 'Component';
    return Comp;
}

const SlotsCtx = createContext({});
function createSlots(slots, opts) {
    const fns = Object.fromEntries(Object.entries(slots).map(([n, cfg]) => [n, tv(cfg)]));
    const Root = forwardRef(function Root({ as: As = opts?.as || 'div', className, tw, children, ...rest }, ref) {
        const cls = fns['root'] ? fns['root']({ className, tw, ...rest }) : mergeTw(className, tw);
        const ctxVal = Object.fromEntries(Object.entries(fns).map(([n, fn]) => [n, fn(rest)]));
        const Element = As;
        return jsxRuntimeExports.jsx(Element, { ref: ref, className: cls, ...rest, children: jsxRuntimeExports.jsx(SlotsCtx.Provider, { value: ctxVal, children: children }) });
    });
    const makeSlot = (slotName) => {
        const S = forwardRef(function Slot({ as: As = 'div', className, tw, children, ...rest }, ref) {
            const ctx = useContext(SlotsCtx);
            const baseCls = ctx[slotName] || '';
            const cls = mergeTw(baseCls, className, tw);
            const Element = As;
            return jsxRuntimeExports.jsx(Element, { ref: ref, className: cls, ...rest, children: children });
        });
        S.displayName = `Slot.${slotName}`;
        return S;
    };
    const out = { Root };
    Object.keys(slots).forEach((name) => {
        if (name !== 'root')
            out[name[0].toUpperCase() + name.slice(1)] = makeSlot(name);
    });
    return out;
}

/**
 * SSR-safe layout effect hook. Uses useLayoutEffect on the client and useEffect on the server.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Generates a stable, hydration-safe ID.
 * Uses React 18's useId hook internally.
 * @param prefix - Optional prefix for the ID
 */
function useStableId(prefix) {
    const id = useId();
    return prefix ? `${prefix}-${id}` : id;
}

/**
 * Locks body scroll when active. Useful for modals and drawers.
 * @param lock - Whether to lock scroll
 */
function useLockScroll(lock) {
    useIsomorphicLayoutEffect(() => {
        if (!lock || typeof document === 'undefined')
            return;
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        // Prevent layout shift by adding padding for scrollbar
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [lock]);
}

/**
 * Traps focus within a container element.
 * @param containerRef - Ref to the container element
 * @param active - Whether the focus trap is active
 */
function useFocusTrap(containerRef, active) {
    useEffect(() => {
        if (!active || !containerRef.current)
            return;
        const container = containerRef.current;
        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(',');
        const handleKeyDown = (e) => {
            if (e.key !== 'Tab')
                return;
            const focusable = Array.from(container.querySelectorAll(focusableSelector)).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
            if (focusable.length === 0) {
                e.preventDefault();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
            else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        container.addEventListener('keydown', handleKeyDown);
        return () => container.removeEventListener('keydown', handleKeyDown);
    }, [containerRef, active]);
}

/**
 * Returns focus to the previously focused element when unmounted.
 * Useful for dialogs and modals.
 */
function useFocusReturn() {
    const previousFocus = useRef(null);
    useEffect(() => {
        previousFocus.current = document.activeElement;
        return () => {
            if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
                previousFocus.current.focus();
            }
        };
    }, []);
}

/**
 * Button component with multiple intents, sizes, and states.
 * Supports polymorphic rendering via `as` prop and className extension via `tw` prop.
 */
const Button = createComponent({
    as: 'button',
    displayName: 'Button',
    base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
    variants: {
        intent: {
            primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-600',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
            danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-600',
            ghost: 'bg-transparent hover:bg-gray-100 text-gray-900'
        },
        size: {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-sm',
            lg: 'h-11 px-6 text-base'
        },
        loading: { true: 'cursor-wait', false: '' },
        fullWidth: { true: 'w-full', false: '' }
    },
    defaultVariants: { intent: 'primary', size: 'md' },
    compoundVariants: [{ intent: 'ghost', size: 'lg', class: 'rounded-lg' }]
});

/**
 * Input component with label, description, error states, and prefix/suffix support.
 * Fully accessible with proper ARIA attributes.
 */
const Input = forwardRef(function Input({ label, description, error, prefix, suffix, invalid, size = 'md', disabled, className, tw, id: providedId, ...props }, ref) {
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
    return (jsxRuntimeExports.jsxs("div", { className: "w-full", children: [label && (jsxRuntimeExports.jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1", children: label })), description && !error && (jsxRuntimeExports.jsx("p", { id: descriptionId, className: "text-sm text-gray-600 mb-2", children: description })), jsxRuntimeExports.jsxs("div", { className: "relative", children: [prefix && (jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500", children: prefix })), jsxRuntimeExports.jsx("input", { ref: ref, id: id, disabled: disabled, "aria-invalid": isInvalid || undefined, "aria-describedby": cx(descriptionId, errorId), className: inputClasses, ...props }), suffix && (jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500", children: suffix }))] }), error && (jsxRuntimeExports.jsx("p", { id: errorId, className: "mt-1 text-sm text-danger-600", role: "alert", children: error }))] }));
});

/**
 * Textarea component with label, description, error states, auto-resize, and character counter.
 * Fully accessible with proper ARIA attributes.
 */
const Textarea = forwardRef(function Textarea({ label, description, error, invalid, autoSize, showCounter, disabled, className, tw, id: providedId, maxLength, value, defaultValue, onChange, ...props }, ref) {
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
    return (jsxRuntimeExports.jsxs("div", { className: "w-full", children: [label && (jsxRuntimeExports.jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1", children: label })), description && !error && (jsxRuntimeExports.jsx("p", { id: descriptionId, className: "text-sm text-gray-600 mb-2", children: description })), jsxRuntimeExports.jsx("textarea", { ref: handleRef, id: id, disabled: disabled, maxLength: maxLength, value: value, defaultValue: defaultValue, onChange: handleChange, "aria-invalid": isInvalid || undefined, "aria-describedby": cx(descriptionId, errorId), className: textareaClasses, ...props }), error && (jsxRuntimeExports.jsx("p", { id: errorId, className: "mt-1 text-sm text-danger-600", role: "alert", children: error })), showCounter && maxLength && (jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-gray-600 text-right", children: [charCount, " / ", maxLength] }))] }));
});

/**
 * Select component with label, description, and error states.
 * Native select with custom styling for maximum compatibility and accessibility.
 */
const Select = forwardRef(function Select({ label, description, error, invalid, size = 'md', disabled, className, tw, id: providedId, children, ...props }, ref) {
    const generatedId = useStableId('select');
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const isInvalid = invalid || !!error;
    const sizeClasses = {
        sm: 'h-8 text-sm px-3',
        md: 'h-10 text-sm px-3',
        lg: 'h-11 text-base px-4',
    };
    const selectClasses = mergeTw('w-full rounded-md border font-medium transition-colors appearance-none', 'bg-white bg-no-repeat', 'pr-10', // space for chevron
    'focus:outline-none focus:ring-2 focus:ring-offset-2', sizeClasses[size], isInvalid
        ? 'border-danger-600 focus:ring-danger-600 focus:border-danger-600'
        : 'border-gray-300 focus:ring-brand-600 focus:border-brand-600', disabled && 'bg-gray-50 cursor-not-allowed opacity-60', className, tw);
    const chevronIcon = (jsxRuntimeExports.jsx("svg", { className: "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500", width: "16", height: "16", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }));
    return (jsxRuntimeExports.jsxs("div", { className: "w-full", children: [label && (jsxRuntimeExports.jsx("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-1", children: label })), description && !error && (jsxRuntimeExports.jsx("p", { id: descriptionId, className: "text-sm text-gray-600 mb-2", children: description })), jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("select", { ref: ref, id: id, disabled: disabled, "aria-invalid": isInvalid || undefined, "aria-describedby": cx(descriptionId, errorId), className: selectClasses, ...props, children: children }), chevronIcon] }), error && (jsxRuntimeExports.jsx("p", { id: errorId, className: "mt-1 text-sm text-danger-600", role: "alert", children: error }))] }));
});

/**
 * Checkbox component with label, description, and indeterminate state support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
const Checkbox = forwardRef(function Checkbox({ label, description, indeterminate, disabled, className, tw, id: providedId, ...props }, ref) {
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
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('flex items-start gap-3', className, tw), children: [jsxRuntimeExports.jsx("input", { ref: handleRef, type: "checkbox", id: id, disabled: disabled, className: checkboxClasses, ...props }), (label || description) && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [label && (jsxRuntimeExports.jsx("label", { htmlFor: id, className: mergeTw('text-sm font-medium text-gray-900', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'), children: label })), description && (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-0.5", children: description }))] }))] }));
});

/**
 * Radio button component with label and description support.
 * Fully accessible with proper keyboard navigation and focus handling.
 */
const Radio = forwardRef(function Radio({ label, description, disabled, className, tw, id: providedId, ...props }, ref) {
    const generatedId = useStableId('radio');
    const id = providedId || generatedId;
    const radioClasses = mergeTw('h-4 w-4 border-gray-300 text-brand-600', 'focus:ring-2 focus:ring-brand-600 focus:ring-offset-2', 'transition-colors', disabled && 'cursor-not-allowed opacity-60', 'cursor-pointer');
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('flex items-start gap-3', className, tw), children: [jsxRuntimeExports.jsx("input", { ref: ref, type: "radio", id: id, disabled: disabled, className: radioClasses, ...props }), (label || description) && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [label && (jsxRuntimeExports.jsx("label", { htmlFor: id, className: mergeTw('text-sm font-medium text-gray-900', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'), children: label })), description && (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-0.5", children: description }))] }))] }));
});

/**
 * Toggle/Switch component with label and description support.
 * Implements ARIA switch pattern for accessibility.
 */
const Toggle = forwardRef(function Toggle({ label, description, size = 'md', disabled, checked, className, tw, id: providedId, ...props }, ref) {
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
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('flex items-start gap-3', className, tw), children: [jsxRuntimeExports.jsxs("label", { htmlFor: id, className: trackClasses, children: [jsxRuntimeExports.jsx("input", { ref: ref, type: "checkbox", role: "switch", id: id, checked: checked, disabled: disabled, "aria-checked": checked, className: "sr-only", ...props }), jsxRuntimeExports.jsx("span", { className: thumbClasses, "aria-hidden": "true" })] }), (label || description) && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [label && (jsxRuntimeExports.jsx("label", { htmlFor: id, className: mergeTw('text-sm font-medium text-gray-900', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'), children: label })), description && (jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-0.5", children: description }))] }))] }));
});

const Card = createSlots({
    root: { base: 'rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden' },
    header: { base: 'px-6 py-4 border-b border-gray-100 flex items-center justify-between' },
    title: { base: 'text-lg font-semibold' },
    description: { base: 'mt-1 text-sm text-gray-600' },
    content: { base: 'px-6 py-5' },
    footer: { base: 'px-6 py-4 border-t border-gray-100' }
}, { as: 'section'});

const TabsContext = createContext(null);
function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs compound components must be used within Tabs.Root');
    }
    return context;
}
const TabsRoot = forwardRef(function TabsRoot({ value: controlledValue, defaultValue, onValueChange, orientation = 'horizontal', children, className, tw }, ref) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const tabsId = useStableId('tabs');
    const onChange = (newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
    };
    return (jsxRuntimeExports.jsx(TabsContext.Provider, { value: { value, onChange, orientation, tabsId }, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full', className, tw), children: children }) }));
});
const TabList = forwardRef(function TabList({ children, className, tw, ...props }, ref) {
    const { orientation } = useTabsContext();
    const listRef = useRef(null);
    const handleKeyDown = (e) => {
        const tabs = Array.from(listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || []);
        const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
        if (currentIndex === -1)
            return;
        let nextIndex = currentIndex;
        if (orientation === 'horizontal') {
            if (e.key === 'ArrowLeft')
                nextIndex = currentIndex - 1;
            if (e.key === 'ArrowRight')
                nextIndex = currentIndex + 1;
        }
        else {
            if (e.key === 'ArrowUp')
                nextIndex = currentIndex - 1;
            if (e.key === 'ArrowDown')
                nextIndex = currentIndex + 1;
        }
        if (e.key === 'Home')
            nextIndex = 0;
        if (e.key === 'End')
            nextIndex = tabs.length - 1;
        if (nextIndex !== currentIndex) {
            e.preventDefault();
            if (nextIndex < 0)
                nextIndex = tabs.length - 1;
            if (nextIndex >= tabs.length)
                nextIndex = 0;
            tabs[nextIndex]?.focus();
            tabs[nextIndex]?.click();
        }
    };
    const handleRef = (node) => {
        listRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    return (jsxRuntimeExports.jsx("div", { ref: handleRef, role: "tablist", "aria-orientation": orientation, onKeyDown: handleKeyDown, className: mergeTw('flex border-b border-gray-200', orientation === 'vertical' && 'flex-col border-b-0 border-r', className, tw), ...props, children: children }));
});
const Tab = forwardRef(function Tab({ value: tabValue, disabled, children, className, tw, ...props }, ref) {
    const { value, onChange, orientation, tabsId } = useTabsContext();
    const isSelected = value === tabValue;
    const handleClick = () => {
        if (!disabled) {
            onChange(tabValue);
        }
    };
    return (jsxRuntimeExports.jsx("button", { ref: ref, role: "tab", type: "button", "aria-selected": isSelected, "aria-controls": `${tabsId}-panel-${tabValue}`, id: `${tabsId}-tab-${tabValue}`, tabIndex: isSelected ? 0 : -1, disabled: disabled, onClick: handleClick, className: mergeTw('px-4 py-2 text-sm font-medium transition-colors', 'focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2', isSelected
            ? 'border-b-2 border-brand-600 text-brand-600'
            : 'text-gray-600 hover:text-gray-900', disabled && 'cursor-not-allowed opacity-50', orientation === 'vertical' && isSelected && 'border-b-0 border-r-2', className, tw), ...props, children: children }));
});
const TabPanels = forwardRef(function TabPanels({ children, className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-4', className, tw), ...props, children: children }));
});
const TabPanel = forwardRef(function TabPanel({ value: panelValue, children, className, tw, ...props }, ref) {
    const { value, tabsId } = useTabsContext();
    const isSelected = value === panelValue;
    if (!isSelected)
        return null;
    return (jsxRuntimeExports.jsx("div", { ref: ref, role: "tabpanel", id: `${tabsId}-panel-${panelValue}`, "aria-labelledby": `${tabsId}-tab-${panelValue}`, tabIndex: 0, className: mergeTw('focus:outline-none', className, tw), ...props, children: children }));
});
/* --------------------------------- Export --------------------------------- */
/**
 * Tabs component with keyboard navigation (arrow keys, Home, End) and roving tabindex.
 * Supports both controlled and uncontrolled modes.
 *
 * @example
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.TabList>
 *     <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
 *   </Tabs.TabList>
 *   <Tabs.TabPanels>
 *     <Tabs.TabPanel value="tab1">Panel 1</Tabs.TabPanel>
 *     <Tabs.TabPanel value="tab2">Panel 2</Tabs.TabPanel>
 *   </Tabs.TabPanels>
 * </Tabs.Root>
 */
const Tabs = {
    Root: TabsRoot,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
};

const AccordionContext = createContext(null);
function useAccordionContext() {
    const ctx = useContext(AccordionContext);
    if (!ctx)
        throw new Error('Accordion components must be used within Accordion.Root');
    return ctx;
}
const ItemContext = createContext(null);
function useItemContext() {
    const ctx = useContext(ItemContext);
    if (!ctx)
        throw new Error('Accordion.Trigger / Content must be used within Accordion.Item');
    return ctx;
}
const AccordionRoot = forwardRef(function AccordionRoot({ type = 'single', value, defaultValue = [], onValueChange, collapsible = true, className, tw, children, ...props }, ref) {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;
    const open = isControlled ? value : internal;
    const setOpen = (next) => {
        if (!isControlled)
            setInternal(next);
        onValueChange?.(next);
    };
    const toggle = (val) => {
        const isOpen = open.includes(val);
        if (type === 'single') {
            setOpen(isOpen ? (collapsible ? [] : [val]) : [val]);
        }
        else {
            setOpen(isOpen ? open.filter((v) => v !== val) : [...open, val]);
        }
    };
    return (jsxRuntimeExports.jsx(AccordionContext.Provider, { value: { isOpen: (v) => open.includes(v), toggle, type }, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full divide-y divide-gray-200', className, tw), ...props, children: children }) }));
});
const AccordionItem = forwardRef(function AccordionItem({ value, disabled, className, tw, children, ...props }, ref) {
    const { isOpen } = useAccordionContext();
    const id = useStableId('accordion');
    const open = isOpen(value);
    return (jsxRuntimeExports.jsx(ItemContext.Provider, { value: { value, open, disabled, triggerId: `${id}-trigger`, panelId: `${id}-panel` }, children: jsxRuntimeExports.jsx("div", { ref: ref, "data-state": open ? 'open' : 'closed', className: mergeTw(className, tw), ...props, children: children }) }));
});
const AccordionTrigger = forwardRef(function AccordionTrigger({ className, tw, children, ...props }, ref) {
    const { toggle } = useAccordionContext();
    const { value, open, disabled, triggerId, panelId } = useItemContext();
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled)
                toggle(value);
        }
    };
    return (jsxRuntimeExports.jsxs("button", { ref: ref, type: "button", id: triggerId, "aria-expanded": open, "aria-controls": panelId, disabled: disabled, onClick: () => !disabled && toggle(value), onKeyDown: handleKeyDown, className: mergeTw('flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-gray-900', 'transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', disabled && 'cursor-not-allowed opacity-50', className, tw), ...props, children: [jsxRuntimeExports.jsx("span", { className: "flex-1", children: children }), jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: mergeTw('shrink-0 text-gray-400 transition-transform duration-200', open && 'rotate-180'), children: jsxRuntimeExports.jsx("path", { d: "M6 9l6 6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] }));
});
const AccordionContent = forwardRef(function AccordionContent({ className, tw, children, ...props }, ref) {
    const { open, triggerId, panelId } = useItemContext();
    return (jsxRuntimeExports.jsx("div", { ref: ref, id: panelId, role: "region", "aria-labelledby": triggerId, hidden: !open, className: mergeTw('overflow-hidden text-sm text-gray-600', open && 'animate-fade-in', className, tw), ...props, children: jsxRuntimeExports.jsx("div", { className: "pb-4", children: children }) }));
});
/* --------------------------------- Export --------------------------------- */
/**
 * Accordion with single/multiple expansion, full keyboard support and ARIA wiring.
 *
 * @example
 * <Accordion.Root type="single" collapsible defaultValue={['a']}>
 *   <Accordion.Item value="a">
 *     <Accordion.Trigger>Question?</Accordion.Trigger>
 *     <Accordion.Content>Answer.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
};

const TableContext = createContext({});
const TableRoot = forwardRef(function TableRoot({ striped, hoverable = true, dense, className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx(TableContext.Provider, { value: { striped, hoverable, dense }, children: jsxRuntimeExports.jsx("div", { className: "w-full overflow-x-auto", children: jsxRuntimeExports.jsx("table", { ref: ref, className: mergeTw('w-full border-collapse text-left text-sm', className, tw), ...props, children: children }) }) }));
});
/* -------------------------------- Sections -------------------------------- */
const TableHeader = forwardRef(function TableHeader({ className, tw, ...props }, ref) {
    return jsxRuntimeExports.jsx("thead", { ref: ref, className: mergeTw('border-b border-gray-200', className, tw), ...props });
});
const TableBody = forwardRef(function TableBody({ className, tw, ...props }, ref) {
    return jsxRuntimeExports.jsx("tbody", { ref: ref, className: mergeTw('divide-y divide-gray-100', className, tw), ...props });
});
const TableFooter = forwardRef(function TableFooter({ className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("tfoot", { ref: ref, className: mergeTw('border-t border-gray-200 bg-gray-50 font-medium', className, tw), ...props }));
});
const TableRow = forwardRef(function TableRow({ selected, className, tw, ...props }, ref) {
    const { striped, hoverable } = useContext(TableContext);
    return (jsxRuntimeExports.jsx("tr", { ref: ref, "data-selected": selected || undefined, className: mergeTw('transition-colors', striped && 'even:bg-gray-50/70', hoverable && 'hover:bg-gray-50', selected && 'bg-brand-50', className, tw), ...props }));
});
const TableHead = forwardRef(function TableHead({ className, tw, ...props }, ref) {
    const { dense } = useContext(TableContext);
    return (jsxRuntimeExports.jsx("th", { ref: ref, scope: "col", className: mergeTw('whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-gray-500', dense ? 'px-3 py-2' : 'px-4 py-3', className, tw), ...props }));
});
const TableCell = forwardRef(function TableCell({ className, tw, ...props }, ref) {
    const { dense } = useContext(TableContext);
    return (jsxRuntimeExports.jsx("td", { ref: ref, className: mergeTw('align-middle text-gray-700', dense ? 'px-3 py-2' : 'px-4 py-3', className, tw), ...props }));
});
/* -------------------------------- Caption --------------------------------- */
const TableCaption = forwardRef(function TableCaption({ className, tw, ...props }, ref) {
    return jsxRuntimeExports.jsx("caption", { ref: ref, className: mergeTw('mt-3 text-xs text-gray-500', className, tw), ...props });
});
/* --------------------------------- Export --------------------------------- */
/**
 * Compound data table. `striped`, `hoverable` and `dense` on Root cascade to
 * rows/cells via context.
 *
 * @example
 * <Table.Root hoverable>
 *   <Table.Header><Table.Row><Table.Head>Name</Table.Head></Table.Row></Table.Header>
 *   <Table.Body><Table.Row><Table.Cell>Ada</Table.Cell></Table.Row></Table.Body>
 * </Table.Root>
 */
const Table = {
    Root: TableRoot,
    Header: TableHeader,
    Body: TableBody,
    Footer: TableFooter,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
    Caption: TableCaption,
};

const BreadcrumbRoot = forwardRef(function BreadcrumbRoot({ className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx("nav", { ref: ref, "aria-label": "Breadcrumb", className: mergeTw(className, tw), ...props, children: jsxRuntimeExports.jsx("ol", { className: "flex flex-wrap items-center gap-1.5 text-sm text-gray-500", children: children }) }));
});
const BreadcrumbItem = forwardRef(function BreadcrumbItem({ className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx("li", { ref: ref, className: mergeTw('inline-flex items-center gap-1.5', className, tw), ...props, children: children }));
});
const BreadcrumbLink = forwardRef(function BreadcrumbLink({ className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx("a", { ref: ref, className: mergeTw('rounded transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', className, tw), ...props, children: children }));
});
/** The current (non-navigable) page. */
const BreadcrumbPage = forwardRef(function BreadcrumbPage({ className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx("span", { ref: ref, role: "link", "aria-disabled": "true", "aria-current": "page", className: mergeTw('font-medium text-gray-900', className, tw), ...props, children: children }));
});
const BreadcrumbSeparator = forwardRef(function BreadcrumbSeparator({ className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx("li", { ref: ref, role: "presentation", "aria-hidden": "true", className: mergeTw('text-gray-300 [&>svg]:h-3.5 [&>svg]:w-3.5', className, tw), ...props, children: children ?? (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: jsxRuntimeExports.jsx("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })) }));
});
/* --------------------------------- Export --------------------------------- */
/**
 * Breadcrumb navigation. Compose with Link for navigable crumbs, Page for the
 * current page, and Separator between them.
 *
 * @example
 * <Breadcrumb.Root>
 *   <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
 *   <Breadcrumb.Separator />
 *   <Breadcrumb.Item><Breadcrumb.Page>Settings</Breadcrumb.Page></Breadcrumb.Item>
 * </Breadcrumb.Root>
 */
const Breadcrumb = {
    Root: BreadcrumbRoot,
    Item: BreadcrumbItem,
    Link: BreadcrumbLink,
    Page: BreadcrumbPage,
    Separator: BreadcrumbSeparator,
};

const DOTS = '…';
function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
/** Build the page list with ellipses, mirroring common pagination UIs. */
function usePaginationRange(page, count, siblingCount) {
    const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 dots
    if (totalNumbers >= count)
        return range(1, count);
    const leftSibling = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, count);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < count - 1;
    if (!showLeftDots && showRightDots) {
        return [...range(1, 3 + 2 * siblingCount), DOTS, count];
    }
    if (showLeftDots && !showRightDots) {
        return [1, DOTS, ...range(count - (2 + 2 * siblingCount), count)];
    }
    return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, count];
}
const arrow = (dir) => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: jsxRuntimeExports.jsx("path", { d: dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6', stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
const cellBase = 'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 disabled:pointer-events-none disabled:opacity-40';
/**
 * Pagination control with a smart ellipsis range. Fully controlled.
 *
 * @example
 * <Pagination page={page} count={12} onChange={setPage} />
 */
const Pagination = forwardRef(function Pagination({ page, count, onChange, siblingCount = 1, showEdges = true, className, tw, ...props }, ref) {
    const items = usePaginationRange(page, count, siblingCount);
    const go = (p) => onChange(Math.min(Math.max(1, p), count));
    return (jsxRuntimeExports.jsxs("nav", { ref: ref, "aria-label": "Pagination", className: mergeTw('flex items-center gap-1', className, tw), ...props, children: [showEdges && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => go(page - 1), disabled: page <= 1, "aria-label": "Previous page", className: mergeTw(cellBase, 'text-gray-600 hover:bg-gray-100'), children: arrow('prev') })), items.map((item, i) => item === DOTS ? (jsxRuntimeExports.jsx("span", { className: "inline-flex h-9 min-w-9 items-center justify-center text-gray-400", children: DOTS }, `dots-${i}`)) : (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => go(item), "aria-current": item === page ? 'page' : undefined, className: mergeTw(cellBase, item === page
                    ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                    : 'text-gray-700 hover:bg-gray-100'), children: item }, item))), showEdges && (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => go(page + 1), disabled: page >= count, "aria-label": "Next page", className: mergeTw(cellBase, 'text-gray-600 hover:bg-gray-100'), children: arrow('next') }))] }));
});

const TooltipContext = createContext(null);
function useTooltipContext() {
    const context = useContext(TooltipContext);
    if (!context) {
        throw new Error('Tooltip compound components must be used within Tooltip.Root');
    }
    return context;
}
const TooltipRoot = ({ children, position = 'top' }) => {
    const [open, setOpen] = useState(false);
    const tooltipId = useStableId('tooltip');
    const triggerRef = useRef(null);
    return (jsxRuntimeExports.jsx(TooltipContext.Provider, { value: { open, setOpen, tooltipId, position, triggerRef }, children: jsxRuntimeExports.jsx("div", { className: "relative inline-block", children: children }) }));
};
const TooltipTrigger = forwardRef(function TooltipTrigger({ children, as: Component = 'span', className, tw, ...props }, ref) {
    const { setOpen, tooltipId, triggerRef } = useTooltipContext();
    const handleMouseEnter = () => setOpen(true);
    const handleMouseLeave = () => setOpen(false);
    const handleFocus = () => setOpen(true);
    const handleBlur = () => setOpen(false);
    const Element = Component;
    const handleRef = (node) => {
        triggerRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    return (jsxRuntimeExports.jsx(Element, { ref: handleRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onFocus: handleFocus, onBlur: handleBlur, "aria-describedby": tooltipId, className: mergeTw(className, tw), ...props, children: children }));
});
const TooltipContent = forwardRef(function TooltipContent({ children, className, tw, ...props }, ref) {
    const { open, tooltipId, position, triggerRef } = useTooltipContext();
    const contentRef = useRef(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    useEffect(() => {
        if (!open || !triggerRef.current || !contentRef.current)
            return;
        const updatePosition = () => {
            const trigger = triggerRef.current.getBoundingClientRect();
            const tooltip = contentRef.current.getBoundingClientRect();
            let top = 0;
            let left = 0;
            switch (position) {
                case 'top':
                    top = trigger.top - tooltip.height - 8;
                    left = trigger.left + trigger.width / 2 - tooltip.width / 2;
                    break;
                case 'bottom':
                    top = trigger.bottom + 8;
                    left = trigger.left + trigger.width / 2 - tooltip.width / 2;
                    break;
                case 'left':
                    top = trigger.top + trigger.height / 2 - tooltip.height / 2;
                    left = trigger.left - tooltip.width - 8;
                    break;
                case 'right':
                    top = trigger.top + trigger.height / 2 - tooltip.height / 2;
                    left = trigger.right + 8;
                    break;
            }
            setCoords({ top, left });
        };
        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [open, position, triggerRef]);
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
    const arrowClasses = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
    };
    return createPortal(jsxRuntimeExports.jsxs("div", { ref: handleRef, id: tooltipId, role: "tooltip", style: {
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
        }, className: mergeTw('z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-lg', 'animate-fade-in', 'max-w-xs whitespace-normal', className, tw), ...props, children: [children, jsxRuntimeExports.jsx("div", { className: mergeTw('absolute w-0 h-0 border-4', arrowClasses[position]), "aria-hidden": "true" })] }), document.body);
});
/* --------------------------------- Export --------------------------------- */
/**
 * Tooltip component that shows on hover or focus.
 * Supports top, right, bottom, and left positioning.
 *
 * @example
 * <Tooltip.Root position="top">
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip.Root>
 */
const Tooltip = {
    Root: TooltipRoot,
    Trigger: TooltipTrigger,
    Content: TooltipContent,
};

const DialogContext = createContext(null);
function useDialogContext() {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('Dialog compound components must be used within Dialog.Root');
    }
    return context;
}
const DialogRoot = ({ open: controlledOpen, defaultOpen, onOpenChange, children }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const titleId = useStableId('dialog-title');
    const descriptionId = useStableId('dialog-description');
    const handleOpenChange = (newOpen) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };
    return (jsxRuntimeExports.jsx(DialogContext.Provider, { value: { open, onOpenChange: handleOpenChange, titleId, descriptionId }, children: children }));
};
const DialogOverlay = forwardRef(function DialogOverlay({ className, tw, ...props }, ref) {
    const { open } = useDialogContext();
    if (!open)
        return null;
    return createPortal(jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm', 'animate-fade-in', className, tw), ...props }), document.body);
});
const DialogContent = forwardRef(function DialogContent({ children, className, tw, ...props }, ref) {
    const { open, onOpenChange, titleId, descriptionId } = useDialogContext();
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
    return createPortal(jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", onClick: handleBackdropClick, children: jsxRuntimeExports.jsx("div", { ref: handleRef, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descriptionId, className: mergeTw('relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-card', 'animate-zoom-in-95', className, tw), ...props, children: children }) }), document.body);
});
const DialogHeader = forwardRef(function DialogHeader({ children, className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mb-4', className, tw), ...props, children: children }));
});
const DialogTitle = forwardRef(function DialogTitle({ children, className, tw, ...props }, ref) {
    const { titleId } = useDialogContext();
    return (jsxRuntimeExports.jsx("h2", { ref: ref, id: titleId, className: mergeTw('text-lg font-semibold text-gray-900', className, tw), ...props, children: children }));
});
const DialogDescription = forwardRef(function DialogDescription({ children, className, tw, ...props }, ref) {
    const { descriptionId } = useDialogContext();
    return (jsxRuntimeExports.jsx("p", { ref: ref, id: descriptionId, className: mergeTw('text-sm text-gray-600 mt-1', className, tw), ...props, children: children }));
});
const DialogFooter = forwardRef(function DialogFooter({ children, className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-6 flex items-center justify-end gap-3', className, tw), ...props, children: children }));
});
const DialogClose = forwardRef(function DialogClose({ children, className, tw, onClick, ...props }, ref) {
    const { onOpenChange } = useDialogContext();
    const handleClick = (e) => {
        onOpenChange(false);
        onClick?.(e);
    };
    return (jsxRuntimeExports.jsx("button", { ref: ref, type: "button", onClick: handleClick, className: mergeTw('absolute right-4 top-4 rounded-md p-1 text-gray-400', 'hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-600', className, tw), ...props, children: children || (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) })) }));
});
/* --------------------------------- Export --------------------------------- */
/**
 * Dialog/Modal component with focus trap, scroll lock, and keyboard handling.
 * Accessible with ARIA attributes and focus management.
 *
 * @example
 * <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <Dialog.Overlay />
 *   <Dialog.Content>
 *     <Dialog.Close />
 *     <Dialog.Header>
 *       <Dialog.Title>Title</Dialog.Title>
 *       <Dialog.Description>Description</Dialog.Description>
 *     </Dialog.Header>
 *     <div>Content</div>
 *     <Dialog.Footer>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 */
const Dialog = {
    Root: DialogRoot,
    Overlay: DialogOverlay,
    Content: DialogContent,
    Header: DialogHeader,
    Title: DialogTitle,
    Description: DialogDescription,
    Footer: DialogFooter,
    Close: DialogClose,
};

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
    return (jsxRuntimeExports.jsx(DrawerContext.Provider, { value: { open, onOpenChange: handleOpenChange, titleId, descriptionId, position }, children: children }));
};
const DrawerOverlay = forwardRef(function DrawerOverlay({ className, tw, ...props }, ref) {
    const { open } = useDrawerContext();
    if (!open)
        return null;
    return createPortal(jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm', 'animate-fade-in', className, tw), ...props }), document.body);
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
    return createPortal(jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50", onClick: handleBackdropClick, children: jsxRuntimeExports.jsx("div", { ref: handleRef, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descriptionId, className: mergeTw('fixed bg-white p-6 shadow-card', positionClasses[position], className, tw), ...props, children: children }) }), document.body);
});
const DrawerHeader = forwardRef(function DrawerHeader({ children, className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mb-4', className, tw), ...props, children: children }));
});
const DrawerTitle = forwardRef(function DrawerTitle({ children, className, tw, ...props }, ref) {
    const { titleId } = useDrawerContext();
    return (jsxRuntimeExports.jsx("h2", { ref: ref, id: titleId, className: mergeTw('text-lg font-semibold text-gray-900', className, tw), ...props, children: children }));
});
const DrawerDescription = forwardRef(function DrawerDescription({ children, className, tw, ...props }, ref) {
    const { descriptionId } = useDrawerContext();
    return (jsxRuntimeExports.jsx("p", { ref: ref, id: descriptionId, className: mergeTw('text-sm text-gray-600 mt-1', className, tw), ...props, children: children }));
});
const DrawerFooter = forwardRef(function DrawerFooter({ children, className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-6 flex items-center justify-end gap-3', className, tw), ...props, children: children }));
});
const DrawerClose = forwardRef(function DrawerClose({ children, className, tw, onClick, ...props }, ref) {
    const { onOpenChange } = useDrawerContext();
    const handleClick = (e) => {
        onOpenChange(false);
        onClick?.(e);
    };
    return (jsxRuntimeExports.jsx("button", { ref: ref, type: "button", onClick: handleClick, className: mergeTw('absolute right-4 top-4 rounded-md p-1 text-gray-400', 'hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-600', className, tw), ...props, children: children || (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) })) }));
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
const Drawer = {
    Root: DrawerRoot,
    Overlay: DrawerOverlay,
    Content: DrawerContent,
    Header: DrawerHeader,
    Title: DrawerTitle,
    Description: DrawerDescription,
    Footer: DrawerFooter,
    Close: DrawerClose,
};

const MenuContext = createContext(null);
function useMenu() {
    const ctx = useContext(MenuContext);
    if (!ctx)
        throw new Error('DropdownMenu components must be used within DropdownMenu.Root');
    return ctx;
}
const Root$1 = ({ children, open: controlled, defaultOpen, onOpenChange, align = 'start', side = 'bottom' }) => {
    const [internal, setInternal] = useState(defaultOpen || false);
    const isControlled = controlled !== undefined;
    const open = isControlled ? controlled : internal;
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const menuId = useStableId('menu');
    const setOpen = useCallback((o) => {
        if (!isControlled)
            setInternal(o);
        onOpenChange?.(o);
    }, [isControlled, onOpenChange]);
    return (jsxRuntimeExports.jsx(MenuContext.Provider, { value: { open, setOpen, triggerRef, contentRef, menuId, align, side }, children: jsxRuntimeExports.jsx("div", { className: "relative inline-block text-left", children: children }) }));
};
const Trigger$1 = forwardRef(function Trigger({ className, tw, children, onClick, ...props }, ref) {
    const { open, setOpen, triggerRef, menuId } = useMenu();
    const handleRef = (node) => {
        triggerRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    return (jsxRuntimeExports.jsx("button", { ref: handleRef, type: "button", "aria-haspopup": "menu", "aria-expanded": open, "aria-controls": open ? menuId : undefined, onClick: (e) => {
            setOpen(!open);
            onClick?.(e);
        }, className: mergeTw(className, tw), ...props, children: children }));
});
const Content$1 = forwardRef(function Content({ sideOffset = 6, className, tw, children, ...props }, ref) {
    const { open, setOpen, triggerRef, contentRef, menuId, align, side } = useMenu();
    const [style, setStyle] = useState({ position: 'fixed', top: 0, left: 0, opacity: 0 });
    const handleRef = (node) => {
        contentRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    useEffect(() => {
        if (!open)
            return;
        const place = () => {
            const t = triggerRef.current?.getBoundingClientRect();
            const c = contentRef.current?.getBoundingClientRect();
            if (!t || !c)
                return;
            let top = side === 'bottom' ? t.bottom + sideOffset : t.top - c.height - sideOffset;
            let left = align === 'start' ? t.left : align === 'end' ? t.right - c.width : t.left + t.width / 2 - c.width / 2;
            left = Math.max(8, Math.min(left, window.innerWidth - c.width - 8));
            top = Math.max(8, Math.min(top, window.innerHeight - c.height - 8));
            setStyle({ position: 'fixed', top, left, opacity: 1 });
        };
        place();
        window.addEventListener('scroll', place, true);
        window.addEventListener('resize', place);
        return () => {
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('resize', place);
        };
    }, [open, align, side, sideOffset, triggerRef, contentRef]);
    // Focus first item on open; close on Escape / outside click.
    useEffect(() => {
        if (!open)
            return;
        const items = () => Array.from(contentRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') || []);
        const first = items()[0];
        first?.focus();
        const onKey = (e) => {
            const list = items();
            const idx = list.indexOf(document.activeElement);
            if (e.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                list[(idx + 1) % list.length]?.focus();
            }
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                list[(idx - 1 + list.length) % list.length]?.focus();
            }
            else if (e.key === 'Home') {
                e.preventDefault();
                list[0]?.focus();
            }
            else if (e.key === 'End') {
                e.preventDefault();
                list[list.length - 1]?.focus();
            }
        };
        const onClick = (e) => {
            const target = e.target;
            if (!contentRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [open, setOpen, contentRef, triggerRef]);
    if (!open)
        return null;
    return createPortal(jsxRuntimeExports.jsx("div", { ref: handleRef, id: menuId, role: "menu", style: style, className: mergeTw('z-50 min-w-[12rem] origin-top rounded-xl border border-gray-200 bg-white p-1.5 shadow-card', 'animate-zoom-in-95', className, tw), ...props, children: children }), document.body);
});
const Item = forwardRef(function Item({ disabled, destructive, icon, className, tw, children, onClick, ...props }, ref) {
    const { setOpen } = useMenu();
    return (jsxRuntimeExports.jsxs("button", { ref: ref, type: "button", role: "menuitem", "aria-disabled": disabled || undefined, disabled: disabled, onClick: (e) => {
            if (disabled)
                return;
            onClick?.(e);
            setOpen(false);
        }, className: mergeTw('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors', 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', destructive
            ? 'text-danger-600 hover:bg-danger-50 focus:bg-danger-50'
            : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100', disabled && 'pointer-events-none opacity-50', className, tw), ...props, children: [icon && jsxRuntimeExports.jsx("span", { className: "shrink-0 [&>svg]:h-4 [&>svg]:w-4", children: icon }), jsxRuntimeExports.jsx("span", { className: "flex-1", children: children })] }));
});
/* ------------------------------ Label / Sep ------------------------------- */
const Label = forwardRef(function Label({ className, tw, ...props }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400', className, tw), ...props }));
});
const Separator = forwardRef(function Separator({ className, tw, ...props }, ref) {
    return jsxRuntimeExports.jsx("div", { ref: ref, role: "separator", className: mergeTw('my-1.5 h-px bg-gray-100', className, tw), ...props });
});
/* --------------------------------- Export --------------------------------- */
/**
 * Dropdown menu with portal positioning, outside-click & Escape dismissal, and
 * arrow-key roving focus.
 *
 * @example
 * <DropdownMenu.Root align="end">
 *   <DropdownMenu.Trigger><Button>Options</Button></DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item>Edit</DropdownMenu.Item>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item destructive>Delete</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 */
const DropdownMenu = {
    Root: Root$1,
    Trigger: Trigger$1,
    Content: Content$1,
    Item,
    Label,
    Separator,
};

const PopoverContext = createContext(null);
function usePopover() {
    const ctx = useContext(PopoverContext);
    if (!ctx)
        throw new Error('Popover components must be used within Popover.Root');
    return ctx;
}
const Root = ({ children, open: controlled, defaultOpen, onOpenChange, align = 'center', side = 'bottom' }) => {
    const [internal, setInternal] = useState(defaultOpen || false);
    const isControlled = controlled !== undefined;
    const open = isControlled ? controlled : internal;
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const popoverId = useStableId('popover');
    const setOpen = useCallback((o) => {
        if (!isControlled)
            setInternal(o);
        onOpenChange?.(o);
    }, [isControlled, onOpenChange]);
    return (jsxRuntimeExports.jsx(PopoverContext.Provider, { value: { open, setOpen, triggerRef, contentRef, popoverId, align, side }, children: jsxRuntimeExports.jsx("div", { className: "relative inline-block", children: children }) }));
};
const Trigger = forwardRef(function Trigger({ className, tw, children, onClick, ...props }, ref) {
    const { open, setOpen, triggerRef, popoverId } = usePopover();
    const handleRef = (node) => {
        triggerRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    return (jsxRuntimeExports.jsx("button", { ref: handleRef, type: "button", "aria-haspopup": "dialog", "aria-expanded": open, "aria-controls": open ? popoverId : undefined, onClick: (e) => {
            setOpen(!open);
            onClick?.(e);
        }, className: mergeTw(className, tw), ...props, children: children }));
});
const Content = forwardRef(function Content({ sideOffset = 8, className, tw, children, ...props }, ref) {
    const { open, setOpen, triggerRef, contentRef, popoverId, align, side } = usePopover();
    const [style, setStyle] = useState({ position: 'fixed', top: 0, left: 0, opacity: 0 });
    useFocusReturn();
    const handleRef = (node) => {
        contentRef.current = node;
        if (typeof ref === 'function')
            ref(node);
        else if (ref)
            ref.current = node;
    };
    useEffect(() => {
        if (!open)
            return;
        const place = () => {
            const t = triggerRef.current?.getBoundingClientRect();
            const c = contentRef.current?.getBoundingClientRect();
            if (!t || !c)
                return;
            let top = 0;
            let left = 0;
            if (side === 'bottom' || side === 'top') {
                top = side === 'bottom' ? t.bottom + sideOffset : t.top - c.height - sideOffset;
                left = align === 'start' ? t.left : align === 'end' ? t.right - c.width : t.left + t.width / 2 - c.width / 2;
            }
            else {
                left = side === 'right' ? t.right + sideOffset : t.left - c.width - sideOffset;
                top = align === 'start' ? t.top : align === 'end' ? t.bottom - c.height : t.top + t.height / 2 - c.height / 2;
            }
            left = Math.max(8, Math.min(left, window.innerWidth - c.width - 8));
            top = Math.max(8, Math.min(top, window.innerHeight - c.height - 8));
            setStyle({ position: 'fixed', top, left, opacity: 1 });
        };
        place();
        window.addEventListener('scroll', place, true);
        window.addEventListener('resize', place);
        return () => {
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('resize', place);
        };
    }, [open, align, side, sideOffset, triggerRef, contentRef]);
    useEffect(() => {
        if (!open)
            return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };
        const onClick = (e) => {
            const target = e.target;
            if (!contentRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [open, setOpen, contentRef, triggerRef]);
    if (!open)
        return null;
    return createPortal(jsxRuntimeExports.jsx("div", { ref: handleRef, id: popoverId, role: "dialog", style: style, className: mergeTw('z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-card', 'animate-zoom-in-95', className, tw), ...props, children: children }), document.body);
});
/* ---------------------------------- Close --------------------------------- */
const Close = forwardRef(function Close({ className, tw, children, onClick, ...props }, ref) {
    const { setOpen } = usePopover();
    return (jsxRuntimeExports.jsx("button", { ref: ref, type: "button", onClick: (e) => {
            setOpen(false);
            onClick?.(e);
        }, className: mergeTw('absolute right-3 top-3 rounded-md p-1 text-gray-400 transition hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600', className, tw), "aria-label": "Close", ...props, children: children ?? (jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: jsxRuntimeExports.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) })) }));
});
/* --------------------------------- Export --------------------------------- */
/**
 * Popover — floating panel anchored to a trigger, with portal positioning,
 * outside-click & Escape dismissal and focus return.
 *
 * @example
 * <Popover.Root side="bottom" align="end">
 *   <Popover.Trigger><Button>Open</Button></Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Close />
 *     <p>Anything you like in here.</p>
 *   </Popover.Content>
 * </Popover.Root>
 */
const Popover = {
    Root,
    Trigger,
    Content,
    Close,
};

const ToastContext = createContext(null);
let toastCounter = 0;
function ToastProvider({ children, max = 5 }) {
    const [toasts, setToasts] = useState([]);
    const addToast = useCallback((message, variant = 'info', duration = 5000) => {
        const id = `toast-${++toastCounter}`;
        const newToast = { id, message, variant, duration };
        setToasts((prev) => {
            const updated = [...prev, newToast];
            return updated.slice(-max);
        });
    }, [max]);
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    return (jsxRuntimeExports.jsxs(ToastContext.Provider, { value: { toasts, addToast, removeToast }, children: [children, jsxRuntimeExports.jsx(ToastContainer, {})] }));
}
/* -------------------------------- useToast -------------------------------- */
/**
 * Hook to access toast functionality.
 * Must be used within ToastProvider.
 */
function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return {
        success: (message, duration) => context.addToast(message, 'success', duration),
        error: (message, duration) => context.addToast(message, 'error', duration),
        warning: (message, duration) => context.addToast(message, 'warning', duration),
        info: (message, duration) => context.addToast(message, 'info', duration),
    };
}
/* ----------------------------- ToastContainer ----------------------------- */
function ToastContainer() {
    const context = useContext(ToastContext);
    if (!context)
        return null;
    const { toasts } = context;
    return createPortal(jsxRuntimeExports.jsx("div", { className: "fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none", "aria-live": "polite", "aria-atomic": "true", children: toasts.map((toast) => (jsxRuntimeExports.jsx(ToastItem, { toast: toast }, toast.id))) }), document.body);
}
function ToastItem({ toast }) {
    const context = useContext(ToastContext);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        if (!toast.duration || isHovered)
            return;
        const timer = setTimeout(() => {
            context?.removeToast(toast.id);
        }, toast.duration);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, isHovered, context]);
    const handleClose = () => {
        context?.removeToast(toast.id);
    };
    const variantStyles = {
        success: 'bg-success-600 text-white',
        error: 'bg-danger-600 text-white',
        warning: 'bg-accent-600 text-gray-900',
        info: 'bg-brand-600 text-white',
    };
    const icons = {
        success: (jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM10.7869 6.03615L7.22344 9.59961C7.13377 9.68928 7.01563 9.73926 6.89258 9.73926C6.76953 9.73926 6.65137 9.68928 6.5617 9.59961L4.71045 7.74834C4.52344 7.56133 4.52344 7.25977 4.71045 7.07275C4.89746 6.88574 5.19902 6.88574 5.38604 7.07275L6.89258 8.57928L10.1113 5.36055C10.2983 5.17354 10.5999 5.17354 10.7869 5.36055C10.9739 5.54756 10.9739 5.84912 10.7869 6.03615Z", fill: "currentColor" }) })),
        error: (jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM10.1768 9.51758C10.3638 9.70459 10.3638 10.0061 10.1768 10.1932C10.0835 10.2865 9.96289 10.3335 9.84229 10.3335C9.72168 10.3335 9.60107 10.2865 9.50781 10.1932L7.5 8.18555L5.49219 10.1932C5.39893 10.2865 5.27832 10.3335 5.15771 10.3335C5.03711 10.3335 4.9165 10.2865 4.82324 10.1932C4.63623 10.0061 4.63623 9.70459 4.82324 9.51758L6.83105 7.5098L4.82324 5.50195C4.63623 5.31494 4.63623 5.01338 4.82324 4.82637C5.01025 4.63936 5.31181 4.63936 5.49883 4.82637L7.50664 6.83418L9.51445 4.82637C9.70146 4.63936 10.003 4.63936 10.19 4.82637C10.377 5.01338 10.377 5.31494 10.19 5.50195L8.18213 7.50977L10.1768 9.51758Z", fill: "currentColor" }) })),
        warning: (jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM7.5 10.5C7.15381 10.5 6.875 10.2212 6.875 9.875C6.875 9.52881 7.15381 9.25 7.5 9.25C7.84619 9.25 8.125 9.52881 8.125 9.875C8.125 10.2212 7.84619 10.5 7.5 10.5ZM8.125 7.375C8.125 7.72119 7.84619 8 7.5 8C7.15381 8 6.875 7.72119 6.875 7.375V4.625C6.875 4.27881 7.15381 4 7.5 4C7.84619 4 8.125 4.27881 8.125 4.625V7.375Z", fill: "currentColor" }) })),
        info: (jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM7.5 10.625C7.15381 10.625 6.875 10.3462 6.875 10V7.5C6.875 7.15381 7.15381 6.875 7.5 6.875C7.84619 6.875 8.125 7.15381 8.125 7.5V10C8.125 10.3462 7.84619 10.625 7.5 10.625ZM7.5 5.625C7.15381 5.625 6.875 5.34619 6.875 5C6.875 4.65381 7.15381 4.375 7.5 4.375C7.84619 4.375 8.125 4.65381 8.125 5C8.125 5.34619 7.84619 5.625 7.5 5.625Z", fill: "currentColor" }) })),
    };
    return (jsxRuntimeExports.jsxs("div", { role: "status", className: mergeTw('pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-card min-w-[320px]', 'animate-slide-in-from-right', variantStyles[toast.variant]), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: icons[toast.variant] }), jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm font-medium", children: toast.message }), jsxRuntimeExports.jsx("button", { type: "button", onClick: handleClose, className: "flex-shrink-0 rounded-md p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white", "aria-label": "Close toast", children: jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 15 15", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }) })] }));
}

/**
 * Spinner/Loader component for loading states.
 * Accessible with proper ARIA attributes.
 */
const Spinner = createComponent({
    as: 'div',
    displayName: 'Spinner',
    base: 'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
    variants: {
        size: {
            xs: 'h-3 w-3 border-2',
            sm: 'h-4 w-4 border-2',
            md: 'h-6 w-6 border-2',
            lg: 'h-8 w-8 border-[3px]',
            xl: 'h-12 w-12 border-4',
        },
        color: {
            brand: 'text-brand-600',
            white: 'text-white',
            gray: 'text-gray-600',
            danger: 'text-danger-600',
            success: 'text-success-600',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'brand',
    },
});
/**
 * Full-page loading overlay with spinner.
 * Blocks interaction while content is loading.
 */
function LoadingOverlay({ message = 'Loading...', show = true, }) {
    if (!show)
        return null;
    return (jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm", role: "status", "aria-live": "polite", "aria-label": message, children: [jsxRuntimeExports.jsx(Spinner, { size: "xl", color: "brand", className: "mb-4" }), jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-700", children: message })] }));
}

const variantStyles = {
    info: { wrap: 'bg-info-50 border-info-200 text-info-800', icon: 'text-info-600', title: 'text-info-900' },
    success: { wrap: 'bg-success-50 border-success-200 text-success-800', icon: 'text-success-600', title: 'text-success-900' },
    warning: { wrap: 'bg-accent-50 border-accent-200 text-accent-800', icon: 'text-accent-700', title: 'text-accent-900' },
    danger: { wrap: 'bg-danger-50 border-danger-200 text-danger-800', icon: 'text-danger-600', title: 'text-danger-900' },
    neutral: { wrap: 'bg-gray-50 border-gray-200 text-gray-700', icon: 'text-gray-500', title: 'text-gray-900' },
};
const defaultIcons = {
    info: (jsxRuntimeExports.jsx("path", { d: "M12 16v-4M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    success: (jsxRuntimeExports.jsx("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    warning: (jsxRuntimeExports.jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    danger: (jsxRuntimeExports.jsx("path", { d: "M12 8v4M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
    neutral: (jsxRuntimeExports.jsx("path", { d: "M12 16v-4M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })),
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
const Alert = forwardRef(function Alert({ variant = 'info', title, icon, onClose, className, tw, children, ...props }, ref) {
    const styles = variantStyles[variant];
    const showIcon = icon !== false;
    return (jsxRuntimeExports.jsxs("div", { ref: ref, role: "alert", className: mergeTw('flex items-start gap-3 rounded-xl border p-4 text-sm', styles.wrap, className, tw), ...props, children: [showIcon && (jsxRuntimeExports.jsx("span", { className: mergeTw('mt-0.5 shrink-0', styles.icon), children: icon ?? (jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: defaultIcons[variant] })) })), jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [title && jsxRuntimeExports.jsx("div", { className: mergeTw('font-semibold', styles.title), children: title }), children && jsxRuntimeExports.jsx("div", { className: mergeTw(!!title && 'mt-0.5', 'leading-relaxed'), children: children })] }), onClose && (jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", className: mergeTw('-mr-1 -mt-1 shrink-0 rounded-md p-1 opacity-70 transition hover:opacity-100', styles.icon), children: jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: jsxRuntimeExports.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) }) }))] }));
});

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
const Progress = forwardRef(function Progress({ value = null, max = 100, variant = 'brand', size = 'md', showValue, label, className, tw, ...props }, ref) {
    const indeterminate = value === null || value === undefined;
    const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('flex w-full items-center gap-3', className, tw), ...props, children: [jsxRuntimeExports.jsx("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": indeterminate ? undefined : value ?? undefined, "aria-label": label, className: mergeTw('relative w-full overflow-hidden rounded-full bg-gray-200', trackHeights[size]), children: indeterminate ? (jsxRuntimeExports.jsx("div", { className: mergeTw('absolute inset-y-0 left-0 w-1/3 rounded-full', barColors[variant]), style: { animation: 'slide-in-from-left 1.2s ease-in-out infinite alternate' } })) : (jsxRuntimeExports.jsx("div", { className: mergeTw('h-full rounded-full transition-[width] duration-500 ease-out', barColors[variant]), style: { width: `${pct}%` } })) }), showValue && !indeterminate && (jsxRuntimeExports.jsxs("span", { className: "w-10 shrink-0 text-right text-xs font-medium tabular-nums text-gray-600", children: [Math.round(pct), "%"] }))] }));
});

const shapes = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-none',
    rounded: 'rounded-xl',
};
const shimmerClass = 'relative overflow-hidden bg-gray-200/80 before:absolute before:inset-0 ' +
    'before:-translate-x-full before:animate-shimmer ' +
    'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
const toLen = (v) => (typeof v === 'number' ? `${v}px` : v);
/**
 * Loading placeholder with a moving shimmer. Use `lines` for multi-line text
 * blocks, or `shape` + width/height for avatars, thumbnails and cards.
 *
 * @example
 * <Skeleton shape="circle" width={40} height={40} />
 * <Skeleton lines={3} />
 */
const Skeleton = forwardRef(function Skeleton({ shape = 'text', width, height, lines = 1, className, tw, style, ...props }, ref) {
    if (shape === 'text' && lines > 1) {
        return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-2', className, tw), "aria-hidden": "true", ...props, children: Array.from({ length: lines }).map((_, i) => (jsxRuntimeExports.jsx("div", { className: mergeTw(shapes.text, shimmerClass), style: { width: i === lines - 1 ? '70%' : '100%' } }, i))) }));
    }
    return (jsxRuntimeExports.jsx("div", { ref: ref, "aria-hidden": "true", className: mergeTw(shapes[shape], shimmerClass, className, tw), style: { width: toLen(width), height: toLen(height), ...style }, ...props }));
});

/**
 * Avatar component for displaying user profile images or initials..
 */
const Avatar = createComponent({
    as: "div",
    displayName: "Avatar",
    base: "relative inline-flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700 overflow-hidden flex-shrink-0",
    variants: {
        size: {
            xs: "h-6 w-6 text-xs",
            sm: "h-8 w-8 text-sm",
            md: "h-10 w-10 text-base",
            lg: "h-12 w-12 text-lg",
            xl: "h-16 w-16 text-xl",
            "2xl": "h-20 w-20 text-2xl",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

/**
 * Badge component for labels, status indicators, and counts.
 */
const Badge = createComponent({
    as: 'span',
    displayName: 'Badge',
    base: 'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors',
    variants: {
        variant: {
            default: 'bg-gray-100 text-gray-800',
            primary: 'bg-brand-100 text-brand-800',
            success: 'bg-success-100 text-success-800',
            danger: 'bg-danger-100 text-danger-800',
            warning: 'bg-accent-100 text-accent-800',
            info: 'bg-info-100 text-info-800',
        },
        size: {
            sm: 'text-xs px-1.5 py-0.5',
            md: 'text-xs px-2 py-0.5',
            lg: 'text-sm px-2.5 py-1',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
});

/**
 * A small, modern line-icon set (Lucide-inspired, 24px grid). Icons inherit
 * `currentColor`, so they adapt to whatever text color / theme surrounds them.
 */
const icons = {
    sparkle: 'M12 3l1.6 4.6a3 3 0 001.8 1.8L20 11l-4.6 1.6a3 3 0 00-1.8 1.8L12 19l-1.6-4.6a3 3 0 00-1.8-1.8L4 11l4.6-1.6a3 3 0 001.8-1.8L12 3z',
    check: 'M20 6L9 17l-5-5',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    bolt: 'M13 3v6h6l-8 12v-6H5l8-12z',
    shield: 'M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z',
    layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
    dashboard: 'M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z',
    barchart: 'M3 3v18h18M8 17V11M13 17V7M18 17v-4',
    gauge: 'M12 14a2.5 2.5 0 002.5-2.5c0-1.4-2.5-5-2.5-5s-2.5 3.6-2.5 5A2.5 2.5 0 0012 14zM4.5 18a9 9 0 1115 0',
    globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3.5 9h17M3.5 15h17M12 3a14 14 0 010 18 14 14 0 010-18z',
    users: 'M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a4 4 0 100-8 4 4 0 000 8zM22 19v-2a4 4 0 00-3-3.9M16 1.1A4 4 0 0116 9',
    bell: 'M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
    search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
    menu: 'M3 6h18M3 12h18M3 18h18',
    x: 'M18 6L6 18M6 6l12 12',
    chart: 'M3 3v18h18M7 14l3-3 3 2 5-6',
    wallet: 'M3 8a2 2 0 012-2h12.5A1.5 1.5 0 0019 7.5V7a2 2 0 00-2-2H5M3 8v8a2 2 0 002 2h13a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 01-2-2zM16.5 12.5h.01',
    creditcard: 'M3 6h18v12H3zM3 10h18M7 15h4',
    folder: 'M4 7a2 2 0 012-2h3.5l2 2H18a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V7z',
    star: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z',
    github: 'M9 19c-5 1.4-5-2.5-7-3m14 6v-3.5a3 3 0 00-.9-2.3c3-.3 6.1-1.5 6.1-6.6a5.1 5.1 0 00-1.4-3.5 4.8 4.8 0 00-.1-3.5s-1.1-.3-3.6 1.4a12.3 12.3 0 00-6.4 0C5.7 1.7 4.6 2 4.6 2a4.8 4.8 0 00-.1 3.5A5.1 5.1 0 003 9c0 5.1 3.1 6.3 6.1 6.6a3 3 0 00-.9 2.3V21',
    twitter: 'M22 4.5a8 8 0 01-2.3.6 4 4 0 001.8-2.2 8 8 0 01-2.5 1 4 4 0 00-6.9 3.6A11.3 11.3 0 013 3.3a4 4 0 001.2 5.3 4 4 0 01-1.8-.5 4 4 0 003.2 4 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 21a11.3 11.3 0 006.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0022 4.5z',
    grid: 'M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z',
    rocket: 'M5 14l-2 5 5-2m2-2a14 14 0 01.5-9A9 9 0 0119 4a9 9 0 01-1.4 9.5 14 14 0 01-9 .5L5 14zm9-5.5h.01',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 018 0v4',
    eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z M12 15a3 3 0 100-6 3 3 0 000 6z',
    'eye-off': 'M10 5.1A11 11 0 0112 5c6.4 0 10 7 10 7a18 18 0 01-2.2 3M6.6 6.6A18 18 0 002 12s3.6 7 10 7a11 11 0 005.3-1.3M3 3l18 18M9.9 9.9a3 3 0 004.2 4.2',
    mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
    home: 'M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10',
    cog: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 13.5a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-2.9-1.1l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00-1.2-2.9H3a2 2 0 110-4h.2a1.7 1.7 0 001.1-2.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.4h.1A1.7 1.7 0 0010 3.2V3a2 2 0 114 0v.2a1.7 1.7 0 002.9 1.1l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.4 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.5 1z',
    logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
    plus: 'M12 5v14M5 12h14',
    trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5',
    download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
    // filled (rendered solid)
    google: 'M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 01-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z M12 22c2.7 0 5-1 6.6-2.4l-3.3-2.5c-.9.6-2 1-3.3 1-2.6 0-4.7-1.7-5.5-4.1H3.1v2.6A10 10 0 0012 22z M6.5 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 000 9.2L6.5 14z M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0012 2 10 10 0 003.1 7.4L6.5 10c.8-2.4 2.9-4 5.5-4z',
};
/** Icons drawn as solid fills rather than strokes. */
const FILLED = new Set(['google']);
/**
 * Render a named icon. Inherits `currentColor`.
 *
 * @example
 * <Icon name="sparkle" className="h-5 w-5 text-brand-600" />
 */
const Icon = forwardRef(function Icon({ name, size, className, tw, ...props }, ref) {
    const d = icons[name];
    const filled = FILLED.has(name);
    return (jsxRuntimeExports.jsx("svg", { ref: ref, viewBox: "0 0 24 24", width: size, height: size, fill: filled ? 'currentColor' : 'none', stroke: filled ? 'none' : 'currentColor', strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", className: mergeTw(size ? undefined : 'h-5 w-5', className, tw), "aria-hidden": "true", ...props, children: d ? jsxRuntimeExports.jsx("path", { d: d }) : null }));
});

/**
 * Eyebrow / overline label — a small uppercase monospace kicker above headings.
 *
 * @example
 * <Eyebrow>Why us</Eyebrow>
 */
const Eyebrow = forwardRef(function Eyebrow({ dot = true, dotTw = 'bg-accent', className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsxs("span", { ref: ref, className: mergeTw('inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-fg-muted', className, tw), ...props, children: [dot && (jsxRuntimeExports.jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [jsxRuntimeExports.jsx("span", { className: mergeTw('absolute inline-flex h-full w-full rounded-full opacity-70', dotTw) }), jsxRuntimeExports.jsx("span", { className: mergeTw('relative inline-flex h-1.5 w-1.5 rounded-full', dotTw) })] })), children] }));
});

/**
 * Keyboard key hint.
 *
 * @example
 * Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.
 */
const Kbd = forwardRef(function Kbd({ className, tw, children, ...props }, ref) {
    return (jsxRuntimeExports.jsx("kbd", { ref: ref, className: mergeTw('inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-edge/20 bg-fg/[0.06] px-1.5', 'font-mono text-[11px] font-medium text-fg-muted', className, tw), ...props, children: children }));
});

const intents = {
    primary: 'bg-accent text-onaccent hover:brightness-110 focus:ring-accent focus:ring-offset-canvas',
    secondary: 'border border-edge/15 bg-fg/[0.04] text-fg hover:bg-fg/[0.08] focus:ring-accent focus:ring-offset-canvas',
    ghost: 'text-fg-muted hover:bg-fg/10 hover:text-fg focus:ring-accent focus:ring-offset-canvas',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-600 focus:ring-offset-canvas',
};
const sizes = {
    sm: 'h-8 w-8 [&>svg]:h-4 [&>svg]:w-4',
    md: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
    lg: 'h-11 w-11 [&>svg]:h-5 [&>svg]:w-5',
};
/**
 * Square, icon-only button. Requires an `aria-label`.
 *
 * @example
 * <IconButton aria-label="Settings" intent="ghost"><Icon name="cog" /></IconButton>
 */
const IconButton = forwardRef(function IconButton({ intent = 'secondary', size = 'md', className, tw, children, type = 'button', ...props }, ref) {
    return (jsxRuntimeExports.jsx("button", { ref: ref, type: type, className: mergeTw('inline-flex items-center justify-center rounded-lg transition-colors', 'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed', intents[intent], sizes[size], className, tw), ...props, children: children }));
});

/**
 * Stat / metric card — label, value and an optional trend delta + icon.
 *
 * @example
 * <Stat label="Revenue" value="$48,210" delta="+12.4%" trend="up"
 *       icon={<Icon name="wallet" />} hint="vs last month" />
 */
const Stat = forwardRef(function Stat({ label, value, delta, trend, icon, hint, className, tw, ...props }, ref) {
    const up = trend !== 'down';
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('rounded-2xl border border-edge/12 bg-panel/80 p-5 shadow-luxe-sm backdrop-blur-xl', className, tw), ...props, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-fg-subtle", children: label }), icon && (jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg border border-edge/10 bg-fg/[0.04] text-accent [&>svg]:h-4 [&>svg]:w-4", children: icon }))] }), jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-semibold tracking-tight text-fg", children: value }), (delta || hint) && (jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs", children: [delta && (jsxRuntimeExports.jsxs("span", { className: mergeTw('inline-flex items-center gap-1 font-medium', up ? 'text-success-500' : 'text-danger-500'), children: [jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: up ? '-rotate-45' : 'rotate-45', children: jsxRuntimeExports.jsx("path", { d: "M5 12h14M13 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }) }), delta] })), hint && jsxRuntimeExports.jsx("span", { className: "text-fg-subtle", children: hint })] }))] }));
});

/**
 * A self-contained dark code block with an optional filename header and a
 * copy-to-clipboard button. Looks consistent on any background/theme.
 *
 * @example
 * <Code filename="App.tsx" lang="tsx" code={`<Button>Click</Button>`} />
 */
const Code = forwardRef(function Code({ code, filename, lang, copyable = true, className, tw, ...props }, ref) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard?.writeText(code).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('overflow-hidden rounded-xl border border-white/10 bg-[#0c0e14] shadow-lg', className, tw), ...props, children: [(filename || lang || copyable) && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#ff5f57]" }), jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#febc2e]" }), jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-[#28c840]" })] }), filename && jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-gray-400", children: filename }), jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3", children: [lang && jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-gray-500", children: lang }), copyable && (jsxRuntimeExports.jsx("button", { type: "button", onClick: copy, className: "inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-gray-300 transition hover:bg-white/10 hover:text-white", "aria-label": "Copy code", children: copied ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Copied"] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", children: jsxRuntimeExports.jsx("path", { d: "M9 9h10v12H9zM5 15H3V3h12v2", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Copy"] })) }))] })] })), jsxRuntimeExports.jsx("pre", { className: "scrollbar-luxe overflow-x-auto p-4 text-[13px] leading-relaxed", children: jsxRuntimeExports.jsx("code", { className: "font-mono text-gray-200", children: code }) })] }));
});

/**
 * Gallery component for displaying images in various grid layouts.
 */
const Gallery = createComponent({
    as: 'div',
    displayName: 'Gallery',
    base: 'w-full',
    variants: {
        columns: {
            '1': 'grid-cols-1',
            '2': 'grid-cols-2',
            '3': 'grid-cols-3',
            '4': 'grid-cols-4',
            '5': 'grid-cols-5',
            '6': 'grid-cols-6',
        },
        gap: {
            none: 'gap-0',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6',
            xl: 'gap-8',
        },
    },
    defaultVariants: {
        columns: '3',
        gap: 'md',
    },
});
/**
 * GalleryImage component for individual images in the gallery.
 */
function GalleryImage({ src, alt, aspectRatio = 'square', objectFit = 'cover', onClick, className, tw, }) {
    const aspectRatioClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: '',
    };
    const objectFitClasses = {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
    };
    return (jsxRuntimeExports.jsx("div", { className: mergeTw('relative overflow-hidden rounded-lg bg-gray-100', aspectRatioClasses[aspectRatio], onClick && 'cursor-pointer hover:opacity-90 transition-opacity', className, tw), onClick: onClick, children: jsxRuntimeExports.jsx("img", { src: src, alt: alt, className: mergeTw('w-full h-full', objectFitClasses[objectFit]), loading: "lazy" }) }));
}
/**
 * Lightbox component for viewing images in full screen.
 */
function GalleryLightbox({ images, currentIndex, onClose, onPrevious, onNext, }) {
    const currentImage = images[currentIndex];
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < images.length - 1;
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape')
                onClose();
            if (e.key === 'ArrowLeft' && hasPrevious && onPrevious)
                onPrevious();
            if (e.key === 'ArrowRight' && hasNext && onNext)
                onNext();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, hasPrevious, hasNext, onClose, onPrevious, onNext]);
    // Lock body scroll
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    return (jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black/95 flex items-center justify-center", onClick: onClose, children: [jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10", "aria-label": "Close lightbox", children: jsxRuntimeExports.jsx("svg", { width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), hasPrevious && onPrevious && (jsxRuntimeExports.jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    onPrevious();
                }, className: "absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10", "aria-label": "Previous image", children: jsxRuntimeExports.jsx("svg", { width: "32", height: "32", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) })), jsxRuntimeExports.jsxs("div", { className: "max-w-7xl max-h-[90vh] px-16", onClick: (e) => e.stopPropagation(), children: [jsxRuntimeExports.jsx("img", { src: currentImage.src, alt: currentImage.alt, className: "max-w-full max-h-[90vh] object-contain" }), jsxRuntimeExports.jsxs("div", { className: "text-white text-center mt-4", children: [currentIndex + 1, " / ", images.length] })] }), hasNext && onNext && (jsxRuntimeExports.jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    onNext();
                }, className: "absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10", "aria-label": "Next image", children: jsxRuntimeExports.jsx("svg", { width: "32", height: "32", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) }))] }));
}
/**
 * Hook for managing gallery lightbox state.
 */
function useGalleryLightbox(images) {
    const [currentIndex, setCurrentIndex] = useState(null);
    const open = (index) => setCurrentIndex(index);
    const close = () => setCurrentIndex(null);
    const next = () => {
        if (currentIndex !== null && currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
    const previous = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    return {
        isOpen: currentIndex !== null,
        currentIndex: currentIndex ?? 0,
        open,
        close,
        next,
        previous,
    };
}

/**
 * Carousel component for displaying content in a slideshow.
 * Supports auto-play, navigation arrows, dots, and keyboard navigation.
 */
function Carousel({ children, autoPlay = false, interval = 3000, showDots = true, showArrows = true, loop = true, className, tw, }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);
    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    const goToPrevious = () => {
        if (currentIndex === 0) {
            if (loop) {
                setCurrentIndex(totalSlides - 1);
            }
        }
        else {
            setCurrentIndex(currentIndex - 1);
        }
    };
    const goToNext = () => {
        if (currentIndex === totalSlides - 1) {
            if (loop) {
                setCurrentIndex(0);
            }
        }
        else {
            setCurrentIndex(currentIndex + 1);
        }
    };
    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || isHovered)
            return;
        timeoutRef.current = setTimeout(() => {
            goToNext();
        }, interval);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, autoPlay, interval, isHovered]);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft')
                goToPrevious();
            if (e.key === 'ArrowRight')
                goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);
    const canGoPrevious = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < totalSlides - 1;
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('relative w-full', className, tw), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), role: "region", "aria-label": "Carousel", children: [jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-lg", children: jsxRuntimeExports.jsx("div", { className: "flex transition-transform duration-500 ease-out", style: { transform: `translateX(-${currentIndex * 100}%)` }, children: slides.map((slide, index) => (jsxRuntimeExports.jsx("div", { className: "min-w-full", "aria-hidden": index !== currentIndex, children: slide }, index))) }) }), showArrows && canGoPrevious && (jsxRuntimeExports.jsx("button", { onClick: goToPrevious, className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10", "aria-label": "Previous slide", children: jsxRuntimeExports.jsx("svg", { width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) })), showArrows && canGoNext && (jsxRuntimeExports.jsx("button", { onClick: goToNext, className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10", "aria-label": "Next slide", children: jsxRuntimeExports.jsx("svg", { width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })), showDots && (jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10", children: slides.map((_, index) => (jsxRuntimeExports.jsx("button", { onClick: () => goToSlide(index), className: mergeTw('w-2 h-2 rounded-full transition-all', index === currentIndex
                        ? 'w-8 bg-white'
                        : 'bg-white/60 hover:bg-white/80'), "aria-label": `Go to slide ${index + 1}`, "aria-current": index === currentIndex }, index))) }))] }));
}
/**
 * CarouselSlide component for individual slides.
 */
function CarouselSlide({ children, className, tw }) {
    return (jsxRuntimeExports.jsx("div", { className: mergeTw('w-full', className, tw), children: children }));
}
/**
 * CarouselImage component optimized for carousel slides.
 */
function CarouselImage({ src, alt, aspectRatio = 'video', objectFit = 'cover', className, tw, }) {
    const aspectRatioClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        auto: '',
    };
    const objectFitClasses = {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
    };
    return (jsxRuntimeExports.jsx("div", { className: mergeTw('relative overflow-hidden bg-gray-100', aspectRatioClasses[aspectRatio], className, tw), children: jsxRuntimeExports.jsx("img", { src: src, alt: alt, className: mergeTw('w-full h-full', objectFitClasses[objectFit]) }) }));
}
/**
 * Hook for managing carousel state externally.
 */
function useCarousel(totalSlides, options) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { loop = true } = options || {};
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    const goToPrevious = () => {
        if (currentIndex === 0) {
            if (loop) {
                setCurrentIndex(totalSlides - 1);
            }
        }
        else {
            setCurrentIndex(currentIndex - 1);
        }
    };
    const goToNext = () => {
        if (currentIndex === totalSlides - 1) {
            if (loop) {
                setCurrentIndex(0);
            }
        }
        else {
            setCurrentIndex(currentIndex + 1);
        }
    };
    return {
        currentIndex,
        goToSlide,
        goToPrevious,
        goToNext,
        canGoPrevious: loop || currentIndex > 0,
        canGoNext: loop || currentIndex < totalSlides - 1,
    };
}

/**
 * Shared foundation for the Blocks tier — pre-assembled, multi-design components
 * (PricingCard, Hero, Navbar, SignIn …) composed from the library primitives.
 *
 * Every block exposes a 6-value `variant` prop and is themed *only* through the
 * semantic tokens (canvas / panel / elevated / edge / fg / primary …) so it
 * re-tints automatically across all themes (daylight / slate / aurum / evergreen).
 * Centralising the design vocabulary here keeps the whole suite visually coherent.
 */
const BLOCK_VARIANTS = [
    'minimal',
    'bordered',
    'elevated',
    'glass',
    'gradient',
    'feature',
];
/** Root surface classes per design — all theme-following via semantic tokens. */
const surfaceVariants = {
    minimal: 'bg-transparent',
    bordered: 'bg-panel/60 border border-edge/12',
    elevated: 'bg-elevated border border-edge/10 shadow-luxe-sm',
    glass: 'glass',
    gradient: 'border border-edge/12 bg-gradient-to-br from-primary/10 via-panel/40 to-accent2/10',
    feature: 'bg-elevated border border-primary/30 ring-1 ring-primary/20 shadow-accent',
};
/* ─────────────────────── Reusable accent class strings ───────────────────── */
/* Theme-following accent helpers so every block styles CTAs/marks identically. */
/** Solid accent surface (buttons, marks) + correct contrast text. */
const accentSolid = 'bg-primary text-primary-fg hover:brightness-110 shadow-accent border-0';
/** Soft accent tint (chips, highlighted rows). */
const accentSoft = 'bg-primary/10 text-primary border border-primary/20';
/** Ghost control sitting on a themed surface. */
const ghostControl = 'border border-edge/15 bg-fg/[0.04] text-fg hover:bg-fg/[0.08]';
/** Hairline-bordered, theme-aware input surface. */
const inputSurface = 'w-full rounded-xl border border-edge/15 bg-elevated/70 px-3.5 py-2.5 text-sm text-fg ' +
    'placeholder:text-fg-subtle transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/25';
/* ──────────────────────── Variant context (cascade) ──────────────────────── */
/* A block's Root publishes its `variant`; sub-parts read it to adapt styling. */
const BlockVariantContext = createContext('elevated');
/** Read the active block variant. Pass a local override to win over context. */
function useBlockVariant(local) {
    const ctx = useContext(BlockVariantContext);
    return local ?? ctx;
}

/* ---------------------------------- Root ---------------------------------- */
const PricingCardRoot = forwardRef(function PricingCard({ variant = 'elevated', highlighted, className, tw, children, name, description, price, currency = '$', period = '/mo', features, cta, ribbon, footnote, ...rest }, ref) {
    const promoted = highlighted || variant === 'feature';
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6 text-fg transition-transform', surfaceVariants[variant], promoted && variant !== 'feature' && 'ring-1 ring-primary/30', promoted && 'lg:scale-[1.02]', className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [ribbon ? jsxRuntimeExports.jsx(PricingRibbon, { children: ribbon }) : null, jsxRuntimeExports.jsx(PricingHeader, { name: name, description: description }), jsxRuntimeExports.jsx(PricingPrice, { amount: price, currency: currency, period: period }), features?.length ? jsxRuntimeExports.jsx(PricingFeatures, { items: features }) : null, cta ? jsxRuntimeExports.jsx(PricingAction, { children: cta }) : null, footnote ? jsxRuntimeExports.jsx(PricingFooter, { children: footnote }) : null] })) }) }));
});
const PricingRibbon = forwardRef(function PricingCardRibbon({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("span", { ref: ref, className: mergeTw('inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1', 'font-mono text-[11px] font-medium uppercase tracking-widest text-primary', 'ring-1 ring-primary/20', className, tw), ...rest, children: children }));
});
const PricingHeader = forwardRef(function PricingCardHeader({ name, description, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-1', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [name ? (jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-fg", children: name })) : null, description ? (jsxRuntimeExports.jsx("p", { className: "text-sm text-fg-muted", children: description })) : null] })) }));
});
const PricingPrice = forwardRef(function PricingCardPrice({ amount, currency = '$', period = '/mo', children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex items-baseline gap-1', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [typeof amount === 'number' ? (jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-fg-muted", children: currency })) : null, jsxRuntimeExports.jsx("span", { className: mergeTw('font-display text-4xl font-semibold tracking-tight', variant === 'feature' || variant === 'gradient'
                        ? 'text-primary'
                        : 'text-fg'), children: amount }), period ? (jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-fg-subtle", children: period })) : null] })) }));
});
function CheckMark({ muted }) {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: mergeTw('mt-0.5 h-4 w-4 shrink-0', muted ? 'text-fg-subtle' : 'text-primary'), children: jsxRuntimeExports.jsx("path", { d: "M16.5 5.5 8.25 13.75 4 9.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
const PricingFeatures = forwardRef(function PricingCardFeatures({ items, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("ul", { ref: ref, className: mergeTw('flex flex-col gap-2.5 text-sm text-fg-muted', className, tw), ...rest, children: children ??
            items?.map((item, i) => {
                const label = typeof item === 'string' ? item : item.label;
                const included = typeof item === 'string' ? true : item.included !== false;
                return (jsxRuntimeExports.jsxs("li", { className: mergeTw('flex items-start gap-2.5', !included && 'opacity-55'), children: [jsxRuntimeExports.jsx(CheckMark, { muted: !included }), jsxRuntimeExports.jsx("span", { className: mergeTw(!included && 'line-through'), children: label })] }, i));
            }) }));
});
const PricingAction = forwardRef(function PricingCardAction({ tone, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const resolved = tone ?? (variant === 'feature' || variant === 'gradient' ? 'accent' : 'ghost');
    return (jsxRuntimeExports.jsx(Button, { ref: ref, fullWidth: true, intent: "ghost", tw: mergeTw('mt-1 rounded-xl', resolved === 'accent' ? accentSolid : ghostControl, className, tw), ...rest, children: children }));
});
/* --------------------------------- Footer --------------------------------- */
const PricingFooter = forwardRef(function PricingCardFooter({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('text-center text-xs text-fg-subtle', className, tw), ...rest, children: children }));
});
const PricingCard = PricingCardRoot;
PricingCard.Ribbon = PricingRibbon;
PricingCard.Header = PricingHeader;
PricingCard.Price = PricingPrice;
PricingCard.Features = PricingFeatures;
PricingCard.Action = PricingAction;
PricingCard.Footer = PricingFooter;

/* ---------------------------------- Root ---------------------------------- */
const ProductCardRoot = forwardRef(function ProductCard({ variant = 'elevated', className, tw, children, image, title, price, originalPrice, currency = '$', rating, reviews, badge, cta, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('group/card relative flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-2xl p-4 text-fg transition-transform', surfaceVariants[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ProductMedia, { src: image, alt: typeof title === 'string' ? title : undefined, badge: badge }), jsxRuntimeExports.jsxs(ProductBody, { children: [title ? jsxRuntimeExports.jsx(ProductTitle, { children: title }) : null, typeof rating === 'number' ? (jsxRuntimeExports.jsx(ProductRating, { value: rating, reviews: reviews })) : null, price != null ? (jsxRuntimeExports.jsx(ProductPrice, { amount: price, originalPrice: originalPrice, currency: currency })) : null, cta ? jsxRuntimeExports.jsx(ProductAction, { children: cta }) : null] })] })) }) }));
});
const ProductMedia = forwardRef(function ProductCardMedia({ src, alt, badge, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-edge/10 bg-canvas/40', className, tw), ...rest, children: [children ??
                (src ? (jsxRuntimeExports.jsx("img", { src: src, alt: alt ?? '', className: "h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105" })) : (jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-fg-subtle", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-10 w-10", children: jsxRuntimeExports.jsx("path", { d: "M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 16l4.5-4.5a2 2 0 012.8 0L15 16M14 13l1.5-1.5a2 2 0 012.8 0L21 14M9 9.5a1 1 0 11-2 0 1 1 0 012 0z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }))), badge ? (jsxRuntimeExports.jsx(Badge, { tw: "absolute left-3 top-3 border border-primary/20 bg-primary/15 text-primary backdrop-blur-sm", children: badge })) : null] }));
});
/* ----------------------------------- Body --------------------------------- */
const ProductBody = forwardRef(function ProductCardBody({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-1 flex-col gap-2.5', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Title -------------------------------- */
const ProductTitle = forwardRef(function ProductCardTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h3", { ref: ref, className: mergeTw('font-display text-base font-semibold leading-snug text-fg', className, tw), ...rest, children: children }));
});
function Star$2({ fill }) {
    const id = React.useId();
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", "aria-hidden": "true", className: "h-4 w-4 text-primary", children: [fill === 'half' ? (jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsxs("linearGradient", { id: id, children: [jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor" }), jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor", stopOpacity: "0.25" })] }) })) : null, jsxRuntimeExports.jsx("path", { d: "M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z", fill: fill === 'full' ? 'currentColor' : fill === 'half' ? `url(#${id})` : 'currentColor', fillOpacity: fill === 'empty' ? 0.25 : 1 })] }));
}
const ProductRating = forwardRef(function ProductCardRating({ value = 0, reviews, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex items-center gap-2 text-sm', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }, (_, i) => {
                        const fill = value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'empty';
                        return jsxRuntimeExports.jsx(Star$2, { fill: fill }, i);
                    }) }), jsxRuntimeExports.jsx("span", { className: "font-medium text-fg-muted", children: value.toFixed(1) }), typeof reviews === 'number' ? (jsxRuntimeExports.jsxs("span", { className: "text-fg-subtle", children: ["(", reviews, ")"] })) : null] })) }));
});
function formatPrice$1(amount, currency) {
    if (amount == null)
        return null;
    return typeof amount === 'number' ? `${currency}${amount}` : amount;
}
const ProductPrice = forwardRef(function ProductCardPrice({ amount, originalPrice, currency = '$', children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-auto flex items-baseline gap-2 pt-1', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold tracking-tight text-fg", children: formatPrice$1(amount, currency) }), originalPrice != null ? (jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-fg-subtle line-through", children: formatPrice$1(originalPrice, currency) })) : null] })) }));
});
const ProductAction = forwardRef(function ProductCardAction({ tone, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const resolved = tone ?? (variant === 'feature' || variant === 'gradient' ? 'accent' : 'ghost');
    return (jsxRuntimeExports.jsx(Button, { ref: ref, fullWidth: true, intent: "ghost", tw: mergeTw('mt-2 rounded-xl', resolved === 'accent' ? accentSolid : ghostControl, className, tw), ...rest, children: children }));
});
const ProductCard = ProductCardRoot;
ProductCard.Media = ProductMedia;
ProductCard.Body = ProductBody;
ProductCard.Title = ProductTitle;
ProductCard.Rating = ProductRating;
ProductCard.Price = ProductPrice;
ProductCard.Action = ProductAction;

/* ---------------------------------- Root ---------------------------------- */
const StatCardRoot = forwardRef(function StatCard({ variant = 'elevated', className, tw, children, label, value, delta, deltaDirection = 'up', icon, hint, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative flex w-full max-w-sm flex-col gap-1 rounded-2xl p-5 text-fg transition-transform', surfaceVariants[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [label ? jsxRuntimeExports.jsx(StatLabel, { children: label }) : null, icon ? jsxRuntimeExports.jsx(StatIcon, { children: icon }) : null] }), value != null ? jsxRuntimeExports.jsx(StatValue, { children: value }) : null, delta != null || hint != null ? (jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [delta != null ? (jsxRuntimeExports.jsx(StatDelta, { direction: deltaDirection, children: delta })) : null, hint != null ? jsxRuntimeExports.jsx(StatHint, { children: hint }) : null] })) : null] })) }) }));
});
/* ----------------------------------- Icon --------------------------------- */
const StatIcon = forwardRef(function StatCardIcon({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const accented = variant === 'feature' || variant === 'gradient';
    return (jsxRuntimeExports.jsx("span", { ref: ref, className: mergeTw('grid h-9 w-9 shrink-0 place-items-center rounded-xl [&>svg]:h-[18px] [&>svg]:w-[18px]', accented
            ? 'border border-primary/20 bg-primary/10 text-primary'
            : 'border border-edge/10 bg-fg/[0.04] text-fg-muted', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Label -------------------------------- */
const StatLabel = forwardRef(function StatCardLabel({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("span", { ref: ref, className: mergeTw('text-xs font-medium uppercase tracking-wider text-fg-subtle', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Value -------------------------------- */
const StatValue = forwardRef(function StatCardValue({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-3 font-display text-3xl font-semibold tracking-tight', variant === 'feature' || variant === 'gradient' ? 'text-primary' : 'text-fg', className, tw), ...rest, children: children }));
});
const StatDelta = forwardRef(function StatCardDelta({ direction = 'up', children, className, tw, ...rest }, ref) {
    const up = direction !== 'down';
    return (jsxRuntimeExports.jsxs("span", { ref: ref, className: mergeTw('inline-flex items-center gap-1 text-xs font-medium', up ? 'text-success-500' : 'text-danger-500', className, tw), ...rest, children: [jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: up ? '-rotate-45' : 'rotate-45', children: jsxRuntimeExports.jsx("path", { d: "M5 12h14M13 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }) }), children] }));
});
/* ----------------------------------- Hint --------------------------------- */
const StatHint = forwardRef(function StatCardHint({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("span", { ref: ref, className: mergeTw('text-xs text-fg-subtle', className, tw), ...rest, children: children }));
});
const StatCard = StatCardRoot;
StatCard.Icon = StatIcon;
StatCard.Label = StatLabel;
StatCard.Value = StatValue;
StatCard.Delta = StatDelta;
StatCard.Hint = StatHint;

/** Derive up-to-2-letter initials from a name for the avatar fallback. */
function initialsFrom$2(name) {
    if (typeof name !== 'string')
        return '';
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}
/* ---------------------------------- Root ---------------------------------- */
const ProfileCardRoot = forwardRef(function ProfileCard({ variant = 'elevated', className, tw, children, name, role, avatar, bio, socials, cta, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('group/card relative flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl p-6 text-center text-fg transition-transform', surfaceVariants[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(ProfileAvatar, { src: avatar, children: initialsFrom$2(name) }), name ? jsxRuntimeExports.jsx(ProfileName, { children: name }) : null, role ? jsxRuntimeExports.jsx(ProfileRole, { children: role }) : null, bio ? jsxRuntimeExports.jsx(ProfileBio, { children: bio }) : null, socials?.length ? jsxRuntimeExports.jsx(ProfileSocials, { socials: socials }) : null, cta ? jsxRuntimeExports.jsx(ProfileAction, { children: cta }) : null] })) }) }));
});
const ProfileAvatar = forwardRef(function ProfileCardAvatar({ src, alt, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const accented = variant === 'feature' || variant === 'gradient';
    return (jsxRuntimeExports.jsx(Avatar, { ref: ref, size: "xl", tw: mergeTw('ring-2 ring-offset-2 ring-offset-transparent', accented
            ? 'bg-primary/15 text-primary ring-primary/40'
            : 'bg-fg/[0.06] text-fg-muted ring-edge/15', className, tw), ...rest, children: src ? (jsxRuntimeExports.jsx("img", { src: src, alt: alt ?? '', className: "h-full w-full object-cover" })) : (children) }));
});
/* ----------------------------------- Name --------------------------------- */
const ProfileName = forwardRef(function ProfileCardName({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h3", { ref: ref, className: mergeTw('mt-1 font-display text-lg font-semibold leading-tight text-fg', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Role --------------------------------- */
const ProfileRole = forwardRef(function ProfileCardRole({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('text-sm font-medium', variant === 'feature' || variant === 'gradient' ? 'text-primary' : 'text-fg-muted', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Bio ---------------------------------- */
const ProfileBio = forwardRef(function ProfileCardBio({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('text-sm leading-relaxed text-fg-subtle', className, tw), ...rest, children: children }));
});
function SocialIcon({ platform }) {
    const common = {
        viewBox: '0 0 24 24',
        'aria-hidden': true,
        className: 'h-[18px] w-[18px]',
    };
    switch (platform) {
        case 'github':
            return (jsxRuntimeExports.jsx("svg", { ...common, fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0012 2z" }) }));
        case 'twitter':
            return (jsxRuntimeExports.jsx("svg", { ...common, fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M18.9 2.3h3.3l-7.2 8.2L23.7 22h-6.6l-5.2-6.8L5.9 22H2.6l7.7-8.8L1.7 2.3h6.8l4.7 6.2 5.7-6.2zm-1.2 17.7h1.8L7.4 4.2H5.5l12.2 15.8z" }) }));
        case 'linkedin':
            return (jsxRuntimeExports.jsx("svg", { ...common, fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" }) }));
        case 'dribbble':
            return (jsxRuntimeExports.jsxs("svg", { ...common, fill: "none", stroke: "currentColor", strokeWidth: "1.7", children: [jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "9.5" }), jsxRuntimeExports.jsx("path", { d: "M4.5 8.5c5.5.5 11 0 14.5-3M2.7 13.5C9 12 14 14 17 19M9 3c4 5 5.5 11 5 18", strokeLinecap: "round" })] }));
        case 'website':
        default:
            return (jsxRuntimeExports.jsxs("svg", { ...common, fill: "none", stroke: "currentColor", strokeWidth: "1.7", children: [jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "9.5" }), jsxRuntimeExports.jsx("path", { d: "M2.5 12h19M12 2.5c2.8 2.5 4.3 6 4.3 9.5S14.8 19 12 21.5M12 2.5C9.2 5 7.7 8.5 7.7 12s1.5 7 4.3 9.5", strokeLinecap: "round" })] }));
    }
}
const ProfileSocials = forwardRef(function ProfileCardSocials({ socials, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-1 flex items-center justify-center gap-1.5', className, tw), ...rest, children: children ??
            socials?.map((s, i) => (jsxRuntimeExports.jsx("a", { href: s.href, "aria-label": s.label ?? s.platform, className: "grid h-9 w-9 place-items-center rounded-xl border border-edge/12 bg-fg/[0.04] text-fg-muted transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary", children: jsxRuntimeExports.jsx(SocialIcon, { platform: s.platform }) }, `${s.platform}-${i}`))) }));
});
const ProfileAction = forwardRef(function ProfileCardAction({ tone, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const resolved = tone ?? (variant === 'feature' || variant === 'gradient' ? 'accent' : 'ghost');
    return (jsxRuntimeExports.jsx(Button, { ref: ref, fullWidth: true, intent: "ghost", tw: mergeTw('mt-3 rounded-xl', resolved === 'accent' ? accentSolid : ghostControl, className, tw), ...rest, children: children }));
});
const ProfileCard = ProfileCardRoot;
ProfileCard.Avatar = ProfileAvatar;
ProfileCard.Name = ProfileName;
ProfileCard.Role = ProfileRole;
ProfileCard.Bio = ProfileBio;
ProfileCard.Socials = ProfileSocials;
ProfileCard.Action = ProfileAction;

/** Derive up-to-2-letter initials from a name for the avatar fallback. */
function initialsFrom$1(name) {
    if (typeof name !== 'string')
        return '';
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}
/* ---------------------------------- Root ---------------------------------- */
const TestimonialCardRoot = forwardRef(function TestimonialCard({ variant = 'elevated', className, tw, children, quote, name, role, avatar, rating, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('group/card relative flex w-full max-w-sm flex-col gap-4 rounded-2xl p-6 text-fg transition-transform', surfaceVariants[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [typeof rating === 'number' ? jsxRuntimeExports.jsx(TestimonialRating, { value: rating }) : null, quote ? jsxRuntimeExports.jsx(TestimonialQuote, { children: quote }) : null, name ? (jsxRuntimeExports.jsx(TestimonialAuthor, { name: name, role: role, avatar: avatar })) : null] })) }) }));
});
function Star$1({ fill }) {
    const id = React.useId();
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", "aria-hidden": "true", className: "h-[18px] w-[18px] text-primary", children: [fill === 'half' ? (jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsxs("linearGradient", { id: id, children: [jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor" }), jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor", stopOpacity: "0.25" })] }) })) : null, jsxRuntimeExports.jsx("path", { d: "M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z", fill: fill === 'full' ? 'currentColor' : fill === 'half' ? `url(#${id})` : 'currentColor', fillOpacity: fill === 'empty' ? 0.25 : 1 })] }));
}
const TestimonialRating = forwardRef(function TestimonialCardRating({ value = 0, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex items-center gap-0.5', className, tw), "aria-label": `${value} out of 5 stars`, ...rest, children: children ??
            Array.from({ length: 5 }, (_, i) => {
                const fill = value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'empty';
                return jsxRuntimeExports.jsx(Star$1, { fill: fill }, i);
            }) }));
});
/* ----------------------------------- Quote -------------------------------- */
const TestimonialQuote = forwardRef(function TestimonialCardQuote({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("blockquote", { ref: ref, className: mergeTw('relative flex-1 font-display text-lg font-medium leading-relaxed text-fg', className, tw), ...rest, children: [jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: "mb-2 h-7 w-7 text-primary/40", fill: "currentColor", children: jsxRuntimeExports.jsx("path", { d: "M9.5 6C6.5 7.6 4.8 10.4 4.8 14v4h5.4v-5.4H7.6c.1-2 1-3.4 2.9-4.4L9.5 6zm9 0c-3 1.6-4.7 4.4-4.7 8v4h5.4v-5.4h-2.6c.1-2 1-3.4 2.9-4.4L18.5 6z" }) }), children] }));
});
const TestimonialAuthor = forwardRef(function TestimonialCardAuthor({ name, role, avatar, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const accented = variant === 'feature' || variant === 'gradient';
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-2 flex items-center gap-3 border-t border-edge/10 pt-4', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Avatar, { size: "md", tw: accented
                        ? 'bg-primary/15 text-primary'
                        : 'bg-fg/[0.06] text-fg-muted', children: avatar ? (jsxRuntimeExports.jsx("img", { src: avatar, alt: typeof name === 'string' ? name : '', className: "h-full w-full object-cover" })) : (initialsFrom$1(name)) }), jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col", children: [jsxRuntimeExports.jsx("span", { className: "truncate font-display text-sm font-semibold text-fg", children: name }), role ? (jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-fg-subtle", children: role })) : null] })] })) }));
});
const TestimonialCard = TestimonialCardRoot;
TestimonialCard.Rating = TestimonialRating;
TestimonialCard.Quote = TestimonialQuote;
TestimonialCard.Author = TestimonialAuthor;

/** Derive up-to-2-letter initials from a name for the avatar fallback. */
function initialsFrom(name) {
    if (typeof name !== 'string')
        return '';
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}
/* ---------------------------------- Root ---------------------------------- */
const BlogCardRoot = forwardRef(function BlogCard({ variant = 'elevated', className, tw, children, image, category, title, excerpt, author, authorAvatar, date, readTime, href, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('group/card relative flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-2xl p-4 text-fg transition-transform', surfaceVariants[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(BlogMedia, { src: image, alt: typeof title === 'string' ? title : undefined }), jsxRuntimeExports.jsxs(BlogBody, { children: [category ? jsxRuntimeExports.jsx(BlogCategory, { children: category }) : null, title ? jsxRuntimeExports.jsx(BlogTitle, { href: href, children: title }) : null, excerpt ? jsxRuntimeExports.jsx(BlogExcerpt, { children: excerpt }) : null, author || date || readTime ? (jsxRuntimeExports.jsx(BlogMeta, { author: author, authorAvatar: authorAvatar, date: date, readTime: readTime })) : null] })] })) }) }));
});
const BlogMedia = forwardRef(function BlogCardMedia({ src, alt, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-edge/10 bg-canvas/40', className, tw), ...rest, children: children ??
            (src ? (jsxRuntimeExports.jsx("img", { src: src, alt: alt ?? '', className: "h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105" })) : (jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-fg-subtle", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-10 w-10", children: jsxRuntimeExports.jsx("path", { d: "M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 16l4.5-4.5a2 2 0 012.8 0L15 16M14 13l1.5-1.5a2 2 0 012.8 0L21 14M9 9.5a1 1 0 11-2 0 1 1 0 012 0z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }))) }));
});
/* ----------------------------------- Body --------------------------------- */
const BlogBody = forwardRef(function BlogCardBody({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-1 flex-col gap-2.5 px-1', className, tw), ...rest, children: children }));
});
/* --------------------------------- Category ------------------------------- */
const BlogCategory = forwardRef(function BlogCardCategory({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Badge, { ref: ref, tw: mergeTw('w-fit uppercase tracking-wider', accentSoft, className, tw), ...rest, children: children }));
});
const BlogTitle = forwardRef(function BlogCardTitle({ href, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h3", { ref: ref, className: mergeTw('font-display text-lg font-semibold leading-snug text-fg', className, tw), ...rest, children: href ? (jsxRuntimeExports.jsx("a", { href: href, className: "transition-colors before:absolute before:inset-0 hover:text-primary", children: children })) : (children) }));
});
/* ---------------------------------- Excerpt ------------------------------- */
const BlogExcerpt = forwardRef(function BlogCardExcerpt({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('text-sm leading-relaxed text-fg-muted', className, tw), ...rest, children: children }));
});
const BlogMeta = forwardRef(function BlogCardMeta({ author, authorAvatar, date, readTime, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-auto flex items-center gap-2.5 border-t border-edge/10 pt-3 text-xs text-fg-subtle', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [author ? (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx(Avatar, { size: "xs", tw: "bg-fg/[0.06] text-fg-muted", children: authorAvatar ? (jsxRuntimeExports.jsx("img", { src: authorAvatar, alt: typeof author === 'string' ? author : '', className: "h-full w-full object-cover" })) : (initialsFrom(author)) }), jsxRuntimeExports.jsx("span", { className: "font-medium text-fg-muted", children: author })] })) : null, (author && (date || readTime)) ? (jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-fg-subtle/60", children: "\u00B7" })) : null, date ? jsxRuntimeExports.jsx("span", { children: date }) : null, date && readTime ? (jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-fg-subtle/60", children: "\u00B7" })) : null, readTime ? jsxRuntimeExports.jsx("span", { children: readTime }) : null] })) }));
});
const BlogCard = BlogCardRoot;
BlogCard.Media = BlogMedia;
BlogCard.Body = BlogBody;
BlogCard.Category = BlogCategory;
BlogCard.Title = BlogTitle;
BlogCard.Excerpt = BlogExcerpt;
BlogCard.Meta = BlogMeta;

const HERO_VARIANTS = [
    'split',
    'centered',
    'imageRight',
    'gradient',
    'glass',
    'video',
];
/* Hero broadcasts its layout variant to sub-parts so they self-arrange. */
const HeroVariantContext = createContext('split');
const useHeroVariant = () => useContext(HeroVariantContext);
const centeredVariant = (v) => v === 'centered' || v === 'gradient' || v === 'glass' || v === 'video';
const hasMedia = (v) => v === 'split' || v === 'imageRight' || v === 'video';
/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface$5 = {
    split: 'bg-canvas',
    centered: 'bg-canvas',
    imageRight: 'bg-canvas',
    gradient: 'bg-gradient-to-br from-primary/12 via-canvas to-accent2/12',
    glass: 'bg-canvas',
    video: 'bg-canvas',
};
/* ---------------------------------- Root ---------------------------------- */
const HeroRoot = forwardRef(function Hero({ variant = 'split', className, tw, children, eyebrow, title, subtitle, primaryCta, secondaryCta, image, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const centered = centeredVariant(variant);
    const withMedia = hasMedia(variant);
    return (jsxRuntimeExports.jsx(HeroVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: "elevated", children: jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw('relative w-full overflow-hidden text-fg', sectionSurface$5[variant], variant === 'glass' && 'mesh', className, tw), ...rest, children: [(variant === 'gradient' || variant === 'glass' || variant === 'centered') && (jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" })), jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28", children: hasChildren ? (centered ? (jsxRuntimeExports.jsx("div", { className: "mx-auto flex max-w-3xl flex-col items-center gap-6 text-center", children: children })) : (jsxRuntimeExports.jsx("div", { className: "grid items-center gap-12 lg:grid-cols-2", children: children }))) : centered ? (jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-3xl flex-col items-center gap-6 text-center", children: [eyebrow ? jsxRuntimeExports.jsx(HeroEyebrow, { children: eyebrow }) : null, title ? jsxRuntimeExports.jsx(HeroTitle, { children: title }) : null, subtitle ? jsxRuntimeExports.jsx(HeroSubtitle, { children: subtitle }) : null, jsxRuntimeExports.jsx(HeroActions, { primaryCta: primaryCta, secondaryCta: secondaryCta }), variant === 'video' ? jsxRuntimeExports.jsx(HeroMedia, { image: image }) : null] })) : (jsxRuntimeExports.jsxs("div", { className: mergeTw('grid items-center gap-12 lg:grid-cols-2', variant === 'imageRight' && 'lg:[&>*:first-child]:order-1'), children: [jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-6", children: [eyebrow ? jsxRuntimeExports.jsx(HeroEyebrow, { children: eyebrow }) : null, title ? jsxRuntimeExports.jsx(HeroTitle, { children: title }) : null, subtitle ? jsxRuntimeExports.jsx(HeroSubtitle, { children: subtitle }) : null, jsxRuntimeExports.jsx(HeroActions, { primaryCta: primaryCta, secondaryCta: secondaryCta })] }), withMedia ? jsxRuntimeExports.jsx(HeroMedia, { image: image }) : null] })) })] }) }) }));
});
const HeroEyebrow = forwardRef(function HeroEyebrow({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Badge, { ref: ref, tw: mergeTw('gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20', className, tw), ...rest, children: children }));
});
/* ---------------------------------- Title --------------------------------- */
const HeroTitle = forwardRef(function HeroTitle({ children, className, tw, ...rest }, ref) {
    const variant = useHeroVariant();
    return (jsxRuntimeExports.jsx("h1", { ref: ref, className: mergeTw('font-display text-4xl font-light leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl', (variant === 'gradient' || variant === 'glass') && 'text-balance', className, tw), ...rest, children: children }));
});
/* -------------------------------- Subtitle -------------------------------- */
const HeroSubtitle = forwardRef(function HeroSubtitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('max-w-xl text-lg leading-relaxed text-fg-muted', className, tw), ...rest, children: children }));
});
function ArrowIcon$1() {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: "h-4 w-4", children: jsxRuntimeExports.jsx("path", { d: "M4 10h11m0 0-4-4m4 4-4 4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
function ctaLabel$1(cta) {
    if (cta && typeof cta === 'object' && 'label' in cta) {
        return cta.label;
    }
    return cta;
}
const HeroActions = forwardRef(function HeroActions({ primaryCta, secondaryCta, children, className, tw, ...rest }, ref) {
    const variant = useHeroVariant();
    const centered = centeredVariant(variant);
    const primary = ctaLabel$1(primaryCta);
    const secondary = ctaLabel$1(secondaryCta);
    if (!children && !primary && !secondary)
        return null;
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-2 flex flex-col gap-3 sm:flex-row', centered && 'justify-center', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [primary ? (jsxRuntimeExports.jsxs(Button, { size: "lg", intent: "ghost", tw: mergeTw('group rounded-xl', accentSolid), children: [primary, jsxRuntimeExports.jsx(ArrowIcon$1, {})] })) : null, secondary ? (jsxRuntimeExports.jsx(Button, { size: "lg", intent: "ghost", tw: mergeTw('rounded-xl', ghostControl), children: secondary })) : null] })) }));
});
const HeroMedia = forwardRef(function HeroMedia({ image, children, className, tw, ...rest }, ref) {
    const variant = useHeroVariant();
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative w-full overflow-hidden rounded-2xl border border-edge/12 bg-elevated shadow-luxe', variant === 'video' ? 'aspect-video' : 'aspect-[4/3]', className, tw), ...rest, children: children ??
            (image ? (jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "h-full w-full object-cover" })) : (jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/10 via-panel/40 to-accent2/10", children: variant === 'video' ? (jsxRuntimeExports.jsx("span", { className: "grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-fg shadow-accent", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: "ml-1 h-6 w-6", children: jsxRuntimeExports.jsx("path", { d: "M8 5v14l11-7z" }) }) })) : (jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] uppercase tracking-[0.28em] text-fg-subtle", children: "Preview" })) }))) }));
});
const Hero = HeroRoot;
Hero.Eyebrow = HeroEyebrow;
Hero.Title = HeroTitle;
Hero.Subtitle = HeroSubtitle;
Hero.Actions = HeroActions;
Hero.Media = HeroMedia;

const FEATURE_GRID_VARIANTS = [
    'grid3',
    'grid2',
    'alternating',
    'iconLeft',
    'bordered',
    'spotlight',
];
/* FeatureGrid broadcasts its layout variant so sub-parts self-arrange. */
const FeatureGridVariantContext = createContext('grid3');
const useFeatureGridVariant = () => useContext(FeatureGridVariantContext);
/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface$4 = {
    grid3: 'bg-canvas',
    grid2: 'bg-canvas',
    alternating: 'bg-canvas',
    iconLeft: 'bg-canvas',
    bordered: 'bg-canvas',
    spotlight: 'bg-gradient-to-b from-primary/8 via-canvas to-canvas',
};
/* ---------------------------------- Root ---------------------------------- */
const FeatureGridRoot = forwardRef(function FeatureGrid({ variant = 'grid3', className, tw, children, eyebrow, title, subtitle, features, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(FeatureGridVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw('relative w-full overflow-hidden text-fg', sectionSurface$4[variant], className, tw), ...rest, children: [variant === 'spotlight' && (jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" })), jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28", children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [(eyebrow || title || subtitle) && (jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center", children: [eyebrow ? (jsxRuntimeExports.jsx(FeatureGridEyebrow, { children: eyebrow })) : null, title ? jsxRuntimeExports.jsx(FeatureGridTitle, { children: title }) : null, subtitle ? (jsxRuntimeExports.jsx(FeatureGridSubtitle, { children: subtitle })) : null] })), features?.length ? (jsxRuntimeExports.jsx(FeatureGridItems, { items: features, className: eyebrow || title || subtitle ? 'mt-16' : undefined })) : null] })) })] }) }));
});
/* --------------------------------- Eyebrow -------------------------------- */
const FeatureGridEyebrow = forwardRef(function FeatureGridEyebrow({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Badge, { ref: ref, tw: mergeTw('gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20', className, tw), ...rest, children: children }));
});
/* ---------------------------------- Title --------------------------------- */
const FeatureGridTitle = forwardRef(function FeatureGridTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h2", { ref: ref, className: mergeTw('font-display text-3xl font-light leading-tight tracking-tight text-fg text-balance sm:text-4xl', className, tw), ...rest, children: children }));
});
/* -------------------------------- Subtitle -------------------------------- */
const FeatureGridSubtitle = forwardRef(function FeatureGridSubtitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('max-w-xl text-lg leading-relaxed text-fg-muted', className, tw), ...rest, children: children }));
});
const columnsFor = {
    grid3: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
    grid2: 'grid gap-6 sm:grid-cols-2',
    alternating: 'flex flex-col gap-6',
    iconLeft: 'grid gap-6 sm:grid-cols-2',
    bordered: 'grid gap-px overflow-hidden rounded-2xl border border-edge/12 bg-edge/10 sm:grid-cols-2 lg:grid-cols-3',
    spotlight: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
};
const FeatureGridItems = forwardRef(function FeatureGridItems({ items, children, className, tw, ...rest }, ref) {
    const variant = useFeatureGridVariant();
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw(columnsFor[variant], className, tw), ...rest, children: children ??
            items?.map((feature, i) => (jsxRuntimeExports.jsx(FeatureItem, { ...feature }, i))) }));
});
/* ------------------------------- Feature item ----------------------------- */
function DefaultFeatureIcon() {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-5 w-5", children: jsxRuntimeExports.jsx("path", { d: "m12 3 2.3 4.66 5.14.75-3.72 3.63.88 5.12L12 14.85l-4.6 2.42.88-5.12-3.72-3.63 5.14-.75L12 3Z", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
const FeatureItem = forwardRef(function FeatureItem({ icon, title, description, children, className, tw, ...rest }, ref) {
    const variant = useFeatureGridVariant();
    const horizontal = variant === 'iconLeft' || variant === 'alternating';
    /* The bordered variant uses hairline-separated cells; others use cards. */
    const cellSurface = variant === 'bordered'
        ? 'bg-canvas'
        : variant === 'spotlight'
            ? surfaceVariants.elevated
            : surfaceVariants.bordered;
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('group relative flex gap-4 rounded-2xl p-6 text-fg transition-colors', variant === 'bordered' && 'rounded-none', horizontal ? 'flex-row items-start' : 'flex-col', cellSurface, variant === 'spotlight' && 'hover:border-primary/30 hover:ring-1 hover:ring-primary/20', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15", children: icon ?? jsxRuntimeExports.jsx(DefaultFeatureIcon, {}) }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-fg", children: title }), jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-fg-muted", children: description })] })] })) }));
});
const FeatureGrid = FeatureGridRoot;
FeatureGrid.Eyebrow = FeatureGridEyebrow;
FeatureGrid.Title = FeatureGridTitle;
FeatureGrid.Subtitle = FeatureGridSubtitle;
FeatureGrid.Items = FeatureGridItems;
FeatureGrid.Item = FeatureItem;

const PRICING_TABLE_VARIANTS = [
    'cards',
    'comparison',
    'toggle',
    'twoTier',
    'glass',
    'gradient',
];
/* PricingTable broadcasts its layout variant so sub-parts self-arrange. */
const PricingTableVariantContext = createContext('cards');
const usePricingTableVariant = () => useContext(PricingTableVariantContext);
/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface$3 = {
    cards: 'bg-canvas',
    comparison: 'bg-canvas',
    toggle: 'bg-canvas',
    twoTier: 'bg-canvas',
    glass: 'mesh bg-canvas',
    gradient: 'bg-gradient-to-b from-primary/8 via-canvas to-accent2/8',
};
/** Map the section variant to the per-card BlockVariant surface. */
const cardVariantFor = {
    cards: 'elevated',
    comparison: 'bordered',
    toggle: 'elevated',
    twoTier: 'elevated',
    glass: 'glass',
    gradient: 'gradient',
};
/* ---------------------------------- Root ---------------------------------- */
const PricingTableRoot = forwardRef(function PricingTable({ variant = 'cards', className, tw, children, eyebrow, title, tiers, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(PricingTableVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: "elevated", children: jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw('relative w-full overflow-hidden text-fg', sectionSurface$3[variant], className, tw), ...rest, children: [(variant === 'glass' || variant === 'gradient') && (jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" })), jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28", children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [(eyebrow || title) && (jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center", children: [eyebrow ? (jsxRuntimeExports.jsx(PricingTableEyebrow, { children: eyebrow })) : null, title ? (jsxRuntimeExports.jsx(PricingTableTitle, { children: title })) : null] })), tiers?.length ? (jsxRuntimeExports.jsx(PricingTableTiers, { tiers: tiers, className: eyebrow || title ? 'mt-14' : undefined })) : null] })) })] }) }) }));
});
/* --------------------------------- Eyebrow -------------------------------- */
const PricingTableEyebrow = forwardRef(function PricingTableEyebrow({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Badge, { ref: ref, tw: mergeTw('gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20', className, tw), ...rest, children: children }));
});
/* ---------------------------------- Title --------------------------------- */
const PricingTableTitle = forwardRef(function PricingTableTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h2", { ref: ref, className: mergeTw('font-display text-3xl font-light leading-tight tracking-tight text-fg text-balance sm:text-4xl', className, tw), ...rest, children: children }));
});
const PricingTableTiers = forwardRef(function PricingTableTiers({ tiers, children, className, tw, ...rest }, ref) {
    const variant = usePricingTableVariant();
    const [annual, setAnnual] = useState(false);
    const cardVariant = cardVariantFor[variant];
    /* Layout: twoTier centers a duo; everything else flows a responsive row. */
    const cols = variant === 'twoTier'
        ? 'mx-auto grid max-w-3xl gap-6 sm:grid-cols-2'
        : 'grid items-stretch gap-6 md:grid-cols-3';
    const resolvedTiers = useMemo(() => (tiers ?? []).map((tier) => {
        const { annualPrice, variant: tierVariant, highlighted, ...cardProps } = tier;
        const price = variant === 'toggle' && annual && annualPrice !== undefined
            ? annualPrice
            : cardProps.price;
        return {
            ...cardProps,
            price,
            period: variant === 'toggle'
                ? annual
                    ? '/mo, billed yearly'
                    : '/mo'
                : cardProps.period,
            variant: tierVariant ?? (highlighted ? 'feature' : cardVariant),
            highlighted,
        };
    }), [tiers, variant, annual, cardVariant]);
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('flex flex-col gap-10', className, tw), ...rest, children: [variant === 'toggle' && !children ? (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 text-sm", children: [jsxRuntimeExports.jsx("span", { className: mergeTw(!annual ? 'text-fg' : 'text-fg-subtle'), children: "Monthly" }), jsxRuntimeExports.jsx(Toggle, { checked: annual, onChange: (e) => setAnnual(e.currentTarget.checked), "aria-label": "Bill annually" }), jsxRuntimeExports.jsx("span", { className: mergeTw(annual ? 'text-fg' : 'text-fg-subtle'), children: "Annual" }), jsxRuntimeExports.jsx("span", { className: mergeTw('ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/20'), children: "Save 20%" })] })) : null, jsxRuntimeExports.jsx("div", { className: cols, children: children ??
                    resolvedTiers.map((tier, i) => (jsxRuntimeExports.jsx(PricingCard, { tw: "max-w-none", ...tier }, i))) })] }));
});
const PricingTable = PricingTableRoot;
PricingTable.Eyebrow = PricingTableEyebrow;
PricingTable.Title = PricingTableTitle;
PricingTable.Tiers = PricingTableTiers;

const CTA_SECTION_VARIANTS = [
    'simple',
    'centered',
    'split',
    'gradient',
    'glass',
    'card',
];
/* CTASection broadcasts its layout variant so sub-parts self-arrange. */
const CTASectionVariantContext = createContext('simple');
const useCTASectionVariant = () => useContext(CTASectionVariantContext);
const isSplit$1 = (v) => v === 'split';
const isCentered = (v) => v !== 'split';
/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface$2 = {
    simple: 'bg-canvas',
    centered: 'bg-canvas',
    split: 'bg-canvas',
    gradient: 'bg-gradient-to-br from-primary/14 via-canvas to-accent2/14',
    glass: 'bg-canvas',
    card: 'bg-canvas',
};
/* Inner panel surface for the panel-bearing variants. */
const innerSurface = {
    glass: mergeTw(surfaceVariants.glass, 'rounded-3xl'),
    card: mergeTw(surfaceVariants.elevated, 'rounded-3xl shadow-luxe'),
};
/* ---------------------------------- Root ---------------------------------- */
const CTASectionRoot = forwardRef(function CTASection({ variant = 'simple', className, tw, children, title, subtitle, primaryCta, secondaryCta, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const split = isSplit$1(variant);
    const inner = innerSurface[variant];
    const body = hasChildren ? (children) : split ? (jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-[1fr_auto]", children: [jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-3", children: [title ? jsxRuntimeExports.jsx(CTASectionTitle, { children: title }) : null, subtitle ? (jsxRuntimeExports.jsx(CTASectionSubtitle, { children: subtitle })) : null] }), jsxRuntimeExports.jsx(CTASectionActions, { primaryCta: primaryCta, secondaryCta: secondaryCta })] })) : (jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-2xl flex-col items-center gap-5 text-center", children: [title ? jsxRuntimeExports.jsx(CTASectionTitle, { children: title }) : null, subtitle ? jsxRuntimeExports.jsx(CTASectionSubtitle, { children: subtitle }) : null, jsxRuntimeExports.jsx(CTASectionActions, { primaryCta: primaryCta, secondaryCta: secondaryCta })] }));
    return (jsxRuntimeExports.jsx(CTASectionVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: "elevated", children: jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw('relative w-full overflow-hidden text-fg', sectionSurface$2[variant], variant === 'glass' && 'mesh', className, tw), ...rest, children: [(variant === 'gradient' || variant === 'glass') && (jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" })), jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24", children: inner ? (jsxRuntimeExports.jsx("div", { className: mergeTw('relative overflow-hidden px-6 py-14 sm:px-12 sm:py-16', inner), children: body })) : (body) })] }) }) }));
});
/* ---------------------------------- Title --------------------------------- */
const CTASectionTitle = forwardRef(function CTASectionTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h2", { ref: ref, className: mergeTw('font-display text-3xl font-light leading-tight tracking-tight text-fg text-balance sm:text-4xl', className, tw), ...rest, children: children }));
});
/* -------------------------------- Subtitle -------------------------------- */
const CTASectionSubtitle = forwardRef(function CTASectionSubtitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('max-w-xl text-lg leading-relaxed text-fg-muted', className, tw), ...rest, children: children }));
});
function ArrowIcon() {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: "h-4 w-4", children: jsxRuntimeExports.jsx("path", { d: "M4 10h11m0 0-4-4m4 4-4 4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
function ctaLabel(cta) {
    if (cta && typeof cta === 'object' && 'label' in cta) {
        return cta.label;
    }
    return cta;
}
const CTASectionActions = forwardRef(function CTASectionActions({ primaryCta, secondaryCta, children, className, tw, ...rest }, ref) {
    const variant = useCTASectionVariant();
    const centered = isCentered(variant);
    const primary = ctaLabel(primaryCta);
    const secondary = ctaLabel(secondaryCta);
    if (!children && !primary && !secondary)
        return null;
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-3 sm:flex-row', centered && 'justify-center', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [primary ? (jsxRuntimeExports.jsxs(Button, { size: "lg", intent: "ghost", tw: mergeTw('group rounded-xl', accentSolid), children: [primary, jsxRuntimeExports.jsx(ArrowIcon, {})] })) : null, secondary ? (jsxRuntimeExports.jsx(Button, { size: "lg", intent: "ghost", tw: mergeTw('rounded-xl', ghostControl), children: secondary })) : null] })) }));
});
const CTASection = CTASectionRoot;
CTASection.Title = CTASectionTitle;
CTASection.Subtitle = CTASectionSubtitle;
CTASection.Actions = CTASectionActions;

const FAQ_VARIANTS = [
    'accordion',
    'twoColumn',
    'bordered',
    'cards',
    'centered',
    'split',
];
/* FAQ broadcasts its layout variant so sub-parts self-arrange. */
const FAQVariantContext = createContext('accordion');
const useFAQVariant = () => useContext(FAQVariantContext);
const isSplit = (v) => v === 'split';
/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface$1 = {
    accordion: 'bg-canvas',
    twoColumn: 'bg-canvas',
    bordered: 'bg-canvas',
    cards: 'bg-canvas',
    centered: 'bg-canvas',
    split: 'bg-canvas',
};
/* ---------------------------------- Root ---------------------------------- */
const FAQRoot = forwardRef(function FAQ({ variant = 'accordion', className, tw, children, eyebrow, title, items, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const split = isSplit(variant);
    const centered = variant === 'centered';
    const header = eyebrow || title ? (jsxRuntimeExports.jsxs("div", { className: mergeTw('flex flex-col gap-4', centered && 'mx-auto max-w-2xl items-center text-center', split ? 'lg:sticky lg:top-24' : !centered && 'max-w-2xl'), children: [eyebrow ? jsxRuntimeExports.jsx(FAQEyebrow, { children: eyebrow }) : null, title ? jsxRuntimeExports.jsx(FAQTitle, { children: title }) : null] })) : null;
    return (jsxRuntimeExports.jsx(FAQVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("section", { ref: ref, className: mergeTw('relative w-full overflow-hidden text-fg', sectionSurface$1[variant], className, tw), ...rest, children: jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28", children: hasChildren ? (children) : split ? (jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr]", children: [header, items?.length ? jsxRuntimeExports.jsx(FAQItems, { items: items }) : null] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [header, items?.length ? (jsxRuntimeExports.jsx(FAQItems, { items: items, className: header ? 'mt-12' : undefined })) : null] })) }) }) }));
});
/* --------------------------------- Eyebrow -------------------------------- */
const FAQEyebrow = forwardRef(function FAQEyebrow({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Badge, { ref: ref, tw: mergeTw('gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20', className, tw), ...rest, children: children }));
});
/* ---------------------------------- Title --------------------------------- */
const FAQTitle = forwardRef(function FAQTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h2", { ref: ref, className: mergeTw('font-display text-3xl font-light leading-tight tracking-tight text-fg text-balance sm:text-4xl', className, tw), ...rest, children: children }));
});
/* Per-variant wrapper layout around the accordion(s). */
const itemsLayout = {
    accordion: 'mx-auto max-w-3xl',
    twoColumn: 'grid gap-x-12 gap-y-2 md:grid-cols-2',
    bordered: 'mx-auto max-w-3xl divide-y divide-edge/12 rounded-2xl border border-edge/12',
    cards: 'grid gap-4 md:grid-cols-2',
    centered: 'mx-auto max-w-3xl',
    split: 'min-w-0',
};
/* Restyle the Accordion's light defaults onto theme tokens. */
const triggerTw = 'py-5 text-base text-fg hover:text-primary focus-visible:ring-primary/40';
const contentTw = 'text-sm leading-relaxed text-fg-muted';
const FAQItems = forwardRef(function FAQItems({ items, children, className, tw, ...rest }, ref) {
    const variant = useFAQVariant();
    const cards = variant === 'cards';
    if (children) {
        return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw(itemsLayout[variant], className, tw), ...rest, children: children }));
    }
    /* `cards` renders each Q&A as its own surface card with a mini accordion. */
    if (cards) {
        return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw(itemsLayout[variant], className, tw), ...rest, children: items?.map((item, i) => (jsxRuntimeExports.jsx(Accordion.Root, { type: "single", collapsible: true, tw: mergeTw('rounded-2xl px-5 divide-y-0', surfaceVariants.bordered), children: jsxRuntimeExports.jsxs(Accordion.Item, { value: `q-${i}`, children: [jsxRuntimeExports.jsx(Accordion.Trigger, { tw: triggerTw, children: item.q }), jsxRuntimeExports.jsx(Accordion.Content, { tw: contentTw, children: item.a })] }) }, i))) }));
    }
    /* Everything else: a single accordion grouping all items. */
    const rowPad = variant === 'bordered' ? 'px-5' : '';
    return (jsxRuntimeExports.jsx(Accordion.Root, { ref: ref, type: "single", collapsible: true, className: mergeTw(itemsLayout[variant], 'divide-edge/12', className, tw), ...rest, children: items?.map((item, i) => (jsxRuntimeExports.jsxs(Accordion.Item, { value: `q-${i}`, tw: rowPad, children: [jsxRuntimeExports.jsx(Accordion.Trigger, { tw: triggerTw, children: item.q }), jsxRuntimeExports.jsx(Accordion.Content, { tw: contentTw, children: item.a })] }, i))) }));
});
const FAQ = FAQRoot;
FAQ.Eyebrow = FAQEyebrow;
FAQ.Title = FAQTitle;
FAQ.Items = FAQItems;

const TESTIMONIALS_VARIANTS = [
    'grid',
    'single',
    'carousel',
    'masonry',
    'logos',
    'gradient',
];
/* Testimonials broadcasts its layout variant so sub-parts self-arrange. */
const TestimonialsVariantContext = createContext('grid');
const useTestimonialsVariant = () => useContext(TestimonialsVariantContext);
/* Section-level surface per layout — all theme-following via tokens. */
const sectionSurface = {
    grid: 'bg-canvas',
    single: 'bg-canvas',
    carousel: 'bg-canvas',
    masonry: 'bg-canvas',
    logos: 'bg-canvas',
    gradient: 'bg-gradient-to-b from-primary/8 via-canvas to-accent2/8',
};
/* ---------------------------------- Root ---------------------------------- */
const TestimonialsRoot = forwardRef(function Testimonials({ variant = 'grid', className, tw, children, eyebrow, title, items, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(TestimonialsVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw('relative w-full overflow-hidden text-fg', sectionSurface[variant], className, tw), ...rest, children: [variant === 'gradient' && (jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" })), jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28", children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [(eyebrow || title) && (jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center", children: [eyebrow ? (jsxRuntimeExports.jsx(TestimonialsEyebrow, { children: eyebrow })) : null, title ? (jsxRuntimeExports.jsx(TestimonialsTitle, { children: title })) : null] })), items?.length ? (jsxRuntimeExports.jsx(TestimonialsItems, { items: items, className: eyebrow || title ? 'mt-14' : undefined })) : null] })) })] }) }));
});
/* --------------------------------- Eyebrow -------------------------------- */
const TestimonialsEyebrow = forwardRef(function TestimonialsEyebrow({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Badge, { ref: ref, tw: mergeTw('gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-primary ring-1 ring-primary/20', className, tw), ...rest, children: children }));
});
/* ---------------------------------- Title --------------------------------- */
const TestimonialsTitle = forwardRef(function TestimonialsTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h2", { ref: ref, className: mergeTw('font-display text-3xl font-light leading-tight tracking-tight text-fg text-balance sm:text-4xl', className, tw), ...rest, children: children }));
});
const layoutFor = {
    grid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
    single: 'mx-auto max-w-3xl',
    carousel: 'scrollbar-luxe -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 [&>*]:w-[320px] [&>*]:shrink-0 [&>*]:snap-start',
    masonry: 'gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid',
    logos: 'grid gap-6 sm:grid-cols-2',
    gradient: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
};
const TestimonialsItems = forwardRef(function TestimonialsItems({ items, children, className, tw, ...rest }, ref) {
    const variant = useTestimonialsVariant();
    /* The `logos` variant pairs a quiet brand strip with featured quotes. */
    if (variant === 'logos' && !children) {
        return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('flex flex-col gap-12', className, tw), ...rest, children: [jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70", children: (items ?? []).map((t, i) => (jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-semibold tracking-tight text-fg-muted", children: t.name }, i))) }), jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2", children: (items ?? []).slice(0, 2).map((t, i) => (jsxRuntimeExports.jsx(TestimonialItem, { ...t }, i))) })] }));
    }
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw(layoutFor[variant], className, tw), ...rest, children: children ??
            items?.map((t, i) => jsxRuntimeExports.jsx(TestimonialItem, { ...t }, i)) }));
});
/* ------------------------------ Stars + item ------------------------------ */
function Stars({ count = 5 }) {
    return (jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-primary", "aria-hidden": "true", children: Array.from({ length: count }).map((_, i) => (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4", children: jsxRuntimeExports.jsx("path", { d: "m10 2 2.39 4.84 5.34.78-3.86 3.77.91 5.32L10 14.98l-4.78 2.51.91-5.32L2.27 7.62l5.34-.78L10 2Z" }) }, i))) }));
}
function initials(name) {
    if (typeof name !== 'string')
        return '';
    return name
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}
const TestimonialItem = forwardRef(function TestimonialItem({ quote, name, role, avatar, children, className, tw, ...rest }, ref) {
    const variant = useTestimonialsVariant();
    const big = variant === 'single';
    const surface = variant === 'gradient'
        ? surfaceVariants.gradient
        : variant === 'single'
            ? surfaceVariants.elevated
            : surfaceVariants.bordered;
    return (jsxRuntimeExports.jsx("figure", { ref: ref, className: mergeTw('flex flex-col gap-5 rounded-2xl p-6 text-fg', surface, big && 'items-center p-10 text-center', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Stars, {}), jsxRuntimeExports.jsx("blockquote", { className: mergeTw('leading-relaxed text-fg-muted', big
                        ? 'font-display text-2xl font-light text-fg text-balance'
                        : 'text-[15px]'), children: quote }), jsxRuntimeExports.jsxs("figcaption", { className: mergeTw('mt-auto flex items-center gap-3', big && 'justify-center'), children: [jsxRuntimeExports.jsx(Avatar, { size: big ? 'md' : 'sm', tw: "bg-primary/15 text-primary ring-1 ring-primary/20", children: avatar ? (jsxRuntimeExports.jsx("img", { src: avatar, alt: "", className: "h-full w-full object-cover" })) : (initials(name)) }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-left", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-fg", children: name }), role ? (jsxRuntimeExports.jsx("span", { className: "text-xs text-fg-subtle", children: role })) : null] })] })] })) }));
});
const Testimonials = TestimonialsRoot;
Testimonials.Eyebrow = TestimonialsEyebrow;
Testimonials.Title = TestimonialsTitle;
Testimonials.Items = TestimonialsItems;
Testimonials.Item = TestimonialItem;

const NAVBAR_VARIANTS = [
    'minimal',
    'centered',
    'split',
    'glass',
    'withSearch',
    'mega',
];
/* ─────────────────────────────── Surfaces ──────────────────────────────── */
const surfaces$8 = {
    minimal: 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
    centered: 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
    split: 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl',
    glass: 'glass border-b border-edge/10',
    withSearch: 'border-b border-edge/10 bg-elevated/70 backdrop-blur-xl',
    mega: 'border-b border-edge/10 bg-canvas/90 backdrop-blur-xl',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function SearchIcon$1({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("circle", { cx: "9", cy: "9", r: "5.5", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("path", { d: "m17 17-3.5-3.5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })] }));
}
function MenuIcon({ className }) {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M4 7h16M4 12h16M4 17h16", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) }));
}
/* ----------------------------------- Root --------------------------------- */
const NavbarRoot = forwardRef(function Navbar({ variant = 'split', className, tw, children, brand, links, actions, ...rest }, ref) {
    const [open, setOpen] = useState(false);
    const hasChildren = React.Children.count(children) > 0;
    const centered = variant === 'centered';
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsxs("header", { ref: ref, className: mergeTw('sticky top-0 z-30 w-full text-fg', surfaces$8[variant], className, tw), ...rest, children: [jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6", children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen((o) => !o), "aria-label": "Toggle menu", "aria-expanded": open, className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge/12 bg-fg/[0.04] text-fg-muted hover:text-fg lg:hidden", children: jsxRuntimeExports.jsx(MenuIcon, { className: "h-5 w-5" }) }), jsxRuntimeExports.jsx(NavbarBrand, { children: brand }), centered ? (jsxRuntimeExports.jsx(NavbarLinks, { links: links, tw: "mx-auto" })) : (jsxRuntimeExports.jsx(NavbarLinks, { links: links })), variant === 'withSearch' ? (jsxRuntimeExports.jsx("div", { className: "ml-auto hidden md:block", children: jsxRuntimeExports.jsx(NavbarSearch, {}) })) : null, jsxRuntimeExports.jsx(NavbarActions, { tw: mergeTw(variant === 'withSearch' ? 'ml-2' : 'ml-auto'), children: actions ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Button, { intent: "ghost", tw: mergeTw('hidden rounded-lg sm:inline-flex', ghostControl), children: "Sign in" }), jsxRuntimeExports.jsx(Button, { intent: "ghost", tw: mergeTw('rounded-lg', accentSolid), children: "Get started" })] })) })] })) }), !hasChildren && open && links?.length ? (jsxRuntimeExports.jsx("div", { className: "border-t border-edge/10 bg-canvas/95 px-5 py-3 lg:hidden", children: jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: links.map((l, i) => (jsxRuntimeExports.jsx("a", { href: l.href ?? '#', onClick: (e) => !l.href && e.preventDefault(), className: mergeTw('rounded-lg px-3 py-2 text-sm transition-colors', l.active ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'), children: l.label }, i))) }) })) : null, !hasChildren && variant === 'mega' ? (jsxRuntimeExports.jsx("div", { className: "hidden border-t border-edge/10 bg-elevated/40 lg:block", children: jsxRuntimeExports.jsx("div", { className: "mx-auto grid w-full max-w-6xl grid-cols-3 gap-6 px-6 py-5", children: [
                            { t: 'Components', d: '60+ accessible primitives' },
                            { t: 'Sections', d: 'Pre-built page chrome' },
                            { t: 'Tokens', d: 'Theme across 4 palettes' },
                        ].map((c) => (jsxRuntimeExports.jsxs("a", { href: "#", onClick: (e) => e.preventDefault(), className: "rounded-xl border border-edge/10 bg-fg/[0.03] p-4 transition hover:border-primary/40", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-fg", children: c.t }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-fg-muted", children: c.d })] }, c.t))) }) })) : null] }) }));
});
/* ----------------------------------- Brand -------------------------------- */
const NavbarBrand = forwardRef(function NavbarBrand({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex shrink-0 items-center gap-2.5', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-fg shadow-accent", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-[18px] w-[18px]", children: jsxRuntimeExports.jsx("path", { d: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z", fill: "currentColor" }) }) }), jsxRuntimeExports.jsx("span", { className: "font-display text-[17px] font-semibold tracking-tight text-fg", children: "comp\u00B7lib" })] })) }));
});
const NavbarLinks = forwardRef(function NavbarLinks({ links, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("nav", { ref: ref, className: mergeTw('hidden items-center gap-1 lg:flex', className, tw), ...rest, children: children ??
            links?.map((l, i) => (jsxRuntimeExports.jsx("a", { href: l.href ?? '#', onClick: (e) => !l.href && e.preventDefault(), "aria-current": l.active ? 'page' : undefined, className: mergeTw('rounded-lg px-3 py-2 text-sm transition-colors', l.active ? 'bg-fg/[0.06] text-fg' : 'text-fg-muted hover:text-fg'), children: l.label }, i))) }));
});
/* ----------------------------------- Search ------------------------------- */
const NavbarSearch = forwardRef(function NavbarSearch({ className, tw }, ref) {
    return (jsxRuntimeExports.jsx(Input, { ref: ref, placeholder: "Search\u2026", "aria-label": "Search", prefix: jsxRuntimeExports.jsx(SearchIcon$1, { className: "h-4 w-4" }), className: className, tw: mergeTw('h-9 w-64 rounded-lg border-edge/15 bg-fg/[0.04] text-fg placeholder:text-fg-subtle', 'focus:border-primary/60 focus:ring-primary/25 focus:ring-offset-0', tw) }));
});
/* ---------------------------------- Actions ------------------------------- */
const NavbarActions = forwardRef(function NavbarActions({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex items-center gap-2.5', className, tw), "data-variant": variant, ...rest, children: children }));
});
const NavbarAvatar = forwardRef(function NavbarAvatar({ initials, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Avatar, { ref: ref, size: "sm", className: className, tw: mergeTw('bg-primary text-primary-fg text-xs font-semibold', tw), ...rest, children: children ?? initials ?? 'AL' }));
});
const Navbar = NavbarRoot;
Navbar.Brand = NavbarBrand;
Navbar.Links = NavbarLinks;
Navbar.Search = NavbarSearch;
Navbar.Actions = NavbarActions;
Navbar.Avatar = NavbarAvatar;

const SIDEBAR_VARIANTS = [
    'minimal',
    'grouped',
    'iconRail',
    'floating',
    'glass',
    'dark',
];
/* ─────────────────────────────── Surfaces ──────────────────────────────── */
const surfaces$7 = {
    minimal: 'border-r border-edge/10 bg-canvas/80 backdrop-blur-xl',
    grouped: 'border-r border-edge/10 bg-panel/70 backdrop-blur-xl',
    iconRail: 'border-r border-edge/10 bg-canvas/80 backdrop-blur-xl',
    floating: 'm-3 rounded-2xl border border-edge/12 bg-elevated shadow-luxe-sm',
    glass: 'glass border-r border-edge/10',
    dark: 'border-r border-edge/10 bg-fg/[0.04] backdrop-blur-xl',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function DefaultItemIcon({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("rect", { x: "3", y: "3", width: "6", height: "6", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("rect", { x: "11", y: "3", width: "6", height: "6", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "6", height: "6", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("rect", { x: "11", y: "11", width: "6", height: "6", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" })] }));
}
/* ----------------------------------- Root --------------------------------- */
const SidebarRoot = forwardRef(function Sidebar({ variant = 'grouped', className, tw, children, brand, groups, footer, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isRail = variant === 'iconRail';
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("aside", { ref: ref, "data-variant": variant, className: mergeTw('flex h-full flex-col text-fg', isRail ? 'w-16' : 'w-64', surfaces$7[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(SidebarBrand, { children: brand }), jsxRuntimeExports.jsx("nav", { className: "scrollbar-luxe flex-1 overflow-y-auto px-3 py-2", children: groups?.map((g, gi) => (jsxRuntimeExports.jsx(SidebarGroupBlock, { label: g.label, children: g.items.map((item, ii) => (jsxRuntimeExports.jsx(SidebarItemLink, { ...item }, ii))) }, gi))) }), footer !== undefined ? jsxRuntimeExports.jsx(SidebarFooter, { children: footer }) : null] })) }) }));
});
/* ----------------------------------- Brand -------------------------------- */
const SidebarBrand = forwardRef(function SidebarBrand({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isRail = variant === 'iconRail';
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('flex h-16 shrink-0 items-center gap-2.5 px-4', isRail && 'justify-center px-0', className, tw), ...rest, children: [jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-fg shadow-accent", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-[18px] w-[18px]", children: jsxRuntimeExports.jsx("path", { d: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z", fill: "currentColor" }) }) }), !isRail ? (jsxRuntimeExports.jsx("span", { className: "truncate font-display text-[15px] font-semibold tracking-tight text-fg", children: children ?? 'comp·lib' })) : null] }));
});
const SidebarGroupBlock = forwardRef(function SidebarGroup({ label, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isRail = variant === 'iconRail';
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('mb-4 last:mb-0', className, tw), ...rest, children: [label && !isRail ? (jsxRuntimeExports.jsx("p", { className: "px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-widest text-fg-subtle", children: label })) : null, jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5", children: children })] }));
});
const SidebarItemLink = forwardRef(function SidebarItem({ label, href, icon, active, badge, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isRail = variant === 'iconRail';
    const content = children ?? label;
    return (jsxRuntimeExports.jsxs("a", { ref: ref, href: href ?? '#', onClick: (e) => !href && e.preventDefault(), "aria-current": active ? 'page' : undefined, title: isRail && typeof content === 'string' ? content : undefined, className: mergeTw('group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors', isRail && 'justify-center px-0 py-2.5', active
            ? 'bg-primary/12 font-medium text-fg ring-1 ring-inset ring-primary/20'
            : 'text-fg-muted hover:bg-fg/[0.05] hover:text-fg', className, tw), ...rest, children: [jsxRuntimeExports.jsx("span", { className: mergeTw('grid h-5 w-5 shrink-0 place-items-center', active ? 'text-primary' : 'text-fg-subtle group-hover:text-fg-muted'), children: icon ?? jsxRuntimeExports.jsx(DefaultItemIcon, { className: "h-[18px] w-[18px]" }) }), !isRail ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: content }), badge !== undefined && badge !== null ? (jsxRuntimeExports.jsx("span", { className: mergeTw('ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold', accentSoft), children: badge })) : null] })) : null] }));
});
/* ----------------------------------- Footer ------------------------------- */
const SidebarFooter = forwardRef(function SidebarFooter({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isRail = variant === 'iconRail';
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-auto shrink-0 border-t border-edge/10 p-3 text-sm text-fg-muted', isRail && 'flex justify-center px-0', className, tw), ...rest, children: children }));
});
const Sidebar = SidebarRoot;
Sidebar.Brand = SidebarBrand;
Sidebar.Group = SidebarGroupBlock;
Sidebar.Item = SidebarItemLink;
Sidebar.Footer = SidebarFooter;

const FOOTER_VARIANTS = [
    'simple',
    'columns',
    'cta',
    'newsletter',
    'minimal',
    'dark',
];
/* ─────────────────────────────── Surfaces ──────────────────────────────── */
const surfaces$6 = {
    simple: 'border-t border-edge/10 bg-canvas/80 backdrop-blur-xl',
    columns: 'border-t border-edge/10 bg-panel/60 backdrop-blur-xl',
    cta: 'border-t border-edge/10 bg-gradient-to-b from-primary/[0.06] to-canvas/80 backdrop-blur-xl',
    newsletter: 'border-t border-edge/10 bg-elevated/70 backdrop-blur-xl',
    minimal: 'border-t border-edge/10 bg-transparent',
    dark: 'border-t border-edge/10 bg-fg/[0.04] backdrop-blur-xl',
};
/* ----------------------------------- Brand -------------------------------- */
const FooterBrand = forwardRef(function FooterBrand({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('flex flex-col gap-3', className, tw), ...rest, children: [jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2.5", children: [jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-fg shadow-accent", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-[18px] w-[18px]", children: jsxRuntimeExports.jsx("path", { d: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z", fill: "currentColor" }) }) }), jsxRuntimeExports.jsx("span", { className: "font-display text-[17px] font-semibold tracking-tight text-fg", children: "comp\u00B7lib" })] }), jsxRuntimeExports.jsx("p", { className: "max-w-xs text-sm text-fg-muted", children: children ?? 'A themeable component library that re-tints across every palette.' })] }));
});
const FooterColumnBlock = forwardRef(function FooterColumn({ title, links, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('flex flex-col gap-3', className, tw), ...rest, children: [title ? (jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] uppercase tracking-widest text-fg-subtle", children: title })) : null, jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-2", children: children ??
                    links?.map((l, i) => (jsxRuntimeExports.jsx("a", { href: l.href ?? '#', onClick: (e) => !l.href && e.preventDefault(), className: "text-sm text-fg-muted transition-colors hover:text-fg", children: l.label }, i))) })] }));
});
/* --------------------------------- Newsletter ----------------------------- */
function FooterNewsletter() {
    return (jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "flex w-full max-w-sm flex-col gap-3", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-fg", children: "Subscribe to our newsletter" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-fg-muted", children: "Product updates and design notes. No spam." })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "you@example.com", "aria-label": "Email address", tw: mergeTw('h-10 rounded-lg border-edge/15 bg-fg/[0.04] text-fg placeholder:text-fg-subtle', 'focus:border-primary/60 focus:ring-primary/25 focus:ring-offset-0') }), jsxRuntimeExports.jsx(Button, { type: "submit", intent: "ghost", tw: mergeTw('h-10 shrink-0 rounded-lg', accentSolid), children: "Subscribe" })] })] }));
}
/* ----------------------------------- CTA ---------------------------------- */
function FooterCta() {
    return (jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-5 rounded-2xl border border-primary/20 bg-primary/[0.06] p-8 md:flex-row md:items-center md:justify-between", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: "Start building today" }), jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-fg-muted", children: "Drop in pre-assembled blocks that follow your theme automatically." })] }), jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2.5", children: [jsxRuntimeExports.jsx(Button, { intent: "ghost", tw: mergeTw('rounded-lg', ghostControl), children: "Documentation" }), jsxRuntimeExports.jsx(Button, { intent: "ghost", tw: mergeTw('rounded-lg', accentSolid), children: "Get started" })] })] }));
}
/* ----------------------------------- Bottom ------------------------------- */
const FooterBottom = forwardRef(function FooterBottom({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col items-center justify-between gap-3 border-t border-edge/10 pt-6 text-sm text-fg-subtle sm:flex-row', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { children: "\u00A9 2026 comp\u00B7lib. All rights reserved." }), jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-5", children: ['Privacy', 'Terms', 'Status'].map((l) => (jsxRuntimeExports.jsx("a", { href: "#", onClick: (e) => e.preventDefault(), className: "transition-colors hover:text-fg", children: l }, l))) })] })) }));
});
/* ----------------------------------- Root --------------------------------- */
const FooterRoot = forwardRef(function Footer({ variant = 'columns', className, tw, children, brand, columns, bottom, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isMinimal = variant === 'minimal';
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("footer", { ref: ref, "data-variant": variant, className: mergeTw('w-full text-fg', surfaces$6[variant], className, tw), ...rest, children: jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-6xl px-5 py-12 sm:px-6", children: hasChildren ? (children) : isMinimal ? (jsxRuntimeExports.jsx(FooterBottom, { tw: "border-t-0 pt-0", children: bottom })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [variant === 'cta' ? jsxRuntimeExports.jsx("div", { className: "mb-12", children: jsxRuntimeExports.jsx(FooterCta, {}) }) : null, jsxRuntimeExports.jsxs("div", { className: mergeTw('flex flex-col gap-10 pb-10 md:flex-row md:justify-between', variant === 'newsletter' && 'md:items-start'), children: [jsxRuntimeExports.jsx(FooterBrand, { children: brand }), variant === 'newsletter' ? (jsxRuntimeExports.jsx(FooterNewsletter, {})) : columns?.length ? (jsxRuntimeExports.jsx("div", { className: "grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 md:max-w-2xl", children: columns.map((c, i) => (jsxRuntimeExports.jsx(FooterColumnBlock, { title: c.title, links: c.links }, i))) })) : null] }), jsxRuntimeExports.jsx(FooterBottom, { children: bottom })] })) }) }) }));
});
const Footer = FooterRoot;
Footer.Brand = FooterBrand;
Footer.Column = FooterColumnBlock;
Footer.Bottom = FooterBottom;

const DASHBOARD_SHELL_VARIANTS = [
    'sidebarLeft',
    'sidebarRight',
    'topnav',
    'compact',
    'glass',
    'split',
];
/* ─────────────────────────────── Surfaces ──────────────────────────────── */
const surfaces$5 = {
    sidebarLeft: 'bg-canvas',
    sidebarRight: 'bg-canvas',
    topnav: 'bg-canvas',
    compact: 'bg-canvas',
    glass: 'mesh',
    split: 'bg-gradient-to-br from-canvas via-canvas to-primary/[0.04]',
};
/* Whether the layout places the sidebar in a horizontal row (vs. stacked). */
const ROW_LAYOUTS = [
    'sidebarLeft',
    'sidebarRight',
    'compact',
    'glass',
    'split',
];
/* ----------------------------------- Sidebar ------------------------------ */
const ShellSidebar = forwardRef(function DashboardShellSidebar({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isTopnav = variant === 'topnav';
    const isCompact = variant === 'compact';
    if (isTopnav)
        return null;
    return (jsxRuntimeExports.jsx("div", { ref: ref, "data-region": "sidebar", className: mergeTw('hidden shrink-0 md:block', isCompact ? 'md:w-16' : 'md:w-64', variant === 'split' && 'md:w-72', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs("div", { className: mergeTw('flex h-full flex-col gap-3 p-3', variant === 'glass'
                ? 'glass m-3 rounded-2xl'
                : 'border-r border-edge/10 bg-panel/60'), children: [jsxRuntimeExports.jsx(PlaceholderLabel, { children: "Sidebar" }), jsxRuntimeExports.jsx("div", { className: "flex flex-1 flex-col gap-2", children: Array.from({ length: 4 }).map((_, i) => (jsxRuntimeExports.jsx("div", { className: "h-9 rounded-lg bg-fg/[0.04] ring-1 ring-inset ring-edge/8" }, i))) })] })) }));
});
/* ----------------------------------- Topbar ------------------------------- */
const ShellTopbar = forwardRef(function DashboardShellTopbar({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    return (jsxRuntimeExports.jsx("div", { ref: ref, "data-region": "topbar", className: mergeTw('shrink-0', variant === 'glass'
            ? 'glass border-b border-edge/10'
            : 'border-b border-edge/10 bg-canvas/80 backdrop-blur-xl', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-3 px-5", children: [jsxRuntimeExports.jsx(PlaceholderLabel, { children: "Topbar" }), jsxRuntimeExports.jsx("div", { className: "ml-auto h-9 w-9 rounded-full bg-fg/[0.06] ring-1 ring-inset ring-edge/10" })] })) }));
});
/* ----------------------------------- Content ------------------------------ */
const ShellContent = forwardRef(function DashboardShellContent({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isCompact = variant === 'compact';
    return (jsxRuntimeExports.jsx("main", { ref: ref, "data-region": "content", className: mergeTw('scrollbar-luxe flex-1 overflow-y-auto', isCompact ? 'p-4' : 'p-6', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-5xl flex-col gap-4", children: [jsxRuntimeExports.jsx(PlaceholderLabel, { children: "Content" }), jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: Array.from({ length: 3 }).map((_, i) => (jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl border border-edge/10 bg-elevated/60 shadow-luxe-sm" }, i))) }), jsxRuntimeExports.jsx("div", { className: "h-64 rounded-2xl border border-edge/10 bg-elevated/40" })] })) }));
});
/* --------------------------------- Placeholder ---------------------------- */
function PlaceholderLabel({ children }) {
    return (jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-fg-subtle", children: children }));
}
/* ------------------------- Default region extraction ---------------------- */
/* When rendering placeholders, find which slots the consumer passed so we can
   keep the layout intact while filling the rest with default regions. */
function findSlot(children, slot) {
    let found = null;
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === slot)
            found = child;
    });
    return found;
}
/* ----------------------------------- Root --------------------------------- */
const DashboardShellRoot = forwardRef(function DashboardShell({ variant = 'sidebarLeft', className, tw, children, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isRow = ROW_LAYOUTS.includes(variant);
    const sidebarRight = variant === 'sidebarRight';
    // Resolve regions: use provided slots, else defaults.
    const sidebar = hasChildren ? findSlot(children, ShellSidebar) : jsxRuntimeExports.jsx(ShellSidebar, {});
    const topbar = hasChildren ? findSlot(children, ShellTopbar) : jsxRuntimeExports.jsx(ShellTopbar, {});
    const content = hasChildren ? findSlot(children, ShellContent) : jsxRuntimeExports.jsx(ShellContent, {});
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, "data-variant": variant, className: mergeTw('flex h-full min-h-[28rem] w-full flex-col overflow-hidden text-fg', surfaces$5[variant], className, tw), ...rest, children: isRow ? (
            /* Sidebar beside a column of [topbar, content]. */
            jsxRuntimeExports.jsxs("div", { className: mergeTw('flex h-full flex-1', sidebarRight && 'flex-row-reverse'), children: [sidebar, jsxRuntimeExports.jsxs("div", { className: "flex h-full min-w-0 flex-1 flex-col", children: [topbar, content] })] })) : (
            /* topnav: topbar on top, content below (no sidebar). */
            jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [topbar, jsxRuntimeExports.jsx("div", { className: "flex h-full min-h-0 flex-1 flex-col", children: content })] })) }) }));
});
const DashboardShell = DashboardShellRoot;
DashboardShell.Sidebar = ShellSidebar;
DashboardShell.Topbar = ShellTopbar;
DashboardShell.Content = ShellContent;

const EMPTY_STATE_VARIANTS = [
    'minimal',
    'illustrated',
    'card',
    'cta',
    'error',
    'search',
];
/* ─────────────────────────────── Surfaces ──────────────────────────────── */
const surfaces$4 = {
    minimal: 'bg-transparent',
    illustrated: 'bg-transparent',
    card: 'rounded-2xl border border-edge/12 bg-panel/70 shadow-luxe-sm backdrop-blur-xl',
    cta: 'rounded-2xl border border-primary/25 bg-primary/[0.06]',
    error: 'rounded-2xl border border-danger/30 bg-danger/[0.06]',
    search: 'bg-transparent',
};
/* ──────────────────────────── Inline illustrations ──────────────────────── */
function BoxGlyph({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 48 48", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("path", { d: "M6 16 24 6l18 10v16L24 42 6 32V16Z", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M6 16l18 10 18-10M24 26v16", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round" })] }));
}
function SearchGlyph({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 48 48", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("circle", { cx: "21", cy: "21", r: "13", stroke: "currentColor", strokeWidth: "2.4" }), jsxRuntimeExports.jsx("path", { d: "m31 31 9 9", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" })] }));
}
function ErrorGlyph({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 48 48", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("path", { d: "M24 5 44 41H4L24 5Z", stroke: "currentColor", strokeWidth: "2.4", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M24 19v10", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round" }), jsxRuntimeExports.jsx("circle", { cx: "24", cy: "35", r: "1.6", fill: "currentColor" })] }));
}
function SparkleGlyph({ className }) {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 48 48", fill: "none", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M24 6 28 18.5 40.5 22 28 25.5 24 38l-4-12.5L7.5 22 20 18.5 24 6Z", stroke: "currentColor", strokeWidth: "2.2", strokeLinejoin: "round" }) }));
}
function defaultGlyph(variant, className) {
    if (variant === 'search')
        return jsxRuntimeExports.jsx(SearchGlyph, { className: className });
    if (variant === 'error')
        return jsxRuntimeExports.jsx(ErrorGlyph, { className: className });
    if (variant === 'cta')
        return jsxRuntimeExports.jsx(SparkleGlyph, { className: className });
    return jsxRuntimeExports.jsx(BoxGlyph, { className: className });
}
/* ----------------------------------- Icon --------------------------------- */
const EmptyStateIcon = forwardRef(function EmptyStateIcon({ children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const isError = variant === 'error';
    const isIllustrated = variant === 'illustrated';
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('grid place-items-center rounded-2xl', isIllustrated ? 'h-20 w-20' : 'h-14 w-14', isError
            ? 'bg-danger/12 text-danger ring-1 ring-inset ring-danger/20'
            : 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20', className, tw), ...rest, children: children ?? defaultGlyph(variant, isIllustrated ? 'h-10 w-10' : 'h-7 w-7') }));
});
/* ----------------------------------- Title -------------------------------- */
const EmptyStateTitle = forwardRef(function EmptyStateTitle({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("h3", { ref: ref, className: mergeTw('font-display text-lg font-semibold tracking-tight text-fg', className, tw), ...rest, children: children }));
});
/* -------------------------------- Description ----------------------------- */
const EmptyStateDescription = forwardRef(function EmptyStateDescription({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('max-w-sm text-sm text-fg-muted', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Action ------------------------------- */
const EmptyStateAction = forwardRef(function EmptyStateAction({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mt-1 flex flex-wrap items-center justify-center gap-2.5', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Root --------------------------------- */
const EmptyStateRoot = forwardRef(function EmptyState({ variant = 'card', className, tw, children, icon, title, description, action, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, "data-variant": variant, className: mergeTw('flex flex-col items-center gap-4 px-6 py-12 text-center text-fg', surfaces$4[variant], className, tw), ...rest, children: hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(EmptyStateIcon, { children: icon }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [title ? jsxRuntimeExports.jsx(EmptyStateTitle, { children: title }) : null, description ? (jsxRuntimeExports.jsx(EmptyStateDescription, { children: description })) : null] }), action ? (jsxRuntimeExports.jsx(EmptyStateAction, { children: action })) : variant === 'cta' ? (jsxRuntimeExports.jsx(EmptyStateAction, { children: jsxRuntimeExports.jsx(Button, { intent: "ghost", tw: mergeTw('rounded-lg', accentSolid), children: "Get started" }) })) : null] })) }) }));
});
const EmptyState = EmptyStateRoot;
EmptyState.Icon = EmptyStateIcon;
EmptyState.Title = EmptyStateTitle;
EmptyState.Description = EmptyStateDescription;
EmptyState.Action = EmptyStateAction;

const COMMAND_PALETTE_VARIANTS = [
    'minimal',
    'grouped',
    'withFooter',
    'icons',
    'recent',
    'glass',
];
/* ─────────────────────────────── Surfaces ──────────────────────────────── */
const contentSurfaces = {
    minimal: 'border border-edge/12 bg-elevated shadow-luxe-sm',
    grouped: 'border border-edge/12 bg-elevated shadow-luxe-sm',
    withFooter: 'border border-edge/12 bg-elevated shadow-luxe-sm',
    icons: 'border border-edge/12 bg-elevated shadow-luxe-sm',
    recent: 'border border-edge/12 bg-elevated shadow-luxe-sm',
    glass: 'glass',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function SearchIcon({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("circle", { cx: "9", cy: "9", r: "5.5", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("path", { d: "m17 17-3.5-3.5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })] }));
}
function DefaultCommandIcon({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("rect", { x: "3.5", y: "3.5", width: "13", height: "13", rx: "3", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("path", { d: "M7 10h6M10 7v6", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })] }));
}
const CommandPaletteInput = forwardRef(function CommandPaletteInput({ value, onValueChange, placeholder, className, tw }, ref) {
    return (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-edge/10 px-3", children: [jsxRuntimeExports.jsx("span", { className: "text-fg-subtle", children: jsxRuntimeExports.jsx(SearchIcon, { className: "h-[18px] w-[18px]" }) }), jsxRuntimeExports.jsx(Input, { ref: ref, autoFocus: true, value: value, onChange: (e) => onValueChange?.(e.target.value), placeholder: placeholder ?? 'Type a command or search…', "aria-label": "Command", className: className, tw: mergeTw('h-12 border-0 bg-transparent px-0 text-fg shadow-none placeholder:text-fg-subtle', 'focus:ring-0 focus:ring-offset-0', tw) })] }));
});
const CommandPaletteGroup = forwardRef(function CommandPaletteGroup({ label, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const showLabel = label && variant !== 'minimal';
    // Hide an empty group (all items filtered out).
    if (React.Children.count(children) === 0)
        return null;
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('px-2 py-1.5', className, tw), ...rest, children: [showLabel ? (jsxRuntimeExports.jsx("p", { className: "px-2 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-subtle", children: label })) : null, jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5", children: children })] }));
});
const CommandPaletteItem = forwardRef(function CommandPaletteItem({ label, icon, shortcut, onSelect, children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    const showIcon = variant === 'icons' || variant === 'recent' || icon;
    return (jsxRuntimeExports.jsxs("button", { ref: ref, type: "button", onClick: onSelect, className: mergeTw('group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-fg-muted transition-colors', 'hover:bg-primary/12 hover:text-fg focus:bg-primary/12 focus:text-fg focus:outline-none', className, tw), ...rest, children: [showIcon ? (jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 shrink-0 place-items-center text-fg-subtle group-hover:text-primary group-focus:text-primary", children: icon ?? jsxRuntimeExports.jsx(DefaultCommandIcon, { className: "h-[18px] w-[18px]" }) })) : null, jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: children ?? label }), shortcut ? (jsxRuntimeExports.jsx("span", { className: "ml-auto flex shrink-0 items-center gap-1", children: typeof shortcut === 'string'
                    ? shortcut.split(' ').map((k, i) => jsxRuntimeExports.jsx(Kbd, { children: k }, i))
                    : shortcut })) : null] }));
});
/* ----------------------------------- Footer ------------------------------- */
const CommandPaletteFooter = forwardRef(function CommandPaletteFooter({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex items-center gap-4 border-t border-edge/10 px-3 py-2 text-[11px] text-fg-subtle', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [jsxRuntimeExports.jsx(Kbd, { children: "\u21B5" }), " to select"] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [jsxRuntimeExports.jsx(Kbd, { children: "\u2191" }), jsxRuntimeExports.jsx(Kbd, { children: "\u2193" }), " to navigate"] }), jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1.5", children: [jsxRuntimeExports.jsx(Kbd, { children: "esc" }), " to close"] })] })) }));
});
/* --------------------------------- Empty ---------------------------------- */
function CommandEmpty({ query }) {
    return (jsxRuntimeExports.jsx("div", { className: "px-4 py-10 text-center", children: jsxRuntimeExports.jsxs("p", { className: "text-sm text-fg-muted", children: ["No results for ", jsxRuntimeExports.jsxs("span", { className: "font-medium text-fg", children: ["\u201C", query, "\u201D"] })] }) }));
}
/* ----------------------------------- Root --------------------------------- */
const CommandPaletteRoot = forwardRef(function CommandPalette({ variant = 'grouped', className, tw, open, onOpenChange, children, groups, placeholder, ...rest }, ref) {
    const [query, setQuery] = useState('');
    const hasChildren = React.Children.count(children) > 0;
    const showFooter = variant === 'withFooter' || variant === 'glass';
    const close = () => onOpenChange(false);
    // Filter groups/items by the typed query (data-prop form only).
    const filtered = useMemo(() => {
        if (!groups)
            return [];
        const q = query.trim().toLowerCase();
        if (!q)
            return groups;
        return groups
            .map((g) => ({
            ...g,
            items: g.items.filter((it) => it.label.toLowerCase().includes(q)),
        }))
            .filter((g) => g.items.length > 0);
    }, [groups, query]);
    const isEmpty = !hasChildren && filtered.length === 0;
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsxs(Dialog.Root, { open: open, onOpenChange: onOpenChange, children: [jsxRuntimeExports.jsx(Dialog.Overlay, { tw: "z-40 bg-canvas/70 backdrop-blur-md" }), jsxRuntimeExports.jsxs(Dialog.Content, { ref: ref, "data-variant": variant, className: className, tw: mergeTw('mt-[-12vh] w-full max-w-xl overflow-hidden rounded-2xl p-0 text-fg', contentSurfaces[variant], tw), ...rest, children: [jsxRuntimeExports.jsx(Dialog.Title, { tw: "sr-only", children: "Command palette" }), jsxRuntimeExports.jsx(Dialog.Description, { tw: "sr-only", children: "Search for a command or page and press Enter to run it." }), hasChildren ? (children) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(CommandPaletteInput, { value: query, onValueChange: setQuery, placeholder: placeholder }), jsxRuntimeExports.jsx("div", { className: "scrollbar-luxe max-h-[min(24rem,60vh)] overflow-y-auto py-1", children: isEmpty ? (jsxRuntimeExports.jsx(CommandEmpty, { query: query })) : (filtered.map((g, gi) => (jsxRuntimeExports.jsx(CommandPaletteGroup, { label: g.label, children: g.items.map((it, ii) => (jsxRuntimeExports.jsx(CommandPaletteItem, { label: it.label, icon: it.icon, shortcut: it.shortcut, onSelect: () => {
                                                it.onSelect?.();
                                                close();
                                            } }, ii))) }, gi)))) }), showFooter ? jsxRuntimeExports.jsx(CommandPaletteFooter, {}) : null] }))] })] }) }));
});
const CommandPalette = CommandPaletteRoot;
CommandPalette.Input = CommandPaletteInput;
CommandPalette.Group = CommandPaletteGroup;
CommandPalette.Item = CommandPaletteItem;
CommandPalette.Footer = CommandPaletteFooter;

const SIGNIN_VARIANTS = [
    'centered',
    'split',
    'card',
    'glass',
    'minimal',
    'social',
];
/* ──────────────────────────── Surfaces ──────────────────────────────────── */
const surfaces$3 = {
    centered: 'bg-elevated border border-edge/10 shadow-luxe',
    split: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
    card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
    glass: 'glass',
    minimal: 'bg-transparent',
    social: 'bg-elevated border border-edge/10 shadow-luxe-sm',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function ProviderIcon$1({ provider, className }) {
    if (provider === 'github') {
        return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" }) }));
    }
    if (provider === 'apple') {
        return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M16.37 12.7c.03 2.83 2.49 3.77 2.52 3.78-.02.07-.39 1.35-1.3 2.67-.78 1.14-1.6 2.28-2.89 2.3-1.26.03-1.67-.74-3.12-.74-1.45 0-1.9.72-3.1.77-1.24.05-2.19-1.23-2.98-2.37-1.61-2.33-2.85-6.59-1.19-9.46.82-1.42 2.3-2.32 3.9-2.35 1.22-.02 2.37.82 3.12.82.74 0 2.14-1.02 3.61-.87.61.03 2.35.25 3.46 1.86-.09.06-2.07 1.21-2.05 3.6ZM14.1 4.6c.66-.8 1.1-1.92.98-3.03-.95.04-2.1.63-2.78 1.43-.61.71-1.14 1.84-1 2.92 1.06.08 2.14-.54 2.8-1.32Z" }) }));
    }
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M21.6 12.23c0-.68-.06-1.34-.17-1.97H12v3.73h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.28Z", opacity: ".85" }), jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M12 22c2.7 0 4.96-.9 6.61-2.43l-3.23-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.59-4.11H3.07v2.58A10 10 0 0 0 12 22Z", opacity: ".6" }), jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M6.41 13.91a6 6 0 0 1 0-3.82V7.51H3.07a10 10 0 0 0 0 8.98l3.34-2.58Z", opacity: ".75" }), jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M12 5.98c1.47 0 2.78.5 3.81 1.49l2.85-2.85C16.95 2.99 14.69 2 12 2A10 10 0 0 0 3.07 7.51l3.34 2.58C7.2 7.73 9.4 5.98 12 5.98Z", opacity: ".5" })] }));
}
const providerLabels$1 = {
    google: 'Continue with Google',
    github: 'Continue with GitHub',
    apple: 'Continue with Apple',
};
/* ──────────────────────────── Field labels ──────────────────────────────── */
function fieldLabel(children) {
    return (jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-fg-muted", children: children }));
}
/* ----------------------------------- Root --------------------------------- */
const SignInRoot = forwardRef(function SignIn({ variant = 'card', className, tw, children, title = 'Welcome back', subtitle = 'Sign in to your account to continue.', onSubmit, socials, forgotHref, signupHref, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isSplit = variant === 'split';
    const isSocialFirst = variant === 'social';
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    const formBody = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [isSocialFirst && socials?.length ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(SignInSocial, { socials: socials }), jsxRuntimeExports.jsx(Divider$1, { children: "or sign in with email" })] })) : null, jsxRuntimeExports.jsx(SignInField, { type: "email", name: "email", label: "Email", placeholder: "you@example.com", autoComplete: "email" }), jsxRuntimeExports.jsx(SignInField, { type: "password", name: "password", label: "Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", autoComplete: "current-password", action: forgotHref ? jsxRuntimeExports.jsx("a", { href: forgotHref, className: "text-sm font-medium text-primary hover:underline", children: "Forgot?" }) : undefined }), jsxRuntimeExports.jsx(Checkbox, { name: "remember", label: "Remember me for 30 days", tw: "text-fg-muted" }), jsxRuntimeExports.jsx(SignInActions, { children: "Sign in" }), !isSocialFirst && socials?.length ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Divider$1, { children: "or continue with" }), jsxRuntimeExports.jsx(SignInSocial, { socials: socials })] })) : null, jsxRuntimeExports.jsxs(SignInFooter, { children: ["New here?", ' ', jsxRuntimeExports.jsx("a", { href: signupHref ?? '#', onClick: (e) => !signupHref && e.preventDefault(), className: "font-medium text-primary hover:underline", children: "Create an account" })] })] }));
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full text-fg', isSplit ? 'max-w-4xl' : 'max-w-md', 'rounded-2xl', surfaces$3[variant], className, tw), ...rest, children: hasChildren ? (jsxRuntimeExports.jsx("div", { className: mergeTw(variant === 'minimal' ? '' : 'p-7 sm:p-8'), children: children })) : isSplit ? (jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2", children: [jsxRuntimeExports.jsx(SignInPanel, { title: title, subtitle: subtitle }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 p-7 sm:p-8", children: [jsxRuntimeExports.jsx(SignInHeader, { title: "Sign in", subtitle: "Use your account credentials." }), formBody] })] })) : (jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: mergeTw('flex flex-col gap-4', variant === 'minimal' ? '' : 'p-7 sm:p-8'), children: [jsxRuntimeExports.jsx(SignInHeader, { title: title, subtitle: subtitle }), formBody] })) }) }));
});
/* ----------------------------------- Panel -------------------------------- */
/* Side panel for the `split` design. */
const SignInPanel = forwardRef(function SignInPanel({ title, subtitle, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative hidden flex-col justify-between gap-8 overflow-hidden bg-gradient-to-br from-primary/15 via-panel/40 to-accent2/10 p-8 md:flex', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-fg shadow-accent", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: "h-5 w-5", children: jsxRuntimeExports.jsx("path", { d: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" }) }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: title }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-fg-muted", children: subtitle })] }), jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] uppercase tracking-widest text-fg-subtle", children: "comp\u00B7lib \u00B7 secure auth" })] })) }));
});
const SignInHeader = forwardRef(function SignInHeader({ title, subtitle, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mb-2 flex flex-col gap-1.5', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [title ? (jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: title })) : null, subtitle ? jsxRuntimeExports.jsx("p", { className: "text-sm text-fg-muted", children: subtitle }) : null] })) }));
});
const SignInField = forwardRef(function SignInField({ label, type = 'text', action, children, className, tw, ...rest }, ref) {
    if (children) {
        return (jsxRuntimeExports.jsx("div", { className: mergeTw('w-full', className, tw), children: children }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('w-full', className), children: [(label || action) && (jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between", children: [fieldLabel(label), action] })), jsxRuntimeExports.jsx(Input, { ref: ref, type: type, tw: mergeTw(inputSurface, 'h-11 rounded-xl', tw), ...rest })] }));
});
/* ----------------------------------- Actions ------------------------------ */
const SignInActions = forwardRef(function SignInActions({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Button, { ref: ref, type: "submit", fullWidth: true, intent: "ghost", tw: mergeTw('mt-1 h-11 rounded-xl', accentSolid, className, tw), ...rest, children: children }));
});
const SignInSocial = forwardRef(function SignInSocial({ socials, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-2.5', className, tw), ...rest, children: children ??
            socials?.map((s, i) => (jsxRuntimeExports.jsxs(Button, { intent: "ghost", fullWidth: true, as: "a", href: s.href ?? '#', onClick: (e) => !s.href && e.preventDefault(), tw: mergeTw('h-11 rounded-xl', ghostControl), children: [jsxRuntimeExports.jsx(ProviderIcon$1, { provider: s.provider, className: "h-[18px] w-[18px]" }), s.label ?? providerLabels$1[s.provider]] }, i))) }));
});
/* ----------------------------------- Footer ------------------------------- */
const SignInFooter = forwardRef(function SignInFooter({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('mt-1 text-center text-sm text-fg-muted', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Divider ------------------------------ */
function Divider$1({ children }) {
    return (jsxRuntimeExports.jsxs("div", { className: "my-1 flex items-center gap-3 text-xs text-fg-subtle", children: [jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-edge/15" }), jsxRuntimeExports.jsx("span", { className: "font-mono uppercase tracking-widest", children: children }), jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-edge/15" })] }));
}
const SignIn = SignInRoot;
SignIn.Panel = SignInPanel;
SignIn.Header = SignInHeader;
SignIn.Field = SignInField;
SignIn.Actions = SignInActions;
SignIn.Social = SignInSocial;
SignIn.Footer = SignInFooter;

const SIGNUP_VARIANTS = [
    'centered',
    'split',
    'card',
    'glass',
    'steps',
    'social',
];
/* ──────────────────────────── Surfaces ──────────────────────────────────── */
const surfaces$2 = {
    centered: 'bg-elevated border border-edge/10 shadow-luxe',
    split: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
    card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
    glass: 'glass',
    steps: 'bg-elevated border border-edge/10 shadow-luxe',
    social: 'bg-elevated border border-edge/10 shadow-luxe-sm',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function ProviderIcon({ provider, className }) {
    if (provider === 'github') {
        return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" }) }));
    }
    if (provider === 'apple') {
        return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M16.37 12.7c.03 2.83 2.49 3.77 2.52 3.78-.02.07-.39 1.35-1.3 2.67-.78 1.14-1.6 2.28-2.89 2.3-1.26.03-1.67-.74-3.12-.74-1.45 0-1.9.72-3.1.77-1.24.05-2.19-1.23-2.98-2.37-1.61-2.33-2.85-6.59-1.19-9.46.82-1.42 2.3-2.32 3.9-2.35 1.22-.02 2.37.82 3.12.82.74 0 2.14-1.02 3.61-.87.61.03 2.35.25 3.46 1.86-.09.06-2.07 1.21-2.05 3.6ZM14.1 4.6c.66-.8 1.1-1.92.98-3.03-.95.04-2.1.63-2.78 1.43-.61.71-1.14 1.84-1 2.92 1.06.08 2.14-.54 2.8-1.32Z" }) }));
    }
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M21.6 12.23c0-.68-.06-1.34-.17-1.97H12v3.73h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.28Z", opacity: ".85" }), jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M12 22c2.7 0 4.96-.9 6.61-2.43l-3.23-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.59-4.11H3.07v2.58A10 10 0 0 0 12 22Z", opacity: ".6" }), jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M6.41 13.91a6 6 0 0 1 0-3.82V7.51H3.07a10 10 0 0 0 0 8.98l3.34-2.58Z", opacity: ".75" }), jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M12 5.98c1.47 0 2.78.5 3.81 1.49l2.85-2.85C16.95 2.99 14.69 2 12 2A10 10 0 0 0 3.07 7.51l3.34 2.58C7.2 7.73 9.4 5.98 12 5.98Z", opacity: ".5" })] }));
}
const providerLabels = {
    google: 'Sign up with Google',
    github: 'Sign up with GitHub',
    apple: 'Sign up with Apple',
};
/* ----------------------------------- Root --------------------------------- */
const SignUpRoot = forwardRef(function SignUp({ variant = 'card', className, tw, children, title = 'Create your account', subtitle = 'Start your 14-day free trial — no card required.', onSubmit, socials, signinHref, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isSplit = variant === 'split';
    const isSteps = variant === 'steps';
    const isSocialFirst = variant === 'social';
    const [step, setStep] = useState(1);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    const terms = (jsxRuntimeExports.jsx(Checkbox, { name: "terms", label: "I agree to the Terms of Service and Privacy Policy", tw: "text-fg-muted" }));
    const footer = (jsxRuntimeExports.jsxs(SignUpFooter, { children: ["Already have an account?", ' ', jsxRuntimeExports.jsx("a", { href: signinHref ?? '#', onClick: (e) => !signinHref && e.preventDefault(), className: "font-medium text-primary hover:underline", children: "Sign in" })] }));
    /* —— steps design: split the fields across two panes —— */
    if (isSteps && !hasChildren) {
        return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full max-w-md rounded-2xl text-fg', surfaces$2[variant], className, tw), ...rest, children: jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 p-7 sm:p-8", children: [jsxRuntimeExports.jsx(Stepper$1, { step: step, steps: ['Account', 'Profile'] }), jsxRuntimeExports.jsx(SignUpHeader, { title: title, subtitle: subtitle }), step === 1 ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(SignUpField, { type: "email", name: "email", label: "Email", placeholder: "you@example.com", autoComplete: "email" }), jsxRuntimeExports.jsx(SignUpField, { type: "password", name: "password", label: "Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", autoComplete: "new-password" }), jsxRuntimeExports.jsx(Button, { type: "button", fullWidth: true, intent: "ghost", onClick: () => setStep(2), tw: mergeTw('mt-1 h-11 rounded-xl', accentSolid), children: "Continue" })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(SignUpField, { type: "text", name: "name", label: "Full name", placeholder: "Ada Lovelace", autoComplete: "name" }), jsxRuntimeExports.jsx(SignUpField, { type: "text", name: "company", label: "Company (optional)", placeholder: "Analytical Engines Ltd." }), terms, jsxRuntimeExports.jsxs("div", { className: "mt-1 flex gap-2.5", children: [jsxRuntimeExports.jsx(Button, { type: "button", intent: "ghost", onClick: () => setStep(1), tw: mergeTw('h-11 rounded-xl', ghostControl), children: "Back" }), jsxRuntimeExports.jsx(SignUpActions, { children: "Create account" })] })] })), footer] }) }) }));
    }
    const formBody = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [isSocialFirst && socials?.length ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(SignUpSocial, { socials: socials }), jsxRuntimeExports.jsx(Divider, { children: "or sign up with email" })] })) : null, jsxRuntimeExports.jsx(SignUpField, { type: "text", name: "name", label: "Full name", placeholder: "Ada Lovelace", autoComplete: "name" }), jsxRuntimeExports.jsx(SignUpField, { type: "email", name: "email", label: "Email", placeholder: "you@example.com", autoComplete: "email" }), jsxRuntimeExports.jsx(SignUpField, { type: "password", name: "password", label: "Password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", autoComplete: "new-password" }), terms, jsxRuntimeExports.jsx(SignUpActions, { children: "Create account" }), !isSocialFirst && socials?.length ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Divider, { children: "or continue with" }), jsxRuntimeExports.jsx(SignUpSocial, { socials: socials })] })) : null, footer] }));
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full text-fg', isSplit ? 'max-w-4xl' : 'max-w-md', 'rounded-2xl', surfaces$2[variant], className, tw), ...rest, children: hasChildren ? (jsxRuntimeExports.jsx("div", { className: "p-7 sm:p-8", children: children })) : isSplit ? (jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2", children: [jsxRuntimeExports.jsx(SignUpPanel, { title: title, subtitle: subtitle }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 p-7 sm:p-8", children: [jsxRuntimeExports.jsx(SignUpHeader, { title: "Get started", subtitle: "It only takes a minute." }), formBody] })] })) : (jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 p-7 sm:p-8", children: [jsxRuntimeExports.jsx(SignUpHeader, { title: title, subtitle: subtitle }), formBody] })) }) }));
});
/* ----------------------------------- Stepper ------------------------------ */
function Stepper$1({ step, steps }) {
    return (jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-center gap-3", children: steps.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (jsxRuntimeExports.jsxs(React.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: mergeTw('grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition', active || done
                                    ? 'border-primary bg-primary text-primary-fg'
                                    : 'border-edge/20 bg-fg/[0.04] text-fg-subtle'), children: n }), jsxRuntimeExports.jsx("span", { className: mergeTw('text-sm font-medium', active ? 'text-fg' : 'text-fg-subtle'), children: label })] }), n < steps.length ? jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-edge/15" }) : null] }, label));
        }) }));
}
/* ----------------------------------- Panel -------------------------------- */
const SignUpPanel = forwardRef(function SignUpPanel({ title, subtitle, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative hidden flex-col justify-between gap-8 overflow-hidden bg-gradient-to-br from-primary/15 via-panel/40 to-accent2/10 p-8 md:flex', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-fg shadow-accent", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", className: "h-5 w-5", children: jsxRuntimeExports.jsx("path", { d: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" }) }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: title }), jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-fg-muted", children: subtitle }), jsxRuntimeExports.jsx("ul", { className: "mt-5 flex flex-col gap-2.5 text-sm text-fg-muted", children: ['Unlimited components', 'Theme across 4 palettes', 'Cancel anytime'].map((f) => (jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5", children: [jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary", children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: "h-3 w-3", children: jsxRuntimeExports.jsx("path", { d: "m4 10 4 4 8-9", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), f] }, f))) })] }), jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] uppercase tracking-widest text-fg-subtle", children: "comp\u00B7lib \u00B7 join 12k builders" })] })) }));
});
const SignUpHeader = forwardRef(function SignUpHeader({ title, subtitle, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mb-2 flex flex-col gap-1.5', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [title ? jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: title }) : null, subtitle ? jsxRuntimeExports.jsx("p", { className: "text-sm text-fg-muted", children: subtitle }) : null] })) }));
});
const SignUpField = forwardRef(function SignUpField({ label, type = 'text', children, className, tw, ...rest }, ref) {
    if (children) {
        return jsxRuntimeExports.jsx("div", { className: mergeTw('w-full', className, tw), children: children });
    }
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('w-full', className), children: [label ? jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-fg-muted", children: label }) : null, jsxRuntimeExports.jsx(Input, { ref: ref, type: type, tw: mergeTw(inputSurface, 'h-11 rounded-xl', tw), ...rest })] }));
});
/* ----------------------------------- Actions ------------------------------ */
const SignUpActions = forwardRef(function SignUpActions({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Button, { ref: ref, type: "submit", fullWidth: true, intent: "ghost", tw: mergeTw('mt-1 h-11 rounded-xl', accentSolid, className, tw), ...rest, children: children }));
});
const SignUpSocial = forwardRef(function SignUpSocial({ socials, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-2.5', className, tw), ...rest, children: children ??
            socials?.map((s, i) => (jsxRuntimeExports.jsxs(Button, { intent: "ghost", fullWidth: true, as: "a", href: s.href ?? '#', onClick: (e) => !s.href && e.preventDefault(), tw: mergeTw('h-11 rounded-xl', ghostControl), children: [jsxRuntimeExports.jsx(ProviderIcon, { provider: s.provider, className: "h-[18px] w-[18px]" }), s.label ?? providerLabels[s.provider]] }, i))) }));
});
/* ----------------------------------- Footer ------------------------------- */
const SignUpFooter = forwardRef(function SignUpFooter({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("p", { ref: ref, className: mergeTw('mt-1 text-center text-sm text-fg-muted', className, tw), ...rest, children: children }));
});
/* ----------------------------------- Divider ------------------------------ */
function Divider({ children }) {
    return (jsxRuntimeExports.jsxs("div", { className: "my-1 flex items-center gap-3 text-xs text-fg-subtle", children: [jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-edge/15" }), jsxRuntimeExports.jsx("span", { className: "font-mono uppercase tracking-widest", children: children }), jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-edge/15" })] }));
}
const SignUp = SignUpRoot;
SignUp.Panel = SignUpPanel;
SignUp.Header = SignUpHeader;
SignUp.Field = SignUpField;
SignUp.Actions = SignUpActions;
SignUp.Social = SignUpSocial;
SignUp.Footer = SignUpFooter;

const SETTINGSFORM_VARIANTS = [
    'tabs',
    'sections',
    'sidebar',
    'cards',
    'inline',
    'split',
];
const GROUPS = ['Profile', 'Account', 'Notifications'];
/* ──────────────────────────── Field labels ──────────────────────────────── */
function fieldClasses(extra) {
    return mergeTw(inputSurface, 'h-11 rounded-xl', extra);
}
const SettingsField = forwardRef(function SettingsField({ label, hint, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('w-full', className, tw), ...rest, children: [label ? jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-fg-muted", children: label }) : null, children, hint ? jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-fg-subtle", children: hint }) : null] }));
});
const SettingsGroup = forwardRef(function SettingsGroup({ title, description, carded, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw(carded ? 'rounded-2xl border border-edge/12 bg-panel/60 p-6 shadow-luxe-sm' : '', className, tw), ...rest, children: [(title || description) && (jsxRuntimeExports.jsxs("header", { className: "mb-4", children: [title ? jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold tracking-tight text-fg", children: title }) : null, description ? jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-fg-muted", children: description }) : null] })), jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: children })] }));
});
/* ------------------------------ Group bodies ------------------------------ */
/* The default field sets per group, reused across every design. */
function ProfileFields() {
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [jsxRuntimeExports.jsx(Avatar, { size: "xl", tw: "bg-primary/15 text-primary font-semibold", children: "AL" }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [jsxRuntimeExports.jsx(Button, { intent: "ghost", tw: mergeTw('h-9 rounded-lg', ghostControl), children: "Upload new photo" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-fg-subtle", children: "PNG or JPG, up to 2MB." })] })] }), jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [jsxRuntimeExports.jsx(SettingsField, { label: "First name", children: jsxRuntimeExports.jsx(Input, { defaultValue: "Ada", tw: fieldClasses() }) }), jsxRuntimeExports.jsx(SettingsField, { label: "Last name", children: jsxRuntimeExports.jsx(Input, { defaultValue: "Lovelace", tw: fieldClasses() }) })] }), jsxRuntimeExports.jsx(SettingsField, { label: "Bio", hint: "Brief description for your profile.", children: jsxRuntimeExports.jsx(Textarea, { rows: 3, defaultValue: "Building delightful interfaces with comp\u00B7lib.", tw: mergeTw(inputSurface, 'rounded-xl') }) })] }));
}
function AccountFields() {
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(SettingsField, { label: "Email", children: jsxRuntimeExports.jsx(Input, { type: "email", defaultValue: "ada@example.com", tw: fieldClasses() }) }), jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [jsxRuntimeExports.jsx(SettingsField, { label: "Language", children: jsxRuntimeExports.jsxs(Select, { defaultValue: "en", tw: fieldClasses('bg-elevated/70'), children: [jsxRuntimeExports.jsx("option", { value: "en", children: "English" }), jsxRuntimeExports.jsx("option", { value: "es", children: "Espa\u00F1ol" }), jsxRuntimeExports.jsx("option", { value: "fr", children: "Fran\u00E7ais" })] }) }), jsxRuntimeExports.jsx(SettingsField, { label: "Timezone", children: jsxRuntimeExports.jsxs(Select, { defaultValue: "utc", tw: fieldClasses('bg-elevated/70'), children: [jsxRuntimeExports.jsx("option", { value: "utc", children: "UTC" }), jsxRuntimeExports.jsx("option", { value: "est", children: "Eastern (EST)" }), jsxRuntimeExports.jsx("option", { value: "pst", children: "Pacific (PST)" })] }) })] })] }));
}
function NotificationFields() {
    const rows = [
        { label: 'Product updates', desc: 'News about features and improvements.', on: true },
        { label: 'Security alerts', desc: 'Critical alerts about your account.', on: true },
        { label: 'Weekly digest', desc: 'A summary of activity every Monday.', on: false },
    ];
    return (jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: rows.map((r) => (jsxRuntimeExports.jsx(ToggleRow, { label: r.label, description: r.desc, defaultChecked: r.on }, r.label))) }));
}
const groupBodies = {
    Profile: ProfileFields,
    Account: AccountFields,
    Notifications: NotificationFields,
};
const groupDescriptions = {
    Profile: 'Update your photo and personal details.',
    Account: 'Manage your email, language, and region.',
    Notifications: 'Choose what we email you about.',
};
const ToggleRow = forwardRef(function ToggleRow({ label, description, defaultChecked, className, tw, ...rest }, ref) {
    const [on, setOn] = useState(!!defaultChecked);
    return (jsxRuntimeExports.jsxs("div", { className: mergeTw('flex items-center justify-between gap-4 rounded-xl border border-edge/10 bg-fg/[0.03] px-4 py-3', className, tw), children: [jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [label ? jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-fg", children: label }) : null, description ? jsxRuntimeExports.jsx("span", { className: "text-xs text-fg-subtle", children: description }) : null] }), jsxRuntimeExports.jsx(Toggle, { ref: ref, checked: on, onChange: (e) => setOn(e.currentTarget.checked), ...rest })] }));
});
const SettingsSaveBar = forwardRef(function SettingsSaveBar({ sticky = true, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('z-10 flex items-center justify-end gap-3 border-t border-edge/10 bg-canvas/80 px-1 py-4 backdrop-blur-xl', sticky ? 'sticky bottom-0' : '', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Button, { type: "button", intent: "ghost", tw: mergeTw('h-10 rounded-xl', ghostControl), children: "Cancel" }), jsxRuntimeExports.jsx(Button, { type: "submit", intent: "ghost", tw: mergeTw('h-10 rounded-xl', accentSolid), children: "Save changes" })] })) }));
});
/* ----------------------------------- Root --------------------------------- */
const SettingsFormRoot = forwardRef(function SettingsForm({ variant = 'sections', className, tw, children, onSubmit, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const [active, setActive] = useState('Profile');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    const renderGroup = (key, carded = false) => {
        const Body = groupBodies[key];
        return (jsxRuntimeExports.jsx(SettingsGroup, { title: key, description: groupDescriptions[key], carded: carded, children: jsxRuntimeExports.jsx(Body, {}) }, key));
    };
    let body;
    if (hasChildren) {
        body = children;
    }
    else if (variant === 'tabs') {
        body = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs(Tabs.Root, { defaultValue: "Profile", children: [jsxRuntimeExports.jsx(Tabs.TabList, { tw: "gap-1 border-edge/12", children: GROUPS.map((g) => (jsxRuntimeExports.jsx(Tabs.Tab, { value: g, tw: "rounded-none border-b-2 border-transparent px-4 py-2.5 text-fg-muted aria-selected:border-primary aria-selected:text-fg hover:text-fg", children: g }, g))) }), jsxRuntimeExports.jsx(Tabs.TabPanels, { tw: "mt-6", children: GROUPS.map((g) => (jsxRuntimeExports.jsx(Tabs.TabPanel, { value: g, children: renderGroup(g) }, g))) })] }), jsxRuntimeExports.jsx(SettingsSaveBar, { tw: "mt-6" })] }));
    }
    else if (variant === 'sidebar' || variant === 'split') {
        body = (jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-[200px_1fr]", children: [jsxRuntimeExports.jsx("nav", { className: "flex flex-row gap-1 md:flex-col", children: GROUPS.map((g) => (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActive(g), "aria-current": active === g ? 'true' : undefined, className: mergeTw('rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors', active === g ? 'bg-primary/10 text-primary' : 'text-fg-muted hover:bg-fg/[0.05] hover:text-fg'), children: g }, g))) }), jsxRuntimeExports.jsxs("div", { children: [variant === 'split'
                            ? GROUPS.map((g) => renderGroup(g, true))
                            : renderGroup(active), jsxRuntimeExports.jsx(SettingsSaveBar, { tw: "mt-6" })] })] }));
    }
    else if (variant === 'cards') {
        body = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-6", children: GROUPS.map((g) => renderGroup(g, true)) }), jsxRuntimeExports.jsx(SettingsSaveBar, { tw: "mt-6" })] }));
    }
    else if (variant === 'inline') {
        body = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "flex flex-col divide-y divide-edge/10", children: GROUPS.map((g) => (jsxRuntimeExports.jsx("div", { className: "py-6 first:pt-0", children: renderGroup(g) }, g))) }), jsxRuntimeExports.jsx(SettingsSaveBar, { tw: "mt-2" })] }));
    }
    else {
        /* sections (default) */
        body = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-10", children: GROUPS.map((g) => renderGroup(g)) }), jsxRuntimeExports.jsx(SettingsSaveBar, { tw: "mt-8" })] }));
    }
    const split = variant === 'split';
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("form", { ref: ref, onSubmit: handleSubmit, className: mergeTw('w-full text-fg', split ? 'max-w-4xl' : 'max-w-2xl', 'rounded-2xl border border-edge/10 bg-elevated p-6 shadow-luxe-sm sm:p-8', className, tw), ...rest, children: body }) }));
});
const SettingsForm = SettingsFormRoot;
SettingsForm.Group = SettingsGroup;
SettingsForm.Field = SettingsField;
SettingsForm.ToggleRow = ToggleRow;
SettingsForm.SaveBar = SettingsSaveBar;

const CONTACTFORM_VARIANTS = [
    'simple',
    'split',
    'card',
    'glass',
    'withDetails',
    'minimal',
];
/* ──────────────────────────── Surfaces ──────────────────────────────────── */
const surfaces$1 = {
    simple: 'bg-elevated border border-edge/10 shadow-luxe-sm',
    split: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
    card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
    glass: 'glass',
    withDetails: 'bg-elevated border border-edge/10 shadow-luxe overflow-hidden',
    minimal: 'bg-transparent',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function MailIcon({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2", stroke: "currentColor", strokeWidth: "1.6" }), jsxRuntimeExports.jsx("path", { d: "m4 7 8 6 8-6", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })] }));
}
function PhoneIcon({ className }) {
    return (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: className, children: jsxRuntimeExports.jsx("path", { d: "M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }) }));
}
function PinIcon({ className }) {
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: className, children: [jsxRuntimeExports.jsx("path", { d: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("circle", { cx: "12", cy: "10", r: "2.5", stroke: "currentColor", strokeWidth: "1.6" })] }));
}
/* ----------------------------------- Root --------------------------------- */
const ContactFormRoot = forwardRef(function ContactForm({ variant = 'simple', className, tw, children, title = 'Get in touch', subtitle = 'We usually reply within one business day.', onSubmit, details = { email: 'hello@comp-lib.dev', phone: '+1 (555) 012-3456', address: '500 Market St, San Francisco' }, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const withSidebar = variant === 'split' || variant === 'withDetails';
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    const fields = (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [jsxRuntimeExports.jsx(ContactField, { label: "Name", children: jsxRuntimeExports.jsx(Input, { name: "name", placeholder: "Ada Lovelace", autoComplete: "name", tw: mergeTw(inputSurface, 'h-11 rounded-xl') }) }), jsxRuntimeExports.jsx(ContactField, { label: "Email", children: jsxRuntimeExports.jsx(Input, { type: "email", name: "email", placeholder: "you@example.com", autoComplete: "email", tw: mergeTw(inputSurface, 'h-11 rounded-xl') }) })] }), jsxRuntimeExports.jsx(ContactField, { label: "Subject", children: jsxRuntimeExports.jsx(Input, { name: "subject", placeholder: "How can we help?", tw: mergeTw(inputSurface, 'h-11 rounded-xl') }) }), jsxRuntimeExports.jsx(ContactField, { label: "Message", children: jsxRuntimeExports.jsx(Textarea, { name: "message", rows: 5, placeholder: "Tell us a bit more\u2026", tw: mergeTw(inputSurface, 'rounded-xl') }) }), jsxRuntimeExports.jsx(ContactSubmit, { children: "Send message" })] }));
    const form = (jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: mergeTw('flex flex-col gap-4', variant === 'minimal' ? '' : 'p-7 sm:p-8'), children: [!withSidebar ? jsxRuntimeExports.jsx(ContactHeader, { title: title, subtitle: subtitle }) : null, fields] }));
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full text-fg', withSidebar ? 'max-w-4xl' : 'max-w-xl', 'rounded-2xl', surfaces$1[variant], className, tw), ...rest, children: hasChildren ? (jsxRuntimeExports.jsx("div", { className: mergeTw(variant === 'minimal' ? '' : 'p-7 sm:p-8'), children: children })) : withSidebar ? (jsxRuntimeExports.jsxs("div", { className: mergeTw('grid md:grid-cols-2', variant === 'withDetails' && 'md:grid-cols-[1fr_1.2fr]'), children: [jsxRuntimeExports.jsx(ContactDetailsPanel, { title: title, subtitle: subtitle, details: details }), form] })) : (form) }) }));
});
const ContactHeader = forwardRef(function ContactHeader({ title, subtitle, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('mb-2 flex flex-col gap-1.5', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [title ? jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: title }) : null, subtitle ? jsxRuntimeExports.jsx("p", { className: "text-sm text-fg-muted", children: subtitle }) : null] })) }));
});
const ContactField = forwardRef(function ContactField({ label, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('w-full', className, tw), ...rest, children: [label ? jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-fg-muted", children: label }) : null, children] }));
});
/* ----------------------------------- Submit ------------------------------- */
const ContactSubmit = forwardRef(function ContactSubmit({ children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsx(Button, { ref: ref, type: "submit", intent: "ghost", tw: mergeTw('mt-1 h-11 rounded-xl px-6 sm:self-start', accentSolid, className, tw), ...rest, children: children }));
});
const ContactDetailsPanel = forwardRef(function ContactDetailsPanel({ title, subtitle, details, children, className, tw, ...rest }, ref) {
    const rows = [
        details?.email ? { icon: jsxRuntimeExports.jsx(MailIcon, { className: "h-[18px] w-[18px]" }), label: 'Email', value: details.email } : null,
        details?.phone ? { icon: jsxRuntimeExports.jsx(PhoneIcon, { className: "h-[18px] w-[18px]" }), label: 'Phone', value: details.phone } : null,
        details?.address ? { icon: jsxRuntimeExports.jsx(PinIcon, { className: "h-[18px] w-[18px]" }), label: 'Office', value: details.address } : null,
    ].filter(Boolean);
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('relative flex flex-col gap-7 overflow-hidden bg-gradient-to-br from-primary/15 via-panel/40 to-accent2/10 p-7 sm:p-8', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsxs("div", { children: [title ? jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold tracking-tight text-fg", children: title }) : null, subtitle ? jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-fg-muted", children: subtitle }) : null] }), jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-5", children: rows.map((r) => (jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3.5", children: [jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary", children: r.icon }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] uppercase tracking-widest text-fg-subtle", children: r.label }), jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm font-medium text-fg", children: r.value })] })] }, r.label))) })] })) }));
});
const ContactForm = ContactFormRoot;
ContactForm.Header = ContactHeader;
ContactForm.Field = ContactField;
ContactForm.Submit = ContactSubmit;
ContactForm.Details = ContactDetailsPanel;

const CHECKOUTFORM_VARIANTS = [
    'single',
    'twoColumn',
    'steps',
    'card',
    'glass',
    'compact',
];
/* ──────────────────────────── Surfaces ──────────────────────────────────── */
const surfaces = {
    single: 'bg-elevated border border-edge/10 shadow-luxe-sm',
    twoColumn: 'bg-transparent',
    steps: 'bg-elevated border border-edge/10 shadow-luxe-sm',
    card: 'bg-panel/80 border border-edge/12 shadow-luxe-sm backdrop-blur-xl',
    glass: 'glass',
    compact: 'bg-elevated border border-edge/10 shadow-luxe-sm',
};
const DEFAULT_ITEMS = [
    { name: 'Aero Runner — Carbon', price: 129, qty: 1 },
    { name: 'Trail Socks (3-pack)', price: 24, qty: 2 },
];
function money(n, currency) {
    return `${currency}${n.toFixed(2)}`;
}
/* ----------------------------------- Field -------------------------------- */
function field(extra) {
    return mergeTw(inputSurface, 'h-11 rounded-xl', extra);
}
const CheckoutField = forwardRef(function CheckoutField({ label, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('w-full', className, tw), ...rest, children: [label ? jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-fg-muted", children: label }) : null, children] }));
});
const CheckoutSection = forwardRef(function CheckoutSection({ title, step, children, className, tw, ...rest }, ref) {
    return (jsxRuntimeExports.jsxs("section", { ref: ref, className: mergeTw('flex flex-col gap-4', className, tw), ...rest, children: [title ? (jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-fg", children: [typeof step === 'number' ? (jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-primary/12 text-xs font-semibold text-primary", children: step })) : null, title] })) : null, children] }));
});
/* ------------------------------ Default sections -------------------------- */
function ContactSection({ step }) {
    return (jsxRuntimeExports.jsx(CheckoutSection, { title: "Contact", step: step, children: jsxRuntimeExports.jsx(CheckoutField, { label: "Email", children: jsxRuntimeExports.jsx(Input, { type: "email", name: "email", placeholder: "you@example.com", autoComplete: "email", tw: field() }) }) }));
}
function ShippingSection({ step }) {
    return (jsxRuntimeExports.jsxs(CheckoutSection, { title: "Shipping", step: step, children: [jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [jsxRuntimeExports.jsx(CheckoutField, { label: "First name", children: jsxRuntimeExports.jsx(Input, { name: "firstName", autoComplete: "given-name", tw: field() }) }), jsxRuntimeExports.jsx(CheckoutField, { label: "Last name", children: jsxRuntimeExports.jsx(Input, { name: "lastName", autoComplete: "family-name", tw: field() }) })] }), jsxRuntimeExports.jsx(CheckoutField, { label: "Address", children: jsxRuntimeExports.jsx(Input, { name: "address", placeholder: "500 Market St", autoComplete: "street-address", tw: field() }) }), jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [jsxRuntimeExports.jsx(CheckoutField, { label: "City", children: jsxRuntimeExports.jsx(Input, { name: "city", autoComplete: "address-level2", tw: field() }) }), jsxRuntimeExports.jsx(CheckoutField, { label: "ZIP", children: jsxRuntimeExports.jsx(Input, { name: "zip", autoComplete: "postal-code", tw: field() }) }), jsxRuntimeExports.jsx(CheckoutField, { label: "Country", children: jsxRuntimeExports.jsxs(Select, { name: "country", defaultValue: "us", tw: field('bg-elevated/70'), children: [jsxRuntimeExports.jsx("option", { value: "us", children: "United States" }), jsxRuntimeExports.jsx("option", { value: "ca", children: "Canada" }), jsxRuntimeExports.jsx("option", { value: "uk", children: "United Kingdom" })] }) })] })] }));
}
function PaymentSection({ step }) {
    return (jsxRuntimeExports.jsxs(CheckoutSection, { title: "Payment", step: step, children: [jsxRuntimeExports.jsx(CheckoutField, { label: "Card number", children: jsxRuntimeExports.jsx(Input, { name: "card", placeholder: "1234 5678 9012 3456", inputMode: "numeric", autoComplete: "cc-number", tw: field() }) }), jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [jsxRuntimeExports.jsx(CheckoutField, { label: "Expiry", children: jsxRuntimeExports.jsx(Input, { name: "expiry", placeholder: "MM / YY", autoComplete: "cc-exp", tw: field() }) }), jsxRuntimeExports.jsx(CheckoutField, { label: "CVC", children: jsxRuntimeExports.jsx(Input, { name: "cvc", placeholder: "123", inputMode: "numeric", autoComplete: "cc-csc", tw: field() }) })] })] }));
}
const CheckoutSummary = forwardRef(function CheckoutSummary({ items = DEFAULT_ITEMS, shipping = 9, currency = '$', cta, children, className, tw, ...rest }, ref) {
    const subtotal = items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0);
    const total = subtotal + shipping;
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('flex flex-col gap-5 rounded-2xl border border-edge/12 bg-panel/60 p-6', className, tw), ...rest, children: children ?? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold tracking-tight text-fg", children: "Order summary" }), jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3", children: items.map((it, i) => (jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("span", { className: "grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-edge/10 bg-canvas/40", children: it.image ? (jsxRuntimeExports.jsx("img", { src: it.image, alt: "", className: "h-full w-full object-cover" })) : (jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-5 w-5 text-fg-subtle", children: jsxRuntimeExports.jsx("path", { d: "M6 7h12l-1 13H7L6 7Zm3 0V5a3 3 0 0 1 6 0v2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })) }), jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium text-fg", children: it.name }), jsxRuntimeExports.jsxs("p", { className: "text-xs text-fg-subtle", children: ["Qty ", it.qty ?? 1] })] }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-fg", children: money(it.price * (it.qty ?? 1), currency) })] }, i))) }), jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 border-t border-edge/10 pt-4 text-sm", children: [jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-fg-muted", children: [jsxRuntimeExports.jsx("span", { children: "Subtotal" }), jsxRuntimeExports.jsx("span", { children: money(subtotal, currency) })] }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-fg-muted", children: [jsxRuntimeExports.jsx("span", { children: "Shipping" }), jsxRuntimeExports.jsx("span", { children: money(shipping, currency) })] }), jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between border-t border-edge/10 pt-3 text-base font-semibold text-fg", children: [jsxRuntimeExports.jsx("span", { children: "Total" }), jsxRuntimeExports.jsx("span", { children: money(total, currency) })] })] }), cta !== null ? (jsxRuntimeExports.jsx(Button, { type: "submit", fullWidth: true, intent: "ghost", tw: mergeTw('h-11 rounded-xl', accentSolid), children: cta ?? `Pay ${money(total, currency)}` })) : null] })) }));
});
/* ----------------------------------- Stepper ------------------------------ */
function Stepper({ step, steps }) {
    return (jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-center gap-3", children: steps.map((label, i) => {
            const n = i + 1;
            const reached = n <= step;
            return (jsxRuntimeExports.jsxs(React.Fragment, { children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: mergeTw('grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition', reached ? 'border-primary bg-primary text-primary-fg' : 'border-edge/20 bg-fg/[0.04] text-fg-subtle'), children: n }), jsxRuntimeExports.jsx("span", { className: mergeTw('text-sm font-medium', n === step ? 'text-fg' : 'text-fg-subtle'), children: label })] }), n < steps.length ? jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-edge/15" }) : null] }, label));
        }) }));
}
/* ----------------------------------- Root --------------------------------- */
const CheckoutFormRoot = forwardRef(function CheckoutForm({ variant = 'single', className, tw, children, onSubmit, items = DEFAULT_ITEMS, shipping = 9, currency = '$', ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const [step, setStep] = useState(1);
    const numbered = variant === 'steps' || variant === 'compact';
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    const wrapper = (inner, padded = true) => (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full text-fg', variant === 'twoColumn' ? 'max-w-5xl' : variant === 'compact' ? 'max-w-md' : 'max-w-xl', 'rounded-2xl', surfaces[variant], padded && variant !== 'twoColumn' ? 'p-6 sm:p-8' : '', className, tw), ...rest, children: inner }) }));
    if (hasChildren) {
        return wrapper(children);
    }
    /* —— steps design —— */
    if (variant === 'steps') {
        const stepLabels = ['Contact', 'Shipping', 'Payment'];
        return wrapper(jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [jsxRuntimeExports.jsx(Stepper, { step: step, steps: stepLabels }), step === 1 ? jsxRuntimeExports.jsx(ContactSection, {}) : step === 2 ? jsxRuntimeExports.jsx(ShippingSection, {}) : jsxRuntimeExports.jsx(PaymentSection, {}), step === 3 ? jsxRuntimeExports.jsx(CheckoutSummary, { items: items, shipping: shipping, currency: currency, cta: null }) : null, jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5", children: [step > 1 ? (jsxRuntimeExports.jsx(Button, { type: "button", intent: "ghost", onClick: () => setStep((s) => s - 1), tw: mergeTw('h-11 rounded-xl', ghostControl), children: "Back" })) : null, step < 3 ? (jsxRuntimeExports.jsx(Button, { type: "button", fullWidth: true, intent: "ghost", onClick: () => setStep((s) => s + 1), tw: mergeTw('h-11 rounded-xl', accentSolid), children: "Continue" })) : (jsxRuntimeExports.jsx(Button, { type: "submit", fullWidth: true, intent: "ghost", tw: mergeTw('h-11 rounded-xl', accentSolid), children: "Place order" }))] })] }));
    }
    /* —— twoColumn design: form left, sticky summary right —— */
    if (variant === 'twoColumn') {
        return wrapper(jsxRuntimeExports.jsxs("div", { className: "grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]", children: [jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-8 rounded-2xl border border-edge/10 bg-elevated p-6 shadow-luxe-sm sm:p-8", children: [jsxRuntimeExports.jsx(ContactSection, { step: 1 }), jsxRuntimeExports.jsx(ShippingSection, { step: 2 }), jsxRuntimeExports.jsx(PaymentSection, { step: 3 })] }), jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-6", children: jsxRuntimeExports.jsx(CheckoutSummary, { items: items, shipping: shipping, currency: currency }) })] }), false);
    }
    /* —— single / card / glass / compact —— */
    return wrapper(jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-8", children: [jsxRuntimeExports.jsx(ContactSection, { step: numbered ? 1 : undefined }), jsxRuntimeExports.jsx(ShippingSection, { step: numbered ? 2 : undefined }), jsxRuntimeExports.jsx(PaymentSection, { step: numbered ? 3 : undefined }), jsxRuntimeExports.jsx(CheckoutSummary, { items: items, shipping: shipping, currency: currency })] }));
});
const CheckoutForm = CheckoutFormRoot;
CheckoutForm.Section = CheckoutSection;
CheckoutForm.Field = CheckoutField;
CheckoutForm.Summary = CheckoutSummary;

const PRODUCTGRID_VARIANTS = [
    'grid3',
    'grid4',
    'list',
    'masonry',
    'compact',
    'featured',
];
/* ──────────────────────────── Layout maps ───────────────────────────────── */
const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 lg:grid-cols-5',
};
/* ──────────────────────────── Inline icons ──────────────────────────────── */
function Star({ fill }) {
    const id = React.useId();
    return (jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 20 20", "aria-hidden": "true", className: "h-3.5 w-3.5 text-primary", children: [fill === 'half' ? (jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsxs("linearGradient", { id: id, children: [jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor" }), jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor", stopOpacity: "0.25" })] }) })) : null, jsxRuntimeExports.jsx("path", { d: "M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z", fill: fill === 'full' ? 'currentColor' : fill === 'half' ? `url(#${id})` : 'currentColor', fillOpacity: fill === 'empty' ? 0.25 : 1 })] }));
}
function Rating({ value }) {
    return (jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", children: [jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }, (_, i) => {
                    const fill = value >= i + 1 ? 'full' : value >= i + 0.5 ? 'half' : 'empty';
                    return jsxRuntimeExports.jsx(Star, { fill: fill }, i);
                }) }), jsxRuntimeExports.jsx("span", { className: "font-medium text-fg-muted", children: value.toFixed(1) })] }));
}
function ImageFallback({ className }) {
    return (jsxRuntimeExports.jsx("div", { className: mergeTw('grid h-full w-full place-items-center text-fg-subtle', className), children: jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "h-9 w-9", children: jsxRuntimeExports.jsx("path", { d: "M3 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6zM3 16l4.5-4.5a2 2 0 012.8 0L15 16M14 13l1.5-1.5a2 2 0 012.8 0L21 14M9 9.5a1 1 0 11-2 0 1 1 0 012 0z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }));
}
function formatPrice(amount, currency) {
    if (amount == null)
        return null;
    return typeof amount === 'number' ? `${currency}${amount}` : amount;
}
const ProductGridItem = forwardRef(function ProductGridItem({ image, title, price, originalPrice, badge, rating, row, feature, currency = '$', cta = 'Add to cart', children, className, tw, ...rest }, ref) {
    const variant = useBlockVariant();
    if (children) {
        return (jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('group/item', className, tw), ...rest, children: children }));
    }
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: mergeTw('group/item flex overflow-hidden rounded-2xl border border-edge/10 bg-elevated text-fg shadow-luxe-sm transition-shadow hover:shadow-luxe', row ? 'flex-row items-stretch' : 'flex-col', className, tw), ...rest, children: [jsxRuntimeExports.jsxs("div", { className: mergeTw('relative shrink-0 overflow-hidden bg-canvas/40', row ? 'aspect-square w-32 sm:w-40' : feature ? 'aspect-[16/10]' : 'aspect-[4/3]'), children: [image ? (jsxRuntimeExports.jsx("img", { src: image, alt: typeof title === 'string' ? title : '', className: "h-full w-full object-cover transition-transform duration-500 group-hover/item:scale-105" })) : (jsxRuntimeExports.jsx(ImageFallback, {})), badge ? (jsxRuntimeExports.jsx(Badge, { tw: "absolute left-3 top-3 border border-primary/20 bg-primary/15 text-primary backdrop-blur-sm", children: badge })) : null] }), jsxRuntimeExports.jsxs("div", { className: mergeTw('flex flex-1 flex-col gap-2 p-4', feature && 'gap-3 p-5'), children: [typeof rating === 'number' ? jsxRuntimeExports.jsx(Rating, { value: rating }) : null, jsxRuntimeExports.jsx("h3", { className: mergeTw('font-display font-semibold leading-snug text-fg', feature ? 'text-lg' : 'text-sm'), children: title }), jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-baseline gap-2 pt-1", children: [jsxRuntimeExports.jsx("span", { className: mergeTw('font-display font-semibold tracking-tight text-fg', feature ? 'text-2xl' : 'text-lg'), children: formatPrice(price, currency) }), originalPrice != null ? (jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-fg-subtle line-through", children: formatPrice(originalPrice, currency) })) : null] }), jsxRuntimeExports.jsx(Button, { intent: "ghost", fullWidth: true, tw: mergeTw('mt-2 h-10 rounded-xl', feature || variant === 'featured' ? accentSolid : ghostControl), children: cta })] })] }));
});
/* ----------------------------------- Root --------------------------------- */
const SAMPLE = [
    { title: 'Aero Runner', price: 129, originalPrice: 189, badge: 'Sale', rating: 4.5 },
    { title: 'Trail Blazer', price: 149, rating: 4.8 },
    { title: 'Court Classic', price: 99, rating: 4.2 },
    { title: 'Studio Flex', price: 89, badge: 'New', rating: 4.6 },
];
const ProductGridRoot = forwardRef(function ProductGrid({ variant = 'grid3', className, tw, children, products = SAMPLE, columns, currency = '$', cta, ...rest }, ref) {
    const hasChildren = React.Children.count(children) > 0;
    const isList = variant === 'list';
    const isMasonry = variant === 'masonry';
    const isFeatured = variant === 'featured';
    const cols = columns ?? (variant === 'grid4' ? 4 : variant === 'compact' ? 4 : 3);
    let containerClass;
    if (isList) {
        containerClass = 'flex flex-col gap-4';
    }
    else if (isMasonry) {
        containerClass = 'columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid';
    }
    else if (isFeatured) {
        containerClass = 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3';
    }
    else {
        containerClass = mergeTw('grid gap-5', gridCols[cols] ?? gridCols[3]);
    }
    return (jsxRuntimeExports.jsx(BlockVariantContext.Provider, { value: variant, children: jsxRuntimeExports.jsx("div", { ref: ref, className: mergeTw('w-full text-fg', className, tw), ...rest, children: jsxRuntimeExports.jsx("div", { className: containerClass, children: hasChildren
                    ? children
                    : products.map((p, i) => (jsxRuntimeExports.jsx(ProductGridItem, { ...p, currency: currency, cta: cta, row: isList, feature: isFeatured && i === 0, className: mergeTw(isFeatured && i === 0 && 'sm:col-span-2 lg:row-span-2', variant === 'compact' && 'shadow-none') }, i))) }) }) }));
});
const ProductGrid = ProductGridRoot;
ProductGrid.Item = ProductGridItem;

export { Accordion, Alert, Avatar, BLOCK_VARIANTS, Badge, BlockVariantContext, BlogCard, Breadcrumb, Button, CHECKOUTFORM_VARIANTS, COMMAND_PALETTE_VARIANTS, CONTACTFORM_VARIANTS, CTASection, CTA_SECTION_VARIANTS, Card, Carousel, CarouselImage, CarouselSlide, Checkbox, CheckoutForm, Code, CommandPalette, ContactForm, DASHBOARD_SHELL_VARIANTS, DashboardShell, Dialog, Drawer, DropdownMenu, EMPTY_STATE_VARIANTS, EmptyState, Eyebrow, FAQ, FAQ_VARIANTS, FEATURE_GRID_VARIANTS, FOOTER_VARIANTS, FeatureGrid, Footer, Gallery, GalleryImage, GalleryLightbox, HERO_VARIANTS, Hero, Icon, IconButton, Input, Kbd, LoadingOverlay, Dialog as Modal, NAVBAR_VARIANTS, Navbar, PRICING_TABLE_VARIANTS, PRODUCTGRID_VARIANTS, Pagination, Popover, PricingCard, PricingTable, ProductCard, ProductGrid, ProfileCard, Progress, Radio, SETTINGSFORM_VARIANTS, SIDEBAR_VARIANTS, SIGNIN_VARIANTS, SIGNUP_VARIANTS, Select, SettingsForm, Sidebar, SignIn, SignUp, Skeleton, Spinner, Stat, StatCard, TESTIMONIALS_VARIANTS, Table, Tabs, TestimonialCard, Testimonials, Textarea, ToastProvider, Toggle, Tooltip, accentSoft, accentSolid, createComponent, createSlots, cx, ghostControl, icons, inputSurface, mergeTw, surfaceVariants, tv, useBlockVariant, useCarousel, useFocusReturn, useFocusTrap, useGalleryLightbox, useIsomorphicLayoutEffect, useLockScroll, useStableId, useToast };
//# sourceMappingURL=index.js.map
