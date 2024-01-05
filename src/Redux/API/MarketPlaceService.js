// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const create = (data) => callAPiMultiPart.post('/Market/createProduct', data);
const getAll = () => callAPi.get('/Market/getProduct');
const getbyId = (id) => callAPi.get(`/Market/getProductId/${id}`);
const deleteById = (id) => callAPi.delete(`/Market/deleteProduct/${id}`);
const edit = (id, edit) => callAPiMultiPart.patch(`/Market/updateProduct/${id}`, edit);
const getAllMarketPublic = () => callAPi.get('/market/public');
const getMarketPublicbyId = (id) => callAPi.get(`/market/public/${id}`);

const MarketPlaceService = {
  create,
  getAll,
  getbyId,
  deleteById,
  edit,
  getAllMarketPublic,
  getMarketPublicbyId,
};

export default MarketPlaceService;
