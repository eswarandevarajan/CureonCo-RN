import React from 'react';
import {
  Text, // Renders text
  View,
  StyleSheet,
} from 'react-native';
import {fonts} from '../../../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../utils/Resolution';
import images from '../../../assets/images';
import {CureOncoImage} from '../../../Components/CureOncoAtoms';

const AuthHeaderComponent = props => {
  const {title, subTitle} = props;
  return (
    <View>
      <View style={styles.imageView}>
        <CureOncoImage source={images.banner} style={styles.bannerImage} />
      </View>
      <Text style={styles.titleTxt}>{title}</Text>
      <Text style={styles.subTitleTxt}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    backgroundColor: 'rgba(0, 78, 139, 0.08)',
    borderBottomRightRadius: 106,
    paddingBottom: scaledHeight(10),
  },
  bannerImage: {
    alignSelf: 'center',
    width: convertToDeviceResolution(60),
    height: convertToDeviceResolution(60),
  },
  titleTxt: {
    color: '#004E8B',
    fontSize: 30,
    marginTop: scaledHeight(20),
    marginLeft: scaledWidth(20),
    fontFamily: fonts.medium,
  },
  subTitleTxt: {
    color: '#2B354E',
    fontSize: 18,
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(20),
    fontFamily: fonts.regular,
    paddingBottom: scaledHeight(10),
  },
});

export default AuthHeaderComponent;
