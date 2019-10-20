import { 
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "../actions/actions_signup";

const initialState = {
  users: [],
  user: {},
  isSignupLoading: false,
  isSignupSuccess: false,
  isSigninLoading: false,
  isSigninSuccess: false,
  getUserLoading: false,
  getUserSuccess: false,
  deleteUserLoading: false,
  deleteUserSuccess: false,
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
    case GET_USERS_START:
      return {
        ...state,
        getUserLoading: true
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        getUserSuccess: true,
        users: action.data
      }
    case GET_USERS_FAILED:
      return {
        ...state,
        getUserLoading: false,
        error: action.error
      }
    case DELETE_USER_START:
      return {
        ...state,
        deleteUserLoading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteUserSuccess: true,
        user: action.data
      }
    case DELETE_USER_FAILED:
      return {
        ...state,
        deleteUserLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default signupReducers