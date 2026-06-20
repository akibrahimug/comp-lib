/**
 * Button component with multiple intents, sizes, and states.
 * Supports polymorphic rendering via `as` prop and className extension via `tw` prop.
 */
export declare const Button: import("..").PolymorphicComponent<import("..").InferVariantProps<{
    intent: {
        primary: string;
        secondary: string;
        danger: string;
        ghost: string;
    };
    size: {
        sm: string;
        md: string;
        lg: string;
    };
    loading: {
        true: string;
        false: string;
    };
    fullWidth: {
        true: string;
        false: string;
    };
}>, "button">;
