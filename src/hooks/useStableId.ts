import { useId as useReactId } from 'react';

/**
 * Generates a stable, hydration-safe ID.
 * Uses React 18's useId hook internally.
 * @param prefix - Optional prefix for the ID
 */
export function useStableId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}
