import React, { createContext, forwardRef, useContext, type ElementType } from 'react';
import { tv, type TVOptions } from './tv';
import { mergeTw } from './mergeTw';

type SlotConfig = { [slotName: string]: TVOptions<any> };
type SlotMap = Record<string, (args?: any) => string>;
const SlotsCtx = createContext<Record<string, string>>({});

export function createSlots<SCfg extends SlotConfig>(slots: SCfg, opts?: { displayName?: string; as?: ElementType }) {
  const fns: SlotMap = Object.fromEntries(Object.entries(slots).map(([n, cfg]) => [n, tv(cfg)])) as SlotMap;

  const Root = forwardRef<any, any>(function Root({ as: As = opts?.as || 'div', className, tw, children, ...rest }, ref) {
    const cls = fns['root'] ? fns['root']({ className, tw, ...(rest as any) }) : mergeTw(className, tw);
    const ctxVal = Object.fromEntries(Object.entries(fns).map(([n, fn]) => [n, fn(rest)]));
    const Element = As as React.ElementType;
    return <Element ref={ref} className={cls} {...rest}><SlotsCtx.Provider value={ctxVal}>{children}</SlotsCtx.Provider></Element>;
  });

  const makeSlot = (slotName: string) => {
    const S = forwardRef<any, any>(function Slot({ as: As = 'div', className, tw, children, ...rest }, ref) {
      const ctx = useContext(SlotsCtx);
      const baseCls = ctx[slotName] || '';
      const cls = mergeTw(baseCls, className, tw);
      const Element = As as React.ElementType;
      return <Element ref={ref} className={cls} {...rest}>{children}</Element>;
    });
    (S as any).displayName = `Slot.${slotName}`;
    return S;
  };

  const out: Record<string, any> = { Root };
  Object.keys(slots).forEach((name) => {
    if (name !== 'root') out[name[0].toUpperCase() + name.slice(1)] = makeSlot(name);
  });
  return out as { Root: any } & Record<Capitalize<Exclude<keyof SCfg, 'root'> & string>, any>;
}
