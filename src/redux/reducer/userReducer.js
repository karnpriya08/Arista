import { ADD_USER } from "../actionType";
export const initialState = {
  userInfo: [],
};
export const userReducers = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        return { userInfo: action.payload };
      default:
        return state;
    }
  }