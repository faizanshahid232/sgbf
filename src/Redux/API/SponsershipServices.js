// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createSponsership = (data) => callAPi.post('sponsership/', data);
const getAllSponsership = () => callAPi.get('sponsership/');
const getSponsershipbyId = (id) => callAPi.get(`sponsership/${id}`);
const deleteSponsership = (id) => callAPi.delete(`sponsership/${id}`);
const editSponsership = (id, data) => callAPi.patch(`sponsership/${id}`, data);

const SponsershipServices = {
  createSponsership,
  getAllSponsership,
  deleteSponsership,
  editSponsership,
  getSponsershipbyId,
};

export default SponsershipServices;
