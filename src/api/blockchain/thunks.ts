import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlockchainAPI } from './blokchainApi';
import { HexIshString  } from '../../models';
/**
 * @title thunks below will be used in all blockchain related actions  
 * @note - All blockchain mutation thunks should just return a hash that can be accessed by the hook and can be waited for on the front-end 
*/

export const allowanceQuery = createAsyncThunk<number, { tokenAddress: HexIshString, owner: HexIshString }>('token/allowance',
async ({ tokenAddress, owner }, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    return await api.allowance(tokenAddress, owner);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'Allowance request failed'));
   }
 }
)

export const hashWagerQuery = createAsyncThunk<HexIshString, { token: HexIshString, creator: HexIshString, accountsCount: number,  wager: number }>('escrow/hash',
 async (inpts, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    return await api.hash(inpts);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'Hash request error'));
   }
 }
)

export const approveERC20Mutation = createAsyncThunk<HexIshString, { tokenAddress: HexIshString, wager: number }>('token/approve',
 async ({ tokenAddress, wager }, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    return await api.approveERC20(tokenAddress, wager);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'ERC20 approval error'))
   }
 }
)

export const createWagerMutation = createAsyncThunk<HexIshString, { token: HexIshString, creator: HexIshString, accountsCount: number, wager: number }>('escrow/createWager',
 async (inpts, { rejectWithValue }) => {
  const api = new BlockchainAPI();
   try {
    return await api.createWagerAndDeposit(inpts);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'Create wager error'))
   }
 }
)

export const depositOfQuery = createAsyncThunk<number, { escrowHash: HexIshString, account: HexIshString }>('escrow/depositOf',
 async (inpts, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    return  await api.depositOf(inpts.escrowHash, inpts.account);
   } catch (error: any) {
    return rejectWithValue(api.handleError(error, 'Create wager error'))
   }
 }
)