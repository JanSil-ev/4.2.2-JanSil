import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { CardsItem } from '@/types';
import { ProductCard } from '.';
import { store } from '@/store';
import { Provider } from 'react-redux';


function renderWithMantine(ui: React.ReactElement) {
  return render(<Provider store={store}><MantineProvider>{ui}</MantineProvider></Provider>);
}

const mockProduct: CardsItem = {
  id: 1,
  name: 'Test Product',
  price: 10.0,
  category: 'fruits',
  image: 'test.jpg',
  map: undefined,
};

const mockAddCart = vi.fn();

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает название продукта и изображение', () => {
    renderWithMantine(<ProductCard {...mockProduct}/>);

    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('отображает начальную цену продукта', () => {
    renderWithMantine(<ProductCard {...mockProduct}/>);

    expect(screen.getByText('$ 10')).toBeInTheDocument();
  });

  it('отображает текущее количество товара', () => {
    renderWithMantine(<ProductCard {...mockProduct}/>);

    const countElement = screen.getByText('1');
    expect(countElement).toBeInTheDocument();
  });
});
