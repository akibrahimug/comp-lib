/**
 * Spinner/Loader component for loading states.
 * Accessible with proper ARIA attributes.
 */
export declare const Spinner: import("..").PolymorphicComponent<import("..").InferVariantProps<any>, "div">;
/**
 * Full-page loading overlay with spinner.
 * Blocks interaction while content is loading.
 */
export declare function LoadingOverlay({ message, show, }: {
    message?: string;
    show?: boolean;
}): import("react/jsx-runtime").JSX.Element | null;
