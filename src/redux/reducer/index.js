import { combineReducers } from 'redux';
import { productReducer, productDetailReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { wishlistReducer } from './wishlistReducer';
import { userReducers } from './userReducer';

// combine reducer for all reducer 
const rootReducer = combineReducers({
  allProducts: productReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  wishlist : wishlistReducer,
  user : userReducers
});

export default rootReducer;