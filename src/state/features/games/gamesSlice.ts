import { apiSlice } from "../api/apiSlice";
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { Wega, Wager, AllPossibleWegaTypes, Player } from '../../../models';


export const gamesApiSlice = apiSlice.injectEndpoints({
 endpoints: builder => ({
  getGames: builder.query<any, void>({
   query: () => ({
     url: '/games',
     method: 'GET',
   }),
   providesTags: (result) => result ? [ { type: 'Games', id: 'LIST' }, ...result.ids.map((id: any) => ({ type: 'Game' as const, id })) ] : [{ type: 'Games', id: 'LIST' }],
   transformResponse: (response: any) => {
    return gamesAdapter.setAll(gamesInitialState, response.items)
   }
 }),
 createGame: builder.mutation({
   query: ({ wager, players, gameType }: {
    wager: Wager,
    players: Player[],
    gameType: AllPossibleWegaTypes,
   }) => ({
     url: '/games',
     method: 'POST',
     body: { wager, players, gameType }
   }),
   invalidatesTags: () => [ { type: 'Games', id: 'LIST' } ]
  }),
 })
})

export const {
 useGetGamesQuery,
 useCreateGameMutation, 
} = gamesApiSlice;


const gamesAdapter = createEntityAdapter<Wega>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

export const gamesInitialState = gamesAdapter.getInitialState();
export const selectGamesResult = gamesApiSlice.endpoints.getGames.select();
const selectGamesData = createSelector(selectGamesResult, (gamesResult) => gamesResult.data);

export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectAllGamesIds
} = gamesAdapter.getSelectors((state: any) => selectGamesData(state) ?? gamesInitialState);
