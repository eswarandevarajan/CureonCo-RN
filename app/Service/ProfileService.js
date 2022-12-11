import {USERPROFILE_URL, DOCUMENTS} from '../Config/API_URL';
import {CommonService} from './CommonService';
import NavigationService from '../Navigation/NavigationService';
import ToastMessage from '../Components/ToastMessage';
import {
  setDoctors,
  setFolderNames,
  setPatientFiles,
  setProfilePicUpload,
  setShareFiles,
  setUploadFiles,
  setUserFiles,
  setUserPosts,
  setUserProfileByID,
  setUserShareFiles,
} from '../Redux/Actions/ProfileAction';
import {hideLoader, showLoader} from '../Redux/Actions/LoaderAction';
import AppUtils from '../utils/AppUtils';
import {setAPIError} from '../Redux/Actions/ErrorAction';
import ScreenNames from '../Navigation/ScreenNames';
import {GOOGLE} from '../Constants/CommonConstants';
import {setUserLoggedOut} from '../Redux/Actions/AuthAction';

export const GETPORFILEBYID = id => async dispatch => {
  await CommonService.GETMETHOD(USERPROFILE_URL.GETPROFILEID + id)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        AppUtils.setUserProfile(response.data.medappprofile);
        dispatch(setUserProfileByID(response.data));
        if (response.data.medappprofile.userType === '') {
          NavigationService.navigate(ScreenNames.stackNavigation.UserType);
        } else {
          NavigationService.navigate(ScreenNames.stackNavigation.DashBoard);
        }
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GETOTHERSPROFILE = id => async dispatch => {
  dispatch(showLoader());
  const profile = await CommonService.GETMETHOD(
    USERPROFILE_URL.GETPROFILEID + id,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        return response.data;
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return profile;
};

export const GETALLPROFILE = () => async dispatch => {
  dispatch(showLoader());
  let data = [];
  await CommonService.GETMETHOD(USERPROFILE_URL.GETALLPROFILE)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        response.data.map(res => {
          let filter = {
            label: res.name,
            value: res.id,
            pic: res.avatar,
          };
          data.push(filter);
        });
        dispatch({type: GETALLPROFILE_SUCCESS, payload: data});
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(err => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const UPDATEUSERPROFILE = (val, register) => async dispatch => {
  dispatch(showLoader());
  await CommonService.PUTMETHOD(USERPROFILE_URL.GETPROFILEID, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        AppUtils.setUserProfile(response.data);
        dispatch(setUserProfileByID({medappprofile: response.data}));
        register
          ? NavigationService.navigate(ScreenNames.stackNavigation.DashBoard)
          : NavigationService.navigate(ScreenNames.stackNavigation.UserProfile);
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(err => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const UPDATEUSERIMAGE = formData => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.IMAGEUPLOADMETHOD(
    USERPROFILE_URL.PROFILEUPLOAD,
    formData,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setProfilePicUpload(response.data));
        return true;
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return success;
};

export const GETUSERPOSTS = id => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(USERPROFILE_URL.GETUSERPOSTS + id)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setUserPosts(response.data));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(err => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_FOLDER_NAMES = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(DOCUMENTS.GETFOLDERNAMES)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        console.log(response.data);
        dispatch(setFolderNames(response.data));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_USER_FILES = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(DOCUMENTS.GETUSERFILES)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setUserFiles(response.data));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_USER_SHAREDFILES = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(DOCUMENTS.GETUSERSHAREDFILES)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setUserShareFiles(response.data));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_PATIENT_FILES = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(DOCUMENTS.GETPATIENTFILES)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setPatientFiles(response.data));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const SHARE_FILES = val => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.POSTMETHOD(
    DOCUMENTS.GETUSERSHAREDFILES,
    val,
  )
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        dispatch(setShareFiles(response.data));
        return true;
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return success;
};

export const FOLLOW_USER = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(USERPROFILE_URL.FOLLOWUSER + val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
      } else {
        // ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const REMOVE_SHARED_DOCUMENT = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.DELETEMETHOD(DOCUMENTS.GETUSERSHAREDFILES, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        ToastMessage.success(response.message);
        dispatch(GET_USER_SHAREDFILES());
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const UPLOAD_FILES = (URL, formData) => async dispatch => {
  dispatch(showLoader());
  const success = await CommonService.IMAGEUPLOADMETHOD(URL, formData)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        return true;
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
  return success;
};

export const QRCODE_LOGIN = val => async dispatch => {
  dispatch(showLoader());
  await CommonService.POSTMETHOD(DOCUMENTS.QRCODELOGIN, val)
    .then(response => {
      dispatch(hideLoader());
      if (response.code === 200) {
        ToastMessage.success(response.message);
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};

export const GET_DOCTORS = () => async dispatch => {
  dispatch(showLoader());
  await CommonService.GETMETHOD(DOCUMENTS.GETDOCTORS)
    .then(response => {
      dispatch(hideLoader());
      if (response.code == 200) {
        dispatch(setDoctors(response.data));
      } else if (response.code == 401) {
        dispatch(setAPIError('tokenNotValid'));
      } else {
        ToastMessage.error(response.message);
      }
    })
    .catch(error => {
      dispatch(hideLoader());
      dispatch(setAPIError('defaultErrorMessage'));
    });
};
