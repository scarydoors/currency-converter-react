import UI from 'components/ui';
import Form from 'components/form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from 'redux/actions/exchangeRates';

function App() {
  const dispatch = useDispatch();
  const {loading, error, data} = useSelector(state => state.exchangeRatesReducer);
  
  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, []);
  
  return (
    <UI.CenterContainer>
      <UI.Card>
        <h1 className="text-2xl font-medium mb-2">Currency Converter</h1>
        <Form.CurrencyInput/>
      </UI.Card>
    </UI.CenterContainer>
  );
}

export default App;
