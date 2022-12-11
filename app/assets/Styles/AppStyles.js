import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '../../themes/themes';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../../utils/Resolution';

const {width, height} = Dimensions.get('window');

const appStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  appImageContainer: {
    width: width,
    height: scaledHeight(933),
  },
  boxShadow: {
    elevation: 10,
    shadowColor: colors.arrowShadow,
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fullModal: {
    margin: 0,
    width: '100%',
    height: '100%',
  },
  headerView: {
    flex: 1,
  },
  fromHomeStyle: {
    marginBottom: scaledHeight(20),
  },
  fromNonHomeStyle: {
    marginBottom: scaledHeight(80),
  },
  headerTxt: {
    alignSelf: 'center',
    fontSize: 35,
    fontFamily: fonts.bold,
    color: '#DF2E4A',
  },
  headerSubTxt: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#122C5C',
    marginBottom: scaledHeight(10),
  },
  scrollStyle: {
    paddingBottom: scaledHeight(25),
  },
  scrollContainerStyle: {
    flexGrow: 1,
  },
  pwdIconVisibility: {
    position: 'absolute',
    top: scaledHeight(35),
    right: scaledWidth(15),
    height: scaledHeight(50),
    width: scaledWidth(50),
    padding: 5,
  },
  pwdIcon: {
    color: '#CED6E3',
    fontSize: 25,
  },
  submitBtn: {
    backgroundColor: '#1F75FF',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    marginTop: scaledHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scaledHeight(15),
    paddingBottom: scaledHeight(15),
    borderRadius: 8,
    marginBottom: scaledHeight(25),
    elevation: 10,
    shadowColor: colors.arrowShadow,
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  submitBtnTxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: fonts.medium,
  },
  arrowTouch: {
    borderRadius: 100,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 10,
    shadowColor: colors.arrowShadow,
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: scaledWidth(15),
    marginTop: scaledHeight(15),
  },
  backContainer: {
    backgroundColor: 'rgba(0, 78, 139, 0.08)',
    borderBottomRightRadius: 106,
    height: convertToDeviceResolution(65),
  },
  backHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    flex: 1,
    fontFamily: fonts.regular,
    color: '#2B354E',
    fontWeight: '400',
    marginLeft: scaledWidth(15),
    marginTop: scaledHeight(10),
  },
  backArrowView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaledHeight(15),
    paddingBottom: scaledHeight(15),
    marginLeft: scaledWidth(20),
    marginRight: scaledWidth(20),
  },
  backArrowTouch: {
    borderRadius: 100,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 10,
    shadowColor: colors.arrowShadow,
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backTitleTxt: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#2B354E',
    fontWeight: '400',
    marginLeft: scaledWidth(15),
    flex: 1,
    textAlignVertical: 'center',
  },
  profileIcon: {
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaledWidth(2),
  },
  menuView: {
    flexDirection: 'row',
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(15),
  },
  menuTouch: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  bellTouch: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: scaledWidth(10),
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  menuTxt: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fonts.regular,
    fontSize: 18,
    color: '#2B354E',
  },
});

export default appStyles;
