import { blockchainApiSlice } from '../../app/blockchainApiSlice';
import { HexishString } from '../../models';
import { ContractTypes } from '../../libs/wagmi';


// Todo 
  // write function names with type safety 
export const modalsBlockchainApiSlice = blockchainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
   calculateFeesForTransfer: builder.query<any, { feeApplier: HexishString, transferAmount: bigint }>({
       query: ({ feeApplier, transferAmount }) => ({
        functionName: 'calculateFeesForTransfer',
        contract: ContractTypes.FEE_MANAGER,
        method: 'READ',
        args: [feeApplier, transferAmount]
       })
   }),
   withdraw: builder.mutation<any, { escrowHash: HexishString }>({
      query: ({ escrowHash }) => ({
       functionName: 'withdraw',
       contract: ContractTypes.ERC20ESCROW,
       method: 'WRITE',
       args: [escrowHash]
      })
    }),
   getClaimAmount: builder.query<any, { escrowHash: HexishString, account: HexishString }>({
       query: ({ escrowHash, account }) => ({
        functionName: 'getClaimAmount',
        contract: ContractTypes.ERC20ESCROW,
        method: 'READ',
        args: [escrowHash, account]
       })
     })
   })
});

export const { useCalculateFeesForTransferQuery, useWithdrawMutation, useGetClaimAmountQuery } = modalsBlockchainApiSlice;

 