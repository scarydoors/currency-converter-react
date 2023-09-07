import { requestAllExchangeRates } from 'api/floatrates';

export const REQUEST_BEGIN = 'exchangeRates/REQUEST_BEGIN';
export const REQUEST_SUCCESS = 'exchangeRates/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'exchangeRates/REQUEST_FAILURE';

/**
 * Fetch exchange rates from API, reflect the progress using Redux state.
 */
export function fetchExchangeRates() {
  return (dispatch) => {
    dispatch({ type: REQUEST_BEGIN });
    return requestAllExchangeRates().then(
      (data) => {
        dispatch(setExchangeRates(data));
      },
      (error) => {
        dispatch(onError(error));
      },
    );
  };
}

function setExchangeRates(data) {
  return {
    type: REQUEST_SUCCESS,
    payload: { data },
  };
}

function onError(error) {
  return {
    type: REQUEST_FAILURE,
    payload: { error },
  };
}
