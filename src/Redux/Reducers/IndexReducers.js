import {combineReducers} from '@reduxjs/toolkit';
import {User_Reducer} from './UserReducer';
import {Type_Reducer} from './TypeReducer';
import {baseApi} from '../services/api';

const IndexReducer = combineReducers({
  User_Reducer,
  Type_Reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default IndexReducer;
