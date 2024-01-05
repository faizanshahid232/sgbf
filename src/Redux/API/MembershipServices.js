// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const getMemberSip = () => callAPi.get('orgMembership');

const MembershipServices = {
  getMemberSip,
};

export default MembershipServices;
