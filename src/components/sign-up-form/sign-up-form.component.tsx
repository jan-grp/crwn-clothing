import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

// types
import { AuthError, AuthErrorCodes } from 'firebase/auth'

// actions
import {
    emailAndPassowrdSignUpStart
} from '../../store/user/user.action'

// components
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

// styles
import { SignUpContainer } from './sign-up-form.styles'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // check if passwords match
        if(password !== confirmPassword) {
            alert("passwords do not match")
            return
        }

        try {
            dispatch(emailAndPassowrdSignUpStart(email, password, displayName))

            // reset form
            setFormFields(defaultFormFields)
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                return alert('Cannot create user, email already in use');
            } else {
                return console.error('user creation encountered an error', error);
            }
        }
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value })
    }   

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form
                onSubmit={handleFormSubmit}
            >
                <FormInput
                    name="displayName"
                    label="Display Name"
                    value={displayName}
                    required
                    type="text"
                    onChange={handleFormChange}
                />

                <FormInput 
                    name="email"
                    label="Email"
                    value={email}
                    required
                    type="email"
                    onChange={handleFormChange}
                />

                <FormInput 
                    name="password"
                    label="Password"
                    value={password}
                    required
                    onChange={handleFormChange}
                    type="password"
                />

                <FormInput 
                    name="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    required
                    onChange={handleFormChange}
                    type="password"
                />

                <Button 
                    type="submit"
                    buttonType={BUTTON_TYPE_CLASSES.base}
                >
                    Sign Up
                </Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm