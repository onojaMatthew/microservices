import { userType } from "../../helpers/authenticate";
/**
 * Create action type
 */
export const CREATE_POLL_START = "CREATE_POLL_START";
export const CREATE_POLL_SUCCESS = "CREATE_POLL_SUCCRSS";
export const CREATE_POLL_FAILED = "CREATE_POLL_FAILED";

/**
 * Get action type
 */
export GET_POLL_START = "GET_POLL_START";
export GET_POLL_START = "GET_POLL_SUCCESS";
export GET_POLL_START = "GET_POLL_FAILED";

/**
 * tag action type
 */
export const TAG_POLL_START = "TAG_POLL_START";
export const TAG_POLL_START = "TAG_POLL_SUCCESS";
export const TAG_POLL_START = "TAG_POLL_FAILED";

/**
 * Like action type
 */
export const LIKE_POLL_START = "LIKE_POLL_START";
export const LIKE_POLL_START = "LIKE_POLL_SUCCESS";
export const LIKE_POLL_START = "LIKE_POLL_FAILED";

/**
 * Vote action type
 */
export const VOTE_POLL_START = "VOTE_POLL_START";
export const VOTE_POLL_START = "VOTE_POLL_SUCCESS";
export const VOTE_POLL_START = "VOTE_POLL_FAILED";

/**
 * Disable ation type
 */
export const DISABLE_POLL_START = "DISABLE_POLL_START";
export const DISABLE_POLL_START = "DISABLE_POLL_SUCCESS";
export const DISABLE_POLL_START = "DISABLE_POLL_FAILED";

/**
 * Upload action type
 */
export const UPLOAD_POLL_PHOTO_START = "UPLOAD_POLL_PHOTO_START";
export const UPLOAD_POLL_PHOTO_START = "UPLOAD_POLL_PHOTO_SUCCESS";
export const UPLOAD_POLL_PHOTO_START = "UPLOAD_POLL_PHOTO_FAILED";

/**
 * Delete action type
 */
export const DELETE_POLL_START = "DELETE_POLL_START";
export const DELETE_POLL_START = "DELETE_POLL_SUCCESS";
export const DELETE_POLL_START = "DELETE_POLL_FAILED";

const BASE_URL = "http://localhost:3020/api/v1/user";
const MAIN_BASE_URL = "http://localhost:3030/api/v1/poll";

export const createPollStart = () => {
  return {
    type: CREATE_POLL_START
  }
}

export const createPollSuccess = ( data ) => {
  return {
    type: CREATE_POLL_SUCCESS,
    data
  }
}

export const createPollFailed = ( error ) => {
  return {
    type: CREATE_POLL_FAILED,
    error
  }
}


export const createPoll = (data, userId) => {
  return dispatch => {
    dispatch( createPollStart() );
    fetch( `${ BASE_URL }/create/${ userType() }/${ userId }`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( data => {
        dispatch( createPollSuccess( data ) );
      } )
      .catch( err => {
        dispatch( createPollFailed( err.message ) );
      } );
  }
}
// tTy

export const getPollStart = () => {
  return {
    type: GET_POLL_START
  }
}

export const getPollSuccess = (data) => {
  return {
    type: GET_POLL_SUCCESS,
    data
  }
}

export const getPollFailed = (error) => {
  return {
    type: GET_POLL_FAILED,
    error
  }
}

export const getPoll = () => {
  return dispatch => {
    dispatch(getPollStart())
    fetch( `${ MAIN_BASE_URL }/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( getPollSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( getPollFailed( err.message );)
      });
  }
}


export const tagPollStart = () => {
  return {
    type: TAG_POLL_START
  }
}

export const tagPollSuccess = (data) => {
  return {
    type: TAG_POLL_SUCCES,
    data
  }
}

export const tagPollFailed = (error) => {
  return {
    type: TAG_POLL_FAILED,
    error
  }


export const tagPoll = (data) => {
  return dispatch => {
    dispatch( tagPollStart() );
    fetch( `${ BASE_URL }/${ userType() }/${ pollId }`, {
      method: "PU",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( tagPollSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( tagPollFailed( err.message );)
      });
  }
}