import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/Accordion';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Accordion

Collapsible content sections with full keyboard support (Enter/Space to toggle) and ARIA wiring.

## Import
\`\`\`tsx
import { Accordion } from '@kasomaibrahim/comp-lib';
\`\`\`

## Anatomy
- **Accordion.Root** — \`type="single" | "multiple"\`, \`collapsible\`, controlled via \`value\`/\`onValueChange\`
- **Accordion.Item** — \`value\`, optional \`disabled\`
- **Accordion.Trigger** — the clickable header (renders a rotating chevron)
- **Accordion.Content** — the revealed panel
        `,
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Accordion.Root>;

const items = [
  { v: 'what', q: 'What is this library?', a: 'A Tailwind-first, variant-driven, polymorphic React component library.' },
  { v: 'tree', q: 'Is it tree-shakable?', a: 'Yes — every component is a named export and the package is marked side-effect free.' },
  { v: 'a11y', q: 'Is it accessible?', a: 'Components ship with focus management, keyboard navigation and ARIA attributes out of the box.' },
];

export const Single: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible defaultValue={['what']} className="w-[460px]">
      {items.map((it) => (
        <Accordion.Item key={it.v} value={it.v}>
          <Accordion.Trigger>{it.q}</Accordion.Trigger>
          <Accordion.Content>{it.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion.Root type="multiple" defaultValue={['what', 'a11y']} className="w-[460px]">
      {items.map((it) => (
        <Accordion.Item key={it.v} value={it.v}>
          <Accordion.Trigger>{it.q}</Accordion.Trigger>
          <Accordion.Content>{it.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible className="w-[460px]">
      <Accordion.Item value="a">
        <Accordion.Trigger>Available section</Accordion.Trigger>
        <Accordion.Content>This one opens normally.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b" disabled>
        <Accordion.Trigger>Disabled section</Accordion.Trigger>
        <Accordion.Content>You cannot open this.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="c">
        <Accordion.Trigger>Another section</Accordion.Trigger>
        <Accordion.Content>Also openable.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};
