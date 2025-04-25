import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '../pages/ProductDetail';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Include thunk in the mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// component with a Redux store and a mocked route like /product/123.
const renderWithProviders = (store, id = '123') => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('ProductDetails Component', () => {
    // it creates a mock Redux store with fake product data.
  let store;

  beforeEach(() => {
    store = mockStore({
      productDetails: {
        product: {
          id: 1,
          title: 'Test Product',
          price: 100,
          description: 'Product description here',
          image: 'image.jpg',
          category: 'Test Category',
          rating: { rate: 4.5, count: 10 },
        },
        loading: false,
        error: null,
      }
    });

    // clear localStorage and mocks if needed
    localStorage.clear();
  });

//   check the ui rendering of title and price
  it('renders product title and price', () => {
    renderWithProviders(store);
    expect(screen.getByTestId('product-title')).toHaveTextContent('Test Product');
    expect(screen.getByTestId('product-price')).toHaveTextContent('100');
  });

//   checking increment button
  it('increments quantity', () => {
    renderWithProviders(store);
    const incrementBtn = screen.getByTestId('qty-increase');
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('qty-display')).toHaveTextContent('2');
  });
// check addition of cart
  it(' add to cart handler when logged in', () => {
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Test' }));
    renderWithProviders(store);
    fireEvent.click(screen.getByTestId('add-cart'));
  });
// error
  it('shows error when user not logged in', () => {
    renderWithProviders(store);
    fireEvent.click(screen.getByTestId('add-wishlist'));
  });
});
