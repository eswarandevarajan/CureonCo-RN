import {API_ERROR, ERROR_MESSAGE} from '../../Constants/ActionConstants';

export function setAPIError(response) {
  return {
    type: API_ERROR,
    payload: response,
  };
}

export function setErrorMessage(errorMessage, showError) {
  return {
    type: ERROR_MESSAGE,
    payload: {errorMessage, showError},
  };
}
