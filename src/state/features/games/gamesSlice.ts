import { apiSlice } from "../api/apiSlice";
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { Wega } from '../../../models';


export const gamesApiSlice = apiSlice.injectEndpoints({
 endpoints: builder => ({
  getGames: builder.query<any, void>({
   query: () => ({
     url: '/games',
     method: 'GET',
   }),
   providesTags: (result) => result ? [ { type: 'Games', id: 'LIST' }, ...result.ids.map((id: any) => ({ type: 'Game' as const, id })) ] : [{ type: 'Games', id: 'LIST' }],
   transformResponse: (response: any) => {
    return gamesAdapter.setAll(gamesInitialState, response.data)
   }
 }),
 createGame: builder.mutation({
   query: () => ({
     url: '/games',
     method: 'POST',
     body: {  }
   }),
   invalidatesTags: () => [ { type: 'Games', id: 'LIST' } ]
  }),
 })
})

export const {
 useGetGamesQuery,
 useCreateGameMutation, 
} = gamesApiSlice;


const gamesAdapter = createEntityAdapter<Wega>();

export const gamesInitialState = gamesAdapter.getInitialState();
export const selectGamesResult = gamesApiSlice.endpoints.getGames.select();
const selectGamesData = createSelector(selectGamesResult, (gamesResult) => gamesResult.data);

export const {
  selectAll: selectAllGames,
  selectById: selectGamesById,
  selectIds: selectAllGamesIds
} = gamesAdapter.getSelectors((state: any) => selectGamesData(state) ?? gamesInitialState);
