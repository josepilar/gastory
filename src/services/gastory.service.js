import axios from 'axios';

import { DOCUMENT_KEY } from '../constants';

const SHEETS = {};

export function setUpAxiosAuth(auth) {
  if (!axios.defaults.headers.common['Authorization']) {
    axios.defaults.headers.common['Authorization'] = `${auth.token_type} ${auth.access_token}`;
  }
}

function getBatchByDataFilter(filters) {
  return axios({
    method: 'post',
    url: `https://sheets.googleapis.com/v4/spreadsheets/${DOCUMENT_KEY}/values:batchGetByDataFilter`,
    data: filters
  });
}

function extractArrayData(data) {
  const properties = data.shift();
  return data.map(row => {
    const record = {};
    properties.forEach((prop, idx) => record[prop] = row[idx]);
    return record;
  });
}

export async function getTrips() {
  try {
    const { data } = await getBatchByDataFilter({
      dataFilters: [
        {
          gridRange: {
            sheetId: SHEETS.trips,
            startRowIndex: 0
          }
        }
      ],
      valueRenderOption: "UNFORMATTED_VALUE"
    });
    const { valueRange: { values } } = data.valueRanges[0];
    return extractArrayData(values);
  } catch (error) {
    console.error(error);
  }
}

export async function getCars() {
  try {
    const { data } = await getBatchByDataFilter({
      dataFilters: [
        {
          gridRange: {
            sheetId: SHEETS.cars,
            startRowIndex: 0
          }
        }
      ],
      valueRenderOption: "UNFORMATTED_VALUE"
    });
    const { valueRange: { values } } = data.valueRanges[0];
    return extractArrayData(values);

  } catch (error) {
    console.error(error);
  }
}


export async function loadSheets() {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${DOCUMENT_KEY}`,
    });
    const { sheets } = data;
    sheets.forEach(({ properties }) => {
      SHEETS[properties.title] = properties.sheetId;
    });
  } catch (error) {
    console.error(error);
  }
}

