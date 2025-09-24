import React from 'react';
import { render, screen } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { Header } from './index';
import { CartItem } from '@/types';


vi.mock('@/components/cart/CartButton/CartButton', () => ({
  CartButton: ({ numbers }: { numbers: number }) => (
    <div data-testid="cart-button">Cart items: {numbers}</div>
  ),
}));

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('Header component', () => {
  const mockChangeCount = vi.fn();
  const mockToggleMenu = vi.fn();


  const mockCart: CartItem[] = [
    { 
      id: 1, 
      name: 'Test Product', 
      price: 10, 
      image: 'test.jpg', 
      category: 'vegetables',
      count: 2 
    },
    { 
      id: 2, 
      name: 'Another Product', 
      price: 15, 
      image: 'another.jpg', 
      category: 'fruits',
      count: 1 
    }
  ];

  const defaultProps = {
    cart: mockCart,
    changeCount: mockChangeCount,
    onToggleMenu: mockToggleMenu,
    opened: false
  };

  it('should рендерит заголовок и кнопку Catalog', () => {
    renderWithMantine(<Header {...defaultProps} />);
    
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /catalog/i })).toBeInTheDocument();
  });

  // it('should отображает количество товаров в CartButton', () => {
  //   renderWithMantine(<Header {...defaultProps} />);
    
  //   expect(screen.getByTestId('cart-button')).toHaveTextContent('Cart items: 2');
  // });

  // it('should вызывает onToggleMenu при клике на бургер', () => {
  //   renderWithMantine(<Header {...defaultProps} />);
    
  //   const burgerButton = screen.getByRole('button');
  //   burgerButton.click();
    
  //   expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  // });
});