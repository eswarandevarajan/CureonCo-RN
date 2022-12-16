import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '../../../../Components';
import appStyles from '../../../../assets/Styles/AppStyles';
import styles from './Styles';
import images from '../../../../assets/images';
import {BackHeaderComponent} from '../../../../Components/HeaderComponent';
import {
  CureOncoAvatar,
  CureOncoFlatList,
  CureOncoListSeparator,
} from '../../../../Components/CureOncoAtoms';
import {useEffect} from 'react';
import {GET_DOCTORS, SHARE_FILES} from '../../../../Service/ProfileService';

const ChooseDoctorScreen = props => {
  const {ShowChooseDoctor, isChecked} = props;
  const dispatch = useDispatch();
  const doctors = useSelector(state => state.ProfileReducer?.doctors);

  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(GET_DOCTORS());
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      dispatch(GET_DOCTORS());
    }
  }, [isFetching, dispatch]);

  const onRefreshCall = () => {
    setIsFetching(true);
  };

  const renderDoctors = ({item}) => {
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
        <View style={styles.doctorIconView}>
          <CureOncoAvatar
            user={user}
            size={50}
            styles={appStyles.profileIcon}
          />
        </View>
        <View style={styles.doctorVisitView}>
          <Text style={styles.doctorNameTxt} numberOfLines={1}>
            Dr. {user?.name}
          </Text>
          <Text style={styles.doctorSpeTxt} numberOfLines={1}>
            {specialization[0]?.title} Specialist
          </Text>
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
            placeholder={'Search'}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <View>
          <CureOncoFlatList
            data={doctors}
            renderItem={renderDoctors}
            keyExtractor={(item, idx) => item?._id?.toString()}
            style={[styles.fileVerticalList, styles.doctorsList]}
            ItemSeparatorComponent={<CureOncoListSeparator />}
            onRefresh={onRefreshCall}
            refreshing={isFetching}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChooseDoctorScreen;
