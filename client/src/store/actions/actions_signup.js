import axios from "axios";
import Auth from "../../helpers/Auth";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SIGNIN_START = "SIGNIN_START";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";


export const signupStart = () => {
  return {
    type: SIGNUP_START
  }
}

export const signupSuccess = ( data ) => {
  return {
    type: SIGNUP_SUCCESS,
    data
  }
}

export const signupFailed = ( error ) => {
  return {
    type: SIGNUP_FAILED,
    error
  }
}

export const signup = ( data, userType ) => {
  return dispatch => {
    dispatch( signupStart() );
    axios.post( `http://localhost:3020/user/signup/${ userType }`, { data } )
      .then( resp => {
        dispatch( signupSuccess( resp.data ) );
      } )
      .catch( err => {
        dispatch( signupFailed( err.message ) );
      } );
    
  }
}


// Login actions
export const signinStart = () => {
  return {
    type: SIGNIN_START
  }
}

export const signinSuccess = ( data ) => {
  return {
    type: SIGNIN_SUCCESS,
    data
  }
}

export const signinFailed = ( error ) => {
  return {
    type: SIGNIN_FAILED,
    error
  }
}

export const signin = ( data ) => {
  return dispatch => {
    dispatch( signinStart() );
    axios.post( `http://localhost:3020/user/signin`, { data } )
      .then( resp => {
        Auth.authenticateUser( JSON.stringify(resp.data ));
        dispatch( signinSuccess( resp.data ) );
      } )
      .catch( err => {
        dispatch( signinFailed( err.message ) );
      } );
  }
}