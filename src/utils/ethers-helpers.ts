import { BigNumber } from "ethers";
import { Player } from '../models'

export function parseIntFromBigNumber(val: BigNumber | number) {
 if(typeof val == 'object'){
   return parseInt((val as BigNumber)._hex, 16);
 }
 return val;
}

export const miniWalletAddress = (address: `0x${string}` | undefined) => {
  return address?.slice(0, 6) + "..."
}

export function isGameCreator(
  connectedPlayerUUid: string | undefined,
  players: Player | any, 
): boolean {
  if(players[0].uuid === connectedPlayerUUid){
    return true;
  } 
  return false;
}