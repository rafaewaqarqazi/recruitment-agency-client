import axios from "axios";

export const LOGIN_URL = "/api/auth/login";
export const REGISTER_URL = "/api/auth/register";
export const EDIT_PROFILE_URL = "/api/auth/profile/edit";
export const EDIT_PROFILE_IMAGE_URL = "/api/auth/profile/image";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const CHANGE_PASSWORD_URL = "api/auth/change-password";


export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(data) {
  return axios.post(`${REGISTER_URL}/pdf`, data);
}
export function editProfile(data) {
  return axios.put(`${EDIT_PROFILE_URL}/pdf`, data);

}export function editProfileImage(data) {
  return axios.put(`${EDIT_PROFILE_IMAGE_URL}/images`, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}
export function changePassword(data) {
  return axios.put(CHANGE_PASSWORD_URL, data);
}

