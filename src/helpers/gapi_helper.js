export function getUserInformation(setupAuthenticationData) {
  const userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) setupAuthenticationData(JSON.parse(userInfo));
}