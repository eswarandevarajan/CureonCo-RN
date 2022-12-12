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
import {
  CureOncoEmptyComponent,
  CureOncoFlatList,
  CureOncoImage,
  CureOncoListSeparator,
} from '../../../../Components/CureOncoAtoms';
import {colors} from '../../../../themes/themes';
import {useEffect} from 'react';
import {
  GET_FOLDER_NAMES,
  GET_USER_FILES,
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
import ChooseDoctorScreen from './ChooseDoctorScreen';
import {convertCaptilize} from '../../../../utils/Utils';
import { listChange } from './DocumentsUtils';

const FolderDocumentsScreen = props => {
  const {params} = props.route;
  const {folderID, folderName} = params;

  const dispatch = useDispatch();

  const userFiles = useSelector(state => state.ProfileReducer?.userFiles);

  //   const ref = useRef(PagerView);
  const [userFilesList, setUserFilesList] = useState(null);
  const [showChooseDoctor, setShowChooseDoctor] = useState(false);
  const [isShareDoc, setIsShareDoc] = useState(false);
  const [isQRCode, setIsQRCode] = useState(false);
  const [changeVertical, setChangeVertical] = useState(false);
  const [showFileUploadOption, setShowFileUploadOption] = useState(false);
  const [showFileSelected, setShowFileSelected] = useState(false);
  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState([]);

  const prevUserFiles = useRef({userFiles}).current;

  useEffect(() => {
    dispatch(GET_USER_FILES());
  }, [dispatch]);

  useEffect(() => {
    const files = [];
    userFiles.map(item => {
      if (item?.category?._id === folderID) {
        files.push(item);
      }
    });
    setUserFilesList(files);
  }, []);

  useEffect(() => {
    if (prevUserFiles.userFiles.length !== userFiles.length) {
      const files = [];
      userFiles.map(item => {
        if (item?.category?._id === folderID) {
          files.push(item);
        }
      });
      setUserFilesList(files);
    }
  }, [userFiles]);

  console.log('userFilesList', userFilesList);

  // const listChange = () => {
  //   return (
  //     <View style={styles.changeTopView}>
  //       <View style={styles.changeLeftView}>
  //         <Text style={styles.changeNameTxt}>Name</Text>
  //         <Icon
  //           name={'arrowup'}
  //           type={'AntDesign'}
  //           color={'#2B354E'}
  //           size={20}
  //         />
  //       </View>
  //       <TouchableOpacity onPress={() => setChangeVertical(!changeVertical)}>
  //         {changeVertical ? (
  //           <Icon
  //             name={'view-module'}
  //             type={'MaterialCommunityIcons'}
  //             color={'#737B7D'}
  //             size={30}
  //           />
  //         ) : (
  //           <Icon
  //             name={'nav-icon-list-a'}
  //             type={'Fontisto'}
  //             color={'#737B7D'}
  //             size={20}
  //           />
  //         )}
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const onPress = () => {
    setChangeVertical(!changeVertical);
  };

  const selectHeader = () => {
    return (
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
        <Text style={appStyles.backTitleTxt}>{folderName}</Text>
        <TouchableOpacity
          style={styles.selectTouch}
          onPress={() => setShowFileSelected(true)}>
          <Text style={styles.selectTxt}>Select</Text>
          <Icon
            name={'dots-three-horizontal'}
            type={'Entypo'}
            color={'#2B354E'}
            size={15}
            style={styles.selectIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const shareHeader = () => {
    const renderItemTxt = () => {
      return isChecked.length > 0 ? isChecked.length + ' Items' : 'Items';
    };
    return (
      <View style={appStyles.backArrowView}>
        <TouchableOpacity
          style={appStyles.backArrowTouch}
          onPress={() => setShowFileSelected(false)}>
          <Icon name={'close'} type={'AntDesign'} color={'#000'} size={20} />
        </TouchableOpacity>
        <Text style={appStyles.backTitleTxt}>{renderItemTxt()}</Text>
        <View style={styles.selectTouch}>
          <TouchableOpacity
            onPress={() => setShowFileSelected(false)}
            style={styles.shareIcon}>
            <Icon
              name={'share-alt'}
              type={'FontAwesome'}
              color={'#737B7D'}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowFileSelected(true)}>
            <Icon
              name={'delete'}
              type={'AntDesign'}
              color={'#737B7D'}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const showPopUpModal = value => {
    setShowFileUploadOption(value);
  };

  const onCheckChange = item => {
    const checkedIds = [...isChecked];
    const index = checkedIds.indexOf(item._id);
    if (index > -1) {
      checkedIds.splice(index, 1);
    } else {
      checkedIds.push(item._id);
    }
    setIsChecked(checkedIds);
  };

  const listIcon = fileTypes => {
    const checkString = fileType => {
      if (fileTypes.includes(fileType)) {
        return fileTypes;
      }
    };
    switch (fileTypes) {
      case checkString('pdf'):
        return (
          <Icon
            name={'file-pdf-box'}
            type={'MaterialCommunityIcons'}
            size={20}
            color={'#DD2025'}
          />
        );
      case checkString('jpeg'):
      case checkString('jpg'):
      case checkString('png'):
        return (
          <Icon
            name={'image'}
            type={'FontAwesome'}
            size={70}
            color={colors.bg}
          />
        );
      default:
        return (
          <Icon
            name={'file-text-o'}
            type={'FontAwesome'}
            size={70}
            color={colors.bg}
          />
        );
    }
  };

  const renderFiles = ({item}) => {
    if (item?.category?._id === folderID) {
      if (changeVertical) {
        return (
          <TouchableOpacity
            style={styles.fileVerticalIcon}
            onPress={() => onCheckChange(item)}>
            {showFileSelected && (
              <CheckBox
                value={isChecked.includes(item._id)}
                onValueChange={() => onCheckChange(item)}
                style={styles.verticalCheckBox}
                tintColors={{false: colors.black, true: '#004E8B'}}
                boxType={'circle'}
              />
            )}
            {/* {listIcon(item?.fileType)} */}
            <Icon
              name={'file-pdf-box'}
              type={'MaterialCommunityIcons'}
              size={35}
              color={'#DD2025'}
              style={styles.itemVerticalIcon}
            />
            <Text style={styles.fileVerticalText} numberOfLines={1}>
              {convertCaptilize(item.fileName)}
            </Text>
            <TouchableOpacity onPress={() => setShowChooseDoctor(true)}>
              <Icon
                name={'sharealt'}
                type={'AntDesign'}
                color={'#737B7D'}
                size={25}
                style={styles.itemVerticalShare}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          style={styles.fileHorizontalIcon}
          onPress={() => onCheckChange(item)}>
          <CureOncoImage
            style={styles.sampleImage}
            source={images.sampleImage}
          />
          {showFileSelected && (
            <CheckBox
              value={isChecked.includes(item._id)}
              onValueChange={() => onCheckChange(item)}
              style={styles.horizontalCheckBox}
              tintColors={{false: colors.black, true: '#004E8B'}}
              boxType={'circle'}
            />
          )}
          {/* {listIcon(item?.fileType)} */}
          <View style={styles.horizontalBottomView}>
            <Icon
              name={'file-pdf-box'}
              type={'MaterialCommunityIcons'}
              size={25}
              color={'#DD2025'}
              style={styles.itemHorizontalIcon}
            />
            <Text style={styles.fileHorizontalText} numberOfLines={1}>
              {convertCaptilize(item.fileName)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                onCheckChange(item);
                setShowChooseDoctor(true);
              }}>
              <Icon
                name={'share'}
                type={'MaterialCommunityIcons'}
                color={'#737B7D'}
                size={25}
                style={styles.horizontalShareIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const uploadFromDevice = async () => {
    setShowFileUploadOption(false);
    const formData = await ImagePickerComponent.photos(DOCUMENT, folderID);
    dispatch(UPLOAD_FILES(DOCUMENTS.UPLOADFILES, formData)).then(response => {
      if (response) {
        dispatch(GET_USER_FILES());
      }
    });
  };

  const uploadFromCamera = async () => {
    setShowFileUploadOption(false);
    const formData = await ImagePickerComponent.photos(CAMERA);
    dispatch(UPLOAD_FILES(DOCUMENTS.UPLOADFILES, formData)).then(response => {
      if (response) {
        dispatch(GET_USER_FILES());
      }
    });
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        {showFileSelected ? shareHeader() : selectHeader()}
        <View style={styles.inputStyle}>
          <Icon name={'search'} type={'Feather'} color={'#A9A9A9'} size={25} />
          <TextInput
            style={styles.inputField}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        {listChange(changeVertical, onPress)}
        <View>
          <CureOncoFlatList
            key={changeVertical ? '@' : '*'}
            data={userFilesList}
            numColumns={changeVertical ? 1 : 2}
            renderItem={renderFiles}
            keyExtractor={item => item._id.toString()}
            style={
              changeVertical
                ? styles.fileVerticalList
                : styles.fileHorizontalList
            }
            ItemSeparatorComponent={changeVertical && <CureOncoListSeparator />}
            ListEmptyComponent={<CureOncoEmptyComponent text={'No Files'} />}
          />
        </View>

        <FABComponent
          iconName={'upload'}
          iconType={'AntDesign'}
          iconColor={'#737B7D'}
          onPress={() => setShowFileUploadOption(true)}
        />
        <PopUpModalComponent
          visibility={showFileUploadOption}
          showPopUpModal={showPopUpModal}>
          <View>
            <View style={styles.modalView}>
              <Text style={styles.modalUploadTxt}>File Upload</Text>
              <TouchableOpacity onPress={() => setShowFileUploadOption(false)}>
                <Icon
                  name={'close'}
                  type={'AntDesign'}
                  color={'#737B7D'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalIconView}
                onPress={uploadFromDevice}>
                <Icon
                  name={'upload'}
                  type={'AntDesign'}
                  color={'#737B7D'}
                  size={25}
                />
                <Text style={styles.modalItemTxt}>Uplode from Device</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalIconView}
                onPress={uploadFromCamera}>
                <Icon
                  name={'camera'}
                  type={'Feather'}
                  color={'#737B7D'}
                  size={25}
                />
                <Text style={styles.modalItemTxt}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalIconView}
                onPress={() => {
                  setShowFileUploadOption(false);
                  setIsQRCode(true);
                }}>
                <Icon
                  name={'qrcode'}
                  type={'AntDesign'}
                  color={'#737B7D'}
                  size={25}
                />
                <Text style={styles.modalItemTxt}>QR Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopUpModalComponent>
        <ModalComponent
          renderModal={
            <ChooseDoctorScreen
              ShowChooseDoctor={setShowChooseDoctor}
              isChecked={isChecked}
            />
          }
          modalStyle={appStyles.fullModal}
          visibility={showChooseDoctor}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FolderDocumentsScreen;
