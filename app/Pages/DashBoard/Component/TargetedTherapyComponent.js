import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from '../../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {GET_TARGETEDTHERAPY} from '../../../Service/MenuService';
import images from '../../../assets/images';
import appStyles from '../../../assets/Styles/AppStyles';
import {
  CureOncoFlatList,
  CureOncoListSeparator,
} from '../../../Components/CureOncoAtoms';
import {MenuHeaderComponent} from '../../../Components/HeaderComponent';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';
import {fonts} from '../../../themes/themes';

const {width, height} = Dimensions.get('window');

let listColors = [
  'rgba(236, 204, 104, 0.1)',
  'rgba(255, 127, 80, 0.1)',
  'rgba(255, 107, 129, 0.1)',
];
let listTxtColors = ['#ECCC68', '#FF7F50', '#FF6B81'];

const TargetedTherapyComponent = props => {
  const {targetedTherapys, style} = props;
  console.log(targetedTherapys);
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const renderItem = ({item, index}) => {
    const {target = '', cancerType = '', drug = ''} = item ?? {};
    return (
      <TouchableOpacity style={styles.renderTopView}>
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
            {target[0]}
          </Text>
        </View>
        <View>
          <Text style={styles.linkTxt}>{target}</Text>
          <Text style={styles.subLinkTxt}>{cancerType}</Text>
        </View>
        <View style={styles.drugView}>
          <Text style={styles.drugTxt}>Drug Name</Text>
          <Text style={styles.drugNameTxt}>{drug}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setIsFetching(true, () => {
      dispatch(GET_TARGETEDTHERAPY());
    });
  };

  return (
    <View style={style}>
      <CureOncoFlatList
        data={targetedTherapys}
        renderItem={renderItem}
        keyExtractor={({_id}) => _id?.toString()}
        onRefresh={onRefresh}
        refreshing={isFetching}
        ItemSeparatorComponent={<CureOncoListSeparator />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  linkTxt: {
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
    fontSize: 16,
    width: width - scaledWidth(180),
    marginLeft: scaledWidth(5),
    textAlignVertical: 'center',
    fontFamily: fonts.semi_bold,
    color: '#0F0F0F',
  },
  subLinkTxt: {
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
    fontSize: 13,
    width: width - scaledWidth(180),
    marginLeft: scaledWidth(5),
    textAlignVertical: 'center',
    fontFamily: fonts.semi_bold,
    color: '#545454',
  },
  listStyle: {
    marginTop: scaledHeight(20),
    height: height - scaledHeight(10),
  },
  inputStyle: {
    backgroundColor: '#FEFEFE',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    ...appStyles.boxShadow,
    borderRadius: 25,
    flexDirection: 'row',
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
    paddingLeft: scaledWidth(10),
    alignItems: 'center',
    marginTop: scaledHeight(20),
  },
  renderTopView: {
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    paddingLeft: scaledWidth(10),
    paddingRight: scaledWidth(10),
    paddingTop: scaledHeight(10),
    paddingBottom: scaledHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkImage: {
    width: scaledWidth(60),
    height: scaledHeight(65),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkImageTxt: {
    fontFamily: fonts.medium,
    fontSize: 25,
  },
  inputField: {
    flex: 1,
  },
  drugTxt: {
    borderBottomColor: '#000000',
    borderBottomWidth: 2,
    width: scaledWidth(60),
    fontFamily: fonts.semi_bold,
    color: '#0F0F0F',
    fontSize: 10,
    textAlign: 'center',
  },
  drugNameTxt: {
    width: width - scaledWidth(300),
    fontFamily: fonts.semi_bold,
    color: '#545454',
    fontSize: 13,
    textAlign: 'center',
    marginTop: scaledHeight(5),
  },
  drugView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    flexDirection: 'row',
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(15),
  },
  menuTouch: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  bellTouch: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: scaledWidth(10),
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  dashTxt: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.regular,
    fontSize: 18,
    color: '#2B354E',
  },
});

export default TargetedTherapyComponent;
