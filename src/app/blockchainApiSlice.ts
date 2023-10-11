// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { createApi  } from '@reduxjs/toolkit/query/react';
import { customBlockchainBaseQuery } from '../libs/rtk';
import { BlockchainAPIBase } from '../libs/wagmi';

const baseUrl = 'wega-blockchain-api'
const baseQuery = customBlockchainBaseQuery({ baseUrl }, BlockchainAPIBase);
export const blockchainApiSlice = createApi({
  baseQuery,
  reducerPath: baseUrl,
  endpoints: () => ({})
});

 