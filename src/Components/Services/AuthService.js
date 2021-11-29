import {request} from './APICentral';

export const forgotPassword = data => {
  return request(
    {url: '/user/login/forgot-password', method: 'POST', data},
    false,
  );
};

export const verifyForgotPasswordCode = data => {
  return request({
    url: '/user/login/reset-password-code-verification',
    method: 'POST',
    data,
  });
};

export const resetPassword = data => {
  return request(
    {
      url: '/user/login/reset-password',
      method: 'POST',
      data,
    },
    false,
  );
};

export const loginUser = data => {
  return request({url: '/pub/login', method: 'POST', data}, false, false);
};

export const logoutUser = () => {
  return request({url: '/user/login/logout', method: 'POST', data: {}}, true);
};

export const updatePhone = data => {
  return request({
    url: '/user/login/update-phone',
    method: 'POST',
    data,
  });
};

export const geVerificationCode = data => {
  return request({url: '/user/otp/verify', method: 'POST', data}, true);
};

export const getVerifyCode = data => {
  return request({url: '/user/otp/verify', method: 'POST', data}, true);
};

export const verifyUser = data => {
  return request(
    {url: '/user/login/verify-phone-number', method: 'POST', data},
    true,
  );
};

export const registerUser = data => {
  return request({url: '/pub/register', method: 'POST', data}, false, false);
};

export const requestForgetPassword = data => {
  return request(
    {url: '/pub/forgotpassword', method: 'POST', data},
    false,
    false,
  );
};

export const requestResendOtp = data => {
  return request({url: '/user/otp/resend', method: 'POST', data}, true, false);
};

export const requestVerifyForgetPassword = data => {
  return request(
    {url: '/api/user/auth/forgot-password-verification', method: 'POST', data},
    false,
    false,
  );
};
export const requestResetpassword = data => {
  return request(
    {url: '/user/resetPassword', method: 'POST', data},
    true,
    false,
  );
};

const AuthService = {
  registerUser,
};

export default AuthService;
