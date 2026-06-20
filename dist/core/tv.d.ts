type VariantConfig = Record<string, Record<string, string>>;
export type InferVariantProps<Cfg extends VariantConfig> = {
    [K in keyof Cfg]?: keyof Cfg[K] extends string | number | boolean ? keyof Cfg[K] : never;
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
