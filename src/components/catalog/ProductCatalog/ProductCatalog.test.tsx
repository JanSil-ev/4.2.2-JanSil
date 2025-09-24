import { render, screen, waitFor } from '@testing-library/react';
import ky from 'ky';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { ProductCatalog } from '.';


vi.mock('ky');

const mockProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    price: '10.00',
    category: 'test',
    image: 'test1.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: '20.00',
    category: 'test',
    image: 'test2.jpg',
    inStock: true,
  },
];

const mockAddCart = vi.fn();

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('ProductCatalog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('показывает loader при загрузке', () => {
    (ky.get as any).mockReturnValue({
      json: () => new Promise(() => {}),
    });

    renderWithMantine(<ProductCatalog addCart={mockAddCart} cartItems={[]} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('при загрузке данных должен отображаться заголовок "Catalog"', async () => {
    (ky.get as any).mockReturnValue({
      json: () => Promise.resolve(mockProducts),
    });
    renderWithMantine(<ProductCatalog addCart={mockAddCart} cartItems={[]} />);
    await waitFor(() => {
      expect(screen.getByText('Catalog')).toBeInTheDocument();
    });
  });

  it('при успешной загрузке данных должны отображаться карточки товаров', async () => {
    (ky.get as any).mockReturnValue({
      json: () => Promise.resolve(mockProducts),
    });

    renderWithMantine(<ProductCatalog addCart={mockAddCart} cartItems={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });
});
