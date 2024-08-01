import {Endpoints} from '../../../config/Endpoints';
import {apiMethods, baseApi} from '../api';

const customerBookingService = (body: any) => {
  return {
    url: Endpoints.customerBookingService,
    method: apiMethods.post,
    body,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerUpcomingBookings = () => {
  return {
    url: Endpoints.customerUpcomingBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistUpcomingBookings = () => {
  return {
    url: Endpoints.artistUpcomingBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerCompleteBookings = () => {
  return {
    url: Endpoints.customerCompleteBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistCompleteBookings = () => {
  return {
    url: Endpoints.artistCompleteBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerCancelBookings = () => {
  return {
    url: Endpoints.customerCancelBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistCancelBookings = () => {
  return {
    url: Endpoints.artistCancelBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const customerBookings = () => {
  return {
    url: Endpoints.customerBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistBookings = () => {
  return {
    url: Endpoints.artistBookings,
    method: apiMethods.get,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
const artistAddServices = (body: any) => {
  return {
    url: Endpoints.artistAddService,
    method: apiMethods.post,
    body,
    headers: {
      'Content-type': 'application/json',
    },
  };
};
////
export const AppApi = baseApi.injectEndpoints({
  endpoints: build => ({
    customerBookingService: build.mutation({
      query: customerBookingService,
    }),
    customerUpcomingBookings: build.query({
      query: customerUpcomingBookings,
    }),
    artistUpcomingBookings: build.query({
      query: artistUpcomingBookings,
    }),
    customerCompleteBookings: build.query({
      query: customerCompleteBookings,
    }),
    artistCompleteBookings: build.query({
      query: artistCompleteBookings,
    }),
    customerCancelBookings: build.query({
      query: customerCancelBookings,
    }),
    artistCancelBookings: build.query({
      query: artistCancelBookings,
    }),
    customerBookings: build.query({
      query: customerBookings,
    }),
    artistBookings: build.query({
      query: artistBookings,
    }),
    artistAddServices: build.mutation({
      query: artistAddServices,
    }),
  }),
});

export const {
  useCustomerBookingServiceMutation,
  useLazyArtistBookingsQuery,
  useLazyArtistUpcomingBookingsQuery,
  useLazyArtistCompleteBookingsQuery,
  useLazyArtistCancelBookingsQuery,
  useLazyCustomerBookingsQuery,
  useLazyCustomerCancelBookingsQuery,
  useLazyCustomerCompleteBookingsQuery,
  useLazyCustomerUpcomingBookingsQuery,
  //
  useArtistAddServicesMutation,
} = AppApi;
