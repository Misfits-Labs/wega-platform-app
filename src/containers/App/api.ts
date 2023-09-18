// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { 
  User,
  type Wega,
  type Player,
  type Wager,
  type AllPossibleWegaTypes,
  type WegaAttributes
} from '../../models';

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
    joinGame: builder.mutation<any, { gameUuid: string, newPlayerUuid: string,  gameAttributes?: WegaAttributes }>({
      query: ({ gameUuid , newPlayerUuid, gameAttributes }) => ({
        url: `/games/${gameUuid}/join`,
        method: 'PATCH',
        body: { newPlayerUuid, uuid: gameUuid, gameAttributes }
      }),
      invalidatesTags: () => [ { type: 'Games', id: 'LIST' } ]
    }),
    updateGame: builder.mutation<any, Partial<Wega>>({
      query: ({ uuid, ...updates }) => {
        return ({
          url: `/games/${uuid}`,
          method: 'PATCH',
          body: { uuid, ...updates }
        })
      },
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
    createGame: builder.mutation<Wega, Partial<Wega> & Pick<Wega, 'creatorUuid'> & Pick<Wega, 'wager'> & Pick<Wega, 'gameType'> & Pick<Wega, 'gameAttributes'> & Partial<Player>>({
      query: ({ wager, players, gameType, creatorUuid, gameAttributes }: {
       wager: Wager,
       players: Player[],
       gameType: AllPossibleWegaTypes,
       creatorUuid: string;
       gameAttributes?: WegaAttributes;
      }) => ({
        url: '/games',
        method: 'POST',
        body: { wager, players, gameType, creatorUuid, gameAttributes }
      }),
      invalidatesTags: () => [ { type: 'Games', id: 'LIST' } ]
     }),
  })
});

export const {
  useGetGamesQuery,
  useCreateGameMutation,
  useCreatePlayerMutation,
  useJoinGameMutation,
  useUpdateGameMutation,
 } = appApiSlice;
 
const gamesAdapter = createEntityAdapter<Wega>({
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // sorts from most recent to later
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



