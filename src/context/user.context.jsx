import { createContext, useState, useEffect } from "react";

import { 
    onAuthStateChangedListener,
    createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils'

// actual value that can be accessed
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if(user) {
                // store user in db (firestore)
                createUserDocumentFromAuth(user)

                // store user in context
                setCurrentUser(user)
            }
        })
        
        return unsubscribe
    }, [])

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}