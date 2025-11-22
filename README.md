# Tailwind Component Library Starter

A Tailwind-first, variant-driven, polymorphic component creator — easy like shadcn, flexible like MUI slots.

## Install
```bash
npm i @kasomaibrahim/tw-component-library
# peer deps
npm i -D react react-dom tailwindcss
```

## Usage
```tsx
import { Button, Card } from '@kasomaibrahim/tw-component-library';

<Button intent="primary" size="md">Save</Button>
<Button intent="secondary" tw="rounded-full">Cancel</Button>

<Card.Root tw="max-w-xl">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Optional</Card.Description>
  </Card.Header>
  <Card.Content>Body</Card.Content>
  <Card.Footer>
    <Button intent="ghost">Close</Button>
    <Button>Action</Button>
  </Card.Footer>
</Card.Root>
```

## Build
- Rollup (ESM + CJS + DTS)
- Storybook 8 + Chromatic CI
- Semantic Release (optional configuration required)
