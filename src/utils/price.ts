import { AllPossibleCurrencyTypes } from "../models";

interface IPriceAPI {
 // eslint-disable-next-line no-unused-vars
 fetchUsdPriceOf(token: AllPossibleCurrencyTypes): Promise<number>;
}

class CryptoComparePriceApi implements IPriceAPI {
 private baseUrl: string = 'https://min-api.cryptocompare.com';
 async fetchUsdPriceOf(token: AllPossibleCurrencyTypes) {
  try {
   const response = await fetch(this.parseUrlForUSDPriceFetch(token));
   const data = await response.json();
   return data.USD;
  } catch (e) {
   console.log(e);
  }
 };
 parseUrlForUSDPriceFetch(token: AllPossibleCurrencyTypes): string {
  return `${this.baseUrl}/data/price?fsym=${token}&tsyms=USD`
 }
}
export const cryptoComparePriceApi = new CryptoComparePriceApi(); 

