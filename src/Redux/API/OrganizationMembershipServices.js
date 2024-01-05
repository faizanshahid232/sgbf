// eslint-disable-next-line no-unused-vars
import { callAPi } from './http-common';

const createOrganizationMembership = (data) => callAPi.post('/organization', data);
const getAllOrganizationMembership = () => callAPi.get('/organization/org');
const getOrganizationMembershipbyId = (id) => callAPi.get(`orgMembership/${id}`);
const deleteOrganizationMembership = (id) => callAPi.delete(`orgMembership/${id}`);
const editOrganizationMembership = (id, data) => callAPi.patch(`orgMembership/${id}`, data);

const OrganizationMembershipServices = {
  createOrganizationMembership,
  getAllOrganizationMembership,
  getOrganizationMembershipbyId,
  deleteOrganizationMembership,
  editOrganizationMembership,
};

export default OrganizationMembershipServices;
