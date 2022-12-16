import {StyleSheet} from 'react-native';
import appStyles from '../../../../assets/Styles/AppStyles';
import {colors, fonts} from '../../../../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../../utils/Resolution';

const styles = StyleSheet.create({
  doctorTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  doctorIconView: {
    marginLeft: scaledWidth(10),
  },
  doctorNameView: {
    flex: 1,
    marginLeft: scaledWidth(10),
  },
  doctorNameTxt: {
    color: '#004E8B',
    fontSize: 19,
    fontFamily: fonts.semi_bold,
  },
  doctorSpeTxt: {
    color: '#3A506B',
    fontSize: 15,
    fontFamily: fonts.semi_bold,
  },
  doctorVisitView: {
    flexDirection: 'row',
  },
  doctorVisitDateTxt: {
    color: '#014E8B',
    fontSize: 11,
    fontFamily: fonts.medium,
  },
  doctorOtpView: {
    flex: 0.5,
    alignItems: 'center',
  },
  doctorOtpImageView: {
    backgroundColor: '#004E8B',
    borderRadius: 100,
    padding: 5,
  },
  doctorOtpTxt: {
    color: '#000000',
    fontSize: 13,
    fontFamily: fonts.regular,
    marginTop: scaledHeight(5),
  },
  doctorOtpNoView: {
    backgroundColor: 'rgba(0, 78, 139, 0.15)',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: scaledHeight(5),
  },
  doctorOtpNotxt: {
    color: '#014E8B',
    fontSize: 11,
    fontFamily: fonts.medium,
  },
  chatBubble: {
    width: convertToDeviceResolution(6),
    height: convertToDeviceResolution(6),
  },
  inputStyle: {
    backgroundColor: '#FEFEFE',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    ...appStyles.boxShadow,
    borderRadius: 25,
    flexDirection: 'row',
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
    paddingLeft: scaledWidth(10),
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
  },
  modalView: {
    flexDirection: 'row',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    marginTop: scaledHeight(15),
    marginBottom: scaledHeight(30),
  },
  modalYesNoView: {
    flexDirection: 'row',
    marginBottom: scaledHeight(30),
  },
  modalNoTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#004E8B',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
  },
  modalYesTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#004E8B',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    backgroundColor: '#004E8B',
  },
  modalNoTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: '#004E8B',
    textAlign: 'center',
    paddingTop: scaledHeight(3),
    paddingBottom: scaledHeight(3),
  },
  modalYesTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'center',
    paddingTop: scaledHeight(10),
    paddingBottom: scaledHeight(10),
  },
  fileUploadTxt: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: '#2B354E',
    flex: 1,
  },
  confirmTxt: {
    marginLeft: scaledWidth(30),
    marginRight: scaledWidth(30),
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(50),
    fontFamily: fonts.semi_bold,
    textAlign: 'center',
    color: '#004E8B',
    fontSize: 19,
  },
  fileVerticalList: {
    marginBottom: scaledHeight(120),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
  },
  fileHorizontalList: {
    marginBottom: scaledHeight(120),
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
  },
  fileVerticalIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: scaledHeight(15),
    paddingBottom: scaledHeight(15),
  },
  verticalCheckBox: {
    alignSelf: 'flex-start',
  },
  itemVerticalIcon: {
    alignSelf: 'center',
    marginLeft: scaledWidth(10),
  },
  fileVerticalText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    flex: 1,
    color: '#2B354E',
    marginLeft: scaledWidth(5),
  },
  itemVerticalShare: {
    marginRight: scaledWidth(20),
  },
  fileHorizontalIcon: {
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(5),
    marginRight: scaledWidth(5),
    flex: 1 / 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  sampleImage: {
    width: '96%',
    height: convertToDeviceResolution(30),
    marginLeft: scaledWidth(2),
    marginTop: scaledHeight(5),
  },
  horizontalCheckBox: {
    marginLeft: scaledWidth(5),
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  itemHorizontalIcon: {
    alignSelf: 'center',
    marginTop: scaledHeight(5),
  },
  horizontalBottomView: {
    flexDirection: 'row',
    paddingTop: scaledHeight(10),
    paddingBottom: scaledWidth(10),
    alignItems: 'center',
    marginLeft: scaledWidth(2),
    marginRight: scaledWidth(2),
  },
  fileHorizontalText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    flex: 1,
    color: '#2B354E',
    marginLeft: scaledWidth(2),
  },
  horizontalShareIcon: {
    // marginRight: scaledWidth(5),
  },
  shareDocList: {
    marginTop: scaledHeight(25),
  },
});

export default styles;
