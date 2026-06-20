import { type ElementType } from 'react';
import { type TVOptions } from './tv';
type SlotConfig = {
    [slotName: string]: TVOptions<any>;
};
export declare function createSlots<SCfg extends SlotConfig>(slots: SCfg, opts?: {
    displayName?: string;
    as?: ElementType;
}): {
    Root: any;
} & Record<Capitalize<Exclude<keyof SCfg, "root"> & string>, any>;
export {};
