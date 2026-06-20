export type VariantConfig = Record<string, Record<string, string>>;
/** Map a single variant's option-keys to a prop type. Variants keyed by
 *  "true"/"false" become a `boolean` prop; all others become a union of their
 *  string keys. */
type VariantPropValue<V> = 'true' extends keyof V ? boolean : 'false' extends keyof V ? boolean : keyof V & (string | number);
export type InferVariantProps<Cfg extends VariantConfig> = {
    [K in keyof Cfg]?: VariantPropValue<Cfg[K]>;
};
export interface TVOptions<Cfg extends VariantConfig> {
    base?: string;
    variants?: Cfg;
    defaultVariants?: Partial<InferVariantProps<Cfg>>;
    compoundVariants?: Array<Partial<InferVariantProps<Cfg>> & {
        class: string;
    }>;
}
export declare function tv<Cfg extends VariantConfig>(opts: TVOptions<Cfg>): (variantProps?: Partial<InferVariantProps<Cfg>> & {
    tw?: string;
    className?: string;
}) => string;
export {};
