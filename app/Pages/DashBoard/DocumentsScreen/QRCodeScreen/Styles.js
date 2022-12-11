import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '../../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../../utils/Resolution';

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
    borderColor: colors.gray,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
});

export default styles;
