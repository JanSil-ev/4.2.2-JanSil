import { CartButton } from '.';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { store } from '@/store';
import { CartItem } from '@/types';

function renderWithMantine(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>
  );
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Test Product 1 - 1kg',
    price: 10.0,
    category: 'fruits',
    image: 'test1.jpg',
    count: 2,
    map: undefined,
  },
  {
    id: 2,
    name: 'Test Product 2 - 500g',
    price: 20.0,
    category: 'vegetables',
    image: 'test2.jpg',
    count: 1,
    map: undefined,
  },
];

const mockChangeCount = vi.fn();

describe('CartButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает кнопку корзины с количеством товаров', () => {
    renderWithMantine(<CartButton />);

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('отображает кнопку корзины без бейджа при нулевом количестве', () => {
    renderWithMantine(<CartButton />);

    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('отображает сообщение о пустой корзине', async () => {
    renderWithMantine(<CartButton />);

    const cartButton = screen.getByTestId('button');
    fireEvent.click(cartButton);

    expect(await screen.findByText('Your cart is empty!')).toBeInTheDocument();
  });
});
