import { PixelRatio } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const convertToDeviceResolution = (dp) => PixelRatio.getPixelSizeForLayoutSize(dp);

const scale = (size) => {
  const mdpi = size / 3;
  return PixelRatio.get() * mdpi;
};

const scaledHeight = (size) => {
  const isString = `${size}`;
  const index = isString.indexOf('%');
  let heightRatio = 0;
  if (index === -1) {
    heightRatio = (size * 100) / 812;
  } else {
    heightRatio = isString;
  }
  return heightPercentageToDP(`${heightRatio}`);
};

const scaledWidth = (size) => {
  const isString = `${size}`;
  const index = isString.indexOf('%');
  let widthRatio = 0;
  if (index === -1) {
    widthRatio = (size * 100) / 375;
  } else {
    widthRatio = size;
  }
  return widthPercentageToDP(`${widthRatio}`);
};

export { convertToDeviceResolution, scaledWidth, scaledHeight, scale, };