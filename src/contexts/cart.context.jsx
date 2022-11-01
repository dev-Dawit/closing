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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],               //cart items are made of products from the product context with additional field 'price'
    addItemToCart: () => {},         //here we dont just create setter method that add products to cartItem array, 
                                    //when the user clicks on 'add to cart' button, we first check if the product has already been add to the cart item list
                                    //if it has been add we just increase the no of its quantity, if not add it to the cart item list  
    cartCount: 0,
    setCartCount: () => {},
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
 
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {   //we will not directly call the setter method like setCartItems(productToAdd), we need to call the 'productInCartChecker' helper function if the product already exist in the cart or not
        setCartItems(productInCartChecker(cartItems, productToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

    return (<CartContext.Provider value ={ value }>{ children }</CartContext.Provider>)
};