// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createArticle = (data) => callAPiMultiPart.post('article', data);
const getAllArticlePublic = () => callAPi.get('article/public');
const getAllArticle = () => callAPi.get('article');
const getArticlebyId = (id) => callAPi.get(`article/${id}`);
const deleteArticle = (id) => callAPi.delete(`article/${id}`);
const editArticle = (id, edit) => callAPiMultiPart.patch(`article/${id}`, edit);
const changeStatus = (id) => callAPiMultiPart.post(`/article/approveDisapproved/${id}`);

const ArticalServices = {
  createArticle,
  getAllArticle,
  deleteArticle,
  editArticle,
  getArticlebyId,
  getAllArticlePublic,
  changeStatus
};

export default ArticalServices;
