import {StyleSheet, Dimensions} from 'react-native';
import appStyles from '../../../../assets/Styles/AppStyles';
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
    marginRight: scaledWidth(15),
    borderBottomColor: '#004E8B',
    borderBottomWidth: 2,
    width: scaledWidth(80),
  },
  editTxt: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#004E8B',
    textAlign: 'center',
  },
  profileView: {
    marginLeft: scaledWidth(15),
    flexDirection: 'row',
    marginTop: scaledHeight(20),
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 15,
    marginLeft: scaledWidth(8),
    color: '#0F0F0F',
    fontFamily: fonts.semi_bold,
  },
  emailTxt: {
    fontSize: 14,
    marginLeft: scaledWidth(8),
    color: '#0F0F0F',
    fontFamily: fonts.regular,
  },
  topView: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(0, 0, 0, 0.14)',
    borderBottomWidth: 1,
    height: scaledHeight(60),
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    alignItems: 'flex-end',
  },
  tabTouch: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: 'rgba(0, 0, 0, 0.14)',
    borderBottomWidth: 1,
  },
  tabTxt: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontFamily: fonts.bold,
    marginBottom: scaledWidth(10),
  },
  selectedTab: {
    borderBottomColor: '#004E8B',
    borderBottomWidth: 5,
    borderRadius: 5,
  },
  selectedTxt: {
    color: '#004E8B',
  },
  followersView: {
    marginTop: scaledHeight(5),
    flexDirection: 'row',
    marginLeft: scaledWidth(8),
  },
  followTouch: {
    flexDirection: 'row',
  },
  followingCount: {
    fontSize: 16,
    color: '#0F0F0F',
    fontFamily: fonts.semi_bold,
  },
  followersCount: {
    fontSize: 16,
    color: '#0F0F0F',
    fontFamily: fonts.semi_bold,
    marginLeft: scaledWidth(15),
  },
  followingTxt: {
    fontSize: 16,
    color: '#0F0F0F',
    fontFamily: fonts.semi_bold,
    marginLeft: scaledWidth(5),
  },
  pagerView: {
    flex: 1,
  },
  folderIcon: {
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(5),
    marginRight: scaledWidth(5),
    flex: 1 / 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  folderVerticalIcon: {
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(5),
    marginRight: scaledWidth(5),
    flexDirection: 'row',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  folderVerticalText: {
    marginLeft: scaledWidth(10),
    textAlignVertical: 'center',
    fontSize: 14,
    fontFamily: fonts.semi_bold,
    color: '#2B354E',
  },
  folderImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: convertToDeviceResolution(20),
    height: convertToDeviceResolution(20),
    marginTop: scaledHeight(10),
  },
  folderText: {
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(5),
    marginBottom: scaledWidth(10),
    fontSize: 14,
    fontFamily: fonts.semi_bold,
    color: '#2B354E',
  },
  changeTopView: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  changeLeftView: {
    flex: 1,
    flexDirection: 'row',
  },
  changeNameTxt: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: '#2B354E',
    marginRight: scaledWidth(5),
  },
  folderList: {
    marginBottom: scaledHeight(120),
  },
  fileVerticalList: {
    marginBottom: scaledHeight(120),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
  },
  fileList: {
    marginBottom: scaledHeight(120),
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
  },
  selectIcon: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2B354E',
    paddingLeft: scaledWidth(3),
    paddingRight: scaledWidth(3),
    paddingTop: scaledHeight(3),
    paddingBottom: scaledHeight(3),
    alignSelf: 'center',
  },
  selectTxt: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginRight: scaledWidth(5),
  },
  selectTouch: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flex: 1,
  },
  shareIcon: {
    marginRight: scaledWidth(10),
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
  fileIcon: {
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
  fileVerticalIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: scaledHeight(15),
    paddingBottom: scaledHeight(15),
  },
  checkBox: {
    alignSelf: 'flex-start',
  },
  verticalCheckBox: {
    marginLeft: scaledWidth(5),
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  fileText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    flex: 1,
    color: '#2B354E',
    marginLeft: scaledWidth(2),
  },
  fileVerticalText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    flex: 1,
    color: '#2B354E',
    marginLeft: scaledWidth(5),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemTxt: {
    marginLeft: scaledWidth(10),
    color: colors.text_color,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  itemSep: {
    height: scaledHeight(1),
    width: '94%',
    marginLeft: scaledWidth(10),
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
  },
  itemShareIcon: {
    marginRight: scaledWidth(20),
  },
  itemIcon: {
    alignSelf: 'center',
    marginTop: scaledHeight(5),
  },
  itemVerticalIcon: {
    alignSelf: 'center',
    marginLeft: scaledWidth(10),
  },
  chatBubble: {
    width: convertToDeviceResolution(6),
    height: convertToDeviceResolution(6),
  },
  bottomView: {
    flexDirection: 'row',
    paddingTop: scaledHeight(10),
    paddingBottom: scaledWidth(10),
    alignItems: 'center',
    marginLeft: scaledWidth(2),
    marginRight: scaledWidth(2),
  },
  verticalShareIcon: {
    marginRight: scaledWidth(5),
  },
  QRCode: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.white,
  },
  topContentTxt: {
    flex: 1,
    fontSize: 18,
    marginTop: scaledHeight(25),
    fontFamily: fonts.bold,
    color: colors.white,
  },
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
  doctorVisitDateTxt: {
    color: '#014E8B',
    fontSize: 11,
    fontFamily: fonts.medium,
    // textAlign: 'center',
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
    // textAlign: 'center',
  },
  sampleImage: {
    width: '96%',
    height: convertToDeviceResolution(30),
    marginLeft: scaledWidth(2),
    marginTop: scaledHeight(5),
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
});

export default styles;
