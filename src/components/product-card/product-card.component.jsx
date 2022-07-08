import { useDispatch, useSelector } from "react-redux"

// selectors
import { selectCartItems } from "../../store/cart/cart.selector"

// actions
import { addItemToCart } from "../../store/cart/cart.action"

// styles
import "./product-card.styles.scss"

// components
import Button from "../button/button.component"

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const { name, imageUrl, price } = product

    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return(
        <div className="product-card-container">
            <img 
                src={imageUrl}
                alt={name}
            />

            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>

            <Button
                buttonType="inverted"
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </div>
    )
}

export default ProductCard