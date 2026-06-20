import { type ReactNode } from 'react';
export interface ToastProviderProps {
    /** Children */
    children: ReactNode;
    /** Maximum number of toasts to show at once */
    max?: number;
}
export declare function ToastProvider({ children, max }: ToastProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access toast functionality.
 * Must be used within ToastProvider.
 */
export declare function useToast(): {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
};
