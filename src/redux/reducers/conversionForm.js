import {
  UPDATE,
  VALIDATE,
} from 'redux/actions/conversionForm';
import roundTwoPlaces from 'utils/round';

const initialState = {
  from: {currency: "usd", amount: "0.00"},
  to: {currency: "gbp", amount: "0.00"},
}

function calculateAmount(exchangeRates, value, previousTo) {
  const exchangeRate = exchangeRates[value.currency];
  const toCurrency = previousTo.currency;
  const rate = value.currency != toCurrency ? exchangeRate[toCurrency].rate : 1;

  // potential inaccuracies in rounding when using toFixed, suitable for this project
  const amount = roundTwoPlaces(value.amount * rate).toFixed(2);

  return {currency: previousTo.currency, amount}
}

export default function conversionFormReducer(state = initialState, action) {
  switch (action.type) {
  case UPDATE:
    if (action.payload.which == "from") {
      return {
        ...state,
        from: action.payload.value,
        to: calculateAmount(
          action.payload.exchangeRates,
          action.payload.value,
          state.to
        )
      }
    } else if (action.payload.which == "to") {
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
  default:
    return state;
  }
}
