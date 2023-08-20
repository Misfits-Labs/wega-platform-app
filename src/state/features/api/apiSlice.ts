// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://34.68.249.126:3000", // todo - import from env
  prepareHeaders: (headers, ) => {
    headers.set('Access-Control-Allow-Origin', '*')
    return headers
  },
});


export const apiSlice = createApi({
  baseQuery,
  reducerPath: 'platform-api',
  tagTypes: ['Games', 'Game'],
  endpoints: (builder) => ({
    loginPlayer: builder.mutation({
      query: (walletAddress) => ({
        url: '/users',
        method: 'POST',
        body: { walletAddress }
      }),
      transformResponse: (response: any) => { return response.uuid },
    }), 
  })
});



