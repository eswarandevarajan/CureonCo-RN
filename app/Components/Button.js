import React, {Component} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';
import {colors, fonts} from '../themes/themes';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

const {width} = Dimensions.get('window');

const Button = props => {
  const {style, txtStyle, btnLabel, btnPress} = props;
  const buttonStyles = [styles.button, style];

  const textStyles = [styles.text, txtStyle];

  return (
    <TouchableOpacity style={buttonStyles} onPress={btnPress}>
      <Text style={textStyles}>{btnLabel}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width - scaledWidth(40),
    marginTop: scaledHeight(25),
    borderRadius: 50,
    paddingTop: scaledHeight(10),
    paddingBottom: scaledHeight(10),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#004E8B',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
});

export default Button;
