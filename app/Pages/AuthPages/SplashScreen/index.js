import React, {useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {colors} from '../../../themes/themes';
import AppUtils from '../../../utils/AppUtils';
import {UIActivityIndicator} from 'react-native-indicators';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.AuthReducer.isLoading || false);

  useEffect(() => {
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
      <ImageBackground source={images.splash} style={styles.content}>
        {isLoading ? (
          <UIActivityIndicator
            color={colors.white}
            size={40}
            style={styles.loader}
          />
        ) : null}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    width: width,
    height: height,
  },
  loader: {
    marginTop: height / 2,
  },
});

export default SplashScreen;
