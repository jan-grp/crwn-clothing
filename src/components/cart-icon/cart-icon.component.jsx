import { useContext, useState, useEffect } from 'react'

// icon as component
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg'

// context
import { CartContext } from '../../context/cart.context'

// styles
import './cart-icon.styles.scss'

const CartIcon = () => {
    const [itemCount, setItemCount] = useState(0)

    const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    useEffect(() => {
        let counter = cartItems.reduce((total, item) => total + item.quantity, 0)

        setItemCount(counter)
    }, [cartItems])

    return(
        <div 
            className='cart-icon-container'
            onClick={toggleIsCartOpen}    
        >
            <ShoppingCartIcon
                className="shopping-icon"
            />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

export default CartIcon