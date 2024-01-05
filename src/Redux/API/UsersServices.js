// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createUser = (data) => callAPi.post('/user', data);
const getAllUser = () => callAPi.get('/user/all');
const toggleStatus = (data) => callAPi.post('/user/approveAndDisapprove', data);
const getUserbyId = (id) => callAPi.get(`/user/${id}`);
const getUserDatabyId = (id) => callAPi.get(`user/getUserDataById/${id}`);
const deleteUser = (id) => callAPi.delete(`/user/${id}`);
const editUser = (id) => callAPi.patch(`/user/updateProfile/${id}`);


const UsersServices = {
  createUser,
  toggleStatus,
  getAllUser,
  getUserbyId,
  deleteUser,
  editUser,
  getUserDatabyId
};

export default UsersServices;
