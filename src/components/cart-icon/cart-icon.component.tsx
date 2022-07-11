import { useSelector, useDispatch } from 'react-redux'

// icon as component
// import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg'
import { ShoppingCartIcon } from './svgImport'

// selectors
import { selectAmountOfItemsInCart, selectIsCartOpen } from '../../store/cart/cart.selector'

// actions
import { setCartIsOpen } from '../../store/cart/cart.action'

// styles
import { CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
    const dispatch = useDispatch()

    const isCartOpen = useSelector(selectIsCartOpen)
    const amountOfItemsInCart = useSelector(selectAmountOfItemsInCart)

    const toggleIsCartOpen = () => dispatch(setCartIsOpen(!isCartOpen))

    return(
        <CartIconContainer 
            onClick={toggleIsCartOpen}    
        >
            <ShoppingCartIcon
                className="shopping-icon"
            />
            <ItemCount>{amountOfItemsInCart}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon