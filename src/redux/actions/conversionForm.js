export const UPDATE = 'conversionForm/UPDATE';

export function updateForm(which, value) {
  return (dispatch, getState) => {
    const exchangeRates = getState().exchangeRatesReducer.data;

    dispatch({
      type: UPDATE,
      payload: {
        which,
        value,
        exchangeRates,
      },
    });
  };
}
