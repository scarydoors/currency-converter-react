import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from 'redux/actions/exchangeRates';

import UI from 'components/ui';
import CurrencyConversionForm from 'components/CurrencyConversionForm';

function App() {
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.exchangeRatesReducer);

  // data part of application, needed before the form is operable
  useEffect(() => {
    dispatch(fetchExchangeRates());
  }, [dispatch]);
  
  return (
    <UI.CenterContainer
      loading={loading}
      loadingRender={
        <div className="text-center space-y-6 p-6">
          <UI.Spinner className="w-16 h-16"/>
          <p>Loading Conversion Rates...</p>
        </div>
      }
      error={error}
      errorRender={
        <div className="text-center space-y-6 p-6">
          <p>Could not retrieve the exchange rates. Please check your internet connection.</p>
        </div>
      }>
      <UI.Card>
        <h1 className="text-2xl font-medium mb-2">Currency Converter</h1>
        <CurrencyConversionForm />
      </UI.Card>
    </UI.CenterContainer>
  );
}

export default App;
