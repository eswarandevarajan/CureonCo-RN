import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  PermissionsAndroid,
} from 'react-native';
import Icon from './Icon';
import {colors, fonts} from '../themes/themes';
import {Dash_Board} from '../Constants/TextConstants';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {scaledWidth} from '../utils/Resolution';
import {CAMERA, DOCUMENT, GALLERY} from '../Config/config';

const photos = async (type, folderID) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: Dash_Board.permission.title,
      message:
        'Cureonco App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: Dash_Board.permission.btnNeutral,
      buttonNegative: Dash_Board.permission.btnNegative,
      buttonPositive: Dash_Board.permission.btnPositive,
    },
  );

  const grantedWriteCamera = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: Dash_Board.permission.title,
      message:
        'Cureonco App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: Dash_Board.permission.btnNeutral,
      buttonNegative: Dash_Board.permission.btnNegative,
      buttonPositive: Dash_Board.permission.btnPositive,
    },
  );

  const readStorage = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: Dash_Board.permission.title,
      message:
        'Cureonco App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: Dash_Board.permission.btnNeutral,
      buttonNegative: Dash_Board.permission.btnNegative,
      buttonPositive: Dash_Board.permission.btnPositive,
    },
  );
  if (
    granted === PermissionsAndroid.RESULTS.GRANTED &&
    grantedWriteCamera === PermissionsAndroid.RESULTS.GRANTED &&
    readStorage === PermissionsAndroid.RESULTS.GRANTED
  ) {
    if (type === CAMERA) {
      return await onCameraPicker();
    } else if (type === GALLERY) {
      return await onGalleryPicker();
    } else if (type === DOCUMENT) {
      return await onDocumentPicker(folderID);
    }
  } else {
    // this.setState({ shouldRenderCameraScreen: false });
  }
};

const onDocumentPicker = async folderID => {
  const documents = await DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles],
  })
    .then(images => {
      return images;
    })
    .catch(err => {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
        throw err;
      }
    });
  const formData = new FormData();
  Object.keys(documents).map(item => {
    formData.append('file', documents[item]);
    formData.append('category', folderID);
  });
  return formData;
};

const onGalleryPicker = async () => {
  const pickedImage = await DocumentPicker.pickMultiple({
    type: [DocumentPicker.types.images],
  })
    .then(images => {
      return images;
    })
    .catch(err => {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
        throw err;
      }
    });
  const formData = new FormData();
  Object.keys(pickedImage).map(item => {
    formData.append('file', pickedImage[item]);
  });
  return {formData, pickedImage};
};

const onCameraPicker = async () => {
  const cameraImage = await ImagePicker.openCamera({
    mediaType: 'photo',
  })
    .then(image => {
      //   const response = image.map((res, index) => {
      // RNFS.readFile(res.uri, 'base64').then(res => {
      //   setVisiblity(false, false);
      //   setImageCollection(res);
      // });
      // return res;
      //   });
      //   console.log('response', response);
      return image;
    })
    .catch(e => console.log('Camera:', e));
  const formData = new FormData();
  Object.keys(cameraImage).map(item => {
    formData.append('file', cameraImage[item]);
  });
  return formData;
};

export default {photos};
