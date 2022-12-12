import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../themes/themes';
import {UIActivityIndicator} from 'react-native-indicators';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

const {height, width} = Dimensions.get('screen');

const CureonCoActitivtyIndicator = () => {
  const isAPILoading = state => state.LoaderReducer?.isLoading;

  const isLoading = useSelector(state => isAPILoading(state) || false);

  return isLoading ? (
    <View style={styles.spin}>
      <View style={styles.overlay} />
      <UIActivityIndicator color={colors.loader_color} size={40} />
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  spin: {
    flex: 1,
    position: 'absolute',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: scaledWidth(0),
    top: scaledHeight(0),
    opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    width: width,
    height: height,
  },
});

export default CureonCoActitivtyIndicator;
