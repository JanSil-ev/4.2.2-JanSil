import React from 'react';
import { render, screen } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { MainLayout } from '.';
import { CartItem } from '@/types';

// Моки
vi.mock('../Header/Header', () => ({
  Header: () => <div data-testid="header">Header Component</div>
}));

vi.mock('@mantine/hooks', () => ({
  useDisclosure: () => [false, { toggle: vi.fn() }]
}));

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('MainLayout component', () => {
  const mockChangeCount = vi.fn();
  const mockCart: CartItem[] = [];

  it('should рендерит Header компонент', () => {
    renderWithMantine(
      <MainLayout cart={mockCart} changeCount={mockChangeCount}>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should рендерит переданные children', () => {
    renderWithMantine(
      <MainLayout cart={mockCart} changeCount={mockChangeCount}>
        <div data-testid="test-child">Test Child Content</div>
      </MainLayout>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });
});