// TODO name config
import { CurrencyTypes, CurrencyTypesEnum  } from ".";
import { tokenConfig } from "../utils";
import { polygon, polygonMumbai } from "wagmi/chains";

export const SupportedWagerTokenAddresses = {
 [CurrencyTypes[CurrencyTypesEnum.USDC]]: {
  [polygon.id as number ?? 137]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  [polygonMumbai.id as number ?? 80001]: tokenConfig.address[80001]
 },  
 [CurrencyTypes[CurrencyTypesEnum.USDT]]: {
  [polygon.id as number ?? 137]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  [polygonMumbai.id as number ?? 80001]: tokenConfig.address[80001],
 },
}

export const SupportedBlockExplorers = new Map([
 [polygon.id ?? 137, 'https://polygonscan.com/tx/'],
 [polygonMumbai.id ?? 80001, 'https://mumbai.polygonscan.com/tx/']
])


export const windowIsCurrentlyMobileQuery = '(max-width: 639px)';

export const  defaultNetwork = polygon;
