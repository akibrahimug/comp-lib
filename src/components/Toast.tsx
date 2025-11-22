import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { mergeTw } from '../core/mergeTw';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

/* ------------------------------- ToastProvider ----------------------------- */

export interface ToastProviderProps {
  /** Children */
  children: ReactNode;
  /** Maximum number of toasts to show at once */
  max?: number;
}

export function ToastProvider({ children, max = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 5000) => {
      const id = `toast-${++toastCounter}`;
      const newToast: Toast = { id, message, variant, duration };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-max);
      });
    },
    [max]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/* -------------------------------- useToast -------------------------------- */

/**
 * Hook to access toast functionality.
 * Must be used within ToastProvider.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return {
    success: (message: string, duration?: number) => context.addToast(message, 'success', duration),
    error: (message: string, duration?: number) => context.addToast(message, 'error', duration),
    warning: (message: string, duration?: number) => context.addToast(message, 'warning', duration),
    info: (message: string, duration?: number) => context.addToast(message, 'info', duration),
  };
}

/* ----------------------------- ToastContainer ----------------------------- */

function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts } = context;

  return createPortal(
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
}

/* -------------------------------- ToastItem ------------------------------- */

interface ToastItemProps {
  toast: Toast;
}

function ToastItem({ toast }: ToastItemProps) {
  const context = useContext(ToastContext);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!toast.duration || isHovered) return;

    const timer = setTimeout(() => {
      context?.removeToast(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, isHovered, context]);

  const handleClose = () => {
    context?.removeToast(toast.id);
  };

  const variantStyles = {
    success: 'bg-success-600 text-white',
    error: 'bg-danger-600 text-white',
    warning: 'bg-accent-600 text-gray-900',
    info: 'bg-brand-600 text-white',
  };

  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
        <path
          d="M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM10.7869 6.03615L7.22344 9.59961C7.13377 9.68928 7.01563 9.73926 6.89258 9.73926C6.76953 9.73926 6.65137 9.68928 6.5617 9.59961L4.71045 7.74834C4.52344 7.56133 4.52344 7.25977 4.71045 7.07275C4.89746 6.88574 5.19902 6.88574 5.38604 7.07275L6.89258 8.57928L10.1113 5.36055C10.2983 5.17354 10.5999 5.17354 10.7869 5.36055C10.9739 5.54756 10.9739 5.84912 10.7869 6.03615Z"
          fill="currentColor"
        />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
        <path
          d="M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM10.1768 9.51758C10.3638 9.70459 10.3638 10.0061 10.1768 10.1932C10.0835 10.2865 9.96289 10.3335 9.84229 10.3335C9.72168 10.3335 9.60107 10.2865 9.50781 10.1932L7.5 8.18555L5.49219 10.1932C5.39893 10.2865 5.27832 10.3335 5.15771 10.3335C5.03711 10.3335 4.9165 10.2865 4.82324 10.1932C4.63623 10.0061 4.63623 9.70459 4.82324 9.51758L6.83105 7.5098L4.82324 5.50195C4.63623 5.31494 4.63623 5.01338 4.82324 4.82637C5.01025 4.63936 5.31181 4.63936 5.49883 4.82637L7.50664 6.83418L9.51445 4.82637C9.70146 4.63936 10.003 4.63936 10.19 4.82637C10.377 5.01338 10.377 5.31494 10.19 5.50195L8.18213 7.50977L10.1768 9.51758Z"
          fill="currentColor"
        />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
        <path
          d="M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM7.5 10.5C7.15381 10.5 6.875 10.2212 6.875 9.875C6.875 9.52881 7.15381 9.25 7.5 9.25C7.84619 9.25 8.125 9.52881 8.125 9.875C8.125 10.2212 7.84619 10.5 7.5 10.5ZM8.125 7.375C8.125 7.72119 7.84619 8 7.5 8C7.15381 8 6.875 7.72119 6.875 7.375V4.625C6.875 4.27881 7.15381 4 7.5 4C7.84619 4 8.125 4.27881 8.125 4.625V7.375Z"
          fill="currentColor"
        />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
        <path
          d="M7.5 0.875C3.83769 0.875 0.875 3.83769 0.875 7.5C0.875 11.1623 3.83769 14.125 7.5 14.125C11.1623 14.125 14.125 11.1623 14.125 7.5C14.125 3.83769 11.1623 0.875 7.5 0.875ZM7.5 10.625C7.15381 10.625 6.875 10.3462 6.875 10V7.5C6.875 7.15381 7.15381 6.875 7.5 6.875C7.84619 6.875 8.125 7.15381 8.125 7.5V10C8.125 10.3462 7.84619 10.625 7.5 10.625ZM7.5 5.625C7.15381 5.625 6.875 5.34619 6.875 5C6.875 4.65381 7.15381 4.375 7.5 4.375C7.84619 4.375 8.125 4.65381 8.125 5C8.125 5.34619 7.84619 5.625 7.5 5.625Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return (
    <div
      role="status"
      className={mergeTw(
        'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-card min-w-[320px]',
        'animate-slide-in-from-right',
        variantStyles[toast.variant]
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex-shrink-0">{icons[toast.variant]}</span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={handleClose}
        className="flex-shrink-0 rounded-md p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close toast"
      >
        <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
