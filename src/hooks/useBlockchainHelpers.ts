import { useAsyncFn } from 'react-use';
import { BlockchainAPI } from '../state/features/blockchain/blokchainApi';
import { utils, BigNumber} from 'ethers';

export function useBlockchainHelpers(){
 const blockchainApi = new BlockchainAPI();
 
 // check for approvals
 const wagerApprovalQuery = useAsyncFn(async (
   tokenAddress: `0x${string}`, 
   owner: `0x${string}`,  
   wager: number
 ) => {
   return await blockchainApi.isEscrowApproved(tokenAddress, owner, wager);
 });

 // check for approvals
 const wagerApprovalMutation = useAsyncFn(async (
   tokenAddress: `0x${string}`, 
   wager: number
 ) => {
   const wagerAsBigInt = utils.parseEther(String(wager)).toBigInt(); 
   return await blockchainApi.approveERC20(tokenAddress, wagerAsBigInt);
 });
 
 // check for approvals
 const createWagerMutation = useAsyncFn(async ({ token, creator, numberOfPlayers, wager }: {
   token?: `0x${string}`;
   creator: `0x${string}`;
   numberOfPlayers: number;
   wager: number;
  }
 ) => {
   const wagerAsBigInt = utils.parseEther(String(wager)).toBigInt(); 
   const accountsCount = BigNumber.from(String(numberOfPlayers)).toBigInt(); 
   return await blockchainApi.createWagerAndDeposit({ token, creator, accountsCount, wager: wagerAsBigInt
   });
 });

 return {
  wagerApprovalQuery: { approved: wagerApprovalQuery[0], wagerApproval: wagerApprovalQuery[1]}, 
  wagerApprovalMutation: { approved: wagerApprovalMutation[0], wagerApproval: wagerApprovalMutation[1]},
  createWagerMutation: { wager: createWagerMutation[0], createWager: createWagerMutation[1] }, 
 }
}
