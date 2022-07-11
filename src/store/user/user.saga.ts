import { takeLatest, put, call, all } from 'typed-redux-saga/macro'

// actions
import { 
    signInSuccess, 
    signInFailed,
    signUpWithEmailAndPasswordFailed,
    signUpWithEmailAndPasswordSuccess,
    signOutSuccess,
    signOutFailed,
    EmailAndPassowrdSignUpStart,
    EmailSignInStart,
    SignUpWithEmailAndPasswordSuccess
} from './user.action'

// utils
import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils'

// types
import { User } from 'firebase/auth'
import { AdditionalInformation } from '../../utils/firebase/firebase.utils'
import { USER_ACTION_TYPES } from './user.types'

export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth, 
            userAuth, 
            additionalInformation
        )
        
        if(userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)

        if(!userAuth) return

        yield* call(getSnapshotFromUserAuth, userAuth )
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup)

        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}


export function* signInWithEmailAndPassword({
  payload: { email , password },
}: EmailSignInStart) {
  try {
    const data = yield* call(
      signInUserWithEmailAndPassword,
      email,
      password
    );

    if (data) {
      const { user } = data;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUpWithEmailAndPassword({ payload: { email, password, displayName }}: EmailAndPassowrdSignUpStart) {
    try {
        const data = yield* call(createAuthUserWithEmailAndPassword, email, password, displayName)

        if(data) {
            const { user } = data

            yield* put(signUpWithEmailAndPasswordSuccess(user, { displayName }))
        }

    } catch (error) {
        put(signUpWithEmailAndPasswordFailed(error as Error))
    }
}

export function* signInAfterSignUp({payload: { user, additionalInformation }}: SignUpWithEmailAndPasswordSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalInformation)
}

export function* signOut() {
    try {
        yield* call(signOutUser)

        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

// listners
export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSinInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onEmailAndPasswordSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_AND_PASSWORD_SIGN_UP_START, signUpWithEmailAndPassword)
}

export function* onEmailAndPasswordSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_AND_PASSWORD_SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

// bundler
export function* userSagas() {
    yield* all(
        [
            call(onCheckUserSession),
            call(onGoogleSinInStart),
            call(onEmailSignInStart),
            call(onEmailAndPasswordSignUpStart),
            call(onEmailAndPasswordSignUpSuccess),
            call(onSignOutStart)
        ]
    )
}