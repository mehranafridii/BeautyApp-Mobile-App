import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import IndexReducer from './Reducers/IndexReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['User_Reducer'],
  autoMergeLevel2,
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
