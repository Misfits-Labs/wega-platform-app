// eslint-disable-next-line no-unused-vars
export enum CoinSideTypesEnum { HEADS, TAILS };
export const CoinSideTypes = {
 [CoinSideTypesEnum.HEADS]: 1,
 [CoinSideTypesEnum.TAILS]: 2,
} as const;
export type AllPossibleCoinSides = typeof CoinSideTypes[keyof typeof CoinSideTypes];