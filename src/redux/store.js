import {  legacy_createStore as createStore, applyMiddleware } from "redux";
import reducer from '../redux/reducer'
import { thunk } from "redux-thunk";

// storing on local storage 
const cartItems = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems')):[];

const wishItems = localStorage.getItem('wishItems')
? JSON.parse(localStorage.getItem('wishItems'))||[]:[];

const initialState = { cart:{cartItems}, wishlist:{wishItems}};

// passing value to store 
 const store = createStore(reducer,initialState,applyMiddleware(thunk));

 export default store;