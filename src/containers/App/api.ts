// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { 
  User,
  type Wega,
  type Player,
  type Wager,
  type AllPossibleWegaTypes
} from '../../models';

console.log('BACKEND-URL', import.meta.env.VITE_BACKEND_API_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  prepareHeaders: (headers) => {
    headers.append('Access-Control-Allow-Origin', '*')
    return headers
  },
});

export const appApiSlice = createApi({
  baseQuery,
  reducerPath: 'platform-api',
  tagTypes: ['Games', 'Game'],
  endpoints: (builder) => ({
    createPlayer: builder.mutation<any, Partial<User> & Pick<User, 'uuid'>>({
      query: (walletAddress) => ({
        url: '/users',
        method: 'POST',
        body: { walletAddress }
      }),
      transformResponse: (response: any) => { 
        return response.uuid 
      },
    }),
    updateGame: builder.mutation<any, { gameUuid: string, newPlayerUuid: string }>({
      query: ({gameUuid , newPlayerUuid }) => ({
        url: `/games/${gameUuid}/join`,
        method: 'PATCH',
        body: { newPlayerUuid, uuid: gameUuid }
      }),
      invalidatesTags: () => [ { type: 'Games', id: 'LIST' } ]
    }),
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
    createGame: builder.mutation<Wega, Partial<Wega> & Pick<Wega, 'wager'> & Pick<Wega, 'gameType'> & Partial<Player>>({
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
});

export const {
  useGetGamesQuery,
  useCreateGameMutation,
  useCreatePlayerMutation,
  useUpdateGameMutation,
 } = appApiSlice;
 
 
const gamesAdapter = createEntityAdapter<Wega>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});


// games  
export const gamesInitialState = gamesAdapter.getInitialState();
export const selectGamesResult = appApiSlice.endpoints.getGames.select();
const selectGamesData = createSelector(selectGamesResult, (gamesResult) => gamesResult.data);
 
export const {
  selectAll: selectAllGames,
  selectById: selectGameById,
  selectIds: selectAllGamesIds
} = gamesAdapter.getSelectors((state: any) => selectGamesData(state) ?? gamesInitialState);



