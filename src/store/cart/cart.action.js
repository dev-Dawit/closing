import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems array contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);  //find function returns an element

    //if found, increment quantity of the item and return a whole new cartItem array
    if(existingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    //return new array with modified cart items or new cart item array
    return [...cartItems, {...productToAdd, quantity: 1}]     //create a new array, add items in the cart + add new product with a field called 'quantity'to the array
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
        const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    //check if cartItem quantity is equal to 1, if so remove that item from the cart
        if(existingCartItem.quantity === 1){
            return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
        }
    //return cartItems array with the, cartItem that matches with cartItem to remove, quantity reduced by 1 
            return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1}  //creates a new object(with reduced quantity) not modify(reduce by 1) the old. b/c react only rerenders when it gets new object 
            : cartItem
            )
}

const clearCartItem = (cartItems, cartItemToClear) => {return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)} 


// actions 

//action which will be called in cartIcon component, when the cart-Icon is clicked it dispatches setIsCartOpen action passing in the type SET_IS_CART_OPEN and the payload boolean to the cartReducer to make the appropriate switch and update the state 
export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

//generating newCartItems and creating action with type(SET_CART_ITEMS) and payload(newCartItems)
export const addItemToCart = (cartItems, productToAdd) => {         
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);    //remember createAction function takes type and payload parameters and returns type and payload object
}


export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToclear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToclear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


