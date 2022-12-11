import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import PostImageViewer from '../../../Components/PostImageViewer';
import {useDispatch, useSelector} from 'react-redux';
import {PostItem} from '../../../Components/PostItem';
import NavigationService from '../../../Navigation/NavigationService';
import FABComponent from '../../../Components/FABComponent';
import styles from './Styles';
import {
  GET_ALLFEEDS,
  GET_POST_COMMENTS,
  POST_ACTION,
} from '../../../Service/MenuService';
import {
  CureOncoFlatList,
  CureOncoListSeparator,
} from '../../../Components/CureOncoAtoms';
import appStyles from '../../../assets/Styles/AppStyles';

const {height, width} = Dimensions.get('window');

const ForumComponent = props => {
  const {posts, removeHugs, style, onRefreshCall, isRefresh = false} = props;
  console.log(posts);
  const [commentModal, setCommentModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [showPostImage, setShowPostImage] = useState(false);
  const [selectedPost, setSelectedPost] = useState('');
  const [postImages, setPostImages] = useState(null);

  const dispatch = useDispatch();

  const renderItem = ({item, index}) => {
    return (
      <PostItem
        key={index}
        post={item}
        removeHugs={removeHugs}
        actionPress={postActionPress}
        commentPress={postCommentPress}
        showPostImageViewer={showPostImageViewer}
      />
    );
  };

  const postActionPress = async (id, action) => {
    const post = {
      postaction: action,
      postid: id,
    };
    dispatch(POST_ACTION(id, post, removeHugs));
  };

  const postCommentPress = async (id, post) => {
    dispatch(GET_POST_COMMENTS(id));
    // setAnimateModal(true);
    setCommentModal(true);
    setSelectedPost(post);
  };

  const showPostImageViewer = images => {
    setShowPostImage(true);
    setPostImages(images);
  };

  const keyExtractor = (item, id) => id.toString();

  return (
    <View>
      <CureOncoFlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefreshCall}
        refreshing={isRefresh}
        style={style}
        ItemSeparatorComponent={<CureOncoListSeparator />}
      />
      {showPostImage ? (
        <PostImageViewer
          style={styles.postImage}
          postImages={postImages}
          showImage={val => {
            setShowPostImage(val);
          }}
        />
      ) : null}
    </View>
  );
};

export default ForumComponent;
