// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createInvoice = (data) => callAPi.post('/invoice', data);
const getAllInvoice = () => callAPi.get('/payment/getPayments');
const getUserInvoice = () => callAPi.get('/payment/getPaymentsPeople');
const getOrganizationInvoice = () => callAPi.get('/payment/getPaymentsOrg');
const getInvoicebyId = (id) => callAPi.get(`/invoice/${id}`);
const deleteInvoice = (id) => callAPi.delete(`/invoice/${id}`);
const editInvoice = (data) => callAPi.patch(`/invoice/${data.id}`,data.edit);

const InvoiceServices = {
  createInvoice,
  getAllInvoice,
  deleteInvoice,
  editInvoice,
  getInvoicebyId,
  getUserInvoice,
  getOrganizationInvoice
};

export default InvoiceServices;
