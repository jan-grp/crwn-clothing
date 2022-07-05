import { useState, useContext } from 'react'

// utils 
import { 
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

// components
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// context
import { UserContext } from '../../context/user.context'

// styles
import "./sign-in-form.styles.scss"

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const { setCurrentUser } = useContext(UserContext)

    const handleFormChange = (event) => {
        const { name, value } = event.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password)

            // store user in context
            setCurrentUser(user)

            // reset form
            setFormFields(defaultFormFields)
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    alert("incorrect password")
                    break
                
                case "auth/user-not-found":
                    alert("there is no user associated with this email")
                    break

                default:
                    console.error("error while signing user in with email and password: ", err)
            }
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const { user } = await signInWithGooglePopup()

            // store user in db (firestore)
            await createUserDocumentFromAuth(user)

            // store user in context
            setCurrentUser(user)
        } catch (err) {
            console.error("error while signing userin with google popup: ", err)
        }
    }

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