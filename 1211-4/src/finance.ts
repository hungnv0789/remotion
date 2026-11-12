export const vndFromUsdBillions = (usdBillions: number, vndPerUsd: number) => {
  if (![usdBillions, vndPerUsd].every(Number.isFinite) || usdBillions < 0 || vndPerUsd <= 0) throw new Error('Giả định USD hoặc tỷ giá không hợp lệ.');
  return { vnd: usdBillions * 1_000_000_000 * vndPerUsd, vndBillions: usdBillions * vndPerUsd };
};
export const numberVi = (value: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(value);
