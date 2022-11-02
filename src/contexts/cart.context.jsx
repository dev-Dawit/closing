import { createContext, useState, useEffect } from "react";


const productInCartChecker = (cartItems, productToAdd) => {
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
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
    setCartCount: () => {},
})

export const CartProvider = ({ children }) => {
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

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, cartTotal, removeItemToCart, clearItemFromCart };

    return (<CartContext.Provider value ={ value }>{ children }</CartContext.Provider>)
};