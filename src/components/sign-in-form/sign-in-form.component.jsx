import { useState } from 'react'
import { useDispatch } from 'react-redux'

// actions
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

// components
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// styles
import "./sign-in-form.styles.scss"

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const handleFormChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            dispatch(emailSignInStart(email, password))
            
            // reset form
            setFormFields(defaultFormFields)
        } catch (error) {
            console.log('user sign in failed: ', error)
        }
    }

    const handleGoogleSignIn = () => dispatch(googleSignInStart())

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password or with your google account</span>

            <form
                onSubmit={handleFormSubmit}
            >
                <FormInput 
                    label="Email"
                    name="email"
                    required
                    type="text"
                    value={email}
                    onChange={handleFormChange}
                />

                <FormInput 
                    label="Password"
                    name="password"
                    required
                    type="password"
                    value={password}
                    onChange={handleFormChange}
                />
                
                <div className='buttons-container'>
                    <Button
                        buttonType="default"
                        type="submit"
                    >
                        sign in
                    </Button>

                    <Button
                        buttonType="google"
                        type="button"
                        onClick={handleGoogleSignIn}
                    >
                        google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm