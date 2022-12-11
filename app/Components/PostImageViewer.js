import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Icon, ModalComponent} from '../Components';
import {colors} from '../themes/themes';
import appStyles from '../assets/Styles/AppStyles';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

const PostImageViewer = props => {
  const {postImages, showImage} = props;
  const [modelVisible, setmodelVisible] = useState(true);

  const showModal = () => {
    setmodelVisible(false);
    showImage(false);
  };

  const renderModal = () => {
    return (
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.modalTouch} onPress={showModal}>
          <Icon
            name={'closecircleo'}
            type={'AntDesign'}
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>

        <ImageViewer
          imageUrls={postImages}
          backgroundColor={colors.bg}
          enableSwipeDown={true}
        />
      </View>
    );
  };

  return (
    <ModalComponent
      renderModal={renderModal()}
      modalStyle={[appStyles.fullModal, {backgroundColor: colors.bg}]}
      visibility={modelVisible}
      onBackdropPress={() => setmodelVisible(false)}
    />
  );
};
const styles = StyleSheet.create({
  modalTouch: {
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: scaledWidth(20),
    marginTop: scaledHeight(20),
  },
  modalView: {
    flex: 1,
  },
});

export default PostImageViewer;
