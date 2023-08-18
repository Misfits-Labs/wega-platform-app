// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { Wega } from '../../../models';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  credentials: 'include',
});


export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Game', 'Games'],
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => ({
        url: '/games',
        method: 'GET',
      }),
      transformResponse: (games: Wega[]) => {
       // should transform into wega object
       return gamesAdapter.setAll(gamesInitialState, games)
      },
      providesTags: (result) => result ?
        [ { type: 'Games', id: 'LIST' },
        ...result.ids.map((id: any) => ({ type: 'Game', id }))
        ] : [ { type: 'Games', id: 'LIST' } ],
    }),
    createGame: builder.mutation({
      query: () => ({
        url: '/games',
        method: 'POST',
        body: {  }
      }),

     invalidatesTags: () => [
        { type: 'Games', id: 'LIST' },
      ]
    }),
    createPlayer: builder.mutation({
      query: (walletAddress) => ({
        url: '/users',
        method: 'POST',
        body: { walletAddress }
      }),
    }), 
  })
});

export const {
 useGetGamesQuery,
 useCreateGameMutation, 
 useCreatePlayerMutation,
} = apiSlice;

const gamesAdapter = createEntityAdapter<Wega>({
 sortComparer: false,
});

export const gamesInitialState = gamesAdapter.getInitialState();

const selectGamesResult = apiSlice.endpoints.getGames.select();

const selectGamesData = createSelector(
  selectGamesResult,
  (gamesResult) => gamesResult.data
);

export const {
  selectAll: selectAllGames,
  selectById: selectGamesById,
  selectIds: selectAllGamesIds
} = gamesAdapter.getSelectors(
  (state) => selectGamesData(state) ?? gamesAdapter.getInitialState()
);
