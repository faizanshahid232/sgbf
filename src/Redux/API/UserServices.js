import { callAPi, callAPiMultiPart } from './http-common';

const RegisterUser = (data) => callAPi.post('auth/admin/registerUser', data);
const VerifyUser = (data) => callAPi.post('checkVerification', data);
const VerifyForgot = (data) => callAPi.post('checkfrgtVerification', data);
const ResendVerification = (data) => callAPi.post('resendVerification', data);
const LoginUser = (data) => callAPi.post('login', data);
const ForgotPassword = (data) => callAPi.post('forgotPassword', data);
const ResetPassword = (data) => callAPi.patch('resetPassword', data);
const getUserData = () => callAPi.get('/user/getUserData');
const createWhatsappAccount = (data) => callAPi.post('addWhatsappAccount', data);
const editProfile = (data) => callAPiMultiPart.patch('/user/updateProfile', data);
const ChangePassword = (data) => callAPi.post('/auth/changePassword', data);
const googleLogin = (data) => callAPi.post('auth/socialLogin', data);
const updatePeople = (id, data) => callAPi.patch(`/auth/admin/AdminUpdateUser/${id}`, data);

const UserServices = {
  RegisterUser,
  LoginUser,
  VerifyUser,
  ResendVerification,
  ForgotPassword,
  ResetPassword,
  VerifyForgot,
  getUserData,
  createWhatsappAccount,
  editProfile,
  ChangePassword,
  googleLogin,
  updatePeople,
};

export default UserServices;
