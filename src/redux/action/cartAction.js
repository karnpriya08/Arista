import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from '../actionType';

// add to cart
export const addToCart = (id, quantity = 1) => async (dispatch, getState) => {

    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: String(data.id),
                title: data.title,
                image: data.image,
                price: data.price,
                qty: Number(quantity),
            }
        })
        // to store on local storege with payload
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
    catch (error) {
        console.log(`error in cart action : ${error} `);
    }
};

// remove from cart 
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// quantity update 
export const updateQuantity = (productId, quantity) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_QUANTITY,
        payload: { productId, quantity }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};