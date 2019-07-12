import axios from 'axios';

import { DOCUMENT_KEY } from '../constants';

const HISTORY_SHEET = 0;
const CARS_SHEET = 1;

export function setUpAxiosAuth(auth) {
    if (!axios.defaults.headers.common['Authorization']) {
        axios.defaults.headers.common['Authorization'] = `${auth.token_type} ${auth.access_token}`;
    }
}

export async function loadAllHistoryData()  {
    const {data} = await axios({
      method: 'post',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${DOCUMENT_KEY}/values:batchGetByDataFilter`,
      data: {
        dataFilters: [
          {
            gridRange: {
              sheetId: HISTORY_SHEET,
              startRowIndex: 0
            }
          }
        ]
      }
    });
    const {valueRange: { values }} = data.valueRanges[0];
    const properties = values.shift();
    return values.map(row => {
        const record = {};
        properties.forEach((prop, idx) => record[prop] = row[idx]);
        return record;
    });
}