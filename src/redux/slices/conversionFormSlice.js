import { createSlice } from '@reduxjs/toolkit';
import { floatratesApi } from 'redux/api/floatrates';
import roundTwoPlaces from 'utils/round';

const initialState = {
  from: { currency: 'gbp', amount: '0.00' },
  to: { currency: 'usd', amount: '0.00' },
};

function calculateAmount(fromExchangeRates, toCurrency, value, previous, which) {
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
    updateFields: (state, action) => {
      const { which, value, fromExchangeRates } = action.payload;

      if (which === 'from' && state.from.currency === value.currency) {
        state.from = value;
        state.to = calculateAmount(fromExchangeRates, state.to.currency, value, state.to, which);
      } else if (which === 'to') {
        state.from = calculateAmount(fromExchangeRates, value.currency, value, state.from, which);
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
        state.to = calculateAmount(fromExchangeRates, state.to.currency, state.from, state.to, 'from');
      },
    );
  },
});

export const { updateFields } = conversionFormSlice.actions;

export default conversionFormSlice.reducer;
