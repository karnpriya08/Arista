import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../component/ProductCard'; // Adjust the path to your ProductCard component
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store'; // Import your real store

const mockProduct = {
    id: '1',
    title: 'Test Product for Testing Purposes',
    price: 49.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.5,
    },
  };
  
describe('ProductCard component', () => {
  it('renders product information', () => {
    // Real Redux store is passed here
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    // Test for product information rendering
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toHaveTextContent('price:$49.99');
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
  });

  it('increments and decrements quantity', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const plusButton = screen.getByText('+');
    const minusButton = screen.getByText('-');

    // Increment
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();

    // Decrement
    fireEvent.click(minusButton);
    expect(screen.getByText('1')).toBeInTheDocument(); // Min value should be 1
  });
});
