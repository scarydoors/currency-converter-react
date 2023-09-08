import getSymbolFromCurrency from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import Error from './Error';

const amountRequiredMessage = 'A valid amount is required';
const validationSchema = yup.object({
  currency: yup
    .mixed()
    .when('$currencyOptions', ([currencyOptions], schema) =>
      schema.oneOf(currencyOptions, 'A valid currency is required'),
    ),
  amount: yup
    .number()
    .typeError(amountRequiredMessage)
    .required(amountRequiredMessage)
    .min(0, amountRequiredMessage)
    .test(
      'has-2-dp',
      (message) => `Amount must be to 2 decimal places`,
      (value) => {
        const number = value.toString();

        // account for a scientific notiation number
        return /^[+-]?[0-9]+(?:\.\d{0,2}$)?$/.test(number) || number.toLowerCase().includes('e');
      },
    ),
});

/**
 * Specialized form input for entering amounts of money.
 * @param{string} id - id used for inputs
 * @param{string} label - label which is displayed to the user
 * @param{object} value - value that is assigned to the input e.g. {currency: 'gbp', amount: '2.00'}
 * @param{function} onChange - fires when the value of the input is updated
 * @param{string[]} currencyOptions - array of supported currencies in ISO4217 format
 */
export default function CurrencyInput({ id, label, value, onChange, currencyOptions }) {
  const [errorMessages, setErrorMessages] = useState(null);
  const selectId = `${id}select`;

  // need to use useEffect in-case value is updated by prop change instead of onChange
  useEffect(() => {
    validationSchema.validate(value, { abortEarly: false, context: { currencyOptions } }).then(
      (value) => {
        setErrorMessages(null);
      },
      (errors) => {
        const messages = errors.inner.map((error) => error.message);
        setErrorMessages(messages);
      },
    );
  }, [value, currencyOptions]);

  const getClasses = () => {
    if (errorMessages) {
      return 'ring-red-600 focus:ring-red-600';
    }
    return 'focus:ring-indigo-600';
  };
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 leading-6">
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{getSymbolFromCurrency(value.currency)}</span>
        </div>
        <input
          type="number"
          name="amount"
          id={id}
          className={`block w-full rounded-md border-0 py-3 pl-12 pr-20 ring-1 ring-inset ring-gray-300
                   focus:ring-2 focus:ring-inset sm:text-sm sm-leading-6 ${getClasses()}`}
          value={value.amount}
          placeholder="0.00"
          onChange={(e) => {
            onChange({ currency: value.currency, amount: e.target.value });
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor={selectId} className="sr-only">
            Currency
          </label>
          <select
            id={selectId}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => {
              onChange({ currency: e.target.value, amount: value.amount });
            }}
            value={value.currency}
          >
            {currencyOptions.map((currency, idx) => (
              <option key={idx} label={currency.toUpperCase()} value={currency} />
            ))}
          </select>
        </div>
      </div>
      {errorMessages && errorMessages.map((message, idx) => <Error key={idx} text={message} />)}
    </div>
  );
}
