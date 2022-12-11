import axios from 'axios';
import Config from 'react-native-config';

const {APP_BASE_URL} = Config;

const POSTMETHOD = async (url, data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(data);
    const {data: response} = await axios
      .post(APP_BASE_URL + url, body, config)
      .catch(error => {
        if (error) {
          return error.response;
        }
      });
    return response;
  } catch (err) {
    return err.data;
  }
};

const IMAGEUPLOADMETHOD = async (url, formData) => {
  try {
    let res = await fetch(APP_BASE_URL + url, {
      method: 'post',
      body: formData,
    });
    let responseJson = await res.json();
    return responseJson;
  } catch (err) {
    return err.response.data;
  }
};

const GETMETHOD = async url => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data: response} = await axios
      .get(APP_BASE_URL + url, config)
      .catch(error => {
        if (error.response) {
          return error.response.status;
        }
      });
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const PUTMETHOD = async (url, body) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data: response} = await axios
      .put(APP_BASE_URL + url, body, config)
      .catch(error => {
        if (error.response) {
          return error.response.status;
        }
      });
    return response;
  } catch (err) {
    return err.response.data;
  }
};

const DELETEMETHOD = async (url, data) => {
  try {
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
          return error.response.status;
        }
      });
    return response;
  } catch (err) {
    return err.response.data;
  }
};

export const CommonService = {
  POSTMETHOD,
  IMAGEUPLOADMETHOD,
  GETMETHOD,
  PUTMETHOD,
  DELETEMETHOD,
};
