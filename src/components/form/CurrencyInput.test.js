import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyInput from './CurrencyInput';

describe('<CurrencyInput /> validations', () => {
  const id = 'currencyInput';
  const onChange = jest.fn();
  const label = 'Amount';
  const currencyOptions = ['gbp', 'aud'];

  const setup = async (value) => {
    return act(() => {
      render(
        <CurrencyInput id={id} label={label} onChange={onChange} value={value} currencyOptions={currencyOptions} />,
      );
    });
  };

  test('amount required validation works', async () => {
    await setup({ currency: 'aud', amount: '' });
    expect(screen.queryByText('A valid amount is required')).toBeInTheDocument();
  });

  test('amount min validation works', async () => {
    await setup({ currency: 'aud', amount: '-2.00' });
    expect(screen.queryByText('A valid amount is required')).toBeInTheDocument();
  });

  test('amount scientific number validation works', async () => {
    await setup({ currency: 'aud', amount: '2.002343234234234e+24' });
    expect(screen.queryByText('Amount must be to 2 decimal places')).toBeNull();
  });

  test('amount valid value validation works', async () => {
    await setup({ currency: 'aud', amount: '2.00' });
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
