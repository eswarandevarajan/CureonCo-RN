import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Icon} from '../Components';
import {colors, fonts} from '../themes/themes';
import {Dash_Board} from '../Constants/TextConstants';
import images from '../assets/images';
import AppUtils from '../utils/AppUtils';
import {
  ACCESS_TOKEN,
  GOOGLE,
  REFRESH_TOKEN,
  USER_INFO,
} from '../Constants/CommonConstants';
import ScreenNames from '../Navigation/ScreenNames';
import NavigationService from '../Navigation/NavigationService';
// import {Divider} from 'react-native-elements';
import {store} from '../Redux/Store';
import {setUserLoggedOut} from '../Redux/Actions/AuthAction';
import {AUTH_LOGOUT} from '../Service/AuthService';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../utils/Resolution';
import {
  CureOncoFlatList,
  CureOncoImage,
  ProfileAvatar,
} from '../Components/CureOncoAtoms';
import {useDispatch, useSelector} from 'react-redux';

const SideBarMenu = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.ProfileReducer?.userProfile);
  const {medappprofile = {}} = userProfile ?? {};
  const {user = {}} = medappprofile;
  const sideMenus = [
    {
      name: Dash_Board.home.home_txt,
      icon: (
        <Icon
          name={'home'}
          type={'Entypo'}
          size={25}
          style={styles.iconStyle}
          color={'#2B354E'}
        />
      ),
      navigationName: ScreenNames.tabNavigation.HomeMenu,
    },
    {
      name: Dash_Board.home.profile_txt,
      icon: (
        <View style={styles.imageView}>
          <CureOncoImage
            style={styles.imageStyle}
            source={images.profileIcon}
          />
        </View>
      ),
      navigationName: ScreenNames.stackNavigation.UserProfile,
    },
    {
      name: Dash_Board.home.journals_txt,
      icon: (
        <Icon
          name={'person'}
          type={'Octicons'}
          size={25}
          style={styles.iconStyle}
          color={'#2B354E'}
        />
      ),
      navigationName: ScreenNames.tabNavigation.PatientForum,
    },
    {
      name: Dash_Board.home.voiceRecord_txt,
      icon: (
        <Icon
          name={'keyboard-voice'}
          type={'MaterialIcons'}
          size={30}
          style={styles.iconStyle}
          color={'#2B354E'}
        />
      ),
      navigationName: ScreenNames.tabNavigation.TargetedTherapy,
    },
    {
      name: Dash_Board.home.privacy_txt,
      icon: null,
      navigationName: ScreenNames.tabNavigation.ClosedCommunity,
    },
    {
      name: Dash_Board.home.terms_txt,
      icon: null,
      navigationName: ScreenNames.tabNavigation.Symptoms,
    },
    {
      name: Dash_Board.home.feedback_txt,
      icon: null,
      navigationName: ScreenNames.stackNavigation.Feedback,
    },
    {
      name: Dash_Board.home.use_txt,
      icon: null,
      navigationName: '',
    },
    {
      name: Dash_Board.home.about_txt,
      icon: null,
      navigationName: '',
    },
  ];

  const logout = async () => {
    navigation.closeDrawer();
    const success = dispatch(AUTH_LOGOUT());
    if (success) {
      // const userProfiles = await AppUtils.getUserProfile();
      // const registrationType = userProfiles.user.registrationType;
      await AppUtils.removeItemFromSecuredStorage(ACCESS_TOKEN);
      await AppUtils.removeItemFromSecuredStorage(REFRESH_TOKEN);
      await AppUtils.removeItemFromSecuredStorage(USER_INFO);
      dispatch(setUserLoggedOut());
      navigation.navigate(ScreenNames.stackNavigation.Login);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.side_menuView}
        onPress={() => {
          navigation.closeDrawer();
          NavigationService.navigate(item.navigationName);
        }}>
        {item.icon}
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, idx) => idx.toString();

  const renderHeader = () => {
    return (
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.iconTouch}
          onPress={() => navigation.closeDrawer()}>
          <Icon name={'close'} type={'AntDesign'} size={25} color={'#2B354E'} />
        </TouchableOpacity>
        <View style={styles.profileView}>
          {/* <ProfileAvatar user={user} size={45} /> */}
          <Icon
            name={'person-circle-outline'}
            type={'Ionicons'}
            size={60}
            color={'#2B354E'}
          />
          <View>
            <Text style={styles.nameTxt}>{user?.name}</Text>
            <Text style={styles.emailTxt}>{user?.email}</Text>
          </View>
        </View>
      </View>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CureOncoFlatList
        data={sideMenus}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        ListHeaderComponent={renderHeader}
      />
      <View style={styles.top}>
        <TouchableOpacity style={styles.profileView} onPress={logout}>
          <Text style={styles.signOutTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SideBarMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: scaledHeight(10),
  },
  text: {
    color: colors.black,
    fontSize: 16,
    flex: 1,
    fontFamily: fonts.semi_bold,
  },
  top: {
    paddingBottom: scaledHeight(10),
    marginBottom: scaledHeight(10),
  },
  profileView: {
    marginLeft: scaledWidth(15),
    flexDirection: 'row',
    marginTop: scaledHeight(10),
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 15,
    marginLeft: scaledWidth(8),
    color: '#0F0F0F',
    fontFamily: fonts.semi_bold,
  },
  emailTxt: {
    fontSize: 14,
    marginLeft: scaledWidth(8),
    color: '#0F0F0F',
    fontFamily: fonts.regular,
  },
  side_menuView: {
    flexDirection: 'row',
    paddingLeft: scaledWidth(20),
    paddingTop: scaledHeight(15),
    paddingBottom: scaledHeight(15),
  },
  iconStyle: {
    flex: 0.2,
  },
  imageView: {
    flex: 0.15,
    marginRight: scaledWidth(10),
  },
  imageStyle: {
    width: convertToDeviceResolution(8),
    height: convertToDeviceResolution(8),
  },
  signOutTxt: {
    fontSize: 16,
    marginLeft: scaledWidth(15),
    color: colors.black,
    fontFamily: fonts.semi_bold,
  },
  iconTouch: {
    alignItems: 'flex-end',
    paddingLeft: scaledWidth(10),
    paddingRight: scaledWidth(10),
    paddingTop: scaledHeight(10),
    paddingBottom: scaledHeight(10),
  },
  itemSeparator: {
    borderWidth: 0.2,
    opacity: 0.2,
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(25),
  },
});
