import React, { type HTMLAttributes } from 'react';
export interface AccordionRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Whether one or many items can be open at once */
    type?: 'single' | 'multiple';
    /** Controlled open values */
    value?: string[];
    /** Default open values (uncontrolled) */
    defaultValue?: string[];
    /** Change callback */
    onValueChange?: (value: string[]) => void;
    /** In `single` mode, allow closing the open item */
    collapsible?: boolean;
    className?: string;
    tw?: string;
}
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
    className?: string;
    tw?: string;
}
export interface AccordionTriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    className?: string;
    tw?: string;
}
export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    tw?: string;
}
/**
 * Accordion with single/multiple expansion, full keyboard support and ARIA wiring.
 *
 * @example
 * <Accordion.Root type="single" collapsible defaultValue={['a']}>
 *   <Accordion.Item value="a">
 *     <Accordion.Trigger>Question?</Accordion.Trigger>
 *     <Accordion.Content>Answer.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
export declare const Accordion: {
    Root: React.ForwardRefExoticComponent<AccordionRootProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
    Trigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;
};
