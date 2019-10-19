import axios from "axios";
import Auth from "../../helpers/Auth";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SIGNIN_START = "SIGNIN_START";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILED = "SIGNIN_FAILED";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const DELETE_USERS_START = "DELETE_USERS_START";
export const DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS";
export const DELETE_USERS_START = "DELETE_USERS_START";


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
    axios.post( `http://localhost:3020/api/v1/user/signup/${ userType }`, { data } )
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

export const signin = ( data, userType ) => {
  return dispatch => {
    dispatch( signinStart() );
    axios.post( `http://localhost:3020/api/v1/user/signin`, { data } )
      .then( resp => {
        Auth.authenticateUser( JSON.stringify(resp.data ));
        dispatch( signinSuccess( resp.data ) );
      } )
      .catch( err => {
        dispatch( signinFailed( err.message ) );
      } );
  }
}


export const getUsersStart = () => {
  return {
    type: GET_USERS_START
  }
}

export const getUsersSuccess = ( data ) => {
  return {
    type: GET_USERS_SUCCESS,
    data
  }
}

export const getUsersFailed = ( error ) => {
  return {
    type: GET_USERS_FAILED,
    error
  }
}

export const getUsers = ( data, userType ) => {
  return dispatch => {
    dispatch( getUsersStart() );
    axios.get( `http://localhost:3020/api/v1/user/all`, { data } )
      .then( resp => {
        dispatch( getUsersSuccess( resp.data ) );
      } )
      .catch( err => {
        dispatch( getUsersFailed( err.message ) );
      } );
  }
}


export const getUserStart = () => {
  return {
    type: DElETE_USERS_START
  }
}

export const deleteUserSuccess = ( data ) => {
  return {
    type: DELETE_USERS_SUCCESS,
    data
  }
}

export const deleteUserFailed = ( error ) => {
  return {
    type: DELETE_USERS_FAILED,
    error
  }
}

export const deleteUser = (userType, userId) => {
  return dispatch => {
    dispatch( deleteUserStart() );
    axios.get( `http://localhost:3020/api/v1/user/all`)
      .then( resp => {
        dispatch( deleteUserSuccess( resp.data ) );
      } )
      .catch( err => {
        dispatch( getUsersFailed( err.message ) );
      } );
  }
}