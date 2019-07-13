/* global gapi */
import { CLIENT_ID } from '../constants';

export function listenForUserChanges(setupAuthenticationData) {
  const authInstance = gapi.auth2.getAuthInstance && gapi.auth2.getAuthInstance();
  if (!authInstance) {
    gapi.load('auth2', function () {
      const auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets'
      });
      auth2.isSignedIn.listen((loggedIn) => {
        if (loggedIn) {
          setupAuthenticationData(gapi.auth2.getAuthInstance().currentUser.Ab);
        }
      }); // This is what you use to listen for user changes
    });
  } else {
    setupAuthenticationData(gapi.auth2.getAuthInstance().currentUser.Ab)
  }
}