import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmFJRWM-_g81BVAzYvzByg73PnBYLxpWs",
  authDomain: "crwn-clothing-course-1e761.firebaseapp.com",
  projectId: "crwn-clothing-course-1e761",
  storageBucket: "crwn-clothing-course-1e761.appspot.com",
  messagingSenderId: "180314515654",
  appId: "1:180314515654:web:24eac840f23453379fcfc7"
};

// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

// initialize auth
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    propmt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, provider)

// initialize database
export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = { displayName: "" }
) => {
    const userId = userAuth.uid
    const userDocRef = doc(db, 'users', userId)

    const userSnapshot = await getDoc(userDocRef)

    // check if user exists
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (err) {
            if(err.code === "auth/email-already-in-use") return alert("This email address is already in use")

            console.error("error while creating the user: ", err)
        }
    }

    return userDocRef
}

// create user
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email) return Error("received no email address")
    if(!password) return Error("received no password")

    return await createUserWithEmailAndPassword(auth, email, password)
}

// sign in user
export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email) return Error("received no email address")
    if(!password) return Error("received no password")

    return await signInWithEmailAndPassword(auth, email, password)
}

// sign out user
export const signOutUser = async () => {
    await signOut(auth)
}

// auth listener
export const onAuthStateChangedListener = (callback) => {
    if(!callback) return Error("auth changes listener needs a callback")
    onAuthStateChanged(auth, callback)
}