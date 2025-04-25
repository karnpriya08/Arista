import { cartReducer, initialState } from '../redux/reducer/cartReducer';
import { ADD_TO_CART, UPDATE_QUANTITY, REMOVE_FROM_CART } from '../redux/actionType';
import { afterEach, it, describe } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

// grouping the test
describe('cartReducer', () => {
    // check for initial state when no action 
    it('should return the initial state', () => {
        const state = cartReducer(undefined, {});
        expect(state).toEqual(initialState);
    });
    // check if new item is added 
    it('should handle ADD_TO_CART', () => {
        const newItem = { product: '1', name: 'Test Product', qty: 2 };
        const action = { type: ADD_TO_CART, payload: newItem };
        const state = cartReducer(undefined, action);
        expect(state.cartItems).toContainEqual(newItem);
    });
    // update quantity if item already exists in cart
    it('should update quantity', () => {
        const initial = {
            cartItems: [{ product: '1', name: 'Test Product', qty: 2 }]
        };
        const existingItem = { product: '1', name: 'Test Product', qty: 3 };
        const action = { type: ADD_TO_CART, payload: existingItem };
 const state = cartReducer(initial, action);
        expect(state.cartItems[0].qty).toBe(5); // 2 + 3 = 5
    });
// when item removed from cart
    it('should handle REMOVE_FROM_CART ', () => {
        const initial = {
            cartItems: [
                { product: '1', name: 'Test Product', qty: 2 },
                { product: '2', name: 'Another Product', qty: 1 }
            ]
        };
       const action = { type: REMOVE_FROM_CART, payload: '1' };
        const state = cartReducer(initial, action);
        expect(state.cartItems).toHaveLength(1);
        expect(state.cartItems[0].product).toBe('2');
    });
});