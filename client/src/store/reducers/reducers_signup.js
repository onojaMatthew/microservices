import { 
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
} from "../actions/actions_signup";

const initialState = {
  users: [],
  user: {},
  isSignupLoading: false,
  isSignupSuccess: false,
  isSigninLoading: false,
  isSigninSuccess: false,
  error: ""
}

const signupReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case SIGNUP_START:
      return {
        ...state,
        isSignupLoading: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignupSuccess: true,
        users: state.users.concat(action.data)
      }
    case SIGNUP_FAILED:
      return {
        ...state,
        isSignupLoading: false,
        error: action.error
      }
    case SIGNIN_START:
      return {
        ...state,
        isSigninLoading: true
      }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSigninSuccess: true,
        user: action.data
      }
    case SIGNIN_FAILED:
      return {
        ...state,
        isSigninLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default signupReducers