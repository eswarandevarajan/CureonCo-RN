import {StyleSheet, Dimensions} from 'react-native';
import appStyles from '../../../assets/Styles/AppStyles';
import {colors, fonts} from '../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  linkBtn: {
    paddingBottom: scaledHeight(15),
    paddingLeft: scaledWidth(15),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(224, 224, 224, 0.56)',
    marginTop: scaledHeight(15),
    flexDirection: 'row',
    borderTopColor: colors.gray,
  },
  linkTxt: {
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
    fontSize: 17,
    width: width - scaledWidth(145),
    marginLeft: scaledWidth(5),
    textAlignVertical: 'center',
    fontFamily: fonts.semi_bold,
    color: '#0F0F0F',
  },
  subLinkTxt: {
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
    fontSize: 13,
    width: width - scaledWidth(145),
    marginLeft: scaledWidth(5),
    textAlignVertical: 'center',
    fontFamily: fonts.semi_bold,
    color: '#545454',
  },
  callBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaledWidth(15),
  },
  webView: {
    position: 'relative',
    height: '100%',
  },
  titleTxt: {
    fontFamily: fonts.bold,
    color: colors.white,
    backgroundColor: '#004E8B',
    paddingTop: scaledHeight(20),
    paddingBottom: scaledHeight(20),
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  listViewStyle: {
    marginTop: scaledHeight(80),
    height: height / 1.12,
    position: 'absolute',
    width: '100%',
  },
  listStyle: {
    marginTop: scaledHeight(20),
    marginBottom: scaledHeight(20),
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
  renderTopView: {
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
  },
  imageTxtView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  linkImage: {
    width: scaledWidth(60),
    height: scaledHeight(65),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkImageTxt: {
    fontFamily: fonts.medium,
    fontSize: 25,
  },
  inputField: {
    flex: 1,
  },
});

export default styles;
