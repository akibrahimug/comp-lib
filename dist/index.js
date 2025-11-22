import { twMerge } from 'tailwind-merge';
import { forwardRef, createContext, useContext } from 'react';

function cx(...parts) {
    return parts.filter(Boolean).join(' ');
}

function mergeTw(...classes) {
    return twMerge(...classes.filter(Boolean).map(String));
}

string | number | boolean | undefined;
function tv(opts) {
    const { base = '', variants = {}, defaultVariants = {}, compoundVariants = [] } = opts;
    return function getClassNames(variantProps) {
        const vp = { ...defaultVariants, ...(variantProps || {}) };
        const variantClasses = Object.entries(variants).map(([k, map]) => {
            const val = vp[k];
            return val != null ? map[val] ?? '' : '';
        });
        const compound = compoundVariants
            .filter((rule) => Object.entries(rule).every(([rk, rv]) => (rk === 'class' ? true : vp[rk] === rv)))
            .map((r) => r.class);
        const { className, tw } = vp;
        return [base, ...variantClasses, ...compound, className, tw].filter(Boolean).join(' ');
    };
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

{
  jsxRuntime.exports = requireReactJsxRuntime_production();
}

var jsxRuntimeExports = jsxRuntime.exports;

function createComponent(opts) {
    const { as, displayName } = opts;
    const getClass = tv(opts);
    const Comp = forwardRef(function Comp({ as: As = as || 'div', className, tw, children, ...rest }, ref) {
        const cls = mergeTw(getClass({ ...rest, className, tw }));
        // @ts-expect-error polymorphic
        return jsxRuntimeExports.jsx(As, { ref: ref, className: cls, ...rest, children: children });
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
        // @ts-expect-error polymorphic
        return jsxRuntimeExports.jsx(As, { ref: ref, className: cls, ...rest, children: jsxRuntimeExports.jsx(SlotsCtx.Provider, { value: ctxVal, children: children }) });
    });
    const makeSlot = (slotName) => {
        const S = forwardRef(function Slot({ as: As = 'div', className, tw, children, ...rest }, ref) {
            const ctx = useContext(SlotsCtx);
            const baseCls = ctx[slotName] || '';
            const cls = mergeTw(baseCls, className, tw);
            // @ts-expect-error polymorphic
            return jsxRuntimeExports.jsx(As, { ref: ref, className: cls, ...rest, children: children });
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

const Button = createComponent({
    as: 'button',
    displayName: 'Button',
    base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
    variants: {
        intent: {
            primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
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

const Card = createSlots({
    root: { base: 'rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden' },
    header: { base: 'px-6 py-4 border-b border-gray-100 flex items-center justify-between' },
    title: { base: 'text-lg font-semibold' },
    description: { base: 'mt-1 text-sm text-gray-600' },
    content: { base: 'px-6 py-5' },
    footer: { base: 'px-6 py-4 border-t border-gray-100' }
}, { as: 'section'});

export { Button, Card, createComponent, createSlots, cx, mergeTw, tv };
//# sourceMappingURL=index.js.map
