import axios from "axios";

export const LOGIN_URL = "/api/auth/login";
export const LOGIN_WITH_CODE_URL = "api/auth/loginWithCode";
export const REGISTER_URL = "/api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const CHANGE_PASSWORD_URL = "api/auth/change-password";
export const CLOSE_ACCOUNT_URL = "api/auth/close-account";
export const SETUP_TFA_URL = "api/auth/tfa/setup";
export const VERIFY_TFA_URL = "api/auth/tfa/verify";
export const ENABLE_TFA_URL = "api/auth/tfa/enable";
export const DISABLE_TFA_URL = "api/auth/tfa/disable";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}
export function loginWithCode(code) {
  return axios.post(LOGIN_WITH_CODE_URL, { code });
}

export function register(data) {
  return axios.post(`${REGISTER_URL}/pdf`, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}
export function changePassword(data) {
  return axios.put(CHANGE_PASSWORD_URL, data);
}
export function closeAccount(data) {
  return axios.put(CLOSE_ACCOUNT_URL, data);
}
export function setupTFA() {
  return axios.put(SETUP_TFA_URL);
}
export function verifyCode(code) {
  return axios.put(VERIFY_TFA_URL, {code});
}
export function enableTFA() {
  return axios.put(ENABLE_TFA_URL);
}
export function disableTFA(code) {
  return axios.put(DISABLE_TFA_URL, {code});
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
