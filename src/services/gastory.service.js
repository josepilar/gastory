import axios from 'axios';

import { deleteUserInformation } from '../helpers/identity_helper';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function setAuthToken(token) {
  axios.defaults.headers.common['Authorization'] = token;
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  deleteUserInformation();
  return Promise.reject(error);
});

export async function getCars() {
  try {
    const { data } = await axios({
      method: 'get',
      url: `/api/cars`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getTrips() {
  try {
    const { data } = await axios({
      method: 'get',
      url: `/api/trips`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function signup(signupInfo) {
  try {
    const { data } = await axios({
      method: 'post',
      url: `/api/signup`,
      data: signupInfo
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(username, password) {
  const response = await axios({
    method: 'post',
    url: `/api/signin`,
    data: { username, password }
  }).catch(error => Promise.resolve(error.response));

  return response;
}

export async function resetPassword(email) {
  const response = await axios({
    method: 'post',
    url: `/api/reset-password`,
    data: { email }
  }).catch(error => Promise.resolve(error.response));

  return response;
}

export async function changePassword(password, confirm, token) {
  const response = await axios({
    method: 'post',
    url: `/api/change-password`,
    data: { password, confirm, token }
  }).catch(error => Promise.resolve(error.response));

  return response;
}

export async function verifyToken(token) {
  const response = await axios({
    method: 'post',
    url: `/api/check-reset-token`,
    data: { token }
  }).catch(error => Promise.resolve(error.response));

  return response;
}
