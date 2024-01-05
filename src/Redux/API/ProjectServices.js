// eslint-disable-next-line no-unused-vars
import { callAPi, callAPiMultiPart } from './http-common';

const createProject = (data) => callAPiMultiPart.post('/project', data);
const getAllProject = () => callAPi.get('/project');
const getAllProjectPublic = () => callAPi.get('/project/public');
const getProjectbyId = (id) => callAPi.get(`/project/${id}`);
const deleteProject = (id) => callAPi.delete(`/project/${id}`);
const editProject = (data) => callAPiMultiPart.patch(`/project/${data.id}`, data.edit);

const ProjectServices = {
  createProject,
  getAllProject,
  getProjectbyId,
  deleteProject,
  editProject,
  getAllProjectPublic,
};

export default ProjectServices;
