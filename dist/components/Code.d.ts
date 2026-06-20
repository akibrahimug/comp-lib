import React, { type HTMLAttributes } from 'react';
export interface CodeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** The code to display */
    code: string;
    /** Optional filename / title shown in the header bar */
    filename?: string;
    /** Language label shown on the right of the header */
    lang?: string;
    /** Show a copy-to-clipboard button (default true) */
    copyable?: boolean;
    className?: string;
    tw?: string;
}
/**
 * A self-contained dark code block with an optional filename header and a
 * copy-to-clipboard button. Looks consistent on any background/theme.
 *
 * @example
 * <Code filename="App.tsx" lang="tsx" code={`<Button>Click</Button>`} />
 */
export declare const Code: React.ForwardRefExoticComponent<CodeProps & React.RefAttributes<HTMLDivElement>>;
