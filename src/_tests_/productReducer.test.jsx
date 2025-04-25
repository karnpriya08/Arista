import { cleanup } from '@testing-library/react';
import { GET_ALL_PRODUCT, GET_ERROR, PRODUCT_REQUEST,  SET_CATEGORY} from '../redux/actionType';
import { productReducer, initialState } from '../redux/reducer/productReducer';
import { afterEach,it,describe,expect } from 'vitest';

afterEach(cleanup);

// grouping all test
describe('productReducer', () => {
  // return the correct initial state when there is no action 
  it('should return the initial state by default', () => {
    const state = productReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
// when loading true it start to fetch data 
  it('should handle PRODUCT_REQUEST', () => {
    const action = { type: PRODUCT_REQUEST };
    const expectedState = {...initialState,loading: true };
    expect(productReducer(undefined, action)).toEqual(expectedState);
  });

// check when loading became false it update the product
  it('should handle GET_ALL_PRODUCT', () => {
    const mockProducts = [{ id: 1, title: 'Mock Product' }];
    const action = { type: GET_ALL_PRODUCT, payload: mockProducts };
    const expectedState = {...initialState,loading: false,products: mockProducts,error: null };
    expect(productReducer(undefined, action)).toEqual(expectedState);
  });
// if there is error set error msg
  it('should handle GET_ERROR', () => {
    const errorMsg = 'Something went wrong';
    const action = { type: GET_ERROR, payload: errorMsg };
    const expectedState = { ...initialState,loading: false,error: errorMsg};
    expect(productReducer(undefined, action)).toEqual(expectedState);
  });  
    // check if we set category as electronics it set to that category
  it('should handle SET_CATEGORY', () => {
    const action = { type: SET_CATEGORY, payload: 'electronics' };
    const expectedState = {...initialState, selectedCategory: 'electronics' };
    expect(productReducer(undefined, action)).toEqual(expectedState); 
  });
}); 