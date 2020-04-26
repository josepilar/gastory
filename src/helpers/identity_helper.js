import { setAuthToken } from '../services/gastory.service';

export function getUserInformation() {
  const userInfo = window.localStorage.getItem('userInfo');
  return JSON.parse(userInfo);
}

export function setUserInformation(data) {
  const auth = {
    isLoggedIn: data.success,
    user: data.user,
    token: data.token
  };
  setAuthToken(data.token);
  window.localStorage.setItem('userInfo', JSON.stringify(auth));
}

export function deleteUserInformation() {
  window.localStorage.removeItem('userInfo');
}