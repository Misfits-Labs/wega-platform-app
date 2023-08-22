// eslint-disable-next-line no-unused-vars
export enum CurrencyTypesEnum { USDC, USDT };
export const CurrencyTypes = {
 [CurrencyTypesEnum.USDC]: 'USDC',
 [CurrencyTypesEnum.USDT]: 'USDT',
} as const;
export type AllPossibleCurrencyTypes = typeof CurrencyTypes[keyof typeof CurrencyTypes];