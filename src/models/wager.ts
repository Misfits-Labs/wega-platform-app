import { BigNumberish } from 'ethers';
import { AllPossibleCurrencyTypes } from './currency';

// eslint-disable-next-line no-unused-vars
export enum WagerTypesEnum { TOKEN, NFT }

export const WagerTypes = {
 [WagerTypesEnum.TOKEN]: 'TOKEN',
 [WagerTypesEnum.NFT]: 'NFT',
} as const;

export type AllPossibleWagerTypes = typeof WagerTypes[keyof typeof WagerTypes];

export type Wager = {
 uuid?: string;
 wagerType: AllPossibleWagerTypes;
 wagerHash: string;
 tokenAddress: string | `0x${string}`;
 wagerAmount: BigNumberish;
 wagerCurrency: AllPossibleCurrencyTypes;
 nonce?: number;
 isWagerSpendApproved?: string;
};