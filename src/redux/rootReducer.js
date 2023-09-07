import { combineReducers } from 'redux';

import exchangeRatesReducer from 'redux/reducers/exchangeRates';
import conversionFormReducer from 'redux/reducers/conversionForm';

export default combineReducers({
  exchangeRatesReducer,
  conversionFormReducer,
});
