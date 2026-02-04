export function formatMoney(amount: number, currency: string) {
  const normalizedCurrency =
    currency === 'GHC' || currency === 'USD' || currency === '$' ? 'GHS' : currency;
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: normalizedCurrency
  }).format(amount / 100);
}
