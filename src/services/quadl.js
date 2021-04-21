import axios from 'axios'

const TOKEN = '8dCRxDkyxGUsHMqz-W3y'
const BASE_URL = 'https://www.quandl.com/api/v3/'

export const getQuadlEODStock = (datasetCode, params = {}) => {
  params['api_key'] = TOKEN
  const url = `${BASE_URL}datasets/WIKI/${datasetCode}.json?`

  return axios.get(url, { params })
}

export const getQuandlFutures = (params = {}) => {
  params['api_key'] = TOKEN
  //https://www.quandl.com/api/v3/datasets/CHRIS/CME_FF2.json
  const url = `${BASE_URL}datasets/Chris/CME_FF2.json?`
  return axios.get(url, { params })
}
