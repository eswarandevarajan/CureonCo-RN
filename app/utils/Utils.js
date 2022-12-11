import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

export const convertCaptilize = value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const isSensorAvailable = () => {
  const biometryTypes = rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;
    if (available) {
      const {keysExist} = rnBiometrics.biometricKeysExist();
      if (keysExist) {
        rnBiometrics.deleteKeys();
      }
      if (biometryType === BiometryTypes.TouchID) {
        return {biometryType: 'TouchID', available};
      } else if (biometryType === BiometryTypes.FaceID) {
        return {biometryType: 'FaceID', available};
      } else if (biometryType === BiometryTypes.Biometrics) {
        return {biometryType: 'Finger Print', available};
      } else {
        return '';
      }
    }
  });
  return biometryTypes;
};
