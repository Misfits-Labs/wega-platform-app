// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { appApiSlice } from '../../app/apiSlice';
import { type Wega } from '../../models'

export const playGameApiSlice = appApiSlice.injectEndpoints({ 
 endpoints: (builder) => ({
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
})
appApiSlice.enhanceEndpoints({ 
 addTagTypes: ['Games'], 
 endpoints: { createGame:  { invalidatesTags: [ { type: 'Games', id: 'LIST' } ]} } 
});

export const { useUpdateGameMutation } = playGameApiSlice;
