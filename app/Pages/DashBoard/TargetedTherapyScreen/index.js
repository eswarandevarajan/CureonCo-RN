import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, TextInput, ImageBackground} from 'react-native';
import {Icon} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {GET_TARGETEDTHERAPY} from '../../../Service/MenuService';
import styles from './Styles';
import images from '../../../assets/images';
import appStyles from '../../../assets/Styles/AppStyles';
import {MenuHeaderComponent} from '../../../Components/HeaderComponent';
import TargetedTherapyComponent from '../Component/TargetedTherapyComponent';

const TargetedTherapyScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const targetedTherapyList = useSelector(
    state => state.MenuReducer?.targetedTherapyList,
  );
  const [targetedTherapys, setTargetedTherapys] = useState([]);
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(GET_TARGETEDTHERAPY()).then(response => {
      if (response) {
        setTargetedTherapys(targetedTherapyList);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (targetedTherapys.length === 0) {
      setTargetedTherapys(targetedTherapyList);
    }
  }, [targetedTherapyList, targetedTherapys]);

  

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_TARGETEDTHERAPY()).then(response => {
        if (response) {
          setTargetedTherapys(targetedTherapyList);
        }
      });
    }
  }, [isFetching, dispatch]);

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  const searchItems = text => {
    const newData = targetedTherapyList.filter(item => {
      const itemData = `${item.target.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setTargetedTherapys(newData);
    setSearch(text);
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <MenuHeaderComponent
          title={'Target Therapy'}
          menuOnPress={() => navigation.openDrawer()}
          bellOnPress={() => navigation.openDrawer()}
        />
        <View style={styles.inputStyle}>
          <Icon name={'search'} type={'Feather'} color={'#A9A9A9'} size={25} />
          <TextInput
            style={styles.inputField}
            value={search}
            onChangeText={text => searchItems(text)}
            placeholder={'Search'}
          />
        </View>
        <TargetedTherapyComponent
          style={styles.listStyle}
          targetedTherapys={targetedTherapys}
          onRefreshCall={onRefreshCall}
          isFetching={isFetching}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TargetedTherapyScreen;
