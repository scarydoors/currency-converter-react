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
     *   which: "from",    // the updated field
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
    updateFields: (state, action) => {
      const { which, value, fromExchangeRates } = action.payload;

      // update from only if the currency isn't the thing that changed because the extraReducer handles that
      if (which === 'from' && state.from.currency === value.currency) {
        state.from = value;
        state.to = calculateAmount(fromExchangeRates, state.to.currency, value, which, state.to);
      } else if (which === 'to') {
        state.from = calculateAmount(fromExchangeRates, value.currency, value, which, state.from);
        state.to = value;
      } else if (which === 'from') {
        // just update the value, the extraReducer will handle the calculation after the exchangeRates are fetched
        state.from = value;
      }
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

export const { updateFields } = conversionFormSlice.actions;

export default conversionFormSlice.reducer;
