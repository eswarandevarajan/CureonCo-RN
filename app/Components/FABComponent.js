import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from './Icon';
import {colors} from '../themes/themes';

import {scaledHeight, scaledWidth} from '../utils/Resolution';

const {height} = Dimensions.get('window');

const FABComponent = props => {
  const {iconName, onPress, iconType, iconColor, size = 20} = props;
  return (
    <TouchableOpacity style={styles.fabStyles} onPress={onPress}>
      <Icon name={iconName} type={iconType} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  fabStyles: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: colors.white,
    right: scaledWidth(25),
    width: scaledWidth(50),
    height: scaledHeight(54),
    borderRadius: 100,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    top: height / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FABComponent;
