import axios from "axios";
import { GET_ALL_PRODUCT, GET_ERROR, GET_PRODUCT_DETAILS, PRODUCT_REQUEST, SET_CATEGORY } from "../actionType";


// fetching all products 
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });
        const { data } =  await axios.get(`https://fakestoreapi.com/products`)
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: data,
            
        });

    } catch (error) {
        dispatch({
            type: GET_ERROR,
            payload: error,
        })

    }
};


// fetching  products details 
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });

const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`);
dispatch({type: GET_PRODUCT_DETAILS,
    payload : data
})
    }
    catch (error){
dispatch({
    type : GET_ERROR,
    payload : error || "something went wrong"
})

    }
}

// setting category
export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category,
  });
