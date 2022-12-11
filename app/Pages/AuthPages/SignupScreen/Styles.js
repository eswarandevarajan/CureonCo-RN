import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '../../../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../utils/Resolution';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  imageBackgroundContent: {
    width: width,
    height: height,
  },
  roleContainer: {
    flex: 1,
  },
  roleHeaderView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#D4D4D4',
    paddingTop: scaledHeight(3),
    paddingBottom: scaledHeight(3),
    paddingLeft: scaledWidth(3),
    paddingRight: scaledWidth(3),
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  selectedRoleTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#004E8B',
    alignItems: 'center',
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  roleImage: {
    width: convertToDeviceResolution(8),
    height: convertToDeviceResolution(8),
    alignItems: 'center',
  },
  roleTxt: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: '#2B354E',
    fontSize: 13,
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
  },
  selectedRoleTxt: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: 13,
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
  },
  detailsTxt: {
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
    marginTop: scaledHeight(10),
    fontFamily: fonts.regular,
    color: '#2B354E',
    fontSize: 18,
  },
  roleScrollView: {
    height: height / 1.7,
  },
  roleIcon: {
    color: '#2B354E',
    paddingTop: scaledHeight(2),
    paddingBottom: scaledHeight(2),
    width: convertToDeviceResolution(8),
    height: convertToDeviceResolution(8),
    alignItems: 'center',
  },
  selectedRoleIcon: {
    color: colors.white,
    paddingTop: scaledHeight(2),
    paddingBottom: scaledHeight(2),
    width: convertToDeviceResolution(8),
    height: convertToDeviceResolution(8),
    alignItems: 'center',
  },
  entrolledTopView: {
    marginTop: scaledHeight(10),
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
  },
  entrolledView: {
    textAlign: 'right',
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  entrolledTxt: {
    fontSize: 18,
    color: colors.text_color,
    fontFamily: fonts.semiBold,
    flex: 1,
    marginTop: scaledHeight(15),
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.text_color,
    fontSize: 18,
    paddingRight: scaledWidth(10),
    textTransform: 'capitalize',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
  },
  multilineInput: {
    height: scaledHeight(200),
    textAlignVertical: 'top',
  },
  multilineInputContainer: {
    borderRadius: 10,
    marginRight: scaledWidth(25),
  },
  titleTxt: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: colors.text_color,
    fontSize: 22,
    marginBottom: scaledHeight(15),
  },
  subTitleTxt: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: colors.text_color,
    fontSize: 18,
    marginBottom: scaledHeight(15),
  },
  modalView: {
    backgroundColor: 'white',
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    borderColor: colors.bg,
  },
  signupView: {
    height: height / 1.63,
  },
  scrollContainer: {
    paddingBottom: scaledHeight(10),
  },
  confirmTxt: {
    fontFamily: fonts.semi_bold,
    marginRight: scaledWidth(20),
    paddingRight: scaledWidth(10),
    fontSize: 16,
    color: '#2B354E',
  },
  termsTxt: {
    color: '#033DA9',
    fontFamily: fonts.semi_bold,
    textDecorationLine: 'underline',
    textDecorationColor: '#33D1FF',
  },
  privacyTxt: {
    color: '#004E8B',
    fontFamily: fonts.semi_bold,
    textDecorationLine: 'underline',
    textDecorationColor: '#33D1FF',
  },
  cancerImage: {
    width: convertToDeviceResolution(9),
    height: convertToDeviceResolution(9),
  },
  markerImage: {
    width: convertToDeviceResolution(5),
    height: convertToDeviceResolution(12),
    marginLeft: scaledWidth(5),
  },
  stageImage: {
    width: convertToDeviceResolution(10),
    height: convertToDeviceResolution(8),
  },
});

export default styles;
