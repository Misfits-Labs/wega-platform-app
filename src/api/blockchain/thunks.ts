import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlockchainAPI } from './blokchainApi';
import { BigNumberish } from 'ethers';
import { HexIshString } from '../../models';

/**
 * @title thunks below will be used in all blockchain related actions  
 * @note - All blockchain mutation thunks should just return a hash that can be accessed by the hook and can be waited for on the front-end 
*/
const api = new BlockchainAPI();


export const allowanceQuery = createAsyncThunk<BigNumberish, { tokenAddress: HexIshString, owner: HexIshString }>('blockchain/allowance',
 async ({ tokenAddress, owner }, { rejectWithValue }) => {
   try {
    return await api.allowance(tokenAddress, owner);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'Allowance request failed'));
   }
 }
)

export const hashWagerQuery = createAsyncThunk<BigNumberish, { token: HexIshString, creator: HexIshString, accountsCount: number,  wager: number }>('blockchain/hash',
 async (inpts, { rejectWithValue }) => {
   try {
    return await api.hash(inpts);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'Hash request error'));
   }
 }
)

export const approveERC20Mutation = createAsyncThunk<HexIshString, { tokenAddress: HexIshString, wager: number }>('blockchain/hash',
 async ({ tokenAddress, wager }, { rejectWithValue }) => {
   try {
    return await api.approveERC20(tokenAddress, wager);
   } catch (error: any) {
    console.log(error);
    const message = error?.message ?? 'Hash request error'; 
    return rejectWithValue(message)
   }
 }
)