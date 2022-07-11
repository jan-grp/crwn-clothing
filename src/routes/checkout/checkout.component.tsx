import { useSelector } from "react-redux"

// selectors
import { selectCartItems, selectTotalCartPrice } from "../../store/cart/cart.selector"

// components
import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import PaymentForm from "../../components/payment-form/payment-form.component"

// styles
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles'


const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectTotalCartPrice)

    return(
        <CheckoutContainer>

            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

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

            <Total>${cartTotalPrice}</Total>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default Checkout