import {API_ERROR, ERROR_MESSAGE} from '../../Constants/ActionConstants';

const INITIAL_STATE = {
  errors: {errorMessage: '', showError: false},
  errorReponse: undefined,
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case API_ERROR:
      return {
        ...state,
        errorReponse: payload,
      };

    case ERROR_MESSAGE:
      return {
        ...state,
        errors: {
          errorMessage: payload.errorMessage,
          showError: payload.showError,
        },
      };
    default:
      return state;
  }
}
