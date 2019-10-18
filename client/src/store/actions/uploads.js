import axios from "axios";
export const PHOTO_UPLOAD_START = "PHOTO_UPLOAD_START";
export const PHOTO_UPLOAD_SUCCESS = "PHOTO_UPLOAD_SUCCESS";
export const PHOTO_UPLOAD_FAILED = "PHOTO_UPLOAD_FAILED";

export const uploadStart = () => {
  return {
    type: PHOTO_UPLOAD_START
  }
}

export const uploadSuccess = ( data ) => {
  return {
    type: PHOTO_UPLOAD_SUCCESS,
    data
  }
}

export const uploadFailed = ( error ) => {
  return {
    type: PHOTO_UPLOAD_FAILED,
    error
  }
}

export const upload = (formData, caption ) => {
  return dispatch => {
    dispatch( uploadStart() );
    axios.post( "http://localhost:4000/tenant/tenant/upload", formData)
      .then( resp => {
        dispatch( uploadSuccess( resp.data ) );
      } )
      .catch( err => {
        dispatch( uploadFailed( err.message ) );
      } );
  }
}
