import axios from 'axios';
import {currencies} from 'constants/currencies';


function apiInstance() {
  return axios.create({
    baseURL: 'http://www.floatrates.com/daily/',
    timeout: 5000,
    transformResponse: [
      (data) => {
        let conversionRates = JSON.parse(data);
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
  console.log("ran")
  return Promise.all(currencies.map(async (currency) => {
    return [currency, (await requestExchangeRate(currency, instance)).data];
  })).then(
    (data) => {
      return Object.fromEntries(data);
    },
    (error) => {
      return error;
    }
  );
}

export function requestExchangeRate(currency, instance = apiInstance()) {
  const endpoint = getEndpoint(currency);
  return instance.get(endpoint);
}