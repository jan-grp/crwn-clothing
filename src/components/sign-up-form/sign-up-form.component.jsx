import { useState } from 'react'
import { useDispatch } from 'react-redux'

// utils
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

// actions
import {
    emailAndPassowrdSignUpStart
} from '../../store/user/user.action.js'

// components
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// styles
import "./sign-up-form.styles.scss"

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

    const handleFormSubmit = async (event) => {
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
        } catch (err) {
            console.error("error while creating user: ", err)
        }
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target

        setFormFields({...formFields, [name]: value })
    }   

    return(
        <div className='sign-up-container'>
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
                    buttonType={"default"}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm