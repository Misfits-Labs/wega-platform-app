// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  credentials: 'include',
});


export const apiSlice = createApi({
  baseQuery,
  reducerPath: 'api',
  tagTypes: ['Games', 'Game'],
  endpoints: (builder) => ({
    loginPlayer: builder.mutation({
      query: (walletAddress) => ({
        url: 'users',
        method: 'POST',
        body: { walletAddress }
      }),
      transformResponse: (response: any) => { console.log(response); return response.data.uuid },
    }), 
  })
});



