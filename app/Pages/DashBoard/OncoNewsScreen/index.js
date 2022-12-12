import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ImageBackground} from 'react-native';
import {TimeFormat} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';
import {GET_ONCONEWS} from '../../../Service/MenuService';
import NavigationService from '../../../Navigation/NavigationService';
import appStyles from '../../../assets/Styles/AppStyles';
import {
  CureOncoFlatList,
  CureOncoImage,
} from '../../../Components/CureOncoAtoms';
import images from '../../../assets/images';
import {BackHeaderComponent} from '../../../Components/HeaderComponent';

const OncoNewsScreen = () => {
  const dispatch = useDispatch();
  const oncoNewsList = useSelector(state => state.MenuReducer?.oncoNewsList);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(GET_ONCONEWS());
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_ONCONEWS());
    }
  }, [isFetching, dispatch]);

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.topicView}>
          <Text style={styles.itemTopicTxt}>{item.topic}</Text>
          <Text style={styles.itemHourTxt}>
            {' '}
            {TimeFormat.formatTime(item.published_date)}
          </Text>
        </View>
        <View style={styles.topicView}>
          <Text numberOfLines={3} style={styles.listItemTitle}>
            {item.title}
          </Text>
          <CureOncoImage style={styles.listIcon} source={{uri: item.media}} />
        </View>
        <Text numberOfLines={2} style={styles.listItemDesc}>
          {item.summary}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Onconews'}
          onPress={() => NavigationService.navigateBack()}
        />
        <CureOncoFlatList
          data={oncoNewsList}
          style={styles.listStyle}
          renderItem={renderItem}
          keyExtractor={_id => _id.toString()}
          initialNumToRender={10}
          onRefresh={onRefreshCall}
          refreshing={isFetching}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OncoNewsScreen;
