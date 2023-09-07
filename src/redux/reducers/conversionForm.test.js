import reducer from './conversionForm';
import { updateForm, UPDATE } from 'redux/actions/conversionForm';
import 'jest';

const mockExchangeRates = {
  usd: {
    gbp: { rate: 2, date: new Date() },
  },
  gbp: {
    usd: { rate: 2, date: new Date() },
  },
  aud: {
    usd: { rate: 3, date: new Date() },
    gbp: { rate: 4, date: new Date() },
  },
};

describe('conversionForm Reducer', () => {
  test("from is updated when to's amount changes", () => {
    const previousState = {
      from: { currency: 'usd', amount: '0.00' },
      to: { currency: 'gbp', amount: '0.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'from',
        value: { currency: 'usd', amount: '2.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'usd', amount: '2.00' },
      to: { currency: 'gbp', amount: '4.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });

  test("to is updated when from's amount changes", () => {
    const previousState = {
      from: { currency: 'usd', amount: '0.00' },
      to: { currency: 'gbp', amount: '0.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'to',
        value: { currency: 'gbp', amount: '2.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'usd', amount: '4.00' },
      to: { currency: 'gbp', amount: '2.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });
  test("from is updated when to's currency changes", () => {
    const previousState = {
      from: { currency: 'usd', amount: '10.00' },
      to: { currency: 'gbp', amount: '20.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'to',
        value: { currency: 'aud', amount: '29.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'usd', amount: '87.00' },
      to: { currency: 'aud', amount: '29.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });

  test("to is updated when from's currency changes", () => {
    const previousState = {
      from: { currency: 'usd', amount: '10.00' },
      to: { currency: 'gbp', amount: '20.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'from',
        value: { currency: 'aud', amount: '29.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'aud', amount: '29.00' },
      to: { currency: 'gbp', amount: '116.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });

  test('same currency has rate of 1', () => {
    const previousState = {
      from: { currency: 'gbp', amount: '0.00' },
      to: { currency: 'gbp', amount: '0.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'from',
        value: { currency: 'gbp', amount: '22.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'gbp', amount: '22.00' },
      to: { currency: 'gbp', amount: '22.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });

  test("when to has negative amount from doesn't change", () => {
    const previousState = {
      from: { currency: 'gbp', amount: '0.00' },
      to: { currency: 'gbp', amount: '0.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'to',
        value: { currency: 'gbp', amount: '-22.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'gbp', amount: '0.00' },
      to: { currency: 'gbp', amount: '-22.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });

  test("when from has negative amount to doesn't change", () => {
    const previousState = {
      from: { currency: 'gbp', amount: '0.00' },
      to: { currency: 'gbp', amount: '0.00' },
    };
    const action = {
      type: UPDATE,
      payload: {
        which: 'from',
        value: { currency: 'gbp', amount: '-22.00' },
        exchangeRates: mockExchangeRates,
      },
    };
    const expected = {
      from: { currency: 'gbp', amount: '-22.00' },
      to: { currency: 'gbp', amount: '0.00' },
    };
    expect(reducer(previousState, action)).toStrictEqual(expected);
  });
});
