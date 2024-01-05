import { callAPi } from './http-common';

const registerEvent = (data) => callAPi.post('/eventRegisteration', data);

const RegisterEventServices = { registerEvent };

export default RegisterEventServices;
