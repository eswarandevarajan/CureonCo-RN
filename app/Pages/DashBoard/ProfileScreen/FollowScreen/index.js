import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from '../../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';
import NavigationService from '../../../../Navigation/NavigationService';
import appStyles from '../../../../assets/Styles/AppStyles';
import {CureOncoFlatList, CureOncoListSeparator} from '../../../../Components/CureOncoAtoms';
import {FOLLOWERS, FOLLOWING} from '../../../../Constants/CommonConstants';
import {colors, fonts} from '../../../../themes/themes';

const follow = [
  {
    name: 'Lira',
    image: '',
    text: 'Message',
  },
  {
    name: 'Lira',
    image: '',
    text: 'Message',
  },
  {
    name: 'Lira',
    image: '',
    text: 'Message',
  },
  {
    name: 'Lira',
    image: '',
    text: 'Message',
  },
  {
    name: 'Lira',
    image: '',
    text: 'Message',
  },
];

const FollowScreen = props => {
  const {title = '', following = [], followers = []} = props?.route?.params;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const keyExtractor = (item, _id) => _id.toString();

  const renderItem = ({item}) => {
    return (
      <View style={styles.listView}>
        <Icon
          name={'person-circle-outline'}
          type={'Ionicons'}
          size={80}
          color={'#2B354E'}
        />
        <View style={styles.textView}>
          <Text style={styles.nameTxt}>{item?.name}</Text>
          <Text style={styles.messageTxt}>{item?.text}</Text>
        </View>
        <TouchableOpacity style={styles.trackTouch}>
          <Text style={styles.tracTxt}>
            {title === FOLLOWING ? 'Follow' : 'Remove'}
          </Text>
        </TouchableOpacity>
      </View>
    );
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
          <Text style={appStyles.headerTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.listViewStyle}>
        <View style={styles.inputStyle}>
          <Icon name={'search'} type={'Feather'} color={'#A9A9A9'} size={25} />
          <TextInput
            style={styles.inputField}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <CureOncoFlatList
          data={follow}
          style={styles.listStyle}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={<CureOncoListSeparator />}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowScreen;
