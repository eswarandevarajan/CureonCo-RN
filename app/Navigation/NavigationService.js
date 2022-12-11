import * as React from 'react';
import {CommonActions} from '@react-navigation/native';
import {Keyboard, Platform} from 'react-native';

let navigatorLocal;
export let isReadyRef = false;

export function modifyIsReady(isReady) {
  isReadyRef = isReady;
}
export const navigationRef = React.createRef();

function setTopLevelNavigator(navigatorRef) {
  navigatorLocal = navigatorRef;
  return navigatorLocal;
}

function navigate(routeName, params) {
  if (navigatorLocal) {
    navigatorLocal.dispatch(CommonActions.navigate(routeName, params));
  }
}

function navigateBack() {
  if (navigatorLocal) {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss();
      setTimeout(() => {
        navigatorLocal.dispatch(CommonActions.goBack());
      }, 500);
    } else {
      navigatorLocal.dispatch(CommonActions.goBack());
    }
  }
}

export default {
  setTopLevelNavigator,
  navigate,
  navigateBack,
};
