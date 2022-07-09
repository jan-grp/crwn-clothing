import { useState } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';

// selectors
import { selectTotalCartPrice } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

// components
import Button from "../button/button.component";

// styles
import { 
    PaymentFormContainer,
    FormContainer
} from './payment-form.styles'

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const amountToPay = useSelector(selectTotalCartPrice)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)


    const paymentHandler = async (e) => {
        e.preventDefault()

        if(!stripe || !elements) return

        setIsProcessingPayment(true)

        const response = await fetch(
            '/.netlify/functions/create-payment-intent', 
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: amountToPay * 100}), // converting to cent
            }
        ).then(res => res.json())

        const { paymentIntent: { client_secret }} = response

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "guest"

                }
            }
        })

        setIsProcessingPayment(false)

        if(paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === "succeeded") {
                alert("payment successful")
            }
        }
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />

                <Button 
                    buttonType="inverted"
                    isLoading={isProcessingPayment}
                >
                    pay now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm