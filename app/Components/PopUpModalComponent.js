import React from 'react';
import {View, StyleSheet, Animated, Modal} from 'react-native';
import {scaledHeight, scaledWidth} from '../utils/Resolution';

const PopUpModalComponent = props => {
  const {visibility, children, showPopUpModal} = props;
  return (
    <Modal
      animated
      animationType="fade"
      visible={visibility}
      transparent
      onRequestClose={() => {
        showPopUpModal(false);
      }}>
      <View style={styles.modalView}>
        <Animated.View style={styles.modalAnimatedView}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalAnimatedView: {
    backgroundColor: 'white',
    paddingTop: 12,
    // height: scaledHeight(200),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default PopUpModalComponent;
