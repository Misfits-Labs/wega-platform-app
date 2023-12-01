// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import {  User } from '../../models';
import { appApiSlice } from '../../app/apiSlice';

export const connectButtonApiSlice = appApiSlice.injectEndpoints({ 
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
 })
})

export const { useCreatePlayerMutation } = connectButtonApiSlice;
 