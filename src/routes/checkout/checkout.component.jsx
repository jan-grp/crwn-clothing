import { useSelector } from "react-redux"

// selectors
import { selectCartItems, selectTotalCartPrice } from "../../store/cart/cart.selector"

// components
import CheckoutItem from "../../components/checkout-item/checkout-item.component"

// styles
import "./checkout.styles.scss"


const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectTotalCartPrice)

    return(
        <div className="checkout-container">

            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>

                <div className="header-block">
                    <span>Description</span>
                </div>

                <div className="header-block">
                    <span>Quantity</span>
                </div>

                <div className="header-block">
                    <span>Price</span>
                </div>

                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>

            {
                cartItems.map(product => {
                    const { id } = product

                    return(
                        <CheckoutItem
                            key={id}
                            product={product}
                        />
                    )
                })
            }

            <span className="total">${cartTotalPrice}</span>
        </div>
    )
}

export default Checkout