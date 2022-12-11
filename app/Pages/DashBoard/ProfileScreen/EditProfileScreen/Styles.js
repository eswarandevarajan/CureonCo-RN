import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '../../../../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../../utils/Resolution';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  editView: {
    alignItems: 'center',
    borderBottomColor: '#004E8B',
    borderBottomWidth: 2,
    width: scaledWidth(50),
  },
  editTxt: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#004E8B',
    textAlign: 'center',
  },
  iconView: {
    alignSelf: 'center',
    marginTop: scaledHeight(60),
    width: convertToDeviceResolution(40),
    height: convertToDeviceResolution(40),
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    alignSelf: 'center',
    top: scaledHeight(140),
    left: scaledHeight(230),
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    padding: scaledHeight(7),
  },
  scrollStyle: {
    paddingBottom: scaledHeight(20),
    marginBottom: scaledHeight(10),
    marginLeft: scaledWidth(5),
    marginRight: scaledWidth(5),
    marginTop: scaledHeight(15),
  },
  fileUploadTxt: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: '#2B354E',
    flex: 1,
  },
  modalView: {
    flexDirection: 'row',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    marginTop: scaledHeight(15),
    marginBottom: scaledHeight(30),
  },
  modalIconView: {
    flex: 1,
    alignItems: 'center',
  },
  modalItemTxt: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#2B354E',
    textAlign: 'center',
    marginTop: scaledHeight(10),
  },
});

export default styles;
