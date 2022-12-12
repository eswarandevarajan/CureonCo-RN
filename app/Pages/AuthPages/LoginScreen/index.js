import React, {useEffect} from 'react';
import {
  Text, // Renders text
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  NativeModules,
} from 'react-native';
import {ErrorTxts, Login_Screen} from '../../../Constants/TextConstants';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import ReactNativeBiometrics from 'react-native-biometrics';
import appStyles from '../../../assets/Styles/AppStyles';
import {Button, Icon, Input} from '../../../Components';
import ScreenNames from '../../../Navigation/ScreenNames';
import NavigationService from '../../../Navigation/NavigationService';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../utils/Resolution';
import images from '../../../assets/images';
import {CureOncoImage} from '../../../Components/CureOncoAtoms';
import AuthHeaderComponent from '../Component/AuthHeaderComponent';
import {useState} from 'react';
import {FACEBOOK, NATIVE, TWITTER} from '../../../Constants/CommonConstants';
import AppUtils from '../../../utils/AppUtils';
import {fonts} from '../../../themes/themes';
import {useDispatch} from 'react-redux';
import {LOGIN} from '../../../Service/AuthService';
import {isSensorAvailable} from '../../../utils/Utils';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import Config from 'react-native-config';

const {TW_CONSUMER_KEY, TW_CONSUMER_SECRET} = Config;

const {RNTwitterSignIn} = NativeModules;

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(ErrorTxts.Login_Error.emailError)
      .email(ErrorTxts.Login_Error.emailValidError),
    password: yup
      .string()
      // .matches(
      //   '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$',
      //   'at least one letter, one number and one special character:',
      // )
      .min(6, ErrorTxts.Login_Error.passwordShortError)
      .max(32, ErrorTxts.Login_Error.passwordLongError)
      .required(ErrorTxts.Login_Error.passwordError),
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
    register('email');
    register('password');
  }, [register]);

  useEffect(() => {
    reset({
      email: '',
      password: '',
    });
  }, [reset]);

  const onSubmit = data => {
    loginPress(data);
  };

  const loginPress = async data => {
    const {email, password} = data ?? {};
    const fcm_Token = await AppUtils.getFCMToken();
    const loginData = {
      email: email,
      password: password,
      registrationType: NATIVE,
      fcmToken: fcm_Token,
    };
    dispatch(LOGIN(loginData));
  };

  const loginBiometrics = async () => {
    const biometryTypes = await isSensorAvailable();
    if (biometryTypes.available) {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm fingerprint'})
        .then(resultObject => {
          const {success} = resultObject;
          if (success) {
            console.log('successful biometrics provided');
          } else {
            console.log('user cancelled biometric prompt');
          }
        })
        .catch(() => {
          console.log('biometrics failed');
        });
    }
  };

  const gmailLogin = async () => {
    const loginData = await AppUtils.googleSign();
    dispatch(LOGIN(loginData));
  };

  const facebookLogin = async () => {
    let result;
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    } else {
      LoginManager.setLoginBehavior('NATIVE_ONLY');
    }
    result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    // handle the case that users clicks cancel button in Login view
    if (result.isCancelled) {
    } else {
      // Create a graph request asking for user information
      FBGraphRequest('id, name, email, picture.type(large)', FBLoginCallback);
    }
  };

  const FBLoginCallback = async (error, result) => {
    if (error) {
    } else {
      this.setState({picture: result.picture.data.url});
      console.log('result:', result);
      const fcm_Token = await AppUtils.getFCMToken();
      const loginData = {
        // idToken: this.state.fb_accessToken ?? '',
        registrationType: FACEBOOK,
        fcmToken: fcm_Token,
      };
      // this.props.socialLogin(loginData);
    }
  };
  const FBGraphRequest = async (fields, callback) => {
    const accessData = await AccessToken.getCurrentAccessToken();
    // Create a graph request asking for user information
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessData.accessToken,
        parameters: {
          fields: {
            string: fields,
          },
        },
      },
      callback.bind(this),
    );
    // Execute the graph request created above
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const twitterLogin = async () => {
    RNTwitterSignIn.init(TW_CONSUMER_KEY, TW_CONSUMER_SECRET);
    const fcm_Token = await AppUtils.getFCMToken();
    RNTwitterSignIn.logIn()
      .then(loginData => {
        const {authToken, authTokenSecret} = loginData;
        if (authToken && authTokenSecret) {
          let data = {
            oauthAccessToken: loginData.authToken,
            oauthAccessTokenSecret: loginData.authTokenSecret,
            registrationType: TWITTER,
            fcmToken: fcm_Token,
          };
          console.log('twitter-logindata', loginData);
          // this.props.socialLogin(data);
        }
      })
      .catch(error => {
        console.log('error===>', error);
      });
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <AuthHeaderComponent
        title={'Login'}
        subTitle={'Please signIn to your account'}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <Input
          icon={true}
          name={'mail'}
          type={'Feather'}
          size={22}
          value={getValues('email')}
          iconColor={'#9499A6'}
          placeholder={'Enter your email ID'}
          onChangeText={text => {
            clearErrors('email');
            setValue('email', text);
          }}
          error={errors.email}
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
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(
              ScreenNames.stackNavigation.ChangePassword,
            );
          }}>
          <Text style={styles.forgotPwdTxt}>Forget Password ?</Text>
        </TouchableOpacity>

        <Button
          btnLabel={Login_Screen.login_btn_txt}
          btnPress={handleSubmit(onSubmit)}
        />
        <View style={styles.signUpView}>
          <Text style={styles.signupTxt1}>Don’t have account?</Text>
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate(ScreenNames.stackNavigation.Signup)
            }>
            <Text style={styles.signupTxt2}> SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ORTopView}>
          <View style={styles.ORView} />
          <Text style={styles.ORtxt}>or</Text>
          <View style={styles.ORView} />
        </View>
        <View style={styles.socialView}>
          <TouchableOpacity style={styles.socialBtn} onPress={facebookLogin}>
            <Icon
              size={25}
              name="facebook"
              type={'FontAwesome'}
              color={'#4267B2'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={gmailLogin}>
            <CureOncoImage
              source={images.googleIcon}
              style={styles.googleImage}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} onPress={twitterLogin}>
            <Icon
              size={25}
              name="logo-twitter"
              type={'Ionicons'}
              color={'#1DA1F2'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={loginBiometrics}>
          <Text style={styles.fingerTxt}>Unlock finger print</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPwdTxt: {
    color: '#E7281C',
    fontSize: 16,
    textAlign: 'right',
    marginRight: scaledWidth(20),
    marginTop: scaledHeight(25),
    fontFamily: fonts.regular,
  },
  signUpView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaledHeight(20),
  },
  signupTxt1: {
    textAlign: 'center',
    color: '#2B354E',
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  signupTxt2: {
    color: '#004E8B',
    fontSize: 15,
    marginLeft: scaledWidth(1),
    fontFamily: fonts.regular,
  },
  ORtxt: {
    width: scaledWidth(40),
    color: '#9C9D9F',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
  ORView: {
    flex: 1,
    height: scaledHeight(1),
    backgroundColor: '#E2E2E2',
  },
  ORTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaledHeight(30),
    marginLeft: scaledWidth(30),
    marginRight: scaledWidth(30),
  },
  socialView: {
    flexDirection: 'row',
  },
  socialBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1,
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
    height: scaledHeight(50),
    marginTop: scaledHeight(20),
  },
  fingerTxt: {
    textAlign: 'center',
    color: '#2B354E',
    fontSize: 15,
    marginTop: scaledHeight(35),
    marginBottom: scaledHeight(30),
    fontFamily: fonts.regular,
  },
  googleImage: {
    alignSelf: 'center',
    width: convertToDeviceResolution(9),
    height: convertToDeviceResolution(9),
  },
});

export default LoginScreen;
