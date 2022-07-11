import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// selectors
import { selectCartItems } from '../../store/cart/cart.selector'

// components
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

// styles
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    
    return(
        <CartDropdownContainer>
            <CartItems>
                {   
                    cartItems.length ? (
                        cartItems.map(item => (
                            <CartItem 
                                cartItem={item}
                                key={item.id}
                            />
                        ))
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            
            <Link to="/checkout">
                <Button 
                    buttonType={BUTTON_TYPE_CLASSES.base}
                >
                    go to checkout
                </Button>
            </Link>

        </CartDropdownContainer>
    )
}

export default CartDropdown