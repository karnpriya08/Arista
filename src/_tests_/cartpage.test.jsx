// __tests__/Cart.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Cart from '../pages/Cart';
import { vi } from 'vitest';

// create a mock redux store
const mockStore = configureStore([]);

describe('Cart Component', () => {
    // set up mock store with sample data
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [
          {
            product: '1',
            title: 'Product 1',
            price: 10,
            qty: 2,
            image: 'some-image-url.jpg',
          },
        ],
      },
    });
// test whether it gets called
    store.dispatch = vi.fn();
  });
//  check if cart renders with  correct item details
  test('renders cart with item details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
// getting the detail and checking if it's in dom 
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Price 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Qty:/i)).toBeInTheDocument();
  });

//   increment button 
  test('calls dispatch when + button clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(store.dispatch).toHaveBeenCalled();
  });
});