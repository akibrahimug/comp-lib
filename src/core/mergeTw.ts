import { twMerge } from 'tailwind-merge';

export function mergeTw(...classes: Array<string | undefined | null | false>): string {
  return twMerge(...classes.filter(Boolean).map(String));
}
