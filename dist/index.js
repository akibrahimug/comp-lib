import { twMerge } from 'tailwind-merge';
import React, { forwardRef, createContext, useContext, useLayoutEffect, useEffect, useId, useRef, useState, useCallback } from 'react';
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

export { Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Carousel, CarouselImage, CarouselSlide, Checkbox, Code, Dialog, Drawer, DropdownMenu, Eyebrow, Gallery, GalleryImage, GalleryLightbox, Icon, IconButton, Input, Kbd, LoadingOverlay, Dialog as Modal, Pagination, Popover, Progress, Radio, Select, Skeleton, Spinner, Stat, Table, Tabs, Textarea, ToastProvider, Toggle, Tooltip, createComponent, createSlots, cx, icons, mergeTw, tv, useCarousel, useFocusReturn, useFocusTrap, useGalleryLightbox, useIsomorphicLayoutEffect, useLockScroll, useStableId, useToast };
//# sourceMappingURL=index.js.map
