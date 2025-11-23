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

/**
 * Avatar component for displaying user profile images or initials.
 */
const Avatar = createComponent({
    as: 'div',
    displayName: 'Avatar',
    base: 'relative inline-flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700 overflow-hidden flex-shrink-0',
    variants: {
        size: {
            xs: 'h-6 w-6 text-xs',
            sm: 'h-8 w-8 text-sm',
            md: 'h-10 w-10 text-base',
            lg: 'h-12 w-12 text-lg',
            xl: 'h-16 w-16 text-xl',
            '2xl': 'h-20 w-20 text-2xl',
        },
    },
    defaultVariants: {
        size: 'md',
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

export { Avatar, Badge, Button, Card, Carousel, CarouselImage, CarouselSlide, Checkbox, Dialog, Drawer, Gallery, GalleryImage, GalleryLightbox, Input, LoadingOverlay, Dialog as Modal, Radio, Select, Spinner, Tabs, Textarea, ToastProvider, Toggle, Tooltip, createComponent, createSlots, cx, mergeTw, tv, useCarousel, useFocusReturn, useFocusTrap, useGalleryLightbox, useIsomorphicLayoutEffect, useLockScroll, useStableId, useToast };
//# sourceMappingURL=index.js.map
