import { useEffect, useLayoutEffect } from 'react';

/**
 * SSR-safe layout effect hook. Uses useLayoutEffect on the client and useEffect on the server.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
