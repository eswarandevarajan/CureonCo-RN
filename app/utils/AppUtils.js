import EncryptedStorage from 'react-native-encrypted-storage';
import {FCM_TOKEN, GOOGLE, USER_INFO} from '../Constants/CommonConstants';
import {Share} from 'react-native';
import Config from 'react-native-config';
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const {GOOGLE_CLIENT_ID} = Config;

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId: GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

class AppUtils {
  static setFCMToken = async fcmToken => {
    await EncryptedStorage.setItem(FCM_TOKEN, JSON.stringify(fcmToken));
  };

  static getFCMToken = async () => {
    const fcmToken = await EncryptedStorage.getItem(FCM_TOKEN);
    if (fcmToken !== undefined) {
      return JSON.parse(fcmToken);
    }
    return null;
  };

  static clearSecuredStorage = async () => {
    await EncryptedStorage.clear();
  };

  static removeItemFromSecuredStorage = async item => {
    await EncryptedStorage.removeItem(item);
  };

  static setUserProfile = async userInfo => {
    await EncryptedStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  };

  static getUserProfile = async () => {
    const userInfo = await EncryptedStorage.getItem(USER_INFO);
    if (userInfo !== undefined) {
      return JSON.parse(userInfo);
    }
    return null;
  };

  static onShare = async shareUrl => {
    const shareOptions = {
      title: 'Share file',
      url: shareUrl,
      failOnCancel: false,
      saveToFiles: true,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  //   static viewDocument = async url => {
  //     const extension = url.split(/[#?]/)[0].split('.').pop().trim();
  //     const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
  //     const options = {
  //       fromUrl: url,
  //       toFile: localFile,
  //     };
  //     return await RNFS.downloadFile(options)
  //       .promise.then(() => FileViewer.open(localFile))
  //       .then(something => {
  //         console.log('Success', something);
  //       })
  //       .catch(error => {
  //         console.log('Error');
  //       });
  //   };

  static async googleSign() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        const fcm_Token = await AppUtils.getFCMToken();
        const loginData = {
          idToken: userInfo.idToken,
          registrationType: GOOGLE,
          fcmToken: fcm_Token,
        };
        return loginData;
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  }
}

// export const isSensorAvailable = () => {
//   const biometryTypes = rnBiometrics.isSensorAvailable().then(resultObject => {
//     const {available, biometryType} = resultObject;
//     if (available) {
//       const {keysExist} = rnBiometrics.biometricKeysExist();
//       if (keysExist) {
//         rnBiometrics.deleteKeys();
//       }
//       if (biometryType === BiometryTypes.TouchID) {
//         return {biometryType: 'TouchID', available};
//       } else if (biometryType === BiometryTypes.FaceID) {
//         return {biometryType: 'FaceID', available};
//       } else if (biometryType === BiometryTypes.Biometrics) {
//         return {biometryType: 'Finger Print', available};
//       } else {
//         return '';
//       }
//     }
//   });
//   return biometryTypes;
// };

// export const createSignature = () => {
//   let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
//   let payload = epochTimeSeconds + 'some message';
//   rnBiometrics
//     .createSignature({
//       promptMessage: 'Sign in',
//       payload: payload,
//     })
//     .then(resultObject => {
//       const {success, signature} = resultObject;

//       if (success) {
//         console.log(signature);
//       }
//     });
// };

// export const createKeys = () => {
//   const biometryTypes = rnBiometrics.createKeys().then(keys => {
//     const {publicKey} = keys;
//     console.log(publicKey);
//     return publicKey;
//   });
//   return biometryTypes;
// };
export default AppUtils;
