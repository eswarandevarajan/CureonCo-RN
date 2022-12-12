import {
  GET_USER_PROFILE_SUCCESS,
  PROFILEPIC_UPLOAD_SUCCESS,
  GET_OTHERS_PROFILE_SUCCESS,
  USER_PROFILE_UPDATE_SUCCESS,
  GET_USER_POSTS_SUCCESS,
  GET_USER_FILES_SUCCESS,
  GET_USER_SHAREFILES_SUCCESS,
  GET_FOLDER_NAMES_SUCCESS,
  UPLOAD_FILES_SUCCESS,
  GET_DOCTORS_SUCCESS,
  GET_PATIENTS_FILES_SUCCESS,
  USER_LOGGED_OUT,
} from '../../Constants/ActionConstants';

const INITIAL_STATE = {
  loading: false,
  userProfile: null,
  userPosts: null,
  folderNames: null,
  userFiles: [],
  patientsFiles: [],
  userSharedFiles: [],
  user: null,
  othersProfile: null,
  doctors: null,
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: payload,
      };
    case GET_USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: payload,
      };
    case GET_FOLDER_NAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        folderNames: payload,
      };
    case GET_USER_FILES_SUCCESS:
    case UPLOAD_FILES_SUCCESS:
      return {
        ...state,
        userFiles: payload,
      };
    // case UPLOAD_FILES_SUCCESS:
    //   return {
    //     ...state,
    //     userFiles: [...state.userFiles, payload],
    //   };
    case GET_USER_SHAREFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        userSharedFiles: payload,
      };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: {...state.userProfile, medappprofile: payload},
      };
    case PROFILEPIC_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: updateResponse(state.userProfile, payload),
      };
    case GET_OTHERS_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        othersProfile: payload,
      };
    case GET_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: payload,
      };
    case GET_PATIENTS_FILES_SUCCESS:
      return {
        ...state,
        patientsFiles: payload,
      };
    case USER_LOGGED_OUT:
      return {...INITIAL_STATE};
    default:
      return state;
  }
}

const updateResponse = (response, newResponse) => {
  response.medappprofile.user = newResponse;
  return response;
};
