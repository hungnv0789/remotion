export const calculateSavings = (principal: number, lowerRate: number, higherRate: number, years = 1) => {
  if (![principal, lowerRate, higherRate, years].every(Number.isFinite) || principal < 0 || years <= 0 || lowerRate < 0 || higherRate < lowerRate) {
    throw new Error('Số tiền, kỳ hạn hoặc thứ tự lãi suất không hợp lệ.');
  }
  const lowerInterest = Math.round(principal * lowerRate / 100 * years);
  const higherInterest = Math.round(principal * higherRate / 100 * years);
  const difference = higherInterest - lowerInterest;
  return { lowerInterest, higherInterest, difference, monthlyDifference: difference / (years * 12) };
};
export const numberVi = (value: number, maximumFractionDigits = 1) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits }).format(value);
export const million = (value: number) => numberVi(value / 1_000_000);
