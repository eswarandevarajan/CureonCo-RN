import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Icon} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {GET_KNOWYOURDNA} from '../../../Service/MenuService';
import styles from './Styles';
import NavigationService from '../../../Navigation/NavigationService';
import images from '../../../assets/images';
import appStyles from '../../../assets/Styles/AppStyles';
import {CureOncoFlatList} from '../../../Components/CureOncoAtoms';
import {useState} from 'react';
import {useEffect} from 'react';
import {BackHeaderComponent} from '../../../Components/HeaderComponent';

let listColors = [
  'rgba(236, 204, 104, 0.1)',
  'rgba(255, 127, 80, 0.1)',
  'rgba(255, 107, 129, 0.1)',
];
let listTxtColors = ['#ECCC68', '#FF7F50', '#FF6B81'];

const KnowYourDNAScreen = () => {
  const dispatch = useDispatch();
  const DNALinks = useSelector(state => state.MenuReducer?.DNALinks);
  const [search, setSearch] = useState('');
  const [DNAsLink, setDNAsLink] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(GET_KNOWYOURDNA()).then(response => {
      if (response) {
        setDNAsLink(DNALinks);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_KNOWYOURDNA()).then(response => {
        if (response) {
          setDNAsLink(DNALinks);
        }
      });
    }
  }, [isFetching, dispatch]);

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  const Itemgroups = ({groupdata}) => (
    <View style={styles.renderTopView}>
      {groupdata.map((res, index) => {
        return (
          <TouchableOpacity style={styles.linkBtn}>
            <View style={styles.imageTxtView}>
              <View
                style={[
                  styles.linkImage,
                  {
                    backgroundColor: listColors[index % listColors.length],
                  },
                ]}>
                <Text
                  style={[
                    styles.linkImageTxt,
                    {color: listTxtColors[index % listColors.length]},
                  ]}>
                  {res.title[0]}
                </Text>
              </View>
              {/* <CureOncoImage
                style={{width: scaledWidth(30), height: scaledHeight(30)}}
                source={images.knowDna}
              /> */}
              <View>
                <Text style={styles.linkTxt}>{res.title}</Text>
                <Text style={styles.subLinkTxt}>{res.subtitle}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.callBtn}
              onPress={() => Linking.openURL(`tel:${res.phoneNumbers[0]}`)}>
              <Icon
                name={'phone'}
                type={'Feather'}
                size={25}
                color={'#004E8B'}
                style={styles.iconcent}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <View>
        {/* <Text style={styles.titleTxt}>{item.title}</Text> */}
        <Itemgroups groupdata={item.groupLinks} />
      </View>
    );
  };

  const searchItems = text => {
    const newData = DNALinks.filter(item => {
      // const itemData = `${item.target.toUpperCase()}`;
      // const textData = text.toUpperCase();
      // return itemData.indexOf(textData) > -1;
    });
    // setDNAsLink(newData);
    setSearch(text);
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Know Your DNA'}
          onPress={() => NavigationService.navigateBack()}
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
        <CureOncoFlatList
          data={DNAsLink}
          style={styles.listStyle}
          renderItem={renderItem}
          keyExtractor={({_id}) => _id?.toString()}
          initialNumToRender={10}
          onRefresh={onRefreshCall}
          refreshing={isFetching}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default KnowYourDNAScreen;
