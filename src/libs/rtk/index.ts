import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { HexishString } from '../../models';
import { BlockchainAPIBase, type AllContractTypes } from '../wagmi';

// todo add typechecking for function name 
export const customBlockchainBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }, API: typeof BlockchainAPIBase ): BaseQueryFn<
 {
   contract: AllContractTypes
   method: 'READ'|'WRITE';
   functionName: string;
   args: any;
   contractAddress?: HexishString,
 },
 unknown,
 unknown
> => async ({ contract, method, args, functionName, contractAddress }) => {
    const api = new API(baseUrl);
    try {
      if(method === 'WRITE') {
        const transactionHash = await api.write({ contract, functionName, args, contractAddress });
        return await api.waitForMined(transactionHash);
      } 
      return await api.read({contract, functionName, args, contractAddress });
    } catch (error: any) {
      return {
        error: {
          status: error?.status ?? undefined,
          data: api.handleError(error, 'Something went wrong'),
        },
      }
    } 
  }

