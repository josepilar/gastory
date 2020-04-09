import axios from 'axios';

import { DOCUMENT_KEY } from '../constants';

import { getUserInformation } from '../helpers/identity_helper';

export function setUpAxiosIdentity(auth) {
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
