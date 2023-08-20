import { BigNumber } from "ethers";

// eslint-disable-next-line no-unused-vars
export enum WegaTypesEnum { DICE, COINFLIP, RAFFLE }

export const WegaTypes = {
 [WegaTypesEnum.DICE]: 'DICE',
 [WegaTypesEnum.RAFFLE]: 'RAFFLE',
 [WegaTypesEnum.COINFLIP]: 'COINFLIP',
} as const;

export type AllPossibleWegaTypes = typeof WegaTypes[keyof typeof WegaTypes];

export type Player = {
 id?: number;
 uuid: string;
 walletAddress?: string | `0x${string}`;
} 

export type Wega = {
 uuid?: string;
 gameType: AllPossibleWegaTypes;
 createdAt:  string;
 state?: string; 
 wager: Wager;
 expiredAt?: string | number;
 players?: Player[];
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
 uuid?: string;
 wagerType: AllPossibleWagerTypes;
 wagerHash: string;
 tokenAddress: string | `0x${string}`;
 wagerAmount: string | number | BigNumber;
 wagerCurrency: AllPossibleCurrencyTypes;
 nonce?: number;
 isWagerSpendApproved?: string;
};
  