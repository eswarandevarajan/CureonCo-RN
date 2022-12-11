import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
// import {GoogleSignin} from '@react-native-community/google-signin';
import {Button, Icon, ModalComponent} from '../../../Components';
import UserTypeComponent from '../Component/UserTypeComponent';
import {
  ACCESS_TOKEN,
  GOOGLE,
  REFRESH_TOKEN,
  USER_INFO,
} from '../../../Constants/CommonConstants';
import {Signup_Screen} from '../../../Constants/TextConstants';
import NavigationService from '../../../Navigation/NavigationService';
import ScreenNames from '../../../Navigation/ScreenNames';
import {UPDATEUSERPROFILE} from '../../../Service/ProfileService';
import AppUtils from '../../../utils/AppUtils';
import appStyles from '../../../assets/Styles/AppStyles';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../utils/Resolution';
import {fonts} from '../../../themes/themes';
import images from '../../../assets/images';
import {BackHeaderComponent} from '../../../Components/HeaderComponent';

const UserTypeScreen = () => {
  const dispatch = useDispatch();
  const [showSuceessModal, sethowSuceessModal] = useState(false);

  const onSubmit = registerRole => {
    dispatch(UPDATEUSERPROFILE(registerRole, true));
  };

  const onSuccessModal = () => {
    sethowSuceessModal(false);
    NavigationService.navigate(ScreenNames.stackNavigation.DashBoard);
  };

  const onBackPress = async () => {
    // const userProfile = await AppUtils.getUserProfile();
    // const registrationType = userProfile.user.registrationType;
    // await AppUtils.removeItemFromSecuredStorage(ACCESS_TOKEN);
    // await AppUtils.removeItemFromSecuredStorage(REFRESH_TOKEN);
    // await AppUtils.removeItemFromSecuredStorage(USER_INFO);
    // if (registrationType === GOOGLE) {
    //   await GoogleSignin.revokeAccess();
    //   await GoogleSignin.signOut();
    // }
    NavigationService.navigate(ScreenNames.stackNavigation.Login);
  };

  const renderModal = () => {
    return (
      <View style={styles.modalView}>
        <Text style={styles.titleTxt}>{Signup_Screen.modalTitle_Txt}</Text>
        <Text style={styles.subTitleTxt}>
          {Signup_Screen.modalSubtitle_Txt}
        </Text>
        <Button
          btnLabel={Signup_Screen.modalBtn_Txt}
          btnPress={onSuccessModal}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Choose your role'}
          onPress={() =>
            NavigationService.navigate(ScreenNames.stackNavigation.Login)
          }
        />
        <UserTypeComponent getRegisterRole={onSubmit} />
      </ImageBackground>
      {/* <ModalComponent
        renderModal={renderModal()}
        visibility={showSuceessModal}
        onBackdropPress={onSuccessModal}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedModalTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#2B354E',
    fontWeight: '400',
    marginLeft: scaledWidth(15),
    marginTop: scaledHeight(10),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTypeView: {
    position: 'absolute',
    marginTop: scaledHeight(70),
    // marginLeft: scaledWidth(20),
    // marginRight: scaledWidth(40),
  },
});

export default UserTypeScreen;
