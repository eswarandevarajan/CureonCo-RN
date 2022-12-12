import {StyleSheet} from 'react-native';
import appStyles from '../../../../assets/Styles/AppStyles';
import {colors, fonts} from '../../../../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../../../utils/Resolution';

const styles = StyleSheet.create({
  //FolderStyles
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
  selectedTabTouch: {
    borderBottomColor: '#004E8B',
    borderBottomWidth: 5,
    borderRadius: 5,
  },
  selectedTabTxt: {
    color: '#004E8B',
  },
  pagerView: {
    flex: 1,
  },
  documentsView: {
    flex: 1,
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
    marginBottom: scaledHeight(130),
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
  folderHorizontalIcon: {
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
  folderImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: convertToDeviceResolution(20),
    height: convertToDeviceResolution(20),
    marginTop: scaledHeight(10),
  },
  folderVerticalText: {
    marginLeft: scaledWidth(10),
    textAlignVertical: 'center',
    fontSize: 14,
    fontFamily: fonts.semi_bold,
    color: '#2B354E',
  },
  folderHorizontalText: {
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(5),
    marginBottom: scaledWidth(10),
    fontSize: 14,
    fontFamily: fonts.semi_bold,
    color: '#2B354E',
  },
  //FilesStyles
  selectTouch: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  shareIcon: {
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
    backgroundColor: 'red',
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
  modalView: {
    flexDirection: 'row',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    marginTop: scaledHeight(15),
    marginBottom: scaledHeight(30),
  },
  modalUploadTxt: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: '#2B354E',
    flex: 1,
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
  doctorsList: {
    marginTop: scaledHeight(10),
  },
});

export default styles;
