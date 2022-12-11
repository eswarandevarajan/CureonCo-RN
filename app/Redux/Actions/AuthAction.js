import {
  LOADING_INIT,
  LOGGED_IN_SUCCESS,
  FORGETPASSWORD_SUCCESS,
  GET_COUNTRY_SUCCESS,
  GET_DIAGNOSISMUTATION_SUCCESS,
  GET_STAGE_SUCCESS,
  USER_LOGGED_OUT,
  GET_HASHTAG_SUCCESS,
} from '../../Constants/ActionConstants';

export function setAuthLoader(response) {
  return {
    type: LOADING_INIT,
    payload: response,
  };
}

export function setUserLoggedOut() {
  return {
    type: USER_LOGGED_OUT,
  };
}

export function setCountrySuccess(response) {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: response,
  };
}

export function setDiagnosisMutationSuccess(response) {
  return {
    type: GET_DIAGNOSISMUTATION_SUCCESS,
    payload: response,
  };
}

export function setStageSuccess(response) {
  return {
    type: GET_STAGE_SUCCESS,
    payload: response,
  };
}

export function setHashTagSuccess(response) {
  return {
    type: GET_HASHTAG_SUCCESS,
    payload: response,
  };
}

export function setLoggedInSuccess(response) {
  return {
    type: LOGGED_IN_SUCCESS,
    payload: response,
  };
}

export function setForgetPassSuccess(response) {
  return {
    type: FORGETPASSWORD_SUCCESS,
    payload: response,
  };
}
