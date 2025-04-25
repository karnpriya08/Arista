import *as actions from '../actionType';
import axios from 'axios';

// adding to wishlist 
export const addToWishlist = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch({
      type: actions.ADD_TO_WISHLIST,
      payload: {
        product: data.id,
        title: data.title,
        image: data.image,
        price: data.price,
      }
    })
    // updating local storage 
    localStorage.setItem('wishItems', JSON.stringify(getState().wishlist.wishItems));
  }
  catch (error) {
    console.log(`error from wishlist actions : ${error}`);

  }
}

// removing from wishlist 
export const removeFromWishlist = (id) => async (dispatch, getstate) => {
  dispatch({
    type: actions.REMOVE_FROM_WISHLIST,
    payload: id
  })
  // updating local storage 
  const updatedWishItems = getState().wishlist?.wishItems || [];
  localStorage.setItem('wishItems', JSON.stringify(updatedWishItems));
}