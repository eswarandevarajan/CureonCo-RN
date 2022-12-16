import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Icon} from '../../../../Components';
import appStyles from '../../../../assets/Styles/AppStyles';
import styles from './Styles';
import images from '../../../../assets/images';
import {BackHeaderComponent} from '../../../../Components/HeaderComponent';
import {
  CureOncoEmptyComponent,
  CureOncoFlatList,
  CureOncoImage,
  CureOncoListSeparator,
} from '../../../../Components/CureOncoAtoms';
import {REMOVE_SHARED_DOCUMENT} from '../../../../Service/ProfileService';
import PopUpModalComponent from '../../../../Components/PopUpModalComponent';
import {convertCaptilize} from '../../../../utils/Utils';
import {listChange} from '../MyDocumentsScreen/DocumentsUtils';

const SharedDocumentsScreen = props => {
  const {ShowSharedDocument, selectedDoctor} = props;
  const {filesShared = [], to = {}, _id = ''} = selectedDoctor ?? {};
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [changeVertical, setChangeVertical] = useState(true);
  const [showRemoveFiles, setShowRemoveFiles] = useState(false);

  const renderFiles = ({item}) => {
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
      <TouchableOpacity style={styles.fileHorizontalIcon}>
        <CureOncoImage style={styles.sampleImage} source={images.sampleImage} />
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
        </View>
      </TouchableOpacity>
    );
  };

  const onPress = () => {
    setChangeVertical(!changeVertical);
  };

  const showPopUpModal = value => {
    setShowRemoveFiles(value);
  };
  const filesListStyles = () => {
    if (changeVertical) {
      return filesShared.length === 0
        ? [styles.fileVerticalList, {borderWidth: 0}]
        : styles.fileVerticalList;
    }
    return styles.fileHorizontalList;
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
        {listChange(changeVertical, onPress)}
        <View>
          <CureOncoFlatList
            key={changeVertical ? '_' : '#'}
            data={filesShared}
            numColumns={changeVertical ? 1 : 2}
            renderItem={renderFiles}
            keyExtractor={item => item._id.toString()}
            style={filesListStyles()}
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
