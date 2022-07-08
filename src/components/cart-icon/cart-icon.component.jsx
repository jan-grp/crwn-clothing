import { useSelector, useDispatch } from 'react-redux'

// icon as component
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg'

// selectors
import { selectAmountOfItemsInCart, selectIsCartOpen } from '../../store/cart/cart.selector'

// actions
import { setCartIsOpen } from '../../store/cart/cart.action'

// styles
import './cart-icon.styles.scss'

const CartIcon = () => {
    const dispatch = useDispatch()

    const isCartOpen = useSelector(selectIsCartOpen)
    const amountOfItemsInCart = useSelector(selectAmountOfItemsInCart)

    const toggleIsCartOpen = () => dispatch(setCartIsOpen(!isCartOpen))

    return(
        <div 
            className='cart-icon-container'
            onClick={toggleIsCartOpen}    
        >
            <ShoppingCartIcon
                className="shopping-icon"
            />
            <span className='item-count'>{amountOfItemsInCart}</span>
        </div>
    )
}

export default CartIcon