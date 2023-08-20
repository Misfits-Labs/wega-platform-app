import { BigNumber } from "ethers";

export function parseIntFromBigNumber(val: BigNumber | number) {
 if(typeof val == 'object'){
   return parseInt((val as BigNumber)._hex, 16);
 }
 return val;
}
