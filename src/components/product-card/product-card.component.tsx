import { useDispatch, useSelector } from "react-redux"
import { FC } from 'react'

// selectors
import { selectCartItems } from "../../store/cart/cart.selector"

// actions
import { addItemToCart } from "../../store/cart/cart.action"

// types
import { CategoryItem } from "../../store/categories/categories.types"

// styles
import { Footer, Name, Price, ProductCartContainer } from './product-card.styles'

// components
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"


type ProductCardProps = {
    product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch()

    const { name, imageUrl, price } = product

    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return(
        <ProductCartContainer>
            <img 
                src={imageUrl}
                alt={name}
            />

            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>

            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </ProductCartContainer>
    )
}

export default ProductCard