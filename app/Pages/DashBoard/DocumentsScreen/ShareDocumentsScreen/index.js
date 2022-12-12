import React, {useState} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import appStyles from '../../../../assets/Styles/AppStyles';
import styles from './Styles';
import images from '../../../../assets/images';
import {
  CureOncoFlatList,
  CureOncoImage,
  CureOncoListSeparator,
  CureOncoAvatar,
  CureOncoEmptyComponent,
} from '../../../../Components/CureOncoAtoms';
import {TimeFormat} from '../../../../Components';
import {useEffect} from 'react';
import {GET_USER_SHAREDFILES} from '../../../../Service/ProfileService';
import ModalComponent from '../../../../Components/ModalComponent';
import SharedDocumentsScreen from './SharedDocumentsScreen';

const ShareDocumentsScreen = props => {
  const {ShowChooseDoctor} = props;
  
  const dispatch = useDispatch();
  const userSharedFiles = useSelector(
    state => state.ProfileReducer?.userSharedFiles,
  );

  const [showSharedDocument, setShowSharedDocument] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(GET_USER_SHAREDFILES());
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_USER_SHAREDFILES());
    }
  }, [isFetching, dispatch]);

  const renderDoctors = ({item, index}) => {
    const {password, filesShared = [], to = {}, createdOn} = item ?? {};
    return (
      <TouchableOpacity
        style={styles.doctorTouch}
        onPress={() => {
          setSelectedDoctor(item);
          setShowSharedDocument(true);
        }}>
        <View style={styles.doctorIconView}>
          <CureOncoAvatar user={to} size={50} styles={appStyles.profileIcon} />
        </View>
        <View style={styles.doctorNameView}>
          <Text style={styles.doctorNameTxt} numberOfLines={1}>
            Dr. {to?.name}
          </Text>
          <Text style={styles.doctorSpeTxt} numberOfLines={1}>
            {to?.type}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.doctorVisitDateTxt} numberOfLines={1}>
              {TimeFormat.formatToDay(item?.createdOn)}
            </Text>
            <Text style={styles.doctorVisitDateTxt} numberOfLines={1}>
              {item?.day}
            </Text>
          </View>
        </View>
        <View style={styles.doctorOtpView}>
          <View style={styles.doctorOtpImageView}>
            <CureOncoImage
              style={styles.chatBubble}
              source={images.chatBubble}
            />
          </View>

          <Text style={styles.doctorOtpTxt} numberOfLines={1}>
            OTP
          </Text>
          <View style={styles.doctorOtpNoView}>
            <Text style={styles.doctorOtpNotxt} numberOfLines={1}>
              {password}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  return (
    <SafeAreaView>
      <CureOncoFlatList
        data={userSharedFiles}
        renderItem={renderDoctors}
        keyExtractor={(item, idx) => item?._id?.toString()}
        style={[styles.fileVerticalList, {marginTop: 30, borderWidth: 1}]}
        ItemSeparatorComponent={<CureOncoListSeparator />}
        initialNumToRender={10}
        onRefresh={onRefreshCall}
        refreshing={isFetching}
        ListEmptyComponent={
          <CureOncoEmptyComponent text={'No Shared Documents'} />
        }
      />
      <ModalComponent
        renderModal={
          <SharedDocumentsScreen
            ShowSharedDocument={setShowSharedDocument}
            selectedDoctor={selectedDoctor}
          />
        }
        modalStyle={appStyles.fullModal}
        visibility={showSharedDocument}
      />
    </SafeAreaView>
  );
};

export default ShareDocumentsScreen;
