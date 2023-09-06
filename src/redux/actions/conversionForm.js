export const UPDATE = "UPDATE";
export const VALIDATE = "VALIDATE";

export function updateForm(which, value) {
  return (dispatch, getState) => {
    const exchangeRates = getState().exchangeRatesReducer.data;
    
    dispatch({
      type: UPDATE,
      payload: {
        which,
        value,
        exchangeRates,
      }
    })
  }
}

// function validateForm(data, validationSchema) {
//   return (dispatch) => {
//     validationSchema.validate(data, {abortEarly: false}).then(
//       () => {
//         dispatch({type: FORM_VALIDATE, payload: {errors: []}})
//       },
//       (err) => {
//         dispatch({type: FORM_VALIDATE, payload: {errors: err.inner}})
//       }
//     );
//   }
// }

