import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';
import {Icon, Input, SelectBox} from '../../../../Components';
import NavigationService from '../../../../Navigation/NavigationService';
import appStyles from '../../../../assets/Styles/AppStyles';
import {colors} from '../../../../themes/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '../../../../assets/images';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ErrorTxts, Signup_Screen} from '../../../../Constants/TextConstants';
import {
  UPDATEUSERIMAGE,
  UPDATEUSERPROFILE,
} from '../../../../Service/ProfileService';
import ImagePickerComponent from '../../../../Components/ImagePickerComponent';
import PopUpModalComponent from '../../../../Components/PopUpModalComponent';
import {CAMERA, GALLERY} from '../../../../Config/config';
import ScreenNames from '../../../../Navigation/ScreenNames';
import {CureOncoAvatar} from '../../../../Components/CureOncoAtoms';
import {scaledHeight} from '../../../../utils/Resolution';

const EditProfileScreen = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();

  const {countries = []} = useSelector(state => state?.AuthReducer ?? {});
  const userProfile = useSelector(state => state.ProfileReducer?.userProfile);
  const {medappprofile = {}} = userProfile ?? {};
  const {user = {}, country = '', state = '', phoneNumber = ''} = medappprofile;
  const {name = '', email = ''} = user;

  const [countryStates, setCountryStates] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [showPhotoOption, setShowPhotoOption] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(ErrorTxts.Register_Error.nameError),
    email: yup
      .string()
      .required(ErrorTxts.Register_Error.emailError)
      .email(ErrorTxts.Register_Error.emailValidError),
    country: yup.string().required(ErrorTxts.Register_Error.countryError),
    state: yup.string().required(ErrorTxts.Register_Error.stateError),
    phone: yup
      .string()
      .required(ErrorTxts.Register_Error.phoneError)
      .max(10, ErrorTxts.Register_Error.passwordLongError),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
    reset,
    clearErrors,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    register('name');
    register('email');
    register('phone');
    register('country');
    register('state');
  }, [register]);

  useEffect(() => {
    reset({
      name: '',
      email: '',
      phone: '',
      country: '',
      state: '',
    });
  }, [reset]);

  useEffect(() => {
    const contryState = countries.find(coun => coun.name === country);
    setCountryStates(contryState.states);
    setValue('name', name);
    setValue('email', email);
    setValue('country', country);
    setValue('state', state);
    setValue('phone', phoneNumber.toString().slice(2));
    setPhoneCode(contryState.phone_code);
  }, []);

  const onSubmit = data => {
    updateProfile(data);
  };

  const updateProfile = async data => {
    console.log(data);
    const {name, email, phone, country, state} = data;
    const profile = {name, email, phone, country, state};
    dispatch(UPDATEUSERPROFILE(profile, false));
  };

  const selectedCountry = svalue => {
    if (svalue != null) {
      setCountryStates(svalue.state);
      setPhoneCode(svalue.phoneCode);
      clearErrors('country');
      setValue('country', svalue.country);
      setValue('state', Signup_Screen.screen_01.state_select_placeholder);
    }
  };

  const selectedState = svalue => {
    if (svalue != null) {
      clearErrors('state');
      setValue('state', svalue);
    }
  };

  const UploadProfilePic = async chooseOption => {
    setShowPhotoOption(false);
    const data = await ImagePickerComponent.photos(chooseOption);
    console.log(data);
    const {formData, pickedImage} = data ?? {};
    dispatch(UPDATEUSERIMAGE(formData)).then(response => {
      if (response) {
        NavigationService.navigate(ScreenNames.stackNavigation.UserProfile);
      }
    });
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
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
          <Text style={appStyles.backTitleTxt}>My Profile</Text>
          <TouchableOpacity
            style={styles.editView}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.editTxt}>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <CureOncoAvatar
            user={user}
            size={105}
            styles={[appStyles.profileIcon, {marginTop: scaledHeight(60)}]}
          />
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => setShowPhotoOption(true)}>
            <Icon
              name={'camera'}
              type={'Feather'}
              size={25}
              color={'#737B7D'}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}>
          <Input
            icon={true}
            name={'person'}
            type={'Octicons'}
            size={22}
            value={getValues('name')}
            iconColor={'#9499A6'}
            placeholder={'Enter your user name'}
            onChangeText={text => {
              clearErrors('name');
              setValue('name', text);
            }}
            error={errors.name}
          />
          <Input
            icon={true}
            name={'mail'}
            type={'Feather'}
            size={22}
            value={getValues('email')}
            iconColor={'#9499A6'}
            placeholder={'Enter your email'}
            onChangeText={text => {
              clearErrors('email');
              setValue('email', text);
            }}
            error={errors.email}
          />
          <SelectBox
            selectType="Country"
            selectTitle="Choose Your Country"
            isMandatory={true}
            dataSource={countries}
            icon={true}
            name={'world-o'}
            type={'Fontisto'}
            size={22}
            iconColor={'#9499A6'}
            onSelectedState={selectedCountry}
            stateselected={getValues('country')}
          />
          {state && (
            <SelectBox
              selectType="State"
              selectTitle="Choose Your State"
              isMandatory={true}
              dataSource={countryStates}
              icon={true}
              name={'world-o'}
              type={'Fontisto'}
              size={22}
              iconColor={'#9499A6'}
              onSelectedState={selectedState}
              stateselected={getValues('state')}
              error={errors.state}
            />
          )}
          <Input
            icon={true}
            name={'phone'}
            type={'Feather'}
            size={22}
            value={getValues('phone')}
            mobile={true}
            phone={true}
            mobileCode={phoneCode}
            iconColor={'#9499A6'}
            placeholder={'Enter your phone number'}
            onChangeText={text => {
              clearErrors('phone');
              setValue('phone', text);
            }}
            error={errors.phone}
          />
        </ScrollView>
        <PopUpModalComponent
          visibility={showPhotoOption}
          showPopUpModal={() => setShowPhotoOption(false)}>
          <View>
            <View style={styles.modalView}>
              <Text style={styles.fileUploadTxt}>Choose Option</Text>
              <TouchableOpacity onPress={() => setShowPhotoOption(false)}>
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
                onPress={() => UploadProfilePic(GALLERY)}>
                <Icon
                  name={'photo'}
                  type={'FontAwesome'}
                  color={'#737B7D'}
                  size={25}
                />
                <Text style={styles.modalItemTxt}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalIconView}
                onPress={() => UploadProfilePic(CAMERA)}>
                <Icon
                  name={'camera'}
                  type={'Feather'}
                  color={'#737B7D'}
                  size={25}
                />
                <Text style={styles.modalItemTxt}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopUpModalComponent>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
