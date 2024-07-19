import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  //   header: 'application/json',
};
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action?.payload;
    },
    setUser: (state, action) => {
      state.user = action?.payload;
    },
  },
});

export const {setToken, setUser} = userSlice?.actions;

export const getUser = state => state?.auth?.user;
export const getToken = state => state?.auth?.token;

// export default authSlice?.re
export default {initialState, reducer: userSlice?.reducer};
