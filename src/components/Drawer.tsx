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

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  position: 'left' | 'right' | 'top' | 'bottom';
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer compound components must be used within Drawer.Root');
  }
  return context;
}

/* ---------------------------------- Root ---------------------------------- */

export interface DrawerRootProps {
  /** Whether the drawer is open */
  open?: boolean;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Position of the drawer */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Children */
  children: ReactNode;
}

const DrawerRoot = ({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  position = 'right',
  children,
}: DrawerRootProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = useStableId('drawer-title');
  const descriptionId = useStableId('drawer-description');

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange, titleId, descriptionId, position }}>
      {children}
    </DrawerContext.Provider>
  );
};

/* --------------------------------- Overlay -------------------------------- */

export interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(function DrawerOverlay(
  { className, tw, ...props },
  ref
) {
  const { open } = useDrawerContext();

  if (!open) return null;

  return createPortal(
    <div
      ref={ref}
      className={mergeTw(
        'fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm',
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

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(function DrawerContent(
  { children, className, tw, ...props },
  ref
) {
  const { open, onOpenChange, titleId, descriptionId, position } = useDrawerContext();
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

  const positionClasses = {
    left: 'left-0 top-0 h-full w-full max-w-md animate-slide-in-from-left',
    right: 'right-0 top-0 h-full w-full max-w-md animate-slide-in-from-right',
    top: 'top-0 left-0 w-full h-full max-h-96 animate-slide-in-from-top',
    bottom: 'bottom-0 left-0 w-full h-full max-h-96 animate-slide-in-from-bottom',
  };

  return createPortal(
    <div className="fixed inset-0 z-50" onClick={handleBackdropClick}>
      <div
        ref={handleRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={mergeTw(
          'fixed bg-white p-6 shadow-card',
          positionClasses[position],
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

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(function DrawerHeader(
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

export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(function DrawerTitle(
  { children, className, tw, ...props },
  ref
) {
  const { titleId } = useDrawerContext();

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

export interface DrawerDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(function DrawerDescription(
  { children, className, tw, ...props },
  ref
) {
  const { descriptionId } = useDrawerContext();

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

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(function DrawerFooter(
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

export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(function DrawerClose(
  { children, className, tw, onClick, ...props },
  ref
) {
  const { onOpenChange } = useDrawerContext();

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
 * Drawer component with focus trap, scroll lock, and keyboard handling.
 * Slides in from left, right, top, or bottom.
 *
 * @example
 * <Drawer.Root open={isOpen} onOpenChange={setIsOpen} position="right">
 *   <Drawer.Overlay />
 *   <Drawer.Content>
 *     <Drawer.Close />
 *     <Drawer.Header>
 *       <Drawer.Title>Title</Drawer.Title>
 *       <Drawer.Description>Description</Drawer.Description>
 *     </Drawer.Header>
 *     <div>Content</div>
 *     <Drawer.Footer>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Drawer.Footer>
 *   </Drawer.Content>
 * </Drawer.Root>
 */
export const Drawer = {
  Root: DrawerRoot,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Close: DrawerClose,
};
