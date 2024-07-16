import {Endpoints} from '../../../config/Endpoints';
import {apiMethods, baseApi} from '../api';

const signUp = (body: Object) => {
  return {
    url: Endpoints.signUp,
    method: apiMethods.post,
    body,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const login = (body: Object) => {
  return {
    url: Endpoints.login,
    method: apiMethods.post,
    body,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
export const AuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation({
      query: signUp,
    }),
    login: build.mutation({
      query: login,
    }),
  }),
});

export const {useSignUpMutation, useLoginMutation} = AuthApi;
