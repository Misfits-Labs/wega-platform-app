// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { appApiSlice } from '../../app/apiSlice';
import { 
 type Wega,
 type Player,
 type Wager,
 type AllPossibleWegaTypes,
 type WegaAttributes
} from '../../models'

export const createGameApiSlice = appApiSlice.injectEndpoints({ 
 endpoints: (builder) => ({
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
  }),
  getRandomNumber: builder.query({
   query: () => ({
     url: '/randomness',
     method: 'GET',
    }),
   }),
  }),
})
appApiSlice.enhanceEndpoints({ 
 addTagTypes: ['Games'], 
 endpoints: { createGame:  { invalidatesTags: [ { type: 'Games', id: 'LIST' } ]} } 
});
export const { useCreateGameMutation, useGetRandomNumberQuery } = createGameApiSlice;
