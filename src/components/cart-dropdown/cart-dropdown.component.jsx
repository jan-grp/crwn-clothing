import { useContext } from 'react'
import { Link } from 'react-router-dom'

// context
import { CartContext } from '../../context/cart.context'

// components
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

// styles
import "./cart-dropdown.styles.scss"

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)

    
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