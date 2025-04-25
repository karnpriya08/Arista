import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Wishlist from '../pages/Wishlist';
import { vi } from 'vitest';

// Create a mock Redux store
const mockStore = configureStore([]);

describe('Wishlist Component', () => {
    // store with sample data
  let store;

  beforeEach(() => {
    store = mockStore({
      wishlist: {
        wishItems: [
          {
            product: '1',
            title: 'Product 1',
            price: 10,
            image: 'some-image-url.jpg',
          },
        ],
      },
    });

    // Mock dispatch as a function we can track
    store.dispatch = vi.fn();
  });

  test('renders wishlist with item details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist />
        </MemoryRouter>
      </Provider>
    );

    // These texts should be visible
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Price 10/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
  });
// add to wishlist remove from wishlist
  test('adds item to cart and removes it from wishlist when button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Wishlist />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(button);

    // Since addToCart and removeFromWishlist both dispatch, expect two calls
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledTimes(2); // addToCart, removeFromWishlist, and navigate (if mocked)
  });
});
