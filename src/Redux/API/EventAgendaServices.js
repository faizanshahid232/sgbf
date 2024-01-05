// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createEventAgenda = (data) => callAPiMultiPart.post('eventAgenda/', data);
const getAllEventAgenda = () => callAPi.get('eventAgenda/');
const getEventAgendabyId = (id) => callAPi.get(`eventAgenda/${id}`);
const deletEeventAgenda = (id) => callAPi.delete(`eventAgenda/${id}`);
const editEventAgenda = (id, data) => callAPiMultiPart.patch(`eventAgenda/${id}`, data);

const EventAgendaServices = {
  createEventAgenda,
  getAllEventAgenda,
  deletEeventAgenda,
  editEventAgenda,
  getEventAgendabyId,
};

export default EventAgendaServices;
