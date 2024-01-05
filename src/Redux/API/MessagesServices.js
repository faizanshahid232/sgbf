// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createMessage = (data) => callAPiMultiPart.post('createMessage', data);
const getAllMessages = () => callAPi.get('getAllMessages');
const deleteMessage = (data) => callAPi.patch('deleteMessage', data);
const editMessages = (data) => callAPi.patch('updateMessage', data);

const MessagesServices = {
  createMessage,
  getAllMessages,
  deleteMessage,
  editMessages,
};

export default MessagesServices;
