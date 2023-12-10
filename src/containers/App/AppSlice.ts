/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Network, User, Wallet } from '../../models';
import { RootState } from "../../app/store";
import { appApiSlice } from './api';

interface AppState {
 loading: boolean;
 network: Network | undefined;
 user: User;
}

export const initialState: AppState = {
 loading: false,
 network: undefined, 
 user: {
  uuid: undefined,
  wallet: undefined,
  loading: false,
 },
};

export const appSlice = createSlice({
 name: 'app',
 initialState,
 reducers: {
  setWallet(state, action: PayloadAction<Wallet>){
   state.user.wallet = action.payload
  },
  resetWallet(state) {
   state.user.wallet = undefined;
  },
  resetNetwork(state) {
   state.network = undefined;
  },
  setNetworkUnsupported(state, action: PayloadAction<boolean>) {
   state = Object.assign(state, { ...state, network: { unsupported: action.payload } });
  },
  setNetwork(state, action: PayloadAction<Network>){
   state.network = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder.addMatcher(appApiSlice.endpoints.createPlayer.matchFulfilled, (state, action) =>  { state.user.uuid = action.payload });
  builder.addMatcher(appApiSlice.endpoints.createPlayer.matchRejected, (state) =>  { state.user.loading = false });
  builder.addMatcher(appApiSlice.endpoints.createPlayer.matchPending, (state) =>  { state.user.loading = true });
 }
});

export const { setWallet, setNetwork, resetWallet, resetNetwork, setNetworkUnsupported } = appSlice.actions;
export const selectNetwork = (state: RootState) => state.connection.network;
export const selectUser = (state: RootState) => state.connection.user;    
export const selectWallet = (state: RootState) => state.connection.user.wallet;  
export const selectAppLoading = (state: RootState) => state.connection.loading;
export default appSlice.reducer;
