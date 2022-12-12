import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//AuthScreens
import {
  ChangePasswordScreen,
  LoginScreen,
  OnBoardScreen,
  SignupScreen,
  SplashScreen,
  UserTypeScreen,
} from '../Pages/AuthPages';
import ScreenNames from './ScreenNames';
import CureonCoAppError from '../Components/CureonCoAppError';
import CureonCoActitivtyIndicator from '../Components/CureonCoActitivtyIndicator';
import SideBarMenu from '../Menu/SideBarMenu';
import {colors, fonts} from '../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../utils/Resolution';
import {Dash_Board} from '../Constants/TextConstants';
import {Icon} from '../Components';
import images from '../assets/images';
import {CureOncoImage} from '../Components/CureOncoAtoms';
import {
  HomeMenuScreen,
  KnowYourDNAScreen,
  OncoNewsScreen,
  TrackScreen,
} from '../Pages/DashBoard';
import {
  EditProfileScreen,
  FollowScreen,
  UserProfileScreen,
} from '../Pages/DashBoard/ProfileScreen';
import {MyDocumentsScreen} from '../Pages/DashBoard/DocumentsScreen';
import FolderDocumentsScreen from '../Pages/DashBoard/DocumentsScreen/MyDocumentsScreen/FolderDocumentsScreen';
import PatientForumScreen from '../Pages/DashBoard/PatientForumScreen';
import CreatePostScreen from '../Pages/DashBoard/PatientForumScreen/CreatePostScreen';
import TargetedTherapyScreen from '../Pages/DashBoard/TargetedTherapyScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BotomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MainStackNavigator = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={ScreenNames.stackNavigation.Splash}
        screenOptions={horizontalAnimation}>
        <Stack.Screen
          name={ScreenNames.stackNavigation.Splash}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.stackNavigation.OnBoard}
          component={OnBoardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.stackNavigation.Login}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.stackNavigation.Signup}
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.stackNavigation.ChangePassword}
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.stackNavigation.UserType}
          component={UserTypeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.stackNavigation.DashBoard}
          component={DrawerContainer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <CureonCoActitivtyIndicator />
      <CureonCoAppError />
    </View>
  );
};

const DrawerContainer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoardStackScreen"
      drawerContent={props => <SideBarMenu {...props} />}>
      <Drawer.Screen
        name="DashBoardStackScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabsScreen"
        component={TabContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.KnowYourDNA}
        component={KnowYourDNAScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.OncoNews}
        component={OncoNewsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={ScreenNames.stackNavigation.DocumentsShare}
        component={DocumentsScreens}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={ScreenNames.stackNavigation.UserProfile}
        component={UserProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.EditProfile}
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.Follow}
        component={FollowScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.Track}
        component={TrackScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.CreatePost}
        component={CreatePostScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const DocumentsScreens = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.stackNavigation.MyDocuments}>
      <Stack.Screen
        name={ScreenNames.stackNavigation.MyDocuments}
        component={MyDocumentsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.stackNavigation.Documents}
        component={FolderDocumentsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Title = () => {
  return (
    <Text style={styles.titleTxt}>{Dash_Board.home.closed_community_txt}</Text>
  );
};

const TabContainer = () => {
  return (
    <BotomTab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomTabBar,
        tabBarLabelStyle: styles.bottomTabBarLabel,
        tabBarActiveTintColor: '#004E8B',
        tabBarInactiveTintColor: '#2B354E',
        unmountOnBlur: true,
      })}>
      <BotomTab.Screen
        name={ScreenNames.tabNavigation.HomeMenu}
        component={HomeMenuScreen}
        options={({navigation}) => ({
          headerShown: false,
          tabBarLabel: Dash_Board.home.home_txt,
          tabBarIcon: ({focused}) => {
            const color = focused ? '#004E8B' : '#2B354E';
            const backColor = focused ? 'rgba(0, 78, 139, 0.07)' : colors.white;
            return (
              <TouchableOpacity
                style={[styles.imageFocused, {backgroundColor: backColor}]}
                onPress={() =>
                  navigation.navigate(ScreenNames.tabNavigation.HomeMenu)
                }>
                <Icon name={'home'} type={'Entypo'} size={28} color={color} />
              </TouchableOpacity>
            );
          },
        })}
      />
      <BotomTab.Screen
        name={ScreenNames.tabNavigation.PatientForum}
        component={PatientForumScreen}
        options={({navigation}) => ({
          headerShown: false,
          tabBarLabel: Dash_Board.home.targeted_therapy_txt,
          tabBarIcon: ({focused}) => {
            const image = focused
              ? images.patientsForumActive
              : images.patientsForumInactive;
            const backColor = focused ? 'rgba(0, 78, 139, 0.07)' : colors.white;
            return (
              <TouchableOpacity
                style={[styles.imageFocused, {backgroundColor: backColor}]}
                onPress={() =>
                  navigation.navigate(ScreenNames.tabNavigation.PatientForum)
                }>
                <CureOncoImage
                  source={image}
                  style={{
                    height: convertToDeviceResolution(11),
                    width: convertToDeviceResolution(11),
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <BotomTab.Screen
        name={ScreenNames.tabNavigation.TargetedTherapy}
        component={TargetedTherapyScreen}
        options={({navigation}) => ({
          headerShown: false,
          tabBarLabel: Dash_Board.home.targeted_therapy_txt,
          tabBarIcon: ({focused}) => {
            const image = focused
              ? images.targetedTherapyActive
              : images.targetedTherapyInactive;
            const backColor = focused ? 'rgba(0, 78, 139, 0.07)' : colors.white;
            return (
              <TouchableOpacity
                style={[styles.imageFocused, {backgroundColor: backColor}]}
                onPress={() =>
                  navigation.navigate(ScreenNames.tabNavigation.TargetedTherapy)
                }>
                <CureOncoImage
                  source={image}
                  style={{
                    height: convertToDeviceResolution(11),
                    width: convertToDeviceResolution(11),
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <BotomTab.Screen
        name={ScreenNames.tabNavigation.Symptoms}
        component={HomeMenuScreen}
        options={({navigation}) => ({
          headerShown: false,
          tabBarLabel: Dash_Board.home.symptom_log_txt,
          tabBarIcon: ({tintColor, focused}) => {
            const image = focused
              ? images.appointmentsActive
              : images.appointmentsInactive;
            const backColor = focused ? 'rgba(0, 78, 139, 0.07)' : colors.white;
            return (
              <TouchableOpacity
                style={[styles.imageFocused, {backgroundColor: backColor}]}
                onPress={() =>
                  navigation.navigate(ScreenNames.tabNavigation.Symptoms)
                }>
                <CureOncoImage
                  source={image}
                  style={{
                    height: convertToDeviceResolution(11),
                    width: convertToDeviceResolution(11),
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
      <BotomTab.Screen
        name={ScreenNames.tabNavigation.ClosedCommunity}
        component={HomeMenuScreen}
        options={({navigation}) => ({
          headerTitle: props => <Title {...props} />,
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: scaledWidth(15)}}
              onPress={() => navigation.openDrawer()}>
              <Icon
                name={'menu-open'}
                type={'MaterialCommunityIcons'}
                size={35}
                color={colors.bg}
              />
            </TouchableOpacity>
          ),
          tabBarLabel: Dash_Board.home.closed_community_txt,
          tabBarIcon: ({tintColor, focused}) => {
            const image = focused
              ? images.closedCommunityActive
              : images.closedCommunityInactive;
            const backColor = focused ? 'rgba(0, 78, 139, 0.07)' : colors.white;
            return (
              <TouchableOpacity
                style={[styles.imageFocused, {backgroundColor: backColor}]}
                onPress={() =>
                  navigation.navigate(ScreenNames.tabNavigation.ClosedCommunity)
                }>
                <CureOncoImage
                  source={image}
                  style={{
                    height: convertToDeviceResolution(11),
                    width: convertToDeviceResolution(11),
                  }}
                />
              </TouchableOpacity>
            );
          },
        })}
      />
    </BotomTab.Navigator>
  );
};

// const PatientsForumScreen = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName={ScreenNames.stackNavigation.PatientPosts}>
//       <Stack.Screen
//         name={ScreenNames.stackNavigation.PatientPosts}
//         component={PatientForumScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name={ScreenNames.stackNavigation.CreatePost}
//         component={CreatePostScreen}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

// const UserProfile = () => {
//   return (
//     <TopTab.Navigator
//       initialRouteName={ScreenNames.topTabNavigation.UserProfile}
//       tabBarOptions={{
//         activeTintColor: colors.white,
//         inactiveTintColor: colors.gray,
//         style: {backgroundColor: colors.bg},
//         tabStyle: styles.topTabStyle,
//         indicatorStyle: styles.topTabIndicator,
//       }}>
//       <TopTab.Screen
//         name={ScreenNames.topTabNavigation.BookAppointment}
//         component={BookAppointment}
//         options={{
//           headerShown: false,
//           tabBarLabel: Dash_Board.AppointmentBooking.book_appointment_txt,
//           tabBarIcon: ({color}) => (
//             <Icon
//               name={'calendar'}
//               type={'FontAwesome'}
//               size={25}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <TopTab.Screen
//         name={ScreenNames.topTabNavigation.Schedules}
//         component={Schedules}
//         style={{flexDirection: 'row'}}
//         options={{
//           headerShown: false,
//           tabBarLabel: Dash_Board.AppointmentBooking.schedule_txt,
//           tabBarIcon: ({color}) => (
//             <Icon
//               name={'schedule'}
//               type={'MaterialIcons'}
//               size={25}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </TopTab.Navigator>
//   );
// };

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 20,
    fontFamily: fonts.boldItalic,
    color: '#000',
    marginLeft: scaledWidth(55),
  },
  bottomTabBar: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    height: scaledHeight(60),
  },
  bottomTabBarLabel: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  topTabStyle: {
    flexDirection: 'row',
    padding: 12,
  },
  topTabIndicator: {
    borderBottomWidth: 2,
    borderColor: colors.gray,
  },
  imageFocused: {
    borderRadius: 100,
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
    paddingTop: scaledHeight(5),
    paddingBottom: scaledHeight(5),
    width: convertToDeviceResolution(15),
    height: convertToDeviceResolution(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainStackNavigator;
