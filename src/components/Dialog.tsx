import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { useLockScroll } from '../hooks/useLockScroll';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useFocusReturn } from '../hooks/useFocusReturn';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog compound components must be used within Dialog.Root');
  }
  return context;
}

/* ---------------------------------- Root ---------------------------------- */

export interface DialogRootProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Children */
  children: ReactNode;
}

const DialogRoot = ({ open: controlledOpen, defaultOpen, onOpenChange, children }: DialogRootProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = useStableId('dialog-title');
  const descriptionId = useStableId('dialog-description');

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
};

/* --------------------------------- Overlay -------------------------------- */

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(function DialogOverlay(
  { className, tw, ...props },
  ref
) {
  const { open } = useDialogContext();

  if (!open) return null;

  return createPortal(
    <div
      ref={ref}
      className={mergeTw(
        'fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm',
        'animate-fade-in',
        className,
        tw
      )}
      {...props}
    />,
    document.body
  );
});

/* --------------------------------- Content -------------------------------- */

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { children, className, tw, ...props },
  ref
) {
  const { open, onOpenChange, titleId, descriptionId } = useDialogContext();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLockScroll(open);
  useFocusTrap(contentRef, open);
  useFocusReturn();

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  const handleRef = (node: HTMLDivElement | null) => {
    contentRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={handleRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={mergeTw(
          'relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-card',
          'animate-zoom-in-95',
          className,
          tw
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
});

/* --------------------------------- Header --------------------------------- */

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { children, className, tw, ...props },
  ref
) {
  return (
    <div ref={ref} className={mergeTw('mb-4', className, tw)} {...props}>
      {children}
    </div>
  );
});

/* ---------------------------------- Title --------------------------------- */

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { children, className, tw, ...props },
  ref
) {
  const { titleId } = useDialogContext();

  return (
    <h2
      ref={ref}
      id={titleId}
      className={mergeTw('text-lg font-semibold text-gray-900', className, tw)}
      {...props}
    >
      {children}
    </h2>
  );
});

/* ------------------------------- Description ------------------------------ */

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(function DialogDescription(
  { children, className, tw, ...props },
  ref
) {
  const { descriptionId } = useDialogContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={mergeTw('text-sm text-gray-600 mt-1', className, tw)}
      {...props}
    >
      {children}
    </p>
  );
});

/* --------------------------------- Footer --------------------------------- */

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { children, className, tw, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={mergeTw('mt-6 flex items-center justify-end gap-3', className, tw)}
      {...props}
    >
      {children}
    </div>
  );
});

/* ---------------------------------- Close --------------------------------- */

export interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { children, className, tw, onClick, ...props },
  ref
) {
  const { onOpenChange } = useDialogContext();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpenChange(false);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={mergeTw(
        'absolute right-4 top-4 rounded-md p-1 text-gray-400',
        'hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-600',
        className,
        tw
      )}
      {...props}
    >
      {children || (
        <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
});

/* --------------------------------- Export --------------------------------- */

/**
 * Dialog/Modal component with focus trap, scroll lock, and keyboard handling.
 * Accessible with ARIA attributes and focus management.
 *
 * @example
 * <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <Dialog.Overlay />
 *   <Dialog.Content>
 *     <Dialog.Close />
 *     <Dialog.Header>
 *       <Dialog.Title>Title</Dialog.Title>
 *       <Dialog.Description>Description</Dialog.Description>
 *     </Dialog.Header>
 *     <div>Content</div>
 *     <Dialog.Footer>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog.Root>
 */
export const Dialog = {
  Root: DialogRoot,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
};
