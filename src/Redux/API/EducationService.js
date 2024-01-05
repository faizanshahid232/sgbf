import { callAPi, callAPiMultiPart } from './http-common';

const create = (data) => callAPiMultiPart.post('/education ', data);
const getAllPublic = () => callAPi.get('article/public');
const getAll = () => callAPi.get('/education');
const getbyId = (id) => callAPi.get(`/education/${id}`);
const deletes = (id) => callAPi.delete(`/education/${id}`);
const edit = (id, edit) => callAPiMultiPart.patch(`/education/${id}`, edit);
const changeStatus = (id) => callAPiMultiPart.post(`/article/approveDisapproved/${id}`);

const EducationService = {
    create,
    getAllPublic,
    getAll,
    getbyId,
    deletes,
    edit,
    changeStatus
};

export default EducationService;
