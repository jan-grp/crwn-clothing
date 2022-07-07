import { createContext, useEffect, useReducer } from "react";

import { 
    onAuthStateChangedListener,
    createUserDocumentFromAuth
} from '../utils/firebase/firebase.utils'

// actual value that can be accessed
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    "SET_CURRENT_USER": "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    console.log("payload: ", payload)
  
    switch (type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { 
            ...state, 
            currentUser: payload 
        };

      default:
        throw new Error(`Unhandled type ${type} in userReducer`);
    }
  };

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState()

    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }

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