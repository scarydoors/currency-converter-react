import axios from 'axios';

export const currencies = ['usd', 'gbp', 'cad', 'aud', 'jpy'];

function apiInstance() {
  return axios.create({
    baseURL: 'http://www.floatrates.com/daily/',
    timeout: 1000,
  });
}

export function requestExchangeRate(currency) {
  const instance = apiInstance();
  const endpoint = `/${currency}.json`;
  return instance.get(endpoint)
}
