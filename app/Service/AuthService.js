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
// import ToastMessage from '../Components/ToastMessage';
import {GETPORFILEBYID} from './ProfileService';
import {hideLoader, showLoader} from '../Redux/Actions/LoaderAction';
import AppUtils from '../utils/AppUtils';
import {
  setAPIError,
  setErrorCode,
  setErrorMessage,
} from '../Redux/Actions/ErrorAction';

//Splash page
export const GET_COUNTRY = () => async dispatch => {
  dispatch(setAuthLoader(true));
  await CommonService.GETMETHOD(COMMON_URL.GETCOUNTRYLIST)
    .then(response => {
      if (response.code == 200) {
        let sort_data = _.sortBy(response.data, ({name}) => name.toLowerCase());
        dispatch(setCountrySuccess(sort_data));
      } else if (response.status >= 400) {
        dispatch(setAuthLoader(false));
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        dispatch(setAuthLoader(false));
        // ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(setAuthLoader(false));
      dispatch(setAPIError('authPagesError'));
    });
};

export const GET_DIAGNOSISMUTATION = () => async dispatch => {
  await CommonService.GETMETHOD(COMMON_URL.GETDIAGNOSISMUTATION)
    .then(response => {
      dispatch(setAuthLoader(false));
      if (response.code == 200) {
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
      } else if (response.status >= 400) {
        dispatch(setAuthLoader(false));
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(setAuthLoader(false));
      dispatch(setAPIError('authPagesError'));
    });
};

export const SAVE_NEW_MUTATION = val => async dispatch => {
  dispatch(setAuthLoader(true));
  await CommonService.POSTMETHOD(COMMON_URL.GETDIAGNOSISMUTATION, val)
    .then(response => {
      // if (response.code == 200) {
      //     dispatch(setDiagnosisMutationSuccess(response.data));
      // } else {
      //     ToastMessage.error(response.message);
      // }
      if (response.code == 200) {
        dispatch(setAuthLoader(false));
      } else if (response.status >= 400) {
        dispatch(setAuthLoader(false));
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      }
    })
    .catch(error => {
      dispatch(setAuthLoader(false));
      dispatch(setAPIError('authPagesError'));
    });
};

export const GET_STAGE = () => async dispatch => {
  await CommonService.GETMETHOD(COMMON_URL.GETSTAGE)
    .then(response => {
      dispatch(setAuthLoader(false));
      if (response.code == 200) {
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
      } else if (response.status >= 400) {
        dispatch(setAuthLoader(false));
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(setAuthLoader(false));
      dispatch(setAPIError('authPagesError'));
    });
};

export const GET_HASHTAGS = () => async dispatch => {
  await CommonService.GETMETHOD(COMMON_URL.GETHASHTAGS)
    .then(response => {
      if (response.code == 200) {
        dispatch(setAuthLoader(false));
        dispatch(setHashTagSuccess(response.data));
      } else if (response.status >= 400) {
        dispatch(setAuthLoader(false));
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      }
    })
    .catch(error => {
      dispatch(setAuthLoader(false));
      dispatch(setAPIError('authPagesError'));
    });
};

//Login page
// export const SOCIAL_LOGIN = val => async dispatch => {
//   dispatch(showLoader());
//   await CommonService.POSTMETHOD(AUTH_URL.LOGIN, val)
//     .then(response => {
//       if (response.code === 200) {
//         dispatch(GETPORFILEBYID(response.data.user.id));
//       } else {
//         dispatch(hideLoader());
//         dispatch(setErrorMessage(response.message, true));
//       }
//     })
//     .catch(error => {
//       dispatch(hideLoader());
//       dispatch(setAPIError('authPagesError'));
//     });
// };

export const LOGIN = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(AUTH_URL.LOGIN, val)
    .then(response => {
      console.log(response);
      if (response.code === 200) {
        dispatch(GETPORFILEBYID(response.data.user.id));
      } else {
        dispatch(hideLoader());
        dispatch(setErrorMessage(response.message, true));
      }
    })
    .catch(() => {
      dispatch(hideLoader());
      dispatch(setAPIError('authPagesError'));
    });
};

//OTP Page
export const VERIFY_ACCESSCODE = val => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(AUTH_URL.RESETPASSWORD, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        // ToastMessage.success(
        //   'Congratulations! You have Successfully changed your password',
        // );
        return true;
      } else if (response.status >= 400) {
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(() => {
      dispatch(hideLoader());
      dispatch(setAPIError('authPagesError'));
    });
  return success;
};

//Forget Password Page
export const FORGETPASSWORD = value => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(AUTH_URL.GENERATEOTP, value)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        const resetPassword = {};
        resetPassword.email = value.email;
        dispatch(setForgetPassSuccess(resetPassword));
        return true;
      } else if (response.status >= 400) {
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(() => {
      dispatch(hideLoader());
      dispatch(setAPIError('authPagesError'));
    });
  return success;
};

//Signup Page
export const SIGNUP = value => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(AUTH_URL.REGISTER, value)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 201) {
        // ToastMessage.info(response.message);
        return true;
      } else if (response.status >= 400) {
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(() => {
      dispatch(hideLoader());
      dispatch(setAPIError('authPagesError'));
    });

  return success;
};

//Bank Details
export const BANK_DETAILS = value => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(AUTH_URL.BANKDETAILS, value)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 201) {
        // ToastMessage.info(response.message);
      } else if (response.status >= 400) {
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(err => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

//LogOut
export const AUTH_LOGOUT = () => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.GETMETHOD(AUTH_URL.LOGOUT)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 201) {
        return true;
      } else if (response.status >= 400) {
        dispatch(setAPIError('defaultErrorMessage'));
        dispatch(setErrorCode(429));
      } else {
      }
    })
    .catch(() => {
      dispatch(hideLoader());
      dispatch(setAPIError('authPagesError'));
    });
  return success;
};
