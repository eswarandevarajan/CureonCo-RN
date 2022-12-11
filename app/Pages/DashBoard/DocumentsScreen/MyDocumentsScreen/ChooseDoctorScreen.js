import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  ImageBackground,
  Modal,
  TextInput,
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
  CureOncoListSeparator,
} from '../../../../Components/CureOncoAtoms';
import {colors} from '../../../../themes/themes';
import {useEffect} from 'react';
import {
  GET_DOCTORS,
  GET_FOLDER_NAMES,
  GET_USER_FILES,
  SHARE_FILES,
  UPLOAD_FILES,
} from '../../../../Service/ProfileService';
import QRCodeScreen from '../QRCodeScreen';
import Images from '../../../../assets/images';
import FABComponent from '../../../../Components/FABComponent';
import PopUpModalComponent from '../../../../Components/PopUpModalComponent';
import CheckBox from '@react-native-community/checkbox';
import ImagePickerComponent from '../../../../Components/ImagePickerComponent';
import {CAMERA, DOCUMENT} from '../../../../Config/config';
import {DOCUMENTS} from '../../../../Config/API_URL';
import ModalComponent from '../../../../Components/ModalComponent';
import {scaledHeight} from '../../../../utils/Resolution';

const doctors = [
  {
    name: 'Dr. Chaiya Mariy',
    type: 'Oncologist',
    date: '04 April 2022',
    day: 'Monday',
  },
  {
    name: 'Dr. Chaiya Mariy',
    type: 'Oncologist',
    date: '04 April 2022',
    day: 'Monday',
  },
  {
    name: 'Dr. Chaiya Mariy',
    type: 'Oncologist',
    date: '04 April 2022',
    day: 'Monday',
  },
  {
    name: 'Dr. Chaiya Mariy',
    type: 'Oncologist',
    date: '04 April 2022',
    day: 'Monday',
  },
];

const ChooseDoctorScreen = props => {
  const {ShowChooseDoctor, isChecked} = props;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  //   const ref = useRef(PagerView);
  // const folderNames = useSelector(state => state.ProfileReducer?.folderNames);
  const doctors = useSelector(state => state.ProfileReducer?.doctors);

  console.log(isChecked);

  useEffect(() => {
    dispatch(GET_DOCTORS());
  }, [dispatch]);

  const renderDoctors = ({item, index}) => {
    const {user = {}, specialization = []} = item ?? {};
    return (
      <TouchableOpacity
        style={styles.doctorTouch}
        onPress={() => {
          ShowChooseDoctor(false);
          const shareData = {
            to_id: user?._id,
            file_id: isChecked,
          };
          dispatch(SHARE_FILES(shareData)).then(response => {
            if (response) {
            }
          });
        }}>
        <View>
          <Icon
            name={'file-pdf-box'}
            type={'MaterialCommunityIcons'}
            size={70}
            color={'#DD2025'}
            style={styles.itemVerticalIcon}
          />
        </View>
        <View>
          <Text style={styles.doctorNameTxt} numberOfLines={1}>
            Dr. {user?.name}
          </Text>
          <Text style={styles.doctorSpeTxt} numberOfLines={1}>
            {specialization[0]?.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.doctorVisitDateTxt} numberOfLines={1}>
              {item.date}
            </Text>
            <Text style={styles.doctorVisitDateTxt} numberOfLines={1}>
              {' '}
              .{' '}
            </Text>
            <Text style={styles.doctorVisitDateTxt} numberOfLines={1}>
              {item.day}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Choose your doctor'}
          onPress={() => ShowChooseDoctor(false)}
        />
        <View style={styles.inputStyle}>
          <Icon name={'search'} type={'Feather'} color={'#A9A9A9'} size={25} />
          <TextInput
            style={styles.inputField}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <View>
          <CureOncoFlatList
            data={doctors}
            renderItem={renderDoctors}
            keyExtractor={(item, idx) => item?._id?.toString()}
            style={[styles.fileVerticalList, {marginTop: 10}]}
            ItemSeparatorComponent={<CureOncoListSeparator />}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChooseDoctorScreen;
