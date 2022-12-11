import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '../../../../Components';
import NavigationService from '../../../../Navigation/NavigationService';
import appStyles from '../../../../assets/Styles/AppStyles';
import ScreenNames from '../../../../Navigation/ScreenNames';
import {FOLLOWERS, FOLLOWING} from '../../../../Constants/CommonConstants';
import PagerView from 'react-native-pager-view';
import styles from './Styles';
import images from '../../../../assets/images';
import {BackHeaderComponent} from '../../../../Components/HeaderComponent';
import {
  CureOncoFlatList,
  CureOncoImage,
} from '../../../../Components/CureOncoAtoms';
import {colors} from '../../../../themes/themes';
import {useEffect} from 'react';
import {GET_FOLDER_NAMES} from '../../../../Service/ProfileService';
import QRCodeScreen from '../QRCodeScreen';
import Images from '../../../../assets/images';
import ShareDocumentsScreen from '../ShareDocumentsScreen';
import {convertCaptilize} from '../../../../utils/Utils';

const MyDocumentsScreen = props => {
  const dispatch = useDispatch();
  const ref = useRef(PagerView);

  const [isMyDoc, setIsMyDoc] = useState(true);
  const [isShareDoc, setIsShareDoc] = useState(false);
  const [isQRCode, setIsQRCode] = useState(false);
  const [changeVertical, setChangeVertical] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const folderNames = useSelector(state => state.ProfileReducer?.folderNames);

  useEffect(() => {
    dispatch(GET_FOLDER_NAMES());
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_FOLDER_NAMES());
    }
  }, [isFetching, dispatch]);

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  const renderFolder = ({item, index}) => {
    return (
      <TouchableOpacity
        style={changeVertical ? styles.folderVerticalIcon : styles.folderIcon}
        onPress={() => {
          NavigationService.navigate(ScreenNames.stackNavigation.Documents, {
            folderID: item._id,
            folderName: item.folderName,
          });
        }}>
        <CureOncoImage style={styles.folderImage} source={images.folderIcon} />
        <Text
          style={
            changeVertical ? styles.folderVerticalText : styles.folderText
          }>
          {convertCaptilize(item.folderName)}
        </Text>
      </TouchableOpacity>
    );
  };

  const listChange = () => {
    return (
      <View style={styles.changeTopView}>
        <View style={styles.changeLeftView}>
          <Text style={styles.changeNameTxt}>Name</Text>
          <Icon
            name={'arrowup'}
            type={'AntDesign'}
            color={'#2B354E'}
            size={20}
          />
        </View>
        <TouchableOpacity onPress={() => setChangeVertical(!changeVertical)}>
          {changeVertical ? (
            <Icon
              name={'view-module'}
              type={'MaterialCommunityIcons'}
              color={'#737B7D'}
              size={30}
            />
          ) : (
            <Icon
              name={'nav-icon-list-a'}
              type={'Fontisto'}
              color={'#737B7D'}
              size={20}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const onPageScrollChanged = event => {
    const {position} = event.nativeEvent ?? {};
    if (position === 0) {
      setIsMyDoc(true);
      setIsShareDoc(false);
      setIsQRCode(false);
    } else if (position === 1) {
      setIsMyDoc(false);
      setIsShareDoc(true);
      setIsQRCode(false);
    } else if (position === 2) {
      setIsMyDoc(false);
      setIsShareDoc(false);
      setIsQRCode(true);
    }
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Docments'}
          onPress={() => NavigationService.navigateBack()}
        />
        <View style={styles.topView}>
          <TouchableOpacity
            style={[styles.tabTouch, isMyDoc && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(0);
            }}>
            <Text style={[styles.tabTxt, isMyDoc && styles.selectedTxt]}>
              My Doc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTouch, isShareDoc && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(1);
            }}>
            <Text style={[styles.tabTxt, isShareDoc && styles.selectedTxt]}>
              Shard Doc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabTouch, isQRCode && styles.selectedTab]}
            onPress={() => {
              ref.current.setPage(2);
            }}>
            <Text style={[styles.tabTxt, isQRCode && styles.selectedTxt]}>
              QR Upload
            </Text>
          </TouchableOpacity>
        </View>

        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageScroll={onPageScrollChanged}
          ref={ref}>
          <View key="1">
            <View style={{flex: 1}}>
              {listChange()}
              <CureOncoFlatList
                key={changeVertical ? '_' : '#'}
                data={folderNames}
                numColumns={changeVertical ? 1 : 3}
                renderItem={renderFolder}
                keyExtractor={(item, idx) => item._id.toString()}
                style={styles.folderList}
                onRefresh={onRefreshCall}
                refreshing={isFetching}
              />
            </View>
          </View>
          <View key="2">
            <ShareDocumentsScreen />
          </View>
          <View key="3">
            <QRCodeScreen />
          </View>
        </PagerView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MyDocumentsScreen;
