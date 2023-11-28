import { blockchainApiSlice } from '../../app/blockchainApiSlice';
import { HexishString } from '../../models';
import { ContractTypes } from '../../libs/wagmi';

// Todo 
// write function names with type safety 
export const joinGameBlockchainApiSlice = blockchainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
   depositAndJoinDice: builder.mutation<any, { escrowHash: HexishString, randomness: bigint[] }>({
     query: ({escrowHash, randomness }) => ({
      functionName: 'depositOrPlay',
      contract: ContractTypes.GAMECONTROLLER,
      method: 'WRITE',
      args: [escrowHash, randomness]
     })
    }),
   depositAndJoinCoinflip: builder.mutation<any, { escrowHash: HexishString, playerChoices: number[], randomness: bigint[]}>({
     query: ({ escrowHash, playerChoices, randomness }) => ({
      functionName: 'depositOrPlay',
      contract: ContractTypes.GAMECONTROLLER,
      method: 'WRITE',
      args: [escrowHash, playerChoices, randomness]
     })
    }),
  })
});

export const {
  useDepositAndJoinDiceMutation, 
  useDepositAndJoinCoinflipMutation, 
} = joinGameBlockchainApiSlice;

 