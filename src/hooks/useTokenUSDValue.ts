import { cryptoComparePriceApi } from "../utils/price"
import { useAsync } from 'react-use';
import { AllPossibleCurrencyTypes } from "../models";
export function useTokenUSDValue(token: AllPossibleCurrencyTypes, amount: number) {
  const price = useAsync(async () => {
   const price = Number(await cryptoComparePriceApi.fetchUsdPriceOf(token));
   return parseFloat(String(amount * price)).toFixed(2);
  }, [token, amount]);
  return price;
}
