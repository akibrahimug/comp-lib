import React, { forwardRef, useState, type HTMLAttributes } from 'react';
import { mergeTw } from '../core/mergeTw';

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
export const Code = forwardRef<HTMLDivElement, CodeProps>(function Code(
  { code, filename, lang, copyable = true, className, tw, ...props },
  ref
) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={ref}
      className={mergeTw('overflow-hidden rounded-xl border border-white/10 bg-[#0c0e14] shadow-lg', className, tw)}
      {...props}
    >
      {(filename || lang || copyable) && (
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          {filename && <span className="font-mono text-xs text-gray-400">{filename}</span>}
          <div className="ml-auto flex items-center gap-3">
            {lang && <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{lang}</span>}
            {copyable && (
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-gray-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Copy code"
              >
                {copied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 9h10v12H9zM5 15H3V3h12v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <pre className="scrollbar-luxe overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-gray-200">{code}</code>
      </pre>
    </div>
  );
});
