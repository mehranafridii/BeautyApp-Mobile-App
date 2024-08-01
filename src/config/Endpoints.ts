export const Endpoints = {
  //AUTH
  login: 'login',
  signUp: 'register_user',
  signUpArtist: 'register_artist',
  forgotPassword: 'users/forget-password',
  verifyOTP: 'users/otp-verification',
  resetPassword: 'users/reset-password',
  //APP
  customerBookingService: 'Booking/Customer/Store',
  customerUpcomingBookings: 'Booking/Customer/Activebooking',
  artistUpcomingBookings: 'Booking/Artist/Activebooking',
  customerCompleteBookings: 'Booking/Customer/Completebooking',
  artistCompleteBookings: 'Booking/Artist/Completebooking',
  customerCancelBookings: 'Booking/Customer/Cancelbooking',
  artistCancelBookings: 'Booking/Artist/Cancelbooking',
  customerBookings: 'Booking/Customer/Bookings',
  artistBookings: 'Booking/Artist/Bookings',

  // Artist Services
  artistAddService: 'Services/Store',
};
