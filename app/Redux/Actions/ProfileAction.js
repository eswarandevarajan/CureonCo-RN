import {
  GET_USER_PROFILE_SUCCESS,
  PROFILEPIC_UPLOAD_SUCCESS,
  USER_PROFILE_UPDATE_SUCCESS,
  GET_OTHERS_PROFILE_SUCCESS,
  GET_USER_POSTS_SUCCESS,
  GET_USER_FILES_SUCCESS,
  GET_USER_SHAREFILES_SUCCESS,
  SHARE_FILES_SUCCESS,
  GET_FOLDER_NAMES_SUCCESS,
  GET_DOCTORS_SUCCESS,
  GET_PATIENTS_FILES_SUCCESS,
  UPLOAD_FILES_SUCCESS,
} from '../../Constants/ActionConstants';

export function setUserProfileByID(response) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: response,
  };
}

export function setUserPosts(response) {
  return {
    type: GET_USER_POSTS_SUCCESS,
    payload: response,
  };
}

export function setFolderNames(response) {
  return {
    type: GET_FOLDER_NAMES_SUCCESS,
    payload: response,
  };
}

export function setUserFiles(response) {
  return {
    type: GET_USER_FILES_SUCCESS,
    payload: response,
  };
}

export function setUserShareFiles(response) {
  return {
    type: GET_USER_SHAREFILES_SUCCESS,
    payload: response,
  };
}

export function setPatientFiles(response) {
  return {
    type: GET_PATIENTS_FILES_SUCCESS,
    payload: response,
  };
}

export function setDoctors(response) {
  return {
    type: GET_DOCTORS_SUCCESS,
    payload: response,
  };
}

export function setShareFiles(response) {
  return {
    type: SHARE_FILES_SUCCESS,
    payload: response,
  };
}

export function setUploadFiles(response) {
  return {
    type: UPLOAD_FILES_SUCCESS,
    payload: response,
  };
}

export function setOthersProfile(response) {
  return {
    type: GET_OTHERS_PROFILE_SUCCESS,
    payload: response,
  };
}
export function setProfilePicUpload(response) {
  return {
    type: PROFILEPIC_UPLOAD_SUCCESS,
    payload: response,
  };
}

export function setProfileUpdated(response) {
  return {
    type: USER_PROFILE_UPDATE_SUCCESS,
    payload: response,
  };
}
