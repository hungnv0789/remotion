export const calculateTrade = (shares: number, buyPrice: number, sellPrice: number) => {
  if (!Number.isInteger(shares) || shares <= 0 || ![buyPrice, sellPrice].every((price) => Number.isFinite(price) && price >= 0)) {
    throw new Error('Số cổ phiếu và giá giao dịch không hợp lệ.');
  }
  const capital = shares * buyPrice;
  const proceeds = shares * sellPrice;
  return { capital, proceeds, grossProfit: proceeds - capital, priceDifference: sellPrice - buyPrice };
};
export const numberVi = (value: number, maximumFractionDigits = 1) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits }).format(value);
export const million = (value: number) => numberVi(value / 1_000_000);
