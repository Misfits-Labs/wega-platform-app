import { 
  parseEther, 
  BigNumberish, 
  Interface, 
  toBigInt,
  solidityPackedSha256,
  parseUnits,
  formatUnits,
} from "ethers";
import { Player } from '../models'

export function parseIntFromBigNumber(val: BigNumberish | number) {
 if(typeof val == 'object'){
   return parseInt(val, 10);
 }
 return val;
}
export function exponentialToBigintInWei(val: number, decimals?: number): bigint {
  if(decimals && decimals !== 18) {
    return toBigIntInWei(Number.parseFloat(String(val)).toFixed(18) as string);
  } else {
    return toBigIntInWei(Number.parseFloat(String(val)).toString());
  }
}

export function formatLowerDecimalTokenValue(value: number, tokenDecimals: number) {
  // format(toBigIntInWei(Number.parseFloat(String(wagerAmount)).toFixed(18) as string), 6))
  return tokenDecimals !== 18 ? Math.floor(Number(format(exponentialToBigintInWei(value), tokenDecimals))) : Math.floor(Number(format(toBigIntInWei(String(value)), 18)))
}

export function toBigIntInWei(value: string, decimals?: number): bigint {
  if(decimals) return parseUnits(value, decimals);
  return parseEther(value)
}

export function format(value: BigNumberish, decimals: number): string {
  if(decimals < 18) return formatUnits(value, decimals); // shall parse based on token decimals
  return formatUnits(value) // shall parse as if 1 ether
}

export const miniWalletAddress = (address: `0x${string}` | undefined) => {
  return address?.slice(0, 5) + "..." + address?.slice(address?.length - 3, address?.length)
} 

export function interfaceIdFromAbi(abi: string[]) {
  return new Interface(abi);
}

export function parseTopicDataFromEventLog(txLog: { data: string, topics: Array<string> }, eventAbi: string[]){
  return interfaceIdFromAbi(eventAbi).parseLog({ data: txLog.data, topics: txLog.topics })?.args.toObject();
}

export function parseTopicDataFromEventLogs(txLogs: ({ data: string, topics: Array<string> })[], eventAbi: string[]){
  let parsedData: any | undefined = undefined;
  let i = 0;
  while(!parsedData?.escrowHash) {
    parsedData = interfaceIdFromAbi(eventAbi).parseLog({ data: txLogs[i].data, topics: txLogs[i].topics })?.args.toObject();
    i++;
  }
  return parsedData 
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