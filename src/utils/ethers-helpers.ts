import { 
  parseEther, 
  BigNumberish, 
  Interface, 
  toBigInt,
  solidityPackedSha256 
} from "ethers";
import { Player } from '../models'

export function parseIntFromBigNumber(val: BigNumberish | number) {
 if(typeof val == 'object'){
   return parseInt(val, 10);
 }
 return val;
}

export function toBigIntInWei(value: number): bigint {
  return parseEther(String(value))
}

export const miniWalletAddress = (address: `0x${string}` | undefined) => {
  return address?.slice(0, 6) + "..."
} 

export function interfaceIdFromAbi(abi: string[]) {
  return new Interface(abi);
}

export function parseTopicDataFromEventLog(txLog: { data: string, topics: Array<string>}, eventAbi: string[]){
  return interfaceIdFromAbi(eventAbi).parseLog(txLog)?.args.toObject();
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

export function convertBytesToNumber(bytes: string): bigint {
  return toBigInt(solidityPackedSha256(['bytes'],["0x".concat(bytes)]));
 }