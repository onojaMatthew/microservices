import { 
  CREATE_POLL_START,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAILED,
  GET_POLL_START,
  GET_POLL_SUCCESS,
  GET_POLL_FAILED,
  TAG_POLL_START,
  TAG_POLL_SUCCESS,
  TAG_POLL_FAILED,
  LIKE_POLL_START,
  LIKE_POLL_SUCCESS,
  LIKE_POLL_FAILED,
  VOTE_POLL_START,
  VOTE_POLL_SUCCESS,
  VOTE_POLL_FAILED,
  DISABLE_POLL_START,
  DISABLE_POLL_SUCCESS,
  DISABLE_POLL_FAILED,
  UPLOAD_POLL_PHOTO_START,
  UPLOAD_POLL_PHOTO_SUCCESS,
  UPLOAD_POLL_PHOTO_FAILED,
  DELETE_POLL_START,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILED,
} from "../actions/actions_polls";

const initialState = {
  polls: [],
  createPollSuccess: false,
  createPollLoading: false,
  getPollSuccess: false,
  getPollLoading: false,
  tagLoading: false,
  tagSuccess: false,
  likeLoading: false,
  likeSuccess: false,
  voteLoading: false,
  voteSuccess: false,
  disableLoading: false,
  disableSuccess: false,
  uploadLoading: false,
  uploadSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  error: {},
}


const pollReducers = ( state = initialState, action ) => {
  switch ( action.type) {
    case CREATE_POLL_START:
      return {
        ...state,
        createPollLoading: true
      }
    case CREATE_POLL_SUCCESS:
      return {
        ...state,
        createPollSuccess: true,
        polls: state.polls.concat( action.data)
      }
    case CREATE_POLL_FAILED:
      return {
        ...state,
        createPollLoading: false,
        error: action.error
      }
    case GET_POLL_START:
      return {
        ...state,
        getPollLoading: true
      }
    case GET_POLL_SUCCESS:
      return {
        ...state,
        getPollSuccess: true,
        polls: action.data
      }
    case GET_POLL_FAILED:
      return {
        ...state,
        getPollLoading: false,
        error: action.error
      }
    case TAG_POLL_START:
      return {
        ...state,
        tagLoading: true
      }
    case TAG_POLL_SUCCESS:
      return {
        ...state,
        tagSuccess: true,
        polls: action.data
      }
    case TAG_POLL_FAILED:
      return {
        ...state,
        tagLoading: false,
        error: action.error
      }
    case LIKE_POLL_START:
      return {
        ...state,
        likeLoading: true
      }
    case LIKE_POLL_SUCCESS:
      return {
        ...state,
        likeSuccess: true,
        polls: action.data
      }
    case LIKE_POLL_FAILED:
      return {
        ...state,
        likeLoading: false,
        error: action.error
      }
    case VOTE_POLL_START:
      return {
        ...state,
        voteLoading: true
      }
    case VOTE_POLL_SUCCESS:
      return {
        ...state,
        voteSuccess: true,
        polls: action.data
      }
    case VOTE_POLL_FAILED:
      return {
        ...state,
        voteLoading: false,
        error: action.error
      }
    case DISABLE_POLL_START:
      return {
        ...state,
        disableLoading: true
      }
    case DISABLE_POLL_SUCCESS:
      return {
        ...state,
        disableSuccess: true,
        polls: action.data
      }
    case DISABLE_POLL_FAILED:
      return {
        ...state,
        disableLoading: false,
        error: action.error
      }
    case UPLOAD_POLL_PHOTO_START:
      return {
        ...state,
        uploadLoading: true
      }
    case UPLOAD_POLL_PHOTO_SUCCESS:
      return {
        ...state,
        uploadSuccess: true,
        polls: action.data
      }
    case UPLOAD_POLL_PHOTO_FAILED:
      return {
        ...state,
        uploadLoading: false,
        error: action.error
      }
    case DELETE_POLL_START:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_POLL_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        polls: action.data
      }
    case DELETE_POLL_FAILED:
      return {
        ...state,
        deleteLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}


export default pollReducers;