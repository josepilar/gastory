import axios from 'axios';

import { getUserInformation } from '../helpers/identity_helper';

export function setUpAxiosIdentity(auth) {
  axios.defaults.baseURL = 'https://gastory-api.herokuapp.com';
  // axios.defaults.baseURL = 'http://localhost:3001';
  if (!axios.defaults.headers.common['user-id']) {
    axios.defaults.headers.common['user-id'] = getUserInformation().googleId;
  }
}

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
