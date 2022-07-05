import { useState, useContext } from 'react'

// utils
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

// components
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// styles
import "./sign-up-form.styles.scss"

// context
import { UserContext } from '../../context/user.context'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    
    const { setCurrentUser } = useContext(UserContext)

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        // check if passwords match
        if(password !== confirmPassword) {
            alert("passwords do not match")
            return
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)

            // create user in db (firestore)
            await createUserDocumentFromAuth(user, { displayName })

            // store user in context
            setCurrentUser(user)

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