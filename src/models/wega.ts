import { Wager } from './wager';
import { Player } from './player';

// eslint-disable-next-line no-unused-vars
export enum WegaTypesEnum { DICE, COINFLIP, RAFFLE }

export const WegaTypes = {
 [WegaTypesEnum.DICE]: 'DICE',
 [WegaTypesEnum.RAFFLE]: 'RAFFLE',
 [WegaTypesEnum.COINFLIP]: 'COINFLIP',
} as const;

export type AllPossibleWegaTypes = typeof WegaTypes[keyof typeof WegaTypes];

export type Wega = {
 id: number;
 uuid: string;
 gameType: AllPossibleWegaTypes;
 createdAt:  string;
 state: string; 
 wager: Wager;
 expiredAt: string | number;
 players: Player[];
}