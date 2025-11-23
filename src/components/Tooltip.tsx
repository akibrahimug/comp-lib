import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { useStableId } from '../hooks/useStableId';
import { mergeTw } from '../core/mergeTw';

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  tooltipId: string;
  position: Position;
  triggerRef: React.RefObject<HTMLElement>;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip compound components must be used within Tooltip.Root');
  }
  return context;
}

type Position = 'top' | 'right' | 'bottom' | 'left';

/* ---------------------------------- Root ---------------------------------- */

export interface TooltipRootProps {
  /** Children */
  children: ReactNode;
  /** Position of the tooltip */
  position?: Position;
}

const TooltipRoot = ({ children, position = 'top' }: TooltipRootProps) => {
  const [open, setOpen] = useState(false);
  const tooltipId = useStableId('tooltip');
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <TooltipContext.Provider value={{ open, setOpen, tooltipId, position, triggerRef }}>
      <div className="relative inline-block">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

/* -------------------------------- Trigger --------------------------------- */

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  /** Children */
  children: ReactNode;
  /** Element type to render */
  as?: 'button' | 'span' | 'div';
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TooltipTrigger = forwardRef<any, TooltipTriggerProps>(function TooltipTrigger(
  { children, as: Component = 'span', className, tw, ...props },
  ref
) {
  const { setOpen, tooltipId, triggerRef } = useTooltipContext();

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  const handleBlur = () => setOpen(false);

  const Element = Component as React.ElementType;

  const handleRef = (node: any) => {
    (triggerRef as React.MutableRefObject<any>).current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<any>).current = node;
    }
  };

  return (
    <Element
      ref={handleRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-describedby={tooltipId}
      className={mergeTw(className, tw)}
      {...props}
    >
      {children}
    </Element>
  );
});

/* -------------------------------- Content --------------------------------- */

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional className */
  className?: string;
  /** Additional Tailwind classes */
  tw?: string;
}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  { children, className, tw, ...props },
  ref
) {
  const { open, tooltipId, position, triggerRef } = useTooltipContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current!.getBoundingClientRect();
      const tooltip = contentRef.current!.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = trigger.top - tooltip.height - 8;
          left = trigger.left + trigger.width / 2 - tooltip.width / 2;
          break;
        case 'bottom':
          top = trigger.bottom + 8;
          left = trigger.left + trigger.width / 2 - tooltip.width / 2;
          break;
        case 'left':
          top = trigger.top + trigger.height / 2 - tooltip.height / 2;
          left = trigger.left - tooltip.width - 8;
          break;
        case 'right':
          top = trigger.top + trigger.height / 2 - tooltip.height / 2;
          left = trigger.right + 8;
          break;
      }

      setCoords({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, position, triggerRef]);

  const handleRef = (node: HTMLDivElement | null) => {
    contentRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  if (!open) return null;

  const arrowClasses = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
  };

  return createPortal(
    <div
      ref={handleRef}
      id={tooltipId}
      role="tooltip"
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
      className={mergeTw(
        'z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-lg',
        'animate-fade-in',
        'max-w-xs whitespace-normal',
        className,
        tw
      )}
      {...props}
    >
      {children}
      <div
        className={mergeTw('absolute w-0 h-0 border-4', arrowClasses[position])}
        aria-hidden="true"
      />
    </div>,
    document.body
  );
});

/* --------------------------------- Export --------------------------------- */

/**
 * Tooltip component that shows on hover or focus.
 * Supports top, right, bottom, and left positioning.
 *
 * @example
 * <Tooltip.Root position="top">
 *   <Tooltip.Trigger>Hover me</Tooltip.Trigger>
 *   <Tooltip.Content>Tooltip content</Tooltip.Content>
 * </Tooltip.Root>
 */
export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
