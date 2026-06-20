import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, forwardRef, useContext } from 'react';
import { tv } from './tv';
import { mergeTw } from './mergeTw';
const SlotsCtx = createContext({});
export function createSlots(slots, opts) {
    const fns = Object.fromEntries(Object.entries(slots).map(([n, cfg]) => [n, tv(cfg)]));
    const Root = forwardRef(function Root({ as: As = opts?.as || 'div', className, tw, children, ...rest }, ref) {
        const cls = fns['root'] ? fns['root']({ className, tw, ...rest }) : mergeTw(className, tw);
        const ctxVal = Object.fromEntries(Object.entries(fns).map(([n, fn]) => [n, fn(rest)]));
        const Element = As;
        return _jsx(Element, { ref: ref, className: cls, ...rest, children: _jsx(SlotsCtx.Provider, { value: ctxVal, children: children }) });
    });
    const makeSlot = (slotName) => {
        const S = forwardRef(function Slot({ as: As = 'div', className, tw, children, ...rest }, ref) {
            const ctx = useContext(SlotsCtx);
            const baseCls = ctx[slotName] || '';
            const cls = mergeTw(baseCls, className, tw);
            const Element = As;
            return _jsx(Element, { ref: ref, className: cls, ...rest, children: children });
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
