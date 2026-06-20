import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import { useStableId } from '../hooks/useStableId';
import { useFocusReturn } from '../hooks/useFocusReturn';
import { mergeTw } from '../core/mergeTw';

type Align = 'start' | 'end' | 'center';
type Side = 'bottom' | 'top' | 'left' | 'right';

interface PopoverContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  popoverId: string;
  align: Align;
  side: Side;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);
function usePopover() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('Popover components must be used within Popover.Root');
  return ctx;
}

/* ---------------------------------- Root ---------------------------------- */

export interface PopoverRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: Align;
  side?: Side;
}

const Root = ({ children, open: controlled, defaultOpen, onOpenChange, align = 'center', side = 'bottom' }: PopoverRootProps) => {
  const [internal, setInternal] = useState(defaultOpen || false);
  const isControlled = controlled !== undefined;
  const open = isControlled ? controlled : internal;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const popoverId = useStableId('popover');

  const setOpen = useCallback(
    (o: boolean) => {
      if (!isControlled) setInternal(o);
      onOpenChange?.(o);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef, popoverId, align, side }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

/* -------------------------------- Trigger --------------------------------- */

export interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  tw?: string;
}

const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function Trigger(
  { className, tw, children, onClick, ...props },
  ref
) {
  const { open, setOpen, triggerRef, popoverId } = usePopover();
  const handleRef = (node: HTMLButtonElement | null) => {
    (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
  };
  return (
    <button
      ref={handleRef}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? popoverId : undefined}
      onClick={(e) => {
        setOpen(!open);
        onClick?.(e);
      }}
      className={mergeTw(className, tw)}
      {...props}
    >
      {children}
    </button>
  );
});

/* -------------------------------- Content --------------------------------- */

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  className?: string;
  tw?: string;
}

const Content = forwardRef<HTMLDivElement, PopoverContentProps>(function Content(
  { sideOffset = 8, className, tw, children, ...props },
  ref
) {
  const { open, setOpen, triggerRef, contentRef, popoverId, align, side } = usePopover();
  const [style, setStyle] = useState<CSSProperties>({ position: 'fixed', top: 0, left: 0, opacity: 0 });
  useFocusReturn();

  const handleRef = (node: HTMLDivElement | null) => {
    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const t = triggerRef.current?.getBoundingClientRect();
      const c = contentRef.current?.getBoundingClientRect();
      if (!t || !c) return;
      let top = 0;
      let left = 0;
      if (side === 'bottom' || side === 'top') {
        top = side === 'bottom' ? t.bottom + sideOffset : t.top - c.height - sideOffset;
        left = align === 'start' ? t.left : align === 'end' ? t.right - c.width : t.left + t.width / 2 - c.width / 2;
      } else {
        left = side === 'right' ? t.right + sideOffset : t.left - c.width - sideOffset;
        top = align === 'start' ? t.top : align === 'end' ? t.bottom - c.height : t.top + t.height / 2 - c.height / 2;
      }
      left = Math.max(8, Math.min(left, window.innerWidth - c.width - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - c.height - 8));
      setStyle({ position: 'fixed', top, left, opacity: 1 });
    };
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, align, side, sideOffset, triggerRef, contentRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!contentRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, setOpen, contentRef, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={handleRef}
      id={popoverId}
      role="dialog"
      style={style}
      className={mergeTw(
        'z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-card',
        'animate-zoom-in-95',
        className,
        tw
      )}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
});

/* ---------------------------------- Close --------------------------------- */

const Close = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & { tw?: string }>(function Close(
  { className, tw, children, onClick, ...props },
  ref
) {
  const { setOpen } = usePopover();
  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      className={mergeTw(
        'absolute right-3 top-3 rounded-md p-1 text-gray-400 transition hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
        className,
        tw
      )}
      aria-label="Close"
      {...props}
    >
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
});

/* --------------------------------- Export --------------------------------- */

/**
 * Popover — floating panel anchored to a trigger, with portal positioning,
 * outside-click & Escape dismissal and focus return.
 *
 * @example
 * <Popover.Root side="bottom" align="end">
 *   <Popover.Trigger><Button>Open</Button></Popover.Trigger>
 *   <Popover.Content>
 *     <Popover.Close />
 *     <p>Anything you like in here.</p>
 *   </Popover.Content>
 * </Popover.Root>
 */
export const Popover = {
  Root,
  Trigger,
  Content,
  Close,
};
