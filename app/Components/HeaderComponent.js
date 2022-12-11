import React from 'react';
import {
  Text, // Renders text
  View,
  TouchableOpacity,
} from 'react-native';
import {Icon} from './index';
import appStyles from '../assets/Styles/AppStyles';

export const BackHeaderComponent = props => {
  const {title = '', onPress} = props;
  return (
    <View style={appStyles.backArrowView}>
      <TouchableOpacity style={appStyles.backArrowTouch} onPress={onPress}>
        <Icon
          name={'keyboard-arrow-left'}
          type={'MaterialIcons'}
          color={'#000'}
          size={30}
        />
      </TouchableOpacity>
      <Text style={appStyles.backTitleTxt}>{title}</Text>
    </View>
  );
};

export const MenuHeaderComponent = props => {
  const {title = '', menuOnPress, bellOnPress} = props;
  return (
    <View style={appStyles.menuView}>
      <TouchableOpacity style={appStyles.menuTouch} onPress={menuOnPress}>
        <Icon
          name={'graph-horizontal'}
          type={'Foundation'}
          size={25}
          color={'#0F0F0F'}
        />
      </TouchableOpacity>
      <Text style={appStyles.menuTxt}>{title}</Text>
      <TouchableOpacity style={appStyles.bellTouch} onPress={bellOnPress}>
        <Icon
          name={'bell-o'}
          type={'FontAwesome'}
          size={25}
          color={'#0F0F0F'}
        />
      </TouchableOpacity>
    </View>
  );
};

