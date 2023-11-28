// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { appApiSlice } from '../../app/apiSlice';
import { 
 type Wega,
 type WegaAttributes
} from '../../models'

export const joinGameApiSlice = appApiSlice.injectEndpoints({ 
 endpoints: (builder) => ({
  joinGame: builder.mutation<any, { gameUuid: string, newPlayerUuid: string,  gameAttributes?: WegaAttributes }>({
   query: ({ gameUuid , newPlayerUuid, gameAttributes }) => ({
     url: `/games/${gameUuid}/join`,
     method: 'PATCH',
     body: { newPlayerUuid, uuid: gameUuid, gameAttributes }
   }),
 }),
 updateGame: builder.mutation<any, Partial<Wega>>({
  query: ({ uuid, ...updates }) => {
    return ({
      url: `/games/${uuid}`,
      method: 'PATCH',
      body: { uuid, ...updates }
    })
  },
  }),
 }),
});
appApiSlice.enhanceEndpoints({ 
 addTagTypes: ['Games'], 
 endpoints: { 
  createGame:  { invalidatesTags: [ { type: 'Games', id: 'LIST' } ] },
  updateGame: { invalidatesTags: [ { type: 'Games', id: 'LIST' } ] }
 } 
});
export const { useJoinGameMutation, useUpdateGameMutation } = joinGameApiSlice;
