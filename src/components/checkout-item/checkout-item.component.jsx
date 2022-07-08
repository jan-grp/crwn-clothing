import { useDispatch, useSelector } from "react-redux"

// selectors
import { selectCartItems } from "../../store/cart/cart.selector"

// actions
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action"

// styles
import "./checkout-item.styles.scss"

const CheckoutItem = ({ product }) => {
    const dispatch = useDispatch()
    const { imageUrl, name, price, quantity } = product

    const cartItems = useSelector(selectCartItems)

    const removeProductFromCart = () => dispatch(clearItemFromCart(cartItems, product))

    const increaseQuantityOfProduct = () => dispatch(addItemToCart(cartItems, product))

    const decreaseQuantityOfProduct = () => dispatch(removeItemFromCart(cartItems, product))

    return(
        <div className="checkout-item-container">

            <div className="image-container">
                <img 
                    src={imageUrl}
                    alt={name}
                />
            </div>

            <span className="name">{name}</span>

            <div className="quantity">
                <div 
                    className="arrow"
                    onClick={decreaseQuantityOfProduct}
                >
                    &#10094;
                </div>

                <span className="value">{quantity}</span>

                <div 
                    className="arrow"
                    onClick={increaseQuantityOfProduct}
                >
                    &#10095;
                </div>
            </div>

            <span className="price">{price}</span>

            <div 
                className="remove-button"
                onClick={removeProductFromCart}
            >
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem