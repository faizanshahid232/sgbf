// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createOrganization = (data) => callAPiMultiPart.post('/organization', data);
const getAllOrganization = () => callAPi.get('/organization');
const getOrganizationbyId = (id) => callAPi.get(`/organization/${id}`);
const deleteOrganization = (id) => callAPi.delete(`/organization/${id}`);
const editOrganization = (id, data) => callAPiMultiPart.patch(`/organization/${id}`, data);

const OrganizationServices = {
  createOrganization,
  getAllOrganization,
  deleteOrganization,
  editOrganization,
  getOrganizationbyId,
};

export default OrganizationServices;
