const currencyFormatter = (num: number, showSymbol = true) => {
  const symbol = showSymbol ? 'R$ ' : '';
  return (
    symbol + num
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .replace('.', ',')
      .replace(',', '.')
  );
};

export default currencyFormatter;
