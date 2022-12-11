import React, {useEffect} from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import images from '../../../assets/images';
import appStyles from '../../../assets/Styles/AppStyles';
import NavigationService from '../../../Navigation/NavigationService';
import ScreenNames from '../../../Navigation/ScreenNames';
import {
  GET_COUNTRY,
  GET_DIAGNOSISMUTATION,
  GET_HASHTAGS,
  GET_STAGE,
} from '../../../Service/AuthService';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../utils/Resolution';
import AppUtils from '../../../utils/AppUtils';
const {width, height} = Dimensions.get('window');
const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // setTimeout(() => {
    //   NavigationService.navigate(ScreenNames.stackNavigation.OnBoard);
    // }, 1000);
    (async () => {
      await Promise.all([
        dispatch(GET_COUNTRY()),
        dispatch(GET_DIAGNOSISMUTATION()),
        dispatch(GET_STAGE()),
        dispatch(GET_HASHTAGS()),
      ]).then(() => {
        CheckAuth();
      });
    })();
  }, [dispatch]);

  const CheckAuth = async () => {
    const userProfile = await AppUtils.getUserProfile();
    if (userProfile) {
      NavigationService.navigate(ScreenNames.stackNavigation.DashBoard);
    } else {
      NavigationService.navigate(ScreenNames.stackNavigation.OnBoard);
    }
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground source={images.splash} style={styles.content} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    // flex: 1,
    width: width,
    height: height,
  },
});

export default SplashScreen;
