import { useContext } from "react"

// context
import { CartContext } from '../../context/cart.context'

// styles
import "./checkout-item.styles.scss"

const CheckoutItem = ({ product }) => {
    const { imageUrl, name, price, quantity } = product

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)

    const removeProductFromCart = () => clearItemFromCart(product)

    const increaseQuantityOfProduct = () => addItemToCart(product)

    const decreaseQuantityOfProduct = () => removeItemFromCart(product)

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