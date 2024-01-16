import currencyMasker from '../../src/helper/currency.masker';

describe('CurrencyMasker', () => {
  it('Should return masked and number', () => {
    const [masked, num] = currencyMasker('100');

    expect(masked).toStrictEqual('1,00');
    expect(num).toStrictEqual(1);
  });
});
