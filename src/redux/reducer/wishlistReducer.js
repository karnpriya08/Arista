import *as actions from '../actionType';

export const initialState = {
    wishItems: [ ]
}
export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case (actions.ADD_TO_WISHLIST):
            // incoming item 
            const item = action.payload;
            // existing in wishlist
            const itemExist = state.wishItems.find((x) =>
                x?.product === item.product
            )
// if available updating quantity 
            if (itemExist) {
                return {
                    ...state, wishItems: state.wishItems.map((x) =>
                        x.product === itemExist.product  ? item : x )

                }
            }
            // o.w. update with item 
            else {
                return { ...state, wishItems: [...state.wishItems, item] }
            }
    //    remove from wishlist 
            case (actions.REMOVE_FROM_WISHLIST):
                const updatedWishlist = state.wishItems.filter((x) => x.product !== action.payload);
                // Store the updated wishlist in local storage
                localStorage.setItem('wishItems', JSON.stringify(updatedWishlist));
                return {
                  ...state,
                  wishItems: updatedWishlist,
                };
          
        default:
            return state
    }
}