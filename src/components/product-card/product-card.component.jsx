import { useContext } from "react"

// context
import { CartContext } from "../../context/cart.context"

// styles
import "./product-card.styles.scss"

// components
import Button from "../button/button.component"

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product

    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)

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