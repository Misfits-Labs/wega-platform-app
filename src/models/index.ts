import { BigNumber } from "ethers";

// eslint-disable-next-line no-unused-vars
export enum WegaTypesEnum { DICE, COINFLIP, RAFFLE }

export const WegaTypes = {
 [WegaTypesEnum.DICE]: 'DICE',
 [WegaTypesEnum.RAFFLE]: 'RAFFLE',
 [WegaTypesEnum.COINFLIP]: 'COINFLIP',
} as const;

export type AllPossibleWegaTypes = typeof WegaTypes[keyof typeof WegaTypes];

export type Wega = {
 type: AllPossibleWegaTypes;
 date: number;
 wager: Wager
}

// eslint-disable-next-line no-unused-vars
export enum WagerTypesEnum { TOKEN, NFT }

export const WagerTypes = {
 [WagerTypesEnum.TOKEN]: 'TOKEN',
 [WagerTypesEnum.NFT]: 'NFT',
} as const;

export type AllPossibleWagerTypes = typeof WagerTypes[keyof typeof WagerTypes];

// eslint-disable-next-line no-unused-vars
export enum CurrencyTypesEnum { USDC, USDT };

export const CurrencyTypes = {
 [CurrencyTypesEnum.USDC]: 'USDC',
 [CurrencyTypesEnum.USDT]: 'USDT',
} as const;

export type AllPossibleCurrencyTypes = typeof CurrencyTypes[keyof typeof CurrencyTypes];

export type Wager = {
 type: AllPossibleWagerTypes;
 currency: AllPossibleCurrencyTypes;
 player1TokenAmount: number | BigNumber;
 player1TokenAddress: string | `0x${string}`
 player2TokenAddress: string | `0x${string}`
 player2TokenAmount: number | BigNumber;
};
  