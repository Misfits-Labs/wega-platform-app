import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { HexIshString } from '../../models';
import {
 allowanceQuery,
 hashWagerQuery,
 approveERC20Mutation,
 createWagerMutation,
 depositOfQuery,
} from './thunks';

type RequestState = 'pending' | 'fulfilled' | 'rejected' | 'idle';

interface BlockchainState {
 wagerApproved: boolean;
 allowance: {
  data: number | undefined;
  status: RequestState;
  error: any;
 };
 hash: {
  data: HexIshString | undefined;
  status: RequestState; 
  error: any;
 },
 approveERC20: {
  data: HexIshString | undefined;
  status: RequestState;
  error: any;
 } 
 createWager: {
  data: HexIshString | undefined;
  status: RequestState;
  error: any;
 },
 depositOf: {
  data: number | undefined;
  status: RequestState;
  error: any;
 }
}


export const initialBlockchainState: BlockchainState = {
 wagerApproved: false,
 allowance: {
  data: undefined,
  status: 'idle',
  error: undefined,
 },
 hash: {
  data: undefined,
  status: 'idle',
  error: undefined,
 },
 approveERC20: { // refers to the hash from mutation
  data: undefined,
  status: 'idle',
  error: undefined,
 },
 createWager: { // refers to the hash from mutation
  data: undefined,
  status: 'idle',
  error: undefined,
 },
 depositOf: { // refers to the hash from mutation
  data: undefined,
  status: 'idle',
  error: undefined,
 }
};

const blockchainSlice = createSlice({
 name: 'blockchain-api',
 initialState: initialBlockchainState,
 reducers: {
  setApprovedWager(state, action: PayloadAction<number>){
   if(state.allowance.data && state.allowance?.data >= action.payload ) {
    state.wagerApproved = true;
   } else {
    state.wagerApproved = false;
   };
  }
 },
 extraReducers: (builder) => {
  // allowance
  builder.addCase(allowanceQuery.pending, (state, action) => { state.allowance.status = action.meta.requestStatus });
  builder.addCase(allowanceQuery.rejected, (state, action) => { 
   state.allowance.status = action.meta.requestStatus;
   state.allowance.error = action.error; 
  });
  builder.addCase(allowanceQuery.fulfilled, (state, action) => { 
   state.allowance.status = action.meta.requestStatus;
   state.allowance.data = action.payload;
  });

  // hash
  builder.addCase(hashWagerQuery.pending, (state, action) => { state.hash.status = action.meta.requestStatus });
  builder.addCase(hashWagerQuery.rejected, (state, action) => { 
   state.hash.status = action.meta.requestStatus;
   state.hash.error = action.error; 
  });
  builder.addCase(hashWagerQuery.fulfilled, (state, action) => { 
   state.hash.status = action.meta.requestStatus;
   state.hash.data = action.payload;
  });

  // erc20 approval
  builder.addCase(approveERC20Mutation.pending, (state, action) => { state.hash.status = action.meta.requestStatus });
  builder.addCase(approveERC20Mutation.rejected, (state, action) => { 
   state.approveERC20.status = action.meta.requestStatus;
   state.approveERC20.error = action.error; 
  });
  builder.addCase(approveERC20Mutation.fulfilled, (state, action) => { 
   state.approveERC20.status = action.meta.requestStatus;
   state.approveERC20.data = action.payload;
  });

  // wager creation
  builder.addCase(createWagerMutation.pending, (state, action) => { state.createWager.status = action.meta.requestStatus });
  builder.addCase(createWagerMutation.rejected, (state, action) => { 
   state.createWager.status = action.meta.requestStatus;
   state.createWager.error = action.error; 
  });
  builder.addCase(createWagerMutation.fulfilled, (state, action) => { 
   state.createWager.status = action.meta.requestStatus;
   state.createWager.data = action.payload;
  });

  // get user deposits
  builder.addCase(depositOfQuery.pending, (state, action) => { state.depositOf.status = action.meta.requestStatus });
  builder.addCase(depositOfQuery.rejected, (state, action) => { 
   state.depositOf.status = action.meta.requestStatus;
   state.depositOf.error = action.error; 
  });
  builder.addCase(depositOfQuery.fulfilled, (state, action) => { 
   state.depositOf.status = action.meta.requestStatus;
   state.depositOf.data = action.payload;
  });

 }
});

export default blockchainSlice.reducer;
export const { setApprovedWager } = blockchainSlice.actions;
export const selectWagerApproved = (state: RootState) => state.blockchain.wagerApproved;
export const selectAllowanceQueryResult = (state: RootState) => state.blockchain.allowance;
export const selectHashQueryResult = (state: RootState) => state.blockchain.hash.data;
export const selectCreateWagerMutationResult = (state: RootState) => state.blockchain.createWager.data;
export const selectDepositOfQueryResult = (state: RootState) => state.blockchain.depositOf.data;