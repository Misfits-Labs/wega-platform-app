import { CurrencyTypes, CurrencyTypesEnum  } from ".";
import { tokenConfig } from "../utils";
import { polygon, polygonMumbai } from "wagmi/chains";

export const SupportedWagerTokenAddresses = (id: number) => ({
 [CurrencyTypes[CurrencyTypesEnum.USDC]]: tokenConfig.address[id as keyof typeof tokenConfig.address],  
 [CurrencyTypes[CurrencyTypesEnum.USDT]]: tokenConfig.address[id as keyof typeof tokenConfig.address],
 [CurrencyTypes[CurrencyTypesEnum.USD]]: tokenConfig.address[id as keyof typeof tokenConfig.address]  
})

export const SupportedBlockExplorers = new Map([
 [polygon.id ?? 137, 'https://polygonscan.com/tx/'],
 [polygonMumbai.id ?? 80001, 'https://mumbai.polygonscan.com/tx/']
])