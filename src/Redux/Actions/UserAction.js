import {ActionsTypes} from '../ActionsTypes';

export function Save_User_Data(data) {
  return {
    type: ActionsTypes.SAVE_USER_DATA,
    payload: data,
  };
}

export function Remove_User_Data() {
  return {
    type: ActionsTypes.REMOVE_USER_DATA,
  };
}
