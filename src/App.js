import UI from 'components/ui';
import CurrencyConversionForm from 'components/CurrencyConversionForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from 'redux/actions/exchangeRates';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchExchangeRates())
  }, []);
  
  return (
    <UI.CenterContainer>
      <UI.Card>
        <h1 className="text-2xl font-medium mb-2">Currency Converter</h1>
        <CurrencyConversionForm />
      </UI.Card>
    </UI.CenterContainer>
  );
}

export default App;
