import { blockchainApiSlice } from '../../app/blockchainApiSlice';
import { 
  AllPossibleWegaTypes, 
  HexishString 
} from '../../models';
import { ContractTypes } from '../../libs/wagmi';
import { formatEther } from 'ethers';

// Todo 
  // write function names with type safety 
export const createGameBlockchainApiSlice = blockchainApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWagerAndDeposit: builder.mutation<any, { tokenAddress: HexishString, wagerAsBigint: bigint, gameType: AllPossibleWegaTypes }>({
       query: ({ tokenAddress, wagerAsBigint, gameType }) => ({
        functionName: 'createGame',
        contract: ContractTypes.GAMECONTROLLER,
        method: 'WRITE',
        args: [gameType, tokenAddress, wagerAsBigint]
       })
     }),
    approveERC20: builder.mutation<any, { tokenAddress: HexishString, spender: HexishString, wagerAsBigint: bigint }>({
       query: ({ spender, wagerAsBigint, tokenAddress }) => ({
        functionName: 'approve',
        method: 'WRITE',
        contract: ContractTypes.TOKEN,
        contractAddress: tokenAddress,
        args: [spender, wagerAsBigint]
       }),
     }),
    allowance: builder.query<any, { spender: HexishString, owner: HexishString, tokenAddress: HexishString }> ({
        query: ({ owner, spender, tokenAddress }) => ({
          functionName: 'allowance',
          method: 'READ',
          contract: ContractTypes.TOKEN,
          contractAddress: tokenAddress,
          args: [owner, spender]
        }),
        transformResponse: (response: any) => formatEther(response.toString()) 
      }),
    hash: builder.query<any, { tokenAddress: HexishString,  numPlayers: bigint, wagerAsBigint: bigint, playerAddress: HexishString, nonce: bigint }> ({
        query: ({ tokenAddress, numPlayers, playerAddress, nonce, wagerAsBigint }) => ({
          functionName: 'hash',
          method: 'READ',
          contract: ContractTypes.ERC20ESCROW,
          args: [tokenAddress, playerAddress, numPlayers, wagerAsBigint, nonce]
        }),
    }),
    currentNonce: builder.query<any, { playerAddress: HexishString }> ({
        query: ({ playerAddress }) => ({
          functionName: 'currentNonce',
          method: 'READ',
          contract: ContractTypes.ERC20ESCROW,
          args: [playerAddress]
        }),
      })
    })
});

export const {
  useCreateWagerAndDepositMutation, 
  useApproveERC20Mutation,
  useAllowanceQuery,
  useHashQuery,
  useCurrentNonceQuery,
} = createGameBlockchainApiSlice;

 