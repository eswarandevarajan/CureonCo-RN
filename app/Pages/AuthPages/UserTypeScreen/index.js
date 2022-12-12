import React from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import {useDispatch} from 'react-redux';
import UserTypeComponent from '../Component/UserTypeComponent';
import NavigationService from '../../../Navigation/NavigationService';
import ScreenNames from '../../../Navigation/ScreenNames';
import {UPDATEUSERPROFILE} from '../../../Service/ProfileService';
import appStyles from '../../../assets/Styles/AppStyles';
import images from '../../../assets/images';
import {BackHeaderComponent} from '../../../Components/HeaderComponent';

const UserTypeScreen = () => {
  const dispatch = useDispatch();

  const onSubmit = registerRole => {
    dispatch(UPDATEUSERPROFILE(registerRole, true));
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
    </SafeAreaView>
  );
};

export default UserTypeScreen;
