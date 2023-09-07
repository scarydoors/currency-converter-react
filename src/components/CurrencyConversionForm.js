import { useDispatch, useSelector } from 'react-redux';

import { updateForm } from 'redux/actions/conversionForm';
import Form from 'components/form';
import { currency_info } from 'constants/currencies';

export default function CurrencyConversionForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.conversionFormReducer);

  // higher order function
  const onChange = (which) => (value) => {
    dispatch(updateForm(which, value));
  };

  const fromLabel = `Convert from ${currency_info[form.from.currency].name}`;
  const toLabel = `Convert to ${currency_info[form.to.currency].name}`;

  return (
    <div className="space-y-4">
      <Form.CurrencyInput id="from" label={fromLabel} value={form.from} onChange={onChange('from')} />
      <Form.CurrencyInput id="to" label={toLabel} value={form.to} onChange={onChange('to')} />
    </div>
  );
}
