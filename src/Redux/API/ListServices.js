import { callAPi } from './http-common';

const createList = (data) => callAPi.post('createList', data);
const getAllList = () => callAPi.get('getList');
const deleteList = (id) => callAPi.delete(`deleteList/${id}`);
const editList = (data) => callAPi.patch('updateList', data);
const deleteSubscribers = (data) => callAPi.patch('deleteAllSubscribers', data);
const getListById = (id) => callAPi.get(`getListById/${id}` );
const editSubscriberById = (data) => callAPi.patch('editSubscriberById', data);
const deleteSubscriberById = (data) => callAPi.patch('deleteSubscriberById', data);
const toggeleAutomationSubscriber = (data) => callAPi.patch('updateSubscriberAutomation', data);




const ListServices = {
  createList,
  getAllList,
  deleteList,
  editList,
  deleteSubscribers,
  getListById,
  editSubscriberById,
  deleteSubscriberById,
  toggeleAutomationSubscriber
};

export default ListServices;
