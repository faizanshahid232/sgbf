// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const getMembers = () => callAPi.get('user/getMembers');
const getMemberByID = (id) => callAPi.get(`user/getMember/${id}`);

const MemberServices = {
  getMembers,
  getMemberByID,
};

export default MemberServices;
