import React from 'react';
import Modal from 'react-native-modal';

const ModalComponent = props => {
  const {modalStyle, visibility, renderModal, onBackdropPress} = props;
  return (
    <Modal
      onBackdropPress={onBackdropPress}
      style={modalStyle}
      useNativeDriver={true}
      isVisible={visibility}
      backdropColor="#FFFFFF"
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}>
      {renderModal}
    </Modal>
  );
};

export default ModalComponent;
