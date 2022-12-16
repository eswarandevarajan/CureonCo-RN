import {StyleSheet, Dimensions} from 'react-native';
import appStyles from '../../../assets/Styles/AppStyles';
import {colors, fonts} from '../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
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
    borderBottomColor: '#FFF',
    borderBottomWidth: 5,
  },
  tabTxt: {
    fontSize: 20,
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
  pagerView: {
    flex: 1,
  },
  listView: {
    flex: 1,
    marginBottom: scaledHeight(130),
    marginTop: scaledHeight(10),
    // paddingBottom: scaledHeight(10),
  },
  symptomListScrollView: {
    marginHorizontal: 0,
    marginBottom: scaledHeight(10),
  },
  notesInput: {
    textAlignVertical: 'top',
    height: scaledHeight(100),
    marginRight: scaledWidth(10),
    marginLeft: scaledWidth(10),
    marginBottom: scaledHeight(10),
  },
  symptomSliderContainer: {
    flex: 1,
    flexDirection: 'column',
    marginRight: scaledWidth(10),
    marginLeft: scaledWidth(10),
  },
  symptomsListView: {
    flex: 1,
    flexDirection: 'row',
    ...appStyles.boxShadow,
    borderRadius: 5,
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(5),
    backgroundColor: colors.white,
    marginRight: scaledWidth(10),
    marginLeft: scaledWidth(10),
  },
  listColorView: {
    width: scaledWidth(7),
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  symptomView: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: scaledHeight(10),
    paddingTop: scaledHeight(10),
  },
  symptomTypeTxt: {
    textAlign: 'left',
    color: '#0F0F0F',
    fontSize: 15,
    fontFamily: fonts.regular,
    textTransform: 'capitalize',
    paddingBottom: scaledHeight(10),
    paddingTop: scaledHeight(10),
  },
  symptomTxt: {
    fontSize: 12,
    flex: 1,
    color: '#0F0F0F',
    fontFamily: fonts.regular,
    textAlign: 'left',
    alignSelf: 'stretch',
    textTransform: 'capitalize',
  },
  valueTxt: {
    fontSize: 12,
    flex: 1,
    color: '#0F0F0F',
    fontFamily: fonts.regular,
    textAlign: 'right',
    alignSelf: 'stretch',
    textTransform: 'capitalize',
  },
  sliderThumb: {
    height: scaledHeight(20),
    width: scaledWidth(20),
    borderRadius: 100,
  },
  sliderView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
  },
  dateView: {
    height: scaledHeight(40),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTxt: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: '#0F0F0F',
  },
});

export default styles;
