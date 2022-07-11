import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
    UserCredential
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'

// types
import { Category } from "../../store/categories/categories.types";

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
initializeApp(firebaseConfig);

// initialize auth
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    propmt: "select_account"
})

export const auth = getAuth()

// initialize database
export const db = getFirestore()

// add store data collection
export type ObjectToAdd = {
    title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string, 
    objectsToAdd: T[]
) : Promise<void> => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
}

// fetch categories and documents
export const getCategoriesAndDocuments = async () : Promise<Category[]> => {
    const collectionRef = collection(db, "categories")
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)
} 

// create user
export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<UserCredential | void> => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
};

export type AdditionalInformation = {
    displayName?: string
}

export type UserData = {
    createdAt: Date
    displayName: string
    email: string
}

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation = {} as AdditionalInformation
) : Promise<QueryDocumentSnapshot<UserData> | void> => {
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
        } catch (error) {
            console.error("error while creating the user: ", error)
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const signInUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<UserCredential | void> => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// sign out user
export const signOutUser = async () => await signOut(auth);

// auth listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    if(!callback) return Error("auth changes listener needs a callback")
    onAuthStateChanged(auth, callback)
}

// get current user
export const getCurrentUser = () : Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unsubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}