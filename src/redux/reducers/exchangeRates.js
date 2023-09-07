import { REQUEST_BEGIN, REQUEST_FAILURE, REQUEST_SUCCESS } from 'redux/actions/exchangeRates';

const initialState = {
  exchangeRates: null,
  codeNamesMap: null,
  loading: true,
  error: null,
};
/*
  This reducer serves as a global store of exchangeRate data Which
  would make sense if multiple areas of the app required exchangeRate
  data without needing to pass it through the component tree.
 */
export default function exchangeRatesReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        exchangeRates: action.payload.exchangeRates,
        codeNamesMap: action.payload.codeNamesMap,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
