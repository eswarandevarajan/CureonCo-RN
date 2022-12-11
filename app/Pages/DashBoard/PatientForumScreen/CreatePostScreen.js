import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService from '../../../Navigation/NavigationService';
import FABComponent from '../../../Components/FABComponent';
import {
  CREATE_NEW_FEED,
  GET_ALLFEEDS,
  UPLOAD_FEED_IMAGES,
} from '../../../Service/MenuService';
import appStyles from '../../../assets/Styles/AppStyles';
import images from '../../../assets/images';
import ForumComponent from '../Component/ForumComponent';
import ScreenNames from '../../../Navigation/ScreenNames';
import {Icon} from '../../../Components';
import styles from './Styles';
import {CureOncoAvatar} from '../../../Components/CureOncoAtoms';
import PopUpModalComponent from '../../../Components/PopUpModalComponent';
import ImagePickerComponent from '../../../Components/ImagePickerComponent';
import {CAMERA, GALLERY} from '../../../Config/config';

const {height, width} = Dimensions.get('window');

const CreatePostScreen = props => {
  const {navigation} = props;
  const [postText, setPostText] = useState('');
  const [uploadImages, setUploadImages] = useState(null);

  const dispatch = useDispatch();

  const feeds = useSelector(state => state.MenuReducer?.feeds);
  const userProfile = useSelector(state => state.ProfileReducer?.userProfile);
  const {medappprofile = {}} = userProfile ?? {};
  const {user = {}, followers = [], following = []} = medappprofile;

  const UploadProfilePic = async chooseOption => {
    const data = await ImagePickerComponent.photos(chooseOption);
    console.log(data);
    const {formData, pickedImage} = data ?? {};
    setUploadImages(formData);
  };

  const addPost = () => {
    dispatch(UPLOAD_FEED_IMAGES(uploadImages)).then(media => {
      if (media.success) {
        // const postData =
        //   targetTherapyId !== ''
        //     ? {postText: postText, targetTherapyId: ''}
        //     : {postText: postText, media: media.data};
        dispatch(CREATE_NEW_FEED({postText: postText, media: media.data})).then(
          response => {
            if (response) {
              NavigationService.navigate(
                ScreenNames.tabNavigation.PatientForum,
              );
            }
          },
        );
      }
    });
  };

  return (
    <SafeAreaView style={appStyles.appContainer}>
      <ImageBackground
        source={images.backGround}
        style={appStyles.appImageContainer}>
        <View style={appStyles.backArrowView}>
          <TouchableOpacity
            style={appStyles.backArrowTouch}
            onPress={() =>
              NavigationService.navigate(ScreenNames.tabNavigation.PatientForum)
            }>
            <Icon
              name={'keyboard-arrow-left'}
              type={'MaterialIcons'}
              color={'#000'}
              size={30}
            />
          </TouchableOpacity>
          <Text style={appStyles.backTitleTxt}>Add Post</Text>
          <TouchableOpacity style={styles.savePost} onPress={addPost}>
            <Text style={styles.postTxt}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItemView}>
          <CureOncoAvatar
            user={user}
            size={40}
            styles={appStyles.profileIcon}
          />
          <Text style={styles.createNameTxt}>{user?.name}</Text>
        </View>

        <View style={styles.createTopView}>
          <Text style={styles.shareTxt}>Share Your Thoughts</Text>
          <TextInput
            // onTouchStart={() => {
            //   this.setState({showHashTag: false, showImage: false});
            // }}
            // Focus={() => {
            //   this.setState({showHashTag: false, showImage: false});
            // }}
            value={postText}
            onChangeText={txt => setPostText(txt)}
            multiline
            autoFocus={true}
            style={styles.createPostTxt}
            placeholder="Create a post"
          />
        </View>

        <View style={styles.createBottomView}>
          <View style={styles.modalView}>
            <Text style={styles.fileUploadTxt}>Choose Option</Text>
          </View>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalIconView}
              onPress={() => UploadProfilePic(GALLERY)}>
              <Icon
                name={'photo'}
                type={'FontAwesome'}
                color={'#737B7D'}
                size={25}
              />
              <Text style={styles.modalItemTxt}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalIconView}
              onPress={() => UploadProfilePic(CAMERA)}>
              <Icon
                name={'camera'}
                type={'Feather'}
                color={'#737B7D'}
                size={25}
              />
              <Text style={styles.modalItemTxt}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
