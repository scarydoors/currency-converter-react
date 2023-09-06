import {useState, useEffect} from 'react';
import * as yup from 'yup';
import {currencies} from 'constants/currencies';
import Error from './Error'

const validationSchema = yup.object({
  currency: yup.string().required("werw"),
  amount: yup
    .number()
    .typeError("A valid amount is required")
    .required("An amount is required")
    .min(0, "A valid amount is required")
    .test(
      "has-2-dp",
      (message) => `Amount must be to 2 decimal places`,
      (value) => {
        const number = value.toString();
        console.log(number)
        return /^[0-9]+(?:\.\d{0,2}$)?$/.test(number)
      }
    ),
});

const currencyOptions = currencies.map((currency) => ({label: currency.toUpperCase(), value: currency}));

export default function CurrencyInput({id, label, value, onChange}) {
  const [error, setError] = useState(null);
  const selectId = `${id}select`;

  useEffect(() => {
    validationSchema.validate(value, { abortEarly: false }).then(
      (value) => {
        setError(null);
      },
      (errors) => {
        // show only first error to reduce clutter (UX)
        setError(errors.inner[0].message);
      }
    )
  }, [value])

  const getClasses = () => {
    if (error) {
      return "ring-red-600 focus:ring-red-600";
    }
    return "focus:ring-indigo-600";
  }
  return (
    <div>
      <label htmlFor={id}
             className="block text-sm font-medium leading-6 text-gray-900 leading-6"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="number"
          name="amount"
          id={id}
          className={`block w-full rounded-md border-0 py-3 pl-7 pr-20 ring-1 ring-inset ring-gray-300
                   focus:ring-2 focus:ring-inset sm:text-sm sm-leading-6 ${getClasses()}`}
          value={value.amount}
          placeholder="0.00"
          onChange={(e) => {
            onChange({currency: value.currency, amount: e.target.value});
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor={selectId} className="sr-only">Currency</label>
          <select
            id={selectId}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => {
              onChange({currency: e.target.value, amount: value.amount})
            }}
            value={value.currency}
          >
            {
              currencyOptions.map((option, idx) => (
                <option key={idx} label={option.label} value={option.value}/>
              ))
            }
          </select>
        </div>
      </div>
      <Error text={error} />
    </div>
  )
}
