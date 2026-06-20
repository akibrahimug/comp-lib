import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { tv } from './tv';
import { mergeTw } from './mergeTw';
export function createComponent(opts) {
    const { as, displayName } = opts;
    const getClass = tv(opts);
    const Comp = forwardRef(function Comp({ as: As = as || 'div', className, tw, children, ...rest }, ref) {
        const cls = mergeTw(getClass({ ...rest, className, tw }));
        const Element = As;
        return _jsx(Element, { ref: ref, className: cls, ...rest, children: children });
    });
    Comp.displayName = displayName || 'Component';
    return Comp;
}
