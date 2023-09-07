import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from 'redux/actions/conversionForm';

import Form from 'components/form';

/**
 * Self-contained form, does not depend on properties, communicates
 * with Redux using the onChange to dispatch actions.
 */
export default function CurrencyConversionForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.conversionFormReducer);
  const { codeNamesMap } = useSelector((state) => state.exchangeRatesReducer);

  // HOC
  const onChange = (which) => (value) => {
    dispatch(updateForm(which, value));
  };

  const fromLabel = `Convert from ${codeNamesMap[form.from.currency]}`;
  const toLabel = `Convert to ${codeNamesMap[form.to.currency]}`;

  const currencyOptions = Object.keys(codeNamesMap);

  return (
    <div className="space-y-4">
      <Form.CurrencyInput
        id="from"
        label={fromLabel}
        value={form.from}
        onChange={onChange('from')}
        currencyOptions={currencyOptions}
      />
      <Form.CurrencyInput
        id="to"
        label={toLabel}
        value={form.to}
        onChange={onChange('to')}
        currencyOptions={currencyOptions}
      />
    </div>
  );
}
