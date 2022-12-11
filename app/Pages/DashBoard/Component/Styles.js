import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../utils/Resolution';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  listView: {
    height: height - scaledHeight(80),
  },
  postImage: {
    flex: 1,
  },
  postView: {
    height: height - scaledHeight(120),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.bg,
    margin: 10,
    marginRight: scaledWidth(15),
  },
  createGalleryView: {
    margin: 5,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createHastTagTouch: {
    padding: 10,
    alignItems: 'center',
  },
  commentsTxt: {
    fontFamily: fonts.bold,
    fontSize: 18,
    marginLeft: scaledWidth(10),
    marginTop: scaledHeight(10),
    color: colors.text_color,
  },
  commentTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(15),
    color: colors.text_color,
  },
  nameTxt: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text_color,
  },
  userNameTxt: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.dark_gray,
  },
  dateTimeTxt: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.dark_gray,
  },
  avatarConatiner: {
    marginTop: scaledHeight(5),
    marginLeft: scaledWidth(10),
    backgroundColor: colors.gray_bg,
  },
  nameView: {
    marginLeft: scaledWidth(5),
    padding: 10,
    marginTop: scaledHeight(5),
    width: width / 1.28,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  commentNameView: {
    marginLeft: scaledWidth(5),
    padding: 10,
    marginTop: scaledHeight(5),
    width: width / 1.4,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  likeView: {
    flexDirection: 'row',
    marginTop: scaledHeight(10),
    alignItems: 'center',
  },
  likeTxt: {
    marginLeft: scaledWidth(30),
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text_color,
  },
  likeNoTxt: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text_color,
  },
  replyTxt: {
    marginLeft: scaledWidth(10),
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text_color,
  },
  commentInput: {
    borderRadius: 10,
    borderColor: colors.gray,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    backgroundColor: colors.inputFieldbg,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaledHeight(10),
  },
  hastTagTouch: {
    paddingBottom: scaledHeight(10),
    paddingLeft: scaledWidth(10),
    marginLeft: scaledWidth(10),
    alignItems: 'center',
  },
  Modal: {
    marginTop: scaledHeight(0),
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: scaledHeight(40),
  },
  headerContent: {
    marginTop: scaledHeight(0),
  },
  headerBarView: {
    height: scaledHeight(20),
    backgroundColor: colors.white,
    width: width,
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  headerBarViewLine: {
    height: scaledHeight(7),
    marginTop: scaledHeight(1),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray1,
    backgroundColor: colors.bg,
    width: scaledWidth(120),
  },
  image: {
    width: scaledWidth(110),
    height: scaledHeight(120),
    marginTop: scaledHeight(10),
  },
  imageView: {
    width: scaledWidth(120),
    height: scaledHeight(130),
  },
  imageCollectionView: {
    marginTop: scaledHeight(10),
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
  },
  closeTouch: {
    alignSelf: 'flex-end',
    marginBottom: scaledHeight(10),
    position: 'absolute',
  },
  hashTagTouch: {
    alignItems: 'center',
    padding: 8,
    flex: 1 / 3,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: colors.bg,
    margin: 5,
    justifyContent: 'center',
  },
  hashTagTxt: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.white,
  },
  createTxt: {
    textAlignVertical: 'top',
    height: height,
    paddingLeft: scaledWidth(15),
    flex: 0.4,
  },
});

export default styles;
