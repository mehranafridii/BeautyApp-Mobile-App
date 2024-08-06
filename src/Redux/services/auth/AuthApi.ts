import {Endpoints} from '../../../config/Endpoints';
import {apiMethods, baseApi} from '../api';

const signUp = (body: Object) => {
  return {
    url: Endpoints.signUp,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const signUpArtist = (body: Object) => {
  return {
    url: Endpoints.signUpArtist,
    method: apiMethods.post,
    body,
    // headers: {
    //   'Content-type': 'application/json',
    // },
  };
};
const login = (body: Object) => {
  return {
    url: Endpoints.login,
    method: apiMethods.post,
    body,
  };
};
export const AuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation({
      query: signUp,
    }),
    signUpArtist: build.mutation({
      query: signUpArtist,
    }),
    login: build.mutation({
      query: login,
    }),
  }),
});

export const {useSignUpMutation, useSignUpArtistMutation, useLoginMutation} =
  AuthApi;
