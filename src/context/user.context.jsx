import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils'

// actual value that can be accessed
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(() => {})

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