import { createSlice } from '@reduxjs/toolkit';
import { floatratesApi } from 'redux/api/floatrates';
import roundTwoPlaces from 'utils/round';

const initialState = {
  from: { currency: 'gbp', amount: '0.00' },
  to: { currency: 'usd', amount: '0.00' },
};

/**
 * Pure function. Calculates a new amount for a field based on the other one changing.
 * @param{Object} fromExchangeRates - Exchange rates for the currency in the from field
 * @param{Object} toCurrency - Currency of the to field
 * @param{Object} value - New value of the changed field
 * @param{string} which - Which field has changed
 * @param{Object} previous - Old value of the field that will be recalculated
 */
function calculateAmount(fromExchangeRates, toCurrency, value, which, previous) {
  if (parseInt(value.amount) < 0) {
    return previous;
  }

  const exchangeRates = fromExchangeRates[toCurrency];
  const rate = which === 'from' ? exchangeRates.rate : exchangeRates.inverseRate;

  const amount = roundTwoPlaces(value.amount * rate).toFixed(2);

  return { currency: previous.currency, amount };
}

export const conversionFormSlice = createSlice({
  name: 'conversionForm',
  initialState,
  reducers: {
    /**
     * Updates and calculates new values for the state of the form
     * Payload example:
     * {
     *   value: {currency: "usd", amount: 2.22},  // the new value of the field
     *   fromExchangeRates: { // object containing conversion rates between different currencies
     *     "usd": {
     *       "gbp": {rate: 2.234297, inverseRate: 0.6655, date: new Date()},
     *       ...
     *     },
     *     ...
     *   }
     * }
     */
    updateFrom: (state, action) => {
      const { value, fromExchangeRates } = action.payload;
      state.from = value;
      if (state.from.currency === value.currency) {
        state.to = calculateAmount(fromExchangeRates, state.to.currency, value, 'from', state.to);
      }
    },
    updateTo: (state, action) => {
      const { value, fromExchangeRates } = action.payload;
      state.from = calculateAmount(fromExchangeRates, value.currency, value, 'to', state.from);
      state.to = value;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      floatratesApi.endpoints.getExchangeRatesByCode.matchFulfilled,
      // this only runs when from's currency changes
      (state, { payload: fromExchangeRates }) => {
        state.to = calculateAmount(fromExchangeRates, state.to.currency, state.from, 'from', state.to);
      },
    );
  },
});

export const { updateFrom, updateTo } = conversionFormSlice.actions;

export default conversionFormSlice.reducer;
