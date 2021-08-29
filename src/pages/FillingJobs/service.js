// @ts-ignore

/* eslint-disable */
import request  from '../../utils/request';

/** 获取列表 GET /api/filling-jobs */

export async function fillingJobs(params, options) {
  return request('/api/filling-jobs', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建任务 PUT /api/filling-jobs */

export async function updateFillingJobs(options) {
  return request('/api/filling-jobs', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建任务 POST /api/filling-jobs */

export async function addFillingJobs(options) {
  return request('/api/filling-jobs', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除任务 DELETE /api/filling-jobs */

export async function removeFillingJobs(options) {
  return request('/api/filling-jobs', {
    method: 'DELETE',
    ...(options || {}),
  });
}
