import { describe, it, expect } from 'vitest';
import { tv } from './tv';

describe('tv', () => {
  it('composes base + variants + compound', () => {
    const fn = tv({
      base: 'base',
      variants: { kind: { a: 'A', b: 'B' }, size: { sm: 'SM', md: 'MD' } },
      defaultVariants: { kind: 'a', size: 'sm' },
      compoundVariants: [{ kind: 'b', size: 'md', class: 'COMBO' }]
    });
    expect(fn({ kind: 'b', size: 'md' })).toContain('COMBO');
  });
});
