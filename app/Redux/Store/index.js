import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../Reducer';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import EncryptedStorage from 'react-native-encrypted-storage';

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
export {store, persistor};
