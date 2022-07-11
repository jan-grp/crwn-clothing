import { AnyAction } from 'redux';

// types
import { UserData } from '../../utils/firebase/firebase.utils';

// actions
import { 
  signInFailed, 
  signOutFailed,  
  signUpWithEmailAndPasswordFailed,
  signInSuccess,
  signOutSuccess,
} from './user.action';

export type UserState = {
  readonly currentUser: UserData | null
  readonly isLoading: boolean
  readonly error: Error | null
}

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE, 
  action: AnyAction
) => {

  if(signInSuccess.match(action)) {
    return { 
      ...state, 
      currentUser: action.payload 
    }
  }

  if(signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    }
  }

  if(signOutFailed.match(action) || signInFailed.match(action) || signUpWithEmailAndPasswordFailed.match(action)) {
    return {
      ...state,
      error: action.payload
    }
  }

  return state
};