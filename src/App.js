import CurrencyConversionForm from 'components/CurrencyConversionForm';
import UI from 'components/ui';

function App() {
  return (
    <UI.ListContainer>
      <UI.Card>
        <h1 className="text-2xl font-medium mb-2">Currency Converter</h1>
        <CurrencyConversionForm />
      </UI.Card>
    </UI.ListContainer>
  );
}

export default App;
