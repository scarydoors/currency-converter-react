import axios from 'axios';

export function apiInstance() {
  return axios.create({
    baseURL: 'http://www.floatrates.com/daily/',
    transformResponse: [
      (data) => {
        // {gbp: {}, ...}
        let exchangeRates = JSON.parse(data);
        let codeNamesMap = {};
        // mutate objects in place
        Object.keys(exchangeRates).forEach((currency) => {
          const currencyRate = exchangeRates[currency];

          exchangeRates[currency] = {
            rate: currencyRate['rate'],
            date: currencyRate['date'],
          };

          codeNamesMap[currency] = currencyRate['name'];
        });

        return { codeNamesMap, exchangeRates };
      },
    ],
  });
}

function getEndpoint(currency) {
  return `${currency}.json`;
}

export async function requestAllExchangeRates(instance = apiInstance()) {
  // hack to retrieve all available currencies because api does not provide this
  const { data } = await requestExchangeRate('gbp', instance);

  const { codeNamesMap } = data;
  const gbpExchangeRates = data.exchangeRates;

  const supportedCurrencies = Object.keys(codeNamesMap);

  return Promise.all(
    supportedCurrencies.map(async (currency) => {
      const response = await requestExchangeRate(currency, instance);
      const { exchangeRates, codeNamesMap: names } = response.data;

      // need to add gbp's name because it isn't in gbp.json
      if (codeNamesMap['gbp'] == null) {
        codeNamesMap['gbp'] = names['gbp'];
      }
      return [currency, exchangeRates];
    }),
  ).then(
    (data) => {
      return {
        codeNamesMap,
        exchangeRates: {
          gbp: gbpExchangeRates,
          ...Object.fromEntries(data),
        },
      };
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

export async function requestExchangeRate(currency, instance = apiInstance()) {
  const endpoint = getEndpoint(currency);
  return instance.get(endpoint);
}
