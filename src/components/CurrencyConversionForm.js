import Form from 'components/form';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from 'redux/actions/conversionForm';

export default function CurrencyConversionForm() {
  const dispatch = useDispatch();
  const form = useSelector(state => state.conversionFormReducer);

  // higher order function
  const onChange = which => (value) => {
    dispatch(updateForm(which, value))
  }
  
  return (
    <div className="space-y-4">
      <Form.CurrencyInput
        id="from"
        label="From"
        value={form.from}
        onChange={onChange("from")}
      />
      <Form.CurrencyInput
        id="to"
        label="To"
        value={form.to}
        onChange={onChange("to")}
      />
    </div>
  );
}
