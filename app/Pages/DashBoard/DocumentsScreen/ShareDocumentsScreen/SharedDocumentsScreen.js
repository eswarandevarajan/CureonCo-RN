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
import {Button, Icon} from '../../../../Components';
import NavigationService from '../../../../Navigation/NavigationService';
import appStyles from '../../../../assets/Styles/AppStyles';
import ScreenNames from '../../../../Navigation/ScreenNames';
import {FOLLOWERS, FOLLOWING} from '../../../../Constants/CommonConstants';
import PagerView from 'react-native-pager-view';
import styles from './Styles';
import images from '../../../../assets/images';
import {BackHeaderComponent} from '../../../../Components/HeaderComponent';
import {
  CureOncoEmptyComponent,
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
  REMOVE_SHARED_DOCUMENT,
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
import {convertCaptilize} from '../../../../utils/Utils';

const fileNames = [
  {
    category: {
      _id: '62611b772909780704d3cc23',
    },
    _id: '62611b772909780704d3cd23',
    fileName: 'Surgen Note',
  },
  {
    category: {
      _id: '62611b772909780704d3cc23',
    },
    _id: '62611b772909780704d3md23',
    fileName: 'Surgen Note',
  },
  {
    category: {
      _id: '62611b772909780704d3cc23',
    },
    _id: '62611b772909780704d3vd23',
    fileName: 'Surgen Note',
  },
  {
    category: {
      _id: '62611b772909780704d3cc23',
    },
    _id: '62611b772909780704d3rd23',
    fileName: 'Surgen Note',
  },
  {
    category: {
      _id: '62611b772909780704d3cc23',
    },
    _id: '62611b772909780704d3wd23',
    fileName: 'Surgen Note',
  },
];

const SharedDocumentsScreen = props => {
  const {ShowSharedDocument, selectedDoctor} = props;
  const {filesShared = [], to = {}, _id = ''} = selectedDoctor ?? {};
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [changeVertical, setChangeVertical] = useState(true);
  const [showRemoveFiles, setShowRemoveFiles] = useState(false);

  const renderFiles = ({item, index}) => {
    if (changeVertical) {
      return (
        <TouchableOpacity style={styles.fileVerticalIcon}>
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
          <TouchableOpacity
            onPress={() => {
              ShowSharedDocument(false);
              dispatch(
                REMOVE_SHARED_DOCUMENT({
                  shareId: _id,
                  fileId: item?._id,
                }),
              );
            }}>
            <Icon
              name={'delete'}
              type={'AntDesign'}
              color={'#737B7D'}
              size={25}
              style={styles.itemShareIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.fileIcon}>
        <CureOncoImage style={styles.sampleImage} source={images.sampleImage} />
        {/* {listIcon(item?.fileType)} */}
        <View style={styles.bottomView}>
          <Icon
            name={'file-pdf-box'}
            type={'MaterialCommunityIcons'}
            size={25}
            color={'#DD2025'}
            style={styles.itemIcon}
          />
          <Text style={styles.fileText} numberOfLines={1}>
            {convertCaptilize(item.fileName)}
          </Text>
          <TouchableOpacity>
            <Icon
              name={'delete'}
              type={'AntDesign'}
              color={'#737B7D'}
              size={20}
              style={styles.verticalShareIcon}
            />
          </TouchableOpacity>
        </View>
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

  const showPopUpModal = value => {
    setShowRemoveFiles(value);
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          title={'Dr ' + to?.name}
          onPress={() => ShowSharedDocument(false)}
        />
        <View style={styles.inputStyle}>
          <Icon name={'search'} type={'Feather'} color={'#A9A9A9'} size={25} />
          <TextInput
            style={styles.inputField}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        {listChange()}
        <View>
          <CureOncoFlatList
            key={changeVertical ? '_' : '#'}
            data={filesShared}
            numColumns={changeVertical ? 1 : 2}
            renderItem={renderFiles}
            keyExtractor={(item, idx) => item._id.toString()}
            style={changeVertical ? styles.fileVerticalList : styles.fileList}
            ItemSeparatorComponent={changeVertical && <CureOncoListSeparator />}
            ListEmptyComponent={
              <CureOncoEmptyComponent text={'No Shared Files'} />
            }
          />
        </View>
        {filesShared.length > 0 && (
          <Button
            btnLabel={'REMOVE ALL FILES'}
            btnPress={() => setShowRemoveFiles(true)}
          />
        )}

        <PopUpModalComponent
          visibility={showRemoveFiles}
          showPopUpModal={showPopUpModal}>
          <View>
            <View style={styles.modalView}>
              <Text style={styles.fileUploadTxt}>Remove All Files</Text>
              <TouchableOpacity onPress={() => setShowRemoveFiles(false)}>
                <Icon
                  name={'close'}
                  type={'AntDesign'}
                  color={'#737B7D'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.confirmTxt}>
              Confirm do you want tp Remove all File for DR. {to?.name}
            </Text>
            <View style={styles.modalYesNoView}>
              <TouchableOpacity style={styles.modalNoTouch}>
                <Text style={styles.modalNoTxt}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalYesTouch}>
                <Text style={styles.modalYesTxt}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopUpModalComponent>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SharedDocumentsScreen;
