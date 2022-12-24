//we need useDispatch to dispatch the setIsCartOpen action and useSelector to update if memoized values of isCartOpen and cartOpen properties of the state changes
import { useDispatch, useSelector } from 'react-redux';    


import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'; 
import { setIsCartOpen } from '../../store/cart/cart.action';

import { ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);     //we need the cartCount state property to show the count of items in the cart
    const isCartOpen = useSelector(selectIsCartOpen);   //we need the isCartOpen state property to keep track of the state of cart drop down

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return(
        <CartIconContainer onClick={toggleIsCartOpen} >
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;