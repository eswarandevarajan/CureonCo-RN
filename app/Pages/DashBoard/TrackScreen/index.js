import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Header, Icon, TimeFormat, WebviewComponent} from '../../../Components';
import {Dash_Board} from '../../../Constants/TextConstants';
import {connect, useDispatch, useSelector} from 'react-redux';
import styles from './Styles';
import {GET_ONCONEWS} from '../../../Service/MenuService';
import ScreenNames from '../../../Navigation/ScreenNames';
import NavigationService from '../../../Navigation/NavigationService';
import appStyles from '../../../assets/Styles/AppStyles';
import {scaledWidth} from '../../../utils/Resolution';
import {
  CureOncoFlatList,
  CureOncoImage,
} from '../../../Components/CureOncoAtoms';
import {Picker} from '@react-native-picker/picker';

const filterCatrgories = [
  {
    value: 0,
    label: 'Date',
  },
  {
    value: 1,
    label: 'Month',
  },
  {
    value: 2,
    label: 'Year',
  },
];
const Item = Picker.Item;

const TrackScreen = () => {
  const dispatch = useDispatch();
  const oncoNewsList = useSelector(state => state.MenuReducer?.oncoNewsList);
  const [showWebView, setShowWebView] = useState(false);
  const [filter, setFilter] = useState(-1);
  const [articleLink, setArticleLink] = useState('');

  useEffect(() => {
    dispatch(GET_ONCONEWS());
  }, [dispatch]);

  const renderItem = ({item, index}) => {
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

  const keyExtractor = (item, _id) => _id.toString();

  const onNavigationStateChange = navState => {};

  const onClosePress = () => {
    setShowWebView(false);
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <View style={appStyles.backContainer}>
        <View style={appStyles.backHeaderView}>
          <TouchableOpacity
            style={appStyles.arrowTouch}
            onPress={
              () => NavigationService.navigateBack()
              // NavigationService.navigate(ScreenNames.stackNavigation.DashBoard)
            }>
            <Icon
              name={'keyboard-arrow-left'}
              type={'MaterialIcons'}
              color={'#000'}
              size={30}
            />
          </TouchableOpacity>
          <Text style={appStyles.headerTitle}>Track</Text>
        </View>
      </View>
      <View style={styles.listStyle}>
        <View style={styles.trackTouch}>
          <Picker
            selectedValue={filter}
            mode="dropdown"
            dropdownIconColor={'#1F75FF'}
            dropdownIconRippleColor={'#1F75FF'}
            // itemStyle={{backgroundColor: colors.white}}
            onValueChange={(itemValue, itemIndex) => {
              setFilter(itemValue);
            }}>
            {filterCatrgories.map((v, i) => (
              <Item
                color={'#000'}
                itemStyle={styles.pickerItem}
                key={i}
                label={v.label}
                value={v.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackScreen;
