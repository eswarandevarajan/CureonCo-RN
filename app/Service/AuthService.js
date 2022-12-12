import {AUTH_URL, COMMON_URL} from '../Config/API_URL';
import {CommonService} from './CommonService';
import {
  setForgetPassSuccess,
  setAuthLoader,
  setCountrySuccess,
  setDiagnosisMutationSuccess,
  setStageSuccess,
  setHashTagSuccess,
} from '../Redux/Actions/AuthAction';
import _ from 'lodash';
import {GETPORFILEBYID} from './ProfileService';
import {hideLoader, showLoader} from '../Redux/Actions/LoaderAction';
import {setErrorMessage} from '../Redux/Actions/ErrorAction';

//Splash page
export const GET_COUNTRY = () => async dispatch => {
  dispatch(setAuthLoader(true));
  await CommonService.GETMETHOD(COMMON_URL.GETCOUNTRYLIST, dispatch)
    .then(response => {
      if (response.code === 200) {
        let sort_data = _.sortBy(response.data, ({name}) => name.toLowerCase());
        dispatch(setCountrySuccess(sort_data));
      } else {
        dispatch(setAuthLoader(false));
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(setAuthLoader(false));
    });
};

export const GET_DIAGNOSISMUTATION = () => async dispatch => {
  await CommonService.GETMETHOD(COMMON_URL.GETDIAGNOSISMUTATION, dispatch)
    .then(response => {
      dispatch(setAuthLoader(false));
      if (response.code === 200) {
        const data = [];
        response.data.map(item => {
          if (item.title === 'Others') {
            data[0] = item;
          } else if (item.title === 'Expression') {
            data[1] = item;
          } else if (item.title === 'Mutation') {
            data[2] = item;
          }
        });
        dispatch(setDiagnosisMutationSuccess(data));
      } else {
        dispatch(setAuthLoader(false));
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(error => {
      dispatch(setAuthLoader(false));
    });
};

export const SAVE_NEW_MUTATION = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(COMMON_URL.GETDIAGNOSISMUTATION, val, dispatch)
    .then(response => {
      if (response.code === 200) {
        dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
};

export const GET_STAGE = () => async dispatch => {
  await CommonService.GETMETHOD(COMMON_URL.GETSTAGE, dispatch)
    .then(response => {
      dispatch(setAuthLoader(false));
      if (response.code === 200) {
        let sort_data = {};
        let sort_data_cancertype = [];
        let sort_data_diagnosisMutations = [];
        let sort_data_diagnosisStages = [];
        response.data.cancerTypes.map(item => {
          sort_data_cancertype.push(
            _.mapKeys(item, (value, key) => {
              let newKey = key;
              if (key === '_id') {
                newKey = 'id';
              }

              if (key === 'title') {
                newKey = 'title';
              }

              return newKey;
            }),
          );
        });
        response.data.diagnosisMutations.map(item => {
          sort_data_diagnosisMutations.push(
            _.mapKeys(item, (value, key) => {
              let newKey = key;
              if (key === '_id') {
                newKey = 'id';
              }

              if (key === 'title') {
                newKey = 'title';
              }

              return newKey;
            }),
          );
        });
        response.data.diagnosisStages.map(item => {
          sort_data_diagnosisStages.push(
            _.mapKeys(item, (value, key) => {
              let newKey = key;
              if (key === '_id') {
                newKey = 'id';
              }

              if (key === 'title') {
                newKey = 'name';
              }

              return newKey;
            }),
          );
        });
        sort_data.cancerTypes = sort_data_cancertype;
        sort_data.diagnosisMutations = sort_data_diagnosisMutations;
        sort_data.diagnosisStages = sort_data_diagnosisStages;
        dispatch(setStageSuccess(sort_data));
      } else {
        dispatch(setAuthLoader(false));
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(setAuthLoader(false));
    });
};

export const GET_HASHTAGS = () => async dispatch => {
  await CommonService.GETMETHOD(COMMON_URL.GETHASHTAGS, dispatch)
    .then(response => {
      if (response.code === 200) {
        dispatch(setAuthLoader(false));
        dispatch(setHashTagSuccess(response.data));
      } else {
        dispatch(setAuthLoader(false));
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(setAuthLoader(false));
    });
};

export const LOGIN = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(AUTH_URL.LOGIN, val, dispatch)
    .then(response => {
      if (response.code === 200) {
        dispatch(GETPORFILEBYID(response.data.user.id));
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
};

//OTP Page
export const VERIFY_ACCESSCODE = val => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(
    AUTH_URL.RESETPASSWORD,
    val,
    dispatch,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        return true;
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
  return success;
};

//Forget Password Page
export const FORGETPASSWORD = value => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(
    AUTH_URL.GENERATEOTP,
    value,
    dispatch,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        const resetPassword = {};
        resetPassword.email = value.email;
        dispatch(setForgetPassSuccess(resetPassword));
        return true;
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
  return success;
};

//Signup Page
export const SIGNUP = value => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(
    AUTH_URL.REGISTER,
    value,
    dispatch,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 201) {
        return true;
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });

  return success;
};

//Bank Details
export const BANK_DETAILS = value => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(AUTH_URL.BANKDETAILS, value, dispatch)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 201) {
        // ToastMessage.info(response.message);
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
};

//LogOut
export const AUTH_LOGOUT = () => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.GETMETHOD(AUTH_URL.LOGOUT, dispatch)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 201) {
        return true;
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
    });
  return success;
};
