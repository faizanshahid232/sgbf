import { callAPi } from './http-common';

const createUser = (id, data) => callAPi.post(`/organization/createOrganizationMember/${id}`, data);
const getAllUser = (id) => callAPi.get(`/organization/getMemberorgs/${id}`);
const getUserbyId = (id) => callAPi.get(`/organization/createOrganizationMember/${id}`);
const getUserDatabyId = (id) => callAPi.get(`user/getUserDataById/${id}`);
const deleteUser = (data) => callAPi.post(`/organization/deleteOrganizationMember`,data);
const editUser = (data) => callAPi.post(`/organization/updateOrganizationMember`, data);


const OrganizationMemberService = {
  createUser,
  getAllUser,
  getUserbyId,
  deleteUser,
  editUser,
  getUserDatabyId
};

export default OrganizationMemberService;
