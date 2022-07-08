import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// selectors
import { selectCartItems } from '../../store/cart/cart.selector'

// components
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

// styles
import "./cart-dropdown.styles.scss"

const CartDropdown = () => {
    // const { cartItems } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map(item => (
                        <CartItem 
                            cartItem={item}
                            key={item.id}
                        />
                    ))
                }
            </div>
            
            <Link to="/checkout">
                <Button 
                    buttonType="default"
                >
                    go to checkout
                </Button>
            </Link>

        </div>
    )
}

export default CartDropdown