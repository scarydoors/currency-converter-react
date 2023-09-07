import axios from 'axios';

import {currencies} from 'constants/currencies';

function apiInstance() {
  return axios.create({
    baseURL: 'http://www.floatrates.com/daily/',
    timeout: 5000,
    transformResponse: [
      (data) => {
        let conversionRates = JSON.parse(data);

        // mutate object in place
        Object.keys(conversionRates).forEach((currency) => {
          const currencyRate = conversionRates[currency];
          
          conversionRates[currency] = {
            rate: currencyRate["rate"],
            date: currencyRate["date"]
          }
        })

        return conversionRates;
      }
    ]
  });
}

function getEndpoint(currency) {
  return `${currency}.json`;
}

export function requestAllExchangeRates() {
  const instance = apiInstance();

  return Promise.all(currencies.map(async (currency) => {
    const response = await requestExchangeRate(currency, instance);
    return [currency, response.data];
  })).then(
    (data) => {
      return Object.fromEntries(data);
    },
    (error) => {
      return reject(error);
    }
  );
}

export function requestExchangeRate(currency, instance = apiInstance()) {
  const endpoint = getEndpoint(currency);
  return instance.get(endpoint);
}
