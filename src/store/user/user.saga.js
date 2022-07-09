import { takeLatest, put, call, all } from 'redux-saga/effects'


// action types
import { USER_ACTION_TYPES } from './user.types'

// actions
import { 
    signInSuccess, 
    signInFailed,
    signUpWithEmailAndPasswordFailed,
    signUpWithEmailAndPasswordSuccess,
    signOutSuccess,
    signOutFailed
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


export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth, 
            userAuth, 
            additionalInformation
        )

        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)

        if(!userAuth) return

        yield call(getSnapshotFromUserAuth, userAuth )
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup)

        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signInWithEmailAndPassword({ payload: { email, password} }) {
    try {
        const { user } = yield call(signInUserWithEmailAndPassword, email, password)

        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

export function* signUpWithEmailAndPassword({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password, displayName)

        yield put(signUpWithEmailAndPasswordSuccess(user, { displayName }))
    } catch (error) {
        put(signUpWithEmailAndPasswordFailed(error))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInformation } }) {
    yield call(getSnapshotFromUserAuth, user, additionalInformation)
}

export function* signOut() {
    try {
        yield call(signOutUser)

        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

// listners
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSinInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onEmailAndPasswordSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_AND_PASSWORD_SIGN_UP_START, signUpWithEmailAndPassword)
}

export function* onEmailAndPasswordSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_AND_PASSWORD_SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

// bundler
export function* userSagas() {
    yield all(
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