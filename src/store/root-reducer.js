import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';

export const rootReducer = combineReducers({         //final output will be an object(w/c will be the state) with keys and their values as returned objects from each reducer
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})