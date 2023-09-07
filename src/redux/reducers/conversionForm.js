import {
  UPDATE,
} from 'redux/actions/conversionForm';
import roundTwoPlaces from 'utils/round';

const initialState = {
  from: {currency: "usd", amount: "0.00"}, // value of the "from" CurrencyConverter 
  to: {currency: "gbp", amount: "0.00"}, // value of the "to" CurrencyConverter 
}

/**
 * Pure function. Calculates a new amount for a field based on the other one changing.
 * @param{Object} exchangeRates - Object/dictionary of entries which
 *                                map a currency type to exchange rates for other currencies.
 * @param{Object} value - New value of the changed field
 * @param{Object} previousTo - Old value of the field that will be recalculated
 */
function calculateAmount(exchangeRates, value, previousTo) {
  const exchangeRate = exchangeRates[value.currency];
  const toCurrency = previousTo.currency;
  
  // rate will be 1 if converting to same currency 
  const rate = value.currency !== toCurrency ? exchangeRate[toCurrency].rate : 1;
  
  const amount = roundTwoPlaces(value.amount * rate).toFixed(2);

  return {currency: previousTo.currency, amount}
}

export default function conversionFormReducer(state = initialState, action) {
  switch (action.type) {
  /**
   * Updates and calculates new values for the state of the form
   * Payload example:
   * {
   *   which: "from",    // the updated field
   *   value: {currency: "usd", amount: 2.22},  // the new value of the field
   *   exchangeRates: { // object containing conversion rates between different currencies
   *     "usd": {
   *       "gbp": {rate: 2.234297, date: new Date()},
   *       ...
   *     },
   *     ...
   *   }
   * }
   */
  case UPDATE:
    if (action.payload.which === "from") {
      return {
        ...state,
        from: action.payload.value,
        to: calculateAmount(
          action.payload.exchangeRates,
          action.payload.value,
          state.to
        )
      }
    } else if (action.payload.which === "to") {
      return {
        ...state,
        from: calculateAmount(
          action.payload.exchangeRates,
          action.payload.value,
          state.from
        ),
        to: action.payload.value
      }
    }
    return state;
  default:
    return state;
  }
}
