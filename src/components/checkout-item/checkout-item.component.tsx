import { useDispatch, useSelector } from "react-redux"
import { FC } from 'react'

// selectors
import { selectCartItems } from "../../store/cart/cart.selector"

// actions
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action"

// types
import { CartItem } from "../../store/cart/cart.types"

// styles
import { 
    Arrow, 
    BaseSpan, 
    CheckoutItemContainer, 
    ImageContainer, 
    Quantity, 
    RemoveButton, 
    Value
} from './checkout-item.styles'


type CheckoutItemProps = {
    product: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({ product }) => {
    const dispatch = useDispatch()
    const { imageUrl, name, price, quantity } = product

    const cartItems = useSelector(selectCartItems)

    const removeProductFromCart = () => dispatch(clearItemFromCart(cartItems, product))

    const increaseQuantityOfProduct = () => dispatch(addItemToCart(cartItems, product))

    const decreaseQuantityOfProduct = () => dispatch(removeItemFromCart(cartItems, product))

    return(
        <CheckoutItemContainer>

            <ImageContainer>
                <img 
                    src={imageUrl}
                    alt={name}
                />
            </ImageContainer>

            <BaseSpan>{name}</BaseSpan>

            <Quantity>
                <Arrow
                    onClick={decreaseQuantityOfProduct}
                >
                    &#10094;
                </Arrow>

                <Value>{quantity}</Value>

                <Arrow
                    onClick={increaseQuantityOfProduct}
                >
                    &#10095;
                </Arrow>
            </Quantity>

            <BaseSpan>{price}</BaseSpan>

            <RemoveButton
                onClick={removeProductFromCart}
            >
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem