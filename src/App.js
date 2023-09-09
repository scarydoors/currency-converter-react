import CurrencyConversionForm from 'components/CurrencyConversionForm';
import UI from 'components/ui';

function App() {
  return (
    <UI.ListContainer
      loading={false}
      loadingRender={
        <div className="text-center space-y-6 p-6">
          <UI.Spinner className="w-16 h-16" />
          <p>Loading Conversion Rates...</p>
        </div>
      }
      error={false}
      errorRender={
        <div className="text-center space-y-6 p-6">
          <p>Could not retrieve the exchange rates. Please check your internet connection.</p>
        </div>
      }
    >
      <UI.Card>
        <h1 className="text-2xl font-medium mb-2">Currency Converter</h1>
        <CurrencyConversionForm />
      </UI.Card>
    </UI.ListContainer>
  );
}

export default App;
