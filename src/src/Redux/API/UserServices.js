import { callAPi } from './http-common';

const RegisterUser = (data) => callAPi.post('auth/registerUser', data);
const VerifyUser = (data) => callAPi.post('auth/verifyOtp', data);
const VerifyForgot = (data) => callAPi.post('checkfrgtVerification', data);
const ResendVerification = (data) => callAPi.post('resendVerification', data);
const LoginUser = (data) => callAPi.post('auth/login', data);
const ForgotPassword = (data) => callAPi.patch('auth/forgotPassword', data);
const ResetPassword = (data) => callAPi.patch('auth/resetPassword', data);
const getUserData = () => callAPi.get('/user/getUserData');



const UserServices = {
  RegisterUser,
  LoginUser,
  VerifyUser,
  ResendVerification,
  ForgotPassword,
  ResetPassword,
  VerifyForgot,
  getUserData,
};

export default UserServices;
