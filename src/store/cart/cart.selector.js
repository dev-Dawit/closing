import { createSelector} from 'reselect';     //createSelector is used to memoize a value which is already excuted

//rootReducer has all the reducers and the entire state. reducers has their slice of state in them for example userReducer has the user properties(currentUser: null) of the state, the categoriesReducer has the categories properties(categories: []) of the state and the cartReducer has the cart properties(isCartOpen: false, cartItems: [],)
//rootReducer = user: userReducer + categories: categoriesReducer + cart: cartReducer
const selectCartReducer = (state) => state.cart;    // selectCartReducer is a function that returns the cartReducer slice from the rootRedcer

export const selectCartItems = createSelector(
    [selectCartReducer],     // input selector, gives the cart slice from the whole cart state(isCartOpen and cartItems)
    (cart) => cart.cartItems    //output selector, returns cartItems its like saying or selecting rootReducer.cart.cartItmes     
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen   //is like saying rootReducer.cart.isCartOpen, cartReducer has cart slice properties from the entire state 
)

//cart item count
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

//cart item total
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);
