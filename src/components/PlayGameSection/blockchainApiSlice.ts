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
   getGameResults: builder.query<any, { gameType: AllPossibleWegaTypes, escrowHash: HexishString, player: HexishString }>({
      query: ({ gameType, escrowHash, player }) => ({
       functionName: 'gameResults',
       contract: ContractTypes.GAMECONTROLLER,
       method: 'READ',
       args: [gameType.toUpperCase(), escrowHash, player]
      }),
      transformResponse: (response: bigint[]) => response.map(r => Number(r))  
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

 