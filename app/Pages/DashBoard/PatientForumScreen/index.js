import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../../Navigation/NavigationService';
import FABComponent from '../../../Components/FABComponent';
import {GET_ALLFEEDS} from '../../../Service/MenuService';
import appStyles from '../../../assets/Styles/AppStyles';
import images from '../../../assets/images';
import ForumComponent from '../Component/ForumComponent';
import ScreenNames from '../../../Navigation/ScreenNames';
import {Icon} from '../../../Components';
import styles from './Styles';

const PatientForumScreen = props => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const feeds = useSelector(state => state.MenuReducer?.feeds);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(GET_ALLFEEDS());
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_ALLFEEDS());
    }
  }, [isFetching, dispatch]);

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <View style={styles.topView}>
          <TouchableOpacity
            style={styles.menuTouch}
            onPress={() => navigation.openDrawer()}>
            <Icon
              name={'graph-horizontal'}
              type={'Foundation'}
              size={25}
              color={'#0F0F0F'}
            />
          </TouchableOpacity>
          <Text style={styles.dashTxt}>Patient Forum</Text>
          <TouchableOpacity style={styles.bellTouch}>
            <Icon
              name={'bell-o'}
              type={'FontAwesome'}
              size={25}
              color={'#0F0F0F'}
            />
          </TouchableOpacity>
        </View>
        <ForumComponent
          posts={feeds}
          removeHugs={false}
          style={styles.listView}
          onRefreshCall={onRefreshCall}
          isRefresh={isFetching}
        />
        <FABComponent
          iconName={'plus'}
          iconType={'AntDesign'}
          size={30}
          iconColor={'#737B7D'}
          onPress={() =>
            NavigationService.navigate(ScreenNames.stackNavigation.CreatePost, {
              targetTherapyId: '',
            })
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PatientForumScreen;
