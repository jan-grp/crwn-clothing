import { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// selectors
import { selectCartItems } from '../../store/cart/cart.selector'

// components
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

// styles
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles'

const CartDropdown = () => {
    const navigate = useNavigate()
    const cartItems = useSelector(selectCartItems)
    
    const goToCheckoutHandler = useCallback(() => {
        navigate("/checkout")
    }, [])

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
            
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.base}
                onClick={goToCheckoutHandler}
            >
                go to checkout
            </Button>

        </CartDropdownContainer>
    )
}

export default CartDropdown