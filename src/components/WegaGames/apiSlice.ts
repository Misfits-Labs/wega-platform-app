// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { appApiSlice } from '../../app/apiSlice';
import { Wega } from '../../models';

export const gamesApiSlice = appApiSlice.injectEndpoints({ 
 endpoints: (builder) => ({
  getGames: builder.query<any, any>({
   query: (filterData = undefined) => {
     return ({
       url: filterData ? `/games?${Object.keys(filterData).map((key: any, index: number) => index !== 0 ? `&${key}=${filterData[key]}` : `${key}=${filterData[key]}` ).join('')}` : '/games?sort=-createdAt',
       method: 'GET',
     })
   },
   providesTags: (result) => result ? [ { type: 'Games', id: 'LIST' }, ...result.ids.map((id: any) => ({ type: 'Game' as const, id })) ] : [{ type: 'Games', id: 'LIST' }],
   transformResponse: (response: any) => {
     return gamesAdapter.setAll(gamesInitialState, response.items)
   }
 }),
 }),
 overrideExisting: true,
})
gamesApiSlice.enhanceEndpoints({ addTagTypes: ['Games'] });

export const { useGetGamesQuery } = gamesApiSlice;
const gamesAdapter = createEntityAdapter<Wega>({
  sortComparer: (a, b) => {
    return a.createdAt.localeCompare(b.createdAt);
  }, 
});

// games  
export const gamesInitialState = gamesAdapter.getInitialState();
export const selectGamesResult = gamesApiSlice.endpoints.getGames.select(undefined);
const selectGamesData = createSelector(selectGamesResult, (gamesResult) => gamesResult.data);

export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectAllGamesIds,
  selectTotal: selectGamesCount,
} = gamesAdapter.getSelectors((state: any) => selectGamesData(state) ?? gamesInitialState);