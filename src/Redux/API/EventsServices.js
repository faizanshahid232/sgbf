// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createEvent = (data) => callAPiMultiPart.post('event', data);
const getAllEvent = () => callAPi.get('event');
const getAllEventPublic = () => callAPi.get('event/public');
const getEventbyId = (id) => callAPi.get(`event/${id}`);
const deleteEvent = (id) => callAPi.delete(`event/${id}`);
const editEvent = (id, data) => callAPiMultiPart.patch(`event/${id}`, data);
const eventTerms = (eventTerm) => callAPi.get(`event/term/${eventTerm}`);
const getAllContacts = (id) => callAPi.get(`getContact/${id}`);
const getAllAccounts = () => callAPi.get('getAccount');
const changeStatus = (id) => callAPiMultiPart.post(`/event/approveDisapproved/${id}`);

const EventsServices = {
  createEvent,
  getAllEvent,
  deleteEvent,
  editEvent,
  getEventbyId,
  getAllContacts,
  getAllAccounts,
  eventTerms,
  getAllEventPublic,
  changeStatus,
};

export default EventsServices;
