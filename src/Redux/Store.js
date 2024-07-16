import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import IndexReducer from './Reducers/IndexReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['User_Reducer'],
};

const persistedReducer = persistReducer(persistConfig, IndexReducer);
const Store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});

const persistedStore = persistStore(Store);
export {Store, persistedStore};
