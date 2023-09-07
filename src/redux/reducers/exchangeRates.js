import { REQUEST_BEGIN, REQUEST_SUCCESS, REQUEST_FAILURE } from 'redux/actions/exchangeRates';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

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
        data: action.payload.data,
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
