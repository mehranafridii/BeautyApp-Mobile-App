import {combineReducers} from '@reduxjs/toolkit';
import {User_Reducer} from './UserReducer';
import {Type_Reducer} from './TypeReducer';

const IndexReducer = combineReducers({
  User_Reducer,
  Type_Reducer,
});

export default IndexReducer;
