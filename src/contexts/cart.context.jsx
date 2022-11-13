import { createContext, useReducer, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems array contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],               //cart items are made of products from the product context with additional field 'price'
    addItemToCart: () => {},         //here we dont just create setter method that add products to cartItem array, 
                                    //when the user clicks on 'add to cart' button, we first check if the product has already been add to the cart item list
                                    //if it has been add we just increase the no of its quantity, if not add it to the cart item list  
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,          //cart item count(quantity) 
    cartTotal: 0,          //cart price total
    setCartCount: () => {},
})


//storing and updating state, using Reducer
//we need 2 action object(with type & payload), 1 for to keep track of isCartOpen value & another to keep track of cartItems,cartCount,cartTotal
//NOTE: whenever cartItems change cartCount & cartTotal change 

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const INITIAL_STATE = {     //initializing the state property values
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

//the reducer function
const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
            ...state,
            isCartOpen: payload
        }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const{ isCartOpen, cartItems, cartCount, cartTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {

        //generate newCartCount
        const newCartCount = newCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
    
        //generate newCartCount
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    
        dispatch({type:'SET_CART_ITEMS', payload: {cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal}})
    }
    
    //generating newCartItems and updating CartItemsReducer when we add new item to cart
    const addItemToCart = (cartItemToRemove) => {         //helper function w/c calls the addCartItem(the function w/c actual item adding to cart) 
        const newCartItems = addCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    //generating newCartItems and updating CartItemsReducer when we remove item from cart
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    //generating newCartItems and updating CartItemsReducer when we clear item from cart
    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => dispatch({ type:CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool}) 

    /*storing and updating state, using context(using useState & useEffect hooks) alternative way to using Reducer 
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
 
    useEffect(() => {                  //runs whenever the cartItems change(whenever a new item is added)
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {                  
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {   //we will not directly call the setter method like setCartItems(productToAdd), we need to call the 'productInCartChecker' helper function if the product already exist in the cart or not
        setCartItems(productInCartChecker(cartItems, productToAdd))
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToclear) => {
        setCartItems(clearCartItem(cartItems, cartItemToclear));
    }
    */

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal, removeItemFromCart, clearItemFromCart };

    return (<CartContext.Provider value ={ value }>{ children }</CartContext.Provider>)
};