import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const floatratesApi = createApi({
  reducerPath: 'floatratesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://www.floatrates.com/daily/' }),
  endpoints: (builder) => ({
    getExchangeRatesByCode: builder.query({
      query: (currencyCode) => `${currencyCode}.json`,
      transformResponse: (response, meta, currencyCode) => {
        // gbp converting to gbp would have a inverseRate and rate of 1
        response[currencyCode] = { rate: 1, inverseRate: 1 };
        return response;
      },
    }),
    getCurrencyInfo: builder.query({
      query: () => `gbp.json`,
      transformResponse: (response) => {
        const currencyNameMap = { gbp: 'U.K. Pound Sterling' };
        Object.keys(response).forEach((currency) => {
          currencyNameMap[currency] = response[currency].name;
        });

        const supportedCurrencies = ['gbp', ...Object.keys(response)];
        return { currencyNameMap, supportedCurrencies };
      },
    }),
  }),
});

export const { useGetExchangeRatesByCodeQuery, useGetCurrencyInfoQuery } = floatratesApi;
