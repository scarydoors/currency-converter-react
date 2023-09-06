import { requestAllExchangeRates } from 'api/floatrates';

export const REQUEST_BEGIN   = "REQUEST_BEGIN";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_FAILURE = "REQUEST_FAILURE";

export function fetchExchangeRates() {
  return (dispatch) => {
    dispatch({type: REQUEST_BEGIN})
    return requestAllExchangeRates()
      .then(
        (data) => {
          dispatch(setExchangeRates(data));
        },
        (error) => {
          console.log(error)
          dispatch(onError(error));
        }
      )
  }
}

function setExchangeRates(data) {
  return {
    type: REQUEST_SUCCESS,
    payload: {data},
  }
}

function onError(error) {
  return {
    type: REQUEST_FAILURE,
    payload: {error}
  }
} 
