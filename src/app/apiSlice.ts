// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_API_URL,
  prepareHeaders: (headers) => {
    headers.append('Access-Control-Allow-Origin', '*')
    return headers
  },
});

export const appApiSlice = createApi({
  baseQuery,
  reducerPath: 'wegaApi',
  endpoints: () => ({})
});