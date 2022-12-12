import React from 'react';
import {StyleSheet, View, TextInput, Text, Image} from 'react-native';
import {colors, fonts} from '../themes/themes';
import {scaledHeight, scaledWidth} from '../utils/Resolution';
import Icon from './Icon';

const Input = props => {
  const {
    placeholder = '',
    style,
    multiline,
    defaultValue,
    value,
    editable,
    onChangeText,
    email,
    phone,
    number,
    secureTextEntry,
    maxLength,
    mobile = false,
    mobileCode,
    name,
    type,
    size,
    iconColor,
    icon = false,
    image = false,
    source,
    containerStyle,
    imageStyles,
    error,
  } = props;
  const inputStyles = [styles.textInput, style];
  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <View style={[styles.container, containerStyle, error && styles.error]}>
      <View style={styles.inputView}>
        {icon && (
          <Icon
            name={name}
            color={iconColor}
            size={size}
            style={styles.iconStyle}
            type={type}
          />
        )}
        {image && (
          <Image source={source} style={[styles.imageStyle, imageStyles]} />
        )}
        {mobile && <Text style={styles.placholderTxt}>{mobileCode}</Text>}
        <TextInput
          style={inputStyles}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={'#rgba(43, 53, 78, 0.5)'}
          color={colors.text_color}
          multiline={multiline}
          defaultValue={defaultValue}
          editable={editable}
          keyboardType={inputType}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
      {error && (
        <Text caption medium style={styles.errorTxt}>
          {error?.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 50,
    borderColor: '#D4D4D4',
    borderWidth: 1,
    paddingLeft: scaledWidth(15),
    height: scaledHeight(60),
    marginTop: scaledHeight(25),
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
  },
  error: {
    borderWidth: 1,
    borderColor: '#E7281C',
  },
  errorTxt: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#E7281C',
    marginTop: scaledHeight(5),
  },
  textInput: {
    justifyContent: 'flex-end',
    fontFamily: fonts.regular,
    fontSize: 16,
    flex: 1,
    color: '#122C5C',
    marginLeft: scaledWidth(5),
  },
  placholderTxt: {
    justifyContent: 'flex-end',
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlignVertical: 'center',
    color: '#122C5C',
    marginLeft: scaledWidth(10),
  },
  labelTxt: {
    fontSize: 16,
    paddingTop: 5,
    color: '#7F99BF',
    fontFamily: fonts.r,
  },
  iconStyle: {
    alignSelf: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
  },
  inputView: {
    flexDirection: 'row',
  },
});

export default Input;
