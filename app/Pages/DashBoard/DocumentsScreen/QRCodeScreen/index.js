import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '../../../../Components';
import {colors, fonts} from '../../../../themes/themes';
import {scaledHeight, scaledWidth} from '../../../../utils/Resolution';
// import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScreen = props => {
  const dispatch = useDispatch();
  const [showQRCode, setShowQRCode] = useState(false);

  const folderNames = useSelector(state => state.ProfileReducer?.folderNames);

  const onSuccess = async e => {
    setShowQRCode(false);
    this.setState({showQRCode: false});
    // const accessToken = await AppUtils.getAccessTokenFromSecuredStorage();
    // const data = JSON.parse(e.data);
    // const loginData = {
    //   accessToken: accessToken,
    //   secret: data.uniqueId,
    //   socketId: data.socketid,
    // };
    // await this.props.qrCodeLogin(loginData);
  };

  return (
    <View style={styles.QRView}>
      <TouchableOpacity onPress={() => setShowQRCode(true)}>
        <Icon
          name={'qrcode'}
          type={'AntDesign'}
          size={200}
          color={colors.black}
        />
      </TouchableOpacity>
      <Text style={styles.documentText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit,{' '}
      </Text>
      {/* {showQRCode && (
        <View style={styles.QRCode}>
          <QRCodeScanner
            onRead={onSuccess}
            reactivate={true}
            showMarker={true}
            topContent={<Text style={styles.topContentTxt}>Scan QR Code</Text>}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  QRView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaledHeight(150),
  },
  documentText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    color: '#747D8C',
    marginTop: scaledHeight(50),
    marginLeft: scaledWidth(15),
    marginRight: scaledWidth(15),
  },
  QRCode: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.white,
  },
  topContentTxt: {
    flex: 1,
    fontSize: 18,
    marginTop: scaledHeight(25),
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default QRCodeScreen;
