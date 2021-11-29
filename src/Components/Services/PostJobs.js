import {request} from './APICentral';

export const getMaterialList = data => {
  return request({url: '/material/list', method: 'GET', data}, true);
};

export const getCategoryList = data => {
  return request({url: '/category/list', method: 'GET', data}, true);
};

export const getJobTypeList = page => {
  return request({url: '/jobtype/list', method: 'GET'}, true);
};

export const getPropertyList = data => {
  return request({url: '/property/list', method: 'GET', data}, true);
};

export const createJob = data => {
  return request({url: '/job/create', method: 'POST', data}, true);
};

export const getJobTypeListId = data => {
  return request({url: `/category/jobtypes/${data}`, method: 'GET'}, true);
};

export const getJobMaterialListId = data => {
  return request({url: `/jobtype/materials/${data}`, method: 'GET'}, true);
};
