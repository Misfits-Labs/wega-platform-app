import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlockchainAPI } from './blokchainApi';
import { HexIshString  } from '../../models';
import toast from 'react-hot-toast';
import { toastSettings } from '../../utils';
import { waitForTransaction } from '@wagmi/core';
/**
 * @title thunks below will be used in all blockchain related actions  
 * @note - All blockchain mutation thunks should just return a hash that can be accessed by the hook and can be waited for on the front-end 
*/

export const allowanceQuery = createAsyncThunk<number, { tokenAddress: HexIshString, owner: HexIshString, wager?: number }>('token/allowance',
async ({ tokenAddress, owner, wager }, { rejectWithValue, dispatch }) => {
   const api = new BlockchainAPI();
   try {
    const allowance = await api.allowance(tokenAddress, owner);
    
    if(wager){
      const isApproved = allowance >= wager;
      dispatch({ type: 'blockchain-api/setApprovedWager',  payload: isApproved })
    }
    return allowance; 
   } catch (error: any) {
    const message = api.handleError(error, 'Allowance request failed');
    toast.error(message, { ...{ ...toastSettings('error', 'bottom-center') } as any })
    return rejectWithValue(message);
   }
 }
)

export const approveERC20Mutation = createAsyncThunk<any, { tokenAddress: HexIshString, wager: number }>('token/approve',
 async ({ tokenAddress, wager }, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    const hash = await api.approveERC20(tokenAddress, wager);
    const receipt = await waitForTransaction({ hash });
    if(receipt) {
      toast.success('Approval success', { ...{ ...toastSettings('success', 'top-center') } as any });
    }
    return receipt;
   } catch (error: any) {
    const message = api.handleError(error, 'ERC20 approval error');
    toast.error(message, { ...{ ...toastSettings('error', 'bottom-center') } as any })
    return rejectWithValue(message);
   }
 }
)

export const hashWagerQuery = createAsyncThunk<HexIshString, { tokenAddress: HexIshString, playerAddress: HexIshString, accountsCount: number,  wager: number }>('escrow/hash',
 async (inpts, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    const { hash: wagerId } = await api.hash(inpts);
    return wagerId;
   } catch (error: any) {
    const message = api.handleError(error, 'Hash request error');
    toast.error(message, { ...{ ...toastSettings('error', 'bottom-center') } as any })
    return rejectWithValue(message);
   }
 }
)


export const createWagerMutation = createAsyncThunk<any, { tokenAddress: HexIshString, playerAddress: HexIshString, accountsCount: number, wager: number }>('escrow/createWager',
 async (inpts, { rejectWithValue }) => {
  const api = new BlockchainAPI();
   try {
      const { hash: wagerId, nonce }= await api.hash(inpts);
      const hash = await api.createWagerAndDeposit(inpts);
      const receipt = await waitForTransaction({ hash });
      if(receipt) {
      toast.success('Create wager success', { ...{ ...toastSettings('success', 'top-center') } as any });
    }
    return { wagerId, nonce }; // return wager id and nonce since it is required for creating a game
  } catch (error: any) {
    const message = api.handleError(error, 'Create wager error');
    toast.error(message, { ...{ ...toastSettings('error', 'bottom-center') } as any })
    return rejectWithValue(message);
   }
 }
)

export const depositOfQuery = createAsyncThunk<number, { escrowHash: HexIshString, account: HexIshString }>('escrow/depositOf',
 async (inpts, { rejectWithValue }) => {
   const api = new BlockchainAPI();
   try {
    return  await api.depositOf(inpts.escrowHash, inpts.account);
   } catch (error: any) {
    const message = api.handleError(error, 'Query user deposit error');
    toast.error(message, { ...{ ...toastSettings('error', 'bottom-center') } as any })
    return rejectWithValue(message);
   }
 }
)