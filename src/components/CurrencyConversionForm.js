import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrencyInfoQuery, useGetExchangeRatesByCodeQuery } from 'redux/api/floatrates';
import { updateFrom, updateTo } from 'redux/slices/conversionFormSlice';

import Form from 'components/form';

/**
 * Self-contained form, does not depend on properties, communicates
 * with Redux using the onChange to dispatch actions, and uses Redux
 * Query for data fetching.
 */
export default function CurrencyConversionForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.conversionForm);

  const { data: currencyInfo, error, isFetching } = useGetCurrencyInfoQuery();

  // refetchOnMountOrArgChange is needed to make sure the promise is
  // always fired, the promise is not fired when caching is used
  // TODO: find a better solution because we should probably cache
  const {
    data: fromExchangeRates,
    error: errorExchangeRate,
    isFetching: loadingExchangeRate,
  } = useGetExchangeRatesByCodeQuery(form.from.currency, { refetchOnMountOrArgChange: true });

  if (error || errorExchangeRate) {
    return (
      <div>
        <p>Could not retrieve the exchange rates. Please check your internet connection.</p>
      </div>
    );
  }

  const onChange = (which) => (value) => {
    if (which === 'from') {
      dispatch(updateFrom({ value, fromExchangeRates }));
    } else if (which === 'to') {
      dispatch(updateTo({ value, fromExchangeRates }));
    }
  };

  const { currencyNameMap, supportedCurrencies } = currencyInfo || {};

  const fromLabel = !isFetching && `Convert from ${currencyNameMap[form.from.currency]}`;
  const toLabel = !isFetching && `Convert to ${currencyNameMap[form.to.currency]}`;

  return (
    <div className="space-y-4">
      <Form.CurrencyInput
        id="from"
        label={fromLabel}
        value={form.from}
        loading={isFetching}
        onChange={onChange('from')}
        currencyOptions={supportedCurrencies}
      />
      <Form.CurrencyInput
        id="to"
        label={toLabel}
        value={form.to}
        onChange={onChange('to')}
        loading={isFetching || loadingExchangeRate}
        currencyOptions={supportedCurrencies}
      />
    </div>
  );
}
