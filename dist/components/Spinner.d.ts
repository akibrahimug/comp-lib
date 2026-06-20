/**
 * Spinner/Loader component for loading states.
 * Accessible with proper ARIA attributes.
 */
export declare const Spinner: import("..").PolymorphicComponent<import("..").InferVariantProps<{
    size: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    color: {
        brand: string;
        white: string;
        gray: string;
        danger: string;
        success: string;
    };
}>, "div">;
/**
 * Full-page loading overlay with spinner.
 * Blocks interaction while content is loading.
 */
export declare function LoadingOverlay({ message, show, }: {
    message?: string;
    show?: boolean;
}): import("react/jsx-runtime").JSX.Element | null;
