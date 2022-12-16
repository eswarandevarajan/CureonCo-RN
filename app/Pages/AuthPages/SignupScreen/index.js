import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  Choose_Login_Screen,
  ErrorTxts,
  Signup_Screen,
} from '../../../Constants/TextConstants';
import {Button, Icon, Input, SelectBox} from '../../../Components';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';
import {colors, fonts} from '../../../themes/themes';
import appStyles from '../../../assets/Styles/AppStyles';
import NavigationService from '../../../Navigation/NavigationService';
import ScreenNames from '../../../Navigation/ScreenNames';
import {useDispatch, useSelector} from 'react-redux';
import {SIGNUP} from '../../../Service/AuthService';
import images from '../../../assets/images';
import {BackHeaderComponent} from '../../../Components/HeaderComponent';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import PopUpModalComponent from '../../../Components/PopUpModalComponent';
import {CureOncoImage} from '../../../Components/CureOncoAtoms';

const {height} = Dimensions.get('window');

const SignupScreen = () => {
  const {countries = []} = useSelector(state => state?.AuthReducer ?? {});
  const dispatch = useDispatch();

  const [countryStates, setCountryStates] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [touchSwitch, setTouchSwitch] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showRegiterSuccess, setShowRegiterSuccess] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required(ErrorTxts.UserType_Error.firstNameError),
    lastName: yup.string().required(ErrorTxts.UserType_Error.lastNameError),
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
    password: yup
      .string()
      .required(ErrorTxts.Register_Error.passwordError)
      .min(6, ErrorTxts.Register_Error.passwordShortError)
      .max(32, ErrorTxts.Register_Error.passwordLongError),
    confirmpassword: yup
      .string()
      .required(ErrorTxts.Register_Error.confirmPasswordError)
      .min(6, ErrorTxts.Register_Error.passwordShortError)
      .max(32, ErrorTxts.Register_Error.passwordLongError),
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
    register('firstName');
    register('lastName');
    register('email');
    register('phone');
    register('country');
    register('state');
    register('password');
    register('confirmpassword');
  }, [register]);

  useEffect(() => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      password: '',
      confirmpassword: '',
    });
  }, [reset]);

  const onSubmit = data => {
    onRegister(data);
  };

  const enableTouchID = async count => {
    setTouchSwitch(count);
  };

  const selectedCountry = svalue => {
    if (svalue != null) {
      setCountryStates(svalue.state);
      setPhoneCode(svalue.phoneCode);
      clearErrors('country');
      setValue('country', svalue.country);
    }
  };

  const selectedState = svalue => {
    if (svalue != null) {
      clearErrors('state');
      setValue('state', svalue);
    }
  };

  const onRegister = async data => {
    const {
      password,
      confirmpassword,
      phone,
      state,
      country,
      email,
      firstName,
      lastName,
    } = data ?? {};
    if (password === confirmpassword) {
      let registerData = {
        firstName,
        lastName,
        email,
        country,
        state,
        phoneNumber: phoneCode + phone,
        password: password,
      };
      dispatch(SIGNUP(registerData)).then(response => {
        if (response) {
          setShowRegiterSuccess(response);
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <BackHeaderComponent
          onPress={() =>
            NavigationService.navigate(ScreenNames.stackNavigation.Login)
          }
        />
        <Text style={styles.signUpTxt}>{Choose_Login_Screen.signup_txt}</Text>
        <Text style={styles.detailsTxt}>Please enter your details</Text>
        <View style={styles.scrollViewStyle}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            style={styles.scrollStyle}>
            <Input
              icon={true}
              name={'person'}
              type={'Octicons'}
              size={22}
              value={getValues('firstName')}
              iconColor={'#9499A6'}
              placeholder={Signup_Screen.screen_02.firstname_input_placeholder}
              onChangeText={text => {
                clearErrors('firstName');
                setValue('firstName', text);
              }}
              error={errors.firstName}
            />
            <Input
              icon={true}
              name={'person'}
              type={'Octicons'}
              size={22}
              value={getValues('lastName')}
              iconColor={'#9499A6'}
              placeholder={Signup_Screen.screen_02.lastname_input_placeholder}
              editable={true}
              onChangeText={text => {
                clearErrors('lastName');
                setValue('lastName', text);
              }}
              error={errors.lastName}
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
              stateselected={Signup_Screen.screen_01.country_select_placeholder}
              error={errors.country}
            />
            {countryStates.length > 0 && (
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
                stateselected={Signup_Screen.screen_01.state_select_placeholder}
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
            <View>
              <Input
                icon={true}
                name={'key'}
                type={'Fontisto'}
                size={22}
                value={getValues('password')}
                iconColor={'#9499A6'}
                secureTextEntry={showPassword}
                placeholder={'Enter your password'}
                onChangeText={text => {
                  clearErrors('password');
                  setValue('password', text);
                }}
                error={errors.password}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={appStyles.pwdIconVisibility}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  type={'FontAwesome'}
                  style={appStyles.pwdIcon}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Input
                icon={true}
                name={'key'}
                type={'Fontisto'}
                size={22}
                value={getValues('confirmpassword')}
                iconColor={'#9499A6'}
                secureTextEntry={showConfirmPassword}
                placeholder={'Re-Enter your password'}
                onChangeText={text => {
                  clearErrors('confirmpassword');
                  setValue('confirmpassword', text);
                }}
                error={errors.confirmpassword}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={appStyles.pwdIconVisibility}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? 'eye-slash' : 'eye'}
                  type={'FontAwesome'}
                  style={appStyles.pwdIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.enabelTouchView}>
              <Text style={[styles.entrolledTxt]}>
                {Signup_Screen.screen_01.touchID_txt}
              </Text>
              <View style={styles.entrolledView}>
                <Text style={[styles.textStyle]}>
                  {touchSwitch ? 'Yes' : 'No'}
                </Text>
                <Switch
                  trackColor={{false: colors.gray, true: '#004E8B'}}
                  thumbColor={'#FFF'}
                  ios_backgroundColor="#3e3e3e"
                  value={touchSwitch}
                  onValueChange={count => enableTouchID(count)}
                />
              </View>
            </View>
            <Button
              btnLabel={Signup_Screen.screen_01.signup_txt}
              btnPress={handleSubmit(onSubmit)}
              style={styles.btnStyle}
            />
          </ScrollView>
        </View>
        <PopUpModalComponent
          visibility={showRegiterSuccess}
          showPopUpModal={() => setShowRegiterSuccess(false)}>
          <View>
            <CureOncoImage
              source={images.registerSuccess}
              style={styles.modalImage}
            />
            <Text style={styles.confirmTxt}>
              Thankyou for Signing UP Enjoy the Services
            </Text>
            <TouchableOpacity
              style={styles.modalYesTouch}
              onPress={() => {
                setShowRegiterSuccess(false);
                NavigationService.navigate(ScreenNames.stackNavigation.Login);
              }}>
              <Text style={styles.modalYesTxt}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </PopUpModalComponent>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subContainer: {
    position: 'absolute',
  },
  signUpTxt: {
    color: '#004E8B',
    fontSize: 28,
    marginTop: scaledHeight(15),
    marginLeft: scaledWidth(20),
    fontFamily: fonts.semi_bold,
  },
  detailsTxt: {
    color: '#2B354E',
    fontSize: 16,
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(20),
    fontFamily: fonts.regular,
  },
  scrollViewStyle: {
    height: height / 1.25,
  },
  scrollStyle: {
    paddingBottom: scaledHeight(20),
    marginBottom: scaledHeight(10),
  },
  enabelTouchView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: scaledHeight(30),
    alignItems: 'center',
  },
  entrolledView: {
    textAlign: 'right',
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: scaledWidth(15),
  },
  entrolledTxt: {
    fontSize: 18,
    color: '#2B354E',
    fontFamily: fonts.regular,
    flex: 1,
    marginLeft: scaledWidth(20),
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.text_color,
    fontSize: 18,
    paddingRight: scaledWidth(10),
    textTransform: 'capitalize',
  },
  btnStyle: {
    marginBottom: scaledHeight(20),
  },

  confirmTxt: {
    marginLeft: scaledWidth(30),
    marginRight: scaledWidth(30),
    marginTop: scaledHeight(30),
    marginBottom: scaledHeight(30),
    fontFamily: fonts.semi_bold,
    textAlign: 'center',
    color: '#004E8B',
    fontSize: 19,
  },
  modalYesTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#004E8B',
    backgroundColor: '#004E8B',
    alignSelf: 'center',
    paddingLeft: scaledHeight(100),
    paddingRight: scaledHeight(100),
    marginBottom: scaledHeight(15),
  },
  modalYesTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    paddingTop: scaledHeight(10),
    paddingBottom: scaledHeight(10),
  },
  modalView: {
    alignItems: 'flex-end',
    marginRight: scaledWidth(25),
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(30),
  },
  modalImage: {
    width: scaledWidth(180),
    height: scaledHeight(190),
    alignSelf: 'center',
    marginTop: scaledHeight(10),
  },
});

export default SignupScreen;
