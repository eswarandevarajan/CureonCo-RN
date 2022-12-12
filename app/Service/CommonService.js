import axios from 'axios';
import Config from 'react-native-config';
import {setAPIError} from '../Redux/Actions/ErrorAction';

const {APP_BASE_URL} = Config;

const POSTMETHOD = async (url, data, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(data);
  const {data: response} = await axios
    .post(APP_BASE_URL + url, body, config)
    .catch(error => {
      if (error.response) {
        dispatch(setAPIError(error.response));
      }
    });
  return response;
};

const IMAGEUPLOADMETHOD = async (url, formData, dispatch) => {
  try {
    let res = await fetch(APP_BASE_URL + url, {
      method: 'post',
      body: formData,
    });
    let responseJson = await res.json();
    return responseJson;
  } catch (error) {
    if (error.response) {
      dispatch(setAPIError(error.response));
    }
  }
};

const GETMETHOD = async (url, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const {data: response} = await axios
    .get(APP_BASE_URL + url, config)
    .catch(error => {
      if (error.response) {
        dispatch(setAPIError(error.response));
      }
    });
  return response ?? {};
};

const PUTMETHOD = async (url, body, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const {data: response} = await axios
    .put(APP_BASE_URL + url, body, config)
    .catch(error => {
      if (error.response) {
        dispatch(setAPIError(error.response));
      }
    });
  return response;
};

const DELETEMETHOD = async (url, data, dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const {data: response} = await axios
    .delete(APP_BASE_URL + url, config)
    .catch(error => {
      if (error.response) {
        dispatch(setAPIError(error.response));
      }
    });
  return response;
};

export const CommonService = {
  POSTMETHOD,
  IMAGEUPLOADMETHOD,
  GETMETHOD,
  PUTMETHOD,
  DELETEMETHOD,
};
