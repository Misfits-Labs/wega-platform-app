import { CurrencyTypes, CurrencyTypesEnum  } from ".";
import { tokenConfig } from "../utils";

export const SupportedWagerTokenAddresses = (id: number) => ({
 [CurrencyTypes[CurrencyTypesEnum.USDC]]: tokenConfig.address[id as keyof typeof tokenConfig.address],  
 [CurrencyTypes[CurrencyTypesEnum.USDT]]: tokenConfig.address[id as keyof typeof tokenConfig.address],
 [CurrencyTypes[CurrencyTypesEnum.USD]]: tokenConfig.address[id as keyof typeof tokenConfig.address]  
})