import { requestExchangeRate } from 'api/floatrates';

export const REQUEST_BEGIN   = "REQUEST_BEGIN";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_FAILURE = "REQUEST_FAILURE";

export function fetchExchangeRates() {
  return (dispatch) => {
    dispatch({type: REQUEST_BEGIN})
    return requestExchangeRate('usdd')
      .then(
        ({data}) => {
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
  console.log(data)
  return {
    type: REQUEST_BEGIN,
    payload: {data},
  }
}

function onError(error) {
  return {
    type: REQUEST_FAILURE,
    payload: {error}
  }
} 
