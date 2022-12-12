import React from 'react';
import {
  Text, // Renders text
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {ErrorTxts} from '../../../Constants/TextConstants';
import appStyles from '../../../assets/Styles/AppStyles';
import {Button, Icon, Input} from '../../../Components';
import ScreenNames from '../../../Navigation/ScreenNames';
import NavigationService from '../../../Navigation/NavigationService';
import {fonts} from '../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';
import AuthHeaderComponent from '../Component/AuthHeaderComponent';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {FORGETPASSWORD, VERIFY_ACCESSCODE} from '../../../Service/AuthService';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';

let emailID = '';

const CELL_COUNT = 4;

const {height} = Dimensions.get('window');

const ChangePasswordScreen = () => {
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [showNewPasswordScreen, setShowNewPasswordScreen] = useState(false);
  const [OTPCode, setOTPCode] = useState('');
  return (
    <SafeAreaView style={appStyles.appContainer}>
      {!showOTPScreen && !showNewPasswordScreen && (
        <ForgotPasswordScreen setShowOTPScreen={setShowOTPScreen} />
      )}
      {showOTPScreen && (
        <OTPScreen
          setShowNewPasswordScreen={setShowNewPasswordScreen}
          setOTPCode={setOTPCode}
          setShowOTPScreen={setShowOTPScreen}
        />
      )}
      {showNewPasswordScreen && <NewPasswordScreen OTPCode={OTPCode} />}
    </SafeAreaView>
  );
};

const ForgotPasswordScreen = props => {
  const {setShowOTPScreen} = props;
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(ErrorTxts.Login_Error.emailError)
      .email(ErrorTxts.Login_Error.emailValidError),
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
  }, [register]);

  useEffect(() => {
    reset({
      email: '',
    });
  }, [reset]);

  const onSubmit = data => {
    sendOTP(data);
  };

  const sendOTP = async data => {
    const {email} = data ?? {};
    dispatch(FORGETPASSWORD({email})).then(response => {
      if (response) {
        emailID = email;
        setShowOTPScreen(true);
      }
    });
  };
  return (
    <SafeAreaView style={appStyles.appContainer}>
      <AuthHeaderComponent
        title={'Forget Password'}
        subTitle={'Please enter email to recover account'}
      />
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
      <View style={styles.bottomView}>
        <Button btnLabel={'Send'} btnPress={handleSubmit(onSubmit)} />
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(ScreenNames.stackNavigation.Login)
          }>
          <Text style={styles.backTxt}>Back to LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const OTPScreen = props => {
  const {setShowNewPasswordScreen, setOTPCode, setShowOTPScreen} = props;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <SafeAreaView style={appStyles.appContainer}>
      <AuthHeaderComponent
        title={'Enter OTP'}
        subTitle={'Please enter OTP sent to your mail'}
      />
      <Text style={styles.mailTxt}>{emailID}</Text>
      <CodeField
        ref={ref}
        {...cellProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={styles.bottomView}>
        <Button
          btnLabel={'Send'}
          btnPress={() => {
            setOTPCode(value);
            setShowNewPasswordScreen(true);
            setShowOTPScreen(false);
          }}
        />
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(ScreenNames.stackNavigation.Login)
          }>
          <Text style={styles.backTxt}>Back to LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const NewPasswordScreen = props => {
  const {OTPCode} = props;
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const schema = yup.object().shape({
    password: yup
      .string()
      // .matches(
      //   '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$',
      //   'at least one letter, one number and one special character:',
      // )
      .required(ErrorTxts.Login_Error.passwordError)
      .min(6, ErrorTxts.Login_Error.passwordShortError)
      .max(32, ErrorTxts.Login_Error.passwordLongError),
    confirmPassword: yup
      .string()
      // .matches(
      //   '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$',
      //   'at least one letter, one number and one special character:',
      // )
      .required(ErrorTxts.Login_Error.confirmPasswordError)
      .min(6, ErrorTxts.Login_Error.passwordShortError)
      .max(32, ErrorTxts.Login_Error.passwordLongError),
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
    register('password');
    register('confirmPassword');
  }, [register]);

  useEffect(() => {
    reset({
      password: '',
      confirmPassword: '',
    });
  }, [reset]);

  const onSubmit = data => {
    onUpdatePassword(data);
  };

  const onUpdatePassword = async data => {
    const {password} = data ?? {};
    const updateData = {
      email: emailID,
      accessCode: OTPCode,
      password,
    };
    dispatch(VERIFY_ACCESSCODE(updateData)).then(response => {
      if (response) {
        NavigationService.navigate(ScreenNames.stackNavigation.Login);
      }
    });
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <AuthHeaderComponent
        title={'Create New Password'}
        subTitle={'Enter the new password'}
      />
      <View>
        <Input
          icon={true}
          name={'key'}
          type={'Fontisto'}
          size={22}
          value={getValues('password')}
          secureTextEntry={showPassword}
          iconColor={'#9499A6'}
          placeholder={'Enter new password'}
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
          value={getValues('confirmPassword')}
          secureTextEntry={showConfirmPassword}
          iconColor={'#9499A6'}
          placeholder={'Renter your new password'}
          onChangeText={text => {
            clearErrors('confirmPassword');
            setValue('confirmPassword', text);
          }}
          error={errors.confirmPassword}
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

      <View style={styles.bottomPaawordView}>
        <Button btnLabel={'Send'} btnPress={handleSubmit(onSubmit)} />
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate(ScreenNames.stackNavigation.Login)
          }>
          <Text style={styles.backTxt}>Back to LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    bottom: scaledHeight(30),
    marginLeft: scaledWidth(20),
    marginTop: height / 3.3,
  },
  bottomPaawordView: {
    bottom: scaledHeight(30),
    marginLeft: scaledWidth(20),
    marginTop: height / 5,
  },
  backTxt: {
    textAlign: 'center',
    color: '#2B354E',
    fontSize: 15,
    marginTop: scaledHeight(25),
    fontFamily: fonts.regular,
  },
  mailTxt: {
    marginLeft: scaledWidth(15),
    marginTop: scaledHeight(5),
    color: '#004E8B',
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  root: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    marginTop: scaledHeight(20),
    marginLeft: scaledWidth(65),
    marginRight: scaledWidth(70),
  },
  cell: {
    width: scaledWidth(50),
    height: scaledHeight(50),
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.17)',
    textAlign: 'center',
    color: '#004E8B',
    paddingTop: scaledHeight(5),
  },
  focusCell: {
    borderColor: 'rgba(0, 0, 0, 0.17)',
  },
});

export default ChangePasswordScreen;
