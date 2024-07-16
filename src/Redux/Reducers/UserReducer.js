import {ActionsTypes} from '../ActionsTypes';

const initialState = null;

export const User_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SAVE_USER_DATA:
      return action.payload;
    case ActionsTypes.REMOVE_USER_DATA:
      return null;
    default:
      return state;
  }
};
