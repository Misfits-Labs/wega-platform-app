import { BigNumber, utils } from "ethers";
import { Player } from '../models'

export function parseIntFromBigNumber(val: BigNumber | number) {
 if(typeof val == 'object'){
   return parseInt((val as BigNumber)._hex, 16);
 }
 return val;
}

export function toBigIntInWei(value: number): bigint {
  return utils.parseEther(String(value)).toBigInt()
}

export const miniWalletAddress = (address: `0x${string}` | undefined) => {
  return address?.slice(0, 6) + "..."
}

export function interfaceIdFromAbi(abi: string[]) {
  return new utils.Interface(abi);
}

export function parseTopicDataFromEventLog(txLog: any, eventAbi: string[]){
  return interfaceIdFromAbi(eventAbi).parseLog(txLog).args;
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