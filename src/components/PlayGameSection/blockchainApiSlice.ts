import { blockchainApiSlice } from '../../app/blockchainApiSlice';
import { 
  AllPossibleWegaTypes, 
  HexishString 
} from '../../models';
import { ContractTypes } from '../../libs/wagmi';

// Todo
  // write function names with type safety 
export const playGameBlockchainApiSlice = blockchainApiSlice.injectEndpoints({
 endpoints: (builder) => ({
   getGameResults: builder.query<any, { gameType: AllPossibleWegaTypes, escrowHash: HexishString, players: HexishString[] }>({
      query: ({ gameType, escrowHash, players }) => ({
       functionName: 'gameResults',
       contract: ContractTypes.GAMECONTROLLER,
       method: 'READ',
       args: [gameType.toUpperCase(), escrowHash, players]
      }),
      transformResponse: (response: bigint[][]) => response.map((r:bigint[]) => r.map((r: bigint) => Number(r)))
       
    }),
   getGameWinners: builder.query<any, { gameType: AllPossibleWegaTypes, escrowHash: HexishString }>({
      query: ({ gameType, escrowHash }) => ({
       functionName: 'winners',
       method: 'READ',
       contract: ContractTypes.GAMECONTROLLER,
       args: [gameType.toUpperCase(), escrowHash]
      }),
    }),
   })
});
export const {
 useGetGameResultsQuery, 
 useGetGameWinnersQuery,
} = playGameBlockchainApiSlice;

 