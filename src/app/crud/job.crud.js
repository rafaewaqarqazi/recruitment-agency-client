import axios from "axios";
export const JOB_POST_URL = "/api/jobs/new";
export const JOB_EDIT_URL = "/api/jobs/edit";
export const JOB_DELETE_URL = "/api/jobs/delete";
export const JOB_APPLY_URL = "/api/jobs/apply";
export const ALL_JOBS_URL = "/api/jobs/all";

export function postJob(values) {
  return axios.post(JOB_POST_URL, values);
}
export function editJob(values) {
  return axios.put(JOB_EDIT_URL, values);
}
export function deleteJob(id) {
  return axios.put(JOB_DELETE_URL, {id});
}
export function applyForJob(data) {
  return axios.put(JOB_APPLY_URL, data);
}
export function getAllJobs() {
  return axios.get(ALL_JOBS_URL);
}