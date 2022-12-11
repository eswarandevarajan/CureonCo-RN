import {
  FORGETPASSWORD_SUCCESS,
  LOADING_INIT,
  GET_COUNTRY_SUCCESS,
  GET_DIAGNOSISMUTATION_SUCCESS,
  GET_STAGE_SUCCESS,
  GET_HASHTAG_SUCCESS,
} from '../../Constants/ActionConstants';

const INITIAL_STATE = {
  accessToken: null,
  countries: [],
  diagnosisMutations: [],
  stages: [],
  hashTags: [],
  resetPassCode: {
    email: '',
  },
  isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch (type) {
    case LOADING_INIT:
      return {
        ...state,
        isLoading: payload,
      };

    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: payload,
      };

    case GET_DIAGNOSISMUTATION_SUCCESS:
      return {
        ...state,
        diagnosisMutations: payload,
      };
    case GET_STAGE_SUCCESS:
      return {
        ...state,
        stages: payload,
      };
    case GET_HASHTAG_SUCCESS:
      return {
        ...state,
        hashTags: payload,
      };
    case FORGETPASSWORD_SUCCESS:
      return {
        ...state,
        resetPassCode: payload,
      };
    default:
      return state;
  }
}
