import { createAction } from "../../utils/reducer/reducer.utils";
import  {USER_ACTION_TYPES}  from "./user.types";


export const setCurrentUser = (user) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);   //returns an object w/c the type is USER_ACTION_TYPES.SET_CURRENT_USER & the payload value is user