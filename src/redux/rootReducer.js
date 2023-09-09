import { combineReducers } from 'redux';
import { floatratesApi } from 'redux/api/floatrates';
import conversionForm from 'redux/slices/conversionFormSlice';

export default combineReducers({
  [floatratesApi.reducerPath]: floatratesApi.reducer,
  conversionForm: conversionForm,
});
