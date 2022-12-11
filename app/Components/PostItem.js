import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from './Icon';
import FbGrid from 'react-native-fb-image-grid';
import {ReadMoreText} from './ReadMoreText';
import {colors, fonts} from '../themes/themes';
import {Dash_Board} from '../Constants/TextConstants';
import TimeFormat from './TimeFormat';
import {
  convertToDeviceResolution,
  scaledHeight,
  scaledWidth,
} from '../utils/Resolution';
import {useDispatch} from 'react-redux';
import {FOLLOW_USER} from '../Service/ProfileService';
import {CureOncoAvatar, CureOncoImage} from './CureOncoAtoms';
import appStyles from '../assets/Styles/AppStyles';
import images from '../assets/images';

export const PostItem = props => {
  const {post, actionPress, commentPress, showPostImageViewer, removeHugs} =
    props;
  const [showActions, setShowActions] = useState(false);
  const [postImages, setPostImages] = useState(false);
  const {
    createdBy = {},
    createdOn = '',
    media = [],
    hugs = [],
    likes = [],
    care = [],
    postText = '',
    comments = [],
  } = post;

  const noOfIconsCount = hugs.length + likes.length + care.length;

  const imagesArray = [];

  const dispatch = useDispatch();

  useEffect(() => {
    media.map((item, index) => {
      imagesArray.push(item.cloudStoragePublicUrl);
    });
    setPostImages(imagesArray);
  }, []);

  const getCommentText = () => {
    return comments.length > 1
      ? Dash_Board.post.postItemCommentsTxt
      : Dash_Board.post.postItemCommentTxt;
  };

  const getLikeText = () => {
    return comments.length > 1
      ? Dash_Board.post.postItemLikesTxt
      : Dash_Board.post.postItemLikeTxt;
  };

  const followUser = id => {
    dispatch(FOLLOW_USER(id));
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemView}>
        <CureOncoAvatar
          user={createdBy}
          size={40}
          styles={appStyles.profileIcon}
        />
        <View style={styles.nameView}>
          <Text style={styles.nameTxt}>{createdBy?.name}</Text>
          {createdBy?.username && (
            <Text style={styles.userNameTxt}>@{createdBy?.username}</Text>
          )}
        </View>
        <View style={styles.followersView}>
          <TouchableOpacity
            style={styles.followersIcon}
            onPress={() => followUser(createdBy?.id)}>
            <Text style={styles.followTxt}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ReadMoreText text={postText} />
      <FbGrid
        style={styles.imageView}
        images={postImages}
        onPress={() => {
          let image = [];
          postImages.map(res => {
            let data = {
              url: res,
            };
            image.push(data);
          });
          showPostImageViewer(image);
        }}
      />
      <View style={styles.iconsViews}>
        {showActions && (
          <View style={styles.absoluteView}>
            <TouchableOpacity
              style={styles.absoluteTouch}
              onPress={() => {
                actionPress(post._id, 'likes');
              }}>
              <View style={styles.leftLikeTouch}>
                <Icon
                  name={'thumbs-up'}
                  type={'Feather'}
                  size={17}
                  style
                  color={colors.white}
                />
              </View>
              <Text style={styles.touchTxt}>
                {Dash_Board.post.postItemLikeTxt}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.absoluteTouch}
              onPress={() => {
                actionPress(post._id, 'hugs');
              }}>
              <View style={styles.rightHugTouch}>
                <Icon
                  name={'heart'}
                  type={'FontAwesome5'}
                  size={17}
                  color={colors.white}
                />
              </View>
              <Text style={styles.touchTxt}>
                {Dash_Board.post.postItemHugTxt}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.absoluteTouch}
              onPress={() => {
                actionPress(post._id, 'care');
              }}>
              <View style={styles.leftCareTouch}>
                <CureOncoImage
                  source={images.careIcon}
                  style={{
                    height: convertToDeviceResolution(6),
                    width: convertToDeviceResolution(6),
                  }}
                />
              </View>
              <Text style={styles.touchTxt}>
                {Dash_Board.post.postItemCareTxt}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.iconsLeftViews}>
          <TouchableOpacity
            style={styles.leftLikeTouch}
            onLongPress={() => setShowActions(true)}>
            {/* onPress={() => {
              setLikePressed(!likePressed);
              actionPress(post._id, 'likes');
            }}> */}
            <Icon
              name={'thumbs-up'}
              type={'Feather'}
              size={17}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.leftChatTouch} onPress={() => {}}>
            <Icon
              name={'chatbox-outline'}
              type={'Ionicons'}
              size={28}
              color={'#737B7D'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconsRightViews}>
          {noOfIconsCount > 0 && (
            <View>
              {hugs.length > 0 && (
                <View style={styles.rightHugTouch}>
                  <Icon
                    name={'heart'}
                    type={'FontAwesome5'}
                    size={17}
                    color={colors.white}
                  />
                </View>
              )}

              {likes.length > 0 && (
                <View
                  style={[
                    styles.rightLikeTouch,
                    hugs.length > 0
                      ? {right: scaledWidth(15)}
                      : {right: scaledWidth(0)},
                  ]}>
                  <Icon
                    name={'thumbs-up'}
                    type={'Feather'}
                    size={17}
                    color={colors.white}
                  />
                </View>
              )}
              {care.length > 0 && (
                <View
                  style={[
                    styles.rightCareTouch,
                    hugs.length > 0
                      ? {right: scaledWidth(30)}
                      : {right: scaledWidth(0)},
                  ]}>
                  <CureOncoImage
                    source={images.careIcon}
                    style={{
                      height: convertToDeviceResolution(6),
                      width: convertToDeviceResolution(6),
                    }}
                  />
                </View>
              )}
            </View>
          )}

          {noOfIconsCount > 0 && (
            <Text style={styles.noOfCommentTxt}>
              {' '}
              {noOfIconsCount} {getLikeText()}
            </Text>
          )}
          {noOfIconsCount > 0 && comments.length > 0 && (
            <Text style={styles.dotTxt}>{'\u2B24'}</Text>
          )}
          {comments.length > 0 && (
            <Text style={styles.noOfCommentTxt}>
              {' '}
              {comments.length} {getCommentText()}
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.dateTimeTxt}>{TimeFormat.formatTime(createdOn)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    marginTop: scaledHeight(5),
    marginBottom: scaledHeight(10),
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
    borderRadius: 2,
  },
  listItemView: {
    flexDirection: 'row',
  },
  avatarConatiner: {
    marginTop: scaledHeight(5),
    marginLeft: scaledWidth(10),
    backgroundColor: colors.gray_bg,
  },
  nameView: {
    marginLeft: scaledWidth(10),
    marginTop: scaledHeight(5),
  },
  imageView: {
    height: scaledHeight(200),
    borderRadius: 10,
    marginTop: scaledHeight(10),
  },
  dividerView: {
    backgroundColor: colors.gray1,
    marginTop: scaledHeight(5),
    marginLeft: scaledWidth(10),
    marginRight: scaledWidth(10),
  },
  iconsViews: {
    flexDirection: 'row',
    paddingBottom: scaledHeight(10),
    paddingTop: scaledHeight(10),
    paddingLeft: scaledWidth(5),
    paddingRight: scaledWidth(5),
  },
  iconsRightViews: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconsLeftViews: {
    flexDirection: 'row',
    flex: 0.5,
  },
  leftLikeTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004E8B',
    borderRadius: 100,
    width: convertToDeviceResolution(10),
    height: convertToDeviceResolution(10),
  },
  leftCareTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8500',
    borderRadius: 100,
    width: convertToDeviceResolution(10),
    height: convertToDeviceResolution(10),
  },
  leftChatTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scaledWidth(5),
  },
  rightHugTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DF394C',
    borderRadius: 100,
    width: convertToDeviceResolution(10),
    height: convertToDeviceResolution(10),
  },
  rightLikeTouch: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004E8B',
    borderRadius: 100,
    width: convertToDeviceResolution(10),
    height: convertToDeviceResolution(10),
  },
  rightCareTouch: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8500',
    borderRadius: 100,
    width: convertToDeviceResolution(10),
    height: convertToDeviceResolution(10),
  },
  nameTxt: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: '#0F0F0F',
  },
  userNameTxt: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: '#0F0F0F',
  },
  dateTimeTxt: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: '#004E8B',
    marginLeft: scaledWidth(5),
  },
  followTxt: {
    fontFamily: fonts.semi_bold,
    fontSize: 13,
    color: '#004E8B',
  },
  absoluteView: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 25,
    position: 'absolute',
    bottom: 45,
    ...appStyles.boxShadow,
  },
  absoluteTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scaledWidth(5),
  },
  touchTxt: {
    fontFamily: fonts.medium,
    fontSize: 12,
    marginLeft: scaledWidth(5),
    marginRight: scaledWidth(5),
    color: '#004E8B',
  },
  commentsTouch: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: scaledWidth(15),
    alignItems: 'center',
  },
  noOficonsViews: {
    flexDirection: 'row',
    paddingBottom: scaledHeight(5),
    paddingTop: scaledHeight(5),
  },
  noOfIconTxt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    marginLeft: scaledWidth(5),
  },
  noOfCommentTxt: {
    textAlignVertical: 'center',
    marginRight: scaledWidth(5),
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#004E8B',
  },
  dotTxt: {
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: 8,
    color: '#004E8B',
  },
  followersIcon: {
    marginRight: scaledWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  followersView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
