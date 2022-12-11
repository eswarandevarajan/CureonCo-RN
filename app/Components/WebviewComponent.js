import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from './Icon';
import {colors, fonts} from '../themes/themes';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

const WebviewComponent = props => {
  const {link, onNavigationStateChange, onClosePress, title} = props;
  return (
    <View style={styles.topView}>
      <View style={styles.titleView}>
        <TouchableOpacity style={styles.leftIcon} onPress={onClosePress()}>
          <Icon
            name={'arrowleft'}
            type={'AntDesign'}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.titleTxt}>{title}</Text>
        <TouchableOpacity style={styles.rightIcon} onPress={onClosePress()}>
          <Icon
            name={'close'}
            type={'Ionicons'}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <WebView
        style={{marginTop: scaledHeight(10)}}
        source={link}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        cacheEnabled={false}
        startInLoadingState={true}
        onNavigationStateChange={navState => {
          onNavigationStateChange(navState);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleTxt: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.white,
  },
  leftIcon: {
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: scaledWidth(20),
  },
  rightIcon: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: scaledWidth(20),
  },
  titleView: {
    flexDirection: 'row',
    marginTop: scaledHeight(10),
  },
  topView: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});

export default WebviewComponent;
