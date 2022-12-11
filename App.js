import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import {PersistGate} from 'redux-persist/integration/react';
import MainStackNavigator from './app/Navigation/MainStackNavigator';
import {colors} from './app/themes/themes';
import {Provider} from 'react-redux';
import {StatusBar, LogBox} from 'react-native';
import NavigationService, {
  modifyIsReady,
} from './app/Navigation/NavigationService';
import {store, persistor} from './app/Redux/Store';
import NotificationService from './app/Notification/NotificationService';
import {useEffect} from 'react';

global.Buffer = require('buffer').Buffer;

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])


const App = () => {
  useEffect(() => {
    // (async () => {
    //   const credentials = {
    //     clientId:
    //       '1065135939238-8oqdbamja1l3q893t8cvukmbar3uom5b.apps.googleusercontent.com',
    //     appId: '1:1065135939238:android:31570c408e71dc4d1e5e67',
    //     apiKey: 'AIzaSyCqqlzF8zQBNI2kZArW9v5y3EzRj3LWT6A',
    //     storageBucket: 'cureonco-a62e2.appspot.com',
    //     projectId: 'cureonco-a62e2',
    //     databaseURL: '',
    //     messagingSenderId: '1065135939238',
    //   };
    //   const config = {
    //     name: 'CureOnCO',
    //   };
    //   console.log('1', credentials);
    //   console.log('2', config);
    //   if (!firebase.apps.length) {
    //     console.log('3', credentials);
    //     await firebase.initializeApp(credentials, 'CureOnCO');
    //   } else {
    //     console.log('4');
    //     firebase.app('CureOnCo'); // if already initialized, use that one
    //   }
    // })();
    const notificationService = new NotificationService();
    notificationService.showNotification();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.statusBar}/>
      <NavigationContainer
        onReady={() => {
          modifyIsReady(true);
        }}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStackNavigator />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
