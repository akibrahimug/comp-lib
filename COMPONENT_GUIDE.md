# Component Library - Implementation Guide

This guide shows how to implement all requested components using our creator API.

## ✅ Already Implemented (15 components)

1. **Button** - All variants with loading states
2. **Card** - Compound component with slots
3. **Input** - With prefix/suffix, error states
4. **Textarea** - Auto-resize, character counter
5. **Select** - Native with styling
6. **Checkbox** - With indeterminate
7. **Radio** - Standard radio buttons
8. **Toggle** - Switch component
9. **Tabs** - With roving tabindex
10. **Tooltip** - Positioned tooltips
11. **Dialog** - Modal with focus trap
12. **Drawer** - Slide-in panels
13. **Toast** - Notification system
14. **Spinner** - Loading states
15. **Avatar** - Profile images (NEW)
16. **Badge** - Labels and status (NEW)

## 🚀 Component Patterns

### Basic Component (using createComponent)

```tsx
import { createComponent } from '../core/createComponent';

export const ComponentName = createComponent({
  as: 'div', // or 'button', 'span', etc.
  displayName: 'ComponentName',
  base: 'base-tailwind-classes',
  variants: {
    variant: {
      default: 'variant-classes',
      primary: 'primary-classes',
    },
    size: {
      sm: 'small-classes',
      md: 'medium-classes',
      lg: 'large-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
```

### Compound Component (using createSlots)

```tsx
import { createSlots } from '../core/createSlots';

export const ComponentName = createSlots({
  root: { base: 'root-classes' },
  header: { base: 'header-classes' },
  content: { base: 'content-classes' },
  footer: { base: 'footer-classes' },
}, { displayName: 'ComponentName' });

// Usage:
// <ComponentName.Root>
//   <ComponentName.Header>...</ComponentName.Header>
//   <ComponentName.Content>...</ComponentName.Content>
// </ComponentName.Root>
```

## 📦 Components to Add

### 1. Alert Component

```tsx
// src/components/Alert.tsx
import { createSlots } from '../core/createSlots';

export const Alert = createSlots({
  root: {
    base: 'p-4 rounded-lg border flex items-start gap-3',
    variants: {
      variant: {
        info: 'bg-info-50 border-info-200 text-info-900',
        success: 'bg-success-50 border-success-200 text-success-900',
        warning: 'bg-accent-50 border-accent-200 text-accent-900',
        danger: 'bg-danger-50 border-danger-200 text-danger-900',
      },
    },
    defaultVariants: { variant: 'info' },
  },
  icon: { base: 'flex-shrink-0' },
  content: { base: 'flex-1' },
  title: { base: 'font-semibold text-sm' },
  description: { base: 'text-sm mt-1 opacity-90' },
}, { displayName: 'Alert' });
```

### 2. Accordion Component

```tsx
// src/components/Accordion.tsx
import React, { createContext, useContext, useState } from 'react';
import { createSlots } from '../core/createSlots';

const AccordionContext = createContext<{
  expanded: string[];
  toggle: (value: string) => void;
  multiple?: boolean;
} | null>(null);

export function AccordionRoot({
  children,
  defaultValue,
  multiple = false
}: {
  children: React.ReactNode;
  defaultValue?: string[];
  multiple?: boolean;
}) {
  const [expanded, setExpanded] = useState<string[]>(defaultValue || []);

  const toggle = (value: string) => {
    if (multiple) {
      setExpanded(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    } else {
      setExpanded(prev => prev.includes(value) ? [] : [value]);
    }
  };

  return (
    <AccordionContext.Provider value={{ expanded, toggle, multiple }}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
}

export const AccordionItem = createSlots({
  root: { base: 'border border-gray-200 rounded-lg' },
  trigger: {
    base: 'w-full px-4 py-3 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors'
  },
  content: { base: 'px-4 pb-3 text-gray-600' },
}, { displayName: 'AccordionItem' });

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
};
```

### 3. Progress Component

```tsx
// src/components/Progress.tsx
import React from 'react';
import { mergeTw } from '../core/mergeTw';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'danger';
  showLabel?: boolean;
  className?: string;
  tw?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel,
  className,
  tw,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-brand-600',
    success: 'bg-success-600',
    danger: 'bg-danger-600',
  };

  return (
    <div className={mergeTw('w-full', className, tw)}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={mergeTw('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={mergeTw('h-full transition-all duration-300', variantClasses[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
```

### 4. Skeleton Component

```tsx
// src/components/Skeleton.tsx
import { createComponent } from '../core/createComponent';

export const Skeleton = createComponent({
  as: 'div',
  displayName: 'Skeleton',
  base: 'animate-pulse bg-gray-200 rounded',
  variants: {
    variant: {
      text: 'h-4 w-full',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'rectangular',
  },
});
```

### 5. Breadcrumb Component

```tsx
// src/components/Breadcrumb.tsx
import React from 'react';
import { mergeTw } from '../core/mergeTw';

export function BreadcrumbRoot({ children, className, tw }: any) {
  return (
    <nav aria-label="Breadcrumb" className={mergeTw('flex items-center gap-2', className, tw)}>
      <ol className="flex items-center gap-2">{children}</ol>
    </nav>
  );
}

export function BreadcrumbItem({ children, className, tw }: any) {
  return <li className={mergeTw('flex items-center gap-2', className, tw)}>{children}</li>;
}

export function BreadcrumbSeparator({ children = '/', className, tw }: any) {
  return <span className={mergeTw('text-gray-400', className, tw)}>{children}</span>;
}

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
};
```

### 6. Table Component

```tsx
// src/components/Table.tsx
import { createSlots } from '../core/createSlots';

export const Table = createSlots({
  root: { base: 'w-full border-collapse' },
  header: { base: 'bg-gray-50' },
  body: { base: 'divide-y divide-gray-200' },
  row: { base: 'hover:bg-gray-50 transition-colors' },
  head: { base: 'px-4 py-3 text-left text-sm font-semibold text-gray-900' },
  cell: { base: 'px-4 py-3 text-sm text-gray-700' },
}, { displayName: 'Table' });
```

### 7. Pagination Component

```tsx
// src/components/Pagination.tsx
import React from 'react';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
    ) {
      pages.push(i);
    }
  }

  return (
    <nav className="flex items-center gap-1">
      <Button
        size="sm"
        intent="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {pages.map((page, idx) => (
        <React.Fragment key={page}>
          {idx > 0 && pages[idx - 1] !== page - 1 && <span className="px-2">...</span>}
          <Button
            size="sm"
            intent={currentPage === page ? 'primary' : 'secondary'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        </React.Fragment>
      ))}
      <Button
        size="sm"
        intent="secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
```

### 8. Additional Utility Components

```tsx
// Divider
export const Divider = createComponent({
  as: 'hr',
  displayName: 'Divider',
  base: 'border-0 border-t border-gray-200',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full border-t-0 border-l',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

// Container
export const Container = createComponent({
  as: 'div',
  displayName: 'Container',
  base: 'mx-auto px-4',
  variants: {
    maxWidth: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: { maxWidth: 'xl' },
});

// Grid
export const Grid = createComponent({
  as: 'div',
  displayName: 'Grid',
  base: 'grid',
  variants: {
    cols: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '6': 'grid-cols-6',
      '12': 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: { cols: '1', gap: 'md' },
});
```

## 🎨 Color System Extension

Add these to `tailwind.config.cjs` for new components:

```js
colors: {
  // ... existing colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    800: '#166534',
    900: '#14532D'
  },
  info: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    800: '#075985',
    900: '#0C4A6E'
  },
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    800: '#92400E',
    900: '#78350F'
  },
}
```

## 📝 Export Pattern

Update `src/index.ts`:

```tsx
// Utility Components
export * from './components/Avatar';
export * from './components/Badge';
export * from './components/Divider';

// Layout Components
export * from './components/Container';
export * from './components/Grid';

// Feedback Components
export * from './components/Alert';
export * from './components/Progress';
export * from './components/Skeleton';

// Data Display
export * from './components/Table';
export * from './components/Accordion';
export * from './components/Breadcrumb';

// Navigation
export * from './components/Pagination';
```

## 🚀 Quick Implementation Checklist

For each new component:
1. ✅ Create component using `createComponent` or `createSlots`
2. ✅ Add JSDoc documentation
3. ✅ Export from `src/index.ts`
4. ✅ Create `.stories.tsx` in `src/stories/`
5. ✅ Add to README.md component list
6. ✅ Build and test with `npm run build && npm run storybook`

## 📚 Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **React ARIA Patterns**: https://www.w3.org/WAI/ARIA/apg/patterns/
- **Storybook Docs**: https://storybook.js.org/docs

This architecture makes it trivial to add any component following the same patterns!
