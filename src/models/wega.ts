import { Wager } from './wager';
import { Player } from './player';
import { AllPossibleCoinSides, HexishString } from '.';

// eslint-disable-next-line no-unused-vars
export enum WegaTypesEnum { DICE, COINFLIP, RAFFLE }

export const WegaTypes = {
 [WegaTypesEnum.DICE]: 'DICE',
 [WegaTypesEnum.RAFFLE]: 'RAFFLE',
 [WegaTypesEnum.COINFLIP]: 'COINFLIP',
} as const;

export type AllPossibleWegaTypes = typeof WegaTypes[keyof typeof WegaTypes];

export type WegaAttributes = ({ key: string; value: string | AllPossibleCoinSides })[] 

export type Wega = {
 id: number;
 creatorUuid: string;
 uuid: string;
 gameType: AllPossibleWegaTypes;
 createdAt:  string;
 state: string; 
 wager: Wager;
 expiredAt: string | number;
 players: Player[];
 requiredPlayerNum: number;
 currentTurn: number;
 gameAttributes?: WegaAttributes;
 gameWinners?: ({ winner: HexishString })[];
 winners?: HexishString[];
}

export type GameInfoType = { currentRound: number, rollerIndex: number, currentTurn: number };
export type PlayerFlipChoices = { playerOne: AllPossibleCoinSides, playerTwo: AllPossibleCoinSides  | undefined }

// eslint-disable-next-line no-unused-vars
export const WegaState = { 
 'PLAYING': 'PLAYING', 
 'PENDING': 'PENDING', 
 'COMPLETED': 'COMPLETED', 
 'CANCELED': 'CANCELED'
} as const;

export type AllPossibleWegaStates = typeof WegaState[keyof typeof WegaState];
