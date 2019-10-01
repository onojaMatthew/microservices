import {
  PHOTO_UPLOAD_START,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_FAILED,
 } from "../actions/uploads";

const initialState = {
  file: {},
  uploadSuccess: false,
  uploadLoading: false,
  error: ""
}

const reducersUploads = ( state = initialState, action ) => {
  switch ( action.type ) {
    case PHOTO_UPLOAD_START:
      return {
        ...state,
        uploadLoading: true,
      }
    case PHOTO_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadSuccess: true,
        file: action.data
      }
    case PHOTO_UPLOAD_FAILED:
      return {
        ...state,
        uploadLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default reducersUploads;
