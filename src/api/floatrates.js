import axios from 'axios';

export function apiInstance() {
  // no timeout is set because chrome will queue the requests which
  // may mean that they can timeout
  return axios.create({
    baseURL: 'http://www.floatrates.com/daily/',
    // extract only what we need
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

/**
 * Fires off many requests to fetch exchangeRates and a map of names
 * @returns{object} - {codeNamesMap exchangeRates}
 *
 * @example
 * codeNamesMap = {
 *   'gbp': 'British Pound Sterling',
 *   ...
 * }
 *
 * exchangeRates = {
 *   'gbp': {'usd': {rate: 1.666, date: new Date()}, ...},
 *   ...
 * }
 */
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
      // need to add gbp in from initial request because it is not
      // included in the supportedCurrencies
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

/**
 * Fetches exchange rates for a given currency.
 * @param{string} currency - ISO4217 3 letter code for currency
 * @returns{object} - {exchangeRates, codeNamesMap}
 */
export async function requestExchangeRate(currency, instance = apiInstance()) {
  const endpoint = getEndpoint(currency);
  return instance.get(endpoint);
}
