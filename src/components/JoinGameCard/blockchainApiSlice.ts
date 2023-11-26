import { blockchainApiSlice } from '../../app/blockchainApiSlice';
import { HexishString } from '../../models';
import { ContractTypes } from '../../libs/wagmi';

// Todo 
  // write function names with type safety 
export const joinGameBlockchainApiSlice = blockchainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
   depositAndJoinDice: builder.mutation<any, { escrowHash: HexishString }>({
     query: ({escrowHash}) => ({
      functionName: 'depositOrPlay',
      contract: ContractTypes.GAMECONTROLLER,
      method: 'WRITE',
      args: [escrowHash]
     })
    }),
   depositAndJoinCoinflip: builder.mutation<any, { escrowHash: HexishString, playerChoices: number[] }>({
     query: ({ escrowHash, playerChoices}) => ({
      functionName: 'depositOrPlay',
      contract: ContractTypes.GAMECONTROLLER,
      method: 'WRITE',
      args: [escrowHash, playerChoices]
     })
    }),
  })
});

export const {
  useDepositAndJoinDiceMutation, 
  useDepositAndJoinCoinflipMutation, 
} = joinGameBlockchainApiSlice;

 