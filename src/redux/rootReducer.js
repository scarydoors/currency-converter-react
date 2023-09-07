import { combineReducers } from 'redux';
import conversionFormReducer from 'redux/reducers/conversionForm';
import exchangeRatesReducer from 'redux/reducers/exchangeRates';

export default combineReducers({
  exchangeRatesReducer,
  conversionFormReducer,
});
