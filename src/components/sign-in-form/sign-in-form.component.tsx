import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

// actions
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

// components
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

// styles
import { ButtonsContainer, SignInContainer} from './sign-in-form.styles'

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        <SignInContainer>
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
                
                <ButtonsContainer>
                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.base}
                        type="submit"
                    >
                        sign in
                    </Button>

                    <Button
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type="button"
                        onClick={handleGoogleSignIn}
                    >
                        google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm