import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../Navigation/NavigationService';
import ScreenNames from '../Navigation/ScreenNames';
import {colors, fonts} from '../themes/themes';
import Button from './Button';
import {
  setAPIError,
  setErrorMessage,
} from '../Redux/Actions/ErrorAction';
import images from '../assets/images';
import {setUserLoggedOut} from '../Redux/Actions/AuthAction';
import {scaledHeight, scaledWidth} from '../utils/Resolution';
import {CureOncoImage} from './CureOncoAtoms';
import PopUpModalComponent from './PopUpModalComponent';
import Icon from './Icon';

const CureonCoAppError = () => {
  const dispatch = useDispatch();

  const errorReducer = useSelector(state => state.ErrorReducer);
  const {errors, errorReponse} = errorReducer;

  useEffect(() => {
    if (errorReponse === 'tokenNotValid') {
      dispatch(setUserLoggedOut());
      NavigationService.navigate(ScreenNames.stackNavigation.Login);
    }
  }, [dispatch, errorReponse]);

  if (
    errorReponse === 'defaultErrorMessage' ||
    errorReponse === 'authPagesError'
  ) {
    return (
      <View style={styles.container}>
        <CureOncoImage
          source={images.serverDown}
          style={{width: scaledWidth(300), height: scaledHeight(250)}}
        />
        <Text style={styles.headerText}>
          THANK YOU!{'\n'} WE ARE FIXING THIS RIGHT AWAY. WILL BE BACK SOON
        </Text>
        <Text style={[styles.headerText, {margin: 0}]}>
          MEAN WHILE,{'\n'} PLEASE EMAIL
        </Text>
        <Button
          style={{marginTop: scaledHeight(80)}}
          btnLabel={'Restart'}
          btnPress={() => {
            dispatch(setAPIError(undefined));
            errorReponse === 'authPagesError'
              ? NavigationService.navigate(ScreenNames.tabNavigation.Login)
              : NavigationService.navigate(
                  ScreenNames.stackNavigation.HomeMenu,
                );
          }}
        />
      </View>
    );
  }
  if (errors?.showError) {
    return (
      <PopUpModalComponent
        visibility={errors?.showError}
        showPopUpModal={() => dispatch(setErrorMessage('', false))}>
        <View>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => dispatch(setErrorMessage('', false))}>
              <Icon
                name={'close'}
                type={'AntDesign'}
                color={'#737B7D'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.confirmTxt}>{errors?.errorMessage}</Text>
          <TouchableOpacity
            style={styles.modalYesTouch}
            onPress={() => dispatch(setErrorMessage('', false))}>
            <Text style={styles.modalYesTxt}>Ok</Text>
          </TouchableOpacity>
        </View>
      </PopUpModalComponent>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: scaledWidth(0),
    right: scaledWidth(0),
    top: scaledHeight(0),
    bottom: scaledHeight(0),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text_color,
    margin: 50,
  },
  confirmTxt: {
    marginLeft: scaledWidth(30),
    marginRight: scaledWidth(30),
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(50),
    fontFamily: fonts.semi_bold,
    textAlign: 'center',
    color: '#004E8B',
    fontSize: 19,
  },
  modalYesTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#004E8B',
    backgroundColor: '#004E8B',
    width: scaledWidth(150),
    alignSelf: 'center',
    marginBottom: scaledHeight(15),
  },
  modalYesTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    paddingTop: scaledHeight(10),
    paddingBottom: scaledHeight(10),
  },
  modalView: {
    alignItems: 'flex-end',
    marginRight: scaledWidth(25),
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(30),
  },
});

export default CureonCoAppError;
