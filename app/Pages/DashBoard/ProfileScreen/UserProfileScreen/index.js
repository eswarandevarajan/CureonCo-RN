import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';
import {Icon} from '../../../../Components';
import NavigationService from '../../../../Navigation/NavigationService';
import appStyles from '../../../../assets/Styles/AppStyles';
import ScreenNames from '../../../../Navigation/ScreenNames';
import {FOLLOWERS, FOLLOWING} from '../../../../Constants/CommonConstants';
import PagerView from 'react-native-pager-view';
import images from '../../../../assets/images';
import {CureOncoAvatar} from '../../../../Components/CureOncoAtoms';
import {GETUSERPOSTS} from '../../../../Service/ProfileService';
import ForumComponent from '../../Component/ForumComponent';

const UserProfileScreen = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const ref = useRef(PagerView);

  const profileReducer = useSelector(state => state.ProfileReducer);
  const {userProfile, userPosts} = profileReducer ?? {};
  const {medappprofile = {}} = userProfile ?? {};
  const {user = {}, followers = [], following = []} = medappprofile;

  const [userDatas, setUserDatas] = useState([]);
  const [isForum, setIsForum] = useState(true);
  const [isTarget, setIstarget] = useState(false);
  const [initialPage, setInitialPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const userID = user?.id;

  useEffect(() => {
    dispatch(GETUSERPOSTS(userID)).then(() => {
      setUserDatas(userPosts.data);
    });
  }, []);

  console.log(userDatas);

  const onPageScrollChanged = event => {
    const {position} = event.nativeEvent ?? {};
    if (position === 1) {
      setIsForum(false);
      setIstarget(true);
    } else if (position === 0) {
      setIstarget(false);
      setIsForum(true);
    }
  };
  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <View style={appStyles.backArrowView}>
          <TouchableOpacity
            style={appStyles.backArrowTouch}
            onPress={() => NavigationService.navigateBack()}>
            <Icon
              name={'keyboard-arrow-left'}
              type={'MaterialIcons'}
              color={'#000'}
              size={30}
            />
          </TouchableOpacity>
          <Text style={appStyles.backTitleTxt}>My Profile</Text>
          <TouchableOpacity
            style={styles.editView}
            onPress={() =>
              NavigationService.navigate(
                ScreenNames.stackNavigation.EditProfile,
              )
            }>
            <Text style={styles.editTxt}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileView}>
          <CureOncoAvatar
            user={user}
            size={80}
            styles={appStyles.profileIcon}
          />
          <View>
            <Text style={styles.nameTxt}>{user?.name}</Text>
            <Text style={styles.emailTxt}>{user?.email}</Text>
            <View style={styles.followersView}>
              <TouchableOpacity
                style={styles.followTouch}
                onPress={() =>
                  NavigationService.navigate(
                    ScreenNames.stackNavigation.Follow,
                    {title: FOLLOWING, following},
                  )
                }>
                <Text style={styles.followingCount}>{following.length}</Text>
                <Text style={styles.followingTxt}>Following</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.followTouch}
                onPress={() =>
                  NavigationService.navigate(
                    ScreenNames.stackNavigation.Follow,
                    {title: FOLLOWERS, followers},
                  )
                }>
                <Text style={styles.followersCount}>{followers.length}</Text>
                <Text style={styles.followingTxt}>Followers</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.topView}>
          <TouchableOpacity
            style={[styles.tabTouch, isForum && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(0);
            }}>
            <Text style={[styles.tabTxt, isForum && styles.selectedTxt]}>
              My Forum
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTouch, isTarget && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(1);
            }}>
            <Text style={[styles.tabTxt, isTarget && styles.selectedTxt]}>
              Target Therapy
            </Text>
          </TouchableOpacity>
        </View>
        <PagerView
          style={styles.pagerView}
          initialPage={initialPage}
          onPageScroll={onPageScrollChanged}
          ref={ref}>
          <View key="1" style={styles.listView}>
            <ForumComponent
              posts={userDatas}
              fetching={isFetching}
              removeHugs={false}
            />
          </View>
          <View key="2">
            <Text>Second page</Text>
          </View>
        </PagerView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
