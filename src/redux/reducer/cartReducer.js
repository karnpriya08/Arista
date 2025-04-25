// import *as action from '../actionType';

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from '../actionType';

export const initialState = {
  cartItems: [],
}

export const cartReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_TO_CART: {
      // ncoming Item
      const item = action.payload;
    //  Existing in cart
      const existItem = state.cartItems.find((x) => String(x.product) === String(item.product));;
      
      // if already in cart then updating quantity
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? { ...x, qty: x.qty + item.qty } : x
          )
        };
      } 
      // o.w updating item
      else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    }
// for update quantity in store 
    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload.productId
            ? { ...item, qty: action.payload.quantity }
            : item
        )
      };
// remove from cart 
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== action.payload)
      };

    default:
      return state;
  }

}