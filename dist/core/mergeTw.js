import { twMerge } from 'tailwind-merge';
export function mergeTw(...classes) {
    return twMerge(...classes.filter(Boolean).map(String));
}
