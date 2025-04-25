import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../redux/actionType";
import { initialState, wishlistReducer } from "../redux/reducer/wishlistReducer";
import { afterEach, it, describe } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);
// grouping test
describe('wishlistReducer', () => {
    // check for initialstate when no action is there
    it('should return initialState', () => {
        const state = wishlistReducer(undefined, {});
        expect(state).toEqual(initialState)
    });
    //new item should added to wishlist 
    it('should ADD_TO-WISHLIST', () => {
        const newItem = { product: '1', name: 'Test Product'};
        const action = { type: ADD_TO_WISHLIST,payload:newItem }
        const state = wishlistReducer(undefined, action);
        expect(state.wishItems).toContainEqual(newItem);
    });
    // remove from wishlist 
    it('should handle REMOVE_FROM_WISHLIST', () => {
        const initial = {
            wishItems: [
                { product: '1', name: 'Test Product', qty: 2 },
                { product: '2', name: 'Another Product', qty: 1 }
            ]
        }
        const action = {type: REMOVE_FROM_WISHLIST, payload: '2'}
        localStorage.setItem('wishItems', JSON.stringify(initial.wishItems));
        const state = wishlistReducer(initial,action);
        expect(state.wishItems).toHaveLength(1);
        expect(state.wishItems[0].product).toBe('1')
    })
});