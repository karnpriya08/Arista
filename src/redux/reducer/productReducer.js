import { GET_ALL_PRODUCT, GET_ERROR, GET_PRODUCT_DETAILS, PRODUCT_REQUEST, SET_CATEGORY, UPDATE_QUANTITY } from "../actionType";

export const initialState = {
  products: [],
  loading: false,
  error: null,
  categorisedProducts: [],
  product: [ ],
  selectedCategory: 'all',
};
// getting all products 
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { ...state, loading: true }

    case GET_ALL_PRODUCT:
      return { ...state, loading: false, products: action.payload, error: null }

    case GET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };
          
    default: return state
  }
};
// handling product details 
export const productDetailReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PRODUCT_DETAILS:
      return { ...state, loading: false, error: null, product: action.payload };

      case GET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}