import { createSlots } from '../core/createSlots';

export const Card = createSlots(
  {
    root: { base: 'rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden' },
    header: { base: 'px-6 py-4 border-b border-gray-100 flex items-center justify-between' },
    title: { base: 'text-lg font-semibold' },
    description: { base: 'mt-1 text-sm text-gray-600' },
    content: { base: 'px-6 py-5' },
    footer: { base: 'px-6 py-4 border-t border-gray-100' }
  },
  { as: 'section', displayName: 'Card' }
);
