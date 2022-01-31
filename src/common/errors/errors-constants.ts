export const STAFF_EXCEPTIONS = {
  otpMismatch:
    'Otp code entered was wrong. Please enter correct code or request another code',
  otpExpired:
    'Otp code entered has expired. Please request another code to reset password',
  notExist: `Sorry, the Staff does not exist in the system`,
  notExistUserWithEmail: `Sorry user with the email provided does not exist in the system. Please enter email you signed up with`,
  passwordMisMatch: `Password entered is incorrect, please confirm that its correct or contact Company Admin`,
  incorrectLoginData: `Login email or password is incorrect`,
  notExistUpdate: `Sorry, the system user you are trying to update does not exist`,
  existsEmail: `Sorry, the email has already been taken`,
  invalidData: `Sorry, system user data is invalid.`,
  userNotFound: `Sorry, User with the credentials not found in the system. Contact Company Admin`,
};

export const RIDE_EXCEPTIONS = {
  ongoingRide: `Sorry, the driver or passanger has ongoing ride`,
};
