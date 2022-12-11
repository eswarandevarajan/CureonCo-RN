import {StyleSheet, Dimensions} from 'react-native';
import appStyles from '../../../assets/Styles/AppStyles';
import {colors, fonts} from '../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    ...appStyles.boxShadow,
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
    paddingLeft: scaledWidth(15),
    paddingRight: scaledWidth(15),
    paddingBottom: scaledWidth(15),
    backgroundColor: '#FEFEFE',
  },
  topicView: {
    flexDirection: 'row',
    marginTop: scaledHeight(10),
  },
  itemTopicTxt: {
    flex: 1,
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.semi_bold,
  },
  itemHourTxt: {
    flex: 1,
    color: colors.black,
    fontSize: 12,
    fontFamily: fonts.regular,
    textAlign: 'right',
    marginRight: 10,
  },
  listItemTitle: {
    color: '#545454',
    fontSize: 15,
    width: width / 1.55,
    marginRight: scaledWidth(5),
    fontFamily: fonts.medium,
  },
  listItemDesc: {
    color: '#747D8C',
    fontSize: 12,
    marginRight: scaledWidth(5),
    marginTop: scaledHeight(10),
    fontFamily: fonts.semi_bold,
  },
  webView: {
    position: 'relative',
    height: '100%',
  },
  linkTxt: {
    textDecorationLine: 'underline',
    color: colors.blue,
    marginTop: scaledHeight(5),
  },
  listIcon: {
    width: scaledWidth(70),
    height: scaledHeight(70),
    marginRight: scaledWidth(10),
  },
  listStyle: {
    marginTop: scaledHeight(70),
    height: height / 1.12,
    position: 'absolute',
    width: '100%',
  },
});

export default styles;
