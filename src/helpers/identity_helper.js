export function getUserInformation() {
  const userInfo = window.localStorage.getItem('userInfo');
  return JSON.parse(userInfo);
}