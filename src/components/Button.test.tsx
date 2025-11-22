import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('applies primary intent classes by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button.className).toContain('bg-brand-600');
  });

  it('applies secondary intent classes', () => {
    render(<Button intent="secondary">Secondary</Button>);
    const button = screen.getByText('Secondary');
    expect(button.className).toContain('bg-gray-100');
  });

  it('applies danger intent classes', () => {
    render(<Button intent="danger">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button.className).toContain('bg-danger-600');
  });

  it('applies size variants correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByText('Small');
    expect(button.className).toContain('h-8');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByText('Large');
    expect(button.className).toContain('h-11');
  });

  it('applies fullWidth class when prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByText('Full Width');
    expect(button.className).toContain('w-full');
  });

  it('applies loading class when prop is true', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByText('Loading');
    expect(button.className).toContain('cursor-wait');
  });

  it('supports polymorphic as prop', () => {
    render(<Button as="a" href="#test">Link Button</Button>);
    const link = screen.getByText('Link Button');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('#test');
  });

  it('merges tw prop classes', () => {
    render(<Button tw="rounded-full">Custom</Button>);
    const button = screen.getByText('Custom');
    expect(button.className).toContain('rounded-full');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button.className).toContain('opacity-60');
  });
});
