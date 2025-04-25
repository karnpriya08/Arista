import { ADD_USER } from "../actionType";

// addin user details 
export const addUser = (user) => ({
  type : ADD_USER,
  payload: user,
})
